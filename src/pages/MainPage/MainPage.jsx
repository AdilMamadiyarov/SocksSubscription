import React from "react";
import MyHeader from "../../components/MyHeader/MyHeader";
import MyButton from "../../components/MyButton/MyButton";

function MainPage() {
  return (
    <div>
        <MyHeader/>
        <h1>Главная</h1>
        <MyButton>Кнопка</MyButton>
    </div>
  );
}

export default MainPage;
