import React from "react";
import { useTranslation } from "react-i18next";
import CardWrapper from "./CardWrapper";

const Notifications = ({ character }) => {
  const { t } = useTranslation();

  // Ensure notifications exist before rendering
  if (!character || !character.notifications || Object.keys(character.notifications).length === 0) {
    return null; // No notifications to display
  }

  // Convert notifications object to an array and sort by timestamp (newest first)
  const sortedNotifications = Object.entries(character.notifications || {})
    .map(([key, notification]) => ({
      id: key,
      senderName: notification.senderName || t("Unknown"),
      message: notification.message || t("No message provided."),
      timestamp: notification.unixtimestamp
        ? new Date(Number(notification.unixtimestamp) * 1000)
        : null, // Convert to Date object
    }))
    .sort((a, b) => (b.timestamp ? b.timestamp - a.timestamp : 1)); // Sort descending

  return (
    <CardWrapper title={`📢 ${t("notifications")}`}>
      <ul className="notification-list">
        {sortedNotifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <div className="notification-header">
              <strong>{notification.senderName}</strong>
              <span className="notification-date">
                {notification.timestamp
                  ? notification.timestamp.toLocaleString()
                  : t("Unknown date")}
              </span>
            </div>
            <p className="notification-message">{notification.message}</p>
          </li>
        ))}
      </ul>
    </CardWrapper>
  );
};

export default Notifications;
