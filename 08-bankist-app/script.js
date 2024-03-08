"use strict";

//! *************************************************** Data ***************************************************

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
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
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
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

const account5 = {
  owner: "Samar Verma",
  movements: [-5, -1500, 5000, 2000],
  interestRate: 2,
  pin: 1234,
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

const calcDisplayTotalBalance = function (account) {
  account.balance = account.movements.reduce(
    (accumulator, currMov) => accumulator + currMov,
    0
  );

  labelBalance.textContent = `${account.balance}€`;
};

const calcDisplaySummary = function (account) {
  const totalDeposit = account.movements
    .filter((mov) => mov > 0)
    .reduce((totalDeposit, currDeposit) => totalDeposit + currDeposit, 0);
  labelSumIn.textContent = `${totalDeposit}€`;

  const totalWithdrawal = account.movements
    .filter((mov) => mov < 0)
    .reduce(
      (totalWithdrawal, currWithdrawal) => totalWithdrawal + currWithdrawal,
      0
    );
  labelSumOut.textContent = `${Math.abs(totalWithdrawal)}€`;

  const interest = account.movements
    .map((mov) => mov > 0 && mov * (account.interestRate / 100))
    .filter((interest) => interest >= 1)
    .reduce((acc, mov, idx, arr) => {
      return acc + mov;
    }, 0);
  labelSumInterest.textContent = `${interest}€`;
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
  displayMovements(currentAcc.movements);

  //    Display balance
  calcDisplayTotalBalance(currentAcc);

  //    Display summary
  calcDisplaySummary(currentAcc);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//! ********************************************* EVENT HANDLERS *********************************************

//!     USER LOGIN
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault(); //  form submit reloads the page, nullifying the dom manipulation, that's why "preventDefault" is used

  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //    Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }!`;

    containerApp.style.opacity = 1;

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

  const transferAmountValue = Number(inputTransferAmount.value);

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

    // withdrawing from current account
    currentAccount.movements.push(-transferAmountValue);

    //    update UI
    updateUI(currentAccount);
  }
});

//!     REQUEST LOAN
//  only gets accepted if the user have at least a single deposit which equals 10th the amount of requested loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const loanAmtVal = Number(inputLoanAmount.value);

  if (
    loanAmtVal > 0 &&
    currentAccount.movements.some((mov) => mov >= loanAmtVal * 0.1)
  ) {
    currentAccount.movements.push(loanAmtVal);

    updateUI(currentAccount);
  }

  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

//!     CLOSE ACCOUNT
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
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
//   const pin = Number(inputLoginPin.value);

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
