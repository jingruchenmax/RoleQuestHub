import React, { useState } from "react";

const CardWrapper = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="card">
      <div 
        className={`info-title clickable-title ${isCollapsed ? "collapsed-title" : ""}`} 
        onClick={toggleCollapse}
      >
        {title} <span className="collapse-icon">{isCollapsed ? "▼" : "▲"}</span>
      </div>
      {!isCollapsed && <div className="card-content">{children}</div>}
    </div>
  );
};

export default CardWrapper;
