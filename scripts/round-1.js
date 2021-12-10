let readHash = document.location.hash.slice(1); // reads the Hash for the player names
let playerHeading = document.getElementById("player-heading"); // used for setting the current player
let guessButton = document.getElementById("guess-input"); // the Guess button for user input
let passButton = document.getElementById("pass-input"); // the Pass button for passing to next player
let gameboardClick = document.getElementById("grid");
let questionAmount = 0; // holds the score between players
let playerArray = readHash.split("-"); // this returns an array of all of the players
let stillPlaying = true; // passed to the timer and returned to exit current round
let numPlayers = playerArray.length; // number of players
let currentPlayer = numPlayers - numPlayers;
guessButton.disabled = true; // disables the Guess button
passButton.disabled = true; // disables the Pass button

playerHeading.textContent = `Current Player is ${
  playerArray[numPlayers - numPlayers]
}!`;

function roundTimer(playingBool) {
  // Five minute timer for the Round. alerts and then goes to Double Jeopardy when timed out.
  let count = 300; // sets the count for the page at 5 minutes (300 seconds)
  let intervalId = setInterval(counter, 1000);
  let target = document.getElementById("round-timer");

  function counter() {
    let currentSecond = count;
    let minutes = Math.floor(currentSecond / 60);
    let seconds = currentSecond % 60;

    // Minutes formatted with the left padded zero
    if (Math.floor(currentSecond / 60) < 60) {
      minutes = `0${Math.floor(currentSecond / 60)}`;
    } else if (Math.floor(currentSecond / 60) < 10) {
      minutes = `0${Math.floor(currentSecond / 60)}`;
    }
    // Seconds formatted with the left padded zero
    if (seconds < 10 && seconds > 0) {
      seconds = `0${seconds.toString()}`;
    } else if (seconds === 0) {
      seconds = "00";
    }
    // Output to page
    target.textContent = `Round Timer: ${minutes}:${seconds}`;
    count -= 1;
    if (count < 0) {
      clearInterval(intervalId);
      return (playingBool = false);
      // alert("Round 1 has ended. Click to continue to Double Jeopardy");
      //   document.location = "/round-2.html#"; // moves to Double Jeopardy if timed out.
    }
  }
}
let questionTime = 5;
function questionTimer() {
  // Question Timer to be started when player selects a tile
  let count = questionTime; // sets the count for the page at 5 minutes (300 seconds)
  let intervalId = setInterval(counter, 1000);
  let target = document.getElementById("question-timer");
  buttonDisabler(false); // enables the Pass button

  // this is the counter function that handles the round timer of 5 minutes
  function counter() {
    let currentSecond = count;
    let minutes = Math.floor(currentSecond / 60);
    let seconds = currentSecond % 60;

    // Minutes formatted with the left padded zero
    if (Math.floor(currentSecond / 60) < 60) {
      minutes = `0${Math.floor(currentSecond / 60)}`;
    } else if (Math.floor(currentSecond / 60) < 10) {
      minutes = `0${Math.floor(currentSecond / 60)}`;
    }
    // Seconds formatted with the left padded zero
    if (seconds < 10 && seconds > 0) {
      seconds = `0${seconds.toString()}`;
    } else if (seconds === 0) {
      seconds = "00";
    }
    // Output to page
    target.textContent = `Question Timer: ${minutes}:${seconds}`;
    count -= 1;
    if (count < 0) {
      clearInterval(intervalId);

      buttonDisabler(true); // disables the Guess button
      // SOMETHING HAPPENS HERE FOR IF THE TIME RUNS OUT ////////////////////////
    }
  }
}

function buttonDisabler(inputBool) {
  // this disables the guess and pass buttons if passed as TRUE, re-enables them if passed FALSE
  if (inputBool) {
    guessButton.disabled = inputBool; // disables the Guess button if True
    passButton.disabled = inputBool; // disables the Pass button if True
  } else {
    guessButton.disabled = inputBool; // enables the Guess button if False
    passButton.disabled = inputBool; // enables the Pass button if False
  }
}

roundTimer(stillPlaying); // starts the Round timer of 5 minutes after the Welcome message is clicked

// Below is the clicking on the gameboard grid area
gameboardClick.addEventListener("click", (evt) => {
  questionAmount = parseInt(evt.target.textContent);
  evt.target.value = "Hello there";
  evt.target.textContent = evt.target.value;
  questionTimer();
});

passButton.addEventListener("click", (evt) => {
  // This is the Pass button, new timer starts and current player changes.
  // old timer doesn't stop for some reason
  questionTimer();

  if (currentPlayer === playerArray.length - 1) {
    playerHeading.textContent = `Current Player is ${
      playerArray[numPlayers - numPlayers]
    }!`;
    currentPlayer = numPlayers - numPlayers;
  } else {
    playerHeading.textContent = `Current Player is ${
      playerArray[currentPlayer + 1]
    }!`;
    currentPlayer = currentPlayer + 1;
  }
  alert(`Passed to next player : ${playerArray[currentPlayer]}`);
  console.log(currentPlayer);
});
