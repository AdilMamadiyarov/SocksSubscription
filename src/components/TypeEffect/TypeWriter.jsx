import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypeWriter = ({ words, ...props }) => {
    return (
        <div {...props}>
        <Typewriter
            words={words}
            loop={5}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </div>
    );
};

export default TypeWriter;
