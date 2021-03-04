import React, { useState, useEffect } from "react";
import "./App.scss";
import { getExercises } from "./exercise_service";
import ExerciseItem from "./components/exercise-item/exercise-item";
import { Droppable, Draggable, DragDropContext } from "react-virtualized-dnd";
import Toaster from "./components/exercise-item/toaster/toaster";

function App() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);

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

  const onExerciseSelection = (exercise) => {
    console.log(exercise);
    const curExercises = [...selectedExercises];
    // Check if already selected
    const existingIndex = curExercises.findIndex((e) => e.id === exercise.id);
    console.log(existingIndex);
    if (existingIndex >= 0) {
      // If already selected, remove
      curExercises.splice(existingIndex, 1);
    } else {
      // Else add
      curExercises.push(exercise);
    }
    setSelectedExercises(curExercises);
  };

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

  const makeListHeader = (listName) => {
    return <div className={"list-header " + listName}>{listName}</div>;
  };

  return (
    <div className="app">
      <Toaster
        shown={selectedExercises.length > 0}
        contents={selectedExercises.length}
      />
      <DragDropContext
        onDragEnd={onExerciseDrag}
        dragAndDropGroup={dragAndDropGroupName}
      >
        <header className="app-header">MinLæring Exercises</header>
        <div className={"lists-wrapper"}>
          <div className={"exercise-list"}>
            <Droppable
              listHeader={makeListHeader("Exercises")}
              listHeaderHeight={60}
              containerHeight={800}
              elemHeight={40}
              dragAndDropGroup={dragAndDropGroupName}
              droppableId={exerciseListDroppableId}
              key={exerciseListDroppableId}
            >
              {unselectedExercises.map((exercise) => (
                <Draggable
                  dragAndDropGroup={dragAndDropGroupName}
                  draggableId={"exercise-" + exercise.id}
                  key={"exercise-" + exercise.id}
                  dragDisabled={false}
                >
                  <ExerciseItem
                    selected={selectedExercises.find(
                      (e) => e.id === exercise.id
                    )}
                    onSelection={() => onExerciseSelection(exercise)}
                    key={"exercise-component-" + exercise.id}
                    dragAndDropGroupName={dragAndDropGroupName}
                    exercise={exercise}
                  />
                </Draggable>
              ))}
            </Droppable>
          </div>
          <div className={"my-list"}>
            <Droppable
              listHeader={makeListHeader("My List")}
              listHeaderHeight={60}
              containerHeight={800}
              elemHeight={40}
              dragAndDropGroup={dragAndDropGroupName}
              droppableId={myListDroppableId}
              key={myListDroppableId}
            >
              {myList.map((exercise) => (
                <Draggable
                  dragAndDropGroup={dragAndDropGroupName}
                  draggableId={"exercise-" + exercise.id}
                  key={"exercise-" + exercise.id}
                  dragDisabled={false}
                >
                  <ExerciseItem
                    selected={selectedExercises.find(
                      (e) => e.id === exercise.id
                    )}
                    onSelection={() => onExerciseSelection(exercise)}
                    key={"exercise-component-" + exercise.id}
                    dragAndDropGroupName={dragAndDropGroupName}
                    exercise={exercise}
                  />
                </Draggable>
              ))}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
