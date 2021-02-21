import express from 'express';
import db from "./db.js";


const router = express.Router();

router.use(express.json());


// /api/game
router.get("/game", async (req, res, next) => {
  const queryRef = await db.collection("questions").get();
  const questions = [];

  queryRef.forEach((doc) => questions.push({ id: doc.id, ...doc.data() }));

  const randomIndex = Math.floor(Math.random() * questions.length);

  res.json(questions[randomIndex]);
});

// /api/questions
router.get("/questions", async (req, res, next) => {
  const queryRef = await db.collection("questions").get();
  const questions = [];

  queryRef.forEach((doc) =>
    questions.push({ id: doc.id, question: doc.data().question })
  );

  res.json(questions);
});

// /api/questions
router.post("/questions", async (req, res, next) => {
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

// /api/questions/:id
router.delete("/questions/:id", async (req, res, next) => {
  const id = req.params.id;

  await db.collection("questions").doc(id).delete();

  res.json({});
});

export default router;