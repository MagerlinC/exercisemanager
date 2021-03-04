import { db } from "./firebase.js";

export const getExercises = (onSnapShotFunc) => {
  return db
    .collection("exercises")
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
    const docRef = db.collection("exercises").doc(exerciseId);
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
