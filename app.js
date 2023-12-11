const gameBtns = document.querySelectorAll(".game-btn");
const gameOptions = ["scissors", "paper", "rock", "lizard", "spock"];
const gameBtnsContainer = document.querySelector(".game-buttons-container");

function randomNumber() {
  return Math.floor(Math.random() * gameOptions.length);
}

const gameRules = [
  (scissors = {
    choice: "scissors",
    win: { paper: true, lizard: true },
    lose: { rock: true, spock: true },
  }),
  (paper = {
    choice: "paper",
    win: { rock: true, spock: true },
    lose: { scissors: true, lizard: true },
  }),
  (rock = {
    choice: "rock",
    win: { scissors: true, lizard: true },
    lose: { spock: true, paper: true },
  }),
  (paper = {
    choice: "lizard",
    win: { spock: true, paper: true },
    lose: { rock: true, scissors: true },
  }),
  (scissors = {
    choice: "spock",
    win: { scissors: true, rock: true },
    lose: { lizard: true, paper: true },
  }),
];

let gameScore = 0;

const gameScoreNumber = document.getElementById("score-actual");

window.addEventListener("load", () => {
  gameScoreNumber.innerHTML = gameScore;
  if (sessionStorage.getItem("rpsls-score")) {
    const rpslsScore = sessionStorage.getItem("rpsls-score");
    gameScoreNumber.innerHTML = rpslsScore;
  }
});

function gameCheck() {
  const randomNumero = randomNumber();
  const opponentChoice = gameOptions[randomNumero];
  const playerChoice = sessionStorage.getItem("playerchoice");
  const resultText = document.querySelector(".game-result");

  for (const button of gameBtns) {
    const buttonData = button.dataset.button;
    if (buttonData === opponentChoice) {
      if (opponentChoice) {
        const compChoice = document.getElementById("computer-choice");
        compChoice.classList.remove("computer-choice-btn");
        compChoice.classList.add(
          `${opponentChoice}-btn`,
          "game-btn",
          "draw-btn-display",
          "game-btn-large"
        );
        compChoice.innerHTML = `<div class="game-btn-img-container">
            <img src="./images/icon-${opponentChoice}.svg" alt="" class="btn-img" />
          </div>`;
      }
      break;
    }
  }

  if (playerChoice) {
    for (const rule of gameRules) {
      if (rule.choice === playerChoice) {
        if (rule.win[opponentChoice]) {
          resultText.innerHTML = `You win`;
          gameScore++;
          playerChoiceBtn.classList.add("circle");
          break;
        } else if (rule.lose[opponentChoice]) {
          resultText.innerHTML = `You lose`;
          gameScore--;
          compChoice.classList.add("circle");
          break;
        } else {
          resultText.innerHTML = `Draw`;
        }
      }
    }
    gameScoreNumber.innerHTML = gameScore;
  }

  sessionStorage.setItem("rpsls-score", gameScore);
}

const opponentChoice = () => {
  setTimeout(gameCheck, 1000);
};

const gameResultsContainer = document.querySelector(".game-result-container");
const playerChoiceBtn = document.getElementById("player-choice");
const compChoice = document.getElementById("computer-choice");
const wldContainer = document.querySelector(".wld-container");

gameBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    gameBtns.forEach((btn) => {
      btn.classList.add("buttons-hide");
    });
    gameBtnsContainer.style.backgroundImage = "none";
    e.preventDefault();
    const currentButton = e.currentTarget;
    currentButton.classList.add("draw-btn-display");
    const playerChoice = currentButton.dataset.button;
    playerChoiceBtn.classList.remove("player-choice-btn");
    playerChoiceBtn.classList.add(
      `${playerChoice}-btn`,
      "game-btn",
      "draw-btn-display",
      "game-btn-large"
    );
    playerChoiceBtn.innerHTML = `<div class="game-btn-img-container">
            <img src="./images/icon-${[
              playerChoice,
            ]}.svg" alt="" class="btn-img" />
          </div>`;

    sessionStorage.setItem("playerchoice", playerChoice);
    opponentChoice();

    setTimeout(() => {
      wldContainer.classList.add("element-show");
    }, 1000);

    gameResultsContainer.classList.add("element-show");
  });
});

const playAgain = document.querySelector(".play-again-btn");
playAgain.addEventListener("click", () => {
  gameBtns.forEach((btn) => {
    btn.classList.remove("buttons-hide", "draw-btn-display");
  });

  gameResultsContainer.classList.remove("element-show");
  playerChoiceBtn.classList.add("player-choice-btn");
  playerChoiceBtn.className = "";
  compChoice.className = "";
  playerChoiceBtn.innerHTML = "";
  compChoice.innerHTML = "";
  compChoice.classList.add("computer-choice-btn");
  wldContainer.classList.remove("element-show");
  if (window.innerWidth > 350) {
    gameBtnsContainer.style.backgroundImage = `url("./images/bg-pentagon.svg")`;
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth < 350) {
      gameBtnsContainer.style.backgroundImage = "none";
    }
  });
});

const gameRulesContainer = document.querySelector(
  ".game-rules-modal-container"
);
const modalDarken = document.querySelector(".modal-darken");
const gameRulesOpenBtn = document.querySelector(".game-rules-open-btn");
const gameRulesCloseBtn = document.querySelector(".game-rules-close-btn");

gameRulesOpenBtn.addEventListener("click", () => {
  gameRulesContainer.style.display = "flex";
  modalDarken.style.display = "block";
});

gameRulesCloseBtn.addEventListener("click", () => {
  gameRulesContainer.style.display = "none";
  modalDarken.style.display = "none";
});
