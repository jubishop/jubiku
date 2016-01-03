class JubiSquare {
    constructor(pen, shouldExist, row, column) {
        pen.fillRect(110 * row , 110 * column, 100, 100);
    }
}

class Jubiku {
    constructor(canvas, squares, rowHints, columnHints, internalNumbers) {
        var pen = canvas.getContext('2d');
        pen.fillStyle = 'green';

        this.jubiSquares = squares.map(function(rowElement, row) {
            return rowElement.map(function(columnValue, column) {
                return new JubiSquare(pen, columnValue, row, column);
            });
        });
        console.log(this.jubiSquares);
    }
}

