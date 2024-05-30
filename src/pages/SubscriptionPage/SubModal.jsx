import React, { useEffect, useState } from 'react';
import cl from './SubModal.module.css';
import { useNavigate } from 'react-router-dom';

const SubModal = ({ visible, setVisible }) => {
    const navigate = useNavigate();
    const [savedCards, setSavedCards] = useState([]);
    const [address, setAddress] = useState(null);

    function GoToProfile() {
        navigate('/ProfilePage');
    }

    useEffect(() => {
        const storedCards = localStorage.getItem('savedCards');
        const storedMainAddress = localStorage.getItem('mainaddress'); 
        if (storedCards) {
            setSavedCards(JSON.parse(storedCards));
        }
        if (storedMainAddress) { 
            const mainAddress = JSON.parse(storedMainAddress); 
            setAddress(mainAddress);
        }
    }, []);

    const rootClasses = [cl.myModal];
    if (visible) {
        rootClasses.push(cl.active);
    }

    const isAddressEmpty = !address || Object.values(address).some(value => !value);
    const isSavedCardsEmpty = savedCards.length === 0;

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                <div className={cl.container}>
                    {isAddressEmpty || isSavedCardsEmpty ? (
                        <h2>Не все данные заполнены</h2>
                    ) : (
                        <h2>Мы обнаружили сохраненные данные</h2>
                    )}
                    {isSavedCardsEmpty ? (
                        <p className={cl.errortext}>Карта не обнаружена</p>
                    ) : (
                        <ul className={cl.savedCards}>
                            {savedCards.map((card, index) => (
                                <li key={index} className={cl.cardItem}>
                                    <p><strong>Номер карты:</strong> {card.cardNumber.replace(/\s/g, '').replace(/\d{12}(?=\d{4})/, '**** **** **** ')}</p>
                                    <p><strong>Имя на карте:</strong> {card.cardName}</p>
                                    <p><strong>Срок действия:</strong> {card.expiryDate}</p>
                                    <p><strong>CVV:</strong> {card.cvv.replace(/\d{2}/, '**')}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                    {isAddressEmpty ? (
                        <p className={cl.errortext}>Местоположение не обнаружено</p>
                    ) : (
                        <ul className={cl.address}>
                            <li className={cl.addressItem}>
                                <p>{address.city}, улица {address.street}, дом {address.house}, кв. {address.apartment}</p>
                            </li>
                        </ul>
                    )}

                    {isAddressEmpty || isSavedCardsEmpty ? (
                        <p className={cl.ChangeText}>Заполнить данные можно <button onClick={GoToProfile}>здесь</button></p>
                    ) : (
                        <div>
                            <p className={cl.GoToPaymentText}>Перейти к <button onClick={GoToProfile}>оплате</button></p>
                            <p className={cl.ChangeText}>Изменить данные можно <button onClick={GoToProfile}>здесь</button></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubModal;
