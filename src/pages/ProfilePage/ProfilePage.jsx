import React, { useCallback, useContext, useEffect } from "react";
import MyButton from "../../components/MyButton/MyButton";
import MyHeader from "../../components/MyHeader/MyHeader";
import { AuthContext } from "../../components/context";
import { useNavigate } from "react-router-dom";


function ProfilePage() {
  const {setIsAuth} = useContext(AuthContext);
  const {email, setEmail} = useContext(AuthContext);
  const {name, setName} = useContext(AuthContext);
  const {password, setPassword} = useContext(AuthContext);

  const navigate = useNavigate()

  const LogoutUser = () => {
    setIsAuth(false);
    localStorage.removeItem('auth')
    navigate('/MainPage')
    window.location.reload();
  };

  const Data = useCallback(() => {
    setName(localStorage.getItem('name'));
    setEmail(localStorage.getItem('email'));
    setPassword(localStorage.getItem('password'));
  }, [setEmail, setName, setPassword]);

  useEffect(() => {
      Data();
  }, [Data]);

    return (
    <div>
        <MyHeader/>
        <h1>Профиль</h1>
        <p>{name}, {password}, {email}</p>
        <MyButton onClick={LogoutUser}>Кнопка</MyButton>
    </div>
  );
}

export default ProfilePage;
