const prompt = require('prompt-sync')();
/**
 * Create an empty game board filled with zeros
 * @param rows
 * @param cols
 * @returns
 */
export function createEmptyGameBoard(rows: number, cols: number): number[][] {
    return Array(rows)
        .fill(0)
        .map(() => Array(cols).fill(0));
}

/**
 * Place mines on the game board
 * @param board
 * @param mines
 * @returns
 */
export function placeMinesOnBoard(
    board: number[][],
    mines: number,
): number[][] {
    let minesPlaced = 0;
    while (minesPlaced < mines) {
        const row = Math.floor(Math.random() * board.length);
        const col = Math.floor(Math.random() * board[0].length);
        if (board[row][col] === 0) {
            board[row][col] = -1;
            minesPlaced++;
        }
    }
    return board;
}

/**
 * Get valid neighbors of a cell
 * @param x
 * @param y
 * @param rows
 * @param cols
 * @returns
 */
export function neighborsOf(
    x: number,
    y: number,
    rows: number,
    cols: number,
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
    return neighborCells.filter(
        (cell) =>
            cell[0] >= 0 && cell[0] < rows && cell[1] >= 0 && cell[1] < cols,
    );
}

/**
 * Place numbers on the game board, based on the number of mines around each cell
 * @param board
 * @returns
 */
export function placeNumbersOnBoard(board: number[][]): number[][] {
    const rows = board.length;
    const cols = board[0].length;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] === 0) {
                let mines = 0;
                for (const [x, y] of neighborsOf(row, col, rows, cols)) {
                    if (board[x][y] === -1) {
                        mines++;
                    }
                }
                board[row][col] = mines;
            }
        }
    }

    return board;
}

/**
 * Create a new game board with the given dimensions and number of mines.
 * @param rows
 * @param cols
 * @param mines
 * @returns
 */
export function buildGameBoard(
    rows: number,
    cols: number,
    mines: number,
): number[][] {
    let gameBoard = createEmptyGameBoard(rows, cols);
    gameBoard = placeMinesOnBoard(gameBoard, mines);
    gameBoard = placeNumbersOnBoard(gameBoard);
    return gameBoard;
}

const NUMBERS: { [key: number]: string } = {
    1: '\x1b[34m1\x1b[0m',
    2: '\x1b[32m2\x1b[0m',
    3: '\x1b[31m3\x1b[0m',
    4: '\x1b[35m4\x1b[0m',
    5: '\x1b[36m5\x1b[0m',
    6: '\x1b[37m6\x1b[0m',
    7: '\x1b[38m7\x1b[0m',
    8: '\x1b[39m8\x1b[0m',
};

/**
 * Draw the game board on the screen
 * @param board
 * @param opened
 * @param flags
 * @param cursor
 */
export function drawBoard(
    board: number[][],
    opened: number[][],
    flags: number[][],
    cursor: number[],
): void {
    for (let i = 0; i < board.length; i++) {
        console.log(
            board[i]
                .map((cell, index) => {
                    const x = i;
                    const y = index;

                    if (cursor[0] === x && cursor[1] === y) {
                        return '▓ ';
                    }

                    if (opened.some((cell) => cell[0] === x && cell[1] === y)) {
                        if (cell === 0) {
                            return '  ';
                        }
                        return `${NUMBERS[cell]} `;
                    }

                    if (flags.some((cell) => cell[0] === x && cell[1] === y)) {
                        return '🚩';
                    }
                    return '~ ';
                })
                .join(' '),
        );
    }
}

/**
 * Select the level of the game
 * @returns
 */
function selectLevel(): number[] {
    console.log('Select a level: \n 1. Easy \n 2. Medium \n 3. Hard');
    let level = prompt('Enter a level: ');
    switch (level) {
        case '1':
            return [9, 9, 10];
        case '2':
            return [16, 16, 40];
        case '3':
            return [16, 30, 99];
        default:
            console.log('Invalid level');
            return selectLevel();
    }
}

/**
 * Win when all the cells are opened and all mines are flagged
 * @param board
 * @param opened
 * @param flags
 * @param mines
 * @returns
 */
function checkWin(
    board: number[][],
    opened: number[][],
    flags: number[][],
    mines: number,
): boolean {
    return opened.length + flags.length === board.length * board[0].length;
}

/**
 * Flood fill algorithm to open all the cells around a cell with no mines around it
 *
 * if: cell == 0 and cell not in opened -> add to opened and call floodFill on all neighbors
 *
 * else: add cell to opened
 *
 * @param board
 * @param cursor
 * @param opened
 */
function open(board: number[][], cursor: number[], opened: number[][]) {
    const [x, y] = cursor;
    if (board[x][y] === -1) {
        console.log('Game over!');
        process.exit(0);
    }

    if (
        board[x][y] === 0 &&
        !opened.some((cell) => cell[0] === x && cell[1] === y)
    ) {
        opened.push(cursor);
        for (const [nx, ny] of neighborsOf(
            x,
            y,
            board.length,
            board[0].length,
        )) {
            open(board, [nx, ny], opened);
        }
    } else {
        opened.push(cursor);
    }
}

/**
 * Flag a cell
 *
 * If the cell is not opened and not flagged -> flag it (add to flags)
 *
 * If the cell is flagged -> unflag it (remove from flags)
 * @param cursor
 * @param flags
 * @param opened
 */
function flag(cursor: number[], flags: number[][], opened: number[][]) {
    if (
        !opened.some((cell) => cell[0] === cursor[0] && cell[1] === cursor[1])
    ) {
        const flagIndex = flags.findIndex(
            (cell) => cell[0] === cursor[0] && cell[1] === cursor[1],
        );
        if (flagIndex === -1) {
            flags.push(cursor);
        } else {
            flags.splice(flagIndex, 1);
        }
    }
}

/**
 * Main game play loop
 * @param board
 * @param opened
 * @param flags
 * @param cursor
 * @param mines
 */
function gameLoop(
    board: number[][],
    opened: number[][],
    flags: number[][],
    cursor: number[],
    mines: number,
) {
    const rows = board.length;
    const cols = board[0].length;

    console.clear();
    drawBoard(board, opened, flags, cursor);

    const readline = require('readline');
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
            process.exit(0);
        } else if (key.name === 'up') {
            cursor[0] = Math.max(cursor[0] - 1, 0);
        } else if (key.name === 'down') {
            cursor[0] = Math.min(cursor[0] + 1, rows - 1);
        } else if (key.name === 'left') {
            cursor[1] = Math.max(cursor[1] - 1, 0);
        } else if (key.name === 'right') {
            cursor[1] = Math.min(cursor[1] + 1, cols - 1);
        } else if (key.name === 'space') {
            open(board, [cursor[0], cursor[1]], opened);
        } else if (key.name === 'f') {
            flag([cursor[0], cursor[1]], flags, opened);
        }

        if (checkWin(board, opened, flags, mines)) {
            console.log('You win!');
            process.exit(0);
        }

        console.clear();
        drawBoard(board, opened, flags, cursor);
        console.log('Remaining flags: ', mines - flags.length);
    });
}

function minesweeperPlay() {
    const [rows, cols, mines] = selectLevel();
    const gameBoard = buildGameBoard(rows, cols, mines);
    const opened: number[][] = [];
    const flags: number[][] = [];
    let cursor = [0, 0];

    gameLoop(gameBoard, opened, flags, cursor, mines);
}

minesweeperPlay();
