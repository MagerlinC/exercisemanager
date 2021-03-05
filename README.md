# Project Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It consists of a React app connecting to a firebase environment for hosting and database, using the Firestore document DB.

# The App

The app presents a simple prototype of a simple webpage showing a list of selectable exercises that can be searched and filtered. One or more exercises can be selected for drag-and-drop by the user, moving exercises into their list ("My List") of exercises they want to complete, and can also be marked as completed. "My List" shows a summary of all exercises selected this way. When selecting multiple exercises for drag-and-drop, a small toaster comes up summarizing the amount of tasks selected.

Each exercise can be selected for further inspection by opening the exercise modal via a click on its title.

Exercises can be searched for using the search inputs, and exercises already completed can be filtered away by using the slider over "My List" (completed exercises will always be shown under "My List" - a completed exercise means you have chosen to do it AND done it).

New exercises can be created using the exercise creation modal, opened by clicking the green plus icon in the bottom right of the screen.

## Drag-and-drop

The drag-and-drop functionality uses my library [react-virtualized-dnd](https://www.npmjs.com/package/react-virtualized-dnd). I implemented this mostly for the drag-and-drop functionality, but it will also virtualize if the list of exercises gets big enough.

**NOTE**: The framework also allows for movement of exercises within each list (moving one or more exercises up or down). This functionality could be used to prioritize or order exercises, but was not the focus of this exercise. It uses a very basic sort order number to order the task, and this gets updated when moving tasks up/down, but since it is simple numbers, collisions can occur, resulting in tasks ending up in a different order on arrival, especially for multi-drag. There are some pretty cool ways to solve this problem, but I did not wish to spend my time there for this project.

## Data Storage

The database uses simple JSON document storage, and contains nothing but a collection called 'exercises', which has exercises represented as firestore documents within the collection.
Each document contains meta-data about the exercise, such as the title, difficulty, image, tags, and the status of the exercise, indicating whether the exercise has been chosen or completed (or neither).

# Testing

I have not constructed tests for the app, as it is a fairly simple CRUD web-app with next to no business logic. A cool way to test it would be to use Cypress.io to do front-end testing for the drag-and-drop and updating of exercises, but this takes a bit more setup.

## Running the code

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
