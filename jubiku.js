var JubiSquare = function (pen, shouldExist, row, column) {
    pen.fillRect(0, 0, 100, 100);
}

var Jubiku = function (canvas, squares, rowHints, columnHints, internalNumbers) {
    console.log(canvas);
    console.log(squares);
    console.log(rowHints);
    console.log(columnHints);
    console.log(internalNumbers);
    
    var pen = canvas.getContext('2d');
    pen.fillStyle = 'green';

    new JubiSquare(pen, true, 0, 0);
}

