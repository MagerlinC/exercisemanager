import React, { useState } from "react";
import "./check-mark.scss";
import CheckMarkIcon from "../../assets/check.svg";
function CheckMark({ ticked, onTickedChange }) {
  const onTickClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onTickedChange();
  };

  return (
    <div tabIndex="0" onClick={onTickClick} className={"check-mark"}>
      {ticked && <img className={"check-mark-icon"} src={CheckMarkIcon} />}
    </div>
  );
}
export default CheckMark;
