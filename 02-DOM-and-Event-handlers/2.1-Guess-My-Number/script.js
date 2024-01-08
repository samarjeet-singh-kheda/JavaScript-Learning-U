"use strict";
/*
console.log(document.querySelector(".message").textContent);

document.querySelector(".message").textContent = "Correct Number!";
console.log(document.querySelector(".message").textContent);

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 10;

document.querySelector(".guess").value = 90;
console.log(document.querySelector(".guess").value);

// document.querySelector(".check").addEventListener("click", function () {
    //   console.log(document.querySelector(".guess").value);
    // });
    
    const guess = document.querySelector(".guess");
    const check = document.querySelector(".check");
    const message = document.querySelector(".message");
    
    check.addEventListener("click", function () {
        message.textContent = `You entered ${guess.value}.`;
        console.log(typeof guess.value);
        
        if (!guess.value) {
            message.textContent = "Number is not added.";
        }
    });
    
*/

//! GAME LOGIC
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// const number2 = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = (messageString) => {
  document.querySelector(".message").textContent = messageString;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = document.querySelector(".guess").value;
  const guessNum = Number(guess);

  // no input
  if (!guess) {
    // document.querySelector(".message").textContent = "⛔️ Empty guess field!";
    displayMessage("⛔️ Empty guess field!");
  }
  // out of bounds
  else if (guessNum < 1 || guessNum > 20) {
    displayMessage("⛔️ Invalid guess!");
  }

  // player wins
  else if (guessNum === secretNumber) {
    document.querySelector(".number").textContent = secretNumber;

    document.querySelector(
      ".message"
    ).textContent = `🎉 You guessed the correct number!`;

    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  }

  // guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector(".message").textContent =
      //   guessNum > secretNumber ? "📈 Too High!" : "📉 Too Low!";
      score--;
      displayMessage(guessNum > secretNumber ? "📈 Too High!" : "📉 Too Low!");
      document.querySelector(".score").textContent = score;
    } else {
      // document.querySelector(".message").textContent = "💥 You lost!";
      displayMessage("💥 You lost!");

      document.querySelector(".score").textContent = 0;
    }
  }

  /*
  // too high
  else if (guessNum > secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "📈 Too High!";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "💥 You lost!";
      document.querySelector(".score").textContent = 0;
    }
  }

  // too high
  else if (guessNum < secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "📉 Too Low!";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "💥 You lost!";
      document.querySelector(".score").textContent = 0;
    }
  }
  */
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";

  // document.querySelector(".message").textContent = "Start guessing...";
  displayMessage("Start guessing...");
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector(".score").textContent = score;
});

//! My attempt
/*
const again = document.querySelector(".again");
const guess = document.querySelector(".guess");
const check = document.querySelector(".check");
const number = document.querySelector(".number");
const message = document.querySelector(".message");
const score = document.querySelector(".score");
const highscore = document.querySelector(".highscore");

let correct = Math.floor(Math.random() * 20 + 1);
console.log(correct);

let currentScoreValue = 20;
let highscoreValue = 0;

check.addEventListener("click", function () {
  const guessValue = Number(guess.value);
  // Empty guess field
  if (guessValue !== correct) {
    if (!guess.value) {
      message.textContent = "⛔️ Guess field is empty.";
    } else if (currentScoreValue === 0) {
      message.textContent = "💥 You lost!";
      document.querySelector("body").style.backgroundColor = "red";
    }
    // Guess out of bounds
    else if (guessValue < 1 || guessValue > 20) {
      message.textContent = "Invalid guess.";
    }
    // Too high
    else if (guessValue > correct) {
      message.textContent = "📈 Too High!";
      score.textContent = --currentScoreValue;
      number.textContent = guessValue;
    }
    // To low
    else if (guessValue < correct) {
      message.textContent = "📉 Too Low!";
      score.textContent = --currentScoreValue;
      number.textContent = guessValue;
    }
  }
  // Correct guess
  else {
    message.textContent = `🎉 You Won in ${
      20 - currentScoreValue + 1
    } attempt(s)!`;
    number.textContent = guessValue;
    document.querySelector("body").style.backgroundColor = "green";
    // setting highscore
    if (currentScoreValue > highscoreValue) {
      highscoreValue = currentScoreValue;
      highscore.textContent = highscoreValue;
    }
  }
});

again.addEventListener("click", function () {
  correct = Math.floor(Math.random() * 20 + 1);
  console.log(correct);

  guess.value = "";
  currentScoreValue = 20;
  score.textContent = currentScoreValue;
  document.querySelector("body").style.backgroundColor = "#222";
  number.textContent = "?";
  message.textContent = "Start guessing...";
});
*/

document.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "Enter") {
    const guess = document.querySelector(".guess").value;
    const guessNum = Number(guess);

    // no input
    if (!guess) {
      // document.querySelector(".message").textContent = "⛔️ Empty guess field!";
      displayMessage("⛔️ Empty guess field!");
    }
    // out of bounds
    else if (guessNum < 1 || guessNum > 20) {
      displayMessage("⛔️ Invalid guess!");
    }

    // player wins
    else if (guessNum === secretNumber) {
      document.querySelector(".number").textContent = secretNumber;

      document.querySelector(
        ".message"
      ).textContent = `🎉 You guessed the correct number!`;

      document.querySelector("body").style.backgroundColor = "#60b347";
      document.querySelector(".number").style.width = "30rem";

      if (score > highscore) {
        highscore = score;
        document.querySelector(".highscore").textContent = highscore;
      }
    }

    // guess is wrong
    else if (guess !== secretNumber) {
      if (score > 1) {
        // document.querySelector(".message").textContent =
        //   guessNum > secretNumber ? "📈 Too High!" : "📉 Too Low!";
        score--;
        displayMessage(
          guessNum > secretNumber ? "📈 Too High!" : "📉 Too Low!"
        );
        document.querySelector(".score").textContent = score;
      } else {
        // document.querySelector(".message").textContent = "💥 You lost!";
        displayMessage("💥 You lost!");

        document.querySelector(".score").textContent = 0;
      }
    }
  }
});
