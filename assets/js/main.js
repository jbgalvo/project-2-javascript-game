/******************************************************************************
$$\    $$\                    $$\           $$\       $$\                     
$$ |   $$ |                   \__|          $$ |      $$ |                    
$$ |   $$ |$$$$$$\   $$$$$$\  $$\  $$$$$$\  $$$$$$$\  $$ | $$$$$$\   $$$$$$$\ 
\$$\  $$  |\____$$\ $$  __$$\ $$ | \____$$\ $$  __$$\ $$ |$$  __$$\ $$  _____|
 \$$\$$  / $$$$$$$ |$$ |  \__|$$ | $$$$$$$ |$$ |  $$ |$$ |$$$$$$$$ |\$$$$$$\  
  \$$$  / $$  __$$ |$$ |      $$ |$$  __$$ |$$ |  $$ |$$ |$$   ____| \____$$\ 
   \$  /  \$$$$$$$ |$$ |      $$ |\$$$$$$$ |$$$$$$$  |$$ |\$$$$$$$\ $$$$$$$  |
    \_/    \_______|\__|      \__| \_______|\_______/ \__| \_______|\_______/ 
                                                                              

Description: Variables Definition
*******************************************************************************/
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

//Button Variables
const btnNew = document.querySelector("#newGameBtn");
const btnRoll = document.querySelector("#rollBtn");
const btnHold = document.querySelector("#holdBtn");

//Audio Variables
const diceRollAudio = new Audio("assets/sounds/dice-roll.mp3");
const winnerAudio = new Audio("assets/sounds/winner.mp3");

/*******************************************************
$$\      $$\                 $$\           $$\ 
$$$\    $$$ |                $$ |          $$ |
$$$$\  $$$$ | $$$$$$\   $$$$$$$ | $$$$$$\  $$ |
$$\$$\$$ $$ |$$  __$$\ $$  __$$ | \____$$\ $$ |
$$ \$$$  $$ |$$ /  $$ |$$ /  $$ | $$$$$$$ |$$ |
$$ |\$  /$$ |$$ |  $$ |$$ |  $$ |$$  __$$ |$$ |
$$ | \_/ $$ |\$$$$$$  |\$$$$$$$ |\$$$$$$$ |$$ |
\__|     \__| \______/  \_______| \_______|\__|
                                               

Description: Modal Variable / Automatically Open a Modal
********************************************************/

//Mobal Variable
const aboutTheGameModal = new bootstrap.Modal(
  document.getElementById("aboutTheGameModal")
);


//Open About Game Modal
aboutTheGameModal.show();

/*****************************************
$$$$$$\           $$\   $$\     
\_$$  _|          \__|  $$ |    
  $$ |  $$$$$$$\  $$\ $$$$$$\   
  $$ |  $$  __$$\ $$ |\_$$  _|  
  $$ |  $$ |  $$ |$$ |  $$ |    
  $$ |  $$ |  $$ |$$ |  $$ |$$\ 
$$$$$$\ $$ |  $$ |$$ |  \$$$$  |
\______|\__|  \__|\__|   \____/ 
                                
Description: Initialize Variables Function
******************************************/
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

  //Set active player to player 1
  player1.classList.add("border-primary");
  player2.classList.remove("border-primary");
};

//Initialize Values
initializeValues();

/**********************************************************
 $$$$$$\                $$\   $$\               $$\       
$$  __$$\               \__|  $$ |              $$ |      
$$ /  \__|$$\  $$\  $$\ $$\ $$$$$$\    $$$$$$$\ $$$$$$$\  
\$$$$$$\  $$ | $$ | $$ |$$ |\_$$  _|  $$  _____|$$  __$$\ 
 \____$$\ $$ | $$ | $$ |$$ |  $$ |    $$ /      $$ |  $$ |
$$\   $$ |$$ | $$ | $$ |$$ |  $$ |$$\ $$ |      $$ |  $$ |
\$$$$$$  |\$$$$$\$$$$  |$$ |  \$$$$  |\$$$$$$$\ $$ |  $$ |
 \______/  \_____\____/ \__|   \____/  \_______|\__|  \__|
                                                          
Description: Switch Player Function
***********************************************************/
const switchPlayer = () => {
  document.querySelector(`#current${currentPlayer}`).innerHTML = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  player1.classList.toggle("border-primary");
  player2.classList.toggle("border-primary");
};

/******************************
$$$$$$$\            $$\ $$\ 
$$  __$$\           $$ |$$ |
$$ |  $$ | $$$$$$\  $$ |$$ |
$$$$$$$  |$$  __$$\ $$ |$$ |
$$  __$$< $$ /  $$ |$$ |$$ |
$$ |  $$ |$$ |  $$ |$$ |$$ |
$$ |  $$ |\$$$$$$  |$$ |$$ |
\__|  \__| \______/ \__|\__|
                            
Description: btnRoll Event
*******************************/
btnRoll.addEventListener("click", (e) => {
  //Check if game status is playing
  if (gameStatus === "playing") {
    //Generate random dice number
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;

    //Display dice based on the randomNumber and play audio
    diceRollAudio.play();

    //Disable button
    let rollBtnIcon = document.querySelector("#rollBtnIcon");
    
    btnRoll.disabled = true;
    rollBtnIcon.classList.remove("fa-dice-d6");
    rollBtnIcon.classList.add("fa-spinner", "fa-spin");
    
    setTimeout(() => {

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

      //Enable Button
      btnRoll.disabled = false;
      rollBtnIcon.classList.remove("fa-spinner", "fa-spin");
      rollBtnIcon.classList.add("fa-dice-d6");

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

/***********************************
$$\   $$\           $$\       $$\ 
$$ |  $$ |          $$ |      $$ |
$$ |  $$ | $$$$$$\  $$ | $$$$$$$ |
$$$$$$$$ |$$  __$$\ $$ |$$  __$$ |
$$  __$$ |$$ /  $$ |$$ |$$ /  $$ |
$$ |  $$ |$$ |  $$ |$$ |$$ |  $$ |
$$ |  $$ |\$$$$$$  |$$ |\$$$$$$$ |
\__|  \__| \______/ \__| \_______|
                                                 
Description: btnHold Event
************************************/
btnHold.addEventListener("click", () => {
  //Check if game status is playing
  if (gameStatus === "playing") {

    //Disable hold button
    let holdBtnIcon = document.querySelector("#holdBtnIcon");

    btnHold.disabled = true;
    holdBtnIcon.classList.add("fa-spinner", "fa-spin");
    holdBtnIcon.classList.remove("fa-upload");

    setTimeout(() => {
      
      //Add current score to active player's score
      playerScores[currentPlayer] += currentScore;

      document.querySelector(`#score${currentPlayer}`).innerHTML = playerScores[currentPlayer];

      //Enable button
      btnHold.disabled = false;
      holdBtnIcon.classList.remove("fa-spinner", "fa-spin");
      holdBtnIcon.classList.add("fa-upload");

      Swal.fire({
        position: "center",
        icon: "success",
        title: `Player ${currentPlayer} current score is ${playerScores[currentPlayer]}`,
        showConfirmButton: false,
        timer: 1500,
      });

      // Check if player's score is >= 100
      if (playerScores[currentPlayer] >= 10) {
        //Ending the game
        gameStatus = "finished";

        //Play winner audio
        winnerAudio.play();

        //Display Notification of the winner
        Swal.fire({
          position: "center",
          allowOutsideClick: false,
          allowEscapeKey: false,
          icon: "success",
          title: `Player ${currentPlayer} wins the pig dice game!`,
          showCloseButton: true,
        });

        //Reset Variables
        initializeValues();

      } else {

        //Switch again to the next player
        switchPlayer();

      }

    }, 300);

  }
});

/***********************************
$$\   $$\                         
$$$\  $$ |                        
$$$$\ $$ | $$$$$$\  $$\  $$\  $$\ 
$$ $$\$$ |$$  __$$\ $$ | $$ | $$ |
$$ \$$$$ |$$$$$$$$ |$$ | $$ | $$ |
$$ |\$$$ |$$   ____|$$ | $$ | $$ |
$$ | \$$ |\$$$$$$$\ \$$$$$\$$$$  |
\__|  \__| \_______| \_____\____/ 
                                  
Description: btnNew Game Event
************************************/
btnNew.addEventListener("click", () => {
  
  //Disable hold button
  let newGameBtnIcon = document.querySelector("#newGameBtnIcon");

  btnNew.disabled = true;
  newGameBtnIcon.classList.add("fa-spinner", "fa-spin");
  newGameBtnIcon.classList.remove("fa-arrows-rotate");

  setTimeout(() => {

    //Enable button
    btnNew.disabled = false;
    newGameBtnIcon.classList.remove("fa-spinner", "fa-spin");
    newGameBtnIcon.classList.add("fa-arrows-rotate");

    initializeValues();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Successfully Game Reset!",
      showConfirmButton: false,
      timer: 1500,
    });


  }, 600);

});
