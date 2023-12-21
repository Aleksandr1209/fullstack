import React, { useState, useEffect } from 'react';

const Notification = ({ message, item }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const notificationStyles = {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    padding: '10px',
    background: '#fff',
    border: '1px solid #ccc',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    zIndex: '100',
    transition: 'opacity 0.3s ease-in-out',
    opacity: isVisible ? 1 : 0,
  };

  return (
    <div style={notificationStyles}>
      {message}
    </div>
  );
};

export default Notification;