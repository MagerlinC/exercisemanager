import { db } from "./firebase.js";

const exerciseCollection = "exercises";

export const getExercises = (onSnapShotFunc) => {
  return db
    .collection(exerciseCollection)
    .get()
    .then((snapShot) => {
      const docs = [];
      snapShot.forEach((doc) => {
        const dataObj = doc.data();
        dataObj["firestore_id"] = doc.id; // Helpful for updating data later
        docs.push(dataObj);
      });
      onSnapShotFunc(docs);
    });
};

export const updateExercise = (
  exerciseIds,
  status,
  targetSortOrder,
  movedUp,
  onSuccess
) => {
  const batch = db.batch();

  let countingSortOrder =
    targetSortOrder + (movedUp ? -1 * exerciseIds.length : exerciseIds.length);

  exerciseIds.forEach((exerciseId) => {
    const docRef = db.collection(exerciseCollection).doc(exerciseId);
    if (status != null) {
      batch.update(docRef, { status: status });
    }
    if (targetSortOrder != null) {
      batch.update(docRef, { sortOrder: countingSortOrder });
      // Miniscule increase to make sure multiple items end up further down the list when multi-dragging
      countingSortOrder = countingSortOrder * 0.95;
    }
  });
  batch.commit().then(onSuccess);
};

// Generate image based on difficulty
const getImage = (difficulty) =>
  "https://app.minlaering.dk/images/icons/exercise/difficulty" +
  difficulty +
  ".svg";

const getNewExerciseId = (onNumberFound) => {
  const ids = [];
  db.collection(exerciseCollection)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        const dataObj = doc.data();
        ids.push(dataObj.id);
      });
      ids.sort();
      // Return largest ids
      onNumberFound(ids[ids.length - 1] + 1);
    });
};

export const createExercise = (
  exerciseTitle,
  exerciseDifficulty,
  exerciseDescription,
  exerciseTags,
  onSuccess
) => {
  getNewExerciseId((number) => {
    db.collection(exerciseCollection)
      .add({
        id: number,
        title: exerciseTitle,
        difficulty: exerciseDifficulty,
        description: exerciseDescription,
        image: getImage(exerciseDifficulty),
        tags: exerciseTags,
        status: "",
        sortOrder: 1000, // Todo, what do we want here?
      })
      .then(onSuccess);
  });
};
