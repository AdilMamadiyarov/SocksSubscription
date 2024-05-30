import React, { useState, useEffect } from 'react';
import FAQ from '../../../components/FAQ/FAQ';

function faqpage() {
    const faqData = [
        { 
            question: "Как часто приходят носки?", 
            answer: "Каждый месяц",
        },
        { 
            question: "Что если у меня будет другой адрес?", 
            answer: "Вы можете в изменить свой адрес в любой момент в своем профиле",
        },
        { 
            question: "Мне ничего не пришло, верните деньги", 
            answer: "нет.",
        },
        { 
            question: "Почему так дешево?", 
            answer: "потому то",
        },
        { 
            question: "Можно ли самим выбрать стиль носков?", 
            answer: "рискните",
        },
    ];
  return (
    <div>
        <FAQ data={faqData}/>
    </div>
  );
}

export default faqpage;
