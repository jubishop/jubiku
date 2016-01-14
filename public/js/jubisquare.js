"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JubiSquare = (function () {
  _createClass(JubiSquare, null, [{
    key: "ROLLED_OFF_SIZE",
    get: function get() {
      return 100;
    }
  }, {
    key: "ROLLED_OVER_SIZE",
    get: function get() {
      return 80;
    }
  }, {
    key: "ROLLED_INDENT",
    get: function get() {
      return (JubiSquare.ROLLED_OFF_SIZE - JubiSquare.ROLLED_OVER_SIZE) / 2;
    }
  }, {
    key: "ANIMATION_VELOCITY",
    get: function get() {
      return 0.2;
    }
  }, {
    key: "GUTTER_SIZE",
    get: function get() {
      return 10;
    }
  }, {
    key: "offsetLeft",
    set: function set(offset) {
      JubiSquare.leftOffset = offset;
    }
  }, {
    key: "offsetTop",
    set: function set(offset) {
      JubiSquare.topOffset = offset;
    }
  }]);

  function JubiSquare(pen, shouldExist, row, column) {
    _classCallCheck(this, JubiSquare);

    this.pen = pen;

    var spacing = JubiSquare.ROLLED_OFF_SIZE + JubiSquare.GUTTER_SIZE;
    this.leftEdge = JubiSquare.leftOffset + spacing * column;
    this.topEdge = JubiSquare.topOffset + spacing * row;

    this.tweener = new Tweener(JubiSquare.ROLLED_OFF_SIZE, JubiSquare.ANIMATION_VELOCITY, this.drawSquare.bind(this));
    this.drawSquare(JubiSquare.ROLLED_OFF_SIZE);
  }

  _createClass(JubiSquare, [{
    key: "clearSquare",
    value: function clearSquare() {
      this.pen.clearRect(this.topEdge - JubiSquare.GUTTER_SIZE / 2, this.leftEdge - JubiSquare.GUTTER_SIZE / 2, JubiSquare.ROLLED_OFF_SIZE + JubiSquare.GUTTER_SIZE, JubiSquare.ROLLED_OFF_SIZE + JubiSquare.GUTTER_SIZE);
    }
  }, {
    key: "drawSquare",
    value: function drawSquare(edgeSize) {
      this.clearSquare();

      var indent = (JubiSquare.ROLLED_OFF_SIZE - edgeSize) / 2;
      this.pen.fillRect(this.topEdge + indent, this.leftEdge + indent, edgeSize, edgeSize);
    }
  }, {
    key: "rolledOff",
    value: function rolledOff() {
      this.tweener.tween(JubiSquare.ROLLED_OFF_SIZE);
    }
  }, {
    key: "rolledOver",
    value: function rolledOver() {
      this.tweener.tween(JubiSquare.ROLLED_OVER_SIZE);
    }
  }]);

  return JubiSquare;
})();