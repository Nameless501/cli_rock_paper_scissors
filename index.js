import App from './components/App.js';

import Render from './components/Render.js';

import Validation from './components/Validation.js';

import Game from './components/Game.js';

import Encryption from './components/Encryption.js';

import Help from './components/Help.js';

const render = new Render();

const encryption = new Encryption();

const validation = new Validation();

const game = new Game();

const help = new Help(game.calculateMoveData.bind(game));

const app = new App({
    getNewGameMenuOption: render.showGameTypeMenu,
    getCustomGameOptions: render.showCustomGameTypeMenu,
    getComputerMove: game.getRandomMove,
    getUserMove: render.showUserMoveMenu,
    getRoundResult: game.getGameResult,
    getNextRoundOption: render.showNextRoundMenu,
    renderInfoTable: help.showTable,
    renderError: render.showError,
    renderHmac: render.showHmac,
    renderRoundResult: render.showResult,
    renderSecretKey: render.showKey,
    encryptMoveData: encryption.generateHmac,
    validateOptions: validation.validateOptionsList,
});

app.start();
