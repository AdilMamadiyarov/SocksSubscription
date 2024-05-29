import React, { useState, useEffect } from 'react';
import styles from './payment.module.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

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
  const [showForm, setShowForm] = useState(false);

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
      setShowForm(false);
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

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  const handleEditCard = (index) => {
    const card = savedCards[index];
    setCardNumber(card.cardNumber);
    setCardName(card.cardName);
    setExpiryDate(card.expiryDate);
    setCvv(card.cvv);
    setShowForm(true);
    setShowOptions(null);
    handleDeleteCard(index);
  };

  const [showOptions, setShowOptions] = useState(null);

  return (
    <div className={styles.container}>
      {showForm ? (
        <div className={styles.newCardFormContainer}>
          <h2>Введите данные вашей карты</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                placeholder="1234 1234 1234 1234"
              />
              {errors.cardNumber && <span className={styles.error}>{errors.cardNumber}</span>}
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
                placeholder="Имя на карте"
              />
              {errors.cardName && <span className={styles.error}>{errors.cardName}</span>}
            </div>
            <div className={styles.MMYYCVV}>
              <div className={styles.formGroup}>
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
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                  placeholder="CVV"
                />
                {errors.cvv && <span className={styles.error}>{errors.cvv}</span>}
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.submitButton}>Отправить</button>
              <button type="button" onClick={handleCancel} className={styles.submitButton}>Отмена</button>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.savedCardsContainer}>
          {savedCards.length > 0 && <h2>Сохраненные карты</h2>}
          {savedCards.length > 0 ? (
            <ul className={styles.savedCards}>
              {savedCards.map((card, index) => (
                <li key={index} className={styles.cardItem}>
                  <div className={styles.cardHeader}>
                    <button
                      className={styles.optionsButton}
                      onClick={() => setShowOptions(showOptions === index ? null : index)}
                    >
                      &#x22EE;
                    </button>
                  </div>
                  <div className={styles.cardInfo}>
                    <p className={styles.cardNumber}>
                      {card.cardNumber.replace(/\d{12}(?=\d{4})/, '**** **** **** ')}
                    </p>
                    <div className={styles.cardDetails}>
                      <p className={styles.expiryDate}>{card.expiryDate}</p>
                      <p className={styles.cvv}>***</p>
                    </div>
                    <p className={styles.cardName}>{card.cardName}</p>
                  </div>
                  {showOptions === index && (
                    <div className={styles.editDeleteButtons}>
                      <button
                        onClick={() => handleEditCard(index)}
                        className={`${styles.editButton} ${styles.button}`}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteCard(index)}
                        className={`${styles.deleteButton} ${styles.button}`}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>У вас нет сохраненных карт</p>
          )}
        </div>
      )}

      {!showForm && (
        <button onClick={() => setShowForm(true)} className={styles.addButton}>
          Добавить карту
        </button>
      )}
    </div>
  );
}

export default Payment;
