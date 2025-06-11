console.log("pacman");

// get the DOM pacman element
const pacman = document.querySelector("#pacman");

// variable to keep track of the pacman's position
let positionLeft = 0;
let positionTop = 0;

// keyboard events
document.addEventListener("keydown", function (event) {
  // DETERMINE THE KEY PRESSED
  let key = event.key;
  // stop the pacman from moving outside the gamefield
  if (key === "ArrowUp") {
    console.log("UP!");
    //   change the orientation of the pacman to up
    pacman.style.transform = "rotate(-90deg)";
    //   move the pacman up
    if (positionTop <= 0) {
      console.log("Pacman is at the top edge, cannot move up");
      // return to prevent further execution
      return;
    }
    positionTop = positionTop - 100;
    pacman.style.top = positionTop + "px";
  } else if (key === "ArrowDown") {
    console.log("DOWN!");
    // change the orientation of the pacman to down
    pacman.style.transform = "rotate(90deg)";
    //   move the pacman down
    if (positionTop >= 700) {
      console.log("Pacman is at the bottom edge, cannot move down");
      // return to prevent further execution
      return;
    }
    positionTop = positionTop + 100;
    pacman.style.top = positionTop + "px";
  } else if (key === "ArrowLeft") {
    console.log("LEFT!");
    // change the orientation of the pacman to left
    pacman.style.transform = "rotate(180deg)";
    //   move the pacman to the left
    if (positionLeft <= 0) {
      console.log("Pacman is at the left edge, cannot move left");
      // return to prevent further execution
      return;
    }
    positionLeft = positionLeft - 100;
    pacman.style.left = positionLeft + "px";
  } else if (key === "ArrowRight") {
    console.log("RIGHT!");
    // change the orientation of the pacman to right
    pacman.style.transform = "rotate(0deg)";
    //   move the pacman to the right
    if (positionLeft >= 700) {
      console.log("Pacman is at the right edge, cannot move right");
      // return to prevent further execution
      return;
    }
    positionLeft = positionLeft + 100;
    pacman.style.left = positionLeft + "px";
  } else {
    console.log("Unknown key pressed");
  }
  console.log("Pacman position:", positionLeft, positionTop);
});
// document.addEventListener("keyup", function () {
//   console.log("UP!");
// });

// HOMEWORK
// study the event listener for the mouse click and execute same logic as keyboard events
// create 3 ghosts and move them randomly
