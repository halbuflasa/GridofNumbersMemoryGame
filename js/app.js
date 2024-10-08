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
let selectedCols = 0;   // Store the number of columns
let selectedRows = 0;   // Store the number of rows
let selectedTimer = 5;  // Default timer value
let randomGrid = [];    // Stores the randomly generated grid of numbers
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
    selectedRows = rows; // Store selected rows
    selectedCols = cols; // Store selected columns

    // Generate a random grid of numbers
    randomGrid = [];
    for (let i = 0; i < rows; i++) {
        randomGrid[i] = [];
        for (let j = 0; j < cols; j++) {
            randomGrid[i][j] = Math.floor(Math.random() * 21); // Generate a random number between 0 and 20
        }
    }

    // Display the grid
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

function onTimerExpired() {
    // Create a list of numbers from 0 to 20
    const numbersList = Array.from({ length: 21 }, (_, i) => i);

    // Create a new div element to display the numbers
    const numbersDisplay = document.createElement('div');
    numbersDisplay.className = 'numbers-display'; // Set the class for styling

    // Create boxes for each number and append them to the numbersDisplay
    numbersList.forEach(number => {
        const numberBox = document.createElement('div');
        numberBox.className = 'number-box'; // Set the class for individual number boxes
        numberBox.textContent = number; // Set the number as text content
        numberBox.setAttribute('draggable', true); // Make the number box draggable

        // Set up dragstart event for number boxes
        numberBox.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', numberBox.textContent); // Store the number being dragged
        });

        numbersDisplay.appendChild(numberBox); // Append the number box to the numbers display
    });

    // Insert the numbers display above the grid
    const gridContainer = document.getElementById('grid-container');
    gridContainer.parentNode.insertBefore(numbersDisplay, gridContainer);

    // Set up drag-and-drop for grid cells
    const gridCells = document.querySelectorAll('.cell');

    // Set up dragover and drop events for grid cells
    gridCells.forEach(cell => {
        cell.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop by preventing default behavior
        });
        cell.addEventListener('drop', (e) => {
            e.preventDefault(); // Prevent default behavior
            const number = e.dataTransfer.getData('text/plain'); // Get the dragged number
            cell.textContent = number; // Set the cell content to the dragged number
        });
    });

    // Create the "Check Answer" button
    const checkAnswerButton = document.createElement('button');
    checkAnswerButton.id = 'check-answer-btn'; // Set an ID for styling and reference
    checkAnswerButton.textContent = 'Check Answer'; // Set the button text

    // Add the button after the grid
    gridContainer.parentNode.appendChild(checkAnswerButton);

    // Set up the event listener for the "Check Answer" button
    checkAnswerButton.addEventListener('click', () => {
        checkAnswer(gridCells); // Call the function to check the user's answer
    });
}

// Function to check the user's answer against the original grid
function checkAnswer(gridCells) {
    let isCorrect = true;

    gridCells.forEach((cell, index) => {
        const row = Math.floor(index / selectedCols);  // Calculate row from index
        const col = index % selectedCols;              // Calculate column from index
        const originalNumber = randomGrid[row][col];   // Get the original number from randomGrid
        const userNumber = parseInt(cell.textContent, 10); // Get the number from the user's input

        if (userNumber === originalNumber) {
            cell.style.backgroundColor = 'green'; // Correct answer, highlight in green
        } else {
            cell.style.backgroundColor = 'red'; // Incorrect answer, highlight in red
            isCorrect = false;
        }
    });

    // Provide feedback based on the user's performance
    const messageContainer = document.getElementById('message-container');
    if (isCorrect) {
        messageContainer.textContent = 'Congratulations! You remembered all the numbers correctly!';
        messageContainer.style.color = 'green'; // Change text color to green
    } else {
        messageContainer.textContent = 'Some numbers were incorrect. Try again!';
        messageContainer.style.color = 'red'; // Change text color to red
    }
}

/*---------------- Event Listeners ----------------*/
document.getElementById('game-settings-btn').addEventListener('click', showGameSettings);
document.getElementById('cancel-settings').addEventListener('click', hideGameSettings);
document.getElementById('save-settings').addEventListener('click', saveGameSettings);
document.querySelector('.play-button').addEventListener('click', startGame);
