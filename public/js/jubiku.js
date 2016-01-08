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
    console.log('mouse entered');
  }

  mouseLeave() {
    console.log('mouse left');
  }
  
  mouseMove(event) {
    var bounding_rect = this.canvas.getBoundingClientRect();
    var mouse_x = event.clientX - bounding_rect.left;
    var mouse_y = event.clientY - bounding_rect.top;

    var square_plus_gutter = JubiSquare.SQUARE_SIZE + JubiSquare.GUTTER_SIZE;
    var column = Math.floor(mouse_x / square_plus_gutter);
    var row = Math.floor(mouse_y / square_plus_gutter);
    if (column >= this.jubiSquares.length ||
      row >= this.jubiSquares[0].length) {
      console.log("outside range");
      return;
    }
    
    if (mouse_x % square_plus_gutter > JubiSquare.SQUARE_SIZE ||
      mouse_y % square_plus_gutter > JubiSquare.SQUARE_SIZE) {
      console.log("in gutter");
    } else {
      this.jubiSquares[column][row].drawRolledOver();
    }
  }
}