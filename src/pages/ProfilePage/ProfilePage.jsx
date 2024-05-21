import React, { useCallback, useContext, useEffect, useState } from "react";
import MyHeader from "../../components/MyHeader/MyHeader";
import { AuthContext } from "../../components/context";
import { useNavigate } from "react-router-dom";
import styles from '../../pages/ProfilePage/ProfilePage.module.css';
import Footer from "../../components/Footer/Footer";
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
function validatePhoneNumber(phoneNumber) {
  const regex = /^\d{10}$/;
  return regex.test(phoneNumber);
}

function ProfilePage() {
  const { setIsAuth, email, setEmail, name, setName, password, setPassword } = useContext(AuthContext);


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
  
    setUser((prevUser) => ({
      ...prevUser,
      firstName: localStorage.getItem('name') || prevUser.firstName,
      email: localStorage.getItem('email') || prevUser.email
    }));
  }, [setEmail, setName, setPassword]);
  
  useEffect(() => {
    Data();
    console.log(email, name, password);
  }, [Data, email, name, password]);
  



  const [user, setUser] = useState({
    email: email,
    firstName: name,
    lastName: "Иванов",
    birthDate: "",
    gender: "",
    address: "",
    phoneNumber: "",
    education: "",
    educationInstitution: "",
    profession: "",
    bio: "",
    interests: [],
    links: [],
    photo: ""
  });

  const [selectedMenuItem, setSelectedMenuItem] = useState("Информация аккаунта");


  

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
    return (
      <div>
      <MyHeader />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.welcome}>
            <p>Добро Пожаловать!</p>
          </div>
          <ul>
            <li onClick={() => handleMenuItemClick("Информация аккаунта")}>Информация аккаунта</li>
            <li onClick={() => handleMenuItemClick("Адрес")}>Адрес</li>
            <li onClick={() => handleMenuItemClick("Доставка")}>Доставка</li>
            <li onClick={() => handleMenuItemClick("Способ оплаты")}>Способ оплаты</li>
            <li onClick={() => handleMenuItemClick("Коллекция")}>Коллекция</li>
            <li onClick={() => handleMenuItemClick("Подписка")}>Подписка</li>
            <li onClick={LogoutUser}>Выход из аккаунта</li>
            
          </ul>
        </div>
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
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => setUser({ ...user, editingProfilePicture: false })}
            >
              Сохранить
            </button>
          </div>
        </>
      ) : (
        <div className={styles.editProfileContainer}>
          <span>Изменить профиль</span>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => setUser({ ...user, editingProfilePicture: true })}
            >
              Изменить
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
</div>


<div className={styles.section}>
  <div>
    <strong>Имя:</strong>
    <div>
      {user.editingFirstName ? (
        <>
          <input
            type="text"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            className={styles.input}
          />
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => setUser({ ...user, editingFirstName: false })}
            >
              Сохранить
            </button>
          </div>
        </>
      ) : (
        <>
          <span>{user.firstName}</span>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => setUser({ ...user, editingFirstName: true })}
            >
              Изменить
            </button>
          </div>
        </>
      )}
    </div>
  </div>
</div>

<div className={styles.section}>
  <div>
    <strong>Фамилия:</strong>
    <div>
      {user.editingLastName ? (
        <>
          <input
            type="text"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            className={styles.input}
          />
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => setUser({ ...user, editingLastName: false })}
            >
              Сохранить
            </button>
          </div>
        </>
      ) : (
        <>
          <span>{user.lastName}</span>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => setUser({ ...user, editingLastName: true })}
            >
              Изменить
            </button>
          </div>
        </>
      )}
    </div>
  </div>
</div>

<div className={styles.section}>
  <div>
    <strong>Электронная почта:</strong>
    <div>
      {user.editingEmail ? (
        <>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className={styles.input}
            style={{ borderColor: user.email && !validateEmail(user.email) ? "red" : "" }}
          />
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => {
                if (validateEmail(user.email)) {
                  setUser({ ...user, editingEmail: false });
                }
              }}
            >
              Сохранить
            </button>
          </div>
        </>
      ) : (
        <>
          <span>{user.email}</span>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => setUser({ ...user, editingEmail: true })}
            >
              Изменить
            </button>
          </div>
        </>
      )}
    </div>
  </div>
</div>

<div className={styles.section}>
  <div>
    <strong>Пол:</strong>
    <div>
      {user.editingGender ? (
        <>
          <select
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
            className={styles.input}
            size="2"
          >
            <option value="Female">Женский</option>
            <option value="Male">Мужской</option>
          </select>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => setUser({ ...user, editingGender: false })}
            >
              Сохранить
            </button>
          </div>
        </>
      ) : (
        <>
          <span>{user.gender}</span>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => setUser({ ...user, editingGender: true })}
            >
              Изменить
            </button>
          </div>
        </>
      )}
    </div>
  </div>
</div>

<div className={styles.section}>
  <div>
    <strong>Мобильный телефон:</strong>
    <div>
      {user.editingPhoneNumber ? (
        <>
          <input
            type="number"
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            className={styles.input}
            style={{ borderColor: user.phoneNumber && !validatePhoneNumber(user.phoneNumber) ? "red" : "" }}
          />
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => {
                if (validatePhoneNumber(user.phoneNumber)) {
                  setUser({ ...user, editingPhoneNumber: false });
                }
              }}
            >
              Сохранить
            </button>
          </div>
        </>
      ) : (
        <>
          <span>{user.phoneNumber}</span>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => setUser({ ...user, editingPhoneNumber: true })}
            >
              Изменить
            </button>
          </div>
        </>
      )}
    </div>
  </div>
</div>

<div className={styles.section}>
  <div>
    <strong>Размер ноги:</strong>
    <div>
      {user.editingShoeSize ? (
        <>
          <input
            type="number"
            value={user.shoeSize}
            onChange={(e) => setUser({ ...user, shoeSize: e.target.value })}
            className={styles.input}
          />
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => setUser({ ...user, editingShoeSize: false })}
            >
              Сохранить
            </button>
          </div>
        </>
      ) : (
        <>
          <span>{user.shoeSize}</span>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => setUser({ ...user, editingShoeSize: true })}
            >
              Изменить
            </button>
          </div>
        </>
      )}
    </div>
  </div>
</div>



  </div>
)}



          {selectedMenuItem === "Адрес" && (
            <div>
              {/* Форма для редактирования адреса */}
            </div>
          )}
          {/* Добавьте аналогичные блоки для других пунктов меню */}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ProfilePage;
