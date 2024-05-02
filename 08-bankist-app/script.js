"use strict";

//! *************************************************** Data ***************************************************

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
  currency: "INR",
  locale: "hi-IN",
};

const accounts = [account1, account2, account3, account4, account5];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//! ************************************************* Elements *************************************************
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//! ************************************************ FUNCTIONS ************************************************

const formatMovements = function (movDate, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (24 * 60 * 60 * 1000));

  const daysPassed = calcDaysPassed(movDate, new Date());

  if (daysPassed === 0) return "Today";
  else if (daysPassed === 1) return "Yesterday";
  else if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${movDate.getDate()}`.padStart(2, 0);
    // const month = `${movDate.getMonth() + 1}`.padStart(2, 0);
    // const year = `${movDate.getFullYear()}`.padStart(2, 0);

    // return `${day}/${month}/${year}`;

    return new Intl.DateTimeFormat(locale).format(movDate);
  }
};

const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value.toFixed(2));
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = "";

  const movementArr = sort
    ? account.movements.slice().sort()
    : account.movements;

  movementArr?.forEach(function (mov, idx) {
    const transactionType = mov > 0 ? "deposit" : "withdrawal";

    const movDate = new Date(account.movementsDates[idx]);
    const displayDate = formatMovements(movDate, account.locale);

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${transactionType}">${
      idx + 1
    } ${transactionType.toUpperCase()}
        </div>

        <div class="movements__date">${displayDate}</div>

        <div class="movements__value">${formatCurr(
          mov,
          account.locale,
          account.currency
        )}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
    // containerMovements.insertAdjacentHTML("beforeend", html);
  });
};

const calcDisplayTotalBalance = function (account) {
  account.balance = account.movements.reduce(
    (accumulator, currMov) => accumulator + currMov,
    0
  );

  labelBalance.textContent = `${formatCurr(
    account.balance,
    account.locale,
    account.currency
  )}`;
};

const calcDisplaySummary = function (account) {
  const totalDeposit = account.movements
    .filter((mov) => mov > 0)
    .reduce((totalDeposit, currDeposit) => totalDeposit + currDeposit, 0);

  labelSumIn.textContent = `${formatCurr(
    totalDeposit,
    account.locale,
    account.currency
  )}`;

  const totalWithdrawal = account.movements
    .filter((mov) => mov < 0)
    .reduce(
      (totalWithdrawal, currWithdrawal) => totalWithdrawal + currWithdrawal,
      0
    );

  labelSumOut.textContent = `${formatCurr(
    Math.abs(totalWithdrawal),
    account.locale,
    account.currency
  )}`;

  const interest = account.movements
    .map((mov) => mov > 0 && mov * (account.interestRate / 100))
    .filter((interest) => interest >= 1)
    .reduce((acc, mov, idx, arr) => {
      return acc + mov;
    }, 0);

  labelSumInterest.textContent = `${formatCurr(
    interest,
    account.locale,
    account.currency
  )}`;
};

const createUserNames = function (accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUserNames(accounts);

const updateUI = function (currentAcc) {
  //    Display movements
  displayMovements(currentAcc);

  //    Display balance
  calcDisplayTotalBalance(currentAcc);

  //    Display summary
  calcDisplaySummary(currentAcc);
};

const startLogOutTimer = function () {
  const tick = () => {
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${String(Math.trunc(time / 60)).padStart(
      2,
      0
    )}:${String(time % 60).padStart(2, 0)}`;

    // When 0 seconds, stop timer and log out user
    if (time <= 0) {
      clearInterval(logOutTimer);

      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    time--;
  };

  // Set timer to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const logOutTimer = setInterval(tick, 1000);

  return logOutTimer;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//! ********************************************* EVENT HANDLERS *********************************************

//!     SORT ARRAY
let sorted = false;
btnSort.addEventListener("click", function () {
  sorted = !sorted;
  displayMovements(currentAccount, sorted);
});

//!     USER LOGIN
let currentAccount, timer;

//?     FAKE ALWAYS LOGIN
// currentAccount = account1;
// updateUI(account1);
// containerApp.style.opacity = 1;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault(); //  form submit reloads the page, nullifying the dom manipulation, that's why "preventDefault" is used

  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value.trim()
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    //    Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }!`;

    containerApp.style.opacity = 1;

    //? create and display current date & time
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "2-digit", // day: "numeric",
      month: "numeric", //month: "long",
      year: "numeric",
      weekday: "short", // weekday: "long",
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    //    update UI
    updateUI(currentAccount);
  }

  //    Clear input fields
  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginUsername.blur();
  inputLoginPin.blur();
});

//!     TRANSFER MONEY
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const transferAmountValue = +inputTransferAmount.value;

  const recipientAccount = accounts.find(
    (account) => inputTransferTo.value === account.username
  );

  // clearing input fields
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferTo.blur();
  inputTransferAmount.blur();

  if (
    transferAmountValue > 0 &&
    recipientAccount &&
    transferAmountValue <= currentAccount.balance &&
    recipientAccount.username !== currentAccount.username
  ) {
    // depositing to recipient account
    recipientAccount.movements.push(transferAmountValue);
    recipientAccount.movementsDates.push(new Date().toISOString());

    // withdrawing from current account
    currentAccount.movements.push(-transferAmountValue);
    currentAccount.movementsDates.push(new Date().toISOString());

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    //    update UI
    updateUI(currentAccount);
  }
});

//!     REQUEST LOAN
//  only gets accepted if the user have at least a single deposit which equals 10th the amount of requested loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const loanAmtVal = Math.trunc(inputLoanAmount.value);

  if (
    loanAmtVal > 0 &&
    currentAccount.movements.some((mov) => mov >= loanAmtVal * 0.1)
  ) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmtVal);
      currentAccount.movementsDates.push(new Date().toISOString());

      if (timer) clearInterval(timer);
      timer = startLogOutTimer();

      updateUI(currentAccount);
    }, 3000);
  }

  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

//!     CLOSE ACCOUNT
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    //    deleting account
    const accountIdx = accounts.findIndex(
      (account) => account.username === inputCloseUsername.value
    );

    accounts.splice(accountIdx, 1);

    //  logging out current user
    containerApp.style.opacity = 0;
  }

  //    Clear input fields
  inputCloseUsername.value = inputClosePin.value = "";
  inputCloseUsername.blur();
  inputClosePin.blur();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!   MY ATTEMPT (for login)
// document.querySelector(".login").addEventListener("submit", (e) => {
//   e.preventDefault();

//   const userInfo = new Map();
//   accounts.map((account) => userInfo.set(account.username, account.pin));
//   //  {'js' => 1111, 'jd' => 2222, 'stw' => 3333, 'ss' => 4444}

//   const username = inputLoginUsername.value;
//   const pin = +(inputLoginPin.value);

//   if (username === "" || pin === "") {
//     alert("Empty username or password");
//   } else if (userInfo.has(username) && Number(pin) === userInfo.get(username)) {
//     containerApp.style.opacity = 1;

//     const userInfoArr = [...userInfo];

//     let accountNumber;
//     userInfoArr.forEach((acc, idx) => {
//       if (acc[0] === username) accountNumber = idx;
//     });

//     labelWelcome.textContent = `Good Day, ${
//       accounts[accountNumber].owner.split(" ")[0]
//     }!`;

//     displayMovements(accounts[accountNumber].movements);
//     calcDisplayTotalBalance(accounts[accountNumber].movements);
//     calcDisplaySummary(
//       accounts[accountNumber].movements,
//       accounts[accountNumber].interestRate
//     );
//   }

//   inputLoginPin.value = "";
//   inputLoginUsername.value = "";
// });

//!     SORT MOVEMENTS  (my attempt)
// btnSort.addEventListener("click", function () {
//   currentAccount.movements.sort((a, b) => a - b);
//   console.log(currentAccount.movements);

//   displayMovements(currentAccount.movements);
// });

//* Array in depth
// console.log(document.querySelectorAll(".movements__value"));

// btnLogin.addEventListener("click", function () {
//   const mov = Array.from(
//     document.querySelectorAll(".movements__value"),
//     (ele) => Number(ele.textContent.slice(0, -1))
//   );
//   console.log(mov);
// });

//* Numbers, timers, dates, Intl
// console.log([...document.querySelectorAll(".movements__row")]);

// labelBalance.addEventListener("click", () => {
//   [...document.querySelectorAll(".movements__row")].forEach((row, i) => {
//     if ((i + 1) % 2 === 0) {
//       row.style.backgroundColor = "orange";
//     }

//     if ((i + 1) % 3 === 0) {
//       row.style.backgroundColor = "blueviolet";
//     }
//   });

//   console.log("clicked login");
// });
