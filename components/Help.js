import Table from 'cli-table3';

import chalk from 'chalk';

class Help {
    constructor(calculateMoveData) {
        this._calculateMoveData = calculateMoveData;

        this._table;
    }

    _createTable = (optionsList) => {
        this._table = new Table({
            head: ['', ...optionsList.map((el) => chalk.black.bold(el))],
        });
    };

    _createRow = (title, moveData, optionsList) => {
        const row = {};
        row[chalk.black.bold(title) + ' *'] = optionsList.map((elem) => {
            if (moveData.win.includes(elem)) {
                return chalk.bold.redBright('Lose');
            } else if (moveData.lose.includes(elem)) {
                return chalk.bold.greenBright('Win');
            } else {
                return chalk.bold.yellowBright('Draw');
            }
        });
        return row;
    };

    _fillTable = (optionsList) => {
        this._table.push(
            ...optionsList.reduce((acc, title, ind, arr) => {
                const moveData = this._calculateMoveData(ind, optionsList);
                const row = this._createRow(title, moveData, arr);
                return [...acc, row];
            }, [])
        );
    };

    showTable = (optionsList) => {
        this._createTable(optionsList);
        this._fillTable(optionsList);
        console.log('\n' + this._table.toString());
    };
}

export default Help;
