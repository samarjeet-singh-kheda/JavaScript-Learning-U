"use strict";

//////////? ********** SCOPING ********** /////////
/*

function testFunc() {
  let age = 31;

  if (age < 30) {
    // let firstName = "samar";
    var firstName = "samar";
  }

  console.log(firstName);
}

//testFunc(); //! OUTPUT --> undefined (if 'var')
//! OUTPUT --> error (if 'let' or 'const')

console.log(firstName); //! OUTPUT --> ReferenceError, because `var` is function scoped



function calcAge(birthYear) {
  const age = 2024 - birthYear;
  // console.log(firstName);

  function printAge() {
    const output = `${firstName}, you are ${age}, born in ${birthYear}.`;
    console.log(output);

    if (birthYear >= 1997 && birthYear <= 2012) {
      const firstName = "steven";
      var zoomer = true;
      const str = `You are a zoomer, ${firstName}`;
      console.log(str);
    }

    // console.log(str);
    console.log(zoomer);

    function add(a, b) {
      return a + b;
    }

    add(2, 3);
  }

  printAge();

  return age;
}

const firstName = "Samar";
console.log(calcAge(2003));
// console.log(add(2, 3)); //! ReferenceError: add is not defined (functions are block-scoped)



//////////? ********** HOISTING ********** /////////
function parentFunc() {
  var age = 21;

  console.log(age);

  if (age) {
    var age = 2003;

    console.log(age);
  }

  console.log(age);
}

var age = true;
console.log(age);

parentFunc();

var age = false;
console.log(age);

parentFunc();

 OUTPUT --> 
! true
! 21
! 2003
! 2003
! false
! 21
! 2003
! 2003


//? ********** HOISTING FOR VARIABLES **********

console.log(me); //! OUTPUT -->  undefined
console.log(age); //! OUTPUT -->   ReferenceError: Cannot access 'age' before initialization
console.log(job); //! OUTPUT -->   ReferenceError: Cannot access 'job' before initialization

var me = "Samar";
let age = 23;
const job = "programmer";


//? HOISTING FOR FUNCTIONS

// console.log(addDecl(2, 3)); //! OUTPUT --> 5
// console.log(addExpr(2, 3)); //! OUTPUT --> ReferenceError: Cannot access 'addArrow' before initialization
// console.log(addArrow(2, 3)); //! OUTPUT --> ReferenceError: Cannot access 'addArrow' before initialization

console.log(addExprVar, addArrowVar); //! OUTPUT --> undefined undefined
//? here, we are trying to do "undefined(2, 3)"
// console.log(addExprVar(2, 3)); //! OUTPUT --> TypeError: addExpr2 is not a function
// console.log(addArrowVar(2, 3)); //! OUTPUT --> TypeError: addExpr3 is not a function

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

var addExprVar = function (a, b) {
  return a + b;
};

var addArrowVar = (a, b) => a + b;

//? ********** Example **********
if (!numProducts) delShoppingCart(); // it gets called because numProducts is "undefined" because of hoisting

var numProducts = 10;

function delShoppingCart() {
  console.log("Your shopping cart is deleted");
}

//! WINDOW Example
var x = 1;
let y = 2;
const z = 3;

//! "var" creates property on window object
console.log(window.x); //? OUTPUT ---> 1
console.log(window.y); //? OUTPUT ---> undefined
console.log(window.z); //? OUTPUT ---> undefined




//????????? ********** "this" KEYWORD ********** ?????????//
console.log(this); //! OUTPUT ---> Global (window) Object

const calcAge = function (birthYear) {
  console.log(2024 - birthYear);
  console.log(this); //! OUTPUT ---> undefined
};
calcAge(2003); // 21

const calcAgeArrow = (birthYear) => {
  console.log(2049 - birthYear);
  console.log(this); //! OUTPUT ---> Global (window) Object
  //! borrowed from it's parent execution context (lexical "this")
};
calcAgeArrow(2003); // 46

const samar = {
  birthYear: 2003,
  firstName: "samar",
  calcAge: function () {
    console.log(this);
    console.log(2024 - this.birthYear);
  },
};
samar.calcAge(); //! OUTPUT ---> SAMAR Object, 21

const sarah = {
  birthYear: 2002,
  firstName: "sarah",
};
sarah.calcAge = samar.calcAge; //? METHOD BORROWING
sarah.calcAge(); //! OUTPUT ---> SARAH Object, 22

const f = sarah.calcAge;
f(); //! OUTPUT ---> undefined,
// Uncaught TypeError: Cannot read properties of undefined (reading 'birthYear')

// var firstName = "Maria"; //? 'declaration' messes up jonas.greet() call

//? ********** in object literal, everything is in global scope **********
const jonas = {
  firstName: "jonas",
  year: 2003,
  calcAge: function () {
    console.log(this);
    console.log(2024 - this.year);

    //? METHOD 1
    //! regular functions "this" keyword is "undefined" in methods, that's why "self" variable is declared to give function access to "this" keyword of parent function
    // const self = this;
    // const isZoomer = function () {
    //   // console.log(this);
    //   // console.log(this.year >= 1997 && this.year <= 2012);

    //   console.log(self);
    //   console.log(self.year >= 1997 && self.year <= 2012);
    // };

    //? METHOD 2
    //! from ES6 "arrow functions" are used because they do not have their own keywords but inherits it from it's parent
    const isZoomer = () => {
      console.log(this);
      console.log(this.year >= 1997 && this.year <= 2012);
    };

    isZoomer();
  },
  greet: () => {
    //? takes 'this' from global execution context (window)
    console.log(this);
    console.log(`Hey, ${this.firstName}!`);
  },
};
// var firstName = "Maria";
jonas.greet();

jonas.calcAge();

//! ************ ARGUMENT KEYWORD ************
const addDecl = function (a, b) {
  console.log(arguments);
  console.table(arguments);
  return a + b;
};
addDecl(2, 3);
addDecl(2, 3, 5, 8);

const addArrow = (a, b) => {
  console.log("Arrow Functions:", arguments); //! referenceError (because arrow functions do not have it's own argument object)
  return a + b;
};
addArrow(2, 3);
addArrow(2, 3, 4, 5, 6, 7);






//! ************ PRIMITIVE TYPES v.s. OBJECTS ************

let age = 30;
let oldAge = age;
age = 31;

console.log("Age:", age); //! OUTPUT --->  30
console.log("Old age:", oldAge); //! OUTPUT --->  31

const jonas = {
  firstName: "jonas",
};
const matilda = jonas;
matilda.firstName = "matilda";

//? Both are same for some reason
console.log(jonas); //! OUTPUT --->  { firstName: 'matilda' }
console.log(matilda); //! OUTPUT --->  { firstName: 'matilda' }




*/
//? ************ PRIMITIVE TYPES ************
let lastName = "Williams";
let oldLastName = lastName;
lastName = "Davis";
console.log(lastName, oldLastName); //! OUTPUT ---> "Davis Williams"

//? ************ REFERENCE TYPES ************
const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = "Davis";

//todo //////// AGAIN SAME
console.log("Before marriage:", jessica); //! OUTPUT --->  Before marriage: { firstName: 'Jessica', lastName: 'Davis', age: 27 }
console.log("After marriage:", marriedJessica); //! OUTPUT --->  After marriage: { firstName: 'Jessica', lastName: 'Davis', age: 27 }

//? *************************** COPYING OBJECT ***************************

const jessica2 = {
  firstName: "Jessica2",
  lastName: "Williams",
  age: 27,
  family: ["member1", "member2", "member3"],
};
jessica2.family.push("member4");

//? Copy the values of all of the enumerable own properties from one or more source objects to a target object. Returns the target object.
//?  Only creates a shallow copy, not a deep one

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = "Davis";
jessicaCopy.family.push("New member 1");
jessicaCopy.family.push("New member 2");

console.log("Before marriage:", jessica2);
//! OUTPUT ---> Before marriage: {
//!   firstName: 'Jessica2',
//!   lastName: 'Williams',
//!   age: 27,
//!   family: [ 'member1', 'member2', 'member3', 'New member 1', 'New member 2' ]
//! }

console.log("After marriage:", jessicaCopy);
//! After marriage: {
//!   firstName: 'Jessica2',
//!   lastName: 'Davis',
//!   age: 27,
//!   family: [ 'member1', 'member2', 'member3', 'New member 1', 'New member 2' ]
//! }

console.log(Object.assign(jessicaCopy, jessica));
