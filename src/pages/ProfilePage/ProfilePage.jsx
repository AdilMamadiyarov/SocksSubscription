import React, { useCallback, useContext, useEffect, useState } from "react";
import MyHeader from "../../components/MyHeader/MyHeader";
import { AuthContext } from "../../components/context";
import { useNavigate } from "react-router-dom";
import styles from '../../pages/ProfilePage/ProfilePage.module.css';
import Footer from "../../components/Footer/Footer";
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import Address from "../../pages/ProfilePage/address";
import Payment from "../../pages/ProfilePage/Payment";


function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePhoneNumber(phoneNumber) {
  const regex = /^\d{10}$/;
  return regex.test(phoneNumber);
}
function LogoutButton({ handleLogout }) {
  const [showModal, setShowModal] = useState(false);

  const confirmLogout = () => {
    handleLogout();
    setShowModal(false);
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.navItem} onClick={() => setShowModal(true)}>
        Выход из аккаунта
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Вы уверены, что хотите выйти из аккаунта?</h2>
            <button onClick={confirmLogout}>Да</button>
            <button onClick={cancelLogout}>Отмена</button>
          </div>
        </div>
      )}
    </>
  );
}
function ProfilePage() {
  const { setIsAuth, setEmail, setName, setPassword, email: authEmail, name: authName } = useContext(AuthContext);
  const navigate = useNavigate();
  

  const Data = useCallback(() => {
    setName(localStorage.getItem('name') || '');
    setEmail(localStorage.getItem('email') || '');
    setPassword(localStorage.getItem('password') || '');
  }, [setEmail, setName, setPassword]);
  
  useEffect(() => {
    Data();
  }, [Data]);

  const [showModal, setShowModal] = useState(false);




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

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('birthDate');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('shoeSize');
    navigate('/MainPage');
    window.location.reload();
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
            <li onClick={() => handleMenuItemClick("Информация аккаунта")} className={selectedMenuItem === "Информация аккаунта" ? styles.active : ""}>Информация аккаунта</li>
            <li onClick={() => handleMenuItemClick("Адрес")} className={selectedMenuItem === "Адрес" ? styles.active : ""}>Адрес</li>
            <li onClick={() => handleMenuItemClick("Доставка")} className={selectedMenuItem === "Доставка" ? styles.active : ""}>Доставка</li>
            <li onClick={() => handleMenuItemClick("Способ оплаты")} className={selectedMenuItem === "Способ оплаты" ? styles.active : ""}>Способ оплаты</li>
            <li onClick={() => handleMenuItemClick("Коллекция")} className={selectedMenuItem === "Коллекция" ? styles.active : ""}>Коллекция</li>
            <li onClick={() => handleMenuItemClick("Подписка")} className={selectedMenuItem === "Подписка" ? styles.active : ""}>Подписка</li>
            <li><LogoutButton handleLogout={handleLogout} /></li>
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
                            onClick={() => setUser((prevUser) => {
                              const updatedUser = { ...prevUser, editingProfilePicture: false };
                              saveUserToLocalStorage(updatedUser);
                              return updatedUser;
                            })}
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
    <div className={styles.inputContainer}>
      {user.editingName ? (
        <>
          <input
            type="text"
            value={user.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={styles.input}
          />
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={handleNameSave}
            >
              Сохранить
            </button>
          </div>
        </>
      ) : (
        <>
          <span>{user.name}</span>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => setUser({ ...user, editingName: true })}
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
                        <div className={styles.buttonContainer}>
                          <button
                            className={styles.button}
                            onClick={handleBirthDateSave}
                          >
                            Сохранить
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span>{user.birthDate}</span>
                        <div className={styles.buttonContainer}>
                          <button
                            className={styles.button}
                            onClick={() => setUser({ ...user, editingBirthDate: true })}
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
                        <div className={styles.buttonContainer}>
                          <button
                            className={styles.button}
                            onClick={() => {
                              if (validateEmail(user.email)) {
                                setUser((prevUser) => {
                                  const updatedUser = { ...prevUser, editingEmail: false };
                                  saveUserToLocalStorage(updatedUser);
                                  return updatedUser;
                                });
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
                          placeholder="Введите номер телефона"
                        />
                        <div className={styles.buttonContainer}>
                          <button
                            className={styles.button}
                            onClick={handlePhoneNumberSave}
                          >
                            Сохранить
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span>+7{user.phoneNumber}</span>
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
                      <div className={styles.inputContainer}>
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
                            onClick={() => setUser((prevUser) => {
                              const updatedUser = { ...prevUser, editingShoeSize: false };
                              saveUserToLocalStorage(updatedUser);
                              return updatedUser;
                            })}
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
            <Address />
          )}
          {selectedMenuItem === "Способ оплаты" && (
            <Payment />
          )}

        </div>
       
      </div>
      <Footer />
      

    </div>
  );
}

export default ProfilePage;