import React, { useEffect } from "react";
import MyHeader from "../../components/MyHeader/MyHeader";
import image1 from '../../images/image1.jpg';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';
import image5 from '../../images/image5.jpg';
import image6 from '../../images/image6.jpg';
import image7 from '../../images/image7.jpg';
import image8 from '../../images/image8.jpg';
import MySlider from "../../components/MySlider/MySlider";
import Footer from "../../components/Footer/Footer";
import classes from './MainPage.module.css'; 
import { useNavigate } from "react-router-dom";


function MainPage() {
  const data = [
    { text: "Стиль", img: image5 },
    { text: "Качество", img: image6 },
    { text: "Комфорт", img: image7 },
    { text: "Размер", img: image8 },
  ];
  useEffect(() =>{
    // localStorage.clear();
  },[])
  const navigate = useNavigate()
  const SliderData = [
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
  return (
    <div>
      <MyHeader />
      <MySlider slides={1} SliderData={SliderData} />
      <div className={classes.gallery}>
        {data.map((item, index) => (
          <div key={index} className={classes["image-wrapper"]}>
            <img src={item.img} alt={`Изображение ${index + 1}`} />
            <div className={classes["image-overlay"]}></div> {/* Добавили затемняющий элемент */}
            <div className={classes["image-text"]}>{item.text}</div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
