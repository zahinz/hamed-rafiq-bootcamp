console.log("pacman");

// Get DOM elements
const pacman = document.querySelector("#pacman");
const ghostRed = document.querySelector("#ghost-red");
const ghostPink = document.querySelector("#ghost-pink");
const ghostBrown = document.querySelector("#ghost-brown");
const gameField = document.querySelector("#gamefield");
const scoreElement = document.querySelector("#score");
const timerElement = document.querySelector("#timer");
const gameOverModal = document.querySelector("#gameOverModal");
const finalScoreElement = document.querySelector("#finalScore");
const finalTimeElement = document.querySelector("#finalTime");
const timeBonusElement = document.querySelector("#timeBonus");
const playAgainBtn = document.querySelector("#playAgainBtn");

// Controller buttons
const upButton = document.querySelector("#up");
const downButton = document.querySelector("#down");
const leftButton = document.querySelector("#left");
const rightButton = document.querySelector("#right");

// Game field boundaries
const GAME_FIELD_SIZE = 800;
const SPRITE_SIZE = 100;
const MOVE_DISTANCE = 100;
const MAX_POSITION = GAME_FIELD_SIZE - SPRITE_SIZE;

// Pacman position variables
let pacmanPositionLeft = 0;
let pacmanPositionTop = 0;

// Ghost position variables
let ghostRedPosition = { left: MAX_POSITION, top: 0 };
let ghostPinkPosition = { left: 0, top: MAX_POSITION };
let ghostBrownPosition = { left: MAX_POSITION, top: MAX_POSITION };

// Ghost state tracking (for intelligent movement after flipping)
let ghostRedState = { lastAction: null, shouldMoveDirection: null };
let ghostPinkState = { lastAction: null, shouldMoveDirection: null };
let ghostBrownState = { lastAction: null, shouldMoveDirection: null };

// Game state
let score = 0;
let beads = [];
let gameRunning = true;
let ghostMoverInterval;
let gameTimerInterval;
let startTime;
let elapsedTime = 0;

// Movement functions for Pacman
function movePacmanUp() {
  if (!gameRunning) return;

  console.log("UP!");
  pacman.style.transform = "rotate(-90deg)";

  if (pacmanPositionTop <= 0) {
    console.log("Pacman is at the top edge, cannot move up");
    return;
  }

  pacmanPositionTop -= MOVE_DISTANCE;
  pacman.style.top = pacmanPositionTop + "px";
  logPacmanPosition();
}

function movePacmanDown() {
  if (!gameRunning) return;

  console.log("DOWN!");
  pacman.style.transform = "rotate(90deg)";

  if (pacmanPositionTop >= MAX_POSITION) {
    console.log("Pacman is at the bottom edge, cannot move down");
    return;
  }

  pacmanPositionTop += MOVE_DISTANCE;
  pacman.style.top = pacmanPositionTop + "px";
  logPacmanPosition();
}

function movePacmanLeft() {
  if (!gameRunning) return;

  console.log("LEFT!");
  pacman.style.transform = "rotate(180deg)";

  if (pacmanPositionLeft <= 0) {
    console.log("Pacman is at the left edge, cannot move left");
    return;
  }

  pacmanPositionLeft -= MOVE_DISTANCE;
  pacman.style.left = pacmanPositionLeft + "px";
  logPacmanPosition();
}

function movePacmanRight() {
  if (!gameRunning) return;

  console.log("RIGHT!");
  pacman.style.transform = "rotate(0deg)";

  if (pacmanPositionLeft >= MAX_POSITION) {
    console.log("Pacman is at the right edge, cannot move right");
    return;
  }

  pacmanPositionLeft += MOVE_DISTANCE;
  pacman.style.left = pacmanPositionLeft + "px";
  logPacmanPosition();
}

function logPacmanPosition() {
  console.log("Pacman position:", pacmanPositionLeft, pacmanPositionTop);
  checkBeadCollision();
  checkGhostCollision();
}

// Bead system functions
function createBeads() {
  beads = []; // Clear existing beads

  // Create beads in a grid pattern (skip positions where ghosts and pacman start)
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const x = col * MOVE_DISTANCE;
      const y = row * MOVE_DISTANCE;

      // Skip positions where characters start (pacman and ghosts)
      const isPacmanStart = x === 0 && y === 0;
      const isGhostRedStart = x === MAX_POSITION && y === 0;
      const isGhostPinkStart = x === 0 && y === MAX_POSITION;
      const isGhostBrownStart = x === MAX_POSITION && y === MAX_POSITION;

      if (
        !isPacmanStart &&
        !isGhostRedStart &&
        !isGhostPinkStart &&
        !isGhostBrownStart
      ) {
        createBead(x, y);
      }
    }
  }

  console.log(`Created ${beads.length} beads`);
}

function createBead(x, y) {
  const bead = document.createElement("div");
  bead.className = "bead";
  bead.style.left = x + 45 + "px"; // Center bead in grid cell
  bead.style.top = y + 45 + "px"; // Center bead in grid cell
  bead.dataset.x = x;
  bead.dataset.y = y;

  gameField.appendChild(bead);
  beads.push({ element: bead, x: x, y: y });
}

function checkBeadCollision() {
  for (let i = beads.length - 1; i >= 0; i--) {
    const bead = beads[i];

    // Check if pacman is at the same position as the bead
    if (bead.x === pacmanPositionLeft && bead.y === pacmanPositionTop) {
      // Remove bead from DOM
      bead.element.remove();

      // Remove bead from array
      beads.splice(i, 1);

      // Update score
      score += 10;
      scoreElement.textContent = `Score: ${score}`;

      console.log(`Bead eaten! Score: ${score}`);

      // Check if all beads are eaten
      if (beads.length === 0) {
        console.log("All beads eaten! You win!");
        gameOver("Congratulations! You ate all the beads!", true);
      }
    }
  }
}

// Ghost collision detection
function checkGhostCollision() {
  const allGhostPositions = [
    ghostRedPosition,
    ghostPinkPosition,
    ghostBrownPosition,
  ];

  for (let ghostPos of allGhostPositions) {
    if (
      ghostPos.left === pacmanPositionLeft &&
      ghostPos.top === pacmanPositionTop
    ) {
      console.log("Ghost collision detected! Game Over!");
      gameOver("You were caught by a ghost!", false);
      return;
    }
  }
}

// Timer functions
function startTimer() {
  startTime = Date.now();
  elapsedTime = 0;
  gameTimerInterval = setInterval(updateTimer, 100);
}

function updateTimer() {
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  timerElement.textContent = `Time: ${elapsedTime}s`;
}

function stopTimer() {
  clearInterval(gameTimerInterval);
}

function calculateTimeBonus(won) {
  if (!won) return 0;

  // Time bonus calculation: Max 1000 points for completing under 30 seconds
  // Decreases as time increases
  const maxBonusTime = 30; // seconds
  const maxBonus = 1000;

  if (elapsedTime <= maxBonusTime) {
    return Math.floor((maxBonus * (maxBonusTime - elapsedTime)) / maxBonusTime);
  }

  // Small bonus even for longer completion times
  return Math.max(0, Math.floor(500 - (elapsedTime - maxBonusTime) * 10));
}

// Game over function
function gameOver(message, won = false) {
  gameRunning = false;
  stopTimer();
  clearInterval(ghostMoverInterval);

  const timeBonus = calculateTimeBonus(won);
  const finalScore = score + timeBonus;

  finalScoreElement.textContent = `Your Score: ${finalScore}`;
  finalTimeElement.textContent = `Total Time: ${elapsedTime}s`;
  timeBonusElement.textContent = `Time Bonus: +${timeBonus}`;
  document.querySelector("#gameOverMessage").textContent = message;
  gameOverModal.style.display = "block";

  console.log(
    `Game Over! Base Score: ${score}, Time Bonus: ${timeBonus}, Final Score: ${finalScore}`
  );
}

// Reset game function
function resetGame() {
  // Reset game state
  gameRunning = true;
  score = 0;
  elapsedTime = 0;
  scoreElement.textContent = "Score: 0";
  timerElement.textContent = "Time: 0s";

  // Reset Pacman position
  pacmanPositionLeft = 0;
  pacmanPositionTop = 0;
  pacman.style.left = "0px";
  pacman.style.top = "0px";
  pacman.style.transform = "rotate(0deg)";

  // Reset ghost positions
  ghostRedPosition = { left: MAX_POSITION, top: 0 };
  ghostPinkPosition = { left: 0, top: MAX_POSITION };
  ghostBrownPosition = { left: MAX_POSITION, top: MAX_POSITION };

  ghostRed.style.left = MAX_POSITION + "px";
  ghostRed.style.top = "0px";
  ghostRed.style.transform = "scaleX(1)";

  ghostPink.style.left = "0px";
  ghostPink.style.top = MAX_POSITION + "px";
  ghostPink.style.transform = "scaleX(1)";

  ghostBrown.style.left = MAX_POSITION + "px";
  ghostBrown.style.top = MAX_POSITION + "px";
  ghostBrown.style.transform = "scaleX(1)";

  // Reset ghost states
  ghostRedState = { lastAction: null, shouldMoveDirection: null };
  ghostPinkState = { lastAction: null, shouldMoveDirection: null };
  ghostBrownState = { lastAction: null, shouldMoveDirection: null };

  // Clear existing beads from DOM
  beads.forEach((bead) => bead.element.remove());

  // Recreate beads
  createBeads();

  // Hide modal
  gameOverModal.style.display = "none";

  // Restart timers and ghost movement
  startTimer();
  ghostMoverInterval = setInterval(moveAllGhosts, 500);

  console.log("Game reset! New game started.");
}

// Keyboard event listener
document.addEventListener("keydown", function (event) {
  let key = event.key;

  switch (key) {
    case "ArrowUp":
      movePacmanUp();
      break;
    case "ArrowDown":
      movePacmanDown();
      break;
    case "ArrowLeft":
      movePacmanLeft();
      break;
    case "ArrowRight":
      movePacmanRight();
      break;
    default:
      console.log("Unknown key pressed:", key);
  }
});

// Mouse click event listeners for controller buttons
upButton.addEventListener("click", movePacmanUp);
downButton.addEventListener("click", movePacmanDown);
leftButton.addEventListener("click", movePacmanLeft);
rightButton.addEventListener("click", movePacmanRight);

// Ghost movement functions
function getRandomDirection() {
  const directions = ["up", "down", "left", "right"];
  return directions[Math.floor(Math.random() * directions.length)];
}

function isPositionOccupied(newLeft, newTop, currentGhostPosition) {
  const allGhostPositions = [
    ghostRedPosition,
    ghostPinkPosition,
    ghostBrownPosition,
  ];

  for (let ghostPos of allGhostPositions) {
    // Skip checking against the current ghost's position
    if (ghostPos === currentGhostPosition) {
      continue;
    }

    // Check if the new position would overlap with this ghost
    if (ghostPos.left === newLeft && ghostPos.top === newTop) {
      return true;
    }
  }

  return false;
}

function getValidDirections(position) {
  const validDirections = [];

  // Check each direction to see if it's valid (not hitting walls or other ghosts)

  // Check UP
  const newTopUp = Math.max(0, position.top - MOVE_DISTANCE);
  if (
    newTopUp !== position.top &&
    !isPositionOccupied(position.left, newTopUp, position)
  ) {
    validDirections.push("up");
  }

  // Check DOWN
  const newTopDown = Math.min(MAX_POSITION, position.top + MOVE_DISTANCE);
  if (
    newTopDown !== position.top &&
    !isPositionOccupied(position.left, newTopDown, position)
  ) {
    validDirections.push("down");
  }

  // Check LEFT (for actual movement)
  const newLeftLeft = Math.max(0, position.left - MOVE_DISTANCE);
  if (
    newLeftLeft !== position.left &&
    !isPositionOccupied(newLeftLeft, position.top, position)
  ) {
    validDirections.push("move-left");
  }

  // Check RIGHT (for actual movement)
  const newLeftRight = Math.min(MAX_POSITION, position.left + MOVE_DISTANCE);
  if (
    newLeftRight !== position.left &&
    !isPositionOccupied(newLeftRight, position.top, position)
  ) {
    validDirections.push("move-right");
  }

  // Always include flip directions as valid (they don't change position)
  validDirections.push("flip-left", "flip-right");

  return validDirections;
}

function getGhostState(ghostName) {
  switch (ghostName) {
    case "Red Ghost":
      return ghostRedState;
    case "Pink Ghost":
      return ghostPinkState;
    case "Brown Ghost":
      return ghostBrownState;
    default:
      return null;
  }
}

function moveGhost(ghost, position, ghostName) {
  const ghostState = getGhostState(ghostName);

  // Get only valid directions for this ghost
  const validDirections = getValidDirections(position);

  if (validDirections.length === 0) {
    console.log(`${ghostName} has no valid moves - staying in place`);
    ghostState.lastAction = "blocked";
    ghostState.shouldMoveDirection = null;
    return;
  }

  let direction;

  // If ghost should move in a specific direction after flipping, prioritize that
  if (
    ghostState.shouldMoveDirection &&
    validDirections.includes(ghostState.shouldMoveDirection)
  ) {
    direction = ghostState.shouldMoveDirection;
    ghostState.shouldMoveDirection = null; // Clear the forced direction
    console.log(`${ghostName} moving in committed direction: ${direction}`);
  } else {
    // If last action was flip, don't allow another flip - force movement
    let availableDirections = validDirections;
    if (ghostState.lastAction === "flip") {
      // Remove flip options if ghost just flipped
      availableDirections = validDirections.filter(
        (d) => !d.startsWith("flip-")
      );
      if (availableDirections.length === 0) {
        // If only flip directions available, allow them
        availableDirections = validDirections;
      }
    }

    // Randomly select from available directions
    direction =
      availableDirections[
        Math.floor(Math.random() * availableDirections.length)
      ];
  }

  // Handle ghost orientation for horizontal directions (flip in place)
  if (direction === "flip-left") {
    ghost.style.transform = "scaleX(-1)"; // Flip to face left
    console.log(`${ghostName} flipped to face left - will move left next`);
    ghostState.lastAction = "flip";
    ghostState.shouldMoveDirection = "move-left"; // Commit to moving left next time
    return; // Exit without changing position
  } else if (direction === "flip-right") {
    ghost.style.transform = "scaleX(1)"; // Face right (normal)
    console.log(`${ghostName} flipped to face right - will move right next`);
    ghostState.lastAction = "flip";
    ghostState.shouldMoveDirection = "move-right"; // Commit to moving right next time
    return; // Exit without changing position
  }

  // Handle actual movement
  let newLeft = position.left;
  let newTop = position.top;

  switch (direction) {
    case "up":
      newTop = Math.max(0, position.top - MOVE_DISTANCE);
      break;
    case "down":
      newTop = Math.min(MAX_POSITION, position.top + MOVE_DISTANCE);
      break;
    case "move-left":
      newLeft = Math.max(0, position.left - MOVE_DISTANCE);
      ghost.style.transform = "scaleX(-1)"; // Flip to face left while moving
      break;
    case "move-right":
      newLeft = Math.min(MAX_POSITION, position.left + MOVE_DISTANCE);
      ghost.style.transform = "scaleX(1)"; // Face right (normal) while moving
      break;
  }

  // Update position object
  position.left = newLeft;
  position.top = newTop;

  // Apply CSS position changes
  ghost.style.left = newLeft + "px";
  ghost.style.top = newTop + "px";

  // Update ghost state
  ghostState.lastAction = "move";
  ghostState.shouldMoveDirection = null;

  console.log(`${ghostName} moved ${direction} to position:`, newLeft, newTop);
}

function moveAllGhosts() {
  if (!gameRunning) return;

  moveGhost(ghostRed, ghostRedPosition, "Red Ghost");
  moveGhost(ghostPink, ghostPinkPosition, "Pink Ghost");
  moveGhost(ghostBrown, ghostBrownPosition, "Brown Ghost");

  // Check for collisions after all ghosts have moved
  checkGhostCollision();
}

// Initialize game
createBeads();
startTimer();

// Start ghost movement - move every 0.5 seconds
ghostMoverInterval = setInterval(moveAllGhosts, 500);

// Play again button event listener
playAgainBtn.addEventListener("click", resetGame);

// Initial log
console.log(
  "Game initialized! Use arrow keys or click buttons to move Pacman."
);
console.log("Ghosts will move randomly every 0.5 seconds.");
console.log("Collect all the yellow beads to win!");
