"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2023-12-23T07:42:02.383Z",
    "2023-11-18T21:31:17.178Z",
    "2024-01-28T09:15:04.904Z",
    "2023-05-08T14:11:59.604Z",
    "2023-04-25T23:36:17.929Z",
    "2024-04-24T17:01:17.194Z",
    "2024-04-26T10:51:36.790Z",
    new Date().toISOString(),
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2023-11-01T13:15:33.035Z",
    "2023-11-30T09:48:16.867Z",
    "2023-12-25T06:04:23.907Z",
    "2024-01-25T14:18:46.235Z",
    "2024-02-05T16:33:06.386Z",
    "2023-04-10T14:43:26.374Z",
    "2024-06-25T18:49:59.371Z",
    new Date().toISOString(),
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2020-12-23T07:42:02.383Z",
    "2021-01-28T09:15:04.904Z",
    "2021-04-01T10:17:24.185Z",
    "2023-05-08T14:11:59.604Z",
    "2024-05-27T17:01:17.194Z",
    "2023-07-11T23:36:17.929Z",
    "2024-07-12T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "de-DE",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2023-11-01T13:15:33.035Z",
    "2023-11-30T09:48:16.867Z",
    "2023-12-25T06:04:23.907Z",
    "2024-01-25T14:18:46.235Z",
    "2024-02-05T16:33:06.386Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account5 = {
  owner: "Samar Verma",
  movements: [-5, -1500, 5000, 2000],
  interestRate: 2,
  pin: 1234,
  movementsDates: [
    "2023-11-01T13:15:33.035Z",
    "2023-11-30T09:48:16.867Z",
    "2023-12-25T06:04:23.907Z",
    "2024-01-25T14:18:46.235Z",
  ],
  currency: "EUR",
  locale: "hi-IN",
};

const accounts = [account1, account2, account3, account4, account5];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*


//! ************************************************* NUMBERS *************************************************

// All the numbers are stored internally as a floating point numbers
// Numbers are stored in 64-bit base 2 format
// All the numbers are stored as binary numbers
// JS have some problems in storing precise value of numbers due to problems in storing as binary numbers (like decimal have with 10/3 = 3.33333...) //! READ ON IT
console.log(23 === 23.0);
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
console.log(Number("0.1") + Number("0.2"));

//? ************************** CONVERSION **************************
console.log("string");
console.log(Number("23"));

// Easier way to covert string to number
console.log(+"23"); //?   Type coercion going on

//? ************************** PARSING **************************

//?   parseInt(str, radix)  --> returns integer
// converts string to number
// if number is at beginning ignores whatever characters are after where numbers end
// if any other character is at beginning, parses it to NaN
// ignores anything even after "." (decimal point) as it treats it as character rather than decimal point
// also ignores the tabs, spaces and newline characters before the number in string
console.log(Number.parseInt("30")); //!   OUTPUT ---> 30
console.log(Number.parseInt("30px")); //!   OUTPUT ---> 30
console.log(Number.parseInt("e23")); //!   OUTPUT ---> NaN
console.log(Number.parseInt("287(9)jdnann4sngjnnsinguushin")); //!   OUTPUT ---> 289
console.log(Number.parseInt("]2874sngjnnsinguushin")); //!   OUTPUT ---> NaN
console.log(Number.parseInt("(8492)")); //!   OUTPUT ---> NaN
console.log(parseInt("-15", 10)); //!   OUTPUT ---> -15
console.log(Number.parseInt("738.89"));
console.log(Number.parseInt("  738.89  "));
console.log(Number.parseInt("  738.89  "));
console.log(Number.parseInt("  738  "));
console.log(Number.parseInt(" \n\t\n 738  "));
console.log(Number.parseInt(" 0xff"));

// radix specifies the base of number
// A value between 2 and 36 that specifies the base of the number in string. If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal. All other strings are considered decimal
console.log("\nbreaker");
console.log(Number.parseInt("  738  ", 10));
console.log(Number.parseInt("  738  ", 2));
console.log(Number.parseInt("  1000100  ", 2));
console.log(Number.parseInt("  100  ", 2)); //  can be used to convert numbers from other bases to decimals

//?   parseFloat(str)  --> Converts a string to a floating-point number.
// it does not treat decimal as another character, rest same as parseInt
console.log(Number.parseFloat("23.90rem"));
console.log(Number.parseFloat("   23.90rem"));
console.log(Number.parseFloat("  \n \t 23.90rem"));
console.log(Number.parseFloat("  .2390rem"));
console.log(Number.parseFloat("  \n \t 23...90rem"));
console.log(Number.parseFloat("  \njijij \t 23...90rem"));
console.log(Number.parseFloat("  314e-2"));
console.log(Number.parseFloat("  314E-2"));
console.log(Number.parseFloat("  314E+2"));
console.log(Number.parseFloat("  314e+2"));

console.log(parseInt("90")); // can work in global namespace but we usually use it in Number namespace anyways
console.log(parseFloat("90.8990"));

console.log(Number.parseInt === parseInt);
console.log(Number.parseFloat === parseFloat);

//* GOTO --> parse string ==> parseFloat
//* GOTO --> checking is a number? ==> isFINITE
//* GOTO --> if only integers ==> isInteger

console.log(
  "\n ************************** isNaN(val) / Number.isNaN(val) ************************** "
);
//*   returns false for number type that is NaN, no type coercion
console.log(Number.isNaN(12)); //!   OUTPUT ---> false
console.log(Number.isNaN("12")); //!   OUTPUT ---> false
console.log(Number.isNaN(+"12")); //!   OUTPUT ---> false
console.log("jojo first:", Number.isNaN("jojo")); //!   OUTPUT ---> false
console.log(Number.isNaN("jojo" / 89)); //!   OUTPUT ---> true

//? gives true for even infinite, which might be undesirable
console.log(Number.isNaN(23 / 0)); //!   OUTPUT ---> false

//?   unlike Number.isNaN, it does type coercion
console.log("jojo second:", isNaN("jojo")); //!   OUTPUT ---> true
console.log(isNaN(23 / 0));

console.log(
  "\n ************************** isFinite(val) / Number.isFinite(val) ************************** "
);
//*   returns false for infinity and NaN, no type coercion
console.log(Number.isFinite(12)); //!       OUTPUT ---> true
console.log(Number.isFinite("12")); //!       OUTPUT ---> false
console.log(Number.isFinite(+"12B")); //!       OUTPUT ---> false
console.log("probably NaN:", Number.isFinite("jojo" / 89)); //!       OUTPUT ---> false
console.log(Number.isFinite(23 / 0)); //!       OUTPUT ---> false

//?   unlike Number.isFinite, it does type coercion
console.log(isFinite("jojo")); //!       OUTPUT ---> false

console.log(
  "\n ************************** Number.isInteger(val) ************************** "
);
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0)); //?    true even for 23.0 because in JS, 23 === 23.0
console.log(Number.isInteger(23.0000000000000001));
console.log(Number.isInteger(23.0000000000000005));
console.log(Number.isInteger(23 / 0));
console.log(Number.isInteger("23"));
console.log(Number.isInteger(NaN));
console.log(Number.isInteger("23"));






//! ********************************************* MATH & ROUNDING *********************************************

console.log(
  "\n ************************** Fractional powers ************************** "
);
console.log(Math.sqrt(25));
console.log("Type coercion: ", Math.sqrt("25"));
console.log("Type coercion: ", Math.sqrt("lala"));
console.log("Type coercion: ", Math.sqrt("25px"));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 2)); //*   don't just return integer, but decimal answer
console.log(8 ** (1 / 3));

console.log(
  "\n ************************** Math.min(...num) && Math.min(...num) ************************** "
);
//* max & min, both does type coercion
//* if there is a single NaN, max, min returns NaN
console.log(Math.max(...[1, 2, 3, 5]));
console.log(Math.max(...[1, 2, 3, ,])); //!     OUTPUT ---> NaN [Number(undefined) === NaN]
console.log(Math.max(7, 18, 22, "34"));
console.log(Math.max(7, 18, 22, 34.9));
console.log(Math.max(7, 18, 22, "3px"));
console.log(Math.max(7, 18, 22, "3px", 90 / 0)); //!          OUTPUT ---> NaN      //*    no parsing
console.log(Math.max(7, 18, 22, 90 / 0)); //!          OUTPUT ---> Infinity

console.log(Math.min(7, 18, 22, 34)); //!          OUTPUT ---> 7
console.log(Math.min(7, 18, 22, "34")); //!          OUTPUT ---> 7
console.log(Math.min(7, 18, 22, -90 / 0, "90bbuuu")); //!          OUTPUT ---> NaN
console.log(Math.min(7, 18, 22, -90 / 0));

// ******************************************************
console.log();
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomInt(1, 6));
console.log(randomInt(3, 10));
console.log(randomInt(-10, -3));

//* Rounding decimals
console.log((23.4999).toFixed());
console.log((23.59992789748).toFixed(3));
console.log((23).toFixed(3));
console.log(typeof (23).toFixed(3));
console.log(+(23.978).toFixed(1));

//*   NUMERIC SEPARATORS
console.log(0o17_45_23);
console.log(271_873_913_746_874_138n);
console.log(typeof 9_000);
console.log(1_568_976.788_788_9);
console.log(0b0111_0101_0101_0111_1000);
console.log(0xa_6b_56_f4_09_cd);





//! ************************************************* BIG INT *************************************************
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MAX_VALUE);
console.log(Number.MAX_VALUE === Number.MAX_VALUE + Number.MAX_SAFE_INTEGER);
console.log(
  2 ** 53,
  2 ** 53 + 1,
  2 ** 53 + 2,
  2 ** 53 + 3,
  2 ** 53 + 4,
  2 ** 53 + 5
);

// console.log(7.89n);   //!  Throws error with decimal
console.log(38472186587342657806892506387658);
console.log(38472186587342657806892506387658n);
console.log(BigInt(38472186587342657806892506387658n));
console.log(BigInt(38472186587342657806892506387658)); //!   BigInt() constructor do not work as expected, because large numbers are assumed as "Number" types first (so they are approximated), do converting to big int do not give the exact number

console.log(
  "\n ************************** OPERATIONS ************************** "
);
console.log(10000n + 10000n);

console.log(10000n + " will it work?");
console.log(`Is ${672817817281782812382782846274672647n} still  viable?`);
//?   Can't mix BigInt with any other type in addition (not even Number, null, undefined or 0,
//?          except string concatenation)

// console.log(10000n + 10000);
// console.log(10000n % "10000");
// console.log(10000n + NaN);
// console.log(10000n + null);
// console.log(10000n + undefined);
// console.log(10000n + 0);
// console.log(10000n - 0);
// console.log(10000n / 10000);

// console.log(379218648767496178983719442791884n * 12);  //? Also, do not work with * or **
// console.log(379218648767496178983719442791884n ** 12);
console.log(379218648767496178983719442791884n * BigInt(12));

//?************   Exceptions for operators (comparison operators)
console.log(20n > 15);
console.log(20n >= 20); //!   OUTPUT ---> true
console.log(20n <= 20); //!   OUTPUT ---> true
console.log(20n == 20); //!   OUTPUT ---> true
console.log(20n === 20); //!   OUTPUT ---> false
console.log(20n > "19");

//?************   Division
console.log(10n / 3n); //!   OUTPUT ---> 3n (BigInt can't be decimal)
console.log(10 / 3); //!   OUTPUT ---> 3.3333333333333335






//! ********************************************** CREATING DATES **********************************************
const now = new Date();
console.log(now);

console.log(typeof now);

console.log(new Date("Dec 25 2020 22:40:08+08:30"));
console.log(new Date("Dec 25 2020 22:40:08.6789 GMT+0000")); // getting converted into IST in my browser

//*       passing string in date constructor
console.log(new Date("1 December 2025"));
console.log(new Date("1 December 2025 12:01:59"));
console.log(new Date("1 December 2025 23:01:59"));
console.log(new Date("1 juLY 3333 23:01:67"));
console.log(new Date("31 jun 2024 23:01:00"));
console.log(new Date("31 jun 2024 25:01:00"));
console.log(new Date("31 jun 2024 23:01"));
console.log(new Date("31 jun 2019"));
console.log(new Date("31 junelkhfdsh 2019"));
console.log(new Date("32 nov 2019"));

console.log(account1.movementsDates[0]);

console.log(new Date(account1.movementsDates[0]), account1.movementsDates[0]); // 2019-11-18T21:31:17.178Z

// for (const date of account1.movementsDates) {
//   console.log(`${new Date(date)} \n\n${date}`);
// }

//*       passing (YYYY, MM, DD, HH, minute, second) in date constructor
//?   JS auto corrects dates, months, hours,  minutes, seconds or years, if they are over the limit
console.log(new Date(2037, 10, 9, 19, 34, 29, 567));
console.log(new Date(2037, 10, 9, 19, 34, 97)); // seconds overboard
console.log(new Date(2037, 10, 9, 19, 79, 29)); // minutes overboard
console.log(new Date(2037, 10, 18, 33, 34, 29)); // hours overboard
console.log(new Date(2037, 10, 42, 9, 34, 29)); // date overboard
console.log(new Date(2037, 11, 42, 17, 34, 29)); // date overboard
console.log(new Date(2037, 24, 9, 19, 34, 29)); // months overboard

//*     passing micro seconds since the beginning of unix time (Jan 01, 1970), time passed since unix time is also known as time stamp
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // unix time + 3

//! Date format
console.log(new Date("2017-12"));
console.log(new Date("2017"));
console.log(new Date("2015-03-25T12:00:00-06:30"));
console.log(new Date("JANU, 25, 2019"));
console.log(new Date(99, 11, 24));
console.log(new Date(9, 11, 24));
console.log(new Date(100000000000));
console.log(new Date(-100000000000));




console.log(
  "************************** WORKING WITH DATES **************************"
);

const future = new Date("2037", 10, "19", "15", "23", "57", "189");
console.log(future);

console.log(typeof future.getFullYear()); //?   number
console.log(future.getFullYear());
console.log(future.getMonth()); //?  0-indexed, instead of 1
console.log(future.getDate());
console.log(future.getDay()); //?   day of the week (0-indexed)
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.getMilliseconds());
console.log(future.getTime() / (1000 * 60 * 60 * 24 * 365));

//?     ISO string is usually preferred to covert date from object to string
console.log(future.toISOString()); //!    OUTPUT ---> (2037-11-19T09:53:57.189Z)   gives string in international format
console.log(future.getTime()); //?   gives time stamp

// console.log(future.getTimezoneOffset());
// console.log(future.toUTCString());
// console.log(future.toDateString());
// console.log(future.toTimeString());
// console.log(future.toLocaleDateString());
// console.log(future.getUTCDay());
// console.log(future.toString());

console.log(Date.now()); //?   current time stamp

future.setFullYear(2040); //?    does type coercion
future.setMonth("13"); //?     also, auto corrects, like Date constructor
console.log(future);



  

//! ****************************************** OPERATIONS WITH DATES ******************************************

const future = new Date("2037", 10, "19");
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs(date1 - date2) / (24 * 60 * 60 * 1000));

console.log(calcDaysPassed(future, new Date()));
console.log(calcDaysPassed(new Date(2014, 10, 24), new Date(2014, 10, 14)));
console.log(
  calcDaysPassed(
    new Date(2014, 10, 24, 4, 56, 67, 200),
    new Date(2014, 10, 14, 23, 56, 67, 200)
  )
);

// dates when converted to number gives milliseconds
// no need to pass options object for just formatting date


*/

//! ***************************************** INTERNATIONALIZING DATES *****************************************
const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  // day: "numeric",,
  day: "2-digit",
  month: "long",
  year: "numeric",
  // weekday: "long",
  weekday: "short",
};

const locale = navigator.language;
console.log(locale);
console.log(new Intl.DateTimeFormat("hi-IN", options).format(now));
console.log(new Intl.DateTimeFormat("hi-IN").format(now));
console.log(new Intl.DateTimeFormat("en-US").format(now));
console.log(new Intl.DateTimeFormat(locale, options).format(now));

//! **************************************** INTERNATIONALIZING NUMBERS ****************************************
const num = 3716861.678;

const options2 = {
  style: "unit",
  unit: "mile-per-hour",
};

console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language).format(num)
);

console.log("US: ", new Intl.NumberFormat("en-US", options2).format(num));
console.log("INDIA: ", new Intl.NumberFormat("hi-IN", options2).format(num));
console.log("Germany: ", new Intl.NumberFormat("de-DE", options2).format(num));
console.log("Syria: ", new Intl.NumberFormat("ar-SY", options2).format(num));

const options3 = {
  style: "unit",
  unit: "celsius",
};

console.log("US: ", new Intl.NumberFormat("en-US", options3).format(num));
console.log("INDIA: ", new Intl.NumberFormat("hi-IN", options3).format(num));
console.log("Germany: ", new Intl.NumberFormat("de-DE", options3).format(num));
console.log("Syria: ", new Intl.NumberFormat("ar-SY", options3).format(num));

const options4 = {
  style: "percent",
  unit: "celsius",
};

console.log("US: ", new Intl.NumberFormat("en-US", options4).format(num));
console.log("INDIA: ", new Intl.NumberFormat("hi-IN", options4).format(num));
console.log("Germany: ", new Intl.NumberFormat("de-DE", options4).format(num));
console.log("Syria: ", new Intl.NumberFormat("ar-SY", options4).format(num));

const options5 = {
  style: "currency",
  unit: "celsius",
  currency: "EUR",
  useGrouping: false,
};

console.log("US: ", new Intl.NumberFormat("en-US", options5).format(num));
console.log("INDIA: ", new Intl.NumberFormat("hi-IN", options5).format(num));
console.log("Germany: ", new Intl.NumberFormat("de-DE", options5).format(num));
console.log("Syria: ", new Intl.NumberFormat("ar-SY", options5).format(num));

//! **************************************** TIMERS ****************************************

const ingredients = ["olives", "spinach"];

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);

if (ingredients.includes("spinach")) clearTimeout(pizzaTimer);

setInterval(
  () =>
    console.log(
      `${`${new Date().getHours()}`.padStart(
        2,
        0
      )}:${`${new Date().getMinutes()}`.padStart(
        2,
        0
      )}:${`${new Date().getSeconds()}`.padStart(2, 0)}`
    ),
  1000
);
