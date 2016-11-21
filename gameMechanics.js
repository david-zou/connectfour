<script>

var createGrid = function(height, width) {
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

</script>
