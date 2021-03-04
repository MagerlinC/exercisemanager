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

export const updateExerciseStatus = (exerciseIds, status, onSuccess) => {
  const batch = db.batch();
  exerciseIds.forEach((exerciseId) => {
    const docRef = db.collection("exercises").doc(exerciseId);
    batch.update(docRef, { status: status });
  });
  batch.commit().then(onSuccess);
};
