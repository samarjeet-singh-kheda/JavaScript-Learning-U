/*let js = "amazing";
console.log(40 + 8 + 23 - 10);

let firstName = "Bablu";

console.log(firstName);
// console.log(firstName);
console.log(firstName);
// console.log(firstName);

let yaer$yy889 = "Papu";
console.log(yaer$yy889);

let $function = "4355"; // '_' & '$' are allowed

let name="jonas" //name is kinda reserved

alert("raju");
let PI = 3.1415; //all caps, for constants
let Joji; //first letter capital, for OOP

let firstJob='singer' //more descriptive, cleaner code
let secondJob='plunmber'

let job1='singer'
let job2='plumber'

////////////////////////////////////////////////////////////////////////////////
let dudu = true;
console.log(dudu);
console.log(typeof dudu);

dudu = "bird";
console.log(dudu);
console.log(typeof dudu);

let year;
console.log(year); //both value & type is undefined
console.log(typeof year);

year = 1991;
console.log(year);
console.log(typeof year); //number, not int or float

let j = null;
console.log(j); //value-> null
console.log(typeof j); //type-> object, it's a error, didn't fix for legacy lesson


let age = 30;
age = 31;

const birthYear = 1991;
// birthYear = 1995;    error for assigning to const

// const temp;
// temp=true;

var hobby = "teach";
hobby = "study";

lastName = "bond";
console.log(lastName);


// MATH OPERATOR
const now = 2037;
const ageSamar = now - 2003;
console.log(ageSamar, ageSamar * 2, ageSamar / 2);

console.log(2 ** 3); //exponentiation operator, 2 power 3 = 2* 2* 2

const firstName = "Jonas";
const lastName = "Bond";
console.log(firstName + "        " + lastName); //concatenation of string

//Assignment operator
let x = 10 + 5;
x += 10; //x=x+10 = 25
x *= 10; //x=x*10 = 250
x++; //x=x+1
x--; //x=x-1
console.log(x);

//Comparison operator (<, >, >=, <=, !=)
console.log(ageSamar != 18);
const isMinor = ageSamar <= 17;
console.log(isMinor);

console.log(now - 2003 < now - 1990);

x = y = 10 / 2 + 20 * 8; // "=" works from right-to-left
console.log(x, y); //165, 165


//TEMPLATE LITERALS & STRINGS
const myName = "Samar";
const birthYear = 2003;
const currentYear = 2037;
const job = "developer";

let intro =
"I'm " + myName + ", a " + (currentYear - birthYear) + " old " + job + "!";
console.log(intro);
//number is coerced to string

intro = `I'm ${myName}, a ${currentYear - birthYear} old ${job}!`; //template literal, helps with spaces

console.log(intro); //even browser console has all the variable info

console.log(`This is a string....\n`); //similar to normal

console.log( //old way
"String with \n\
multiple \n\
lines.\n"
);

//ES-6 way
console.log(`Another string with 
multiple
lines.\n`);

//if-else conditional
const age = -200;

if (age >= 18) {
    console.log(`Congrats! You're allowed to take the exam!`);
} else {
    console.log(`${18 - age} years are left to take the exam.`);
}

//TYPE CONVERSION, when we convert
const inputYear = "1991";
console.log(Number(inputYear), inputYear);
console.log(inputYear + 18, Number(inputYear) + 18);

console.log(Number("Samar")); //OUTPUT-> NaN, which is used for invalid numbers
console.log(typeof NaN); //OUTPUT-> number, since NaN is a invalid number

console.log(String(23), 23);

console.log(typeof typeof undefined);

//TYPE COERCION, when JS convert
console.log("I am " + 23 + " year old"); // '+' coerced number to string
console.log("23" - "10" - 3); // '-' coerced string to number
console.log("23" / "2"); //coerced both strings to number
console.log("23" * "2"); //coerced both dtrings to number
console.log("23" * 3); //OUTPUT-> 69(number), NOT '23232323' (string)
console.log("dudu" * 5); //OUTPUT -> NaN, invalid number

let n = "1" + 1; //'11'
n--; //10
n = n - 1; //10
console.log(n);

console.log(2 + 3 + 4 + "5"); // 9 + '5'
console.log("10" - "3" - "4" - 2 + "5"); // 3 - 2 + '5' = 1 + '5' = 15

console.log(Number("")); //OUTPUT-> 0 , empty string
console.log(Number("  ")); //OUTPUT-> 0

console.log(0 / 0); //OUTPUT -> NaN
console.log(9 / 0); //OUTPUT -> Infinity
console.log(-9 / 0); //OUTPUT -> -Infinity
console.log(typeof -Infinity); //OUTPUT -> number
console.log(typeof typeof 0); //OUTPUT -> string


//only 5 falsy values: 0, ''(empty string), undefined, NaN, null

console.log(Boolean(0));
console.log(Boolean("")); //empty
console.log(Boolean("   ")); //not empty
console.log(Boolean("Jonas"));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean(NaN));
console.log(Boolean({})); //object
//values are coerced to boolean in conditional statements, loops & logical operators

let height;  //can be used to check if a variable is initialised, unless it isa falsy value like 0
if (height) {
  console.log("YAY! Height is defined.");
} else {
  console.log("Define the height, please :) ");
}

//EQUALITY OPERATOR, "==, !=" (loose), "===, !==" (strict)
//===, !== don't do type coercion, while ==, != does.
const age = 18;
if (age === 18) console.log(`You have just become an addult (strict)`);

if (age == 18) console.log(`You have just become an addult (loose)`);

const fav = prompt("What is your favourite number?"); //function for pop up input from user
console.log(fav);
console.log(typeof fav); //user input is always string

if (Number(fav) !== 23) console.log("You are so wrong!");
//loose equality operator must be avoided  & manual type conversion should be used if required along with strict operators
*/

//BOOLEAN LOGIC - A branch of comp sci which uses true & false values to solve complex logical problems
//BOOLEAN OPERATORS to combine true & false values
