class Jubiku {
  constructor(canvas, squares, rowHints, columnHints, internalNumbers) {
    this.canvas = canvas;
    this.pen = this.canvas.getContext('2d');
    this.pen.fillStyle = 'green';

    this.jubiSquares = squares.map((rowElement, row) => {
      return rowElement.map((columnValue, column) => {
        return new JubiSquare(this.pen, columnValue, row, column);
      });
    });

    this.canvas.addEventListener('mouseenter', this.mouseEnter.bind(this));
    this.canvas.addEventListener('mouseleave', this.mouseLeave.bind(this));
    this.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
  }

  mouseEnter() {
    this.currentSquare = this.getSquareUnderMouse(event);
    if (this.currentSquare) {
      this.currentSquare.drawRolledOver();
    }
  }

  mouseLeave() {
    if (this.currentSquare) {
      this.currentSquare.drawRolledOff();
    }
    this.currentSquare = false;
  }
  
  mouseMove(event) {
    var current_square = this.getSquareUnderMouse(event);
    if (current_square != this.currentSquare) {
      if (this.currentSquare) {
        this.currentSquare.drawRolledOff();
      }
      this.currentSquare = current_square;
      if (this.currentSquare) {
        this.currentSquare.drawRolledOver();
      }
    }
  }

  getSquareUnderMouse(event) {
    var bounding_rect = this.canvas.getBoundingClientRect();
    var mouse_x = event.clientX - bounding_rect.left;
    var mouse_y = event.clientY - bounding_rect.top;

    var square_plus_gutter = JubiSquare.SQUARE_SIZE + JubiSquare.GUTTER_SIZE;
    var column = Math.floor(mouse_x / square_plus_gutter);
    var row = Math.floor(mouse_y / square_plus_gutter);

    if (column >= this.jubiSquares.length ||
      row >= this.jubiSquares[0].length) {
      return false; // beyond range of board
    }
    
    return (mouse_x % square_plus_gutter > JubiSquare.SQUARE_SIZE ||
      mouse_y % square_plus_gutter > JubiSquare.SQUARE_SIZE) ?
      false : // in gutter
      this.jubiSquares[column][row];
  }
}