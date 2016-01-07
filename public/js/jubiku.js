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
    var boundingRect = this.canvas.getBoundingClientRect();
    var mouseX = event.clientX - boundingRect.left;
    var mouseY = event.clientY - boundingRect.top;    
  }
}