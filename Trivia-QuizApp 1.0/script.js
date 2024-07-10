//SELECTING ELEMENTS///SELECTING ELEMENTS///
// Main container
const app = document.querySelector(".app");

// Header elements
const header = document.querySelector(".header");
const status = document.querySelector(".status");

// Player scored
const player1Score = document.getElementById("score1");
const player2Score = document.getElementById("score2");

// Quiz section
const quizDiv = document.querySelector(".quizz-div");
const questionEl = document.querySelector(".question");
const optionsContainer = document.querySelector(".quizz-div .options");
const feedbackElement = document.querySelector(".quizz-div .feedback");

// Start/Reset buttons
const currentTurnEl = document.querySelector(".turn");
const startButton = document.querySelector(".start-reset-div .start-btn");
const resetButton = document.querySelector(".start-reset-div .reset-btn");
const nextTurnBtn = document.querySelector(".next-btn");

//difficulty el's
const easyEl = document.querySelector(".easy");
const mediumEl = document.querySelector(".medium");
const hardEl = document.querySelector(".hard");
const difficultyElements = [easyEl, mediumEl, hardEl];

//true or false buttons
const btnTrue = document.querySelector(".option--true");
const btnFalse = document.querySelector(".option--false");

//correct and wrong elements
const correctEl = document.querySelector(".correct");
const wrongEl = document.querySelector(".wrong");
// Rules section
const rulesDiv = document.querySelector(".rules-div");

// Accessing multiple elements if needed
// For example, to select all player divs
const playerDivs = document.querySelectorAll(".player-div");
//SELECTING ELEMENTS///SELECTING ELEMENTS///
//USER CLASSES
class Player {
  _id = 0;
  constructor(score) {
    this._id++;
    this.name = `Player${this._id}`;
    this.score = score;
  }
  addPoints() {
    console.log(currentQuestion.difficulty);
    if (currentQuestion.difficulty === "easy") {
      currentPlayer.score = currentPlayer.score + 2;
    }
    if (currentQuestion.difficulty === "medium") {
      currentPlayer.score = currentPlayer.score + 3;
    }

    if (currentQuestion.difficulty === "hard") {
      currentPlayer.score = currentPlayer.score + 4;
    }
  }
  removePoints() {
    console.log(currentQuestion.difficulty);
    if (currentQuestion.difficulty === "easy") {
      currentPlayer.score = currentPlayer.score - 1;
    }
    if (currentQuestion.difficulty === "medium") {
      currentPlayer.score = currentPlayer.score - 1;
    }

    if (currentQuestion.difficulty === "hard") {
      currentPlayer.score = currentPlayer.score - 1;
    }
  }
  updatePoints = function (boleeanStr) {
    //player1 logic
    if (currentPlayer === player1) {
      //if player1 answered CORRECTLY
      if (boleeanStr == "True") {
        currentPlayer.addPoints();
        correctEl.classList.remove("hidden");
        player1Score.textContent = `Score: ${currentPlayer.score}`;

        //if player1 answered WRONG
      } else {
        currentPlayer.removePoints();
        wrongEl.classList.remove("hidden");
        player1Score.textContent = `Score: ${currentPlayer.score}`;
      }
    }
    //player2 logic
    if (currentPlayer === player2) {
      //if player2 answered CORRECTLY
      if (boleeanStr == "True") {
        currentPlayer.addPoints();
        correctEl.classList.remove("hidden");
        player2Score.textContent = `Score: ${currentPlayer.score}`;

        //if player2 answered WRONG
      } else {
        currentPlayer.removePoints();
        wrongEl.classList.remove("hidden");
        player2Score.textContent = `Score: ${currentPlayer.score}`;
      }
    }
  };
}
const player1 = new Player(0);
const player2 = new Player(0);
//USER CLASSES
//DATA DATA DATA DATA

let randomNumber;
let currentQuestion;
let currentPlayer = player1;
let difficulty;

//DATA DATA DATA DATA
///FUNCTIONS///////FUNCTIONS///////FUNCTIONS////
const loadQuestions = async function () {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=50&type=boolean"
    );
    if (!response.ok) {
      alert("Dont reload too fast api cant catch up");
      throw new Error("error fetching questions");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const startGame = async function () {
  try {
    //loading questions and setting current question
    let questions = await loadQuestions().then((response) => response.results);
    randomNumber = Math.trunc(Math.random() * 50);
    currentQuestion = questions[randomNumber];
    questionEl.textContent = currentQuestion.question;
    //setting difficulty
    difficulty = currentQuestion.difficulty;

    //displaying the true or false buttons
    btnTrue.classList.remove("hidden");
    btnFalse.classList.remove("hidden");
  } catch (error) {
    console.error(error);
  }
};

const displayDifficultyBadge = function () {
  difficultyElements.forEach((el) => el.classList.add("hidden"));
  if (currentQuestion.difficulty === "easy") {
    easyEl.classList.remove("hidden");
  } else if (currentQuestion.difficulty === "medium") {
    mediumEl.classList.remove("hidden");
  } else {
    hardEl.classList.remove("hidden");
  }
};

const checkAwnser = async function (boleeanStr) {
  if (currentQuestion.correct_answer === boleeanStr) {
    currentPlayer.updatePoints("True");
    // currentPlayer.checkWinner();
  } else {
    currentPlayer.updatePoints("False");
  }
};
const endTurn = function () {
  // checking if player won
  if (player1.score > 2) {
    questionEl.textContent = "YOU WON";
    document.querySelector(".player-1").classList.add("winner");

    showBtn(resetButton);
  } else if (player2.score > 2) {
    questionEl.textContent = "YOU WON";
    document.querySelector(".player-2").classList.add("winner");
    showBtn(resetButton);
  } else {
    questionEl.textContent = "TURN IS OVER START AGAIN";
    btnTrue.classList.add("hidden");
    btnFalse.classList.add("hidden");
    showBtn(nextTurnBtn);
  }
};
function togglePlayer() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
}

const showBtn = function (el) {
  startButton.classList.add("hidden");
  resetButton.classList.add("hidden");
  nextTurnBtn.classList.add("hidden");
  el.classList.remove("hidden");
};
const showActivePlayer = function () {
  if (currentPlayer === player1) {
    currentTurnEl.textContent = "Turn : Player 1";
    document.querySelector(".player-2").classList.remove("active");
    document.querySelector(".player-1").classList.add("active");
  } else {
    currentTurnEl.textContent = "Turn : Player 2";
    document.querySelector(".player-2").classList.add("active");
    document.querySelector(".player-1").classList.remove("active");
  }
};
const removeWinner = function () {
  document.querySelector(".player-1").classList.remove("winner");
  document.querySelector(".player-2").classList.remove("winner");
};
///FUNCTIONS///////FUNCTIONS///////FUNCTIONS////
const resetGame = function () {
  player1.score = 0;
  player2.score = 0;
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  btnFalse.classList.add("hidden");
  btnTrue.classList.add("hidden");
  questionEl.textContent = "START NEW GAME";
  currentPlayer = player1;
  correctEl.classList.add("hidden");
  removeWinner();
  showBtn(startButton);
};
///CONSTRUCTION ZONE//////CONSTRUCTION ZONE//////CONSTRUCTION ZONE///
// 1.game start
startButton.addEventListener("click", async () => {
  try {
    await startGame();
    removeWinner();
    showActivePlayer();
    showBtn(resetButton);
    displayDifficultyBadge();
  } catch (error) {
    console.error(error);
  }
});
//1.1?reset button
resetButton.addEventListener("click", function () {
  const resetAwnser = prompt(
    "are you sure that you want to restart Whole game\nall scores will be lost\nYES/NO"
  ).toLowerCase();
  if (resetAwnser === "yes") {
    resetGame();
  } else {
    console.log("continue");
  }
});
//2. user choses true or false
btnTrue.addEventListener("click", async () => {
  try {
    checkAwnser("True");
    endTurn();
    btnFalse.classList.add("hidden");
    btnTrue.classList.add("hidden");
  } catch (error) {}
});
btnFalse.addEventListener("click", async () => {
  try {
    checkAwnser("False");
    endTurn();
    btnFalse.classList.add("hidden");
    btnTrue.classList.add("hidden");
  } catch (error) {}
});
//3.adding results
nextTurnBtn.addEventListener("click", function () {
  console.log("next turn");
  correctEl.classList.add("hidden");
  wrongEl.classList.add("hidden");
  togglePlayer();
  showBtn(startButton);
});
//4.next Question switch turn

///CONSTRUCTION ZONE//////CONSTRUCTION ZONE//////CONSTRUCTION ZONE///
