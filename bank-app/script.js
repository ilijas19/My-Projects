'use strict';
//DATA
const account1 = {
  owner: 'Ilija Gocic',
  pin: 1111,
  movements: [1000, 2500, -3000, 7200, 100, -100],
  interestRate: 1.2,
};
const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const account5 = {
  owner: 'George Floyd',
  movements: [999, 91000, 9700, 520, 33390],
  interestRate: 1,
  pin: 5555,
  speciality: 'Cant Breathe',
  type: 'Nigger',
};
const account6 = {
  owner: 'Boka F',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 1905,
};
const accounts = [account1, account2, account3, account4, account5, account6];
//ELEMENTS

//LOGIN
const loginBtn = document.querySelector('.login__btn');
const usernameEl = document.querySelector('.input-username');
const pinEl = document.querySelector('.input-pin');
const appEl = document.querySelector('.app');
const balanceValueEl = document.querySelector('.balance-value');
const welcomeText = document.querySelector('.welcome');
//SUMMARY
const movementsEl = document.querySelector('.movements');
const summaryPositiveEl = document.querySelector('.summary__value--in');
const summaryNegativeEl = document.querySelector('.summary__value--out');
const summaryInterestEl = document.querySelector('.summary__value--interest');
//TRANSFER
const transferBtn = document.querySelector('.form__btn--transfer');
const transferToEl = document.querySelector('.form__input--to');
const transferAmountEl = document.querySelector('.form__input--amount');
//LOAN
const loanBtn = document.querySelector('.form__btn--loan');
const loanAmountEl = document.querySelector('.form__input--loan-amount');
//CLOSE
const closeBtn = document.querySelector('.form__btn--close');
const confirmUserEl = document.querySelector('.form__input--user');
const confirmPinEl = document.querySelector('.form__input--pin');
//SORT
const btnSort = document.querySelector('.btn--sort');

const createUsernames = function (accs) {
  accs.forEach(acc => {
    const user = [];
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .forEach(word => user.push(word[0]));

    acc.username = user.join('');
  });
};
const displayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov);
  balanceValueEl.textContent = `${balance}$`;
  currentUser.balance = balance;
};
const displayMovements = function (movements) {
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const string = `
      <div class="movements-row">
        <p class="type-${type}">${i + 1} ${type}</p>
        <p class="movements-value">${mov}</p>
      </div>`;
    movementsEl.insertAdjacentHTML('afterbegin', string);
  });
};
const displaySummary = function (acc) {
  const negativeMovs = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);

  const positiveMovs = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  summaryNegativeEl.textContent = `${negativeMovs}$`;
  summaryPositiveEl.textContent = `${positiveMovs}$`;
  summaryInterestEl.textContent = `${Math.trunc(interest)}$`;
};
const updateUI = function (acc) {
  displayBalance(acc.movements);
  displayMovements(acc.movements);
  displaySummary(acc);
};
const logOut = function () {
  appEl.style.opacity = 0;
  currentUser = undefined;
};

let currentUser;

createUsernames(accounts);

//LOGIN
loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const userValue = usernameEl.value;
  const pinValue = Number(pinEl.value);
  const user = accounts.find(acc => acc.username === `${userValue}`);
  if (!user) {
    alert('User not found');
  }
  if (user?.pin === pinValue) {
    currentUser = user;
    appEl.style.opacity = 100;
    welcomeText.textContent = `Hello ${currentUser.owner.split(' ')[0]}`;
    updateUI(currentUser);
    usernameEl.value = '';
    pinEl.value = '';
  } else {
    alert('Wrong password');
  }
});
//TRANSFER
transferBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const transferTo = transferToEl.value;
  let amount = transferAmountEl.value;
  const recieverAcc = accounts.find(acc => acc.username === transferTo);
  if (!recieverAcc) {
    alert('Account not found');
  } else if (currentUser.balance < amount) {
    alert('Balance too low for this transaction');
  } else if (amount > currentUser.balance * 0.5 && currentUser.balance > 5000) {
    amount = amount - amount * 0.1;
  }
  if (recieverAcc && currentUser.balance > amount) {
    currentUser.movements.push(-amount);
    recieverAcc.movements.push(amount);
    updateUI(currentUser);
  }
});
//LOAN
let canGetLoan = true;
loanBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = loanAmountEl.value;
  const depositOver10percent = currentUser.movements.find(
    mov => mov > loanAmount * 0.2
  );
  if (canGetLoan === true) {
    if (loanAmount && depositOver10percent) {
      currentUser.movements.push(Number(loanAmount));
      updateUI(currentUser);
      canGetLoan = false;
    } else {
      alert(`deposit not over 20%`);
    }
  } else {
    alert(`No loan possibility\nPlease consult with you bank opperator`);
  }
});
//CLOSE
closeBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const confirmUser = confirmUserEl.value;
  const confirmPin = Number(confirmPinEl.value);
  const currentAccountUsername = accounts.find(
    acc => acc.username === currentUser.username
  ).username;
  const accountToBeDeleted = accounts.findIndex(
    acc => acc.username === confirmUser
  );
  if (confirmUser === currentAccountUsername) {
    if (confirmPin === currentUser.pin) {
      accounts.splice(accountToBeDeleted, 1);
      logOut();
      confirmUserEl.value = '';
      confirmPinEl.value = '';
    } else {
      alert('Wrong password');
    }
  } else {
    alert('Wrong username');
  }
});
//
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sorted = !sorted;
  if (sorted) {
    const copyMovements = currentUser.movements
      .slice(0, -1)
      .sort((a, b) => a - b);
    movementsEl.innerHTML = '';
    copyMovements.forEach((mov, i) => {
      const type = mov > 0 ? 'deposit' : 'withdrawal';
      const string = `
      <div class="movements-row">
        <p class="type-${type}">${i + 1} ${type}</p>
        <p class="movements-value">${mov}</p>
      </div>`;
      movementsEl.insertAdjacentHTML('afterbegin', string);
    });
  } else {
    updateUI(currentUser);
  }
});
