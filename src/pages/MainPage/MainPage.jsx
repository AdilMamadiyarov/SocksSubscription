import React from "react";
import MyHeader from "../../components/MyHeader/MyHeader";
import image5 from '../../images/image5.jpg';
import image6 from '../../images/image6.jpg';
import image7 from '../../images/image7.jpg';
import image8 from '../../images/image8.jpg';
import MySlider from "../../components/MySlider/MySlider";
import Footer from "../../components/Footer/Footer";
import CustomSlider from "../../components/CustomSlider/CustomSlider";

function MainPage() {
  const data = [
    { text: "Текст на первой картинке", img: image5 },
    { text: "Текст на второй картинке", img: image6 },
    { text: "Текст на третьей картинке", img: image7 },
    { text: "Текст на четвертой картинке", img: image8 },
  ];

  return (
    <div>
      <MyHeader />
      <MySlider />
      <h1 className="socks-title">Виды носков</h1>
      <CustomSlider data={data}/>
      <Footer/>
    </div>
  );
}

export default MainPage;
