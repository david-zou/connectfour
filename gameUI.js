// Ask the user for board size, generate new empty game board and score board
mainGrid = createGrid(height,width);
printScore(scorePlayerOne,scorePlayerTwo);
printTurn(turn);
printColumnMap();
printGrid(mainGrid);

// Assign actions to buttons

/*
var newButton = "";
for (column = 0; column < width; column++) {
	newButton = "button"+alphabet.charAt(column);
	document.getElementById(newButton).addEventListener("click", function() {
		chooseButton(mainGrid, column, turn); 
	});
}
*/

document.getElementById("buttonA").addEventListener("click", function() {
	chooseButton(mainGrid, 0, turn);
});

document.getElementById("buttonB").addEventListener("click", function() {
	chooseButton(mainGrid, 1, turn);
});

document.getElementById("buttonC").addEventListener("click", function() {
	chooseButton(mainGrid, 2, turn);
});

document.getElementById("buttonD").addEventListener("click", function() {
	chooseButton(mainGrid, 3, turn);
});

document.getElementById("buttonE").addEventListener("click", function() {
	chooseButton(mainGrid, 4, turn);
});

document.getElementById("buttonF").addEventListener("click", function() {
	chooseButton(mainGrid, 5, turn);
});

document.getElementById("buttonG").addEventListener("click", function() {
	chooseButton(mainGrid, 6, turn);
});

document.getElementById("reset").addEventListener("click", function() {
	resetGame(mainGrid);
});