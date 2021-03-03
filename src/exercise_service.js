import { db } from "./firebase.js";

export const getExercises = (onSnapShotFunc) => {
  return db
    .collection("exercises")
    .get()
    .then((snapShot) => {
      const docs = [];
      snapShot.forEach((doc) => {
        docs.push(doc.data());
      });
      onSnapShotFunc(docs);
    });
};
