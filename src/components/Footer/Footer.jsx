import React from 'react';
import classes from './Footer.module.css'; 
import logo from '../../images/logo.png';
import facebook from '../../images/facebook.png';
import whatsapp from '../../images/whatsapp.png';
import instagram from '../../images/instagram.png';
import location from '../../images/location.png';


function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes["footer-content"]}>
        <div className={classes["logo-container"]}>
          <img src={logo} alt="Логотип" className={classes["logo"]} />
          <h3 className={classes["logo-text"]}>SockArt</h3>
        </div>
        <div className={classes["info-container"]}>
          <div className={classes["footer-section"]}>
            <h4>О нас</h4>
            <ul>
              <li><a href="/" className={classes["footer-link"]}>Информация о сайте</a></li>
              <li><a href="/" className={classes["footer-link"]}>Коллекция</a></li>
            </ul>
          </div>
          <div className={classes["footer-section"]}>
            <h4>Помощь</h4>
            <ul>
              <li><a href="/" className={classes["footer-link"]}>Информация о подписке</a></li>
              <li><a href="/" className={classes["footer-link"]}>Оплата</a></li>
              <li><a href="/" className={classes["footer-link"]}>Доставка</a></li>
            </ul>
          </div>
          <div className={classes["footer-section"]}>
            <h4>Контакты</h4>
            <ul>
              <li>Email: example@gmail.com</li>
              <li>Телефон: +7 (777) 777-7777</li>
              <li>Адрес: ул. Примерная, д. 123, г. Примерный</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={classes["social-icons"]}>
        <img src={facebook} alt="Facebook" className={classes["social-icon"]} />
        <img src={whatsapp} alt="Whatsapp" className={classes["social-icon"]} />
        <img src={instagram} alt="Instagram" className={classes["social-icon"]} />
        <img src={location} alt="location" className={classes["social-icon"]} />
      </div>
      <div className={classes["copyright"]}>
        <p>&copy; {new Date().getFullYear()} SockArt. Все права защищены.</p>
      </div>
    </footer>
  );
}

export default Footer;
