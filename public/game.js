"use strict";

class Game {
  score = 0;

  async getNewQuestion() {
    fetch(`http://localhost:3000/api/game`)
      .then((response) => response.json())
      .then((result) => {
        const questionDiv = document.getElementById("question");
        const answerButtons = document.querySelectorAll("#answers .answer");

        questionDiv.textContent = result.question;

        answerButtons.forEach((button, ix) => {
          button.textContent = result.answers[ix].answer;
          button.addEventListener("click", () => {});
        });
      });
  }

  increaseScore() {
    this.score++;

    const scoreSpan = document.querySelector("#score span");
    scoreSpan.textContent = this.score;
  }
}

window.onload = () => {
  const game = new Game();

  game.getNewQuestion();
};
