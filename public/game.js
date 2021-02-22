"use strict";

class Game {
  score = 0;

  async getNewQuestion() {
    fetch(`http://localhost:3000/api/game`)
      .then((response) => response.json())
      .then((result) => {
        const questionDiv = document.getElementById("question");
        questionDiv.textContent = result.question;
        const ul = document.createElement('ul');

        for (let i = 0; i < result.answers.length; i++) {
          const answersDiv = document.getElementById('answers');
          const li = document.createElement('li');
          const button = document.createElement('button');
          answersDiv.appendChild(ul);
          ul.appendChild(li);
          li.appendChild(button);
          button.textContent = result.answers[i].answer;
        }
          
        //   // button.addEventListener("click", () => {});
        // });
      })
      .catch((error) => {
        console.error(error);
      })
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
