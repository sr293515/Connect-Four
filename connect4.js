/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped on a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */


function makeBoard() { // length which is width (left to right)
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++){
    board.push(Array.from({length: WIDTH}))
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board'); // Selecting the table element.
  // TODO: This is the code of the row that the player clicks.
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // Sets the id number from the for loop (0-6) depending the height. (index)
  for (var x = 0; x < WIDTH; x++) {
    var clickableRow = document.createElement("td");
    clickableRow.setAttribute("id", x); 
    top.append(clickableRow);
  }
  htmlBoard.append(top);

  // TODO:
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); // Left to Right
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td"); // Left to Right
      cell.setAttribute("id", `${y}-${x}`); // The ID is basically the location of the index. (height, width) => (y, x)
      row.append(cell); // Put the cell with the id (y - x) inside the row.
    }
    htmlBoard.append(row); // Put the row with the cell inside the htmlBoard
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
// Find available spot for column. If it is filled return null. So it wont be use and the player cant over run it.


// x is given when the player has click one of the cells. 
// then it checks if one of the columns are being used. 
// if yes it returns null, if not it uses it and put the div inside the cell.
function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) { // let y (column) represent the height. -1 because of the index.
    const yObject = board[y];
    const xValue = yObject[x];
    if(!xValue) { // If board does not include anything in the cell it uses it. If not it returns null when it's filled to the top.
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
// Each array is assign a value 
// 1 = red, 2 = blue
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`pieces-${currPlayer}`);

  
  let placement = document.getElementById( `${y}-${x}`)
  // place the piece in the id's y and x coming from the function that moves x and y.
  placement.append(piece)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id; // [0,1,2,3,4,5,6] these are x (left to right)
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return; // if none ignore click
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie Game!')
  }


  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1; // The Ternary Operator
  // If current player is not 1 change it to 2 if it's not 2 change it to 1.
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
