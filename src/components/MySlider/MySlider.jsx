import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from './MySlider.module.css'; 
import image1 from '../../images/image1.jpg';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';
import { useNavigate } from "react-router-dom";

const MySlider = () => {
  const navigate = useNavigate()
  const data = [
    { 
      text: "Получайте стильные носки ежемесячно без лишних забот. Подписка с бесплатной доставкой - ваш путь к комфорту и моде!", 
      img: image1,
      buttons: [{ text: "Подписаться", onClick: () => navigate('/SubscriptionInfo') }]
    },
    { 
      text: "Новая коллекция носков уже здесь! Специальные предложения для наших подписчиков.", 
      img: image2,
      buttons: [{ text: "Посмотреть", onClick: () => navigate('/SubscriptionInfo') }]
    },
    { 
      text: "Ощутите свежесть и надежность с нашими носками. Позвольте себе насладиться каждым шагом в удобстве и элегантности с носками от нашей компании.", 
      img: image3,
      buttons: [{ text: "Подробнее", onClick: () => navigate('/SubscriptionInfo') }]
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

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
  
  return (
    <Slider {...settings}>
      {data.map((item, index) => (
        <div key={index}>
          <div className={classes.slide} style={{ backgroundImage: `url(${item.img})` }}>
            <h1 className={classes.slidetext}>{item.text}</h1>
            <div className={classes.buttons}>
            {item.buttons.map((button, buttonIndex) => (
              <button key={buttonIndex} className={classes.button} onClick={button.onClick}>{button.text}</button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default MySlider;
