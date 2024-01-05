"use strict";
/*
//! ARRAYS
let arr = [1, 2, 3, 4];
console.log(arr);

//? with let array can be re-assigned
arr = ["lala", "kala", "bala"];
console.log(arr);

const friends = [];

//? entire array is constant & can't be re-assigned but individual elements can be re-assigned
friends[2] = "gagan";
friends[6] = "samar";

// friends = ["sarah", "saraya"]; //? TypeError: Assignment to constant variable.

console.log(friends); //? OUTPUT --> [ <2 empty items>, 'gagan', <3 empty items>, 'samar' ]

//? expects expression as elements, can be of different data types
const years = new Array(1991, 1984, 2008, 2020);

console.log(years);
console.log(years[5]); //? OUTPUT --> undefined

//? arr[expr] --> expects expression here
console.log(friends[friends.length - 1]); //? OUTPUT --> samar

//! Array with different types of values
const firstName = "jonas";

const jonas = [
  firstName,
  "Schemdtmann",
  2037 - 1991,
  "teacher",
  years,
  friends,
  friends[3],
  years[2],
];
console.log(jonas);
//? OUTPUT --> [
//?               'jonas',
//?               'Schemdtmann',
//?               46,
//?               'teacher',
//?               [ 1991, 1984, 2008, 2020 ],
//?               [ <2 empty items>, 'gagan', <3 empty items>, 'samar' ],
//?               undefined,
//?               2008
//?             ]

//! ARRAY EXERCISE
const calcAge = function (birthYear) {
  return 2024 - birthYear;
};
const birthYears = [1990, 1967, 2002, 2010, 2018];

const ages = [];
for (let i = 0; i < birthYears.length; i++) {
    ages[i] = calcAge(birthYears[i]);
}
console.log(ages);


const birthYears = [1990, 1967, 2002, 2010, 2018];

console.log(birthYears + 10); //? OUTPUT -->  1990,1967,2002,2010,201810   (string)
console.log(birthYears - 10); //? OUTPUT -->  NaN

//! BASIC ARRAY METHODS (OPERATIONS)
const friends = ["Matt", "nick", "Kenny"];

//? ADD ELEMENTS
//! Appends new elements to the end of an array, and returns the new length of the array.
let newLength = friends.push("Adam");
console.log(friends); // [ 'Matt', 'nick', 'Kenny', 'Adam' ]
console.log(newLength); // 4

//! Inserts new elements at the start of an array, and returns the new length of the array.
newLength = friends.unshift("Cody");
console.log(friends); // [ 'Cody', 'Matt', 'nick', 'Kenny', 'Adam' ]
console.log(newLength); // 5



//? REMOVE ELEMENTS
//! Removes the last element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.
let popped = friends.pop();
console.log(friends); // [ 'Cody', 'Matt', 'nick', 'Kenny' ]
console.log(popped); // Adam

//! Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.
popped = friends.shift();
console.log(friends); // [ 'Matt', 'nick', 'Kenny' ]
console.log(popped); // Cody

//! Returns the index of the first occurrence of a value in an array, or -1 if it is not present.
friends[4] = 20;
console.log(friends.indexOf("Kenny")); // 2
console.log(friends.indexOf("jay")); // -1
console.log(friends.indexOf("Nick")); // -1
console.log(friends.indexOf("20")); // -1

//! Determines whether an array includes a certain element, returning true or false as appropriate. (strictly checks)
friends[4] = 20;
console.log(friends.includes("nick")); // true
console.log(friends.includes("jay")); // false
console.log(friends.includes("23")); // false


//! OBJECTS
const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  age: 2024 - 2003,
  job: "teacher",
  friends: ["Michael", "joe", "brian", "vader"],
};
console.log(jonas);

console.log(jonas.age);
//console.log(jonas[lastName]); //? ReferenceError: lastName is not defined
console.log(jonas["lastName"]);

const nameKey = "Name";
console.log("last" + nameKey);
console.log("first" + nameKey);
console.log(jonas["age12"]); //? OUTPUT --> undefined
//console.log(jonas.(age)); //? SyntaxError: Unexpected token '('

// const interestedIn = prompt(
  //   "What do you want to know about Jonas? Choose between firstName, lastName, age, job and friends. "
  // );
  
  // if (jonas[interestedIn] === undefined) {
    //   console.log("Please choose a valid option.");
    // } else {
      //   console.log(jonas[interestedIn]);
      // }
      
      //? adding new property to object
      jonas.location = "Thailand";
      jonas["twitter"] = "@jonas_twt";
      
      // challenge --> Jonas has 4 friends, and his best friend is Michael.
      console.log(
        `${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is ${jonas.friends[0]}.`
        );
        
*/

const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  birthYear: 2003,
  job: "teacher",
  friends: ["Michael", "joe", "brian", "vader"],
  hasDriversLicense: false,

  //! OBJECTS METHODS
  // calcAge: function (birthYear) {
  //   return 2024 - birthYear;
  // },

  // calcAge: function () {
  //   console.log(this);
  //   return 2024 - this.birthYear;
  // },

  calcAge: function () {
    this.age = 2024 - this.birthYear;
    return this.age;
  },

  getSummary: function () {
    const challengeString = `${
      this.firstName
    } is a ${this.calcAge()}-years old ${jonas.job}, and he`;

    const driversLicenseString = this.hasDriversLicense
      ? "has a driver's license"
      : "don't have a driving license.";

    return challengeString + " " + driversLicenseString;
  },
};

// console.log(jonas.calcAge(2003));
// console.log(jonas["calcAge"](jonas.birthYear));

console.log("Dot notation call:", jonas.calcAge());
console.log("Bracket notation call:", jonas["calcAge"]());

console.log("Age is", jonas.age);

// challenge --->  Jonas is a 21 old teacher, and he don't have a driving license.

console.log(jonas.getSummary());
