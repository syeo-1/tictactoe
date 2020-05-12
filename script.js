let Gameboard = (function() {
    let _gameboard = [
        ["x", "o", null],
        [null, null, null],
        [null, null, null]
        ];

    // function that rerenders the board with playerMove
    // also adds/removes event listeners upon a move
    function renderBoard() {
        for (let i = 0 ; i < _gameboard.length ; i++) {
            for (let j = 0 ; j < _gameboard[i].length ; j++) {
                console.log(_gameboard[i][j]);
                if ()
            }
        }
    }

    function _refreshBoard() {
        // reset gameboard values to null
        Gameboard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        // add event listeners to all grid elements
        let allPositions = document.querySelectorAll(".gameboardPosition");

    }

    function _eventListenerController() {
        console.log("some more stuff");
    }

    return {
        renderBoard,
    };
    
})();

Gameboard.renderBoard()
console.log("liaurw");

// game object would control whose turn it is x or o
