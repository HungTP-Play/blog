import { IGame } from './game.interface';
import { IMinesweeperDrawer } from './minesweeper-drawer.interface';
const prompt = require('prompt-sync')();

export class Minesweeper implements IGame {
    drawer: IMinesweeperDrawer;
    board: number[][] = [];
    opened: number[][] = [];
    flags: number[][] = [];
    cursor: number[] = [0, 0];
    rows: number = 0;
    cols: number = 0;
    mines: number = 0;
    LOGO = `
    $$\                                                                                     
    \__|                                                                                    
$$$$$$\$$$$\  $$\ $$$$$$$\   $$$$$$$\ $$\  $$\  $$\  $$$$$$\   $$$$$$\   $$$$$$\   $$$$$$\   $$$$$$\  
$$  _$$  _$$\ $$ |$$  __$$\ $$  _____|$$ | $$ | $$ |$$  __$$\ $$  __$$\ $$  __$$\ $$  __$$\ $$  __$$\ 
$$ / $$ / $$ |$$ |$$ |  $$ |\$$$$$$\  $$ | $$ | $$ |$$$$$$$$ |$$$$$$$$ |$$ /  $$ |$$$$$$$$ |$$ |  \__|
$$ | $$ | $$ |$$ |$$ |  $$ | \____$$\ $$ | $$ | $$ |$$   ____|$$   ____|$$ |  $$ |$$   ____|$$ |      
$$ | $$ | $$ |$$ |$$ |  $$ |$$$$$$$  |\$$$$$\$$$$  |\$$$$$$$\ \$$$$$$$\ $$$$$$$  |\$$$$$$$\ $$ |      
\__| \__| \__|\__|\__|  \__|\_______/  \_____\____/  \_______| \_______|$$  ____/  \_______|\__|      
                                                            $$ |                          
                                                            $$ |                          
                                                            \__|                          
`;

    constructor(drawer: IMinesweeperDrawer) {
        this.drawer = drawer;
    }

    /**
     *
     * @returns [mines, rows, cols]
     */
    selectLevel(): [number, number, number] {
        console.log('Select difficulty level:');
        console.log('1. Easy 9x9 with 10 mines');
        console.log('2. Medium 16x16 with 40 mines');
        console.log('3. Hard 16x30 with 99 mines');
        const difficulty = parseInt(prompt('Choose a difficulty level: '));
        if (isNaN(difficulty)) {
            console.log('Invalid difficulty');
            return this.selectLevel();
        }

        switch (difficulty) {
            case 1:
                return [10, 9, 9];
            case 2:
                return [40, 16, 16];
            case 3:
                return [99, 16, 30];
            default:
                console.log('Invalid difficulty, please try again');
                return this.selectLevel();
        }
    }

    /**
     * Return valid neighbors of a cell
     * @param row
     * @param col
     * @returns
     */
    getNeighbors(x: number, y: number): number[][] {
        const neighbors: number[][] = [
            [x - 1, y - 1],
            [x - 1, y],
            [x - 1, y + 1],
            [x, y - 1],
            [x, y + 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1],
        ];

        return neighbors.filter(([x, y]) => {
            return x >= 0 && x < this.rows && y >= 0 && y < this.cols;
        });
    }

    /**
     * Create an empty game board filled with zeros
     * @param rows
     * @param cols
     * @returns
     */
    createEmptyGameBoard(rows: number, cols: number): number[][] {
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
    placeMinesOnBoard(board: number[][], mines: number): number[][] {
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
     * Place numbers on the game board, based on the number of mines around each cell
     * @param board
     * @returns
     */
    placeNumbersOnBoard(board: number[][]): number[][] {
        const rows = board.length;
        const cols = board[0].length;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (board[row][col] === 0) {
                    const neighbors = this.getNeighbors(row, col);
                    let mines = 0;
                    for (const [x, y] of neighbors) {
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
     * Initialize the board with mines and numbers
     */
    initBoard(): void {
        const gameBoard = this.createEmptyGameBoard(this.rows, this.cols);
        const boardWithMines = this.placeMinesOnBoard(gameBoard, this.mines);
        this.board = this.placeNumbersOnBoard(boardWithMines);
    }

    checkWin(): void {
        const isWin =
            this.opened.length + this.flags.length ===
            this.board.length * this.board[0].length;

        if (isWin) {
            this.drawer.drawWon(this.board, this.opened, this.flags);
            process.exit();
        }
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
    open(x: number, y: number): void {
        if (this.board[x][y] === -1) {
            this.drawer.drawLost(this.board);
            this.stop();
        }
        if (this.board[x][y] === 0) {
            this.opened.push([x, y]);
            const neighbors = this.getNeighbors(x, y);
            for (const [nx, ny] of neighbors) {
                if (!this.opened.some(([a, b]) => a === nx && b === ny)) {
                    this.open(nx, ny);
                }
            }
        } else {
            this.opened.push([x, y]);
        }
    }

    /**
     * If the cell is not opened and not flagged -> flag it
     *
     * If the cell is flagged -> unflag it
     * @param x
     * @param y
     */
    flag(x: number, y: number): void {
        if (!this.opened.some((cell) => cell[0] === x && cell[1] === y)) {
            const flagIndex = this.flags.findIndex(
                (cell) => cell[0] === x && cell[1] === y,
            );
            if (flagIndex === -1) {
                this.flags.push([x, y]);
            } else {
                this.flags.splice(flagIndex, 1);
            }
        }
    }

    /**
     * Main game loop
     */
    loop() {
        this.drawer.draw(this.board, this.opened, this.flags, this.cursor);

        const readline = require('readline');
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                this.stop();
            } else if (key.name === 'up') {
                this.cursor[0] = Math.max(this.cursor[0] - 1, 0);
            } else if (key.name === 'down') {
                this.cursor[0] = Math.min(this.cursor[0] + 1, this.rows - 1);
            } else if (key.name === 'left') {
                this.cursor[1] = Math.max(this.cursor[1] - 1, 0);
            } else if (key.name === 'right') {
                this.cursor[1] = Math.min(this.cursor[1] + 1, this.cols - 1);
            } else if (key.name === 'space') {
                this.open(this.cursor[0], this.cursor[1]);
            } else if (key.name === 'f') {
                this.flag(this.cursor[0], this.cursor[1]);
            }

            this.checkWin();

            this.drawer.draw(this.board, this.opened, this.flags, this.cursor);
            this.drawer.drawRemainingFlags(this.mines - this.flags.length);
        });
    }

    start(): void {
        console.log(this.LOGO);
        const [mines, rows, cols] = this.selectLevel();
        this.mines = mines;
        this.rows = rows;
        this.cols = cols;
        this.initBoard();
        console.clear();
        this.loop();
    }

    /**
     * Gracefully stop the game
     */
    stop(): void {
        process.exit(0);
    }

    restart(): void {
        throw new Error('Method not implemented.');
    }
}
