class JubiSquare {
  static get SQUARE_SIZE() { return 100; }
  static get GUTTER_SIZE() { return 10; }

  constructor(pen, shouldExist, row, column) {
    var spacing = JubiSquare.SQUARE_SIZE + JubiSquare.GUTTER_SIZE
    this.pen = pen;
    this.leftEdge = spacing * column;
    this.topEdge = spacing * row;
    this.drawRolledOff();
  }

  clearSquare() {
    this.pen.clearRect(
      this.topEdge,
      this.leftEdge,
      JubiSquare.SQUARE_SIZE,
      JubiSquare.SQUARE_SIZE      
    );
  }

  drawRolledOff() {
    this.clearSquare();
    this.pen.fillRect(
      this.topEdge,
      this.leftEdge,
      JubiSquare.SQUARE_SIZE,
      JubiSquare.SQUARE_SIZE
    )
  } 
}