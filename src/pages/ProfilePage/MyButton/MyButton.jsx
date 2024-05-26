import React from "react";
import styles from './MyButton.module.css';

const MyButton = ({children, ...props}) => {
    return (
        <div className={styles.buttonContainer}>
            <button {...props} className={styles.button}>
                {children}
            </button>
        </div>
    );
};

export default MyButton;

