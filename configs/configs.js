export const ERROR_EVEN_ARGUMENTS = 'Must be odd number of options.';

export const ERROR_FEW_ARGUMENTS = 'Must be more then 3 options.';

export const ERROR_OPTION_NOT_FOUND = '\nInvalid option. Available options: ';

export const ERROR_REPEATED_ARGUMENTS = 'Options should not repeat.';

export const GAME_STAGES_CONFIG = {
    newGameStart: 'newGameStart',
    optionsCustomization: 'optionsCustomization',
    roundStart: 'roundStart',
    userMove: 'userMove',
    infoTable: 'infoTable',
    roundResult: 'roundResult',
    roundEnd: 'roundEnd',
};

export const MOVES_OPTIONS_CONFIG = {
    '1': ['rock', 'paper', 'scissors'],
    '2': ['rock', 'paper', 'scissors', 'lizard', 'spock'],
}

export const HMAC_TEXT = '\nHMAC: ';

export const HMAC_KEY_TEXT = 'HMAC key: ';

export const CUSTOM_GAME_TYPE_MENU_CONFIG = {
    title: '\nEnter your custom options',
    subtitle: 'Keep in mind that the order affects the result. There must be more than 3 options and the number of options must be odd.',
    question: '\nYour options: ',
};

export const GAME_TYPE_MENU_CONFIG = {
    title: '\nChoose game type:',
    default: '1 - rock, paper, scissors',
    extended: '2 - rock, paper, scissors, lizard, Spock',
    custom: '3 - enter custom options',
    exit: '0 - exit',
    question: '\nYour move: ',
};

export const MAIN_MENU_CONFIG = {
    title: '\nAvailable moves:',
    exit: '0 - exit',
    help: '? - help',
    type: '! - change game options',
    question: '\nYour move: ',
};

export const NEXT_ROUND_MENU_CONFIG = {
    title: '\nOne more round?',
    next: '1 - yes',
    exit: '2 - no',
    question: '\nYour choice: ',
};

export const RESULTS_CONFIG = {
    user: '\nYour move: ',
    computer: 'Computer move: ',
    result: {
        win: 'You win!\n',
        lose: 'You lose\n',
        draw: 'Draw\n',
    },
};
