// Game Mechanics for the Connect Four Game

/*
promptBoardHeight() asks the user to designate the game board's height.
*/
var promptBoardHeight = function() {
	var answer = prompt("Please enter grid height between 5-26:", 6);
	if (isNaN(answer)) {
		alert("Not a number. Please enter grid height between 5-26.");
		return promptBoardHeight();
	}
	else if (answer > 26 || answer < 5) {
		alert("Number is not between 6-10.  Please try again.");
		return promptBoardHeight();
	}
	return answer;
}

/*
promptBoardWidth() asks the user to designate the game board's width.
*/
var promptBoardWidth = function() {
	var answer = prompt("Please enter grid width between 5-26:", 7);
	if (isNaN(answer)) {
		alert("Not a number. Please enter grid width between 5-26.");
		return promptBoardWidth();
	}
	else if (answer > 26 || answer < 5) {
		alert("Number is not between 7-10.  Please try again.");
		return promptBoardWidth();
	}
	return answer;
}

/* 
Global Constants and Variables
*/
const isEmpty = "<font color='gray'>E</font>"; // Game board token indicated empty space
const playerOne = "X"; // Game board token indicated Player One
const playerTwo = "<font color='red'>O</font>"; // Game board token indicated Player Two
const height = promptBoardHeight();
const width = promptBoardWidth();
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const gridName = "mainGrid";
var turn = 1;
var scorePlayerOne = 0;
var scorePlayerTwo = 0;
var mainGrid;

/*
createGrid() initializes the game board based on the height and width
the user designated in promptBoardHeight() and promptBoardWidth().
*/
var createGrid = function(height, width) {
	var grid = [width];
	for (column=0; column < width; column++) {
		grid[column]= [height];
	}
	for (column=0; column < width; column++) {
		for (row=0; row < height; row++) {
			grid[column][row] = isEmpty;
		}
	}
	return grid;
}

/*
printGrid() prints the most current game board
*/
var printGrid = function(inputGrid) {
	var token = "<font size='5'><pre>";
	var rowIndex = 0;
	for (row=0; row < height; row++) {
		for (column=0; column < width; column++) {
			if (rowIndex == width) {
				token += "<br><br>";
				rowIndex = 0;
			}
			token += inputGrid[column][row] + " ";
			rowIndex++;
		}
	}
	token += "</pre></font>";
	document.getElementById(gridName).innerHTML = token;
}

/*
currentPlayer() identifies the current Player based on the current turn number,
which is a global variable. It then returns the string token representing the
game piece corresponding to who the current player is during the game.
*/
var currentPlayer = function(currentTurn) {
	var token = playerOne;
	if (currentTurn % 2 == 0) {
		token = playerTwo;
	}
	return token;
}

/*
chooseButton() triggers when one of the column buttons is pressed by the current
player. It prints out the updated game board and updated turn.
*/
var chooseButton = function(currentGrid, selectedColumn, currentTurn) {
	var newGrid = insertDisc(currentGrid, selectedColumn, currentTurn);
	printGrid(newGrid, gridName);
	printTurn(turn);
}

/*
insertDisc() returns the updated game board with the current player's new game piece
inserted into one of the columns on the board.  At the end, winCheck and drawCheck
are both executed to see if the player's insertion triggers a win or draw.  If neither,
the game continues and advances to the next player's turn.
*/
var insertDisc = function(currentGrid, selectedColumn, currentTurn) {
	var position;
	var vacantRow = true;
	var currentRow = 0;
	for (currentRow = 0; vacantRow === true && currentRow < height; currentRow++) {
		if (currentGrid[selectedColumn][currentRow] === isEmpty) {
			position = currentRow;
		}
		else {
			vacantRow = false;
		}
	}
	if (position == null && vacantRow === false) {
		alert("This column is already filled, please try another column.");
	}
	else {
		currentGrid[selectedColumn][position] = currentPlayer(turn);
		turn++;
		winCheck(currentGrid, selectedColumn, position, currentPlayer);
		drawCheck(turn, height, width);
	}
	return currentGrid;
}

/*
drawCheck() checks for draw condition when the entire board is filled up
with no columns available.  This does not increase the score or either
players.
*/
var drawCheck = function(currentTurn, gridHeight, gridWidth) {
	if (currentTurn > (gridHeight * gridWidth)) {
		alert ("It's a draw!");
		disableButtons();
	}
}

/*
winCheck() checks for win conditions based on current player's game piece insertion.
It checks a total of 5 types of lines and 7 directions for at least 4 game pieces
consecutively connected.  If so, it triggers a score increase of 1 for the current
player and ends the game by disabling the buttons via disableButtons() to prevent
further advancement of the board.  If none of the win conditions are satisfied, the
game continues or hits drawCheck().
*/
var winCheck = function(currentGrid, selectedColumn, currentPosition, currentTurn) {
	var sum = 0;
	var currentSumHorizontal = 1 + checkLeftHoriz(currentGrid, selectedColumn, currentPosition, currentTurn, sum) + checkRightHoriz(currentGrid, selectedColumn, currentPosition, currentTurn, sum);
	var currentSumMainDiagonal = 1 + checkUpperLeftDiag(currentGrid, selectedColumn, currentPosition, currentTurn, sum) + checkLowerRightDiag(currentGrid, selectedColumn, currentPosition, currentTurn, sum);
	var currentSumAntiDiagonal = 1 + checkLowerLeftDiag(currentGrid, selectedColumn, currentPosition, currentTurn, sum) + checkUpperRightDiag(currentGrid, selectedColumn, currentPosition, currentTurn, sum);
	var currentSumVertical = 1 + checkVertical(currentGrid, selectedColumn, currentPosition, currentTurn, sum);
	if (currentSumHorizontal >= 4 || currentSumMainDiagonal >= 4 || currentSumAntiDiagonal >= 4 || currentSumVertical >= 4) {
		if (currentPlayer % 2 == 0) {
			alert ("Player Two Wins!");
			scorePlayerTwo++;
		}
		else {
			alert ("Player One Wins!");
			scorePlayerOne++;
		}
		disableButtons();
		printScore(scorePlayerOne, scorePlayerTwo);
	}
}

/*
resetGame() can be used to clear the board during or after the game.
If the buttons are disabled via disableButton() function, they
will be re-enabled using this function and the value of the reset
button will be changed back to 'Start Over' instead of 'Play Again!'
after a win or draw.  Buttons will appear to remain the same if used
during the middle of the game.
*/
var resetGame = function(currentGrid) {
	mainGrid = createGrid(height,width);
	printGrid(mainGrid, "mainGrid");
	turn = 1;
	printTurn(turn);
	document.getElementById("buttonA").disabled = false;
	document.getElementById("buttonB").disabled = false;
	document.getElementById("buttonC").disabled = false;
	document.getElementById("buttonD").disabled = false;
	document.getElementById("buttonE").disabled = false;
	document.getElementById("buttonF").disabled = false;
	document.getElementById("buttonG").disabled = false;
	document.getElementById("reset").value = "Start Over";	
}

/*
disableButton() is only used after a win or draw condition.
It disables the column selection buttons to prevent the
current player from advancing the board further and changes
the value of the reset button to 'Play Again!' instead of 'Start Over'.
*/
var disableButtons = function() {
	document.getElementById("buttonA").disabled = true;
	document.getElementById("buttonB").disabled = true;
	document.getElementById("buttonC").disabled = true;
	document.getElementById("buttonD").disabled = true;
	document.getElementById("buttonE").disabled = true;
	document.getElementById("buttonF").disabled = true;
	document.getElementById("buttonG").disabled = true;
	document.getElementById("reset").value = "Play Again!";	
}

/*
printScore() updates the Score Board
*/
var printScore = function(scorePlayerOne, scorePlayerTwo) {
	document.getElementById("scoreBoard").innerHTML = "<b>Score Board:</b><br>Player One:" + " " + scorePlayerOne + "<br><font color='red'>Player Two:" + " " + scorePlayerTwo + "</font><br>";
}

/*
printColumnMap() prints out a column map to help the user indicate each buttons to
the columns on the game board.
*/
var printColumnMap = function() {
	var map = "";
	for (letter = 0; letter < width; letter++) {
		map += alphabet.charAt(letter) + " ";
	}
	document.getElementById("columnMap").innerHTML = "<font size='5'><pre>" + map + "</pre></font>";
}

/*
printTurn() updates the Current Turn Indicator
*/
var printTurn = function(turn) {
	var declareTurn = "Player One (X)";
	if (turn % 2 == 0) {
		declareTurn = "<font color='red'>Player Two (O)</font>";
	}
	document.getElementById("currentTurn").innerHTML = "Current Turn:" + " " + declareTurn + " ";
}

/*
checkLeftHoriz() is part of the currentSumHorizontal check. It recursively adds up
the total number of the same game piece connected consecutively and horizontally to
each other on the direct left side of the currently designated game piece as indicated with
'selectedColumn'. 
*/
var checkLeftHoriz = function(currentGrid, selectedColumn, currentRow, currentTurn, currentSum) {
	var newSum = currentSum;
	if (selectedColumn == 0) {
		return currentSum;
	}
	var newColumn = selectedColumn - 1;
	if ((newColumn >= 0) && (currentGrid[newColumn][currentRow] === currentPlayer(currentTurn))) {
		newSum++;
		return checkLeftHoriz(currentGrid, newColumn, currentRow, currentTurn, newSum);
	}
	return newSum;
}

/*
checkRightHoriz() is part of the currentSumHorizontal check. It recursively adds up
the total number of the same game piece connected consecutively and horizontally to
each other on the direct right side of the currently designated game piece as indicated with
'selectedColumn'. 
*/
var checkRightHoriz = function(currentGrid, selectedColumn, currentRow, currentTurn, currentSum) {
	var newSum = currentSum;
	if (selectedColumn == width - 1) {
		return currentSum;
	}
	var newColumn = selectedColumn + 1;
	if ((newColumn < width) && (currentGrid[newColumn][currentRow] === currentPlayer(currentTurn))) {
		newSum++;
		return checkRightHoriz(currentGrid, newColumn, currentRow, currentTurn, newSum);
	}
	return newSum;
}

/*
checkLowerLeftDiag() is part of the currentSumAntiDiagonal check. It recursively adds up
the total number of the same game piece connected consecutively and anti-diagonally to
each other on the lower left side of the currently designated game piece as indicated with
'selectedColumn'. 
*/
var checkLowerLeftDiag = function(currentGrid, selectedColumn, currentRow, currentTurn, currentSum) {
	var newSum = currentSum;
	if ((currentRow == height - 1) || (selectedColumn == 0)) {
		return newSum;
	}
	var newRow = currentRow + 1;
	var newColumn = selectedColumn - 1;
	if ((newRow < height) && (newColumn >= 0) && (currentGrid[newColumn][newRow] === currentPlayer(currentTurn))) {
		newSum++;
		return checkLowerLeftDiag(currentGrid, newColumn, newRow, currentTurn, newSum);
	}
	return newSum;
}

/*
checkUpperLeftDiag() is part of the currentSumMainDiagonal check. It recursively adds up
the total number of the same game piece connected consecutively and main-diagonally to
each other on the upper left side of the currently designated game piece as indicated with
'selectedColumn'. 
*/
var checkUpperLeftDiag = function(currentGrid, selectedColumn, currentRow, currentTurn, currentSum) {
	var newSum = currentSum;
	if ((currentRow == 0) || (selectedColumn == 0)) {
		return newSum;
	}
	var newRow = currentRow - 1;
	var newColumn = selectedColumn - 1;
	if ((newRow < height) && (newColumn >= 0) && (currentGrid[newColumn][newRow] === currentPlayer(currentTurn))) {
		newSum++;
		return checkUpperLeftDiag(currentGrid, newColumn, newRow, currentTurn, newSum);
	}
	return newSum;
}

/*
checkLowerRightDiag() is part of the currentSumMainDiagonal check. It recursively adds up
the total number of the same game piece connected consecutively and main-diagonally to
each other on the lower right side of the currently designated game piece as indicated with
'selectedColumn'. 
*/
var checkLowerRightDiag = function(currentGrid, selectedColumn, currentRow, currentTurn, currentSum) {
	var newSum = currentSum;
	if ((currentRow == height - 1) || (selectedColumn == width - 1)) {
		return newSum;
	}
	var newRow = currentRow + 1;
	var newColumn = selectedColumn + 1;
	if ((newRow < height) && (newColumn < width) && (currentGrid[newColumn][newRow] === currentPlayer(currentTurn))) {
		newSum++;
		return checkLowerRightDiag(currentGrid, newColumn, newRow, currentTurn, newSum);
	}
	return newSum;
}

/*
checkUpperRightDiag() is part of the currentSumAntiDiagonal check. It recursively adds up
the total number of the same game piece connected consecutively and anti-diagonally to
each other on the upper right side of the currently designated game piece as indicated with
'selectedColumn'. 
*/
var checkUpperRightDiag = function(currentGrid, selectedColumn, currentRow, currentTurn, currentSum) {
	var newSum = currentSum;
	if ((currentRow == 0) || (selectedColumn == width - 1)) {
		return newSum;
	}
	var newRow = currentRow - 1;
	var newColumn = selectedColumn + 1;
	if ((newRow >= 0) && (newColumn < width) && (currentGrid[newColumn][newRow] === currentPlayer(currentTurn))) {
		newSum++;
		return checkUpperRightDiag(currentGrid, newColumn, newRow, currentTurn, newSum);
	}
	return newSum;
}

/*
checkVertical() is part of the currentSumVertical check. It recursively adds up
the total number of the same game piece connected consecutively and vertically to
each other directly below the currently designated game piece as indicated with
'selectedColumn'. 
*/
var checkVertical = function(currentGrid, selectedColumn, currentRow, currentTurn, currentSum) {
	var newSum = currentSum;
	if (currentRow == height - 1) {
		return currentSum;
	}
	var newRow = currentRow + 1;
	if ((newRow < height) && (currentGrid[selectedColumn][newRow] === currentPlayer(currentTurn))) {
		newSum++;
		return checkVertical(currentGrid, selectedColumn, newRow, currentTurn, newSum);
	}
	return newSum;
}

// Test Functions

var createTestGrid = function(height, width) {
	var grid = new Array(width);
	for (column = 0; column < width; column++) {
		grid[column]=new Array(height);
	}
	var number = 1;
	// Test: inserts number 1-(columnSize*rowSize) to each element in the '2D Array'
	for (column = 0; column < width; column++) {
		for (row = 0; row < height; row++) {
			grid[column][row] = number;
			number++;
		}
	}
	return grid;
}

var testDimensions = function(height, width) {
	var expectedHeight = height;
	var expectedWidth = width;
	var testGrid = createTestGrid(width,height);
	var resultHeight = testGrid.length;
	var resultWidth = testGrid[0].length;
	if (expectedHeight == resultHeight) {
		document.write("PASS DIMENSIONS HEIGHT TEST<br>");
	} else {
		document.write("FAIL DIMENSIONS HEIGHT TEST<br>");
	}
	if (expectedWidth == resultWidth) {
		document.write("PASS DIMENSIONS WIDTH TEST<br>");
	} else {
		document.write("FAIL DIMENSIONS WIDTH TEST<br>");
	}
}

var testInsertion = function(currentGrid, selectedColumn, playerFlag) {
	document.write("Before:<br>");
	testPrint(currentGrid);
	document.write("After:<br>");
	var newGrid = insertDisc(currentGrid, selectedColumn, playerFlag);
	testPrint(newGrid);
}

var testPrint = function(inputGrid) {
	var height = inputGrid[0].length;
	var width = inputGrid.length;
	for (row = 0; row < height; row++) {
		for (column = 0; column < width; column++) {
			document.write(inputGrid[column][row]+" ");
		}
		document.write("<br><br>");
	}
}