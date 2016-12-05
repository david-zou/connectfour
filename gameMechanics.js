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
	var currentSumMainDiagonal = 1 + checkUpperLeftDiag(currentGrid, selectedColumn, currentPosition, currentPlayer, sum) + checkLowerRightDiag(currentGrid, selectedColumn, currentPosition, currentPlayer, sum);
    var currentSumAntiDiagonal = 1 + checkLowerLeftDiag(currentGrid, selectedColumn, currentPosition, currentPlayer, sum) + checkUpperRightDiag(currentGrid, selectedColumn, currentPosition, currentPlayer, sum);
	var currentSumVertical = 1 + checkVertical(currentGrid, selectedColumn, currentPosition, currentPlayer, sum);
	console.log("Current Sum - Horizontal:" + " " + currentSumHorizontal);
	console.log("Current Sum - Main Diagonal:" + " " + currentSumMainDiagonal);
	console.log("Current Sum - Anti Diagonal:" + " " + currentSumAntiDiagonal);
	console.log("Current Sum - Vertical:" + " " + currentSumVertical);
	if (currentSumHorizontal >= 4 || currentSumMainDiagonal >= 4 || currentSumAntiDiagonal >= 4 || currentSumVertical >= 4) {
		if (currentPlayer % 2 == 0) {
			alert ("Player Two Wins!");
		}
		else {
			alert ("Player One Wins!");
		}
		changeButtons();
	}
}

var checkLeftHoriz = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
	//console.log("Current Column of Left Horizontal:" + " " + selectedColumn);
	//console.log("Current Token for Left Horizontal:" + " " + currentGrid[selectedColumn][currentPosition]);
	if (selectedColumn == 0) return currentSum;
	var newColumn = selectedColumn - 1;
	//console.log("Next Column of Left Horizontal:" + " " + currentColumn);
	//console.log("Next Token for Left Horizontal:" + " " + currentGrid[currentColumn][currentPosition]);
	if ((newColumn >= 0) && (currentGrid[newColumn][currentRow] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkLeftHoriz(currentGrid, newColumn, currentRow, currentPlayer, newSum);
	}
	//console.log("Sum of Left Horizontal:" + " " + newSum);
	return newSum;
}

var checkRightHoriz = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
    var width = currentGrid.length;
    //console.log("Current Column of Right Horizontal:" + " " + selectedColumn);
    //console.log("Current Token for Right Horizontal:" + " " + currentGrid[selectedColumn][currentPosition]);
	if (selectedColumn == width - 1) return currentSum;
	var newColumn = selectedColumn + 1;
	//console.log("Next Column of Right Horizontal:" + " " + currentColumn);
	//console.log("Next Token for Right Horizontal:" + " " + currentGrid[currentColumn][currentPosition]);
	if ((newColumn < width) && (currentGrid[newColumn][currentRow] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkRightHoriz(currentGrid, newColumn, currentRow, currentPlayer, newSum);
	}
	//console.log("Sum of Right Horizontal:" + " " + newSum);
	return newSum;
}

var checkLowerLeftDiag = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
    var height = currentGrid[selectedColumn].length;
    var width = currentGrid.length;
    //console.log("Current Row of LowerLeftDiag:" + " " + currentRow);
    //console.log("Current Column of LowerLeftDiag:" + " " + selectedColumn);
    //console.log("Current Token for LowerLeftDiag:" + " " + checkPlayer(currentPlayer));
	if ((currentRow == height - 1) || (selectedColumn == 0)) {
	//	console.log("Hit LowerLeftDiag Max.");
		return newSum;
	}
	var newRow = currentRow + 1;
	var newColumn = selectedColumn - 1;
	//console.log("Next Row of LowerLeftDiag:" + " " + newRow);
	//console.log("Next Column of LowerLeftDiag:" + " " + newColumn);
	//console.log("Next Token for LowerLeftDiag:" + " " + currentGrid[newColumn][newRow]);
	if ((newRow < height) && (newColumn >= 0) && (currentGrid[newColumn][newRow] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkLowerLeftDiag(currentGrid, newColumn, newRow, currentPlayer, newSum);
	}
	//console.log("Sum of LowerLeftDiag:" + " " + newSum);
	return newSum;
}

var checkUpperLeftDiag = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
    var height = currentGrid[selectedColumn].length;
    var width = currentGrid.length;
    //console.log("Current Row of UpperLeftDiag:" + " " + currentRow);
    //console.log("Current Column of UpperLeftDiag:" + " " + selectedColumn);
    //console.log("Current Token for UpperLeftDiag:" + " " + checkPlayer(currentPlayer));
	if ((currentRow == 0) || (selectedColumn == 0)) {
	//	console.log("Hit UpperLeftDiag Max.");
		return newSum;
	}
	var newRow = currentRow - 1;
	var newColumn = selectedColumn - 1;
	//console.log("Next Row of UpperLeftDiag:" + " " + newRow);
	//console.log("Next Column of UpperLeftDiag:" + " " + newColumn);
	//console.log("Next Token for UpperLeftDiag:" + " " + currentGrid[newColumn][newRow]);
	if ((newRow < height) && (newColumn >= 0) && (currentGrid[newColumn][newRow] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkUpperLeftDiag(currentGrid, newColumn, newRow, currentPlayer, newSum);
	}
	//console.log("Sum of UpperLeftDiag:" + " " + newSum);
	return newSum;
}

var checkLowerRightDiag = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
    var height = currentGrid[selectedColumn].length;
    var width = currentGrid.length;
    //console.log("Current Row of LowerRightDiag:" + " " + currentRow);
    //console.log("Current Column of LowerRightDiag:" + " " + selectedColumn);
    //console.log("Current Token for LowerRightDiag:" + " " + checkPlayer(currentPlayer));
	if ((currentRow == height - 1) || (selectedColumn == width - 1)) {
	//	console.log("Hit LowerRightDiag Max.");
		return newSum;
	}
	var newRow = currentRow + 1;
	var newColumn = selectedColumn + 1;
	//console.log("Next Row of LowerRightDiag:" + " " + newRow);
	//console.log("Next Column of LowerRightDiag:" + " " + newColumn);
	//console.log("Next Token for LowerRightDiag:" + " " + currentGrid[newColumn][newRow]);
	if ((newRow < height) && (newColumn < width) && (currentGrid[newColumn][newRow] == checkPlayer(currentPlayer))) {
		newSum++;
	//	console.log("Adding to newSum in LowerRightDiag.");
		return checkLowerRightDiag(currentGrid, newColumn, newRow, currentPlayer, newSum);
	}
	//console.log("Sum of LowerRightDiag:" + " " + newSum);
	return newSum;
}

var checkUpperRightDiag = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
    var height = currentGrid[selectedColumn].length;
    var width = currentGrid.length;
    //console.log("Current Row of UpperRightDiag:" + " " + currentRow);
    //console.log("Current Column of UpperRightDiag:" + " " + selectedColumn);
    //console.log("Current Token for UpperRightDiag:" + " " + checkPlayer(currentPlayer));
	if ((currentRow == 0) || (selectedColumn == width - 1)) {
	//	console.log("Hit UpperRightDiag Max.");
		return newSum;
	}
	var newRow = currentRow - 1;
	var newColumn = selectedColumn + 1;
	//console.log("Next Row of UpperRightDiag:" + " " + newRow);
	//console.log("Next Column of UpperRightDiag:" + " " + newColumn);
	//console.log("Next Token for UpperRightDiag:" + " " + currentGrid[newColumn][newRow]);
	if ((newRow >= 0) && (newColumn < width) && (currentGrid[newColumn][newRow] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkUpperRightDiag(currentGrid, newColumn, newRow, currentPlayer, newSum);
	}
	//console.log("Sum of UpperRightDiag:" + " " + newSum);
	return newSum;
}

var checkVertical = function(currentGrid, selectedColumn, currentRow, currentPlayer, currentSum) {
	var newSum = currentSum;
    var height = currentGrid[selectedColumn].length;
    //console.log("Current Row of Vertical:" + " " + currentRow);
    //console.log("Current Token for Vertical:" + " " + checkPlayer(currentPlayer));
	if (currentRow == height - 1) return currentSum;
	var newRow = currentRow + 1;
	//console.log("Next Row of Vertical:" + " " + newRow);
	//console.log("Next Token for Vertical:" + " " + currentGrid[selectedColumn][newRow]);
	if ((newRow < height) && (currentGrid[selectedColumn][newRow] == checkPlayer(currentPlayer))) {
		newSum++;
		return checkVertical(currentGrid, selectedColumn, newRow, currentPlayer, newSum);
	}
	//console.log("Sum of Vertical:" + " " + newSum);
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

var testReset = function(currentGrid) {
	var height = currentGrid[0].length;
    var width = currentGrid.length;
	testGrid = createGrid(height,width);
	testPrint(testGrid, "mainGrid");
	turn = 1;
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