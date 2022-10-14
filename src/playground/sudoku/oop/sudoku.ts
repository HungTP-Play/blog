import { IGame } from '../../minesweeper/oop/game.interface';
import { ISudokuDrawer } from './sudoku.drawer';
const prompt = require('prompt-sync')();

export class SudokuGame implements IGame {
    BOARD_SIZE = 9;
    cursor: number[] = [0, 0]; // cx, cy: cursor x, cursor y
    startTime: number = -1; // Game not started yet
    board: number[][] = [];
    solvedBoard: number[][] = [];
    drawer: ISudokuDrawer;
    level: number = 1; // Easy
    processInterval: any;
    LEVEL_HINTS: { [key: number]: number } = {
        1: 20,
        2: 10,
        3: 5,
    };
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
        this.generateBoard();
    }

    /**
     * Generate a solved board
     */
    private generateSolvedBoard(): void {
        // Generate a solved board
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                this.solvedBoard[i][j] =
                    ((i * 3 + Math.floor(i / 3) + j) % 9) + 1;
            }
        }
    }

    /**
     * Generate a new board using hint from solved board
     */
    private generateBoard(): void {
        this.generateSolvedBoard();
        const hints = this.LEVEL_HINTS[this.level];
        for (let i = 0; i < hints; i++) {
            const x = Math.floor(Math.random() * this.BOARD_SIZE);
            const y = Math.floor(Math.random() * this.BOARD_SIZE);
            this.board[x][y] = this.solvedBoard[x][y];
        }
    }

    /**
     * Return the game status
     * @returns
     */
    private isBoardFilled(): boolean {
        return this.board.every((row) => row.every((cell) => cell !== 0));
    }

    /**
     * Check if the game is finished, only check the board is filled
     * @returns
     */
    private isWin(): boolean {
        if (!this.isBoardFilled()) return false;
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                if (this.board[i][j] !== this.solvedBoard[i][j]) return false;
            }
        }
        return true;
    }

    // Game loop to handle time counting and game input
    private gameLoop(): void {
        this.startTime = Date.now();
        this.handleInput();
        const interval = setInterval(() => {
            if (this.isWin()) {
                clearInterval(interval);
                console.log('You win! 🎉🎉🎉');
                console.log(`Time: ${this.getTime()}`);
                return;
            }

            this.drawer.draw(this.board, [...this.cursor], this.getTime());
        }, this.INTERVAL_TIME_MS);
    }

    private handleInput(): void {
        const readline = require('readline');
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                this.stop();
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
