import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LanguageSelector from "./components/LanguageSelector";
import "./style.css"; // Ensure styles are applied

function App() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedSession = localStorage.getItem("roleQuestSession");

    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      const currentTime = new Date().getTime();

      if (parsedSession.expiry > currentTime) {
        setUser(parsedSession);
      } else {
        localStorage.removeItem("roleQuestSession"); // Session expired
      }
    }
  }, []);

  return (
    <div className="app-container">
      {/* Language Selector at the Top */}
      <LanguageSelector />

      {/* Login or Dashboard */}
      {!user ? (
        <Login setUser={setUser} />
      ) : user.role === "admin" ? (
        <AdminDashboard user={user} setUser={setUser} />
      ) : (
        <UserDashboard user={user} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
