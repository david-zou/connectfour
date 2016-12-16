// Main file for Game UI. 
// Asks the user for board size, generates buttons and binds actions to them, empty game board, and score board.
printButtons();
assignButtons();
document.getElementById(resetButton).addEventListener("click", function() { resetGame(); } );
printScore(scorePlayerOne,scorePlayerTwo);
printTurn(turn);
printColumnMap();
printGrid(mainGrid);

