import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './address.module.css';

function Address() {
  const [address, setAddress] = useState(() => {
    const storedAddress = localStorage.getItem('address');
    return storedAddress ? JSON.parse(storedAddress) : {
      house: '',
      apartment: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    };
  });

  const [initialAddress, setInitialAddress] = useState(address);
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(() => {
    const storedIsSubmitted = localStorage.getItem('isSubmitted');
    return storedIsSubmitted ? JSON.parse(storedIsSubmitted) : false;
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('address', JSON.stringify(address));
  }, [address]);

  useEffect(() => {
    localStorage.setItem('isSubmitted', JSON.stringify(isSubmitted));
  }, [isSubmitted]);

  const validate = async () => {
    const errors = {};

    if (!address.house) {
      errors.house = 'Номер дома обязателен';
    }
    if (!address.apartment) {
      errors.apartment = 'Номер квартиры обязателен';
    }
    if (!address.street) {
      errors.street = 'Улица обязательна';
    }
    if (!address.city) {
      errors.city = 'Город обязателен';
    }
    if (!address.state) {
      errors.state = 'Штат/Область обязательны';
    }
    if (!address.zip) {
      errors.zip = 'Почтовый индекс обязателен';
    } else if (!/^\d{6}$/.test(address.zip)) { // Для почтового индекса Казахстана
      errors.zip = 'Неверный формат почтового индекса';
    }
    if (!address.country) {
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
          street: address.street,
          city: address.city,
          state: address.state,
          postalcode: address.zip,
          country: address.country,
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
    setAddress({
      ...address,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setIsSubmitted(true);
      setIsEditing(false);
      setInitialAddress(address); // Обновляем начальное состояние после сохранения
      alert(`Address submitted: ${JSON.stringify(address, null, 2)}`);
    }
  };

  const handleReset = () => {
    setAddress({
      house: '',
      apartment: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    });
    setErrors({});
    setIsSubmitted(false);
    setIsEditing(false);
    localStorage.setItem('isSubmitted', JSON.stringify(false));
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

      setAddress({
        house: data.house_number || '',
        apartment: '', // Оставляем пустым, так как Nominatim не возвращает информацию о квартире
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setAddress(initialAddress);
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Номер дома:</label>
          <input
            type="text"
            name="house"
            value={address.house}
            onChange={handleChange}
            required
            disabled={isSubmitted && !isEditing}
          />
          {errors.house && <span className={styles.error}>{errors.house}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Номер квартиры:</label>
          <input
            type="text"
            name="apartment"
            value={address.apartment}
            onChange={handleChange}
            required
            disabled={isSubmitted && !isEditing}
          />
          {errors.apartment && <span className={styles.error}>{errors.apartment}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Улица:</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            required
            disabled={isSubmitted && !isEditing}
          />
          {errors.street && <span className={styles.error}>{errors.street}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Город:</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
            disabled={isSubmitted && !isEditing}
          />
          {errors.city && <span className={styles.error}>{errors.city}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Штат/Область:</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
            disabled={isSubmitted && !isEditing}
          />
          {errors.state && <span className={styles.error}>{errors.state}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Почтовый индекс:</label>
          <input
            type="text"
            name="zip"
            value={address.zip}
            onChange={handleChange}
            required
            disabled={isSubmitted && !isEditing}
          />
          {errors.zip && <span className={styles.error}>{errors.zip}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Страна:</label>
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleChange}
            required
            disabled={isSubmitted && !isEditing}
          />
          {errors.country && <span className={styles.error}>{errors.country}</span>}
        </div>
        {errors.general && <div className={styles.generalError}>{errors.general}</div>}

        <div className={styles.buttonGroup}>
          {isSubmitted && !isEditing ? (
            <>
              <button type="button" className={styles.button} onClick={handleEdit}>Изменить</button>
            </>
          ) : (
            <>
                            <button type="submit" className={styles.button} disabled={isValidating || JSON.stringify(address) === JSON.stringify(initialAddress)}>Сохранить</button>
              <button type="button" className={styles.button} onClick={handleReset}>Сбросить</button>
              <button type="button" className={styles.button} onClick={handleGetLocation}>Получить местоположение</button>
              <button type="button" className={styles.button} onClick={handleCancelEdit}>Отменить</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Address;
