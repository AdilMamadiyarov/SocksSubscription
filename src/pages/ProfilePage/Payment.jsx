import React, { useState, useEffect } from 'react';
import styles from './payment.module.css';

function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});
  const [savedCards, setSavedCards] = useState(() => {
    const storedCards = localStorage.getItem('savedCards');
    return storedCards ? JSON.parse(storedCards) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedCards', JSON.stringify(savedCards));
  }, [savedCards]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateCardData();
    if (Object.keys(validationErrors).length === 0) {
      const newCard = { cardNumber, cardName, expiryDate, cvv };
      setSavedCards([...savedCards, newCard]);
      resetForm();
      alert('Данные карты успешно сохранены!');
    } else {
      setErrors(validationErrors);
    }
  };

  const resetForm = () => {
    setCardNumber('');
    setCardName('');
    setExpiryDate('');
    setCvv('');
    setErrors({});
  };

  const validateCardData = () => {
    const errors = {};

    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
      errors.cardNumber = 'Номер карты должен содержать ровно 16 цифр';
    }

    if (!cardName.trim()) {
      errors.cardName = 'Введите имя, как оно указано на карте';
    }

    if (!expiryDate.trim() || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      errors.expiryDate = 'Введите срок действия карты в формате MM/YY';
    }

    if (!cvv.trim() || !/^\d{3}$/.test(cvv)) {
      errors.cvv = 'CVV должен содержать ровно 3 цифры';
    }

    return errors;
  };

  const handleDeleteCard = (index) => {
    const updatedCards = [...savedCards];
    updatedCards.splice(index, 1);
    setSavedCards(updatedCards);
  };

  return (
    <div className={styles.container}>
      <h2>Введите данные вашей карты</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Номер карты:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            placeholder="XXXX XXXX XXXX XXXX"
          />
          {errors.cardNumber && <span className={styles.error}>{errors.cardNumber}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Имя на карте:</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
            placeholder="ИМЯ ФАМИЛИЯ"
          />
          {errors.cardName && <span className={styles.error}>{errors.cardName}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Срок действия (MM/YY):</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            placeholder="MM/YY"
          />
          {errors.expiryDate && <span className={styles.error}>{errors.expiryDate}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
            placeholder="123"
          />
          {errors.cvv && <span className={styles.error}>{errors.cvv}</span>}
        </div>
        <button type="submit" className={styles.submitButton}>Отправить</button>
      </form>
      <h2>Сохраненные карты</h2>
      <ul className={styles.savedCards}>
        {savedCards.map((card, index) => (
          <li key={index} className={styles.cardItem}>
            <p><strong>Номер карты:</strong> {card.cardNumber.replace(/\d{12}(?=\d{4})/, '**** **** **** ')}</p>
            <p><strong>Имя на карте:</strong> {card.cardName}</p>
            <p><strong>Срок действия:</strong> {card.expiryDate}</p>
            <p><strong>CVV:</strong> {card.cvv.replace(/\d{2}/, '**')}</p>
            <button onClick={() => handleDeleteCard(index)} className={styles.deleteButton}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Payment;
