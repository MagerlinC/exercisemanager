import React, { useState, useEffect } from "react";
import "./App.scss";
import { getExercises } from "./exercise_service";
import ExerciseItem from "./components/exercise-item/exercise-item";
import { Droppable, DragDropContext } from "react-virtualized-dnd";

function App() {
  const [exercises, setExercises] = useState([]);

  const dragAndDropGroupName = "example";
  const exerciseListDroppableId = "exercise-list";
  const myListDroppableId = "my-list";

  const sortById = (a, b) => {
    return a.sortOrder - b.sortOrder;
  };
  // Fetch exercises on mount
  useEffect(() => {
    getExercises((response) => {
      const sortedResponse = response.sort(sortById);
      setExercises(sortedResponse);
    });
  }, []);

  const onExerciseDrag = (source, destinationDroppableId, placeholderId) => {};

  const myList = [];
  const unselectedExercises = [];
  exercises.forEach((exercise) => {
    if (exercise.status === "chosen" || exercise.status === "completed") {
      myList.push(exercise);
    } else {
      unselectedExercises.push(exercise);
    }
  });

  return (
    <div className="app">
      <DragDropContext
        onDragEnd={onExerciseDrag}
        dragAndDropGroup={dragAndDropGroupName}
      >
        <header className="app-header">MinLæring Exercises</header>
        <div className={"lists-wrapper"}>
          <div className={"exercise-list"}>
            <Droppable
              containerHeight={620}
              elemHeight={50}
              dragAndDropGroup={dragAndDropGroupName}
              droppableId={exerciseListDroppableId}
              key={exerciseListDroppableId}
            >
              {unselectedExercises.map((exercise) => (
                <ExerciseItem
                  dragAndDropGroupName={dragAndDropGroupName}
                  exercise={exercise}
                />
              ))}
            </Droppable>
          </div>
          <div className={"my-list"}>
            <Droppable
              containerHeight={800}
              elemHeight={40}
              dragAndDropGroup={dragAndDropGroupName}
              droppableId={myListDroppableId}
              key={myListDroppableId}
            >
              {myList.map((exercise) => (
                <ExerciseItem
                  dragAndDropGroupName={dragAndDropGroupName}
                  exercise={exercise}
                />
              ))}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
