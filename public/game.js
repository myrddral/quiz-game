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
        const ul = document.createElement('ul');

        //GENERATE ANSWER BUTTONS
        for (let i = 0; i < result.answers.length; i++) {
          const answersDiv = document.getElementById('answers');
          const li = document.createElement('li');
          const button = document.createElement('button');
          button.classList.add(`answer${i+1}`);
          answersDiv.appendChild(ul);
          ul.appendChild(li);
          li.appendChild(button);
          button.textContent = result.answers[i].answer;

          //ADD CLICK EVENT TO ANSWER BUTTONS
          button.addEventListener("click", () => {
            if (result.answers[i].is_correct === true) {
              button.classList.add('correct-answer');
              // DISALLOW USER TO CLICK TWICE
              disableButtons();
            } else {
              button.classList.add('wrong-answer');
              disableButtons();
              showCorrectAnswer();
            }
          });
        }

        const answerButtons = document.querySelectorAll("#answers button");
        
        function disableButtons () {
          answerButtons.forEach(element => {
            element.disabled = true;
          });
        }

        function showCorrectAnswer () {
          for (let i = 0; i < result.answers.length; i++) {
            const button = document.querySelector(`.answer${i+1}`)
            console.log(button);
            if (result.answers[i].is_correct === true) {
              button.classList.add('correct-answer');
            }
          }
        }
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