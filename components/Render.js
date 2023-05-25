import readLine from 'readline-sync';

import chalk from 'chalk';

import {
    ERROR_OPTION_NOT_FOUND,
    RESULTS_CONFIG,
    HMAC_TEXT,
    HMAC_KEY_TEXT,
    MAIN_MENU_CONFIG,
    NEXT_ROUND_MENU_CONFIG,
} from '../utils/constants.js';

class Render {
    constructor() {}

    showError = (err) => {
        console.log(chalk.bold.redBright(err));
    };

    _createMainMenuOptions = (movesList) => {
        return [
            chalk.blueBright.bold(MAIN_MENU_CONFIG.title),
            ...movesList.map((el, ind) => chalk.bold(`${ind + 1} - ${el}`)),
            chalk.bold.redBright(MAIN_MENU_CONFIG.exit),
            chalk.bold.greenBright(MAIN_MENU_CONFIG.help),
            chalk.bold(MAIN_MENU_CONFIG.question),
        ].join('\n');
    };

    showMainMenu = (movesList) => {
        return readLine.question(this._createMainMenuOptions(movesList), {
            limit: [
                ...Array(movesList.length + 1).keys(),
                '?',
            ] /* array with available options for input validation */,
            limitMessage: chalk.bold.redBright(
                `${ERROR_OPTION_NOT_FOUND}[$<limit>]`
            ) /* validation message for wrong input */,
        });
    };

    _createNextRoundMenuOptions = () => {
        return [
            chalk.blueBright.bold(NEXT_ROUND_MENU_CONFIG.title),
            chalk.bold.greenBright(NEXT_ROUND_MENU_CONFIG.next),
            chalk.bold.redBright(NEXT_ROUND_MENU_CONFIG.exit),
            chalk.bold(NEXT_ROUND_MENU_CONFIG.question),
        ].join('\n');
    };

    showNextRoundMenu = () => {
        return readLine.question(this._createNextRoundMenuOptions(), {
            limit: [
                '1',
                '2',
            ] /* array with available options for input validation */,
            limitMessage: chalk.bold.redBright(
                `${ERROR_OPTION_NOT_FOUND}[$<limit>]`
            ) /* validation message for wrong input */,
            trueValue: ['1'] /* menu options that return truth */,
            falseValue: ['2'] /* menu options that return false */,
        });
    };

    showHmac = (hmac) => {
        console.log(chalk.black.bold.bgYellowBright(HMAC_TEXT + hmac));
    };

    showKey = (key) => {
        console.log(chalk.whiteBright.bold.bgBlueBright(HMAC_KEY_TEXT + key));
    };

    showResult = ({ user, computer, result }) => {
        console.log(chalk.bold(RESULTS_CONFIG.user + user));
        console.log(chalk.bold(RESULTS_CONFIG.computer + computer));
        console.log(chalk.bold(RESULTS_CONFIG.result[result]));
    };
}

export default Render;
