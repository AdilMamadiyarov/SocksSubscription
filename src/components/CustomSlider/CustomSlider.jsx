import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from './CustomSlider.module.css'; 
import arrowR from '../../images/arrowR.png';
import arrowL from '../../images/arrowL.png';

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} ${classes.nextArrow}`} style={{ ...style, right: "10px" }} onClick={onClick}>
      <img src={arrowR} alt="Next" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} ${classes.prevArrow}`} style={{ ...style, left: "10px" }} onClick={onClick}>
      <img src={arrowL} alt="Previous" />
    </div>
  );
};

const CustomSlider = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings} className={classes.slider}>
      {data.map((item, index) => (
        <div key={index}>
          <div className={`${classes.slide} ${classes.image}`} style={{ backgroundImage: `url(${item.img})` }}>
            <h1 className={classes.slidetext}>{item.text}</h1>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
