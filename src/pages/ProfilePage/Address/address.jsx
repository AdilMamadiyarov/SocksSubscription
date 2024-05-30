import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './address.module.css';

function Address() {
  const [addresses, setAddresses] = useState(() => {
    const storedAddresses = localStorage.getItem('addresses');
    return storedAddresses ? JSON.parse(storedAddresses) : [];
  });

  const [defaultAddressIndex, setDefaultAddressIndex] = useState(() => {
    const storedDefaultIndex = localStorage.getItem('defaultAddressIndex');
    return storedDefaultIndex ? JSON.parse(storedDefaultIndex) : -1;
  });

  const [currentAddress, setCurrentAddress] = useState({
    house: '',
    apartment: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(addresses.length === 0);
  const [isAddButtonVisible, setIsAddButtonVisible] = useState(addresses.length > 0);

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
    if (defaultAddressIndex >= 0 && defaultAddressIndex < addresses.length) {
      localStorage.setItem('mainaddress', JSON.stringify(addresses[defaultAddressIndex]));
    } else {
      localStorage.removeItem('mainaddress');
    }
  }, [addresses, defaultAddressIndex]);

  useEffect(() => {
    localStorage.setItem('defaultAddressIndex', JSON.stringify(defaultAddressIndex));
  }, [defaultAddressIndex]);

  const handleSetDefault = (index) => {
    setDefaultAddressIndex(index);
    if (index >= 0 && index < addresses.length) {
      localStorage.setItem('mainaddress', JSON.stringify(addresses[index]));
    } else {
      localStorage.removeItem('mainaddress');
    }
  };

  const validate = async () => {
    const errors = {};

    if (!currentAddress.house) {
      errors.house = 'Номер дома обязателен';
    }
    if (!currentAddress.apartment) {
      errors.apartment = 'Номер квартиры обязателен';
    }
    if (!currentAddress.street) {
      errors.street = 'Улица обязательна';
    }
    if (!currentAddress.city) {
      errors.city = 'Город обязателен';
    }
    if (!currentAddress.state) {
      errors.state = 'Штат/Область обязательны';
    }
    if (!currentAddress.zip) {
      errors.zip = 'Почтовый индекс обязателен';
    } else if (!/^\d{6}$/.test(currentAddress.zip)) { 
      errors.zip = 'Неверный формат почтового индекса';
    }
    if (!currentAddress.country) {
      errors.country = 'Страна обязательна';
    }

    if (Object.keys(errors).length === 0) {
      const isValid = await validateAddressWithAPI();
      if (!isValid) {
        errors.general = 'Адрес не найден. Проверьте правильность введённых данных.';
      }
    }

    return errors;
  };

  const validateAddressWithAPI = async () => {
    setIsValidating(true);
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          street: currentAddress.street,
          city: currentAddress.city,
          state: currentAddress.state,
          postalcode: currentAddress.zip,
          country: currentAddress.country,
          format: 'json',
          addressdetails: 1,
        }
      });

      setIsValidating(false);
      return response.data.length > 0;
    } catch (error) {
      setIsValidating(false);
      console.error('Error validating address:', error);
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress({
      ...currentAddress,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      let updatedAddresses;
      let newIndex;
  
      if (editingIndex !== null) {
        updatedAddresses = [...addresses];
        updatedAddresses[editingIndex] = currentAddress;
        newIndex = editingIndex;
      } else {
        updatedAddresses = [...addresses, currentAddress];
        newIndex = updatedAddresses.length - 1;  
      }
  
      setAddresses(updatedAddresses);
      setDefaultAddressIndex(newIndex); 
      localStorage.setItem('mainaddress', JSON.stringify(currentAddress)); 
  
      setCurrentAddress({
        house: '',
        apartment: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      });
      setEditingIndex(null);
      setIsFormVisible(false);
      setIsAddButtonVisible(true); 
      alert(`Address submitted: ${JSON.stringify(currentAddress, null, 2)}`);
    }
  };
  

  const handleEdit = (index) => {
    setCurrentAddress(addresses[index]);
    setEditingIndex(index);
    setIsFormVisible(true);
  };
  
  const handleDelete = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    if (index === defaultAddressIndex) {
      setDefaultAddressIndex(-1);
      localStorage.removeItem("mainaddress");
    } else if (index < defaultAddressIndex) {
      setDefaultAddressIndex(defaultAddressIndex - 1);
    }
    setIsAddButtonVisible(updatedAddresses.length > 0); 
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fillAddressFromLocation(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Не удалось получить местоположение.');
        }
      );
    } else {
      alert('Геолокация не поддерживается вашим браузером.');
    }
  };

  const fillAddressFromLocation = async (latitude, longitude) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json',
          addressdetails: 1,
        }
      });

      const data = response.data.address;

      setCurrentAddress({
        house: data.house_number || '',
        apartment: '',
        street: data.road || '',
        city: data.city || data.town || data.village || '',
        state: data.state || '',
        zip: data.postcode || '',
        country: data.country || ''
      });
    } catch (error) {
      console.error('Error fetching address from location:', error);
    }
  };

  const handleReset = () => {
    setCurrentAddress({
      house: '',
      apartment: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    });
    setErrors({});
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setCurrentAddress({
      house: '',
      apartment: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    });
    setEditingIndex(null);
    setIsFormVisible(false);
  };
  return (
    <div className={styles.container}>
      {isAddButtonVisible && !isFormVisible && (
        <button className={styles.addButton} onClick={() => setIsFormVisible(true)}>
          Добавить адрес
        </button>
      )}
      {(isFormVisible || addresses.length === 0) && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Номер дома:</label>
            <input
              type="text"
              name="house"
              value={currentAddress.house}
              onChange={handleChange}
              required
            />
            {errors.house && <span className={styles.error}>{errors.house}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Номер квартиры:</label>
            <input
              type="text"
              name="apartment"
              value={currentAddress.apartment}
              onChange={handleChange}
              required
            />
            {errors.apartment && <span className={styles.error}>{errors.apartment}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Улица:</label>
            <input
              type="text"
              name="street"
              value={currentAddress.street}
              onChange={handleChange}
              required
            />
            {errors.street && <span className={styles.error}>{errors.street}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Город:</label>
            <input
              type="text"
              name="city"
              value={currentAddress.city}
              onChange={handleChange}
              required
            />
            {errors.city && <span className={styles.error}>{errors.city}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Штат/Область:</label>
            <input
              type="text"
              name="state"
              value={currentAddress.state}
              onChange={handleChange}
              required
            />
            {errors.state && <span className={styles.error}>{errors.state}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Почтовый индекс:</label>
            <input
              type="text"
              name="zip"
              value={currentAddress.zip}
              onChange={handleChange}
              required
            />
            {errors.zip && <span className={styles.error}>{errors.zip}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Страна:</label>
            <input
              type="text"
              name="country"
              value={currentAddress.country}
              onChange={handleChange}
              required
            />
            {errors.country && <span className={styles.error}>{errors.country}</span>}
          </div>
          {errors.general && <div className={styles.generalError}>{errors.general}</div>}
          
          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.button}
              disabled={isValidating}
            >
              Сохранить
            </button>
            <button type="button" className={styles.button} onClick={handleReset}>
              Сбросить
            </button>
            <button type="button" className={styles.button} onClick={handleGetLocation}>
              Получить местоположение
            </button>
            
              <button type="button" className={styles.button} onClick={handleCancelEdit}>
                Отменить
              </button>
            
          </div>
        </form>
      )}

      {!isFormVisible && (
        <div className={styles.addressList}>
          {addresses.map((address, index) => (
            <div
              key={index}
              className={`${styles.addressItem} ${defaultAddressIndex === index ? styles.defaultAddress : ''}`}
            >
              <div className={styles.addressDetails}>
                <p>{`${address.house} дом`}, {` ${address.apartment} кв.`}</p>
                <p> {`${address.street}`}, {` ${address.city}`}</p>
                <p>{`${address.state}`}, {`${address.zip}`}, {`${address.country}`}</p>
              </div>
              <div className={styles.addressActions}>
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => handleEdit(index)}
                >
                  Изменить
                </button>
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => handleDelete(index)}
                >
                  Удалить
                </button>
              </div>
              <div className={styles.defaultButtonContainer}>
                <button
                  type="button"
                  className={styles.buttonStar}
                  onClick={() => handleSetDefault(index)}
                >
                  {defaultAddressIndex === index ? '★' : '☆'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Address;
