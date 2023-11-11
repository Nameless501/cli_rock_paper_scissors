import { GAME_STAGES_CONFIG, MOVES_OPTIONS_CONFIG } from "../configs/configs.js";

class App {
    _currentStage = GAME_STAGES_CONFIG.newGameStart;
    _optionsList = MOVES_OPTIONS_CONFIG.default;
    _userMove;
    _secretKey;

    constructor({
        getNewGameMenuOption,
        getCustomGameOptions,
        getComputerMove,
        getUserMove,
        getRoundResult,
        getNextRoundOption,
        renderError,
        renderInfoTable,
        renderRoundResult,
        renderHmac,
        renderSecretKey,
        validateOptions,
        encryptMoveData,
    }) {
        this._getNewGameMenuOption = getNewGameMenuOption;
        this._getCustomGameOptions = getCustomGameOptions;
        this._getComputerMove = getComputerMove;
        this._getUserMove = getUserMove;
        this._getRoundResult = getRoundResult;
        this._getNextRoundOption = getNextRoundOption;
        this._renderHmac = renderHmac;
        this._renderError = renderError;
        this._renderSecretKey = renderSecretKey;
        this._renderRoundResult = renderRoundResult;
        this._renderInfoTable = renderInfoTable;
        this._validateOptions = validateOptions;
        this._encryptMoveData = encryptMoveData;
    }

    _handleCustomGameOptions = () => {
        const input = this._getCustomGameOptions();
        const options = input.split(' ');
        const validationError = this._validateOptions(options);
        if (validationError) {
            this._renderError(validationError);
            this._handleCustomGameOptions();
        } else {
            this._optionsList = options;
            this._goToNextStage(GAME_STAGES_CONFIG.roundStart);
        }
    }

    _handleNewGameMenu = () => {
        const option = this._getNewGameMenuOption();
        switch (option) {
            case '0':
                return;
            case '3':
                this._goToNextStage(GAME_STAGES_CONFIG.optionsCustomization);
                break;
            default:
                this._optionsList = MOVES_OPTIONS_CONFIG[option];
                this._goToNextStage(GAME_STAGES_CONFIG.roundStart);
        }
    }

    _goToNextStage = (nextStage) => {
        this._currentStage = nextStage;
        this._handleCurrentStage();
    }

    _handleComputerMove = () => {
        const move = this._getComputerMove(this._optionsList);
        const { hmac, key } = this._encryptMoveData(move);
        this._secretKey = key;
        this._renderHmac(hmac);
    }

    _handleInfoTable = () => {
        this._renderInfoTable(this._optionsList);
        this._goToNextStage(GAME_STAGES_CONFIG.userMove);
    }

    _handleUserMoveMenu = () => {
        const input = this._getUserMove(this._optionsList);
        switch (input) {
            case '0':
                return;
            case '?':
                this._goToNextStage(GAME_STAGES_CONFIG.infoTable);
                break;
            case '!':
                this._goToNextStage(GAME_STAGES_CONFIG.newGameStart);
                break;
            default:
                this._userMove = input - 1;
                this._goToNextStage(GAME_STAGES_CONFIG.roundResult);
        }
    }

    _startRound = () => {
        this._handleComputerMove();
        this._goToNextStage(GAME_STAGES_CONFIG.userMove);
    }

    _handleRoundResult = () => {
        const result = this._getRoundResult(this._userMove, this._optionsList);
        this._renderRoundResult(result);
        this._renderSecretKey(this._secretKey);
        this._goToNextStage(GAME_STAGES_CONFIG.roundEnd);
    }

    _handleRoundEnd = () => {
        const isContinue = this._getNextRoundOption();
        if (isContinue) {
            this._goToNextStage(GAME_STAGES_CONFIG.roundStart);
        }
    }

    _handleCurrentStage = () => {
        switch (this._currentStage) {
            case GAME_STAGES_CONFIG.newGameStart:
                this._handleNewGameMenu();
                break;
            case GAME_STAGES_CONFIG.optionsCustomization:
                this._handleCustomGameOptions();
                break;
            case GAME_STAGES_CONFIG.roundStart:
                this._startRound();
                break;
            case GAME_STAGES_CONFIG.userMove:
                this._handleUserMoveMenu();
                break;
            case GAME_STAGES_CONFIG.infoTable:
                this._handleInfoTable();
                break;
            case GAME_STAGES_CONFIG.roundResult:
                this._handleRoundResult();
                break;
            case GAME_STAGES_CONFIG.roundEnd:
                this._handleRoundEnd();
                break;
            default: return;
        }
    }

    start = () => this._handleCurrentStage();
}

export default App;
