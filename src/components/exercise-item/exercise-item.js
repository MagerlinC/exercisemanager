import React, { useState } from "react";
import CheckMark from "../check-mark/check-mark";
import "./exercise-item.scss";
// We generically map over exercise properties here, because we might want to extend the list of properties
function ExerciseItem({ exercise, selected, onSelection, onExerciseComplete }) {
  const completed = exercise.status === "completed";
  return (
    <div
      className={
        "exercise-item" +
        (selected ? " selected" : "") +
        (completed ? " completed" : "")
      }
    >
      <div tabIndex="0" onClick={onSelection} className={"id-and-title"}>
        <span className={"id"}>{exercise.id}</span> -{" "}
        <span className={"title"}>{exercise.title}</span>
      </div>
      <div className={"tags"}>
        {exercise.tags.map((tag) => (
          <div key={exercise.id + tag} className={"tag"}>
            {tag}
          </div>
        ))}
      </div>
      <img className={"image"} alt="exercise-image" src={exercise.image} />
      <CheckMark ticked={completed} onTickedChange={onExerciseComplete} />
    </div>
  );
}
export default ExerciseItem;
