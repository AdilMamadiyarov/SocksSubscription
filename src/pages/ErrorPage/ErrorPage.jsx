import React from "react";
import MyHeader from "../../components/MyHeader/MyHeader";
import classes from "./ErrorPage.module.css"

function ErrorPage() {
  return (
    <div>
        <MyHeader/>
        <div className={classes.error}>
          <h1>К сожалению, эта страница недоступна.</h1>
          <h3>Возможно, вы воспользовались недействительной ссылкой или страница была удалена.</h3>
        </div>
    </div>
  );
}

export default ErrorPage;
