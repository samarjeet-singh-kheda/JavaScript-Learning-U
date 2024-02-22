"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ******************************************* DEFAULT PARAMETERS *******************************************
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
  //?     it is the only way to use parameters before it, so order matters here
) {
  //
  //?     old ES-5 way
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  bookings.push(booking);
};

createBooking("A123"); //!     OUTPUT --->      { flightNum: 'A123', numPassengers: 1, price: 199 },
createBooking("AV12", 67, 80000); //!     OUTPUT --->   { flightNum: 'AV12', numPassengers: 67, price: 80000 },
createBooking("A123", 3); //!     OUTPUT --->    { flightNum: 'A123', numPassengers: 3, price: 597 },

//?     using undefined is the only way to skip an argument so that, it can be assigned the default value
createBooking("A123", undefined, 6); //!     OUTPUT --->    { flightNum: 'A123', numPassengers: 1, price: 6 },

//?     unlike undefined, using "null" do not skip the argument, it just assigns the null value to the parameter
createBooking("A123", null, 6); //!     OUTPUT --->     { flightNum: 'A123', numPassengers: 1, price: 6 }

console.log(bookings);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  **************************** HOW PASSING ARGUMENTS WORK?: VALUE v.s. REFERENCE ****************************
const flight = "LH234";
const samar = {
  name: "Samar Singh",
  passport: 192837465,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH499";
  passenger.name = "Mr." + " " + passenger.name;

  if (passenger.passport === 192837465) {
    console.log("Checked in");
  } else {
    console.log("Wrong passport");
  }
};

checkIn(flight, samar);
console.log({ ...samar });
console.log(flight);

//?     Same as doing
const flightNum = flight;
const passenger = samar;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(samar);
checkIn(flight, samar);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ************************************** FUNCTIONS ACCEPTING CALLBACKS **************************************
const oneWord = function (str) {
  return str.replaceAll(" ", "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

//?   Higher Order Function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer("JavasCript is A very nIce lanGUage!", oneWord);
transformer("JavasCript is A very nIce lanGUage!", upperFirstWord);

//!   EXAMPLES
const high5 = function () {
  console.log("HIGH FIVE");
};

document.body.addEventListener("click", high5);

const names = ["samar", "sarah", "adam"];
names.forEach((str) => console.log(str.toUpperCase()));
console.log(names);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ************************************** FUNCTIONS RETURNING FUNCTIONS **************************************
const greet = (greetings) => (name) => console.log(`${greetings}, ${name}!`);

const greet2 = function (greetings) {
  //?   rewrite of above function as function expressions
  return function (name) {
    console.log(`${greetings}, ${name}!`);
  };
};

const greet3 = function (greetings) {
  return function (firstName) {
    return function (lastName) {
      console.log(`${greetings}, ${firstName} ${lastName}!`);
    };
  };
};

const greeterHey = greet("Hey");
greeterHey("Samar");
greeterHey("Sarah");

greet("Hello")("Max");
greet2("Hello")("Greet2");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ****************************************** CALL & APPLY METHODS ******************************************

const lufthansa = {
  airline: "lufthansa",
  iataCode: "LH",
  bookings: [],

  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}.`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(1234, "Samar");
lufthansa.book(359, "Mike Smith");
console.log(lufthansa.bookings);

const eurowings = {
  airline: "eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;
//?      book(23, "Sarah Davis");  // DOESN'T WORK ----->  "as 'this' keyword here is undefined because it is just a regular func call"

//!   CALL METHOD     (allows to manually set the "this" keyword)
book.call(lufthansa, 23, "Sarah Davis");
book.call(eurowings, 239, "Mary Cooper");

const swiss = {
  airline: "Swiss Air line",
  iataCode: "LX",
  bookings: [],
};

lufthansa.book.call(swiss, 467, "Brad Pitt");

//!   APPLY METHOD        (same as call, just take arguments as an array, instead of individual values)
const bookingData = [299, "Randy Savage"];

lufthansa.book.apply(swiss, bookingData);
console.log(swiss.bookings);

lufthansa.book.call(swiss, ...bookingData); //?     (in modern JS, spread operator can be used on array, instead of "apply" method)
console.log(swiss.bookings);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  *********************************************** BIND METHOD ***********************************************
const bookEW = book.bind(eurowings);
bookEW(23, "Steven Williams");

const bookLX = lufthansa.book.bind(swiss, 90, "No name");
bookLX();
bookLX(99, "Mercedes Mone");

lufthansa.book.bind(lufthansa, 123, "Lala")();

//?   in bind method, once arguments are passed, then they are set in stone and can't be overwritten
const bookEW23 = book.bind(eurowings, 23);
//?   Passing part of arguments beforehand, it is called ** partial application **
bookEW23("Jonas Smith");
bookEW23("Brandy Cooper");

//!   Example with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(`Number of planes is ${this.planes} now.`);
};

// document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);
//?    OUTPUT ----> "this" is " <button class="buy">Buy new plane 🛩</button> "   (because in event handlers "this" is DOM element that it is attached to)

document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);
//?   "bind" is used so that event handler "this" is not DOM element and lufthansa as it was intended to

//!   PARTIAL APPLICATION
const addTax = (rate, value) => value + rate * value;
console.log(addTax(0.1, 200));

const addTaxVAT = addTax.bind(null, 0.23); //?    used "null" because we don't care about "this" keyword here, we're only interested in partial application
console.log(addTaxVAT(100));

//!   Mini-challenge of rewriting
const addTaxRate = function (rate) {
  return function (value) {
    return value + rate * value;
  };
};

const addTaxVAT2 = addTaxRate(0.23);
console.log(addTaxVAT2(100));
console.log(addTaxVAT2(200));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ********************************** IMMEDIATELY INVOKED FUNCTIONS (IIFE) **********************************

//?   Creates scope and helps in data encapsulation
//?   () around function statement helps in tricking js in thinking that it is actually an expression, instead of a statement
(function () {
  console.log(`This will run only once.`);

  const isPrivate = 23;
  console.log(isPrivate);
})();

// console.log(isPrivate);  //?    ReferenceError: not defined

(() => console.log(`This too will also run once.`))();

{
  const isPrivate = 20;

  var temp = 90;
}

//?   In modern JS, blocks can simply be used to encapsulate data, so IIFE is not required for that unless we're using "var" (which we never do)

// console.log(isPrivate);  //?    ReferenceError: not defined

const counterInc = (function () {
  let counter = 0;

  return function () {
    console.log(++counter);
  };
})();

counterInc();
counterInc();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ************************************************* CLOSURE *************************************************
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;

    console.log(`${passengerCount} passengers.`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

//!   EXAMPLE --- 01

let f;

const g = function () {
  const a = 23;

  f = function () {
    console.log(a * 2);
  };
};

g();
f();
console.dir(f); //?    used to view closure and scopes

const h = function () {
  const b = 7;

  f = function () {
    console.log(b * 2);
  };
};

h();
f();
console.dir(f);

//!   EXAMPLE --- 02

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);

    console.log(`There are 3 groups with ${perGroup} passengers.`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds.`);
};

boardPassengers(180, 3);
