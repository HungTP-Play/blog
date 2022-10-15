import { IGame } from '../../minesweeper/oop/game.interface';
import { IKnightTourDrawer } from './knight-tour.drawer';
const prompt = require('prompt-sync')();

export class KnightTour implements IGame {
    CHESS_BOARD_SIZE = 8;
    board: number[][] = [];
    startPos: number[] = [-1, -1];
    cursor: number[] = [0, 0];
    AUTO_PLAY_INTERVAL_MS = 10;
    stepCount: number = 0;
    steps: number[][] = [];
    stackMap: { [key: string]: number[][] } = {};
    currentPos: number[] = [0, 0];
    drawer: IKnightTourDrawer;

    constructor(drawer: IKnightTourDrawer) {
        this.board = new Array(this.CHESS_BOARD_SIZE)
            .fill(0)
            .map(() => new Array(this.CHESS_BOARD_SIZE).fill(0));
        this.drawer = drawer;
    }

    private positionToKey(x: number, y: number): string {
        return `${x},${y}`;
    }

    private knightMoves(x: number, y: number): number[][] {
        const moves = [
            [2, 1],
            [1, 2],
            [-1, 2],
            [-2, 1],
            [-2, -1],
            [-1, -2],
            [1, -2],
            [2, -1],
        ];

        return moves
            .map((move) => [x + move[0], y + move[1]])
            .filter((move) => {
                const [x, y] = move;
                return (
                    x >= 0 &&
                    x < this.CHESS_BOARD_SIZE &&
                    y >= 0 &&
                    y < this.CHESS_BOARD_SIZE
                );
            });
    }

    private chooseBoardSize(): void {
        const boardSize = parseInt(prompt('Choose board size: '));
        if (isNaN(boardSize)) {
            console.log('Invalid board size');
            return this.chooseBoardSize();
        }
        this.CHESS_BOARD_SIZE = boardSize;
        this.board = new Array(this.CHESS_BOARD_SIZE)
            .fill(0)
            .map(() => new Array(this.CHESS_BOARD_SIZE).fill(0));
    }

    private chooseStartPos(): void {
        const readline = require('readline');
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        const stream = process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                this.stop();
            } else if (key.name === 'up') {
                this.cursor[0] = Math.max(this.cursor[0] - 1, 0);
            } else if (key.name === 'down') {
                this.cursor[0] = Math.min(
                    this.cursor[0] + 1,
                    this.CHESS_BOARD_SIZE - 1,
                );
            } else if (key.name === 'left') {
                this.cursor[1] = Math.max(this.cursor[1] - 1, 0);
            } else if (key.name === 'right') {
                this.cursor[1] = Math.min(
                    this.cursor[1] + 1,
                    this.CHESS_BOARD_SIZE - 1,
                );
            } else if (key.name === 'space') {
                this.startPos = [...this.cursor];
                this.cursor = [-1, -1]; // Remove cursor
                this.currentPos = [...this.startPos];
                stream.removeAllListeners('keypress');
                this.play();
            }
            this.drawer.draw(this.board, [...this.startPos], [...this.cursor]);
        });
    }

    name(): string {
        return 'Knight Tour';
    }

    private play() {
        const interval = setInterval(() => {
            if (this.stepCount >= this.CHESS_BOARD_SIZE ** 2) {
                console.log('Finished');
                this.stop();
            }
            this.step();
            this.drawer.draw(this.board, [...this.startPos], [...this.cursor]);
        }, this.AUTO_PLAY_INTERVAL_MS);
    }

    private shuffle<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    private step() {
        const [x, y] = this.currentPos;
        const stackKey = this.positionToKey(x, y);
        // If we have not visited this position before
        if (!this.stackMap[stackKey]) {
            const possibleMoves = this.knightMoves(x, y);
            const availableMoves = possibleMoves.filter(
                (move) => this.board[move[0]][move[1]] === 0,
            );
            if (availableMoves.length === 0) {
                this.currentPos = this.steps.pop()!;
                this.stepCount--;
                this.board[x][y] = 0;
                return;
            } else {
                const shuffledMoves = this.shuffle(availableMoves);
                const firstMove = this.shuffle(availableMoves)[0];
                this.steps.push(this.currentPos);
                this.currentPos = firstMove;
                this.stackMap[stackKey] = shuffledMoves.slice(1);
                this.board[x][y] = ++this.stepCount;
            }
        } else {
            const availableMoves = this.stackMap[stackKey];
            if (availableMoves.length === 0) {
                delete this.stackMap[stackKey];
                this.currentPos = this.steps.pop()!;
                this.stepCount--;
                this.board[x][y] = 0;
                return;
            } else {
                const firstMove = availableMoves[0];
                this.steps.push(this.currentPos);
                this.currentPos = firstMove;
                this.stackMap[stackKey] = availableMoves.slice(1);
                this.board[x][y] = ++this.stepCount;
            }
        }
    }

    start(): void {
        this.chooseBoardSize();
        this.drawer.draw(this.board, [...this.startPos], [...this.cursor]);
        this.chooseStartPos();
    }
    stop(): void {
        process.exit(0);
    }
    restart(): void {
        throw new Error('Method not implemented.');
    }
}
