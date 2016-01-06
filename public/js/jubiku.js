'use strict'

class JubiSquare {
  static get SQUARE_SIZE() { return 100; }
  static get GUTTER_SIZE() { return 10; }

  constructor(pen, shouldExist, row, column) {
    var spacing = JubiSquare.SQUARE_SIZE + JubiSquare.GUTTER_SIZE
    pen.fillRect(
      spacing * row ,
      spacing * column,
      JubiSquare.SQUARE_SIZE,
      JubiSquare.SQUARE_SIZE
    )
  }
}

class Jubiku {
  constructor(canvas, squares, rowHints, columnHints, internalNumbers) {
    var pen = canvas.getContext('2d');
    pen.fillStyle = 'green';

    this.jubiSquares = squares.map((rowElement, row) => {
      return rowElement.map((columnValue, column) => {
        return new JubiSquare(pen, columnValue, row, column);
      });
    });

    canvas.addEventListener('mouseenter', this.mouseEnter);
    canvas.addEventListener('mouseleave', this.mouseLeave);
  }

  mouseEnter() {
    console.log('mouse entered');
  }

  mouseLeave() {
    console.log('mouse left');
  }
}