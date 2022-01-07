//initiate whether a game is playing or not. This will become true when the game begins
let gamePlaying = false;
//initiate the game round variable
let roundNumber = 0;
//initiate computer score
let computerScore = 0;
//initiate player score
let playerScore = 0;

//define the allowed weapons in the game
const gameChoices = ["rock", "paper", "scissors"];
//create player selection variable
let playerSelection = "";
//create computer selection variable
let computerSelection = "";

//function to generate a random selection of rock, paper or scissors.
function computerPlay () {
    return gameChoices[Math.floor(Math.random()*3)];
}

//function to calculate the result, given both players answers it will return player, draw or computer.
function getResult (playerSelection, computerSelection) {
    if (playerSelection === "rock") {
        if (computerSelection === "rock") {
            return "draw"
        } else if (computerSelection === "paper"){
            return "computer"
            } else if (computerSelection === "scissors"){
                return "player"
            }
    } else if (playerSelection === "paper") {
        if (computerSelection === "rock") {
            return "player"
        } else if (computerSelection === "paper"){
            return "draw"
            } else if (computerSelection === "scissors"){
                return "computer"
            }
    } else if (playerSelection === "scissors") {
        if (computerSelection === "rock") {
            return "computer"
        } else if (computerSelection === "paper"){
            return "player"
            } else if (computerSelection === "scissors"){
                return "draw"
            }
    }
}

//function to play a round an return the result of the winner. The function returns a string containing
//either "player", "computer" or "draw".
function playRound (playerSelection) {
    //generate computer selection
    computerSelection = computerPlay();
    //calculate result
    winner = getResult(playerSelection, computerSelection);
    //output result
    updateRound(winner);
    //return the result of the round
    return winner
}

//updates the player with round information by default. use game = true to inform them of the game
//winner
function updateRound(winner, isGame = false) {
    const round = document.querySelector(".round");
    if (winner === "player") {
        if (isGame) {round.textContent = "Congratulations! You won the game!"} else {
            round.textContent = `The bot chose ${computerSelection}! Nice.`;
        }
    } else if (winner === "computer") {
        if (isGame) {round.textContent = "Unlucky, you lost the game to a bot."} else {
            round.textContent = `The bot chose ${computerSelection}! Unlucky.`;
        }
    } else if (winner === "draw") {
        if (isGame) {round.textContent = "No winners here. The game has ended in a draw."} else {
            round.textContent = `The bot chose ${computerSelection}! Tie.`;
        }
    }
}

function initiateGame() {
    gamePlaying = true;
    playerScore = 0;
    computerScore = 0;
    roundNumber = 0;
}

function updateScore() {
    document.querySelector(".score").textContent = `${playerScore} - ${computerScore}`
}

//intiate a game consisting of 5 rounds of playRound(). The user will be informed of their result
//via the console
function game (e) {
    //check if a game is ongoing
    //if no - initiate
    if (!gamePlaying) {
        initiateGame();
    };

    //incrememnt the round counter
    roundNumber++;

    //play a round by getting the result from the players action and submitting it to playRound()
    const playerSelection = e.target.getAttribute("id");
    const roundResult = playRound(playerSelection);

    //update the winners score
    if (roundResult === "player") {
        playerScore++;
    } else if (roundResult === "computer") {
        computerScore++;
        }

    //update game score
    updateScore();
    
    if (roundNumber === 5) {
        //initiate the winner
        let gameWinner = "";
        //calculate the winner
        if (playerScore > computerScore) {
            gameWinner = "player";
        } else if (playerScore < computerScore) {
            gameWinner = "computer";
        } else if (playerScore === computerScore) {
            gameWinner = "draw";
        }
        updateRound(gameWinner, isGame = true)
        gamePlaying = false;
    }
}

//identify the buttons
const buttons = document.querySelectorAll(".buttons > button")
//add event listener to each button which plays a round
buttons.forEach(button => button.addEventListener("click", e => game(e)));
