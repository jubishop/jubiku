"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tweener = (function () {
  function Tweener(startValue, amountPerMS, callback) {
    _classCallCheck(this, Tweener);

    this.currentValue = startValue;
    this.amountPerMS = amountPerMS;
    this.callback = callback;
  }

  _createClass(Tweener, [{
    key: "_frame",
    value: function _frame(timeStamp) {
      var time_diff = timeStamp - this.currentMS;
      this.currentValue = this.toValue > this.currentValue ? Math.min(this.toValue, time_diff * this.amountPerMS + this.currentValue) : Math.max(this.toValue, this.currentValue - time_diff * this.amountPerMS);

      if (this.currentValue == this.toValue) {
        this.stopTweening();
      } else {
        this.currentMS = timeStamp;
        this.animationID = window.requestAnimationFrame(this._frame.bind(this));
      }

      this.callback(this.currentValue);
    }
  }, {
    key: "stopTweening",
    value: function stopTweening() {
      if (this.animationID) {
        window.cancelAnimationFrame(this.animationID);
        this.animationID = false;
      }
    }
  }, {
    key: "tween",
    value: function tween(toValue) {
      this.stopTweening();

      this.toValue = toValue;
      this.currentMS = window.performance.now();
      this.animationID = window.requestAnimationFrame(this._frame.bind(this));
    }
  }]);

  return Tweener;
})();