import React from "react";
import classes from './FAQ.module.css';

const FAQ = ({ data, ...props }) => {
    return (
        <div {...props} className={classes.container}>
            {data.map((item, index) => (
                <div key={index} className={classes["faqcontainer"]}>
                    <div className={classes["question"]}>{item.question}</div>
                    <div className={classes["answer"]}>{item.answer}</div>
                </div>
            ))}
        </div>
    );
};

export default FAQ;
