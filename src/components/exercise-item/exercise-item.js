import React, { useState } from "react";
import "./exercise-item.scss";
// We generically map over exercise properties here, because we might want to extend the list of properties
function ExerciseItem({ exercise, selected, onSelection }) {
  return (
    <div className={"exercise-item" + (selected ? " selected" : "")}>
      <div tabIndex="0" onClick={onSelection} className={"id-and-title"}>
        <span className={"id"}>{exercise.id}</span> -{" "}
        <span className={"title"}>{exercise.title}</span>
      </div>
      <img className={"image"} alt="exercise-image" src={exercise.image} />
    </div>
  );
}
export default ExerciseItem;
