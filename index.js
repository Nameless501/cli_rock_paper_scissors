import App from './components/App.js';

import Render from './components/Render.js';

import Validation from './components/Validation.js';

import Game from './components/Game.js';

import Encryption from './components/Encryption.js';

import Help from './components/Help.js';

// classes initialization

const movesList =
    process.argv.slice(2); /* command line arguments (possible moves)  */

const render = new Render();

const encryption = new Encryption();

const validation = new Validation();

const game = new Game();

const help = new Help(game.calculateMoveData.bind(game));

const app = new App({
    movesList,
    getComputerMove: (movesList) =>
        game.getRandomMove(
            movesList
        ) /* generate and return random move for computer */,
    encryptComputerMove: (move) => {
        const { hmac, key } = encryption.generateHmac(move);
        render.showHmac(hmac);
        return key;
    } /* create and render HMAC aan returns secret key */,
    getUserMove: (movesList) =>
        render.showMainMenu(
            movesList
        ) /* render main menu and return user move */,
    showHelpTable: (movesList) =>
        help.showTable(
            movesList
        ) /* calculate and render round result and secret key */,
    getGameResult: (move, movesList, key) => {
        const result = game.getGameResult(move, movesList);
        render.showResult(result);
        render.showKey(key);
        return result;
    } /* calculate and render info table for every option */,
    handleNextRoundMenu: () =>
        render.showNextRoundMenu() /* ask user for another round and return result */,
});

// app

const movesListValidationError =
    validation.validateMovesList(
        movesList
    ); /* validation of command line arguments */

movesListValidationError
    ? render.showError(movesListValidationError)
    : app.start();
