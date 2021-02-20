"use strict";

import express from "express";
import firebase from "firebase";
import "@firebase/firestore";
import { type } from "os";
import { createDirname } from "./utils/util.js";


const app = express();
const port = 3000;
const getAbsolutePath = createDirname(import.meta.url);

//DB:

const firebaseConfig = {
  apiKey: "AIzaSyC2Vq5pUyRk6yBv6R4CG1fe51AoPIMuTg4",
  authDomain: "quiz-game-7f747.firebaseapp.com",
  projectId: "quiz-game-7f747",
  storageBucket: "quiz-game-7f747.appspot.com",
  messagingSenderId: "58245694364",
  appId: "1:58245694364:web:40b39344391532ca14be59",
  measurementId: "G-XQMVKBMJLN",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

//FRONTEND:
app.use(express.static(getAbsolutePath("public")));

app.get("/game", (req, res, next) => {
  res.sendFile("game.html", { root: getAbsolutePath("public") });
});
app.get("/questions", (req, res, next) => {
  res.sendFile("questions.html", { root: getAbsolutePath("public") });
});

//BACKEND:
app.use(express.json());

app.get("/api/game", async (req, res, next) => {
  const queryRef = await db.collection("questions").get();
  const questions = [];

  queryRef.forEach((doc) => questions.push({ id: doc.id, ...doc.data() }));

  const randomIndex = Math.floor(Math.random() * questions.length);

  res.json(questions[randomIndex]);
});

app.get("/api/questions", async (req, res, next) => {
  const queryRef = await db.collection("questions").get();
  const questions = [];

  queryRef.forEach((doc) =>
    questions.push({ id: doc.id, question: doc.data().question })
  );

  res.json(questions);
});

app.post("/api/questions", async (req, res, next) => {
  const inputData = req.body;

  //validate answer before sending to database
  if (typeof inputData.question !== "string" || inputData.question.length < 3) {
    throw new Error("invalid question");
  }

  if (!Array.isArray(inputData.answers) || inputData.answers.length !== 4) {
    throw new Error("invalid answers");
  }

  for (let i = 0; i < inputData.answers.length; i++) {
    const answerObject = inputData.answers[i];

    if (
      typeof answerObject.answer !== "string" ||
      answerObject.answer.length < 3
    ) {
      throw new Error(`invalid answer[${i}]`);
    }
    if (typeof answerObject.is_correct !== "boolean") {
      throw new Error(`invalid is_correct[${i}]`);
    }
  }

  if (
    inputData.answers.filter(
      (answerObject) => answerObject.is_correct.length !== 1
    )
  ) {
    throw new Error("there is more than 1 correct answer");
  }

  const doc = await db.collection("questions").add(inputData);

  res.json({ id: doc.id });
});
app.delete("/api/questions/:id", async (req, res, next) => {
    const id = req.params.id;

    await db.collection('questions')
    .doc(id)
    .delete();

    res.json({});
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
