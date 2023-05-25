class App {
    constructor({
        movesList,
        getComputerMove,
        encryptComputerMove,
        getUserMove,
        getGameResult,
        showHelpTable,
        handleNextRoundMenu,
    }) {
        this._movesList = movesList;

        this._getComputerMove = getComputerMove;

        this._encryptComputerMove = encryptComputerMove;

        this._getUserMove = getUserMove;

        this._getGameResult = getGameResult;

        this._showHelpTable = showHelpTable;

        this._handleNextRoundMenu = handleNextRoundMenu;

        this._nextRound = false;

        this._computerMove;

        this._userMove;

        this._secretKey;

        this._gameResult;
    }

    _startNextRound = () => {
        this._nextRound = this._handleNextRoundMenu();
        if (this._nextRound) {
            this.start();
        }
    };

    _handleMainMenuControl() {
        this._userMove = this._getUserMove(this._movesList);
        switch (this._userMove) {
            case '0':
                return;
            case '?':
                this._showHelpTable(this._movesList);
                this._handleMainMenuControl();
                break;
            default:
                this._gameResult = this._getGameResult(
                    this._userMove - 1,
                    this._movesList,
                    this._secretKey
                );
                this._startNextRound();
        }
    }

    start = () => {
        this._computerMove = this._getComputerMove(this._movesList);
        this._secretKey = this._encryptComputerMove(this._computerMove);
        this._handleMainMenuControl();
    };
}

export default App;
