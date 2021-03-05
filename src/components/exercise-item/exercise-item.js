import React, { useState } from "react";
import CheckMark from "../check-mark/check-mark";
import "./exercise-item.scss";
// We generically map over exercise properties here, because we might want to extend the list of properties
function ExerciseItem({
  exercise,
  selected,
  onSelection,
  onExerciseComplete,
  onExerciseOpen,
}) {
  const completed = exercise.status === "completed";

  const openExercise = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onExerciseOpen(exercise);
  };

  return (
    <div
      tabIndex="0"
      className={
        "exercise-item" +
        (selected ? " selected" : "") +
        (completed ? " completed" : "")
      }
      onClick={completed ? void 0 : onSelection}
    >
      <div className={"id-and-title"}>
        <span className={"title"} onClick={openExercise} tabIndex="0">
          {exercise.title}
        </span>
      </div>
      <div className={"tags"}>
        {exercise.tags.map((tag) => (
          <div key={exercise.id + tag} className={"tag"}>
            {tag}
          </div>
        ))}
      </div>
      <img
        title={"Difficulty: " + exercise.difficulty}
        className={"image"}
        alt="exercise-image"
        src={exercise.image}
      />
      <CheckMark ticked={completed} onTickedChange={onExerciseComplete} />
    </div>
  );
}
export default ExerciseItem;
