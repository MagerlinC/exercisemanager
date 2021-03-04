import React, { useState } from "react";
import "./exercise-item.scss";
import { Draggable } from "react-virtualized-dnd";
// We generically map over exercise properties here, because we might want to extend the list of properties
function ExerciseItem({ exercise, dragAndDropGroupName }) {
  return (
    <Draggable
      dragAndDropGroup={dragAndDropGroupName}
      draggableId={exercise.id}
      key={exercise.id}
      dragDisabled={false}
    >
      <div className={"exercise-item"}>
        <div className={"id-and-title"}>
          <span className={"id"}>{exercise.id}</span> -{" "}
          <span className={"title"}>{exercise.title}</span>
        </div>
        <image className={"image"} alt="exercise-image" src={exercise.image} />
      </div>
    </Draggable>
  );
}
export default ExerciseItem;
