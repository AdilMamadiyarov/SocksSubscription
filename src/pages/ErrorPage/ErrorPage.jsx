import React from "react";
import MyHeader from "../../components/MyHeader/MyHeader";

function ErrorPage() {
  return (
    <div>
        <MyHeader/>
        <h1>Ошибка</h1>
        <h3>Похоже этой страницы не существует</h3>
    </div>
  );
}

export default ErrorPage;
