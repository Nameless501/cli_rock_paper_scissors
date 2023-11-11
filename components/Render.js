import readLine from 'readline-sync';

import chalk from 'chalk';

import {
    ERROR_OPTION_NOT_FOUND,
    RESULTS_CONFIG,
    HMAC_TEXT,
    HMAC_KEY_TEXT,
    MAIN_MENU_CONFIG,
    NEXT_ROUND_MENU_CONFIG,
    GAME_TYPE_MENU_CONFIG,
    CUSTOM_GAME_TYPE_MENU_CONFIG,
} from '../configs/configs.js';

class Render {
    constructor() { }

    _createGameTypeMenu = () => {
        return [
            chalk.blueBright.bold(GAME_TYPE_MENU_CONFIG.title),
            chalk.bold(GAME_TYPE_MENU_CONFIG.default),
            chalk.bold(GAME_TYPE_MENU_CONFIG.extended),
            chalk.bold(GAME_TYPE_MENU_CONFIG.custom),
            chalk.bold.redBright(GAME_TYPE_MENU_CONFIG.exit),
            chalk.bold(GAME_TYPE_MENU_CONFIG.question),
        ].join('\n');
    };

    showGameTypeMenu = () => readLine.question(this._createGameTypeMenu(), {
        limit: [...Array(4).keys()],
        limitMessage: chalk.bold.redBright(
            `${ERROR_OPTION_NOT_FOUND}[$<limit>]`
        ),
    });

    _createCustomGameTypeMenu = () => {
        return [
            chalk.blueBright.bold(CUSTOM_GAME_TYPE_MENU_CONFIG.title),
            chalk.greenBright.bold(CUSTOM_GAME_TYPE_MENU_CONFIG.subtitle),
            chalk.bold(CUSTOM_GAME_TYPE_MENU_CONFIG.question),
        ].join('\n');
    };

    showCustomGameTypeMenu = () => readLine.question(this._createCustomGameTypeMenu());

    showError = (err) => console.log(chalk.bold.redBright('\n' + err));

    _createUserMoveMenu = (optionsList) => {
        return [
            chalk.blueBright.bold(MAIN_MENU_CONFIG.title),
            ...optionsList.map((el, ind) => chalk.bold(`${ind + 1} - ${el}`)),
            chalk.bold.redBright(MAIN_MENU_CONFIG.exit),
            chalk.bold.greenBright(MAIN_MENU_CONFIG.help),
            chalk.bold.yellowBright(MAIN_MENU_CONFIG.type),
            chalk.bold(MAIN_MENU_CONFIG.question),
        ].join('\n');
    };

    showUserMoveMenu = (optionsList) => readLine.question(this._createUserMoveMenu(optionsList), {
        limit: [...Array(optionsList.length + 1).keys(), '?', '!'],
        limitMessage: chalk.bold.redBright(
            `${ERROR_OPTION_NOT_FOUND}[$<limit>]`
        ),
    });

    _createNextRoundMenu = () => {
        return [
            chalk.blueBright.bold(NEXT_ROUND_MENU_CONFIG.title),
            chalk.bold.greenBright(NEXT_ROUND_MENU_CONFIG.next),
            chalk.bold.redBright(NEXT_ROUND_MENU_CONFIG.exit),
            chalk.bold(NEXT_ROUND_MENU_CONFIG.question),
        ].join('\n');
    };

    showNextRoundMenu = () => readLine.question(this._createNextRoundMenu(), {
        limit: ['1', '2'],
        limitMessage: chalk.bold.redBright(
            `${ERROR_OPTION_NOT_FOUND}[$<limit>]`
        ),
        trueValue: ['1'],
        falseValue: ['2'],
    });

    showHmac = (hmac) => console.log(chalk.black.bold.bgYellowBright(HMAC_TEXT + hmac));

    showKey = (key) => console.log(chalk.whiteBright.bold.bgBlueBright(HMAC_KEY_TEXT + key));

    showResult = ({ user, computer, result }) => {
        console.log(chalk.bold(RESULTS_CONFIG.user + user));
        console.log(chalk.bold(RESULTS_CONFIG.computer + computer));
        console.log(chalk.bold(RESULTS_CONFIG.result[result]));
    };
}

export default Render;
