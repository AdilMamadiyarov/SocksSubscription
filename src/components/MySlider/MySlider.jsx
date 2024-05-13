import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from './MySlider.module.css'; 
import image1 from '../../images/image1.jpg';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';


const MySlider = () => {
  const data = [
    { text: "Получайте стильные носки ежемесячно без лишних забот. Подписка с бесплатной доставкой - ваш путь к комфорту и моде!", img: image1 },
    { text: "Новая коллекция носков уже здесь! Специальные предложения для наших подписчиков.", img: image2 },
    { text: "Сделайте свой выбор! Лучшие носки по лучшим ценам.", img: image3 },
  ];


  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} ${classes.nextarr}`}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} ${classes.prevarr}`}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 1000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  
  return (
    <div>
        <Slider {...settings}>
        {data.map((item, index) => (
            <div key={index}>
            <div className={classes.slide} style={{ backgroundImage: `url(${item.img})` }}>
                <h1 className={classes.slidetext}>{item.text}</h1>
            </div>
            </div>
        ))}
        </Slider>
    </div>
  );
};

export default MySlider;
