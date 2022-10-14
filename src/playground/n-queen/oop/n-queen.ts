import { IGame } from '../../minesweeper/oop/game.interface';
import { INQueenDrawer } from './n-queen.drawer';
const prompt = require('prompt-sync')();

export class NQueen implements IGame {
    // 0 for empty, 1 for queen
    board: number[][] = [];
    drawer: INQueenDrawer;
    steps: number[][] = [];
    currentTry: number[] = [0, 0];
    CHESS_BOARD_SIZE = 8;
    AUTO_PLAY_INTERVAL_MS = 50;
    queenCount: number = 0;

    constructor(drawer: INQueenDrawer) {
        this.drawer = drawer;
    }

    /**
     * Can place queen at row, col
     * @param x
     * @param y
     */
    canPlace(x: number, y: number): boolean {
        console.log('canPlace', x, y);
        console.log('prev', this.steps);
        // check row
        for (let i = 0; i < this.CHESS_BOARD_SIZE; i++) {
            if (this.board[x][i] === 1) return false;
        }

        // check col
        for (let i = 0; i < this.CHESS_BOARD_SIZE; i++) {
            if (this.board[i][y] === 1) return false;
        }

        // check diagonal
        for (let i = 0; i < this.CHESS_BOARD_SIZE; i++) {
            for (let j = 0; j < this.CHESS_BOARD_SIZE; j++) {
                if (this.board[i][j] === 1) {
                    if (Math.abs(i - x) === Math.abs(j - y)) return false;
                }
            }
        }

        return true;
    }

    name(): string {
        return 'N-Queen';
    }

    isSolved(): boolean {
        return this.queenCount === this.CHESS_BOARD_SIZE;
    }

    nextStep(): void {
        const [x, y] = this.currentTry;
        if (this.canPlace(x, y)) {
            this.board[x][y] = 1;
            this.steps.push([x, y]);
            this.queenCount++;
            this.currentTry = [0, y + 1];
            return;
        }

        this.currentTry = [x + 1, y];

        if (this.currentTry[0] >= this.CHESS_BOARD_SIZE) {
            this.previousStep();
        }
    }

    previousStep(): void {
        const [x, y] = this.steps.pop()!;
        this.board[x][y] = 0;
        this.queenCount--;
        this.currentTry = [x + 1, y];
        if (this.currentTry[0] >= this.CHESS_BOARD_SIZE) {
            this.previousStep();
        }
    }

    start(): void {
        const numberOfQueens = parseInt(prompt('Number of queens: '));
        this.CHESS_BOARD_SIZE = numberOfQueens;
        this.board = Array(this.CHESS_BOARD_SIZE)
            .fill(0)
            .map(() => Array(this.CHESS_BOARD_SIZE).fill(0));
        const interval = setInterval(() => {
            if (this.isSolved()) {
                clearInterval(interval);
                console.log('solved');
                return;
            }
            this.nextStep();
            this.drawer.draw(this.board, this.currentTry);
        }, this.AUTO_PLAY_INTERVAL_MS);
    }

    stop(): void {
        throw new Error('Method not implemented.');
    }
    restart(): void {
        throw new Error('Method not implemented.');
    }
}
