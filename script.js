let Gameboard = (function() {
    let _gameboard = [
        ["x", "o", null],
        [null, null, null],
        [null, null, null]
        ];
    let _allPositions = document.querySelectorAll(".gameboardPosition");
    let _isX = true;
    // function that rerenders the board with playerMove
    // also adds/removes event listeners upon a move
    function _renderBoard() {
        for (let i = 0 ; i < _gameboard.length ; i++) {
            for (let j = 0 ; j < _gameboard[i].length ; j++) {
                console.log(_gameboard[i][j]);
            }
        }
    }

    function _choosePosition(e) {
        // modify gameboard array (add an x or o)
        let chosenPosition = [...e.target.classList].slice(1).join(" ");
        console.log([...e.target.classList].slice(1).join(" "));
        if (_isX) {
            if (chosenPosition === "top left") _gameboard[0][0] = "X";
            else if (chosenPosition === "top center") _gameboard[0][1] = "X";
            else if (chosenPosition === "top right") _gameboard[0][2] = "X";
            else if (chosenPosition === "mid left") _gameboard[1][0] = "X";
            else if (chosenPosition === "mid center") _gameboard[1][1] = "X";
            else if (chosenPosition === "mid right") _gameboard[1][2] = "X";
            else if (chosenPosition === "bottom left") _gameboard[2][0] = "X";
            else if (chosenPosition === "bottom center") _gameboard[2][1] = "X";
            else if (chosenPosition === "bottom right") _gameboard[2][2] = "X";
        } else {
            if (chosenPosition === "top left") _gameboard[0][0] = "O";
            else if (chosenPosition === "top center") _gameboard[0][1] = "O";
            else if (chosenPosition === "top right") _gameboard[0][2] = "O";
            else if (chosenPosition === "mid left") _gameboard[1][0] = "O";
            else if (chosenPosition === "mid center") _gameboard[1][1] = "O";
            else if (chosenPosition === "mid right") _gameboard[1][2] = "O";
            else if (chosenPosition === "bottom left") _gameboard[2][0] = "O";
            else if (chosenPosition === "bottom center") _gameboard[2][1] = "O";
            else if (chosenPosition === "bottom right") _gameboard[2][2] = "O";
        }
        _isX = !_isX;
        // remove the appropriate event listener
        e.target.removeEventListener("click", _choosePosition);
    }

    function resetBoard() {
        // reset gameboard values to null
        Gameboard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        // add event listeners to all grid elements
        for (const position of _allPositions) {
            position.addEventListener("click", _choosePosition);
        }
    }

    function _eventListenerController() {
        console.log("some more stuff");
    }

    return {
        resetBoard,
    };
    
})();

Gameboard.resetBoard()

// game object would control whose turn it is x or o
