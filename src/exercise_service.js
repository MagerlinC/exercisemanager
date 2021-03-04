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

export const updateExerciseStatus = (exercise, status) => {};
