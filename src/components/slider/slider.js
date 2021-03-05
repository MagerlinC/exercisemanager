import React from "react";
import "./slider.scss";
function Slider({ isSet, onChange, width }) {
  const sliderWidth = width || 36;
  return (
    <div style={{ width: sliderWidth }} onClick={onChange} className={"slider"}>
      <div className={"slider-elements"}>
        <div style={{ width: sliderWidth }} className={"slider-bar"}></div>
        <div
          style={{ marginLeft: isSet ? sliderWidth - 12 : "0px" }}
          className={"slider-orb" + (isSet ? " set" : "")}
        />
      </div>
    </div>
  );
}
export default Slider;
