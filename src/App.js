import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getExercises } from "./exercise_service";

function App() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    console.log("GO");
    getExercises(setExercises);
  }, []);

  return (
    <div className="App">
      <header className="App-header">MinLæring Exercises</header>
      <div className={"exercise-list"}>{exercises.length}</div>
    </div>
  );
}

export default App;
