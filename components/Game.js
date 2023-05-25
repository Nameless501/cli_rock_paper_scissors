class Game {
    constructor() {
        this._computerMove;
    }

    // generate random move for computer
    getRandomMove = (movesList) => {
        this._computerMove =
            movesList[Math.floor(Math.random() * movesList.length)];
        return this._computerMove;
    };

    // calculate current move result relatively to every option
    calculateMoveData = (move, movesList) => {
        const res = { win: [], lose: [] };
        for (let i = 0; i < movesList.length; i++) {
            const half = (movesList.length - 1) / 2;
            const opposition = (i + move) % movesList.length;
            if (!i) {
                continue;
            } else if (i <= half) {
                res.lose.push(movesList[opposition]);
            } else {
                res.win.push(movesList[opposition]);
            }
        }
        return res;
    };

    // find result of current user move against computer move
    _getWinner = (userMoveData) => {
        if (userMoveData.lose.includes(this._computerMove)) {
            return 'lose';
        } else if (userMoveData.win.includes(this._computerMove)) {
            return 'win';
        } else {
            return 'draw';
        }
    };

    // collect result data of current round
    getGameResult = (move, movesList) => {
        const userMoveData = this.calculateMoveData(move, movesList);
        return {
            user: movesList[move],
            computer: this._computerMove,
            result: this._getWinner(userMoveData),
        };
    };
}

export default Game;
