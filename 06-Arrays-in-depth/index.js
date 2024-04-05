//  FIND, FIND INDEX

"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*




//!  ********************************************** ARRAY METHODS **********************************************
const arr = ["a", "b", "c", "d", "e"];

//? *******************   arr.slice(s, e)   *******************
// doesn't mutate the original array
// -ve indices can be used
console.log(arr.slice(1, 4));
console.log(arr.slice(2));
console.log(arr.slice(-2));
console.log(arr.slice(1, -1));
console.log(arr.slice(-4, -1));
console.log(arr.slice(-1)); //?  trick to get last element of an array
//!     two ways of making shallow copies of an array
console.log(arr.slice()); //?     shallow copy of array
console.log([...arr]);

//? *******************   arr.splice(start, deleteLength)   *******************
// mutates the original array and returns the extracted part
// -ve indices can be used
console.log(
  "******************************** SPLICE ********************************"
);
console.log(arr.splice(-1)); //?   can be used to delete the last element form an array
console.log(arr);
console.log(arr.splice(0, 2));
console.log(arr);
console.log(arr.splice(1, 2));
console.log(arr);

//? *******************   arr.reverse()   *******************
//  Reverses the elements in an array in place. This method mutates the array and returns a reference to the same array.

const arr1 = ["a", "b", "c", "d", "e", "f", "g"];
console.log(arr1.reverse());
console.log(arr1);
console.log(arr1.reverse());

//? *******************   arr.concat(arr2) OR arr.concat(a1, a2, a3)   *******************
// do not modify the original array, just returns a new one
// parameters can be an array or list of elements
const arr3 = ["h", "i", "j", "k", "l", "m", "n"];
console.log(arr1.concat(arr3));
console.log(arr1.concat("x", "y", "z"));

console.log([...arr1, ...arr3]); //?   other way

//? *******************   arr.join(sep)   *******************
console.log(arr3.join("?"));
console.log(arr3.join());
console.log(arr3.join(", "));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ************************************************ AT METHOD ************************************************

//? *******************   arr.at(idx)   *******************
const arr2 = [23, 11, 65];
console.log(arr2[0]);
console.log(arr2.at(0));
console.log(arr2.at(-6));
console.log(arr2.at(6));
console.log(arr2[9]);

//!   ways to access the last element of an array
console.log(arr2[arr2.length - 1]);
console.log(arr2.slice(-1)[0]);
console.log(arr2.at(-1)); //?   in this case, it is very useful. Can also be used in method chaining instead of bracket notation

console.log("Samarjeet".at(-1)); //?   also works on strings

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ************************************************ FOR EACH ************************************************

  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [idx, movement] of movements.entries()) {
  if (movement >= 200) {
    continue;
  }

  movement < 0
    ? console.log(`Movement ${idx}: $${Math.abs(movement)} withdrawn`)
    : console.log(`Movement ${idx}: $${movement} deposited`);
}

console.log(
  " *********************************** FOR EACH *********************************** "
);
//?   runs for every element of array, can't use break or continue in it (otherwise it is same as the for loop)

movements.forEach(function (movement, idx, arr) {
  //?     these 3 are parameters passed to the callback

  if (movement >= 200) {
    // break;   //!   SyntaxError: Illegal break statement
  }
  movement < 0
    ? console.log(`Movement ${idx}: $${Math.abs(movement)} withdrawn`)
    : console.log(`Movement ${idx}: $${movement} deposited`);

  console.log("Array is", arr);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ***************************************** FOR EACH (Maps & Sets) ******************************************

//?   MAP
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach((value, key, map) => {
  console.log(`${value}: ${key}`);
  console.log("Map", map);
});

//?   SET
const currenciesUnique = new Set([
  ...currencies.keys(),
  "USD",
  "INR",
  "JPY",
  "GBP",
  "",
]);
console.log(currenciesUnique);

//?  sets do not have index or keys, so value & value2 parameters have same values here (it is done, so as to not break the uniformity of forEach syntax in sets)
currenciesUnique.forEach((value, value2, set) => {
  console.log(value);
  console.log(value2);
  console.log(set);
});

currenciesUnique.forEach((value, _, set) => {
  console.log(value);
  console.log(_);
  console.log(set);
});

//! ******************************************* MAP, FILTER, REDUCE ********************************************
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd = 1.1;

//?    MAP, FILTER returns an array, while REDUCE returns a value
console.log(movements.map((mov) => Math.trunc(mov * euroToUsd)));

const movementsUSD = [];
for (let mov of movements) {
  movementsUSD.push(mov * euroToUsd);
}
console.log(movementsUSD);

//?   forEach produces side effects, but .map() does not (foreach just do some work, without returning anything a.k.a. produce side effect)
const movementsDescription = movements.map(
  (mov, idx) =>
    `Movement ${idx + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescription);

//?   FILTER returns the element, if condition is true (depends on boolean)
const deposits = movements.filter((mov) => mov > 0);

console.log(deposits);

const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) depositsFor.push(mov);
}
console.log(depositsFor);

const withdrawals = movements
  .filter((mov) => mov < 0)
  .map((withdrawal) => Math.abs(withdrawal));
console.log(withdrawals);

console.log(movements);
const totalBalance = movements.reduce((acc, curr, idx) => {
  console.log(acc, curr, idx);
  return acc + curr;
}, 0);
console.log(totalBalance);

let totalBalance2 = 0;
for (const mov of movements) totalBalance2 += mov;
console.log(totalBalance2);

//!   Find maximum movement
const maxMovement = movements.reduce(
  (acc, curr) => (acc > curr ? acc : curr),
  movements[0]
);
console.log(maxMovement);

const totalDepositInUSD = movements
  .filter((mov) => mov > 0)
  .map((deposit) => deposit * euroToUsd)
  .reduce((total, deposit) => total + deposit, 0);

console.log(totalDepositInUSD);

//!  ************************************************** FIND ***************************************************
const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find((account) => account.username === "jd");
console.log(account);

let account123;
for (const account of accounts)
  if (account.owner === "Jessica Davis") account123 = account;

console.log(account123);




//!  ******************************************* SOME, EVERY METHOD *******************************************

console.log(movements.includes(1300)); //? only checks for equality

console.log(movements.some((mov, idx) => mov > 1000)); //? can check for any condition

console.log([10, 20, 30, 80].every((mov) => mov > 0));

const deposit = (mov) => mov > 0; //  separate callback func.
console.log(movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit));

//!  ********************************************** FLAT, FLATMAP **********************************************
console.log(movements.flat());

const movements2 = [[1, 2, 3], [4, 5, [-9, -8, -7, [11, 22, 33]], 6], 7, 8];
console.log(movements2.flat());
console.log(movements2.flat(2));

// console.log(movements2.flatMap((mov) => mov * 2));
// console.log([[1, 2, 3], [-1, -2, -3], [11, 22, 33]].map((mov) => mov * 2).flat());
// console.log([[1, 2, 3], [-1, -2, -3], [11, 22, 33]].flatMap((mov) => mov * 2));

const overallBalance = accounts
  .map((account) => account.movements)
  .flat()
  .reduce((accumulator, currMov) => accumulator + currMov, 0);
console.log(overallBalance);

const overallBalance2 = accounts
  .flatMap((account) => account.movements)
  .reduce((accumulator, currMov) => accumulator + currMov, 0);
console.log(overallBalance2);
//?   flapMap have better performance than ".map() followed by .flat()"
//?   could be used in case we are creating an array of arrays which immediately needs to be flattened
//?   flatMap() only flattens till the depth of "1", if we need more than that, then flatMap shan't be used



//!  ************************************************* SORTING *************************************************
// STRINGS
const owners = ["jonas", "Zach", "Martha", "Adam"];
console.log(owners.sort()); //  mutates the original array
console.log(owners);

// NUMBERS
console.log(movements); //  sorts in ascending order, based on the ASCII value
console.log(movements.sort()); //?  OUTPUT --> [ -130, -400, -650, 1300, 200, 3000, 450, 70]

const arrT = [12, 90, -74, -83, 0, 37, 2, 78];

 *?  returns < 0 -->   A, B (keep order)
 *?  returns > 0 -->   B, A (switch order)
 
console.log(arrT.sort((a, b) => a - b));
console.log(arrT.sort((a, b) => b - a));

// ASCENDING ORDER
arrT.sort(function (a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
});
console.log(arrT);

// DESCENDING ORDER
arrT.sort(function (a, b) {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else {
    return 0;
  }
});
console.log(arrT);




//!  **************************************** CREATING n FILLING ARRAY ****************************************
//*   traditional ways of creating an array
console.log([1, 2, 4, 5, 6, 8]);

const arr = new Array(1, 2, 4, 6, 7, 9);
console.log(arr);

const arr2 = new Array(4, 5, 6);
console.log(arr2);

//* *******************   Empty array & arr.fill(val, s, e)   *******************
const x = new Array(7);
console.log(x); //!   OUTPUT --->   [ <7 empty items> ] {*** in every case, no method can be used on this array except ".fill()" ***}

console.log(x.map(() => 7)); //!   OUTPUT --->   [ <7 empty items> ]
console.log(x.map((ele) => ele + 7)); //!   OUTPUT --->   [ <7 empty items> ]
console.log(x.map((ele) => ele / 0)); //!  OUTPUT --->   [ <7 empty items> ]

console.log(x.fill());
console.log(x.map((ele) => ele * 90));
console.log(x.fill(3, 2, 5));
console.log(x.map((ele) => ele * 90));
console.log(x.fill(3, 1));
console.log(x.fill(78));

//? *******************   Array.from(iterableObj, mapFunc)   *******************
const y = Array.from({ length: 7 }, () => 1); //!  OUTPUT --->   [1, 1, 1, 1, 1, 1, 1];
console.log(y);

const obj1 = { length: 8, i: 0 };
const y2 = Array.from(obj1, () => obj1.i++);
console.log(y2);

const z = Array.from({ length: 10 }, (_, i) => i + 1); //!  OUTPUT --->   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(z);

console.log(
  Array.from({ length: 100 }, () => Math.trunc(Math.random() * 6) + 1) //?  Array with 100 random dice rolls
);

//!!!!!!!!!!!!! ONLY WORKS IN BANKIST FILE
//*   it is used to convert an iterable in an array, like nodelist, so that array properties like ".map()" can be applied to them

// console.log(document.querySelectorAll(".movements__value"));

// btnLogin.addEventListener("click", function () {
//   const mov = Array.from(
//     document.querySelectorAll(".movements__value"),
//     (ele) => Number(ele.textContent.slice(0, -1))
//   );
//   console.log(mov);
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

*/

//! ********************************************* ARRAY EXERCISES **********************************************
//  1)
const totalDepositSum = accounts
  .flatMap((account) => account.movements)
  // .filter((movement) => movement > 0)
  // .reduce((accumulator, currDeposit) => accumulator + currDeposit, 0);
  .reduce(
    (accumulator, movement) =>
      movement > 0 ? accumulator + movement : accumulator,
    0
  );

console.log(totalDepositSum);

//  2)
const numDepositGreater100 = accounts
  .flatMap((account) => account.movements)
  // .filter((mov) => mov >= 1000).length;
  .reduce((count, movement) => (movement >= 1000 ? ++count : count), 0);

console.log(numDepositGreater100);

//  3)
const { totalDeposit, totalWithdrawal } = accounts
  .flatMap((account) => account.movements)
  .reduce(
    (sums, movement) => {
      // movement > 0   ? (sums.totalDeposit += movement) : (sums.totalWithdrawal += movement);

      sums[movement > 0 ? "totalDeposit" : "totalWithdrawal"] += movement;

      return sums;
    },
    { totalDeposit: 0, totalWithdrawal: 0 }
  );

console.log(totalDeposit, totalWithdrawal);

//  4)
const titleCaseConvertor = function (sentence, exceptions) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  const words = sentence
    .toLowerCase()
    .split(" ")
    .map((word) => word.trim())
    .filter((word) => word !== "");

  const exceptionWords = !exceptions
    ? ["a", "an", "the", "but", "for", "in", "with", "or", "is"]
    : exceptions
        .toLowerCase()
        .split(" ")
        .map((word) => word.trim())
        .filter((word) => word !== "");

  const ans = words.reduce(
    (retStr, word) =>
      exceptionWords.includes(word)
        ? retStr + " " + word
        : retStr + " " + capitalize(word),
    ""
  );

  return capitalize(ans).slice(1);
};

console.log(
  titleCaseConvertor(
    "THis          iS         a            nICe          titLe",
    "IS         a"
  )
);

console.log(
  titleCaseConvertor(
    "\t \t A maN \n\n\tand\n\n\t A DOGG",
    "\t \tIS  \n    and  \n\n\t    a"
  )
);

console.log(titleCaseConvertor(" It is an ANOTHER EXAMPLE"));
