import React, { useState, useEffect } from "react";
import "./App.scss";
import { getExercises, updateExerciseStatus } from "./exercise_service";
import ExerciseItem from "./components/exercise-item/exercise-item";
import { Droppable, Draggable, DragDropContext } from "react-virtualized-dnd";
import Toaster from "./components/toaster/toaster";
import Logo from "./assets/logo.svg";
import Search from "./components/search/search";

function App() {
  const [exercises, setExercises] = useState([]);
  const [searchFilter, setSearchFilter] = useState({ list: "", value: "" });
  const [selectedExercises, setSelectedExercises] = useState([]);

  const dragAndDropGroupName = "example";
  const exerciseListDroppableId = "exercise-list";
  const myListDroppableId = "my-list";

  const exerciseListName = "Exercises";
  const myListName = "My List";

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
    const curExercises = [...selectedExercises];
    // Check if already selected
    const existingIndex = curExercises.findIndex((e) => e.id === exercise.id);
    if (existingIndex >= 0) {
      // If already selected, remove
      curExercises.splice(existingIndex, 1);
    } else {
      // Else add
      curExercises.push(exercise);
    }
    setSelectedExercises(curExercises);
  };

  const onExerciseDrag = (source, destinationDroppableId, placeholderId) => {
    const status = destinationDroppableId === "my-list" ? "chosen" : "";
    updateExerciseStatus(source.draggableId, status);
  };

  const onExerciseComplete = (exercise) => {
    updateExerciseStatus(exercise["firestore_id"], "completed");
  };

  const myList = [];
  const unselectedExercises = [];

  // Check if search text matches title
  const isMatchForFilter = (exercise, list) =>
    searchFilter.value === "" ||
    searchFilter.list !== list ||
    (searchFilter.list === list &&
      exercise.title.toLowerCase().includes(searchFilter.value.toLowerCase()));

  exercises.forEach((exercise) => {
    if (exercise.status === "chosen" || exercise.status === "completed") {
      if (isMatchForFilter(exercise, myListName)) {
        myList.push(exercise);
      }
    } else {
      if (isMatchForFilter(exercise, exerciseListName)) {
        unselectedExercises.push(exercise);
      }
    }
  });

  const onSearchChange = (listName, value) => {
    setSearchFilter({
      list: listName,
      value: value,
    });
  };

  const makeListHeader = (listName) => {
    return (
      <div className={"list-header " + listName}>
        <span className={"list-name"}>{listName}</span>
        <Search onSearchChange={(val) => onSearchChange(listName, val)} />
      </div>
    );
  };

  return (
    <div className="app">
      <Toaster
        hideOnTimeOut={false}
        shown={selectedExercises.length > 0}
        contents={selectedExercises.length + " exercises selected"}
      />
      <DragDropContext
        onDragEnd={onExerciseDrag}
        dragAndDropGroup={dragAndDropGroupName}
      >
        <header className="app-header">
          <img className={"site-logo"} src={Logo} />
          <span className={"site-title"}>MinLæring Exercises</span>
        </header>
        <div className={"lists-wrapper"}>
          <div className={"exercise-list"}>
            <Droppable
              listHeader={makeListHeader(exerciseListName)}
              listHeaderHeight={60}
              containerHeight={1200}
              elemHeight={42}
              dragAndDropGroup={dragAndDropGroupName}
              droppableId={exerciseListDroppableId}
              key={exerciseListDroppableId}
            >
              {unselectedExercises.map((exercise) => (
                <Draggable
                  dragAndDropGroup={dragAndDropGroupName}
                  draggableId={exercise["firestore_id"]}
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
              listHeader={makeListHeader(myListName)}
              listHeaderHeight={60}
              containerHeight={1200}
              elemHeight={42}
              dragAndDropGroup={dragAndDropGroupName}
              droppableId={myListDroppableId}
              key={myListDroppableId}
            >
              {myList.map((exercise) => (
                <Draggable
                  dragAndDropGroup={dragAndDropGroupName}
                  draggableId={exercise["firestore_id"]}
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
