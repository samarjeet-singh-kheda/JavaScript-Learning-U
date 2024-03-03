"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BANKIST APP

// Data
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

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movementsArr) {
  containerMovements.innerHTML = "";

  movementsArr.forEach(function (mov, i) {
    const transactionType = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${transactionType}">${
      i + 1
    } ${transactionType.toUpperCase()}</div>
        <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
    // containerMovements.insertAdjacentHTML("beforeend", html);
  });
};

displayMovements(account1.movements);

const calcDisplayTotalBalance = function (movements) {
  const totalBalance = movements.reduce((acc, currMov) => acc + currMov, 0);

  labelBalance.textContent = `${totalBalance}€`;
};
calcDisplayTotalBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const totalDeposit = movements
    .filter((mov) => mov > 0)
    .reduce((totalDeposit, currDeposit) => totalDeposit + currDeposit, 0);
  labelSumIn.textContent = `${totalDeposit}€`;

  const totalWithdrawal = movements
    .filter((mov) => mov < 0)
    .reduce(
      (totalWithdrawal, currWithdrawal) => totalWithdrawal + currWithdrawal,
      0
    );
  labelSumOut.textContent = `${Math.abs(totalWithdrawal)}€`;

  const interest = movements
    .map((mov) => mov > 0 && mov * (1.2 / 100))
    .filter((interest) => interest >= 1)
    .reduce((acc, mov, idx, arr) => {
      console.log(arr);
      return acc + mov;
    }, 0);
  labelSumInterest.textContent = `${interest}€`;
};
calcDisplaySummary(account1.movements);

const createUserNames = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUserNames(accounts);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//! LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

*/

//!  ****************************************** MAP, FILTER, REDUCE *******************************************
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
  .map((withdrawl) => Math.abs(withdrawl));
console.log(withdrawals);

console.log(movements);
const totalBalance = movements.reduce((acc, curr, idx) => {
  console.log(acc, curr, idx);
  return acc + curr;
}, 0);
//!!!!!!!!!!! ******* NOTE *******
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
