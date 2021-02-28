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
          const deleteButton = document.createElement("button");
          deleteButton.className = "hidden";
          deleteButton.innerText = "Törlés";
          questionsDiv.appendChild(deleteButton);
          question.onclick = () => this.showActions(deleteButton);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  showActions(button) {
      button.classList.remove("hidden");
      // button.classList.add("hidden");
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