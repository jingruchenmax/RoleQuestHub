import React from "react";
import { useTranslation } from "react-i18next";

const AdminDashboard = ({ user, setUser }) => {
  const { t } = useTranslation(); // Import translation function

  const handleLogout = () => {
    localStorage.removeItem("roleQuestSession");
    setUser(null);
  };

  return (
    <div>
      <h1>{t("adminPanel")}</h1>
      <p>{t("welcome")}, {user.username}!</p>
      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        {t("logout")}
      </button>
    </div>
  );
};

export default AdminDashboard;
