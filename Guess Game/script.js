"use strict";

let secretNumber = Math.floor(Math.random() * 20) + 1;
let number = document.querySelector(".number");
let message = document.querySelector(".message");
let scoreDiv = document.querySelector(".score");
let gameScore = 20;
let highScore = 0;
let flag = false;

document.querySelector(".again").addEventListener("click", () => {
  flag = false;
  gameScore = 20;
  document.body.style.backgroundColor = "#222";
  scoreDiv.textContent = 20;
  message.textContent = "Start guessing...";
  number.textContent = "?";
  document.querySelector(".guess").value = "";
});

document.querySelector(".check").addEventListener("click", () => {
  if (gameScore <= 0) {
    message.textContent = "You loose the game. Try again!";
    return;
  }
  if (flag) {
    alert(`Play Again`);
    return;
  }

  let guessVal = Number(document.querySelector(".guess").value);
  if (secretNumber === guessVal) {
    number.textContent = secretNumber;
    message.textContent = "🎉 Correct Answer!";
    secretNumber = Math.floor(Math.random() * 20) + 1;
    document.body.style.backgroundColor = "#60b347";
    flag = true;
    if (gameScore > highScore) {
      highScore = gameScore;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guessVal > secretNumber) {
    message.textContent = "Too High";
    number.textContent = "?";
    gameScore--;
    scoreDiv.textContent = gameScore;
    document.querySelector("body").style.backgroundColor = "#222";
  } else {
    message.textContent = "Too low";
    number.textContent = "?";
    gameScore--;
    scoreDiv.textContent = gameScore;
    document.body.style.backgroundColor = "#222";
  }
});
