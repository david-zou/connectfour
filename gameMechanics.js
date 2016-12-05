var createGrid = function(height, width) {
	var grid = new Array(width);
	for (column=0; column < width; column++) {
		grid[column]=new Array(height);
	}
	for (column=0; column < width; column++) {
		for (row=0; row < height; row++) {
			grid[column][row] = "E";
		}
	}
	return grid;
}

var printGrid = function(inputGrid) {
	var height = inputGrid[0].length;
	var width = inputGrid.length;
	for (row=0; row < height; row++) {
		for (column=0; column < width; column++) {
			document.write(inputGrid[column][row]+" ");
		}
		document.write("<br><br>");
	}
}

var insertDisc = function(currentGrid, selectedColumn, currentPlayer) {
	var height = currentGrid[selectedColumn].length;
	console.log("Current Height of Grid:" + " " + height);
	var width = currentGrid.length;
	console.log("Width of Grid:" + " " + width);
	var position = null;
	var isEmpty = "E";
	var playerOne = "X";
    var playerTwo = "O";
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
		//if (currentPlayer == 1) {
		if (turn % 2 == 0) {
		//	currentGrid[selectedColumn][position] = playerOne;
			currentGrid[selectedColumn][position] = playerTwo;
		}
		else {
		//	currentGrid[selectedColumn][position] = playerTwo;
			currentGrid[selectedColumn][position] = playerOne;
		}
	//turn = alternateTurns(currentPlayer);
		turn++;
		winCheck (currentGrid, selectedColumn, position, currentPlayer);
		checkDraw(turn, height, width);
	}
	return currentGrid;
}

var winCheck = function(currentGrid, selectedColumn, currentPosition, currentPlayer) {
	console.log("Current Player:" + " " + checkPlayer(currentPlayer));
	var sum = 0;
	var currentSumHorizontal = 1 + checkLeftHoriz(currentGrid, selectedColumn, currentPosition, currentPlayer, sum) + checkRightHoriz(currentGrid, selectedColumn, currentPosition, currentPlayer, sum);
    var currentSumDiagonal = 1 + checkLeftDiag(currentGrid, selectedColumn, currentPosition, currentPlayer, sum) + checkRightDiag(currentGrid, selectedColumn, currentPosition, currentPlayer, sum);
	var currentSumVertical = 1 + checkVertical(currentGrid, selectedColumn, currentPosition, currentPlayer, sum);
	console.log("Current Sum - Horizontal:" + " " + currentSumHorizontal);
	console.log("Current Sum - Diagonal:" + " " + currentSumDiagonal);
	console.log("Current Sum - Vertical:" + " " + currentSumVertical);
	if (currentSumHorizontal >= 4 || currentSumDiagonal >= 4 || currentSumVertical >= 4) {
		if (currentPlayer % 2 == 0) {
			alert ("Player Two Wins!");
		}
		else {
			alert ("Player One Wins!");
		}
	}
}

var checkLeftHoriz = function(currentGrid, selectedColumn, currentPosition, currentPlayer, currentSum) {
	var newSum = currentSum;
	console.log("Current Column of Left Horizontal:" + " " + selectedColumn);
	console.log("Current Token for Left Horizontal:" + " " + currentGrid[selectedColumn][currentPosition]);
	if (selectedColumn == 0) return currentSum;
	var currentColumn = selectedColumn - 1;
	console.log("Next Column of Left Horizontal:" + " " + currentColumn);
	console.log("Next Token for Left Horizontal:" + " " + currentGrid[currentColumn][currentPosition]);
	if ((currentColumn >= 0) && (currentGrid[currentColumn][currentPosition] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkLeftHoriz(currentGrid, currentColumn, currentPosition, currentPlayer, newSum);
	}
	console.log("Sum of Left Horizontal:" + " " + newSum);
	return newSum;
}

var checkRightHoriz = function(currentGrid, selectedColumn, currentPosition, currentPlayer, currentSum) {
	var newSum = currentSum;
    var width = currentGrid.length;
    console.log("Current Column of Right Horizontal:" + " " + selectedColumn);
    console.log("Current Token for Right Horizontal:" + " " + currentGrid[selectedColumn][currentPosition]);
	if (selectedColumn == width - 1) return currentSum;
	var currentColumn = selectedColumn + 1;
	console.log("Next Column of Right Horizontal:" + " " + currentColumn);
	console.log("Next Token for Right Horizontal:" + " " + currentGrid[currentColumn][currentPosition]);
	if ((currentColumn < width) && (currentGrid[currentColumn][currentPosition] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkRightHoriz(currentGrid, currentColumn, currentPosition, currentPlayer, newSum);
	}
	console.log("Sum of Right Horizontal:" + " " + newSum);
	return newSum;
}

var checkLeftDiag = function(currentGrid, selectedColumn, currentPosition, currentPlayer, currentSum) {
	var sum = 0;
	return sum;
}

var checkRightDiag = function(currentGrid, selectedColumn, currentPosition, currentPlayer, currentSum) {
	var sum = 0;
	return sum;
}

var checkVertical = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
    var height = currentGrid[selectedColumn].length;
    console.log("Current Row of Vertical:" + " " + currentRow);
    console.log("Current Token for Vertical:" + " " + checkPlayer(currentPlayer));
	if (currentRow == height - 1) return currentSum;
	var newRow = currentRow + 1;
	console.log("Next Row of Vertical:" + " " + newRow);
	console.log("Next Token for Vertical:" + " " + currentGrid[selectedColumn][newRow]);
	if ((newRow < height) && (currentGrid[selectedColumn][newRow] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkVertical(currentGrid, selectedColumn, newRow, currentPlayer, newSum);
	}
	console.log("Sum of Vertical:" + " " + newSum);
	return newSum;
}

var alternateTurns = function(currentTurn) {
	var playerOne = 0;
	var playerTwo = 1;
	if (currentTurn == playerOne) {
		return playerTwo;
	}
	return playerOne;
}

var checkPlayer = function(currentPlayer) {
	var token = "X";
	if (currentPlayer % 2 == 0) {
		token = "O";
	}
	return token;
}

var checkDraw = function(currentTurn, gridHeight, gridWidth) {
	if (currentTurn > (gridHeight * gridWidth)) {
		alert ("It's a draw!");
		// Insert reset function here
	}
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
	printGrid(currentGrid);
	document.write("After:<br>");
	var newGrid = insertDisc(currentGrid, selectedColumn, playerFlag);
	printGrid(newGrid);
}

var testButton = function (currentGrid, gridName, selectedColumn, playerFlag) {
	var newGrid = insertDisc(currentGrid, selectedColumn, playerFlag);
	testPrint(newGrid, gridName);
}

var testPrint = function(inputGrid, gridName) {
	var height = inputGrid[0].length;
	var width = inputGrid.length;
	var token = "";
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
	document.getElementById(gridName).innerHTML = token;
}