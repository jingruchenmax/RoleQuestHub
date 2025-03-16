import React from "react";
import { useTranslation } from "react-i18next";
import CardWrapper from "./CardWrapper";

const Skills = ({ character }) => {
  const { t } = useTranslation();

  // Define the ordered list of skills
  const skillOrder = [
    "Anthropology", "Archaeology", "Appraise", "Charm", "Climb", "ComputerUse",
    "CreditRating", "CthulhuMythos", "Disguise", "Dodge", "Drive_Auto",
    "ElectricalRepair", "Electronics", "FastTalk", "Fighting_Brawl",
    "Firearms_Handgun", "Firearms_RifleShotgun", "FirstAid", "History",
    "Intimidate", "Jump", "Language_English", "Language_Chinese",
    "Language_Arabic", "Law", "LibraryUse", "Listen", "Locksmith",
    "MechanicalRepair", "Medicine", "NaturalWorld", "Navigate", "Occult",
    "OperateHeavyMachinery", "Persuade", "Pilot", "Psychoanalysis",
    "Psychology", "Science_Geology", "Science_Chemistry", "Science_Biology",
    "SpotHidden", "Stealth", "Survival", "Swim", "Throw", "Track"
  ];

  return (
    <CardWrapper title={t("skills")}>
      <div className="dynamic-grid info-container">
        {skillOrder.map((skill) => {
          const skillData = character.skills[skill];
          return skillData && skillData.visible ? (
            <div key={skill} className="info-grid">
              <span className="info-field">{t(skill)}</span>
              <span className="info-value">{skillData.value}</span>
            </div>
          ) : null;
        })}
      </div>
    </CardWrapper>
  );
};

export default Skills;
