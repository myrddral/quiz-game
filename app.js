"use strict";

import express from "express";
import path, {dirname} from "path";
import {fileURLToPath} from "url";
import firebase from 'firebase';
import "@firebase/firestore";


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;




//DB:

const firebaseConfig = {
    apiKey: "AIzaSyC2Vq5pUyRk6yBv6R4CG1fe51AoPIMuTg4",
    authDomain: "quiz-game-7f747.firebaseapp.com",
    projectId: "quiz-game-7f747",
    storageBucket: "quiz-game-7f747.appspot.com",
    messagingSenderId: "58245694364",
    appId: "1:58245694364:web:40b39344391532ca14be59",
    measurementId: "G-XQMVKBMJLN"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();



//FRONTEND:
app.use(express.static(getAbsolutePath("public")));

app.get("/game", (req, res, next) => {
    res.sendFile('game.html', {root: getAbsolutePath("public")});
});
app.get("/questions", (req, res, next) => {
    res.sendFile('questions.html', {root: getAbsolutePath("public")});

});



//BACKEND:
app.get("/api/game", async (req, res, next) => {
  const queryRef = await db.collection('questions').get();
  const questions = [];

  queryRef.forEach(doc => questions.push({ id: doc.id, ...doc.data() }));

  const randomIndex = Math.floor(Math.random() * questions.length);

  res.json(questions[randomIndex]);
});

app.get("/api/questions", async (req, res, next) => {
const queryRef = await db.collection('questions').get();
  const questions = [];

  queryRef.forEach(doc => questions.push({ id: doc.id, question: doc.data().question }));

  res.json(questions);
});

app.post("/api/questions", (req, res, next) => {

    

});
app.delete("/api/questions/:id", (req, res, next) => {});


app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

function getAbsolutePath(dirName) {
    return path.join(__dirname, dirName)
}