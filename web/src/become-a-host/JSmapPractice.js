import React, { createClass } from 'react';
import Slider from 'react-slick';

const results = [
  {
    listing:
    {
      name: "Renan",
      price: 40,
      pictures: [
        <img src='http://static1.squarespace.com/static/55fa2918e4b08929c4af4bfa/5707588bab48de09bc427fb3/570758ac4c2f85d0ea62cc10/1460268752037/IMG_2778+2.JPG' />,
        <img src='http://static1.squarespace.com/static/55fa2918e4b08929c4af4bfa/5707588bab48de09bc427fb3/5707588b4c2f85d0ea62cb93/1460099233221/1H0A2386.jpg?format=750w' />,
        <img src='http://static1.squarespace.com/static/55fa2918e4b08929c4af4bfa/5707588bab48de09bc427fb3/570759114c2f85d0ea62cd69/1460099373464/renan+ozturk-1-4.jpg?format=1000w' />,
        <img src='http://static1.squarespace.com/static/55fa2918e4b08929c4af4bfa/5707588bab48de09bc427fb3/57075925e707eb820b407e2d/1460099369860/website+%281+of+1%29-4+copy.jpg?format=1000w' />
      ]
    }
  }
];

export default createClass({
  getInitialState: function () {
    return { results }
  },
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const listItems = this.state.results.map(function (result) {
      return (
        <div key={result.listing.price} style={{ height: "600px", width: "600px" }}>
          {results}
        </div>
      );
    });

    return (
      <div >
        <Slider {...settings} >
          {listItems}
        </Slider>
      </div>
    );
  }
});
