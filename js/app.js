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
let selectedLevel = ''; // Stores the selected game level (grid size)
let selectedTimer = 5; // Default timer value
let randomGrid = [];    // Stores the randomly generated grid of numbers
let userGrid = [];      // Stores the user's selected grid
let countdown;          

/*----- Cached Element References  -----*/
const playButton = document.querySelector('.play-button');
const settingsButton = document.getElementById('game-settings-btn');
const settingsSection = document.getElementById('game-settings');
const saveMessage = document.getElementById('save-message');
const gridContainer = document.getElementById('grid-container');
const gameArea = document.getElementById('game-area');
const userInput = document.getElementById('user-input');

/*-------------- Functions Section -------------*/

function showGameSettings() {
    settingsSection.style.display = 'block';
    playButton.style.display = 'none';
    settingsButton.style.display = 'none';
}

function hideGameSettings() {

    settingsSection.style.display = 'none';
 
    playButton.style.display = 'block';
    settingsButton.style.display = 'block';
}

function saveGameSettings() {
   
    settingsSection.style.display = 'none';
   
    playButton.style.display = 'block';
    settingsButton.style.display = 'block';
}


function startGame() {
    // Randomly select a level
    const levels = Object.keys(LEVEL_CONFIGS);
    selectedLevel = levels[Math.floor(Math.random() * levels.length)];

    // Get the number of rows and columns for the selected level
    const { rows, cols } = LEVEL_CONFIGS[selectedLevel];

    // Generate a random grid of numbers
    randomGrid = [];
    for (let i = 0; i < rows; i++) {
        randomGrid[i] = [];
        for (let j = 0; j < cols; j++) {
            randomGrid[i][j] = Math.floor(Math.random() * 21); // Generate a random number between 0 and 20
        }
    }

    // Display the grid
    const gridContainer = document.getElementById('grid-container'); // Ensure gridContainer is defined
    gridContainer.innerHTML = '';

    // Set the grid layout dynamically
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`; // Create as many columns as required
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`; // Create as many rows as required

    // Create and append grid cells
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = randomGrid[i][j];
            gridContainer.appendChild(cell);
        }
    }

    gameArea.style.display = 'block';

    userInput.style.display = 'none'; 
    playButton.style.display = 'none';
    settingsButton.style.display = 'none';

    startCountdown(selectedTimer); // Start the countdown timer
}

function startCountdown(duration) {
    let timeRemaining = duration;
    const timerDisplay = document.getElementById('timer-display');
    const gridContainer = document.getElementById('grid-container'); // Ensure gridContainer is defined

    // Update the display immediately
    timerDisplay.textContent = `00:${String(timeRemaining).padStart(2, '0')}`;

    countdown = setInterval(() => {
        timeRemaining--; // Decrement the time remaining
        timerDisplay.textContent = `00:${String(timeRemaining).padStart(2, '0')}`; // Update timer display

        if (timeRemaining <= 0) {
            clearInterval(countdown); // Stop the countdown
            timerDisplay.textContent = "   "; // Optional: Display a message when time's up

            // Clear the numbers from the grid but keep the grid structure
            const cells = gridContainer.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.textContent = ''; // Clear the content of each cell
            });

            onTimerExpired(); // Call the function when the timer expires
        }
    }, 1000); // Update every second
}




/*---------------- Event Listeners ----------------*/
document.getElementById('game-settings-btn').addEventListener('click', showGameSettings);
document.getElementById('cancel-settings').addEventListener('click', hideGameSettings);
document.getElementById('save-settings').addEventListener('click', saveGameSettings);
document.querySelector('.play-button').addEventListener('click', startGame);
