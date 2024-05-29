import React, { useState, useEffect } from "react";
import MyHeader from "../../components/MyHeader/MyHeader";
import MySlider from "../../components/MySlider/MySlider";
import Footer from "../../components/Footer/Footer";
import cl from "./Collection.module.css";
import { SocksData, LightSocks, DarkSocks } from "../../Socks/Socks";

function CollectionPage() {
    const [sliderData, setSliderData] = useState(SocksData);
    const [visible, setVisible] = useState(SocksData);

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
        // localStorage.removeItem("sliderData")
    }
    const rootClasses = [cl.myModal];
    if (visible) {
        rootClasses.push(cl.active);
    }
    return (
        <div className={cl.container}>
            <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
                <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                </div>
            </div>
            <MyHeader/>
            <h1 style={{textAlign:"center"}}>Моя коллекция</h1>
            <div className={cl.slidercontainer}>
                <MySlider SliderData={sliderData} slides={2}/>
            </div>
            <button onClick={Change}>Доставить</button>
            <Footer/>
        </div>
    );
}

export default CollectionPage;
