import React, { useContext, useEffect, useState } from "react";
import classes from './MyHeader.module.css'; 
import { CustomLink } from "../CustomLink/CustomLink";
import logo from '../../images/logo.png';
import MyModal from "../MyModal/RegistrationModal";
import modalstyle from "../../pages/ProfilePage/Logout/Logout.module.css";
import { AuthContext } from "../context";
import { useLocation, useNavigate } from "react-router-dom";

const MyHeader = ({selectedMenuItem, setSelectedMenuItem, ...props }) => { 
    const {setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
      const CheckIsAuth = () => {
        if (localStorage.getItem('auth')) {
          setIsAuth(true);
        }
      }; 
      CheckIsAuth(); 
    }, [setIsAuth]);

    const [modalVisible, setModalVisible] = useState(false);
    const [exitmodalVisible, setExitModalVisible] = useState(false);
    const {IsAuth} = useContext(AuthContext);

    function ModalRegistration(reg){
        if (reg){
            setModalVisible(true);
        }
        else{
            setExitModalVisible(true);
        }
        console.log(modalVisible, exitmodalVisible)
    }
    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };
    
    return (
    <header {...props} className={classes.MyHeader}>
        <div className={classes.logo}>
            <img src={logo} alt="Логотип" className={classes.logoimg}/>
            <h1>SockArt</h1>
        </div>
        <div className={classes.navlinks}>
            <CustomLink to="/MainPage" className={classes.navtext}>О нас</CustomLink>
            <CustomLink to="/Collection" className={classes.navtext}>Коллекция</CustomLink>
            <CustomLink to="/SubscriptionInfo" className={classes.navtext}>Подписка</CustomLink>
            {IsAuth ? (
                <div className={classes.dropdown}>
                    <CustomLink to="/ProfilePage" className={classes.navtext}>Профиль</CustomLink>
                    {location.pathname === "/ProfilePage" && (
                            <div className={classes.dropdownMenu}>
                                <p onClick={() => handleMenuItemClick("Информация аккаунта")}>Информация аккаунта</p>
                                <p onClick={() => handleMenuItemClick("Адрес доставки")}>Адрес доставки</p>
                                <p onClick={() => handleMenuItemClick("Способ оплаты")}>Способ оплаты</p>
                                <p onClick={() => handleMenuItemClick("Вопросы и ответы")}>Вопросы и ответы</p>
                                <p onClick={() => navigate('/SubscriptionInfo')}>Подписка</p>
                                <p onClick={() => ModalRegistration(false)}>Выйти</p>
                            </div>
                        )}
                </div>
            ) : (
                <CustomLink to="" onClick={() => ModalRegistration(true)} className={classes.navtext}>Регистрация</CustomLink>
            )}
        </div>
        <MyModal visible={modalVisible} setVisible={setModalVisible} registration={true}/>
        <MyModal visible={exitmodalVisible} setVisible={setExitModalVisible} registration={false} style={modalstyle}/>
    </header>
    );
};

export default MyHeader;
