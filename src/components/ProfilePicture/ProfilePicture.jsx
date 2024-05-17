import React from 'react';
import styles from '../../pages/ProfilePage/ProfilePage.module.css';

function ProfilePicture({ user }) {
  const generateRandomColor = (str) => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'];
    const index = str.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const renderInitials = (name) => {
    const initials = name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
    return initials;
  };

  const defaultProfileStyle = {
    backgroundColor: generateRandomColor(user.email),
    color: '#fff',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    overflow: 'hidden',
  };

  return (
    <div className={styles.profileContainer}>
      <div style={defaultProfileStyle}>
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover' // Заполнять круг без искажений
            }}
          />
        ) : (
          renderInitials(user.firstName)
        )}
      </div>
    </div>
  );
}

export default ProfilePicture;
