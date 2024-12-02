import React from "react";
import "./styles.css";

const Result = ({
                  heading,
                  subheading,
                  description,
                  generalRates,
                  specialRates,
                }) => {
  return (
    <div className="result-card">
      <div className="result-heading">Heading</div>
      <div className="result-subheading">Suffix</div>
      <div className="result-description">Description</div>
      <div className="rate">general rate </div>
      <div className="rate">special Rate</div>
    </div>
  );
};

export default Result;
