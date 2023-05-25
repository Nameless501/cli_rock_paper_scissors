import Table from 'cli-table3';

import chalk from 'chalk';

class Help {
    constructor(calculateMoveData) {
        this._calculateMoveData = calculateMoveData;

        this._table;
    }

    _createTable = (movesList) => {
        this._table = new Table({
            head: ['', ...movesList.map((el) => chalk.black.bold(el))],
        });
    };

    _fillTable = (movesList) => {
        this._table.push(
            ...movesList.reduce((acc, title, ind, arr) => {
                const row = {};
                const options = this._calculateMoveData(ind, movesList);

                row[chalk.black.bold(title) + ' *'] = arr.map((elem) => {
                    if (options.win.includes(elem)) {
                        return chalk.bold.greenBright('Win');
                    } else if (options.lose.includes(elem)) {
                        return chalk.bold.redBright('Lose');
                    } else {
                        return chalk.bold.yellowBright('Draw');
                    }
                });
                return [...acc, row];
            }, [])
        );
    };

    showTable = (movesList) => {
        this._createTable(movesList);
        this._fillTable(movesList);
        console.log('\n' + this._table.toString());
    };
}

export default Help;
