import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';



class DateRangePickerGmapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      // startDate: moment('2016-10-10'),
      // endDate: moment('2016-10-30'),
      searchVal: 'Manila',
      numGuests: 1,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.guestNumSelected = this.guestNumSelected.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
      console.log('startDate: ', startDate);
      console.log('startDate: ', endDate);

      this.setState({ startDate, endDate });

      axios.post('http://localhost:8080/search',{
        searchVal: this.props.location,
        startDate: this.state.startDate.format('MM/DD/YYYY'),
        endDate: this.state.endDate.format('MM/DD/YYYY'),
        numGuests: this.state.numGuests
      }).then(response =>{
        console.log('OOMFGGGFGGG ', response);
          this.props.renderMap(response.data);
      }).catch(function(error){
        console.log(error); // Network Error
        console.log(error.status); // undefined
        console.log(error.code); // undefined
        });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  guestNumSelected(e){
      console.log(e.target.value);
      const x = e.target.value.match(/\d\d?/)

      this.setState({numGuests: parseInt(x[0])});

      axios.post('http://localhost:8080/search',{
        searchVal: this.props.location,
        startDate: this.state.startDate.format('MM/DD/YYYY'),
        endDate: this.state.endDate.format('MM/DD/YYYY'),
        numGuests: this.state.numGuests,
        room_types: this.props.roomTypeSelected,
        price_min: this.props.values[0],
        price_max: this.props.values[1],
      }).then(response =>{
          this.props.renderMap(response.data);
      }).catch(function(error){
        console.log(error); // Network Error
        console.log(error.status); // undefined
        console.log(error.code); // undefined
        });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;

    const selectGenerator = () =>{
      let arr = [];
      for(let i = 1; i <= 16; i++){

        let x = 0;
        if(i === 1){
          x = i + ' Guest';
        } else {
          x = i + ' Guests';
        }

        if(i == 16){
          x = x.replace('16','16+');
        }

        arr.push(x);
      }
      return arr
    }

    const roomsArray = selectGenerator();

    const roomSelection = roomsArray.map((currentVal,i)=>{
      return <option key={currentVal} value={currentVal}>{currentVal}</option>
        })

    return (
      <div >
        <form className='SearchBarContainer'>

          
          <select onChange={this.guestNumSelected} className='selectGuest'>
            {roomSelection}
          </select>

        </form>

      </div>
    );
  }
}

export default DateRangePickerGmapPage;
