import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "../style.css"; // Import global styles

import BasicInfo from "../components/BasicInfo";
import Characteristics from "../components/Characteristics";
import Skills from "../components/Skills";
import Descriptions from "../components/Descriptions";
import Weapons from "../components/Weapons";
import Items from "../components/Items";
import Notifications from "../components/Notifications"; // Import Notifications

const UserDashboard = ({ user, setUser }) => {
  const { t } = useTranslation();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!user || !user.username || character) return; // Prevents duplicate fetch

      try {
        console.log(`🔍 Fetching character: ${user.username}`);
        const characterRef = doc(db, "characters", user.username);
        const characterSnap = await getDoc(characterRef);

        if (characterSnap.exists()) {
          console.log("✅ Character found:", characterSnap.data());
          setCharacter(characterSnap.data());
        } else {
          console.warn("⚠️ No character found for this user.");
        }
      } catch (error) {
        console.error("❌ Error fetching character:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [user]); // Only run when `user` changes


  const handleLogout = () => {
    localStorage.removeItem("roleQuestSession");
    setUser(null);
  };

  return (
    <div className="dashboard-wrapper">
      {loading ? (
        <p>{t("loading")}</p>
      ) : character ? (
        <div className="dashboard-content">
          <div className="header-container">
          <h1>{t("welcome")}, {user.username}!</h1>
            <button onClick={handleLogout} className="logout-button">
              {t("logout")}
            </button>
          </div>
          <BasicInfo character={character} />
          <Characteristics character={character} />
          <Skills character={character} />
          <Descriptions character={character} />
          <Weapons character={character} />
          <Items character={character} />
          <Notifications character={character} />
        </div>
      ) : (
        <p>{t("noCharacterFound")}</p>
      )}

    </div>
  );
};

export default UserDashboard;
