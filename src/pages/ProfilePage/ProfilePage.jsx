import React, { useCallback, useContext, useEffect, useState } from "react";
import MyHeader from "../../components/MyHeader/MyHeader";
import { AuthContext } from "../../components/context";
import styles from '../../pages/ProfilePage/ProfilePage.module.css';
import Footer from "../../components/Footer/Footer";
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import Address from "../../pages/ProfilePage/Address/address";
import Payment from "../../pages/ProfilePage/Payment/Payment";
import MyButton from "./MyButton/MyButton";
import MyModal from "../../components/MyModal/RegistrationModal";
import modalstyle from "./Logout/Logout.module.css";
import SideBar from "./SideBar/SideBar";


function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePhoneNumber(phoneNumber) {
  const regex = /^\d{10}$/;
  return regex.test(phoneNumber);
}

function ProfilePage() {
  const {setEmail, setName, setPassword, email: authEmail, name: authName } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Информация аккаунта");

  const Data = useCallback(() => {
    setName(localStorage.getItem('name') || '');
    setEmail(localStorage.getItem('email') || '');
    setPassword(localStorage.getItem('password') || '');
  }, [setEmail, setName, setPassword]);
  
  useEffect(() => {
    Data();
  }, [Data]);


  const [user, setUser] = useState(() => {
    return {
      email: authEmail || localStorage.getItem('email') || "example@example.com",
      name: authName || localStorage.getItem('name') || "",
      birthDate: localStorage.getItem('birthDate') || "",
      phoneNumber: localStorage.getItem('phoneNumber') || "",
      shoeSize: localStorage.getItem('shoeSize') || "",
      editingName: false,
      editingBirthDate: false,
      editingEmail: false,
      editingPhoneNumber: false,
      editingShoeSize: false,
    };
  });

  const saveUserToLocalStorage = (updatedUser) => {
    localStorage.setItem('email', updatedUser.email);
    localStorage.setItem('name', updatedUser.name);
    localStorage.setItem('birthDate', updatedUser.birthDate);
    localStorage.setItem('phoneNumber', updatedUser.phoneNumber);
    localStorage.setItem('shoeSize', updatedUser.shoeSize);
  };
  
  const handlePhoneNumberChange = (value) => {
    if (value.startsWith("+7")) {
      value = value.slice(2);
    }
    setUser((prevUser) => ({ ...prevUser, phoneNumber: value }));
  };

  const handlePhoneNumberSave = () => {
    if (validatePhoneNumber(user.phoneNumber)) {
      setUser((prevUser) => {
        const updatedUser = { ...prevUser, editingPhoneNumber: false };
        saveUserToLocalStorage(updatedUser);
        return updatedUser;
      });
    }
  };

  const handleNameChange = (value) => {
    setUser((prevUser) => ({ ...prevUser, name: value }));
  };

  const handleNameSave = () => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, editingName: false };
      saveUserToLocalStorage(updatedUser);
      return updatedUser;
    });
  };

  const handleBirthDateChange = (value) => {
    setUser((prevUser) => ({ ...prevUser, birthDate: value }));
  };

  const handleBirthDateSave = () => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, editingBirthDate: false };
      saveUserToLocalStorage(updatedUser);
      return updatedUser;
    });
  };

  return (
    <div>
      <MyHeader />
      <div className={styles.container}>
      <SideBar selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem} modalVisible={modalVisible} setModalVisible={setModalVisible}/>

<div className={styles.profile}>
  <h1>{selectedMenuItem}</h1>
  {selectedMenuItem === "Информация аккаунта" && (
    <div className={styles.userData}>
      <div className={styles.section}>
        <div>
          <strong>Фотография профиля:</strong>
          <div className={styles.profileContainer}>
            
            <ProfilePicture user={user} />
            {user.editingProfilePicture ? (
              
              <>
                <input
                  type="file"
                  onChange={(e) => setUser({ ...user, profilePicture: URL.createObjectURL(e.target.files[0]) })}
                  className={styles.input}
                />
                  <MyButton
                    onClick={() => setUser((prevUser) => {
                      const updatedUser = { ...prevUser, editingProfilePicture: false };
                      saveUserToLocalStorage(updatedUser);
                      return updatedUser;
                    })}>
                    Сохранить
                  </MyButton>
                
              </>
            ) : (
              <div className={styles.editProfileContainer}>
                <span>Изменить профиль</span>
                  <MyButton onClick={() => setUser({ ...user, editingProfilePicture: true })}>
                    Изменить
                  </MyButton>
              </div>
            )}
          </div>
        </div>
      </div>
              

<div className={styles.section}>
  <div>
    <strong>Имя:</strong>
    <div className={styles.inputContainer}>
      {user.editingName ? (
        <>
          <input
            type="text"
            value={user.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={styles.input}
          />
            <MyButton onClick={handleNameSave}>
              Сохранить
            </MyButton>
        </>
      ) : (
        <>
          <span>{user.name}</span>
            <MyButton onClick={() => setUser({ ...user, editingName: true })}>
              Изменить
            </MyButton>
        </>
      )}
    </div>
  </div>
</div>


<div className={styles.section}>
  <div>
    <strong>Дата рождения:</strong>
    <div className={styles.inputContainer}>
      {user.editingBirthDate ? (
        <>
          <input
            type="date"
            value={user.birthDate}
            onChange={(e) => handleBirthDateChange(e.target.value)}
            className={styles.input}
          />
            <MyButton onClick={handleBirthDateSave}>
              Сохранить
            </MyButton>
        </>
      ) : (
        <>
          <span>{user.birthDate}</span>
            <MyButton onClick={() => setUser({ ...user, editingBirthDate: true })}>
              Изменить
            </MyButton>
        </>
      )}
    </div>
  </div>
</div>

<div className={styles.section}>
  <div>
    <strong>Email:</strong>
    <div className={styles.inputContainer}>
      {user.editingEmail ? (
        <>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className={styles.input}
            style={{ borderColor: user.email && !validateEmail(user.email) ? "red" : "" }}
          />
            <MyButton
              onClick={() => {
                if (validateEmail(user.email)) {
                  setUser((prevUser) => {
                    const updatedUser = { ...prevUser, editingEmail: false };
                    saveUserToLocalStorage(updatedUser);
                    return updatedUser;
                  });
                }
              }}>
              Сохранить
            </MyButton>
        </>
      ) : (
        <>
          <span>{user.email}</span>
          <MyButton onClick={() => setUser({ ...user, editingEmail: true })}>
            Изменить
          </MyButton>
        </>
      )}
    </div>
  </div>
</div>

<div className={styles.section}>
  <div>
    <strong>Мобильный телефон:</strong>
    <div className={styles.inputContainer}>
      {user.editingPhoneNumber ? (
        <>
          <input
            type="text"
            value={`+7${user.phoneNumber}`}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
            className={styles.input}
            style={{ borderColor: user.phoneNumber && !validatePhoneNumber(user.phoneNumber) ? "red" : "" }}
            placeholder="Введите номер телефона"/>
            <MyButton onClick={handlePhoneNumberSave}>
              Сохранить
            </MyButton>
        </>
      ) : (
        <>
          <span>+7{user.phoneNumber}</span>
            <MyButton onClick={() => setUser({ ...user, editingPhoneNumber: true })}>
              Изменить
            </MyButton>
        </>
      )}
    </div>
  </div>
</div>

    <div className={styles.section}>
      <div>
        <strong>Размер ноги:</strong>
            <div className={styles.inputContainer}>
          {user.editingShoeSize ? (
            <>
              <input
                type="number"
                value={user.shoeSize}
                onChange={(e) => setUser({ ...user, shoeSize: e.target.value })}
                className={styles.input}
              />
                <MyButton
                  onClick={() => setUser((prevUser) => {
                    const updatedUser = { ...prevUser, editingShoeSize: false };
                    saveUserToLocalStorage(updatedUser);
                    return updatedUser;
                  })}>
                  Сохранить
                </MyButton>
            </>
          ) : (
            <>
              <span>{user.shoeSize}</span>  
                <MyButton onClick={() => setUser({ ...user, editingShoeSize: true })}>
                  Изменить
                </MyButton>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  )}

    {selectedMenuItem === "Адрес" && (<Address />)}
    {selectedMenuItem === "Способ оплаты" && (<Payment />)}
  </div>
</div>
      <MyModal visible={modalVisible} setVisible={setModalVisible} registration={false} style={modalstyle}/>
      <Footer />
    </div>
  );
}

export default ProfilePage;