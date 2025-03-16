import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n"; // Make sure this path matches your i18n configuration
import "../style.css"; // Ensure styles are applied

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    setLanguage(selectedLang);
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("selectedLanguage", selectedLang);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language">{i18n.t("language")}: </label>
      <select id="language" value={language} onChange={handleLanguageChange} className="language-dropdown">
        <option value="en">English</option>
        <option value="zh">简体中文</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
