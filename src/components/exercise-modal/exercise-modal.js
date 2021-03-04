import React, { useEffect, useRef } from "react";
import "./exercise-modal.scss";

function ExerciseModal({ exercise, closeModal }) {
  const modalRef = useRef();

  useEffect(() => {
    if (modalRef && modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  const closeOnEscape = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  return (
    <div
      tabIndex="-1"
      onKeyDown={closeOnEscape}
      ref={modalRef}
      className={"modal-fullscreen-wrapper"}
    >
      <div onClick={closeModal} className={"transparent-backdrop"} />
      <div className={"exercise-modal"}>
        <div onClick={closeModal} className={"close-btn"}>
          x
        </div>
        <div className={"exercise-header"}>
          <span className={"exercise-title"}>
            {exercise.id} - {exercise.title}
          </span>
          <img
            title={"Difficulty: " + exercise.difficulty}
            src={exercise.image}
            className={"exercise-image"}
          />
        </div>
        <div className={"exercise-body"}>
          <div className={"description-and-header"}>
            <div className={"header"}>Exercise Description</div>
            <div className={"description"}>{exercise.description}</div>
          </div>
          <div className={"tag-header"}>Tags</div>
          <div className={"tags"}>
            {exercise.tags.map((tag) => (
              <div key={exercise.id + tag} className={"tag"}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExerciseModal;
