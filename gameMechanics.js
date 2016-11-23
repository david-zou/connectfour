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
		if (currentPlayer == 1) {
			currentGrid[selectedColumn][position] = playerOne;
		}
		else {
			currentGrid[selectedColumn][position] = playerTwo;
		}
	}
	turn = alternateTurns(currentPlayer);
	return currentGrid;
}

var connectCheck = function(input) {
// stub function
}

var alternateTurns = function(currentTurn) {
	var playerOne = 0;
	var playerTwo = 1;
	if (currentTurn == playerOne) {
		return playerTwo;
	}
	return playerOne;
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

var testButton = function (currentGrid, selectedColumn, playerFlag) {
	var newGrid = insertDisc(currentGrid, selectedColumn,playerFlag);
	testPrint(newGrid);
}

var testPrint = function(inputGrid) {
	var height = inputGrid[0].length;
	var width = inputGrid.length;
	for (row=0; row < height; row++) {
		for (column=0; column < width; column++) {
			document.getElementById('mainGrid').innerHTML = inputGrid[column][row].toString() + " ";
			console.log(inputGrid[column][row]);
		}
		document.getElementById('mainGrid').innerHTML = "<br><br>";
	}
}