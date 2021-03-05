import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../dropdown/dropdown";
import "./exercise-modal.scss";

function ExerciseModal({ creationMode, createExercise, exercise, closeModal }) {
  const modalRef = useRef();
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [exerciseDifficulty, setExerciseDifficulty] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [exerciseTags, setExerciseTags] = useState("");

  useEffect(() => {
    if (modalRef && modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  const submitCreation = () => {
    if (exerciseTitle) {
      createExercise(
        exerciseTitle,
        exerciseDifficulty == null ? 1 : exerciseDifficulty,
        exerciseDescription,
        exerciseTags.split(",")
      );
    } else {
      alert("Can't create an exercise without a title");
    }
  };

  const handleModalKeyDown = (e) => {
    if (e.key === "Escape") {
      closeModal();
    } else if (creationMode && e.key === "Enter") {
      submitCreation();
    }
  };

  return (
    <div
      tabIndex="-1"
      onKeyDown={handleModalKeyDown}
      ref={modalRef}
      className={"modal-fullscreen-wrapper"}
    >
      <div onClick={closeModal} className={"transparent-backdrop"} />
      <div className={"exercise-modal"}>
        <div onClick={closeModal} className={"close-btn"}>
          x
        </div>
        <div className={"exercise-header"}>
          {creationMode ? (
            <input
              placeholder="Exercise title"
              value={exerciseTitle}
              onChange={(e) => setExerciseTitle(e.target.value)}
              className={"title-input"}
            />
          ) : (
            <span className={"exercise-title"}>
              {exercise.id} - {exercise.title}
            </span>
          )}
          {creationMode ? (
            <Dropdown
              selectedItem={exerciseDifficulty}
              closedText="Exercise difficulty"
              dropdownItems={[1, 2, 3]}
              onSelect={(item) => setExerciseDifficulty(parseInt(item))}
              className={"difficulty-input"}
            />
          ) : (
            <img
              title={"Difficulty: " + exercise.difficulty}
              src={exercise.image}
              className={"exercise-image"}
            />
          )}
        </div>
        <div className={"exercise-body"}>
          <div className={"description-and-header"}>
            <div className={"header"}>Exercise Description</div>
            {creationMode ? (
              <input
                placeholder="Exercise description"
                value={exerciseDescription}
                onChange={(e) => setExerciseDescription(e.target.value)}
                className={"description-input"}
              />
            ) : (
              <div className={"description"}>{exercise.description}</div>
            )}
          </div>
          <div className={"tag-header"}>Tags</div>
          {creationMode ? (
            <input
              placeholder="Exercise tags (comma separated)"
              value={exerciseTags}
              onChange={(e) => setExerciseTags(e.target.value)}
              className={"tags-input"}
            />
          ) : (
            <div className={"tags"}>
              {exercise.tags.map((tag) => (
                <div key={exercise.id + tag} className={"tag"}>
                  {tag}
                </div>
              ))}
            </div>
          )}
          {creationMode && (
            <button onClick={submitCreation} className={"create-btn"}>
              Create Exercise
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default ExerciseModal;
