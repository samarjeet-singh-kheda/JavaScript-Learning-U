"use strict";
/*
// STRICT MODE ERRORS
let hasDriverslicense = false;
const passTest = true;

if (passTest) {
    hasDriverlicense = true;
}

if (hasDriverslicense) {
  console.log(`YAY! You can drive :) `); //hasDriverlicense is not defined
}

const private = 2; //Unexpected strict mode reserved word
const interface = 2; //Unexpected strict mode reserved word
*/

// FUNCTIONS
function logger() {
  console.log(`My name ain't Khan!`);
}

logger(); //calling or running or invoking the function
logger();
logger();

function juiceProcessor(apples, oranges) {
  //works like a machine
  console.log(apples, oranges);
  return `Juice with ${apples} apples & ${oranges} oranges.`;
}

const appleJuice = juiceProcessor(5, 0); //capturing value in a variable
console.log(appleJuice);

console.log(juiceProcessor(2, 5));

function currentAge(currentYear, birthYear) { //parameter is the placeholder for the actual value to be filled in
  return currentYear - birthYear; //parameter is kinda local variable
}

console.log(currentAge(2047, 2003)); //argument is the actual value filled in
