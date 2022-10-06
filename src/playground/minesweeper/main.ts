let openedCells: number[][] = [];
let flaggedCells: number[][] = [];
const board: number[][] = [];
const prompt = require('prompt-sync')();
/**
 * -1 = mine
 *
 * 0 = empty
 *
 * 1 = 1 mine
 *
 * 2 = 2 mines
 *
 * 3 = 3 mines
 *
 * 4 = 4 mines
 *
 * and so on...
 * @param width
 * @param height
 * @param numberOfBombs
 * @returns
 */
export function buildGameBoard(
    width: number,
    height: number,
    numberOfBombs: number,
): number[][] {
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            row.push(0);
        }
        board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
        const randomRowIndex = Math.floor(Math.random() * height);
        const randomColumnIndex = Math.floor(Math.random() * width);
        if (board[randomRowIndex][randomColumnIndex] !== -1) {
            board[randomRowIndex][randomColumnIndex] = -1;
            numberOfBombsPlaced++;
        }
    }

    // Place numbers
    for (let rowIndex = 0; rowIndex < height; rowIndex++) {
        for (let columnIndex = 0; columnIndex < width; columnIndex++) {
            if (board[rowIndex][columnIndex] === -1) {
                continue;
            }
            let numberOfBombs = 0;
            const neighborOffsets = [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1],
            ];
            neighborOffsets.forEach((offset) => {
                const neighborRowIndex = rowIndex + offset[0];
                const neighborColumnIndex = columnIndex + offset[1];
                if (
                    neighborRowIndex >= 0 &&
                    neighborRowIndex < height &&
                    neighborColumnIndex >= 0 &&
                    neighborColumnIndex < width
                ) {
                    if (board[neighborRowIndex][neighborColumnIndex] === -1) {
                        numberOfBombs++;
                    }
                }
            });
            board[rowIndex][columnIndex] = numberOfBombs;
        }
    }

    return board;
}

// Pretty print the board with '-' for empty and 🚀 for mine
export function printGameBoard(
    board: number[][],
    openedCell: number[][],
    flaggedCells: number[][],
): void {
    for (let i = 0; i < board.length; i++) {
        console.log(
            board[i]
                .map((cell, index) => {
                    const x = i;
                    const y = index;
                    if (cell === -1) {
                        return '🚀';
                    }
                    if (
                        flaggedCells.some(
                            (cell) => cell[0] === x && cell[1] === y,
                        )
                    ) {
                        return '🚩';
                    }
                    return `${cell} `;
                })
                .join(' '),
        );
    }
}

// Show opened cells, flagged cells and empty cells
export function printPlayBoard(
    board: number[][],
    openedCell: number[][],
    flaggedCells: number[][],
): void {
    for (let i = 0; i < board.length; i++) {
        console.log(
            board[i]
                .map((cell, index) => {
                    const x = i;
                    const y = index;

                    if (
                        openedCell.some(
                            (cell) => cell[0] === x && cell[1] === y,
                        )
                    ) {
                        return `${cell} `;
                    }
                    if (
                        flaggedCells.some(
                            (cell) => cell[0] === x && cell[1] === y,
                        )
                    ) {
                        return '🚩';
                    }
                    return '⬜';
                })
                .join(' '),
        );
    }
}

export function getNeighborCells(
    board: number[][],
    x: number,
    y: number,
): number[][] {
    const neighborCells = [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y - 1],
        [x, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
    ];
    return neighborCells.filter((cell) => {
        return (
            cell[0] >= 0 &&
            cell[0] < board.length &&
            cell[1] >= 0 &&
            cell[1] < board[0].length
        );
    });
}

export function open(board: number[][], x: number, y: number): boolean {
    if (board[x][y] === -1) {
        console.clear();
        printGameBoard(board, openedCells, flaggedCells);
        console.log('Game over! 🚀');
        return true;
    }
    const neighborCells = getNeighborCells(board, x, y);
    if (board[x][y] === 0) {
        openedCells.push([x, y]);
        neighborCells.forEach((cell) => {
            if (
                !openedCells.some((c) => c[0] === cell[0] && c[1] === cell[1])
            ) {
                open(board, cell[0], cell[1]);
            }
        });
    } else {
        openedCells.push([x, y]);
    }
    console.clear();
    printPlayBoard(board, openedCells, flaggedCells);
    return false;
}

export function main() {
    let width = 0;
    let height = 0;
    let numberOfBombs = 0;
    console.log('Welcome to Minesweeper!');
    console.log('Please select a difficulty:');
    console.log('1. Easy');
    console.log('2. Medium');
    console.log('3. Hard');
    console.log('4. Custom');

    const difficulty = parseInt(prompt('Select a difficulty: '));
    if (isNaN(difficulty)) {
        console.log('Invalid difficulty');
        return;
    }

    if (difficulty === 1) {
        width = 8;
        height = 8;
        numberOfBombs = 10;
    } else if (difficulty === 2) {
        width = 16;
        height = 16;
        numberOfBombs = 40;
    } else if (difficulty === 3) {
        width = 30;
        height = 16;
        numberOfBombs = 99;
    } else if (difficulty === 4) {
        width = parseInt(prompt('Enter width: '));
        height = parseInt(prompt('Enter height: '));
        numberOfBombs = parseInt(prompt('Enter number of bombs: '));
    } else {
        console.log('Invalid difficulty');
        return;
    }

    console.log(`Find ${numberOfBombs} bombs in ${width}x${height} board`);
    const board = buildGameBoard(width, height, numberOfBombs);
    printPlayBoard(board, openedCells, flaggedCells);
    let isGameOver = false;
    while (!isGameOver) {
        const xInput = prompt('Enter x: ');
        const yInput = prompt('Enter y: ');
        const x = parseInt(xInput);
        const y = parseInt(yInput);
        isGameOver = open(board, x, y);
        let flagMode = true;
        if (!isGameOver) {
            while (flagMode) {
                console.log("In flag mode. Enter 'x' to exit flag mode");
                console.log(
                    'Remaining 🚩 x',
                    numberOfBombs - flaggedCells.length,
                );
                const xInput = prompt('Flag x: ');
                const yInput = prompt('Flag y: ');
                if (xInput === 'x' && yInput === 'x') {
                    flagMode = false;
                    break;
                }

                const x = parseInt(xInput);
                const y = parseInt(yInput);
                if (
                    flaggedCells.some((cell) => cell[0] === x && cell[1] === y)
                ) {
                    // Remove flag
                    flaggedCells = flaggedCells.filter(
                        (cell) => cell[0] !== x || cell[1] !== y,
                    );
                } else if (
                    !openedCells.some((cell) => cell[0] === x && cell[1] === y)
                ) {
                    flaggedCells.push([x, y]);
                }
                console.clear();
                printPlayBoard(board, openedCells, flaggedCells);

                if (
                    flaggedCells.length === numberOfBombs &&
                    openedCells.length === width * height - numberOfBombs
                ) {
                    console.log('You win! 🎉🎉🎉🎉🎉');
                    isGameOver = true;
                    break;
                }
            }
        }
    }
}

main();
