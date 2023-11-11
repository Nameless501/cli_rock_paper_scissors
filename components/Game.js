class Game {
    constructor() {
        this._computerMove;
    }

    getRandomMove = (optionsList) => {
        this._computerMove =
            optionsList[Math.floor(Math.random() * optionsList.length)];
        return this._computerMove;
    };

    calculateMoveData = (move, optionsList) => {
        const res = { win: [], lose: [] };
        for (let i = 0; i < optionsList.length; i++) {
            const half = (optionsList.length - 1) / 2;
            const opposition = (i + move) % optionsList.length;
            if (!i) {
                continue;
            } else if (i <= half) {
                res.lose.push(optionsList[opposition]);
            } else {
                res.win.push(optionsList[opposition]);
            }
        }
        return res;
    };

    _getWinner = (userMoveData) => {
        if (userMoveData.lose.includes(this._computerMove)) {
            return 'lose';
        } else if (userMoveData.win.includes(this._computerMove)) {
            return 'win';
        } else {
            return 'draw';
        }
    };

    getGameResult = (move, optionsList) => {
        const userMoveData = this.calculateMoveData(move, optionsList);
        return {
            user: optionsList[move],
            computer: this._computerMove,
            result: this._getWinner(userMoveData),
        };
    };
}

export default Game;
