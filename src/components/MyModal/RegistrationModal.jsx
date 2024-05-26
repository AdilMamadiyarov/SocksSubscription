import React, { useContext, useState } from 'react';
import mystyle from './RegistrationModal.module.css';
import RegistrationForm from './RegistrationForms';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';

const MyModal = ({ visible, setVisible, registration, style }) => {
    const [form, setForm] = useState('Authorization');
    const {setIsAuth} = useContext(AuthContext);

    const navigate = useNavigate()

    const LogoutUser = () => {
        setIsAuth(false);
        setVisible(false);
        localStorage.removeItem('auth')
        navigate('/MainPage')
        window.location.reload();
    };
    const cancelLogout = () => {
      setVisible(false);
    };

    const cl = registration ? mystyle : style;
    
    const rootClasses = [cl.myModal];
    if (visible) {
        rootClasses.push(cl.active);
    }

    if (registration){
        return (
            <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
                <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                    <RegistrationForm form={form} setForm={setForm}/>
                </div>
            </div>
        );
    }
    else{
        return (
            <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
                <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                    <h2>Вы уверены, что хотите выйти из аккаунта?</h2>
                    <button onClick={LogoutUser}>Да</button>
                    <button onClick={cancelLogout}>Отмена</button>
                </div>
            </div>
        );
    }
};

export default MyModal;
