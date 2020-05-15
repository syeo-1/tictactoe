let Gameboard = (function() {
    let _gameboard;
    let _allPositions = document.querySelectorAll(".gameboardPosition");
    let gameOver = false;
    let positionsFilled = 0;
    let turnDisplay = document.getElementById("current-player");
    // function that rerenders the board with playerMove
    // also adds/removes event listeners upon a move

    function _selectablePosition(e) {
        // modify gameboard array (add an x or o)
        let chosenPosition = [...e.target.classList].slice(1).join(" ");
        console.log([...e.target.classList].slice(1).join(" "));
        // console.log(Game.getCurrentPlayer());

        let currentMark = Game.getCurrentPlayer().playerMark;
        let currentName = Game.getNextPlayer().playerName;

        turnDisplay.textContent = `${currentName}'s turn`

        if (chosenPosition === "top left") _gameboard[0][0] = currentMark;
        else if (chosenPosition === "top center") _gameboard[0][1] = currentMark;
        else if (chosenPosition === "top right") _gameboard[0][2] = currentMark;
        else if (chosenPosition === "mid left") _gameboard[1][0] = currentMark;
        else if (chosenPosition === "mid center") _gameboard[1][1] = currentMark;
        else if (chosenPosition === "mid right") _gameboard[1][2] = currentMark;
        else if (chosenPosition === "bottom left") _gameboard[2][0] = currentMark;
        else if (chosenPosition === "bottom center") _gameboard[2][1] = currentMark;
        else if (chosenPosition === "bottom right") _gameboard[2][2] = currentMark;

        Game.toggleCurrentPlayer();
        // console.log(Game.currentPlayerIsX);
        DisplayController.renderBoard()
        // remove the appropriate event listener
        e.target.removeEventListener("click", _selectablePosition);
        positionsFilled++;
        let gameOverString = checkForWin();
        if (gameOver) {
            turnDisplay.textContent = gameOverString;
            // remove the remaining board event listeners
            for (const position of _allPositions) {
                position.removeEventListener("click", _selectablePosition);
            }

        }
        
    }

    function checkForWin() {
        let xInARow = 0;
        let oInARow = 0;
        let xWins = false;
        let oWins = false

        // check rows
        for (let i = 0 ; i < _gameboard.length ; i++) {
            for (let j = 0 ; j < _gameboard[i].length ; j++) {
                if (_gameboard[i][j] === "X") {
                    xInARow++;
                    oInARow = 0;
                } else if (_gameboard[i][j] === "O") {
                    oInARow++;
                    xInARow = 0;
                } 

                if (xInARow === 3){
                    gameOver = true;
                    xWins = true;
                    break;
                } else if (oInARow === 3) {
                    gameOver = true;
                    oWins = true;
                    break;
                }
            }
            xInARow = 0;
            oInARow = 0;
        }
        // check columns
        if (!gameOver) {
            for (let i = 0 ; i < _gameboard.length ; i++) {
                for (let j = 0 ; j < _gameboard[i].length ; j++) {
                    if (_gameboard[j][i] === "X") {
                        xInARow++;
                        oInARow = 0;
                    } else if (_gameboard[j][i] === "O") {
                        oInARow++;
                        xInARow = 0;
                    } 

                    if (xInARow === 3){
                        gameOver = true;
                        xWins = true;
                        break;
                    } else if (oInARow === 3) {
                        gameOver = true;
                        oWins = true;
                        break;
                    }
                }
                xInARow = 0;
                oInARow = 0;
            }      
        }
        // check diagonals
        if (!gameOver) {
            if (_gameboard[1][1] === "X") {
                if (_gameboard[0][0] === _gameboard[1][1] &&
                    _gameboard[2][2] === _gameboard[1][1] ||
                    _gameboard[0][2] === _gameboard[1][1] &&
                    _gameboard[2][0] === _gameboard[1][1]) {
                        xWins = true;
                        gameOver = true;
                    } 
            } else if (_gameboard[1][1] === "O") {
                if (_gameboard[0][0] === _gameboard[1][1] &&
                    _gameboard[2][2] === _gameboard[1][1] ||
                    _gameboard[0][2] === _gameboard[1][1] &&
                    _gameboard[2][0] === _gameboard[1][1]) {
                        oWins = true;
                        gameOver = true;
                    }
            }
        }
        if (xWins) return `winner is ${Game.getPlayer1().playerName}`;
        else if (oWins) return `winner is ${Game.getPlayer2().playerName}`;
        else if (positionsFilled === 9) {
            gameOver = true;
            return "it's a tie!";
        }
        else return;
    }

    let getCurrentBoard = () => _gameboard;

    function reset() {
        // reset gameboard values to null
        _gameboard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        positionsFilled = 0;
        // add event listeners to all grid elements
        for (const position of _allPositions) {
            position.addEventListener("click", _selectablePosition);
        }
        // turn display
        turnDisplay.textContent = `${Game.getCurrentPlayer().playerName}'s turn`;
    }

    return {
        reset,
        getCurrentBoard,
    };
    
})();

let DisplayController = (function() {
    function renderBoard() {
        let board = Gameboard.getCurrentBoard();
        let boardPositions = document.querySelector(".gameboard").children;
        let domModIndex = 0;
        for (let i = 0 ; i < board.length ; i++) {
            for (let j = 0 ; j < board[i].length ; j++) {
                boardPositions[domModIndex].textContent = board[i][j];
                domModIndex++;
            }
        }
    }

    return {
        renderBoard,
    };
})();

let Player = (name, mark) => {
    let playerName = name;
    let playerMark = mark;

    return {
        playerName,
        playerMark,
    }

};


let Game = (function() {
    let player1;
    let player2;
    let currentPlayer;

    function start() {
        player1 = Player("player X", "X");
        player2 = Player("player O", "O");
        currentPlayer = player1;
        // console.log(currentPlayer);

        Gameboard.reset();
        DisplayController.renderBoard();

    }

    function getCurrentPlayer() {
        return currentPlayer;
    }
    function getNextPlayer() {
        return (currentPlayer === player1) ? player2 : player1;
    }
    function getPlayer1() {
        return player1;
    }
    function getPlayer2() {
        return player2;
    }

    function reset() {
        playMade = 0;
        Gameboard.reset()
        DisplayController.renderBoard();
    }

    function toggleCurrentPlayer() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1
        }
    }

    return {
        start,
        currentPlayer,
        toggleCurrentPlayer,
        player1,
        player2,
        getCurrentPlayer,
        getNextPlayer,
        getPlayer1,
        getPlayer2,
    };
    
})();


Game.start()


// game object would control whose turn it is x or o
