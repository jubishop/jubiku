class JubiSquare {
  static get ROLLED_OFF_SIZE() { return 100; }
  static get ROLLED_OVER_SIZE() { return 80; }
  static get ROLLED_INDENT() {
    return (JubiSquare.ROLLED_OFF_SIZE - JubiSquare.ROLLED_OVER_SIZE) / 2;
  }
  static get ANIMATION_VELOCITY() { return 0.4; }
  static get GUTTER_SIZE() { return 10; }

  constructor(pen, shouldExist, row, column) {
    var spacing = JubiSquare.ROLLED_OFF_SIZE + JubiSquare.GUTTER_SIZE
    this.pen = pen;
    this.leftEdge = spacing * column;
    this.topEdge = spacing * row;
    this.tweener = new Tweener(
      JubiSquare.ROLLED_OFF_SIZE,
      JubiSquare.ANIMATION_VELOCITY,
      this.drawSquare.bind(this)
    );
    this.drawSquare(JubiSquare.ROLLED_OFF_SIZE);
  }

  clearSquare() {
    this.pen.clearRect(
      this.topEdge - (JubiSquare.GUTTER_SIZE / 2),
      this.leftEdge - (JubiSquare.GUTTER_SIZE / 2),
      JubiSquare.ROLLED_OFF_SIZE + JubiSquare.GUTTER_SIZE,
      JubiSquare.ROLLED_OFF_SIZE + JubiSquare.GUTTER_SIZE
    );
  }

  drawSquare(edgeSize) {
    this.clearSquare();

    var indent = (JubiSquare.ROLLED_OFF_SIZE - edgeSize) / 2;
    this.pen.fillRect(
      this.topEdge + indent,
      this.leftEdge + indent,
      edgeSize,
      edgeSize
    );
  }

  rolledOff() {
    this.tweener.tween(JubiSquare.ROLLED_OFF_SIZE);
  }

  rolledOver() {
    this.tweener.tween(JubiSquare.ROLLED_OVER_SIZE);
  }
}