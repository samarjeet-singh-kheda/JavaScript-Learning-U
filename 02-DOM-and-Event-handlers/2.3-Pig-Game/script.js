"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const playerName0El = document.getElementById("name--0");
const playerName1El = document.getElementById("name--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let playing, scores, currentScore, activePlayer;

const enterUsernames = function () {
  const playerName0 = prompt("Enter Player 1 name");
  const playerName1 = prompt("Enter Player 2 name");

  playerName0El.textContent = playerName0;
  playerName1El.textContent = playerName1;
};
// enterUsernames();

const init = function () {
  // game state variables
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  // Starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player1El.classList.remove("player--active");

  player0El.classList.add("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.remove("player--active");
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;

  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.add("player--active");

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `img/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // current0El.textContent = currentScore; //! CHANGE LATER
    } else {
      // switch player

      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score

    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      diceEl.classList.add("hidden");
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener(
  "click",
  init

  // function () {
  //   // starting conditions
  //   score0El.textContent = 0;
  //   score1El.textContent = 0;
  //   diceEl.classList.add("hidden");
  //   playing = true;

  //   scores[0] = 0;
  //   scores[1] = 0;
  //   currentScore = 0;
  //   activePlayer = 0;

  //   player0El.classList.remove("player--winner");
  //   player1El.classList.remove("player--winner");
  //   player1El.classList.remove("player--active");

  //   player0El.classList.add("player--active");

  //   current0El.textContent = 0;
  //   current1El.textContent = 0;
  // }
);

//! MY ATTEMPT
/*
const currentScore1 = document.querySelector("#current--0");
const currentScore2 = document.querySelector("#current--1");
const totalScore1 = document.querySelector("#score--0");
const totalScore2 = document.querySelector("#score--1");

const btnRollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");

const dice = document.querySelector(".dice");

const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");

// let diceRoll = Math.trunc(Math.random() * 6) + 1;

// dice.style.display = "none";
// dice.style.display = "block";

// console.log(diceRoll);
// dice.src = `img/dice-${diceRoll}.png`;

// player1.classList.remove("player--active");
// player2.classList.add("player--active");

let diceRoll = 0;
let currentScoreVal1 = 0;
let currentScoreVal2 = 0;
let totalScoreVal1 = 0;
let totalScoreVal2 = 0;
let currentPlayer = 1;

dice.style.display = "none";

totalScore1.textContent = totalScoreVal1;
totalScore2.textContent = totalScoreVal2;
currentScore1.textContent = currentScoreVal1;
currentScore2.textContent = currentScoreVal2;

const calcDiceRoll = function () {
  dice.style.display = "block";
  diceRoll = Math.trunc(Math.random() * 6) + 1;
  dice.src = `img/dice-${diceRoll}.png`;
};

// calcDiceRoll();
// console.log(diceRoll);

const switchPlayer = function () {
  if (currentPlayer === 1) {
    currentPlayer = 2;

    currentScoreVal1 = 0;
    currentScore1.textContent = currentScoreVal1;

    player1.classList.remove("player--active");
    player2.classList.add("player--active");
  } else if (currentPlayer === 2) {
    currentPlayer = 1;

    currentScoreVal2 = 0;
    currentScore2.textContent = currentScoreVal2;

    player1.classList.add("player--active");
    player2.classList.remove("player--active");
  }
};

const checkWinner = function (currentPlayer) {
  if (currentPlayer === 1 && currentScoreVal1 >= 100) {
    player1.classList.remove("player--active");
    player1.classList.add("player--winner");
    return true;
  } else if (currentPlayer === 2 && currentScoreVal2 >= 100) {
    player2.classList.remove("player--active");
    player2.classList.add("player--winner");
    return true;
  }

  return false;
};

btnRollDice.addEventListener("click", function () {
  calcDiceRoll();

  if (diceRoll > 1 && currentPlayer === 1) {
    currentScoreVal1 += diceRoll;
    currentScore1.textContent = currentScoreVal1;
  } else if (diceRoll > 1 && currentPlayer === 2) {
    currentScoreVal2 += diceRoll;
    currentScore2.textContent = currentScoreVal2;
  } else if (diceRoll === 1) {
    switchPlayer();
    // alert("Player switched");
  }
});

btnHold.addEventListener("click", function () {
  if (currentPlayer === 1) {
    totalScoreVal1 += currentScoreVal1;
    totalScore1.textContent = totalScoreVal1;
  } else if (currentPlayer === 2) {
    totalScoreVal2 += currentScoreVal2;
    totalScore2.textContent = totalScoreVal2;
  }

  if (currentPlayer === 1 && totalScoreVal1 >= 100) {
    player1.classList.remove("player--active");
    player1.classList.add("player--winner");
  } else if (currentPlayer === 2 && totalScoreVal2 >= 100) {
    player2.classList.remove("player--active");
    player2.classList.add("player--winner");
  } else {
    switchPlayer();
  }

  //   if (!checkWinner(currentPlayer)) {
  //     switchPlayer();
  //   } else {
  //     checkWinner(currentPlayer);
  //   }
});

btnNewGame.addEventListener("click", function () {
  dice.style.display = "none";

  diceRoll = 0;
  currentScoreVal1 = 0;
  currentScoreVal2 = 0;
  totalScoreVal1 = 0;
  totalScoreVal2 = 0;

  currentPlayer = 2;
  switchPlayer();

  currentScore1.textContent = currentScoreVal1;
  currentScore2.textContent = currentScoreVal2;
  totalScore1.textContent = totalScoreVal1;
  totalScore2.textContent = totalScoreVal2;

  if (player1.classList.contains("player--winner")) {
    player1.classList.remove("player--winner");
  } else if (player2.classList.contains("player--winner")) {
    player2.classList.remove("player--winner");
  }
});
*/
