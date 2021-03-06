import React, { useState, useEffect } from "react";
import "./App.scss";
import {
  createExercise,
  getExercises,
  updateExercise,
} from "./exercise_service";
import ExerciseItem from "./components/exercise-item/exercise-item";
import { Droppable, Draggable, DragDropContext } from "react-virtualized-dnd";
import Toaster from "./components/toaster/toaster";
import Logo from "./assets/logo.svg";
import Search from "./components/search/search";
import ExerciseModal from "./components/exercise-modal/exercise-modal";
import Slider from "./components/slider/slider";

function App() {
  const [exercises, setExercises] = useState([]);
  const [searchFilter, setSearchFilter] = useState({ list: "", value: "" });
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [includeDone, setIncludeDone] = useState(true);
  const [modalExercise, setModalExercise] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const dragAndDropGroupName = "example";
  const exerciseListDroppableId = "exercise-list";
  const myListDroppableId = "my-list";

  const exerciseListName = "Exercises";
  const myListName = "My List";

  // Fetch exercises on mount
  useEffect(() => {
    fetchData();
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

  const sortBySortOrder = (a, b) => {
    return a.sortOrder - b.sortOrder;
  };

  const fetchData = () => {
    setSelectedExercises([]);
    getExercises((response) => {
      const sortedResponse = response.sort(sortBySortOrder);
      setExercises(sortedResponse);
    });
  };

  const getExerciseFromId = (id) => {
    return exercises.find((ex) => ex["firestore_id"] === id);
  };

  const onExerciseDrag = (source, destinationDroppableId, placeholderId) => {
    const sameCol = source.droppableId === destinationDroppableId;
    const movedExercise = getExerciseFromId(source.draggableId);
    const targetExercise = getExerciseFromId(placeholderId);
    // We want to know if we have moved an exercise from below or above the target
    const movedUp = movedExercise.sortOrder > targetExercise?.sortOrder;
    const status = sameCol
      ? null
      : destinationDroppableId === "my-list"
      ? "chosen"
      : "";
    // Move all selected items
    const selectedItems = [source.draggableId].concat(
      selectedExercises.map((exercise) => exercise["firestore_id"])
    );
    updateExercise(
      selectedItems,
      status,
      targetExercise?.sortOrder,
      movedUp,
      fetchData
    );
  };

  const onExerciseComplete = (exercise) => {
    const status = exercise.status === "completed" ? "chosen" : "completed";
    updateExercise([exercise["firestore_id"]], status, null, null, fetchData);
  };

  const openExercise = (exercise) => {
    setModalExercise(exercise);
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
    if (includeDone || exercise.status !== "completed") {
      if (exercise.status === "chosen" || exercise.status === "completed") {
        if (isMatchForFilter(exercise, myListName)) {
          myList.push(exercise);
        }
      } else {
        if (isMatchForFilter(exercise, exerciseListName)) {
          unselectedExercises.push(exercise);
        }
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
        {listName === "My List" && (
          <div className={"slider-and-title"}>
            <div className={"title"}>Include Completed Exercises</div>
            <Slider
              isSet={includeDone}
              onChange={() => setIncludeDone(!includeDone)}
            />
          </div>
        )}
      </div>
    );
  };

  const closeModal = () => {
    setModalExercise(null);
    setCreateModalOpen(false);
  };

  const onExerciseCreationSuccess = () => {
    closeModal();
    fetchData();
  };

  // Napkin math, lists should allow half height if CSS breakpoint triggers to do flex: col on mobile, since the lists will now be above each other.
  // More accurate calcs could be made if we considered the list header etc.
  const isMobile = window.innerWidth <= 600;
  const listHeight = (window.innerHeight - 200) / (isMobile ? 2 : 1);

  return (
    <div className="app">
      <Toaster
        hideOnTimeOut={false}
        shown={selectedExercises.length > 0}
        contents={selectedExercises.length + " exercises selected"}
      />
      {modalExercise && (
        <ExerciseModal exercise={modalExercise} closeModal={closeModal} />
      )}
      {createModalOpen && (
        <ExerciseModal
          closeModal={() => setCreateModalOpen(false)}
          createExercise={(
            exerciseTitle,
            exerciseDifficulty,
            exerciseDescription,
            exerciseTags
          ) =>
            createExercise(
              exerciseTitle,
              exerciseDifficulty,
              exerciseDescription,
              exerciseTags,
              onExerciseCreationSuccess
            )
          }
          creationMode={true}
        />
      )}
      {!modalExercise && (
        <div
          onClick={() => setCreateModalOpen(true)}
          title={"Create Exercise"}
          className={"create-exercise-btn"}
        >
          <span className={"plus-icon"}>+</span>
        </div>
      )}
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
              containerHeight={listHeight}
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
                    onExerciseOpen={openExercise}
                    onExerciseComplete={() => onExerciseComplete(exercise)}
                    selected={selectedExercises.find(
                      (e) => e["firestore_id"] === exercise["firestore_id"]
                    )}
                    onSelection={() => onExerciseSelection(exercise)}
                    key={"exercise-component-" + exercise.id}
                    dragAndDropGroupName={dragAndDropGroupName}
                    exercise={exercise}
                  />
                </Draggable>
              ))}
            </Droppable>
            {unselectedExercises.length === 0 && (
              <div className={"empty-list"}>
                {searchFilter.value && searchFilter.list === exerciseListName
                  ? "No search results found for " + searchFilter.value
                  : "No new exercises... Yet!"}
              </div>
            )}
          </div>
          <div className={"my-list"}>
            <Droppable
              listHeader={makeListHeader(myListName)}
              listHeaderHeight={60}
              containerHeight={listHeight}
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
                  disabled={exercise.status === "completed"}
                >
                  <ExerciseItem
                    onExerciseOpen={openExercise}
                    onExerciseComplete={() => onExerciseComplete(exercise)}
                    selected={selectedExercises.find(
                      (e) => e["firestore_id"] === exercise["firestore_id"]
                    )}
                    onSelection={() => onExerciseSelection(exercise)}
                    key={"exercise-component-" + exercise.id}
                    dragAndDropGroupName={dragAndDropGroupName}
                    exercise={exercise}
                  />
                </Draggable>
              ))}
            </Droppable>
            {myList.length === 0 && (
              <div className={"empty-list"}>
                {searchFilter.value && searchFilter.list === myListName
                  ? "No search results found for " + searchFilter.value
                  : "No exercises in your list - grab some from the left!"}
              </div>
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
