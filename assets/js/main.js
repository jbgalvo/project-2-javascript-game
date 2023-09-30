// let dice = document.getElementById("dice");

// const min = 1;
// const max = 24;

// dice.onclick = function () {
//   let xRand = getRandom(max, min);
//   let yRand = getRandom(max, min);

//   dice.style.webkitTransform = "rotateX(" + xRand + "deg) rotateY(" + yRand + "deg)";
//   dice.style.transform = "rotateX(" + xRand + "deg) rotateY(" + yRand + "deg)";
// };

// function getRandom(max, min) {
//   return (Math.floor(Math.random() * (max - min)) + min) * 90;
// }


//Global Variables
let currentScore, currentPlayer, playerScores, gameStatus;

//Player Variables
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const score1 = document.querySelector("#score1");
const score2 = document.querySelector("#score2");
const currentScore1 = document.querySelector("#current1");
const currentScore2 = document.querySelector("#current2");

// Dice Variable
const dice = document.querySelector(".dice");

//Button Variables
const btnNew = document.querySelector("#newGameBtn");
const btnRoll = document.querySelector("#rollBtn");
const btnHold = document.querySelector("#holdBtn");



//Initialize HTML values function
const initializeValues = () => {
  
  //Game Variables
  currentScore = 0;
  currentPlayer = 1;
  playerScores = [0, 0];
  gameStatus = "playing";
  
  //Set values to 0 for player elements
  score1.innerHTML = 0;
  score2.innerHTML = 0;
  currentScore1.innerHTML = 0;
  currentScore2.innerHTML = 0;

  //Hide dice
  dice.classList.add("d-none");

  //Set active player to player 1
  player1.classList.add("border-primary");
}

//Initialize Values
initializeValues();

//Switch Player Functionality
const switchPlayer = () => {
  currentScore = 0;
  currentPlayer = currentPlayer === 1 ? 1 : 2;
  document.querySelector(`#current${currentPlayer}`).innerHTML = 0;
  player1.classList.toggle("border-primary");
  player2.classList.toggle("border-primary");
}


//Dice Functionality
btnRoll.addEventListener("click", () => {
  if(gameStatus === 'playing') {

    //Generate random dice number
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;

    //Display dice based on the randomNumber
    dice.classList.remove("d-none");
    dice.src = `assets/images/dice-${randomDiceNumber}.png`;

    // Check dice rolled if 1
    if (randomDiceNumber !== 1) {
      currentScore += randomDiceNumber;
      document.querySelector(`#current${currentPlayer}`).innerHTML =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
  
});


//Restart game
btnNew.addEventListener("click", initializeValues);
