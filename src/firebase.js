import firebase from "firebase/app";
// Required for side-effects
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyAQMyBsDUjLuhvuFH7NT_vTp7ZD-qzj7Rw",
  authDomain: "exercisemanager-35041.firebaseapp.com",
  projectId: "exercisemanager-35041",
  storageBucket: "exercisemanager-35041.appspot.com",
  messagingSenderId: "14691680091",
  appId: "1:14691680091:web:6da16e3058573e0cdd647e",
};

firebase.initializeApp(config);

const db = firebase.firestore();

export { db };
