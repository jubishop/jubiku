class JubiSquare {
  static get ROLLED_OFF_SIZE() { return 100; }
  static get ROLLED_OVER_SIZE() { return 80; }
  static get ROLLED_INDENT() {
    return (JubiSquare.ROLLED_OFF_SIZE - JubiSquare.ROLLED_OVER_SIZE) / 2;
  }
  static get ANIMATION_VELOCITY() { return 0.2; }
  static get GUTTER_SIZE() { return 10; }

  constructor(pen, shouldExist, row, column) {
    var spacing = JubiSquare.ROLLED_OFF_SIZE + JubiSquare.GUTTER_SIZE
    this.pen = pen;
    this.leftEdge = spacing * column;
    this.topEdge = spacing * row;

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

  clearAnimationID() {
    if (this.animationID) {
      window.cancelAnimationFrame(this.animationID);
      this.animationID = false;
    }
  }

  drawSquare(edgeSize) {
    this.clearSquare();

    this.currentEdge = edgeSize;

    var indent = (JubiSquare.ROLLED_OFF_SIZE - edgeSize) / 2;
    this.pen.fillRect(
      this.topEdge + indent,
      this.leftEdge + indent,
      edgeSize,
      edgeSize
    );
  }

  rolledOff() {
    this.clearAnimationID();

    this.lastMS = window.performance.now();
    this.animationID = 
      window.requestAnimationFrame(this.animateRolledOff.bind(this));
  }

  animateRolledOff(timeStamp) {
    var time_diff = timeStamp - this.lastMS;

    var new_edge = Math.min(
      JubiSquare.ROLLED_OFF_SIZE,
      this.currentEdge + (time_diff * JubiSquare.ANIMATION_VELOCITY)
    );

    this.drawSquare(new_edge);

    if (new_edge == JubiSquare.ROLLED_OFF_SIZE) {
      this.clearAnimationID();
    } else {
      this.lastMS = timeStamp;
      this.animationID =
        window.requestAnimationFrame(this.animateRolledOff.bind(this));
    }
  }

  rolledOver() {
    this.clearAnimationID();

    this.lastMS = window.performance.now();
    this.animationID = 
      window.requestAnimationFrame(this.animateRolledOver.bind(this));
  }

  animateRolledOver(timeStamp) {
    var time_diff = timeStamp - this.lastMS;

    var new_edge = Math.max(
      JubiSquare.ROLLED_OVER_SIZE,
      this.currentEdge - (time_diff * JubiSquare.ANIMATION_VELOCITY)
    );

    this.drawSquare(new_edge);

    if (new_edge == JubiSquare.ROLLED_OVER_SIZE) {
      this.clearAnimationID();
    } else {
      this.lastMS = timeStamp;
      this.animationID =
        window.requestAnimationFrame(this.animateRolledOver.bind(this));
    }
  }
}