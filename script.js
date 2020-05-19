let Gameboard = (function() {
    let _gameboard;
    let _allPositions = document.querySelectorAll(".gameboardPosition");
    let positionsFilled;
    let turnDisplay = document.getElementById("current-player");
    let xWins;
    let oWins;
    // let gameOver = false;
    // function that rerenders the board with playerMove
    // also adds/removes event listeners upon a move

    function displayCurrentPlayerName() {
        let currentName = Game.getCurrentPlayer().getName();
        turnDisplay.textContent = `${currentName}'s turn`;
    }

    function selectablePosition(e) {
        // modify gameboard array (add an x or o)
        let chosenPosition = [...e.target.classList].slice(1).join(" ");
        // console.log([...e.target.classList].slice(1).join(" "));
        // console.log(Game.getCurrentPlayer());

        let currentMark = Game.getCurrentPlayer().playerMark;
        

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
        displayCurrentPlayerName();
        DisplayController.renderBoard()
        // remove the appropriate event listener
        e.target.removeEventListener("click", selectablePosition);
        positionsFilled++;
        if (gameIsOver()) {
            turnDisplay.textContent = getWinnerString();
            // remove the remaining board event listeners
            for (const position of _allPositions) {
                position.removeEventListener("click", selectablePosition);
            }

        }
        if ((Game.getxAIActive() || Game.getoAIActive()) && !gameIsOver()) {
            // let currentMark = Game.getCurrentPlayer().playerMark;
            let currentName = Game.getNextPlayer().getName();
            turnDisplay.textContent = `${currentName}'s turn`
            Game.getAImove();
            Game.toggleCurrentPlayer();
            DisplayController.renderBoard();
            positionsFilled++;
            if (gameIsOver()) {
                turnDisplay.textContent = getWinnerString();
                // remove the remaining board event listeners
                for (const position of _allPositions) {
                    position.removeEventListener("click", selectablePosition);
                }
            }
        }
    }

    let getPositionsFilled = () => positionsFilled;

    let incrementPosnFilled = () => positionsFilled++;
    let decrementPosnFilled = () => positionsFilled--;

    let getXWins = () => xWins;
    let getOWins = () => oWins;
    function resetWins() {
        xWins = false;
        oWins = false;
    }

    function gameIsOver() {
        let xInARow = 0;
        let oInARow = 0;
        let gameOver = false;
        

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
        if (positionsFilled === 9) gameOver = true;
        return gameOver;
    }
    function getWinnerString() {
        if (xWins) return `winner is ${Game.getPlayer1().playerName}`;
        else if (oWins) return `winner is ${Game.getPlayer2().playerName}`;
        else if (positionsFilled === 9) return "it's a tie!";
    }

    let getCurrentBoard = () => _gameboard;

    function reset() {
        // reset gameboard values to null
        xWins = false;
        oWings = false;
        _gameboard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        positionsFilled = 0;
        gameOver = false;
        // add event listeners to all grid elements
        for (const position of _allPositions) {
            position.addEventListener("click", selectablePosition);
        }
        // turn display
        if (Game.getxAIActive()) {
            turnDisplay.textContent = `${Game.getNextPlayer().getName()}'s turn`;
        } else {
            turnDisplay.textContent = `${Game.getCurrentPlayer().getName()}'s turn`;
        }
    }

    return {
        reset,
        getCurrentBoard,
        positionsFilled,
        selectablePosition,
        getPositionsFilled,
        incrementPosnFilled,
        getXWins,
        getOWins,
        gameIsOver,
        resetWins,
        decrementPosnFilled,
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

let Player = (name, mark, isHuman) => {
    let playerName = name;
    let playerMark = mark;
    let playerIsHuman = isHuman;

    let getName = () => name;

    return {
        playerName,
        playerMark,
        getName,
    }

};


let Game = (function() {
    let player1 = Player("player X", "X", true);
    let player2 = Player("player O", "O", true);
    let player1Name;
    let player2Name;
    let currentPlayer;
    let xAIActive = false;
    let oAIActive = false;

    function start() {
        currentPlayer = player1;
        // console.log(currentPlayer);
        // xAIActive = false;
        // oAIActive = false;

        Gameboard.reset();
        DisplayController.renderBoard();

        // add event listeners to reset
        let gameReset = document.getElementById("reset");
        gameReset.addEventListener("click", reset);

        // add event listener to settings
        let settings = document.getElementById("settings");
        settings.addEventListener("click", showSettingsForm);

        //add event listener to cancel in settings
        let settingsCancel = document.getElementById("settings-cancel");
        settingsCancel.addEventListener("click", hideSettingsForm);

        // add event listener to set in settings
        let settingsSet = document.getElementById("settings-set");
        settingsSet.addEventListener("click", saveSettings);

        // add event listener for vs AI settings
        let aiSettings = document.getElementById("ai");
        aiSettings.addEventListener("click", showAISettings);

        // add event listener to hide AI settings
        let setAI = document.getElementById("ai-set");
        setAI.addEventListener("click", saveAISettings);

        // add event listener to uncheck ai radio buttons
        let uncheckAI = document.getElementById("uncheck");
        uncheckAI.addEventListener("click", uncheckAIoptions);

    }

    function getCurrentPlayer() {
        return currentPlayer;
    }
    function getNextPlayer() {
        // console.log(player1.playerName);
        // console.log(player2.playerName);
        return (currentPlayer === player1) ? player2 : player1;
    }
    function getPlayer1() {
        return player1;
    }
    function getPlayer2() {
        return player2;
    }

    function showSettingsForm() {
        let settingsForm = document.getElementById("settings-form");
        settingsForm.classList.remove("hidden");
    }
    function hideSettingsForm() {
        let settingsForm = document.getElementById("settings-form");
        settingsForm.classList.add("hidden");
        if (!document.getElementById("ai-form").classList.contains("hidden")) {
            document.getElementById("ai-form").classList.add("hidden");
        }
    }
    function saveSettings() {
        let newp1Name = document.getElementById("player-x-name").value;
        let newp2Name = document.getElementById("player-o-name").value;
        if (newp1Name !== "") {
            player1Name = newp1Name;
            player1.playerName = player1Name;
        }
        if (newp2Name !== "") {
            player2Name = newp2Name;
            player2.playerName = player2Name;
        }

        console.log(newp1Name);
        console.log(newp2Name);
        player1 = Player(newp1Name===""?"player X":player1Name, "X");
        player2 = Player(newp2Name===""?"player O":player2Name, "O");
        reset();
    }

    function showAISettings() {
        let aiSettingsForm = document.getElementById("ai-form");
        aiSettingsForm.classList.remove("hidden");
    }

    function getAImove() {
        let allPositions = document.querySelectorAll(".gameboardPosition");
        let chosenPosition;
        let board = Gameboard.getCurrentBoard();
        let moveMade = false;
        let bestScore = (xAIActive) ? -Infinity : Infinity;
        let bestMove;
        for (let i = 0 ; i < board.length ; i++) { // check all playable posn's
            for (let j = 0 ; j < board[i].length ; j++) {
                if (board[i][j] === null) {
                    if (Gameboard.getPositionsFilled()%2 === 0) {
                        board[i][j] = "X";
                        Gameboard.incrementPosnFilled();
                        let score = minimax(board, false);
                        board[i][j] = null;
                        Gameboard.decrementPosnFilled()
                        if (score > bestScore) {
                            bestScore = score;
                            bestMove = {i,j};
                        }
                    } else {
                        board[i][j] = "O";
                        Gameboard.incrementPosnFilled();
                        let score = minimax(board, true);
                        board[i][j] = null;
                        Gameboard.decrementPosnFilled();
                        if (score < bestScore) {
                            bestScore = score;
                            bestMove = {i,j};
                        }
                    }
                    
                    // moveMade = true;
                    // break;
                }
            }
            // if (moveMade) break;
        }

        if (bestMove.i === 0 && bestMove.j === 0) chosenPosition = "top left";
        else if (bestMove.i === 0 && bestMove.j === 1) chosenPosition = "top center";
        else if (bestMove.i === 0 && bestMove.j === 2) chosenPosition = "top right";
        else if (bestMove.i === 1 && bestMove.j === 0) chosenPosition = "mid left";
        else if (bestMove.i === 1 && bestMove.j === 1) chosenPosition = "mid center";
        else if (bestMove.i === 1 && bestMove.j === 2) chosenPosition = "mid right";
        else if (bestMove.i === 2 && bestMove.j === 0) chosenPosition = "bottom left";
        else if (bestMove.i === 2 && bestMove.j === 1) chosenPosition = "bottom center";
        else if (bestMove.i === 2 && bestMove.j === 2) chosenPosition = "bottom right";

        if (Gameboard.getPositionsFilled()%2 === 0) { // make the best move
            board[bestMove.i][bestMove.j] = "X";
        } else {
            board[bestMove.i][bestMove.j] = "O";
        }
        for (const position of allPositions) {// remove event listener
            if (position.classList.contains(chosenPosition)) {
                position.removeEventListener("click", Gameboard.selectablePosition);
            }
        }
    }

    let getxAIActive = () => xAIActive;
    let getoAIActive = () => oAIActive;

    function saveAISettings() {
        if (document.getElementById("xAI").checked) {
            xAIActive = true;
            oAIActive = false;
            // maybe later add ai name!
        } else if (document.getElementById("oAI").checked) {
            oAIActive = true;
            xAIActive = false;
        } else if (!document.getElementById("xAI").checked &&
        !document.getElementById("oAI").checked) {
            xAIActive = false;
            oAIActive = false;
        }
        saveSettings();
        hideSettingsForm();
        reset();
    }

    function minimax(board, maximizingPlayer) {
        if (Gameboard.gameIsOver()) {
            // console.log(Gameboard.getXWins());
            // console.log(Gameboard.getOWins());
            if (Gameboard.getXWins()) {
                Gameboard.resetWins();
                return 1;
            } else if (Gameboard.getOWins()) {
                Gameboard.resetWins();
                return -1;
            }
            Gameboard.resetWins();
            return 0;
        }
        if (maximizingPlayer) {
            let bestScore = -Infinity;
            for (let i = 0 ; i < board.length ; i++) {
                for (let j = 0 ; j < board[i].length ; j++) {
                    if (board[i][j] === null) {
                        board[i][j] = "X";
                        Gameboard.incrementPosnFilled();
                        let value = minimax(board, false);
                        board[i][j] = null;
                        Gameboard.decrementPosnFilled();
                        bestScore = Math.max(value, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0 ; i < board.length ; i++) {
                for (let j = 0 ; j < board[i].length ; j++) {
                    if (board[i][j] === null) {
                        board[i][j] = "O";
                        Gameboard.incrementPosnFilled();
                        let value = minimax(board, true);
                        board[i][j] = null;
                        Gameboard.decrementPosnFilled();
                        bestScore = Math.min(value, bestScore);
                    } 
                }
            }
            return bestScore;
        }

    }

    function uncheckAIoptions() {
        let xAI = document.getElementById("xAI");
        let oAI = document.getElementById("oAI");
        if (xAI.checked) {
            xAI.checked = false;
            xAIActive = false;
        } else if (oAI.checked) {
            oAI.checked = false;
            oAIActive = false;
        }
        saveSettings();
        hideSettingsForm();
        reset();
    }

    function reset() {
        // console.log(xAIActive);
        
        currentPlayer = player1;
        Gameboard.reset()
        if (xAIActive) {
            getAImove();
            toggleCurrentPlayer();
            Gameboard.incrementPosnFilled();
        }
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
        getAImove,
        getxAIActive,
        getoAIActive,
    };
    
})();


Game.start()


// game object would control whose turn it is x or o
