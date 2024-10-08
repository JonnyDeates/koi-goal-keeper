import React from "react";
import TermsAndConditionsStore from "./TermsAndConditionsStore";

function TermsAndConditions() {
  const { Introduction, Terms, Conclusion } = TermsAndConditionsStore;
  const TermKeys = Object.keys(Terms) as Array<keyof typeof Terms>;

  return <>
      <p>&emsp;{Introduction}</p>
      {TermKeys.map((key, index) => <label key={index}>{key} <span>{Terms[key]}</span></label>)}
      <p>&emsp;{Conclusion}</p>
  </>;
}
export default TermsAndConditions;