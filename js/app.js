/*-------------- Constants -------------*/
const LEVEL_CONFIGS = {
    '1x1': { rows: 1, cols: 1 },
    '4x1': { rows: 1, cols: 4 },
    '2x2': { rows: 2, cols: 2 },
    '3x2': { rows: 3, cols: 2 },
    '4x2': { rows: 4, cols: 2 },
    '5x2': { rows: 5, cols: 2 },
    '4x3': { rows: 4, cols: 3 },
    '5x3': { rows: 5, cols: 3 },
    '5x4': { rows: 5, cols: 4 }
};

/*---------- Variables (state) ---------*/
let countdownOn = true;
let selectedLevel = '1x1';
let selectedTimer = 15;
let originalNumbers = [];
let userNumbers = [];


/*----- Cached Element References  -----*/
const startGameButton = document.getElementById('start-game');
const gameArea = document.getElementById('game-area');


/*-------------- Functions -------------*/
function startGame() {

}
function createNumberPalette(){

}


/*----------- Event Listeners ----------*/
startGameButton.addEventListener('click', startGame);


