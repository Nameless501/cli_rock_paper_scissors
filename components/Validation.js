import {
    ERROR_EVEN_ARGUMENTS,
    ERROR_FEW_ARGUMENTS,
    ERROR_REPEATED_ARGUMENTS,
} from '../configs/configs.js';

class Validation {
    constructor() {}

    validateOptionsList = (optionsList) => {
        if (optionsList.length < 3) {
            return ERROR_FEW_ARGUMENTS;
        }
        if (optionsList.length % 2 === 0) {
            return ERROR_EVEN_ARGUMENTS;
        }
        if (optionsList.length > new Set(optionsList).size) {
            return ERROR_REPEATED_ARGUMENTS;
        }
    };
}

export default Validation;
