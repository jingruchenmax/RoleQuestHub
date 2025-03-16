import React from "react";
import { useTranslation } from "react-i18next";
import CardWrapper from "./CardWrapper";

const BasicInfo = ({ character }) => {
  const { t } = useTranslation();

  const basicInfoFields = [
    { key: "name", value: character.basicInfo.name },
    { key: "birthplace", value: character.basicInfo.birthplace },
    { key: "gender", value: character.basicInfo.gender },
    { key: "occupation", value: character.basicInfo.occupation },
    { key: "residence", value: character.basicInfo.residence },
    { key: "age", value: character.basicInfo.age }
  ];

  return (
    <CardWrapper title={t("basicInfo")}>
      <div className="dynamic-grid info-container">
        {basicInfoFields.map(({ key, value }) => (
          <div key={key} className="info-grid">
            <span className="info-field">{t(key)}</span>
            <span className="info-value">{value}</span>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
};

export default BasicInfo;
