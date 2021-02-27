const saveBtn = document.getElementById("saveBtn");
const username = document.getElementById("username");
const finalScore = document.getElementById("finalScore");

const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const maxHighScores = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("input", () => {
  // don't want users to submit score unless they've typed in a username
  saveBtn.disabled = !username.value;
});

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  pushToHighScores();
  setHighScores();
  window.location.assign("/");
});

function pushToHighScores() {
  const score = {
    score: mostRecentScore,
    username: username.value,
  };
  highScores.push(score);
}

function setHighScores() {
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}
