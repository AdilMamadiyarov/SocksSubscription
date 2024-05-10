import React from "react";
import classes from './MyHeader.module.css'; 
import { CustomLink } from "../CustomLink/CustomLink";


const MyHeader = ({ ...props }) => { 
    return (
        <header {...props} className={classes.MyHeader}>
            <CustomLink to="/MainPage">MainPage</CustomLink>
            <h1 style={{color: 'black'}}>SockArt</h1>
            <CustomLink to="/ProfilePage">ProfilePage</CustomLink>
        </header>
    );
};

export default MyHeader;