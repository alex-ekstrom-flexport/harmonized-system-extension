import React from "react";
import "./HSCodeResult.css";

interface ResultProps {
  heading: string;
  suffix: string;
  description: string;
  hsRates: string | number;
}

const HSCodeResult:React.FC<ResultProps> = ({
  heading,
  suffix,
  description,
  hsRates,
}) => (
  <div className="result-card">
    <div className="result-heading">Heading</div>
    <div className="result-subheading">Suffix</div>
    <div className="result-description">Description</div>
    <div className="rate">HS rates</div>
  </div>
)

export default HSCodeResult;
