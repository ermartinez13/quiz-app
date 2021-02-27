const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const highScoreItems = highScores
  .map(
    (highScore) =>
      `<li class="high-score">${highScore.username} - ${highScore.score}</li>`
  )
  .join("");

highScoresList.innerHTML = highScoreItems;
