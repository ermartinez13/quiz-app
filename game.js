const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const correctBonus = 10;
const maxQuestions = 3;

fetch("./questions.json")
  .then((res) => res.json())
  .then((data) => {
    availableQuestions = data;
    startGame();
  })
  .catch((e) => {
    console.log(e);
  });

function startGame() {
  questionCounter = 0;
  score = 0;
  // availableQuestions = [];
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    return window.location.assign("/end.html");
  }

  questionCounter++;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  availableQuestions.splice(questionIndex, 1);

  question.innerText = currentQuestion.question;

  choices.map((choice) => {
    const choiceNumber = choice.dataset.number;
    choice.innerText = currentQuestion[`choice` + choiceNumber];
  });

  acceptingAnswers = true;
}

choices.map((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedChoiceNumber = Number(selectedChoice.dataset.number);

    const classToApply =
      Number(selectedChoiceNumber) === currentQuestion.answer
        ? "correct"
        : "incorrect";

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 600);
  });
});

// startGame();
