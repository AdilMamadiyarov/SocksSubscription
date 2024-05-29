import React, { useState, useEffect } from "react";
import MyHeader from "../../components/MyHeader/MyHeader";
import { useLocation } from "react-router-dom";
import style from "./Payment.module.css"
import Footer from "../../components/Footer/Footer";

function PaymentPage() {
    const location = useLocation();
    const { subscription } = location.state || {};
    const [savedCards, setSavedCards] = useState([]);

    useEffect(() => {
        const storedCards = localStorage.getItem('savedCards');
        if (storedCards) {
            setSavedCards(JSON.parse(storedCards));
        }
    }, []);

    return (
        <div>
            <MyHeader />
            <h1>Страница оплаты</h1>
            {subscription ? (
                    <p>Вы выбрали план подписки: {subscription}</p>
                ) : (
                    <p>План подписки не выбран</p>
                )}
            <div className={style.wrapper}>
                <div className={style.container}>
                    {savedCards.length > 0 ? (
                        savedCards.map((card, index) => (
                            <form key={index} className={style.form}>
                                <h3>Номер карты:</h3>
                                <input type="text" placeholder={card.cardNumber}/>
                                <h3>Имя:</h3>
                                <input type="text" placeholder={card.cardName}/>

                            </form>
                        ))
                    ) : (
                        <p>Нет сохраненных карт.</p>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default PaymentPage;
