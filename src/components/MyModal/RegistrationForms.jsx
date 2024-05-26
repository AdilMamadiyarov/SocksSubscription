import React, { useContext, useState } from 'react';
import { AuthContext } from '../context';
import reg from './Authorization.module.css'
import create from './CreateAccount.module.css'

const RegistrationForm = ({form, setForm}) => {
    const { setIsAuth } = useContext(AuthContext);
    const {email, setEmail} = useContext(AuthContext);
    const {name, setName} = useContext(AuthContext);
    const {password, setPassword} = useContext(AuthContext);

    const [confirmPassword, setConfirmPassword] = useState('');

    const [ErrorText, setErrorText] = useState('ㅤ');
    const [IncorrectData, setIncorrectData] = useState('ㅤ');

    const [InputEmail, setInputEmail] = useState('');
    const [InputPassword, setInputPassword] = useState('');
    function Registration(){
        setForm("CreateAccount")
    }
    function ReturnToAuth(){
        setForm("Authorization")
    }

    const LoginUser = (e) => {
        if (localStorage.getItem('email') === InputEmail && localStorage.getItem('password') === InputPassword){
            setIsAuth(true);
            localStorage.setItem('auth', 'true')
        }
        else {
            e.preventDefault();
            setIncorrectData('Вы ввели неверный email или пароль')
        }
    };

    const CreateAccount = (e) =>{
        e.preventDefault();
        if (password===confirmPassword){
            setForm("Authorization")
            localStorage.setItem('email', email);
            localStorage.setItem('name', name);
            localStorage.setItem('password', password);
        }
        else{
            setErrorText('Пароли не совпадают!')
        }
    }

    if (form === "CreateAccount"){
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
                        <p className='ErrorText' style={{fontSize: '20px'}}>{ErrorText}</p>
                    </div>
                    <div className={create['createbutton']}><button type="submit">Зарегистрироваться</button></div>

                </form>
            </div>
        );

    }

   else if (form === "Authorization"){
    return(
        <div className={reg['regcontainer']}>
            <h1 color='black' style={{fontSize: '35px'}}> SockArt </h1>
            <form onSubmit={LoginUser} className={reg['registrationform']}>
                <div>
                    <input type="email" id="email" placeholder='Электронная почта' value={InputEmail} onChange={(e) => setInputEmail(e.target.value)} required />
                </div>
                <div>
                    <input type="password" id="password" placeholder='Пароль' value={InputPassword} onChange={(e) => setInputPassword(e.target.value)} required />
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
    )
   }
};

export default RegistrationForm;