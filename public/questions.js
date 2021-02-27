"use strict";

class Questions {

  async getAllQuestions() {
    fetch("http://localhost:3000/api/questions")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const questionsDiv = document.getElementById("question-list");
        result.forEach((element) => {
          const question = document.createElement("div");
          question.className = "question";
          questionsDiv.appendChild(question);
          question.textContent = element.question;
          question.onclick = () => this.showAnsers();
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

window.onload = () => {
  const questions = new Questions();

  questions.getAllQuestions();
};

//MAKES SURE ONLY ONE RIGHT ANSWER CAN BE SELECTED
function onlyOne(checkbox) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false
  })
}