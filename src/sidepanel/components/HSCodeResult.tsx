import React from "react";
import "./styles/HSCodeResult.css";

interface ResultProps {
  heading: string;
  suffix: string;
  description: string;
  hsRates: string | number;
}

const HSCodeResult: React.FC<ResultProps> = ({
  heading,
  suffix,
  description,
  hsRates,
}) => (
  <div className="result-card">
    <div className="result-heading">{heading}</div>
    <div className="result-subheading">{suffix}</div>
    <div className="result-description">{description}</div>
    <div className="rate">{hsRates}</div>
  </div>
)

export default HSCodeResult;
