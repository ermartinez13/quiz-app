const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions;

const correctBonus = 10;
const maxQuestions = 3;

fetch("./questions.json")
  .then((res) => res.json())
  .then((data) => {
    questions = data;
    startGame();
  })
  .catch((e) => {
    console.log(e);
  });

function startGame() {
  resetGameState();
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    return window.location.assign("/end.html");
  }

  questionCounter++;

  setQuestion();

  setChoices();

  acceptingAnswers = true;
}

choices.map((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedChoiceNumber = Number(selectedChoice.dataset.number);

    const classToApply =
      selectedChoiceNumber === currentQuestion.answer ? "correct" : "incorrect";
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 600);
  });
});

function resetGameState() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
}

function setQuestion() {
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  // to prevent question from being repeated
  availableQuestions.splice(questionIndex, 1);
  question.innerText = currentQuestion.question;
}

function setChoices() {
  choices.map((choice) => {
    const choiceNumber = choice.dataset.number;
    choice.innerText = currentQuestion[`choice` + choiceNumber];
  });
}