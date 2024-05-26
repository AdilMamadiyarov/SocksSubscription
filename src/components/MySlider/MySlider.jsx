import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from './MySlider.module.css'; 
import collectionClasses from '../../pages/CollectionPage/CollectionSlider.module.css'; 

const MySlider = ({ SliderData, slides }) => {
  const sliderClasses = slides === 1 ? classes : collectionClasses; 
  
  const CustomNextArrow = ({ onClick }) => (
    <div className={sliderClasses.next} onClick={onClick}>
      &#10095;
    </div>
  );

  const CustomPrevArrow = ({ onClick }) => (
    <div className={sliderClasses.prev} onClick={onClick}>
      &#10094;
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slides,
    slidesToScroll: slides,
    autoplay: true,
    autoplaySpeed: 5000 * slides,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <Slider {...settings}>
      {SliderData && SliderData.map((item, index) => (
        <div key={index}>
          <div className={sliderClasses.slide} style={{ backgroundImage: `url(${item.img})` }}>
            <h1 className={sliderClasses.slidetext}>{item.text}</h1>
            {item.buttons && (
              <div className={sliderClasses.buttons}>
                {item.buttons.map((button, buttonIndex) => (
                  <button key={buttonIndex} className={sliderClasses.button} onClick={button.onClick}>{button.text}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default MySlider;
