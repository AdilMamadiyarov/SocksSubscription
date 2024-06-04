import React from 'react';
import FAQ from '../../../components/FAQ/FAQ';
import TypeWriter from '../../../components/TypeEffect/TypeWriter';

function FaqPage() {
    const faqData = [
        { 
            question: "Как часто приходят носки?", 
            answer: "- Каждый месяц",
        },
        { 
            question: "Что если у меня будет другой адрес?", 
            answer: "- Вы можете изменить свой адрес в любой момент в своем профиле",
        },
        { 
            question: "Мне ничего не пришло, верните деньги", 
            answer: "- нет.",
        },
        { 
            question: "Почему так дешево?", 
            answer: "- потому то",
        },
        { 
            question: "Можно ли самим выбрать стиль носков?", 
            answer: "- рискните",
        },
    ];
    

    return (
        <div>
            <TypeWriter words={[
                "Вопрос и ответ",
                "Найдите ответ на любой вопрос!",
                "Мы рады вас видеть!",
            ]} style={{ fontFamily: 'monospace', fontSize: '2em', color: 'black' }}/>
            
            <FAQ data={faqData} />
        </div>
    );
}

export default FaqPage;
