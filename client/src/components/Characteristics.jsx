import React from "react";
import { useTranslation } from "react-i18next";
import CardWrapper from "./CardWrapper";

const Characteristics = ({ character }) => {
  const { t } = useTranslation();

  const characteristicOrder = [
    "STR", "SIZ", "CON", "POW", "DEX", "APP", "INT", "EDU",
    "hitPoints", "magicPoints", "luck", "sanity", "damage"
  ];

  return (
    <CardWrapper title={t("characteristics")}>
      <div className="dynamic-grid info-container">
        {characteristicOrder.map((key) => (
          <div key={key} className="info-grid">
            <span className="info-field">{t(key)}</span>
            <span className="info-value">{character.characteristics[key]}</span>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
};

export default Characteristics;
