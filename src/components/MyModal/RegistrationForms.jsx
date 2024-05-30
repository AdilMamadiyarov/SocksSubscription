import React, { useContext, useState } from 'react';
import { AuthContext } from '../context';
import reg from './Authorization.module.css'
import create from './CreateAccount.module.css'
import cl from './reset.module.css'
import PinInput from 'react-pin-input';

const RegistrationForm = ({form, setForm}) => {
    // registration form
    const { setIsAuth } = useContext(AuthContext);
    const {email, setEmail} = useContext(AuthContext);
    const {name, setName} = useContext(AuthContext);
    const {password, setPassword} = useContext(AuthContext);

    const [confirmPassword, setConfirmPassword] = useState('');

    // Incorrect texts
    const [ErrorText, setErrorText] = useState('ㅤ');
    const [IncorrectData, setIncorrectData] = useState('ㅤ');
    const [invalidcode, setinvalidcode] = useState('');

    // auth form
    const [InputEmail, setInputEmail] = useState('');
    const [InputPassword, setInputPassword] = useState('');

    // forgotpassword form
    const [curremail, setCurrEmail] = useState('');
    const [code, setCode] = useState('');
    const [isCodeCorrect, setIsCodeCorrect] = useState(false);
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

    const ChangePassword = (e) =>{
        e.preventDefault();
        if (password === localStorage.getItem('password')){
            setErrorText('Нельзя поменять на тот же пароль!')
        }
        else{
            if (password===confirmPassword){
                setForm("Authorization")
                localStorage.setItem('password', password);
            }
            else{
                setErrorText('Пароли не совпадают!')
            }
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
            <p className={reg['forgetpassword']} onClick={ResetPassword}>Забыли пароль?</p>
            <div className={reg['forgotcontainer']}>
                <p>У вас еще нет аккаунта?<button onClick={Registration}>Зарегистрироваться</button></p>
            </div>
        </div>
    )
   }
   else if (form === "ForgotPassword"){
    return (
        !isCodeCorrect ? (
            <div className={cl['container']}>
                <div className={cl['backdiv']}>
                    <button onClick={ReturnToAuth}>←</button>
                </div>
                <h2>Введите свой email</h2>
                <div>
                    <input type="email" id="email" placeholder='Электронная почта' value={curremail} onChange={(e) => setCurrEmail(e.target.value)} required />
                    <button onClick={SendCode} className={cl['sendbutton']}>Отправить код</button>
                </div>
                <div className={cl['codecontainer']}>
                    <PinInput 
                        length={4} 
                        initialValue=""
                        onChange={(value, index) => CheckCode(value)} 
                        type="numeric" 
                        inputMode="number"
                        style={{padding: '10px', marginTop: '50px'}}  
                        inputStyle={{borderColor: 'grey'}}
                        inputFocusStyle={{borderColor: 'black'}}
                        onComplete={(value, index) => {}}
                        autoSelect={true}
                        placeholder='|'
                        regexCriteria={/^[0-9]*$/}
                        disabled={isCodeCorrect}
                    />
                </div>
                <p>{invalidcode}</p>
                <p style={{marginTop: '50px'}}>Ваш код должен прийти вам на вашу почту!</p>
            </div>
        ) : (
            <div className={cl.resetcontainer}>
                <div className={cl['backdiv']}>
                    <button onClick={ReturnToAuth}>←</button>
                </div>
                <h2>Введите новый пароль</h2>
                <div>
                    <input type="password" id="password" placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <input type="password" id="confirmPassword" placeholder='Повторите пароль' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <p className='ErrorText' style={{fontSize: '20px'}}>{ErrorText}</p>
                <button onClick={ChangePassword} className={cl['sendbutton']} style={{marginTop: '0px'}}>Сменить пароль</button>
            </div>

            
        )
    )
}

   function ResetPassword(){
    setForm("ForgotPassword")
   }

    function SendCode(){
        const newCode = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        setCode(newCode.toString());
        console.log("Ваш код -", newCode);
    }

    function CheckCode(value){
        if (value.length === 4 && code === value){
            setIsCodeCorrect(true);
        } else if (value.length === 4 && code !== value){
            setinvalidcode("Неверный код!")
        }
    }
};

export default RegistrationForm;