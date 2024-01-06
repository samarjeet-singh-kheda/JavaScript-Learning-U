"use strict"; // in quotes
/*
// STRICT MODE ERRORS
let hasDriverslicense = false;
const passTest = true;

if (passTest) {
    hasDriverlicense = true;
}

// hasDriverlicense is not defined
if (hasDriverslicense) {
  console.log(`YAY! You can drive :) `);
}

const private = 2; //Unexpected strict mode reserved word
const interface = 2; //Unexpected strict mode reserved word



//! FUNCTIONS
function logger() {
  console.log(`My name ain't Khan!`);
}

logger(); //? calling or running or invoking the function
logger();
logger(23, 78, 90); //? passing parameters will have no effect

function juiceProcessor(apples, oranges) {
  //? works like a machine
  console.log(apples, oranges);
  return `Juice with ${apples} apples & ${oranges} oranges.`;
}

//? once executed, function is replaced by the return value
const appleJuice = juiceProcessor(5, 0); //? capturing value in a variable (appleJuice)
console.log(appleJuice);

console.log(juiceProcessor(2, 5));

function calcAge1(currentYear, birthYear) {
  //? parameter is the placeholder for the actual value to be filled in
  return currentYear - birthYear; //? parameter is kinda local variable
}

console.log(calcAge1(2047, 2003)); //? argument is the actual value filled in

//! FUNCTION EXPRESSION
//? functions are also treated as values and can be assigned to variables

const calcAge2 = function (currentYear, birthYear) {
  return currentYear - birthYear;
};

console.log(calcAge2(2099, 2002));

//? function expressions can't be accessed before they are defined but functions declaration can


//! ARROW FUNCTION
//? arrow functions do not have their own "this" keyword but instead inherit it from the parent scope.

//? just a shorter form to write a function
//? In case of single parameter, don't even need a bracket but for multiple it does

const calcAge3 = (birthYear) => 2037 - birthYear; //? return is implicit

console.log(calcAge3(2003));

// in case of bigger function logic {} and return needs to be used
const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2024 - birthYear;
  const retirement = 65 - age;
  return `${firstName} will retire in ${retirement} years.`;
};

console.log(yearsUntilRetirement(2003, "Samar"));


function calcAge(birthYear) {
  return 2024 - birthYear;
}

const calcRetirementAge = (age) => 65 - age;

const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = calcRetirementAge(age);
  
  if (retirement < 0) {
    return `${firstName} might already be retired.`;
  } else {
    return `${firstName} has ${retirement} years until retirement.`;
  }
};

console.log(yearsUntilRetirement(2003, "Monica"));
console.log(yearsUntilRetirement(1950, "Mike"));


// !  FOR LOOP
// for (let rep = 5; rep <= 20; rep += 2) {
  //   console.log("Lifting weights repetition " + rep);
  // }
  
  const jonas = [
    "Jonas",
    "Schemdtmann",
  2037 - 1991,
  "teacher",
  ["Micahel", "Sarah", "Brian", "Jim"],
  {
    course: "Javascript",
    price: 500,
    review: false,
  },
];

for (let i = 0; i < jonas.length; i++) {
  console.log(jonas[i], "-->", typeof jonas[i]);
}

const typesOfJonas = [];

for (let i = 0; i < jonas.length; i++) {
  // typesOfJonas[i] = typeof jonas[i];
  typesOfJonas.push(typeof jonas[i]);
}
console.log(typesOfJonas);

const years = [1991, 2007, 1969, 2020];
const ages = [];

function calcAge(birthYear) {
  return 2024 - birthYear;
}

for (let i = 0; i < years.length; i++) {
  ages.push(calcAge(years[i]));
}
console.log(ages);

let new_arr = [];

console.log("-------ONLY STRINGS-------");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== "string") {
    continue;
  }
  new_arr.push(jonas[i]);
}
console.log(new_arr);

new_arr = [];
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] === "number") {
    break;
  }
  new_arr.push(jonas[i]);
}
console.log(new_arr);


*/
const jonas = [
  "Jonas",
  "Schemdtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Sarah", "Brian", "Jim"],
];

// for (let i = jonas.length - 1; i >= 0; i--) {
//   console.log(jonas[i]);
// }

// for (let exercise = 1; exercise <= 3; exercise++) {
//   console.log(`-------Start exercise ${exercise}-------`);
//   for (let rep = 1; rep <= 5; rep++) {
//     console.log(`Repetition ${rep} of exercise ${exercise}.`);
//   }
//   console.log(`-------End of exercise ${exercise}-------\n`);
// }

let diceRoll = Math.floor(Math.random() * 6 + 1);

let roll = 1;
while (diceRoll !== 6) {
  diceRoll = Math.floor(Math.random() * 6 + 1);
  console.log(`You got ${diceRoll} on roll number ${roll}.`);
  roll++;
}
// console.log(diceRoll);
