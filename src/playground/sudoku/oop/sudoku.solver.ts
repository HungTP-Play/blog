export interface ISudokuSolver {
    board: number[][];
    steps: number[][]; // Stack of previous steps
    canPlace: boolean;
    nextStep(): number[][];
    previousStep(): void;
    findEmptyCell(): number[];
    isSolved(): boolean;
}

export class SudokuSolver implements ISudokuSolver {
    board: number[][];
    steps: number[][];
    startNum: number = 1;
    canPlace: boolean = true;
    firstStepSquareMissing: number[] = [];

    constructor(board: number[][]) {
        this.board = [...board];
        this.steps = [];
    }

    isSolved(): boolean {
        const [x, y] = this.findEmptyCell();
        if (x === -1 && y === -1) {
            return true;
        }
        return false;
    }

    previousStep(): number[][] {
        const [x, y, value] = this.steps.pop()!;
        if (this.steps.length === 0) {
            this.startNum = value + 1;
        }
        this.board[x][y] = 0;
        for (let i = value + 1; i <= 9; i++) {
            if (this.isValid(x, y, i)) {
                this.board[x][y] = i;
                this.steps.push([x, y, i]);
                this.canPlace = true;
                return this.board;
            }
        }
        this.board[x][y] = 0;
        this.canPlace = false;
        return this.board;
    }

    findEmptyCell(): number[] {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] === 0) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    }

    isValid(x: number, y: number, value: number): boolean {
        // Check row
        if (this.board[x].includes(value)) return false;

        // Check column
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i][y] === value) return false;
        }

        // Check 3x3 box
        const boxX = Math.floor(x / 3) * 3;
        const boxY = Math.floor(y / 3) * 3;
        for (let i = boxX; i < boxX + 3; i++) {
            for (let j = boxY; j < boxY + 3; j++) {
                if (this.board[i][j] === value) return false;
            }
        }

        return true;
    }

    /**
     * Process the next step of the algorithm
     *
     * If canPlace is false, it means that the algorithm has reached a dead end, and it needs to go back to the previous step
     *
     * If canPlace is true, it means that the algorithm has found a valid number to place in the current cell
     *
     * If the algorithm has reached the end of the board, it means that the board is solved
     *
     *
     */
    nextStep(): any {
        if (this.steps.length === 0) {
            const [x, y] = this.findEmptyCell();
            if (x === -1 && y === -1) {
                return this.board;
            }
            for (let i = this.startNum; i <= 9; i++) {
                if (this.isValid(x, y, i)) {
                    this.board[x][y] = i;
                    this.steps.push([x, y, i]);
                    this.canPlace = true;
                    return this.board;
                }
            }
            this.board[x][y] = 0;
            return this.board;
        } else {
            if (this.canPlace === true) {
                const [x, y] = this.findEmptyCell();
                if (x === -1 && y === -1) {
                    return this.board;
                }
                for (let i = 1; i <= 9; i++) {
                    if (this.isValid(x, y, i)) {
                        this.board[x][y] = i;
                        this.steps.push([x, y, i]);
                        this.canPlace = true;
                        return this.board;
                    }
                }
                this.board[x][y] = 0;
                this.canPlace = false;
                return this.board;
            } else {
                return this.previousStep();
            }
        }
    }
}
