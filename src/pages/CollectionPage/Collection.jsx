import React, { useState, useEffect } from "react";
import MyHeader from "../../components/MyHeader/MyHeader";
import MySlider from "../../components/MySlider/MySlider";
import Footer from "../../components/Footer/Footer";
import classes from "./Collection.module.css";
import { SocksData, LightSocks, DarkSocks } from "../../Socks/Socks";

function CollectionPage() {
    const [sliderData, setSliderData] = useState(SocksData);
 
    // useEffect(() => {
    //     const savedSliderData = JSON.parse(localStorage.getItem("sliderData"));
    //     if (savedSliderData) {
    //         setSliderData(savedSliderData);
    //     } else {
    //         setSliderData(SocksData);
    //     }
    // }, []); 

    // useEffect(() => {
    //     localStorage.setItem("sliderData", JSON.stringify(sliderData));
    // }, [sliderData]);


    function Change() {
        setSliderData(prevSliderData => [...prevSliderData, ...LightSocks]);
    }

    return (
        <div className={classes.container}>
            <MyHeader/>
            <h1 style={{textAlign:"center"}}>Моя коллекция</h1>
            <div className={classes.slidercontainer}>
                <MySlider SliderData={sliderData} slides={2}/>
            </div>
            <button onClick={Change}>Доставить</button>
            <Footer/>
        </div>
    );
}

export default CollectionPage;
