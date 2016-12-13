// Connect Four Test Script made from JS

// Global variables
var turn = 1;
var mainGrid = createGrid(6,7);

// Generate new empty board
printGrid(mainGrid);

document.write("<h3>Tracking Current Player Test:</h3>");
testCurrentPlayer();

document.write("<h3>Disc Insertion Test:</h3>");
testInsertion();

document.write("<h3>Player One Wins - Left Horizontal Check:</h3>");
testCheckLeftHoriz();

document.write("<h3>Player One Wins - Right Horizontal Check:</h3>");
testCheckRightHoriz();

document.write("<h3>Player One Wins - Vertical Check:</h3>");
testCheckVertical();

document.write("<h3>Player One Wins - Lower Right Diagonal Check:</h3>");
testCheckLowerRightDiag();

document.write("<h3>Player One Wins - Upper Left Diagonal Check:</h3>");
testCheckUpperLeftDiag();

document.write("<h3>Player One Wins - Upper Right Diagonal Check:</h3>");
testCheckUpperRightDiag();

document.write("<h3>Player One Wins - Lower Left Diagonal Check:</h3>");
testCheckLowerLeftDiag();