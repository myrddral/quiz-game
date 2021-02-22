'use strict';

class Questions {
  
    async getAllQuestions() {
        fetch('http://localhost:3000/api/questions')
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                const questionsDiv = document.getElementById('question-list');
                result.forEach(element => {
                    const question = document.createElement('div');
                    questionsDiv.appendChild(question);
                    question.textContent = element.question;
                });

            })
            .catch((error) => {
                console.error(error);
            })

    }
}

window.onload = () => {
    const questions = new Questions();
  
    questions.getAllQuestions();
  };