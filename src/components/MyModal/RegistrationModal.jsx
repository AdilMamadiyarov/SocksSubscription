import React, { useState } from 'react';
import cl from './RegistrationModal.module.css';
import RegistrationForm from './RegistrationForms';

const MyModal = ({ visible, setVisible }) => {
    const [form, setForm] = useState('Authorization');

    const rootClasses = [cl.myModal];

    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                <RegistrationForm form={form} setForm={setForm}/>
            </div>
        </div>
    );
};

export default MyModal;
