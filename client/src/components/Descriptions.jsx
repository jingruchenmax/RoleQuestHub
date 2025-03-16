import React from "react";
import { useTranslation } from "react-i18next";
import CardWrapper from "./CardWrapper";

const Descriptions = ({ character }) => {
  const { t } = useTranslation();

  // Define the ordered list of character descriptions
  const descriptionOrder = [
    "PersonalDescription", "IdeologyAndBeliefs", "SignificantPeople",
    "MeaningfulLocations", "TreasuredPossessions", "Traits",
    "InjuriesAndScars", "PhobiasAndManias", "ArcaneTomesAndSpells",
    "EncountersWithStrangeEntities"
  ];

  return (
    <CardWrapper title={t("characterDescriptions")}>
      <div className="descriptions-grid info-container">
        {descriptionOrder.map((desc) => {
          const descData = character.characterDescriptions[desc];
          return descData && descData.visible ? (
            <div key={desc} className="descriptions-row">
              <span className="descriptions-field">{t(desc)}</span>
              <span className="descriptions-value">{descData.value}</span>
            </div>
          ) : null;
        })}
      </div>
    </CardWrapper>
  );
};

export default Descriptions;
