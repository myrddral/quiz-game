"use strict";

class Questions {
  async getAllQuestions() {
    fetch("/api/questions")
      .then((response) => response.json())
      .then((result) => {
        const questionsDiv = document.getElementById("question-list");
        result.forEach((element) => {
          const question = document.createElement("div");
          question.className = "question";
          questionsDiv.appendChild(question);
          question.textContent = element.question;
          const deleteButton = document.createElement("button");
          deleteButton.classList.add('hidden', 'delete-button');
          deleteButton.innerText = "Törlés";
          question.appendChild(deleteButton);
          question.onclick = () => this.showActions(deleteButton);
          deleteButton.onclick = () => this.deleteQuestion(element.id);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addQuestion() {
    const questionValue = document.getElementById("editorQuestion").value;
    const editorAnswer1Value = document.getElementById("editorAnswer1").value;
    const editorAnswer2Value = document.getElementById("editorAnswer2").value;
    const editorAnswer3Value = document.getElementById("editorAnswer3").value;
    const editorAnswer4Value = document.getElementById("editorAnswer4").value;
    const checkBox1 = document.getElementById("checkbox1");
    const checkBox2 = document.getElementById("checkbox2");
    const checkBox3 = document.getElementById("checkbox3");
    const checkBox4 = document.getElementById("checkbox4");
    const formData = {
      question: `${questionValue}`,
      answers: [
        {
          answer: `${editorAnswer1Value}`,
          is_correct: checkBox1.checked,
        },
        {
          answer: `${editorAnswer2Value}`,
          is_correct: checkBox2.checked,
        },
        {
          answer: `${editorAnswer3Value}`,
          is_correct: checkBox3.checked,
        },
        {
          answer: `${editorAnswer4Value}`,
          is_correct: checkBox4.checked,
        },
      ],
    };
    (async () => {
      const rawResponse = await fetch("/api/questions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const content = await rawResponse.json();

      console.log(content);
    })();
    document.getElementById("form-control").reset();
    alert("Kérdés hozzáadva az adatbázishoz!");
    // const questionsDiv = document.getElementById("question-list");
    // questionsDiv.remove();
    // this.getAllQuestions();
    location.reload();
  }

  async deleteQuestion(id) {
    fetch(`/api/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res));
      location.reload();
  }

  showActions(button) {
    if (button.classList.contains("hidden")) {
      button.classList.remove("hidden");
    } else {
      button.classList.add("hidden");
    }
  }
}

window.onload = () => {
  const questions = new Questions();

  const addButton = document.getElementById("addButton");
  const resetButton = document.getElementById("resetButton");
  addButton.onclick = () => questions.addQuestion();
  resetButton.onclick = () => document.getElementById("form-control").reset();

  questions.getAllQuestions();
};

//MAKES SURE ONLY ONE RIGHT ANSWER CAN BE SELECTED
function onlyOne(checkbox) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false;
  });
}
