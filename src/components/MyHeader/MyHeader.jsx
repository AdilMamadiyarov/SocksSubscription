import React from "react";
import classes from './MyHeader.module.css'; 
import { CustomLink } from "../CustomLink/CustomLink";
import logo from '../../images/logo.png';

const MyHeader = ({ ...props }) => { 
    return (
        <header {...props} className={classes.MyHeader}>
            <div className={classes.logo}>
                <img src={logo} alt="Логотип" className={classes.logoimg}/>
                <h1>SockArt</h1>
            </div>
            <div className={classes.navlinks}>
                <CustomLink to="/MainPage" className={classes.navtext}>О нас</CustomLink>
                <CustomLink to="/CollectionPage" className={classes.navtext}>Коллекция</CustomLink>
                <CustomLink to="/ProfilePage" className={classes.navtext}>Профиль</CustomLink>
            </div>
        </header>
    );
};

export default MyHeader;
