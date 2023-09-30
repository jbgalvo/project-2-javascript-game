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
let dice = document.querySelector("#dice");

//Button Variables
const btnNew = document.querySelector("#newGameBtn");
const btnRoll = document.querySelector("#rollBtn");
const btnHold = document.querySelector("#holdBtn");

//Audio Variables
const diceRollAudio = new Audio("assets/sounds/dice-roll.mp3");
const winnerAudio = new Audio("assets/sounds/winner.mp3");

// Dice angle array
let diceAngleArray = [
  [0, 0, 0],
  [-310, -362, -38],
  [-400, -320, -2],
  [135, -217, -88],
  [-224, -317, 5],
  [-47, -219, -81],
  [-133, -360, -53],
];

//Initialize HTML values function
const initializeValues = () => {
  
  //Game Variables
  currentScore = 0;
  currentPlayer = 1;
  playerScores = [null, 0, 0];
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
  document.querySelector(`#current${currentPlayer}`).innerHTML = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  player1.classList.toggle("border-primary");
  player2.classList.toggle("border-primary");
}
  
//Dice Functionality
btnRoll.addEventListener("click", () => {

  //Check if game status is playing
  if(gameStatus === 'playing') {


    //Generate random dice number
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
    
    //Display dice based on the randomNumber and play audio
    diceRollAudio.play();

    setTimeout(() => {
      
      dice.classList.remove("d-none");

      // Cube animation
      dice.style.animation = "animate 1.4s linear";

      // Dice transform
      dice.style.transform = `rotateX(${diceAngleArray[randomDiceNumber][0]}deg) rotateY(${diceAngleArray[randomDiceNumber][1]}deg) rotateZ(${diceAngleArray[randomDiceNumber][2]}deg)`;
      dice.style.transition = "1s linear";

      dice.addEventListener("animationend", function (e) {
        dice.style.animation = "";
      });
    }, 300);

    setTimeout(() => {

      // Check dice rolled if 1
      if (randomDiceNumber !== 1) {
        currentScore += randomDiceNumber;
        document.querySelector(`#current${currentPlayer}`).innerHTML =
          currentScore;
      } else {
        // Switch to next player
        switchPlayer();
      }

    }, 1700);
    
  }
  
});


btnHold.addEventListener("click", () => {

  //Check if game status is playing
  if (gameStatus === "playing") {

    dice.classList.add("d-none");

    //Add current score to active player's score
    playerScores[currentPlayer] += currentScore;

    document.querySelector(`#score${currentPlayer}`).innerHTML = playerScores[currentPlayer];

    // 2. Check if player's score is >= 100
    if(playerScores[currentPlayer] >= 100) {

      //Ending the game
      gameStatus = "finished";

    } else {

      //Switch again to the next player
      switchPlayer();

    }
  }

  
});


//Restart game
btnNew.addEventListener("click", initializeValues);
