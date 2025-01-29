import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const NotificationIcon = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('notification', (message) => {
      setNotifications((prev) => [...prev, message]);
      setUnreadCount((prevCount) => prevCount + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <div>
      <button onClick={markAllAsRead}>
        Notifications ({unreadCount})
      </button>
      <div>
        {notifications.map((notif, index) => (
          <p key={index}>{notif}</p>
        ))}
      </div>
    </div>
  );
};

export default NotificationIcon;
