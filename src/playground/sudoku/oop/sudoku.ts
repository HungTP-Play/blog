import { IGame } from '../../minesweeper/oop/game.interface';
import { ISudokuDrawer } from './sudoku.drawer';
import { ISudokuSolver, SudokuSolver } from './sudoku.solver';
const prompt = require('prompt-sync')();

export class SudokuGame implements IGame {
    BOARD_SIZE = 9;
    cursor: number[] = [0, 0]; // cx, cy: cursor x, cursor y
    startTime: number = -1; // Game not started yet
    board: number[][] = [];
    solvedBoard: number[][] = [];
    drawer: ISudokuDrawer;
    solver?: ISudokuSolver;
    level: number = 1; // Easy
    processInterval: any;
    LEVEL_HINTS: { [key: number]: number } = {
        1: 45,
        2: 35,
        3: 25,
    };
    NUMBERS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    INTERVAL_TIME_MS = 1000;
    LOGO = `
    
            _________         .___      __          
            /   _____/__ __  __| _/____ |  | ____ __ 
            \_____  \|  |  \/ __ |/  _ \|  |/ /  |  \
            /        \  |  / /_/ (  <_> )    <|  |  /
            /_______  /____/\____ |\____/|__|_ \____/ 
                    \/           \/           \/      
            
    `;

    constructor(drawer: ISudokuDrawer) {
        this.board = Array(this.BOARD_SIZE)
            .fill(0)
            .map(() => Array(this.BOARD_SIZE).fill(0));

        this.solvedBoard = Array(this.BOARD_SIZE)
            .fill(0)
            .map(() => Array(this.BOARD_SIZE).fill(0));
        this.drawer = drawer;
    }

    /**
     * Select game level and generate a new board
     *
     * @param level 1: easy, 2: medium, 3: hard
     * @returns
     */
    private selectLevel(): void {
        console.log('Select difficulty level:');
        console.log('1. Easy');
        console.log('2. Medium');
        console.log('3. Hard');
        const difficulty = parseInt(prompt('Choose a difficulty level: '));
        if (isNaN(difficulty)) {
            console.log('Invalid difficulty');
            return this.selectLevel();
        }
        this.level = difficulty;
    }

    canPlace(num: number, x: number, y: number): boolean {
        // Check row
        if (this.solvedBoard[x].includes(num)) return false;

        // Check column
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            if (this.solvedBoard[i][y] === num) return false;
        }

        // Check 3x3 box
        const boxX = Math.floor(x / 3) * 3;
        const boxY = Math.floor(y / 3) * 3;
        for (let i = boxX; i < boxX + 3; i++) {
            for (let j = boxY; j < boxY + 3; j++) {
                if (this.solvedBoard[i][j] === num) return false;
            }
        }

        return true;
    }

    /**
     * Generate a new board using hint from solved board (see: https://www.geeksforgeeks.org/sudoku-backtracking-7/)
     */
    private generateBoard(): void {
        this.fillDiagonalBoxes();
        this.fillRemaining(0, 3);
        this.mapSolved();
    }

    private mapSolved(): void {
        const hints = this.LEVEL_HINTS[this.level];
        for (let i = 0; i < hints; i++) {
            const x = Math.floor(Math.random() * this.BOARD_SIZE);
            const y = Math.floor(Math.random() * this.BOARD_SIZE);
            this.board[x][y] = this.solvedBoard[x][y];
        }
    }

    private fillRemaining(x: number, y: number): boolean {
        if (y >= this.BOARD_SIZE && x < this.BOARD_SIZE - 1) {
            x++;
            y = 0;
        }
        if (x >= this.BOARD_SIZE && y >= this.BOARD_SIZE) {
            return true;
        }

        if (x < 3) {
            if (y < 3) y = 3;
        } else if (x < this.BOARD_SIZE - 3) {
            if (y === Math.floor(x / 3) * 3) y += 3;
        } else {
            if (y === this.BOARD_SIZE - 3) {
                x++;
                y = 0;
                if (x >= this.BOARD_SIZE) return true;
            }
        }

        for (let num = 1; num <= this.BOARD_SIZE; num++) {
            if (this.canPlace(num, x, y)) {
                this.solvedBoard[x][y] = num;
                if (this.fillRemaining(x, y + 1)) return true;
                this.solvedBoard[x][y] = 0;
            }
        }
        return false;
    }

    private fillDiagonalBoxes(): void {
        for (let i = 0; i < this.BOARD_SIZE; i += 3) {
            this.fillBox(i, i);
        }
    }

    private randomPickNumber(): number {
        return this.NUMBERS[Math.floor(Math.random() * this.NUMBERS.length)];
    }

    private fillBox(x: number, y: number): void {
        let num = this.randomPickNumber();
        for (let i = x; i < x + 3; i++) {
            for (let j = y; j < y + 3; j++) {
                while (!this.canPlace(num, i, j)) {
                    num = this.randomPickNumber();
                }
                this.solvedBoard[i][j] = num;
            }
        }
    }

    /**
     * Win when all cells are filled, no empty cell, no wrong number
     * @returns
     */
    private isWin(): boolean {
        // Check if all cells are filled
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                if (this.board[i][j] === 0) return false;
            }
        }

        // Check rows
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            const row = this.board[i];
            const set = new Set(row);
            if (set.size !== this.BOARD_SIZE) return false;
        }

        // Check columns
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            const column = this.board.map((row) => row[i]);
            const set = new Set(column);
            if (set.size !== this.BOARD_SIZE) return false;
        }

        // Check 3x3 boxes
        for (let i = 0; i < this.BOARD_SIZE; i += 3) {
            for (let j = 0; j < this.BOARD_SIZE; j += 3) {
                const box = [];
                for (let k = i; k < i + 3; k++) {
                    for (let l = j; l < j + 3; l++) {
                        box.push(this.board[k][l]);
                    }
                }
                const set = new Set(box);
                if (set.size !== this.BOARD_SIZE) return false;
            }
        }

        return true;
    }

    // Game loop to handle time counting and game input
    private gameLoop(): void {
        this.startTime = Date.now();
        this.generateBoard();
        this.handleInput();
        this.drawer.draw(this.board, this.cursor, this.startTime);
        const interval = setInterval(() => {
            if (this.isWin()) {
                clearInterval(interval);
                this.drawer.draw(this.board, this.cursor, this.getTime());
                console.log('You win! 🎉🎉🎉');
                console.log(`Time: ${this.getTime()}`);
                return;
            }

            this.drawer.draw(this.board, [...this.cursor], this.getTime());
        }, this.INTERVAL_TIME_MS);
    }

    private startSolveProcess(): void {
        const solveInterval = setInterval(() => {
            if (this.solver?.isSolved()) {
                clearInterval(solveInterval);
            }
            let stepBoard = this.solver?.nextStep()!;
            this.board = stepBoard;
            if (this.isWin()) {
                clearInterval(solveInterval);
            }
        }, 100);
    }

    private handleInput(): void {
        const readline = require('readline');
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                this.stop();
            } else if (key.name === 's') {
                this.solver = new SudokuSolver(this.board);
                this.startSolveProcess();
            } else if (key.name === 'up') {
                this.cursor[0] = Math.max(this.cursor[0] - 1, 0);
            } else if (key.name === 'down') {
                this.cursor[0] = Math.min(
                    this.cursor[0] + 1,
                    this.BOARD_SIZE - 1,
                );
            } else if (key.name === 'left') {
                this.cursor[1] = Math.max(this.cursor[1] - 1, 0);
            } else if (key.name === 'right') {
                this.cursor[1] = Math.min(
                    this.cursor[1] + 1,
                    this.BOARD_SIZE - 1,
                );
            } else if (key.name === 'space') {
                this.board[this.cursor[0]][this.cursor[1]] = 0;
            } else {
                // If match a number from 1 to 9
                const num = parseInt(str);
                if (!isNaN(num) && num >= 1 && num <= 9) {
                    this.board[this.cursor[0]][this.cursor[1]] = num;
                }
            }
            this.drawer.draw(this.board, [...this.cursor], this.getTime());
        });
    }

    /**
     * Get the seconds passed since the game started
     * @returns
     */
    getTime(): number {
        return Math.floor((Date.now() - this.startTime) / 1000);
    }

    name(): string {
        return 'Sudoku';
    }
    start(): void {
        console.log(this.LOGO);
        this.selectLevel();
        this.gameLoop();
    }
    stop(): void {
        process.exit(0);
    }
    restart(): void {
        throw new Error('Method not implemented.');
    }
}
