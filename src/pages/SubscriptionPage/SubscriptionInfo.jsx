import React from "react";
import MyHeader from "../../components/MyHeader/MyHeader";
import classes from "./SubscriptionInfo.module.css";
import { useNavigate } from "react-router-dom";

function SubscriptionInfo() {
    const navigate = useNavigate();

    const subinfo = "Обновите свой гардероб каждый месяц с нашей подпиской на носки! Получайте качественные носки прямо к вашей двери, не выходя из дома. Удобно, стильно, без лишних хлопот. Подпишитесь сегодня и наслаждайтесь комфортом каждый день!";
    const delinfo = "Доставка в любой город Казахстана занимает от 3 до 5 дней в зависимости от региона! Вы можете отслеживать посылку по номеру трека!";
    const subtext = "Подпишитесь на нашу ежемесячную доставку и получайте свежие носки прямо к двери. Комфорт без лишних забот!";

    function Payment(subscription) {
        console.log(subscription);
        navigate('/Payment', { state: { subscription } });
    }

    return (
        <div>
            <MyHeader />
            <div className={classes.container}>
                <div className={classes.info}>
                    <h1>Подписка на любой период!</h1>
                    <p>{subinfo}</p>
                    <h1>Доставка</h1>
                    <p>{delinfo}</p>
                </div>
                <div className={classes.subcontainer}>
                    <h1>Выберите план подписки</h1>
                    <p>{subtext}</p>
                    <div className={classes.sub} onClick={() => Payment("month_1")}>
                        <h2>1 месяц</h2>
                        <h3>4000 ₸</h3>
                    </div>
                    <div className={classes.sub} onClick={() => Payment("month_3")}>
                        <h2>3 месяца</h2>
                        <h3>6000 ₸</h3>
                    </div>
                    <div className={classes.sub} onClick={() => Payment("month_6")}>
                        <h2>6 месяцев</h2>
                        <h3>12000 ₸</h3>
                    </div>
                    <div className={classes.sub} onClick={() => Payment("month_12")}>
                        <h2>12 месяцев</h2>
                        <h3>24000 ₸</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionInfo;
