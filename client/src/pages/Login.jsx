import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import "../style.css"; // Import the new CSS file

const Login = ({ setUser }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError(t("User not found."));
        return;
      }

      const userData = querySnapshot.docs[0].data();
      if (userData.password !== password) {
        setError(t("Incorrect password."));
        return;
      }

      const expiryTime = new Date().getTime() + 10 * 60 * 60 * 1000;
      const sessionData = {
        username: userData.username,
        role: userData.role,
        expiry: expiryTime,
      };

      localStorage.setItem("roleQuestSession", JSON.stringify(sessionData));
      setUser(sessionData);
      console.log("Login Successful:", sessionData);
    } catch (err) {
      setError(t("Login failed. Please try again."));
      console.error("Error logging in:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>{t("welcome")}</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder={t("name")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">
          {t("login")}
        </button>
      </form>
    </div>
  );
};

export default Login;
