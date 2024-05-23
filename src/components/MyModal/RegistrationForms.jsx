import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context';
import reg from './Authorization.module.css';
import create from './CreateAccount.module.css';

const RegistrationForm = ({ form, setForm }) => {
    const { setIsAuth } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ErrorText, setErrorText] = useState('');
    const [IncorrectData, setIncorrectData] = useState('');

    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (auth === 'true') {
            setIsAuth(true);
        }
    }, [setIsAuth]);

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedName = localStorage.getItem('name');
        const savedPassword = localStorage.getItem('password');

        if (savedEmail) setEmail(savedEmail);
        if (savedName) setName(savedName);
        if (savedPassword) setPassword(savedPassword);
    }, []);

    function Registration() {
        setForm("CreateAccount");
    }

    function ReturnToAuth() {
        setForm("Authorization");
    }

    const Logout = () => {
        setIsAuth(false);
        localStorage.setItem('auth', 'false');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('password');
        setEmail('');
        setName('');
        setPassword('');
        setConfirmPassword('');
    }

    const LoginUser = (e) => {
        e.preventDefault();
        if (localStorage.getItem('email') === email && localStorage.getItem('password') === password) {
            setIsAuth(true);
            localStorage.setItem('auth', 'true');
            setForm("AccountInfo");
        } else {
            setIncorrectData('Вы ввели неверный email или пароль');
        }
    };

    const CreateAccount = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setForm("Authorization");
            localStorage.setItem('email', email);
            localStorage.setItem('name', name);
            localStorage.setItem('password', password);
        } else {
            setErrorText('Пароли не совпадают!');
        }
    };
    

    

    if (form === "CreateAccount") {
        return (
            <div className={create['createcontainer']}>
                <div className={create['backdiv']}>
                    <button onClick={ReturnToAuth}>←</button>
                </div>
                <h1>Создайте аккаунт</h1>

                <form onSubmit={CreateAccount} className={reg['registrationform']}>
                    <div>
                        <input type="email" id="email" placeholder='Электронная почта' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <input type="text" id="name" placeholder='Ваше имя' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <input type="password" id="password" placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div>
                        <input type="password" id="confirmPassword" placeholder='Повторите пароль' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <div>
                        <p className='ErrorText' style={{ fontSize: '20px' }}>{ErrorText}</p>
                    </div>
                    <div className={create['createbutton']}><button type="submit">Зарегистрироваться</button></div>
                </form>
            </div>
        );
    } else if (form === "Authorization") {
        return (
            <div className={reg['regcontainer']}>
                <h1 color='black' style={{ fontSize: '35px' }}>SockArt</h1>
                <form onSubmit={LoginUser} className={reg['registrationform']}>
                    <div>
                        <input type="email" id="email" placeholder='Электронная почта' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <input type="password" id="password" placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Войти</button>
                    <p>{IncorrectData}</p>
                </form>
                <hr></hr>
                <p>ИЛИ</p>
                <hr></hr>
                <div className={reg['regdiv']}>
                    <h3>Продолжить с Google</h3>
                </div>
                <p className={reg['forgetpassword']}>Забыли пароль?</p>
                <div className={reg['forgotcontainer']}>
                    <p>У вас еще нет аккаунта?<button onClick={Registration}>Зарегистрироваться</button></p>
                </div>
                
            </div>
        );
    }
};

export default RegistrationForm;
