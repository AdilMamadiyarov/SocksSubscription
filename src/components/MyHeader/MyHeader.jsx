import React, { useContext, useState } from "react";
import classes from './MyHeader.module.css'; 
import { CustomLink } from "../CustomLink/CustomLink";
import logo from '../../images/logo.png';
import MyModal from "../MyModal/RegistrationModal";
import { AuthContext } from "../context";

const MyHeader = ({...props }) => { 
    const [modalVisible, setModalVisible] = useState(false);
    const {IsAuth} = useContext(AuthContext);

    function ModalRegistration(){
        setModalVisible(true);
        console.log(modalVisible)
    }

    return (
    <header {...props} className={classes.MyHeader}>
        <div className={classes.logo}>
            <img src={logo} alt="Логотип" className={classes.logoimg}/>
            <h1>SockArt</h1>
        </div>
        <div className={classes.navlinks}>
            <CustomLink to="/MainPage" className={classes.navtext}>О нас</CustomLink>
            <CustomLink to="/CollectionPage" className={classes.navtext}>Коллекция</CustomLink>
            <CustomLink to="/CollectionPage" className={classes.navtext}>Доставка</CustomLink>
            {IsAuth ? (
                <CustomLink to="/ProfilePage" className={classes.navtext}>Профиль</CustomLink>
            ) : (
                <CustomLink to="" onClick={ModalRegistration} className={classes.navtext}>Регистрация</CustomLink>
            )}
        </div>
        <MyModal visible={modalVisible} setVisible={setModalVisible} />
    </header>
    );
};

export default MyHeader;
