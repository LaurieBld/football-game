let goalPosition;
let goals = 0;
let remainingShoots = 5;
let evenOdd = "even"; /* pair */
let shootPosition;

const inputErrors = document.getElementById("input-errors");
const input = document.getElementById("input");
const shootButton = document.getElementById("shoot");
const remainingShootsView = document.getElementById("remaining-shoots");
const playAgainButton = document.getElementById("playAgain_btn");
const resultMsg = document.getElementById("result");
const score = document.getElementById("score");

function initGame() {
    input.focus();
    input.disabled = false;
    shootButton.disabled = false;
    playAgainButton.disabled = true;

    input.value = "";
    generateGoalPosition();
}

function generateGoalPosition() {

    let randomNumber = Math.ceil(Math.random() * 9);

    if (randomNumber === 0) {
        generateGoalPosition();
    } else if (evenOdd === "even" && (randomNumber % 2) !== 0) {
        generateGoalPosition();
    } else if (evenOdd === "odd" && (randomNumber % 2) !== 1) {
        generateGoalPosition();
    } else {
        goalPosition = randomNumber;
    }

    return
}

function shoot() {
    // La valeur du champ arrive en string et donc on la convertie en number
    shootPosition = parseInt(input.value);
    
    if ((shootPosition < 1 || shootPosition > 9) || isNaN(shootPosition)) {
        inputErrors.innerHTML = "Veuillez entrer un nombre entre 1 et 9";
    } else {
        inputErrors.innerHTML = "";

        // BUT !!
        if (shootPosition !== goalPosition) {
            resultMsg.innerHTML = "GOOAAALLLL !! The Goal were in position " + goalPosition + ".";
            score.innerHTML = ++goals;
        }
        // ARRET DU GARDIEN 
        else {
            resultMsg.innerHTML = "FAILED ... The Goal were in position " + goalPosition + ".";
        }
        // On vide l'input du joueur
        input.value = "";

        // Retrait de 1 au compteur de tirs
        remainingShootsView.innerHTML = --remainingShoots;
        
        evenOdd = evenOdd === "even" ? "odd" : "even";

        // La partie fini au bout de 5 tirs
        if (remainingShoots === 0) {
            endGame();
        } else { // sinon c'est au prochain tir
            initGame();
        }
    }
}

function endGame() {
    input.disabled = true;
    shootButton.disabled = true;
    playAgainButton.disabled = false;
}

function playAgain() {
    // reset
    resultMsg.innerHTML = "";
    score.innerHTML = "0";
    goals = 0;
    remainingShootsView.innerHTML = "5";
    remainingShoots = "5";
    initGame();
}

window.onload = initGame;
