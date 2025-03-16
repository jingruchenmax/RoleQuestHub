import React from "react";
import { useTranslation } from "react-i18next";
import CardWrapper from "./CardWrapper";

const Items = ({ character }) => {
  const { t } = useTranslation();

  if (!character.items || Object.keys(character.items).length === 0) {
    return null;
  }

  // Group items by their storage location
  const groupedItems = {};
  Object.entries(character.items).forEach(([itemKey, itemData]) => {
    const location = itemData.storageLocation || t("Unknown Location");
    if (!groupedItems[location]) {
      groupedItems[location] = [];
    }
    groupedItems[location].push(itemData);
  });

  return (
    <CardWrapper title={t("items")}>
      <div className="items-container">
        {Object.entries(groupedItems).map(([location, items]) => (
          <div key={location} className="items-section">
            <h3 className="items-location">{t(location)}</h3>
            <div className="items-grid">
              {items.map((item, index) => (
                <div key={index} className="item-entry">
                  <span className="item-name">{item.name}</span>
                  <span className="item-description">
                    {item.description || t("No Description")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
};

export default Items;
