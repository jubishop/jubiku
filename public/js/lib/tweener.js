class Tweener {
  constructor(startValue, amountPerMS, callback) {
    this.currentValue = startValue;
    this.amountPerMS = amountPerMS;
    this.callback = callback;
  }

  _frame(timeStamp) {
    var time_diff = timeStamp - this.currentMS;
    this.currentValue = (this.toValue > this.currentValue) ?
      Math.min(
        this.toValue,
        time_diff * this.amountPerMS + this.currentValue
      ) :
      Math.max(
        this.toValue,
        this.currentValue - time_diff * this.amountPerMS 
      );

    if (this.currentValue == this.toValue) {
      this.stopTweening();
    } else {
      this.currentMS = timeStamp;
      this.animationID = window.requestAnimationFrame(this._frame.bind(this));
    }

    this.callback(this.currentValue);
  }

  stopTweening() {
    if (this.animationID) {
      window.cancelAnimationFrame(this.animationID);
      this.animationID = false;
    }
  }

  tween(toValue) {
    this.stopTweening();

    this.toValue = toValue;
    this.currentMS = window.performance.now();
    this.animationID = window.requestAnimationFrame(this._frame.bind(this));
  }
}