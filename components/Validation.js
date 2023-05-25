import {
    ERROR_EVEN_ARGUMENTS,
    ERROR_FEW_ARGUMENTS,
    ERROR_REPEATED_ARGUMENTS,
} from '../utils/constants.js';

class Validation {
    constructor() {}

    validateOptionsList = (movesList) => {
        if (movesList.length < 3) {
            return ERROR_FEW_ARGUMENTS;
        }
        if (movesList.length % 2 === 0) {
            return ERROR_EVEN_ARGUMENTS;
        }
        if (movesList.length > new Set(movesList).size) {
            return ERROR_REPEATED_ARGUMENTS;
        }
    };
}

export default Validation;
