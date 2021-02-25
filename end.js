const saveScore = document.getElementById("save-score");
const username = document.getElementById("username");

username.addEventListener("input", () => {
  // don't want users to submit score unless they've typed in a username
  saveScore.disabled = !username.value;
});

saveScore.addEventListener("click", (e) => {
  e.preventDefault();
});
