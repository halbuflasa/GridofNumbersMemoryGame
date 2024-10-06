# Planning My Project

## Game Idea:
In this memory game, a grid of numbers will be displayed to the user for a set amount of time. After the grid disappears, the user must remember the order of the numbers and place them back in their correct positions. The game offers different grid sizes (levels) and timer adjustments to customize the challenge.

## User Stories:

1. **Landing Page**  
   As a user, I want to see a welcoming landing page that confirms I’m in the right place, setting the tone for the game experience.
   
2. **Game Settings Buttons**  
   As a user, I want to see clearly labeled buttons for “Game Levels,” “Adjust Timer,” and “Start” on the landing page, so I can easily configure my game settings before beginning.
   
3. **Game Level Selection**  
   As a user, I want to select from various game levels (e.g., 1x1, 1x2, 4x1, 2x2, 3x2, 4x2, 5x2, 4x3, 5x3, 5x4) and adjust the timer options (on/off, increase, or decrease), giving me flexibility to customize the difficulty of the game.
   
4. **Visual Confirmation of Selected Settings**  
   As a user, after selecting my game level and timer options, I want to see a visual confirmation of my choices before starting the game to ensure everything is set correctly.
   
5. **Memorization Phase**  
   As a user, I want to see the grid of numbers displayed in the correct order, along with a countdown timer, so I know how much time I have to memorize the grid.
   
6. **Recall Phase**  
   Once the timer runs out, I want to see an empty grid where I can recreate the original number sequence by dragging or selecting numbers from a list (0-20).
   
7. **Check My Answer**  
   As a user, I want a button that allows me to check if my selected grid matches the original number grid. If my answer is correct, I want to win the game.
   
8. **Feedback on Results**  
   As a user, I want my correct selections compared to the total grid numbers (e.g., ½ one is correct from the total) to be highlighted in green and receive a clear message indicating whether I won or lost the game.
   
9. **Display After Loss**  
   If I lose, I want to see the correct grid displayed alongside my choices, so I can immediately compare and understand where I went wrong.
   
10. **Play Again**  
    As a user, I want the option to start a new round and re-select game settings (Game Level and Timer) to improve my performance.


## Pseudocode

```pseudo
// Game Setup
User selects game settings:
  - Choose game level (grid size)
  - Adjust timer settings (increase/decrease time)

// IF user clicks "Start" THEN:
  - Generate a random grid of numbers (0-20) according to selected game level
  - Display the grid of numbers to the user
  - Start the countdown timer (Memorization phase)
  
// IF timer reaches zero THEN:
  - Hide the number grid
  - Display an empty grid for the user to fill
  - Show a list of numbers (0-20) for user selection
  - User drags/selects numbers from the list to the empty grid (recall phase)
  
// IF user clicks "Check Answers" THEN:
  - Compare the user's selected grid with the original grid
  - IF a number matches:
      - Highlight the correct number in green
  - ELSE:
      - Leave incorrect numbers unchanged
  
// Feedback on Results
  - IF all numbers match THEN:
      - Display "You Win" message
  - ELSE:
      - Display "You Lose" message
      - Show the correct grid alongside the user's grid for comparison
  
(End of Round)
// Display options for: reset game (same level), access game settings

```

## Browser Game Flow Pseudocode

``` pseudo
// Define constants for numbers in grid ranges
const NUMBERS = [0, 1, ..., 20];  // array 0-20

// Define constants for grid levels
const GRID_LEVELS = { 
    '1x1': 1, 
    '1x2': 2, 
    '4x1': 4, 
    '2x2': 4, 
    '3x2': 6, 
    '4x2': 8, 
    '5x2': 10, 
    '4x3': 12, 
    '5x3': 15, 
    '5x4': 20 
};

// Timer settings
const DEFAULT_TIMER = 15;  // seconds

// Define App State Variables
let selectedLevel;      // Stores the selected game level (grid size)
let selectedTimer;      // Stores the selected timer value
let randomGrid;         // Stores the randomly generated grid of numbers
let userGrid = [];      // Stores the user's selected grid
let correctGrid = [];   // Stores the correct numbers after user submits
let gameMessage;        // Stores the result of the game (win/lose)

// Cache DOM elements (gridContainer, timerDisplay, gameMessageDisplay, playAgainBtn)
// Cache buttons and controls for game settings (levelButtons, timerButtons, startButton, checkButton)

// Add event listeners for game settings
// Initialize the game state
// Render the settings (timer) and grid
// Start the game logic
// Generate random numbers for the grid
// Render the empty grid for user input
// Check user's answers
// Render the game results

// Reset game state for a new round
```

## Wire frame (UI drawings/plan)
![excalidraw](plan/Untitled-2024-10-01-0944.png)
<img src="plan/Untitled-2024-10-01-0944.png">
