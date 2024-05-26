import React from "react";
import styles from './SideBar.module.css';

const SideBar = ({selectedMenuItem, setSelectedMenuItem, modalVisible, setModalVisible}) => {

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    function ModalRegistration(){
        setModalVisible(true);
        console.log(modalVisible)
    }

    return (
        <div className={styles.sidebar}>
          <div className={styles.welcome}>
            <p>Добро Пожаловать!</p>
          </div>
          <ul>
            <li onClick={() => handleMenuItemClick("Информация аккаунта")} className={selectedMenuItem === "Информация аккаунта" ? styles.active : ""}>Информация аккаунта</li>
            <li onClick={() => handleMenuItemClick("Адрес")} className={selectedMenuItem === "Адрес" ? styles.active : ""}>Адрес</li>
            <li onClick={() => handleMenuItemClick("Доставка")} className={selectedMenuItem === "Доставка" ? styles.active : ""}>Доставка</li>
            <li onClick={() => handleMenuItemClick("Способ оплаты")} className={selectedMenuItem === "Способ оплаты" ? styles.active : ""}>Способ оплаты</li>
            <li onClick={() => handleMenuItemClick("Коллекция")} className={selectedMenuItem === "Коллекция" ? styles.active : ""}>Коллекция</li>
            <li onClick={() => handleMenuItemClick("Подписка")} className={selectedMenuItem === "Подписка" ? styles.active : ""}>Подписка</li>
            <li onClick={ModalRegistration} >Выйти</li>
          </ul>
        </div>
    );
};

export default SideBar;

