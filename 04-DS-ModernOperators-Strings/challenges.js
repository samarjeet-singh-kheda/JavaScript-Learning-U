/*


! ******************************************** Coding Challenge #1 ********************************************

We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game ('game' variable on
next page). In this challenge we're gonna work with that data.

? Your tasks:

1. Create one player array for each team (variables 'players1' and
'players2')

2. The first player in any player array is the goalkeeper and the others are field
players. For Bayern Munich (team 1) create one variable ('gk') with the
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
field players

3. Create an array 'allPlayers' containing all players of both teams (22
players)

4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
new array ('players1Final') containing all the original team1 players plus
'Thiago', 'Coutinho' and 'Perisic'

5. Based on the game.odds object, create one variable for each odd (called
'team1', 'draw' and 'team2')

6. Write a function ('printGoals') that receives an arbitrary number of player
names (not an array) and prints each of them to the console, along with the
number of goals that were scored in total (number of player names passed in)

7. The team with the lower odd is more likely to win. Print to the console which
team is more likely to win, without using an if/else statement or the ternary
operator.

Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
Then, call the function again with players from game.scored



*/
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//? *********************** ANSWER 1 ***********************
const [players1, players2] = [...game.players];
console.log(players1);
console.log(players2);

//? *********************** ANSWER 2 ***********************
const [gk, ...fieldPlayers] = [...players1];
console.log(gk);
console.log(fieldPlayers);

//? *********************** ANSWER 3 ***********************
const allPlayers = [...players1, ...players2];
// const [...allPlayers] = [...players1, ...players2];
console.log(allPlayers);

//? *********************** ANSWER 4 ***********************
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(players1Final);

//? *********************** ANSWER 5 ***********************
// const { team1, x: draw, team2 } = { ...game.odds };
const {
  odds: { team1, team2, x: draw },
} = { ...game };
console.log(team1);
console.log(draw);
console.log(team2);

//? *********************** ANSWER 6 ***********************
const printGoals = function (...playerNames) {
  for (const playerName of playerNames) {
    console.log(playerName);
  }
  console.log("Goals: ", playerNames.length);
};
printGoals(...allPlayers);
printGoals(...players1);
printGoals(...players2);
printGoals("a", "b", "c");
printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
printGoals(...game.scored);

//? *********************** ANSWER 6 ***********************
// console.log((team1 < team2 && "team1") || "team2");
team1 < team2 && console.log("Team1 is more likely to win.");
team1 > team2 && console.log("Team2 is more likely to win.");

/* 



! ******************************************** Coding Challenge #2 ********************************************

Let's continue with our football betting app! Keep using the 'game' variable from
before.

? Your tasks:

1. Loop over the game.scored array and print each player name to the console,
along with the goal number (Example: "Goal 1: Lewandowski")

2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)

3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:

! Odd of victory Bayern Munich: 1.33
! Odd of draw: 3.25
! Odd of victory Borrussia Dortmund: 6.5

Get the team names directly from the game object, don't hardcode them
(except for "draw").

Hint: Note how the odds and the game objects have the
same property names 😉

4. Bonus: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this
game, it will look like this:

{
Gnarby: 1,
Hummels: 1,
Lewandowski: 2
}



*/
console.log(
  "\n*************************** CHALLENGE 2 ***************************\n"
);

//? *********************** ANSWER 1 ***********************
for (const [goalNum, playerName] of game.scored.entries()) {
  console.log(`Goal ${goalNum + 1}: ${playerName}`);
}

//? *********************** ANSWER 2 ***********************
const oddArr = Object.values(game.odds);
let totalOdds = 0;
for (const odd of oddArr) {
  totalOdds += odd;
}
console.log(totalOdds / oddArr.length);

//? *********************** ANSWER 3 ***********************
for (const [teamName, oddValue] of Object.entries(game.odds)) {
  const str = teamName === "x" ? "draw" : `victory ${game[teamName]}`;
  console.log(` Odd of ${str}: ${oddValue}`);
}

//? *********************** ANSWER 4 ***********************
const scorers = {};
for (const player of game.scored) {
  if (scorers[player]) {
    scorers[player]++;
  } else {
    scorers[player] = 1;
  }
}
console.log(scorers);

/* 



! ******************************************** Coding Challenge #3 ********************************************

Let's continue with our football betting app! This time, we have a map called
'gameEvents' (see below) with a log of the events that happened during the
game. The values are the events themselves, and the keys are the minutes in which
each event happened (a football game has 90 minutes plus some extra time).

? Your tasks:

1. Create an array 'events' of the different game events that happened (no duplicates)

2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.

3. Compute and log the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)

4. Loop over 'gameEvents' and log each element to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
                                      [FIRST HALF] 17: ⚽GOAL



*/

const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "🔶 Yellow card"],
]);

console.log(
  "\n*************************** CHALLENGE 3 ***************************\n"
);

//? *********************** ANSWER 1 ***********************
const events = [...new Set(gameEvents.values())];
console.log(events);

//? *********************** ANSWER 2 ***********************
gameEvents.delete(64);
console.log(gameEvents);

//? *********************** ANSWER 3 ***********************
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes.`
);

//!   BONUS
const actualTime = [...gameEvents.keys()].pop();
console.log(
  `An event happened, on average, every ${
    actualTime / gameEvents.size
  } minutes.`
);

//? *********************** ANSWER 4 ***********************
// for (const [minute, event] of gameEvents.entries()) {
//   if (minute <= 45) {
//     console.log(`[FIRST HALF] ${minute}: ${event}`);
//   } else if (minute > 45 && minute <= 90) {
//     console.log(`[SECOND HALF] ${minute}: ${event}`);
//   } else {
//     console.log(`[EXTRA TIME] ${minute}: ${event}`);
//   }
// }

for (const [minute, event] of gameEvents.entries()) {
  console.log(
    `[${minute <= 45 ? "FIRST" : "SECOND"} HALF] ${minute}: ${event}`
  );
}

/* 



! ******************************************** Coding Challenge #4 ********************************************

Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below to insert the elements), and conversion will happen when the button is pressed.

Test data (pasted to textarea, including spaces):

underscore_case
  first_name
Some_Variable
  calculate_AGE
delayed_departure


Should produce this output (5 separate console.log outputs):

?   underscoreCase              ✅
?   firstName                   ✅✅
?   someVariable                ✅✅✅
?   calculateAge                ✅✅✅✅
?   delayedDeparture            ✅✅✅✅✅





*/

document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

console.log(
  "\n*************************** CHALLENGE 3 ***************************\n"
);

//? *********************** ANSWER ***********************

document.querySelector("button").addEventListener("click", () => {
  const rows = document.querySelector("textarea").value.split("\n");
  console.log(rows);

  // for (let i = 0; i < rows.length; i++) {
  //   const lowerCaseElement = rows[i].toLowerCase().trim();
  //   const underScoreIdx = lowerCaseElement.indexOf("_");
  //   const inCamelCase =
  //     lowerCaseElement.slice(0, underScoreIdx) +
  //     lowerCaseElement[underScoreIdx + 1].toUpperCase() +
  //     lowerCaseElement.slice(underScoreIdx + 2);

  //   console.log(`${inCamelCase.padEnd(28, " ")}${"✅".repeat(i + 1)}`);
  // }

  for (const [itr, row] of rows.entries()) {
    if (row) {
      const lowerCaseRow = row.toLowerCase().trim();
      const underScoreIdx = lowerCaseRow.indexOf("_");
      const ans =
        lowerCaseRow.slice(0, underScoreIdx) +
        lowerCaseRow[underScoreIdx + 1].toUpperCase() +
        lowerCaseRow.slice(underScoreIdx + 2);

      console.log(`${ans.padEnd(20)}${"✅".repeat(itr + 1)}`);
    }
  }
});

/*
underscore_case
  first_name
Some_Variable
  calculate_AGE
delayed_departure
*/
