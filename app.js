"use strict";

import express from "express";
import frontendRouter from "./frontend.js";
import backendRouter from "./backend.js";


const app = express();
const port = 3000;

//FRONTEND:
app.use('/', frontendRouter);

//BACKEND:
app.use('/api', backendRouter);


app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
