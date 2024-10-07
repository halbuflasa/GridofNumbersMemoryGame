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
let selectedTimer = 15; // Default timer value
let randomGrid = [];    // Stores the randomly generated grid of numbers
let userGrid = [];      // Stores the user's selected grid


/*----- Cached Element References  -----*/



/*-------------- Functions Section -------------*/

function showGameSettings() {
    const settingsSection = document.getElementById('game-settings');
    const playButton = document.querySelector('.play-button');
    const settingsButton = document.getElementById('game-settings-btn');
    settingsSection.style.display = 'block';

    // Hide Play and Settings buttons
    playButton.style.display = 'none';
    settingsButton.style.display = 'none';
}

function hideGameSettings() {
    const settingsSection = document.getElementById('game-settings');
    const playButton = document.querySelector('.play-button');
    const settingsButton = document.getElementById('game-settings-btn');
    // Hide settings section
    settingsSection.style.display = 'none';
    // Show Play and Settings buttons
    playButton.style.display = 'block';
    settingsButton.style.display = 'block';
}

function saveGameSettings() {
    const saveMessage = document.getElementById('save-message');

    // Optionally hide the settings section after saving
    const settingsSection = document.getElementById('game-settings');
    settingsSection.style.display = 'none';
    
    // Show Play and Settings buttons again
    const playButton = document.querySelector('.play-button');
    const settingsButton = document.getElementById('game-settings-btn');
    playButton.style.display = 'block';
    settingsButton.style.display = 'block';
}



/*---------------- Event Listeners ----------------*/

// Event listener for the settings button
document.getElementById('game-settings-btn').addEventListener('click', showGameSettings);
// Event listener for the cancel button
document.getElementById('cancel-settings').addEventListener('click', hideGameSettings);

// Event listener for the save button
document.getElementById('save-settings').addEventListener('click', saveGameSettings);


document.getElementById('playButton').addEventListener('click', startGame);
