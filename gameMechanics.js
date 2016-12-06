var createGrid = function(height, width) {
	var grid = new Array(width);
	for (column=0; column < width; column++) {
		grid[column]=new Array(height);
	}
	for (column=0; column < width; column++) {
		for (row=0; row < height; row++) {
			grid[column][row] = "<font color='gray'>E</font>";
		}
	}
	return grid;
}

var printGrid = function(inputGrid, gridName) {
	var height = inputGrid[0].length;
	var width = inputGrid.length;
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

var chooseButton = function (currentGrid, gridName, selectedColumn, playerFlag) {
	var newGrid = insertDisc(currentGrid, selectedColumn, playerFlag);
	printGrid(newGrid, gridName);
	printTurn(turn);
}

var insertDisc = function(currentGrid, selectedColumn, currentPlayer) {
	var height = currentGrid[selectedColumn].length;
	var width = currentGrid.length;
	var position = null;
	var isEmpty = "<font color='gray'>E</font>";
	var playerOne = "X";
    var playerTwo = "<font color='red'>O</font>";
	var vacantRow = true;
	for (currentRow=0; vacantRow == true && currentRow < height; currentRow++) {
		if (currentGrid[selectedColumn][currentRow] == isEmpty) {
			position = currentRow;
		}
		else {
			vacantRow = false;
		}
	}
	if (position == null && vacantRow == false) {
		alert("This column is already filled, please try another column.");
	}
	else {
		if (turn % 2 == 0) {
			currentGrid[selectedColumn][position] = playerTwo;
		}
		else {
			currentGrid[selectedColumn][position] = playerOne;
		}
		turn++;
		winCheck (currentGrid, selectedColumn, position, currentPlayer);
		checkDraw(turn, height, width);
	}
	return currentGrid;
}

var checkPlayer = function(currentPlayer) {
	var token = "X";
	if (currentPlayer % 2 == 0) {
		token = "<font color='red'>O</font>";
	}
	return token;
}

var checkDraw = function(currentTurn, gridHeight, gridWidth) {
	if (currentTurn > (gridHeight * gridWidth)) {
		alert ("It's a draw!");
		changeButtons();
	}
}

var winCheck = function(currentGrid, selectedColumn, currentPosition, currentPlayer) {
	var sum = 0;
	var currentSumHorizontal = 1 + checkLeftHoriz(currentGrid, selectedColumn, currentPosition, currentPlayer, sum) + checkRightHoriz(currentGrid, selectedColumn, currentPosition, currentPlayer, sum);
	var currentSumMainDiagonal = 1 + checkUpperLeftDiag(currentGrid, selectedColumn, currentPosition, currentPlayer, sum) + checkLowerRightDiag(currentGrid, selectedColumn, currentPosition, currentPlayer, sum);
    var currentSumAntiDiagonal = 1 + checkLowerLeftDiag(currentGrid, selectedColumn, currentPosition, currentPlayer, sum) + checkUpperRightDiag(currentGrid, selectedColumn, currentPosition, currentPlayer, sum);
	var currentSumVertical = 1 + checkVertical(currentGrid, selectedColumn, currentPosition, currentPlayer, sum);
	if (currentSumHorizontal >= 4 || currentSumMainDiagonal >= 4 || currentSumAntiDiagonal >= 4 || currentSumVertical >= 4) {
		if (currentPlayer % 2 == 0) {
			alert ("Player Two Wins!");
			scorePlayerTwo++;
		}
		else {
			alert ("Player One Wins!");
			scorePlayerOne++;
		}
		changeButtons();
		printScore(scorePlayerOne, scorePlayerTwo);
	}
}

var checkLeftHoriz = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
	if (selectedColumn == 0) return currentSum;
	var newColumn = selectedColumn - 1;
	if ((newColumn >= 0) && (currentGrid[newColumn][currentRow] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkLeftHoriz(currentGrid, newColumn, currentRow, currentPlayer, newSum);
	}
	return newSum;
}

var checkRightHoriz = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
    var width = currentGrid.length;
	if (selectedColumn == width - 1) return currentSum;
	var newColumn = selectedColumn + 1;
	if ((newColumn < width) && (currentGrid[newColumn][currentRow] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkRightHoriz(currentGrid, newColumn, currentRow, currentPlayer, newSum);
	}
	return newSum;
}

var checkLowerLeftDiag = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
    var height = currentGrid[selectedColumn].length;
    var width = currentGrid.length;
	if ((currentRow == height - 1) || (selectedColumn == 0)) {
		return newSum;
	}
	var newRow = currentRow + 1;
	var newColumn = selectedColumn - 1;
	if ((newRow < height) && (newColumn >= 0) && (currentGrid[newColumn][newRow] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkLowerLeftDiag(currentGrid, newColumn, newRow, currentPlayer, newSum);
	}
	return newSum;
}

var checkUpperLeftDiag = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
    var height = currentGrid[selectedColumn].length;
    var width = currentGrid.length;
	if ((currentRow == 0) || (selectedColumn == 0)) {
		return newSum;
	}
	var newRow = currentRow - 1;
	var newColumn = selectedColumn - 1;
	if ((newRow < height) && (newColumn >= 0) && (currentGrid[newColumn][newRow] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkUpperLeftDiag(currentGrid, newColumn, newRow, currentPlayer, newSum);
	}
	return newSum;
}

var checkLowerRightDiag = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
    var height = currentGrid[selectedColumn].length;
    var width = currentGrid.length;
	if ((currentRow == height - 1) || (selectedColumn == width - 1)) {
		return newSum;
	}
	var newRow = currentRow + 1;
	var newColumn = selectedColumn + 1;
	if ((newRow < height) && (newColumn < width) && (currentGrid[newColumn][newRow] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkLowerRightDiag(currentGrid, newColumn, newRow, currentPlayer, newSum);
	}
	return newSum;
}

var checkUpperRightDiag = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
    var height = currentGrid[selectedColumn].length;
    var width = currentGrid.length;
	if ((currentRow == 0) || (selectedColumn == width - 1)) {
		return newSum;
	}
	var newRow = currentRow - 1;
	var newColumn = selectedColumn + 1;
	if ((newRow >= 0) && (newColumn < width) && (currentGrid[newColumn][newRow] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkUpperRightDiag(currentGrid, newColumn, newRow, currentPlayer, newSum);
	}
	return newSum;
}

var checkVertical = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
    var height = currentGrid[selectedColumn].length;
	if (currentRow == height - 1) return currentSum;
	var newRow = currentRow + 1;
	if ((newRow < height) && (currentGrid[selectedColumn][newRow] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkVertical(currentGrid, selectedColumn, newRow, currentPlayer, newSum);
	}
	return newSum;
}

var resetGame = function(currentGrid) {
	var height = currentGrid[0].length;
    var width = currentGrid.length;
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

var changeButtons = function() {
	document.getElementById("buttonA").disabled = true;
	document.getElementById("buttonB").disabled = true;
	document.getElementById("buttonC").disabled = true;
	document.getElementById("buttonD").disabled = true;
	document.getElementById("buttonE").disabled = true;
	document.getElementById("buttonF").disabled = true;
	document.getElementById("buttonG").disabled = true;
	document.getElementById("reset").value = "Play Again!";	
}

var printScore = function(scorePlayerOne, scorePlayerTwo) {
	document.getElementById("scoreBoard").innerHTML = "<b>Score Board:</b><br>Player One:" + " " + scorePlayerOne + "<br><font color='red'>Player Two:" + " " + scorePlayerTwo + "</font><br>";
}

var printTurn = function (turn) {
	var declareTurn = "Player One (X)";
	if (turn % 2 == 0) {
		declareTurn = "<font color='red'>Player Two (O)</font>";
	}
	document.getElementById("currentTurn").innerHTML = "Current Turn:" + " " + declareTurn + " ";
}

// Test Functions

var createTestGrid = function(height, width) {
	var grid = new Array(width);
	for (column=0; column < width; column++) {
		grid[column]=new Array(height);
	}
	var number = 1;
	// Test: inserts number 1-(columnSize*rowSize) to each element in the '2D Array'
	for (column=0; column < width; column++) {
		for (row=0; row < height; row++) {
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

var testInsertion = function (currentGrid, selectedColumn, playerFlag) {
	document.write("Before:<br>");
	testPrint(currentGrid);
	document.write("After:<br>");
	var newGrid = insertDisc(currentGrid, selectedColumn, playerFlag);
	testPrint(newGrid);
}

var testPrint = function(inputGrid) {
	var height = inputGrid[0].length;
	var width = inputGrid.length;
	for (row=0; row < height; row++) {
		for (column=0; column < width; column++) {
			document.write(inputGrid[column][row]+" ");
		}
		document.write("<br><br>");
	}
}