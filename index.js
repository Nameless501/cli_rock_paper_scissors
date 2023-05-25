import App from './components/App.js';

import Render from './components/Render.js';

import Validation from './components/Validation.js';

import Game from './components/Game.js';

import Encryption from './components/Encryption.js';

import Help from './components/Help.js';

// classes initialization

const movesList = process.argv.slice(2);

const render = new Render();

const encryption = new Encryption();

const validation = new Validation();

const game = new Game();

const help = new Help(game.calculateMoveData.bind(game));

const app = new App({
    movesList,
    getComputerMove: (movesList) => game.getRandomMove(movesList),
    encryptComputerMove: (move) => {
        const { hmac, key } = encryption.generateHmac(move);
        render.showHmac(hmac);
        return key;
    },
    getUserMove: (movesList) => render.showMainMenu(movesList),
    showHelpTable: (movesList) => help.showTable(movesList),
    getGameResult: (move, movesList, key) => {
        const result = game.getGameResult(move, movesList);
        render.showResult(result);
        render.showKey(key);
        return result;
    },
    handleNextRoundMenu: () => render.showNextRoundMenu(),
});

// app

const movesListValidationError = validation.validateOptionsList(movesList);

movesListValidationError
    ? render.showError(movesListValidationError)
    : app.start();
