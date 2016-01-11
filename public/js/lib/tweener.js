class Tweener {
  constructor() {}

  stopTweening() {
    if (this.animationID) {
      window.cancelAnimationFrame(this.animationID);
      this.animationID = false;
    }
  }
  
  tweenInTime(fromValue, toValue, animationTime, callback) {
    this.stopTweening();

    this.fromValue = fromValue;
    this.toValue = toValue;
    this.valueDiff = this.toValue - this.fromValue;
    this.animationTime = animationTime;
    this.callback = callback;
    this.origMS = window.performance.now();
    this.animationID = window.requestAnimationFrame(this.frame.bind(this));
  }

  tweenAtSpeed(fromValue, toValue, amountPerMS, callback) {
    this.tweenInTime(
      fromValue,
      toValue,
      Math.abs(toValue - fromValue) / amountPerMS,
      callback);
  }

  frame(timeStamp) {
    var time_diff = timeStamp - this.origMS;
    if (time_diff >= this.animationTime) {
      this.stopTweening();
      this.callback(this.toValue);
    } else {
      this.animationID = window.requestAnimationFrame(this.frame.bind(this));
      this.callback((time_diff / this.animationTime) * this.valueDiff +
        this.fromValue);
    }
  }
}