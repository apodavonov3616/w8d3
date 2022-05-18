// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let first_grid = []
  for (let i=0; i< 8; i++) {
    first_grid.push(new Array(8))
  }

  first_grid[3][4] = (new Piece("black"))
  first_grid[4][3] = (new Piece("black"))
  first_grid[3][3] = (new Piece("white"))
  first_grid[4][4] = (new Piece("white"))

  return first_grid;
}


/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
};

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  if (pos[0] >= 0 && pos[0] <= 7 && pos[1] >= 0 && pos[1] <= 7){
    return true
  }
  else {
    return false
  }
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (this.isValidPos(pos)) {
    return this.grid[pos[0]][pos[1]]
  } else {
    throw new Error('Not valid pos!')
  }
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (this.getPiece(pos) == undefined){ return false }
  if (this.getPiece(pos).color === color){
    return true
  }
  else {
    return false
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  if (this.getPiece(pos)){ return true}
  else {
    return false
  };
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 * 
 * piecesToFlip = []
 * return piecetoFlip = [] 
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */

Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip){
    if (!piecesToFlip ) { piecesToFlip = [] }
    else {piecesToFlip.push(pos);}
    let newPos = [pos[0]+dir[0], pos[1]+dir[1]];
    if (!this.isValidPos(newPos)) { return [] }
    else if (!this.isOccupied(newPos)){ return [] }
    else if (this.isMine(newPos, color)){ return piecesToFlip }
    else { return this._positionsToFlip(newPos, color, dir, piecesToFlip)}
  };

      
    //if pieces to flip doesnt exist, set it to []
    //if it does, lwave it
    //add dir +pos
    //call postitiontoflip with same pos and dir and color and new pieces to flip
    //base case is when pos.color pos is color
/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {

  if (this.isOccupied(pos)) { return false }

  for (let i=0; i < Board.DIRS.length; i++) {
    if ( this._positionsToFlip(pos, color, Board.DIRS[i]).length > 0 )  {
      return true
    }
  } 
  return false;
};

// this.grid[pos[0]][pos[1]] === color

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if ( !this.validMove(pos, color)){
    throw new Error('Invalid move!')
  };
  positionsToFlip = []
  for (let j = 0; j < Board.DIRS.length; j++){
    positionsToFlip = positionsToFlip.concat(
      this._positionsToFlip(pos, color, Board.DIRS[j])
    )
  };
  for (let i = 0; i < positionsToFlip.length; i++){
    this.getPiece(positionsToFlip[i]).flip();
  }
  this.grid[pos[0]][pos[1]] = new Piece(color);
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  const validPositions = [];
  for (let i=0; i< 8; i++) {
    for (let j=0; j< 8; j++) {
      if (this.validMove([i,j], color)){
        validPositions.push([i,j]);
      }
    }
  } 
  return validPositions;
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  if (this.validMoves(color).length > 0) {
    return true
  } else {
    return false
  }
};


/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  if (!this.hasMove("white") && (!this.hasMove("black"))){
    return true
  } else {
    return false
  }
};


/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};


// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE