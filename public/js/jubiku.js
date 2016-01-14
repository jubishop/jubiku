'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Jubiku = (function () {
  function Jubiku(canvas, squares, rowHints, columnHints, internalNumbers) {
    var _this = this;

    _classCallCheck(this, Jubiku);

    this.canvas = canvas;
    this.pen = this.canvas.getContext('2d');
    this.pen.fillStyle = 'green';

    JubiSquare.leftOffset = 100;
    JubiSquare.topOffset = 100;
    this.jubiSquares = squares.map(function (rowElement, row) {
      return rowElement.map(function (columnValue, column) {
        return new JubiSquare(_this.pen, columnValue, row, column);
      });
    });

    this.canvas.addEventListener('mouseenter', this.mouseEnter.bind(this));
    this.canvas.addEventListener('mouseleave', this.mouseLeave.bind(this));
    this.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
  }

  _createClass(Jubiku, [{
    key: 'mouseEnter',
    value: function mouseEnter() {
      this.currentSquare = this.getSquareUnderMouse(event);
      if (this.currentSquare) {
        this.currentSquare.rolledOver();
      }
    }
  }, {
    key: 'mouseLeave',
    value: function mouseLeave() {
      if (this.currentSquare) {
        this.currentSquare.rolledOff();
      }
      this.currentSquare = false;
    }
  }, {
    key: 'mouseMove',
    value: function mouseMove(event) {
      var current_square = this.getSquareUnderMouse(event);
      if (current_square != this.currentSquare) {
        if (this.currentSquare) {
          this.currentSquare.rolledOff();
        }
        this.currentSquare = current_square;
        if (this.currentSquare) {
          this.currentSquare.rolledOver();
        }
      }
    }
  }, {
    key: 'getSquareUnderMouse',
    value: function getSquareUnderMouse(event) {
      var bounding_rect = this.canvas.getBoundingClientRect();
      var mouse_x = event.clientX - bounding_rect.left - JubiSquare.leftOffset;
      var mouse_y = event.clientY - bounding_rect.top - JubiSquare.topOffset;

      if (mouse_x < 0 || mouse_y < 0) {
        return false; // over left or top of board
      }

      var square_plus_gutter = JubiSquare.ROLLED_OFF_SIZE + JubiSquare.GUTTER_SIZE;
      var column = Math.floor(mouse_x / square_plus_gutter);
      var row = Math.floor(mouse_y / square_plus_gutter);

      if (column >= this.jubiSquares.length || row >= this.jubiSquares[0].length) {
        return false; // over right or bottom of board
      }

      return mouse_x % square_plus_gutter > JubiSquare.ROLLED_OFF_SIZE || mouse_y % square_plus_gutter > JubiSquare.ROLLED_OFF_SIZE ? false : // in gutter
      this.jubiSquares[column][row];
    }
  }]);

  return Jubiku;
})();