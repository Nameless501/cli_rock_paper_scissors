import Table from 'cli-table3';

import chalk from 'chalk';

class Help {
    constructor(calculateMoveData) {
        this._calculateMoveData =
            calculateMoveData; /* calculate current move result relatively to every option */

        this._table;
    }

    _createTable = (movesList) => {
        this._table = new Table({
            head: [
                '',
                ...movesList.map((el) => chalk.black.bold(el)),
            ] /* table headers for every option column */,
        });
    };

    _createRow = (title, moveData, movesList) => {
        const row = {};
        row[chalk.black.bold(title) + ' *'] = movesList.map((elem) => {
            if (moveData.win.includes(elem)) {
                return chalk.bold.greenBright('Win');
            } else if (moveData.lose.includes(elem)) {
                return chalk.bold.redBright('Lose');
            } else {
                return chalk.bold.yellowBright('Draw');
            }
        });
        return row;
    };

    _fillTable = (movesList) => {
        this._table.push(
            ...movesList.reduce((acc, title, ind, arr) => {
                const moveData = this._calculateMoveData(ind, movesList);
                const row = this._createRow(
                    title,
                    moveData,
                    arr
                ); /* create table row object for every option */
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
