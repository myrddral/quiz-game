"use strict";

class Game {
  score = 0;

  async getNewQuestion() {
    fetch(`http://localhost:3000/api/game`)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        const questionDiv = document.getElementById("question");
        questionDiv.textContent = result.question;
        const ul = document.createElement("ul");

        //GENERATE ANSWER BUTTONS
        for (let i = 0; i < result.answers.length; i++) {
          const answersDiv = document.getElementById("answers");
          const li = document.createElement("li");
          const button = document.createElement("button");
          button.classList.add(`answer${i + 1}`);
          answersDiv.appendChild(ul);
          ul.appendChild(li);
          li.appendChild(button);
          button.textContent = result.answers[i].answer;

          //ADD CLICK EVENT TO ANSWER BUTTONS
          button.addEventListener("click", () => {
            if (result.answers[i].is_correct === true) {
              // DISALLOW USER TO CLICK TWICE
              this.disableButtons();
              setTimeout(() => {
                button.classList.add("correct-answer");
                this.increaseScore();
                this.newGame();
              }, 1000);
            } else {
              this.disableButtons();
              setTimeout(() => {
                button.classList.add("wrong-answer");
                this.showCorrectAnswer(result.answers);
              }, 1000);
              this.newGame();
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  newGame() {
    setTimeout(() => {
      document.getElementById("answers").textContent = "";
      this.getNewQuestion();
    }, 2000);
  }

  increaseScore() {
    this.score++;

    const scoreSpan = document.querySelector("#score span");
    scoreSpan.textContent = this.score;
  }

  disableButtons() {
    const answerButtons = document.querySelectorAll("#answers button");

    answerButtons.forEach((element) => {
      element.disabled = true;
    });
  }

  showCorrectAnswer(answers) {
    for (let i = 0; i < answers.length; i++) {
      const button = document.querySelector(`.answer${i + 1}`);
      if (answers[i].is_correct === true) {
        button.classList.add("correct-answer");
      }
    }
  }
}

window.onload = () => {
  const game = new Game();

  game.getNewQuestion();
};
