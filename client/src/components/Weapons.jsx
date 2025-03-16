import React from "react";
import { useTranslation } from "react-i18next";
import CardWrapper from "./CardWrapper";

const Weapons = ({ character }) => {
  const { t } = useTranslation();

  if (!character.weapons || Object.keys(character.weapons).length === 0) {
    return null;
  }

  return (
    <CardWrapper title={t("weapons")}>
      <div className="items-container">
        {Object.entries(character.weapons).map(([weaponKey, weaponData]) => (
          <div key={weaponKey} className="items-section">
            <h3 className="item-location">{weaponData.weaponName}</h3>
            <div className="items-grid">
              <div className="item-entry">
                <span className="item-name">{t("damage")}</span>
                <span className="item-description">{weaponData.damage}</span>
              </div>
              <div className="item-entry">
                <span className="item-name">{t("attacks")}</span>
                <span className="item-description">{weaponData.attacks}</span>
              </div>
              <div className="item-entry">
                <span className="item-name">{t("range")}</span>
                <span className="item-description">{weaponData.range}</span>
              </div>
              <div className="item-entry">
                <span className="item-name">{t("ammo")}</span>
                <span className="item-description">{weaponData.ammo}</span>
              </div>
              <div className="item-entry">
                <span className="item-name">{t("malfunction")}</span>
                <span className="item-description">{weaponData.malfunction}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
};

export default Weapons;
