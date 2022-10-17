import { IGame } from '../minesweeper/oop/game.interface';
import { IGame2048Drawer } from './drawer';

export class Game2048 implements IGame {
    board: number[][] = [];
    score: number = 0;
    numberOfMoves: number = 0;
    rows = 4;
    cols = 4;
    drawer: IGame2048Drawer;
    movement: boolean = true;

    constructor(drawer: IGame2048Drawer) {
        this.drawer = drawer;
    }

    name(): string {
        return '2048';
    }

    /**
     * Randomly return a 2 or 4
     */
    private generateRandomNumber(): number {
        return Math.random() < 0.5 ? 2 : 4;
    }

    /**
     * Random pick a cell and put a 2 or 4 in it
     *
     * If the cell is already occupied, pick another cell
     */
    private randomPlaceNumber(): void {
        const row = Math.floor(Math.random() * this.rows);
        const col = Math.floor(Math.random() * this.cols);
        if (this.board[row][col] === 0) {
            this.board[row][col] = this.generateRandomNumber();
        } else {
            this.randomPlaceNumber();
        }
    }

    /**
     * Return 2D rows x cols zero matrix
     * @returns
     */
    private createEmptyBoard(): number[][] {
        return Array(this.rows)
            .fill(0)
            .map(() => Array(this.cols).fill(0));
    }

    /**
     * Initialize the board with 2 numbers
     */
    private initializeBoard(): void {
        this.board = this.createEmptyBoard();
        this.randomPlaceNumber();
        this.randomPlaceNumber();
    }

    /**
     * Move the board up
     *
     */
    private up() {
        this.movement = false;
        let scoreToAdd = 0;
        for (let c = 0; c < this.cols; c++) {
            for (let r = 0; r < this.rows; r++) {
                if (this.board[r][c] !== 0) {
                    let row = r;
                    while (row > 0) {
                        if (this.board[row - 1][c] === 0) {
                            this.board[row - 1][c] = this.board[row][c];
                            this.board[row][c] = 0;
                            this.movement = true;
                            row--;
                        } else if (
                            this.board[row - 1][c] === this.board[row][c]
                        ) {
                            this.board[row - 1][c] *= 2;
                            this.board[row][c] = 0;
                            scoreToAdd += this.board[row - 1][c];
                            this.movement = true;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        if (this.movement) {
            this.numberOfMoves++;
        }

        this.score += scoreToAdd;
    }

    /**
     * Move the board down
     *
     */
    private down() {
        this.movement = false;
        let scoreToAdd = 0;
        for (let c = 0; c < this.cols; c++) {
            for (let r = this.rows - 1; r >= 0; r--) {
                if (this.board[r][c] !== 0) {
                    let row = r;
                    while (row < this.rows - 1) {
                        if (this.board[row + 1][c] === 0) {
                            this.board[row + 1][c] = this.board[row][c];
                            this.board[row][c] = 0;
                            this.movement = true;
                            row++;
                        } else if (
                            this.board[row + 1][c] === this.board[row][c]
                        ) {
                            this.board[row + 1][c] *= 2;
                            this.board[row][c] = 0;
                            scoreToAdd += this.board[row + 1][c];
                            this.movement = true;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        if (this.movement) {
            this.numberOfMoves++;
        }

        this.score += scoreToAdd;
    }

    /**
     * Move the board left
     *
     */
    private left() {
        this.movement = false;
        let scoreToAdd = 0;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c] !== 0) {
                    let col = c;
                    while (col > 0) {
                        if (this.board[r][col - 1] === 0) {
                            this.board[r][col - 1] = this.board[r][col];
                            this.board[r][col] = 0;
                            this.movement = true;
                            col--;
                        } else if (
                            this.board[r][col - 1] === this.board[r][col]
                        ) {
                            this.board[r][col - 1] *= 2;
                            this.board[r][col] = 0;
                            this.movement = true;
                            scoreToAdd += this.board[r][col - 1];
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        if (this.movement) {
            this.numberOfMoves++;
        }

        this.score += scoreToAdd;
    }

    /**
     * Move the board right
     *
     */
    private right() {
        let scoreToAdd = 0;
        this.movement = false;
        for (let r = 0; r < this.rows; r++) {
            for (let c = this.cols - 1; c >= 0; c--) {
                if (this.board[r][c] !== 0) {
                    let col = c;
                    while (col < this.cols - 1) {
                        if (this.board[r][col + 1] === 0) {
                            this.board[r][col + 1] = this.board[r][col];
                            this.board[r][col] = 0;
                            this.movement = true;
                            col++;
                        } else if (
                            this.board[r][col + 1] === this.board[r][col]
                        ) {
                            this.board[r][col + 1] *= 2;
                            this.board[r][col] = 0;
                            this.movement = true;
                            scoreToAdd += this.board[r][col + 1];
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        if (this.movement) {
            this.numberOfMoves++;
        }

        this.score += scoreToAdd;
    }

    /**
     * Check if there is any empty cell
     * @returns
     */
    private hasEmptyCell(): boolean {
        return this.board.some((row) => row.some((cell) => cell === 0));
    }

    /**
     * Check if you lost the game, can't move anymore
     */
    private checkLose() {
        let isLost = true;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c] === 0) {
                    isLost = false;
                    break;
                }
                if (
                    r < this.rows - 1 &&
                    this.board[r][c] === this.board[r + 1][c]
                ) {
                    isLost = false;
                    break;
                }
                if (
                    c < this.cols - 1 &&
                    this.board[r][c] === this.board[r][c + 1]
                ) {
                    isLost = false;
                    break;
                }
            }
        }

        if (isLost) {
            this.drawer.drawLose(this.board);
            this.stop();
        }
    }

    /**
     * Check if you won the game, you have 2048
     */
    private checkWin() {
        if (this.board.some((row) => row.some((cell) => cell === 2048))) {
            this.drawer.drawWin(this.board);
            this.stop();
        }
    }

    /**
     * Main loop of the game, listen to keyboard events and update the board
     */
    private loop() {
        const readline = require('readline');
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                process.exit();
            } else {
                switch (key.name) {
                    case 'up':
                        this.up();
                        break;
                    case 'down':
                        this.down();
                        break;
                    case 'left':
                        this.left();
                        break;
                    case 'right':
                        this.right();
                    // ctrl + R to restart the game
                    case 'r':
                        if (key.ctrl) {
                            this.restart();
                        }
                        break;
                }
                if (this.hasEmptyCell() && this.movement === true) {
                    this.randomPlaceNumber();
                }
                this.checkLose();
                this.checkWin();
                this.drawer.draw(this.board);
                this.drawer.drawNumbOfMoves(this.numberOfMoves);
                this.drawer.drawScore(this.score);
            }
        });
    }

    start(): void {
        this.initializeBoard();
        this.drawer.draw(this.board);
        this.drawer.drawNumbOfMoves(this.numberOfMoves);
        this.drawer.drawScore(this.score);
        this.loop();
    }

    stop(): void {
        process.exit(0);
    }
    restart(): void {
        this.start();
    }
}
