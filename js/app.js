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

/*---------- Variables (state) -----------------------------------------------------------------------------------*/
let selectedLevel = ''; // Stores the selected game level (grid size)
let selectedCols = 0;   // Store the number of columns
let selectedRows = 0;   // Store the number of rows
let selectedTimer = 5;  // Default timer value
let randomGrid = [];    // Stores the randomly generated grid of numbers
let countdown;         

/*----- Cached Element References  --------------------------------------------------------------------------------*/
const playButton = document.querySelector('.play-button');
const settingsButton = document.getElementById('game-settings-btn');
const settingsSection = document.getElementById('game-settings');
const saveMessage = document.getElementById('save-message');
const gridContainer = document.getElementById('grid-container');
const gameArea = document.getElementById('game-area');
const userInput = document.getElementById('user-input');
const PlayAgainButton = document.getElementById('play-again');

/*-------------- Functions Section ------------------------------------------------------------------------------*/

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
    // Store the selected level and other settings
    selectedLevel = selectedLevel; // Already stored in step 1
    selectedTimer = parseInt(document.querySelector('.timer-btn.selected').getAttribute('data-timer')); // Store the selected timer

    // Hide the settings section
    settingsSection.style.display = 'none';
    playButton.style.display = 'block';
    settingsButton.style.display = 'block';
}
function startGame() {
        // Check if a level is selected
        if (selectedLevel) {
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
    else{  // Randomly select a level
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
    checkAnswerButton.style.display = "none"; // Initially hidden
    // Add the button after the grid
    document.getElementById("button-container").appendChild(checkAnswerButton);

   
    checkAnswerButton.style.display = "block";

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
    PlayAgainButton.style.display= 'Block';
    PlayAgainButton.addEventListener('click',  () => {
        RestartGame(); 
    });
}
function RestartGame() {
    // Clear the grid container
    gridContainer.innerHTML = '';

    // Clear the numbers display (if any)
    const numbersDisplay = document.querySelector('.numbers-display');
    if (numbersDisplay) {
        numbersDisplay.remove();
    }

    // Clear the check answer button
    const checkAnswerButton = document.getElementById('check-answer-btn');
    if (checkAnswerButton) {
        checkAnswerButton.remove();
    }

    // Clear feedback messages
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = '';

    // Hide the "Play Again" button
    PlayAgainButton.style.display = 'none';

    // Reset game state variables
    selectedRows = 0;
    selectedCols = 0;
    randomGrid = [];
    clearInterval(countdown); // Clear the timer if it's running

    // Keep the selected level
    // Do not reset selectedLevel variable

    // Optionally restart the game or show the play button again
    playButton.style.display = 'block';
    settingsButton.style.display = 'block';
    gameArea.style.display = 'none'; // Hide the game area until a new game starts
}

/*---------------- Event Listeners --------------------------------------------------------------------------------------------------*/
document.getElementById('game-settings-btn').addEventListener('click', showGameSettings);
document.getElementById('cancel-settings').addEventListener('click', hideGameSettings);
document.getElementById('save-settings').addEventListener('click', saveGameSettings);
document.querySelector('.play-button').addEventListener('click', startGame);


document.querySelectorAll('.level-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove the styles from all level buttons
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.style.background = 'transparent';
            btn.style.color = 'rgba(241, 196, 15, 1.0)';
        });

        // Add the styles to the clicked button
        button.style.background = 'rgba(241, 196, 15, 1.0)';
        button.style.color = 'black';

        selectedLevel = button.getAttribute('data-level');
    });
});


document.querySelectorAll('.timer-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove the styles from all timer buttons
        document.querySelectorAll('.timer-btn').forEach(btn => {
            btn.style.background = 'transparent';
            btn.style.color = 'rgba(241, 196, 15, 1.0)';
            btn.classList.remove('selected');
        });

        // Add the styles to the clicked button
        button.style.background = 'rgba(241, 196, 15, 1.0)';
        button.style.color = 'black';
        button.classList.add('selected');
    });
});


document.getElementById('game-instructions-btn').addEventListener('click', () => {
    const instructionsSection = document.getElementById('game-instructions');
    if (instructionsSection.style.display === 'none') {
        instructionsSection.style.display = 'block';
    } else {
        instructionsSection.style.display = 'none';
    }
});