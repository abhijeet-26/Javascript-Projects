"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Abhijeet Basfore",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Hasan Khan",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Bishal Prasad",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Kundan Singh",
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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} deposit</div>
    <div class="movements__value">${mov}€</div>
  </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = (acnt) => {
  acnt.balance = acnt.movements.reduce((acc, ele) => acc + ele, 0);
  labelBalance.textContent = `${acnt.balance}€`;
};

const calcDisplaySummary = (acnt) => {
  const incomes = acnt.movements
    .filter((mov) => mov > 0)
    .reduce((acc, currmov) => acc + currmov, 0);

  labelSumIn.textContent = `${incomes}€`;

  const invest = acnt.movements
    .filter((mov) => mov < 0)
    .reduce((acc, currMov) => acc + currMov, 0);
  labelSumOut.textContent = `${Math.abs(invest)}€`;

  const interest = acnt.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acnt.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUserName = (accounts) => {
  accounts.forEach((account) => {
    const user = account.owner;
    account.userName = user
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUserName(accounts);

const updateUI = (acc) => {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// EventListeners
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  const userName = inputLoginUsername.value;
  const pin = inputLoginPin.value;
  currentAccount = accounts.find((acc) => acc.userName === userName);
  if (currentAccount?.pin === Number(pin)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, 
        ${currentAccount.owner.split(" ")}!`;
    containerApp.style.opacity = 100;

    // clear the input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const transferAmnt = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    transferAmnt > 0 &&
    transferAmnt <= currentAccount.balance &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-1 * transferAmnt);
    receiverAcc.movements.push(transferAmnt);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    //add movement
    currentAccount.movements.push(amount);
    //update UI
    updateUI();
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const idx = accounts.findIndex(
      (acc) => acc.userName === currentAccount.userName
    );

    // delete the account
    accounts.splice(idx, 1);

    //Hide the UI
    containerApp.style.opacity = 0;
    //reset the welcome msg
    labelWelcome.textContent = `Log in to get started`;

    // clear the closeinput fields
    inputCloseUsername.value = inputClosePin.value = "";
  }
});

let sort = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sort);
  sort = !sort;
});
