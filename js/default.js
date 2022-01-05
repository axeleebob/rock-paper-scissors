//Tell players how to play the game
console.log("Run the game() function to play.")

//define the allowed weapons in the game
let gameChoices = ["rock", "paper", "scissors"];
//create player selection variable
let playerSelection = "";
//create computer selection variable
let computerSelection = "";

//function to prompt the players selection of rock, paper or scissors and return the value. use the
//option tryAgain = true if the player entered an incorrect value initially.
function getPlayerSelection (tryAgain = false) {
    if (tryAgain) {
        return prompt("You can only use rock, paper or scissors in this game. Please try again.")
    }
    else {
        return prompt("What will it be? rock, paper or scissors?")
    }
}

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
function playRound () {
    //prompt player selection
    playerSelection = getPlayerSelection().toLowerCase();
    //check the player selected a valid option and ask again if they did not.
    let keepGoing = true;
    while (keepGoing) {
        //check the player selected a valid option
        if (gameChoices.includes(playerSelection)) {
            keepGoing = false;
        } else {
            //ask the player to pick a valid option
            playerSelection = getPlayerSelection(tryAgain = true).toLowerCase();
        }
    }
    //generate computer selection
    computerSelection = computerPlay().toLowerCase();
    //calculate result
    winner = getResult(playerSelection, computerSelection);
    //output result
    if (winner === "player") {
        console.log(`The bot chose ${computerSelection}! Nice.`)
    } else if (winner === "computer") {
        console.log(`The bot chose ${computerSelection}! Unlucky.`)
    } else if (winner === "draw") {
        console.log(`The bot chose ${computerSelection}! Tie.`)
    }
    //return the result of the round
    return winner
}

//intiate a game which consisting of 5 rounds of playRound(). The user will be informed of their result
//via the console
function game () {
    //welcome message
    console.log("Welcome to rock, paper, scissors. Pick your weapons wisely...")
    //initiate computer score
    let computerScore = 0;
    //initiate player score
    let playerScore = 0;
    //initiate round number
    //loop through the rounds
    for (let roundNumber = 1; roundNumber <=5; roundNumber++) {
        //inform player of the score
        console.log(`Score: Player ${playerScore} - ${computerScore} Computer`)
        //play a round and save the result
        roundResult = playRound();
        //update the winners score
        if (roundResult === "player") {
            playerScore++;
        } else if (roundResult === "computer") {
            computerScore++;
        }
    }
    //initiate the winner
    let winner = "";
    //calculate the winner
    if (playerScore > computerScore) {
        winner = "player";
    } else if (playerScore < computerScore) {
        winner = "computer";
    } else if (playerScore === computerScore) {
        winner = "draw";
    }
    //inform player of the result
    if (winner === "player") {
        console.log(`Congratulations! You won! The final result was: Player ${playerScore} - ${computerScore} Computer`)
    } else if (winner === "computer") {
        console.log(`Unlucky, the bot you lost to a bot. The final result was: Player ${playerScore} - ${computerScore} Computer`)
    } else if (winner === "draw") {
        console.log(`No winners here. It's a draw. The final result was: Player ${playerScore} - ${computerScore} Computer`)
    }
}