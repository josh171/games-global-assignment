import React from 'react';

const Automation = ({ automation }) => {
  return (
    <div className="automation-container">
      <img
        className="icon"
        src={automation.sites[0].logoSmall2x}
        alt={`Img Title: ${automation.sites[0].title}`}
      />
      <h3 className="header">{automation.title}</h3>
      <div className="description">{automation.shortDescription}</div>
    </div>
  );
};

export default Automation;
