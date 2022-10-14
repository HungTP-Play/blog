export interface ISudokuGenerator {
    generate(hint: number, boardSize: number): number[][];
}

export class SudokuDiagonalGenerator implements ISudokuGenerator {
    NUMBERS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    board: number[][] = [];

    constructor() {
        this.board = Array.from(Array(9), () => new Array(9).fill(0));
    }

    generate(hint: number, boardSize: number): number[][] {
        this.fillDiagonal();
        this.fillRemaining(0, 3, boardSize);
        return this.removeNumbers(hint);
    }

    fillRemaining(x: number, y: number, boardSize: number): boolean {
        if (y >= boardSize && x < boardSize - 1) {
            x++;
            y = 0;
        }
        if (x >= boardSize && y >= boardSize) {
            return true;
        }

        if (x < 3) {
            if (y < 3) y = 3;
        } else if (x < boardSize - 3) {
            if (y === Math.floor(x / 3) * 3) y += 3;
        } else {
            if (y === boardSize - 3) {
                x++;
                y = 0;
                if (x >= boardSize) return true;
            }
        }

        for (let num = 1; num <= boardSize; num++) {
            if (this.canPlace(num, x, y)) {
                this.board[x][y] = num;
                if (this.fillRemaining(x, y + 1, boardSize)) return true;
                this.board[x][y] = 0;
            }
        }
        return false;
    }

    canPlace(num: number, x: number, y: number): boolean {
        return (
            !this.usedInRow(num, x) &&
            !this.usedInCol(num, y) &&
            !this.usedInBox(num, x - (x % 3), y - (y % 3))
        );
    }

    usedInRow(num: number, x: number): boolean {
        return this.board[x].includes(num);
    }

    usedInCol(num: number, y: number): boolean {
        return this.board.some((row) => row[y] === num);
    }

    usedInBox(num: number, x: number, y: number): boolean {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[x + i][y + j] === num) return true;
            }
        }
        return false;
    }

    removeNumbers(hint: number): number[][] {
        let count = hint;
        while (count !== 0) {
            const x = Math.floor(Math.random() * 9);
            const y = Math.floor(Math.random() * 9);
            if (this.board[x][y] !== 0) {
                count--;
                this.board[x][y] = 0;
            }
        }
        return this.board;
    }

    fillDiagonal(): void {
        for (let i = 0; i < 9; i += 3) {
            this.fillBox(i, i);
        }
    }

    fillBox(x: number, y: number): void {
        let num = this.randomPickNumber();
        for (let i = x; i < x + 3; i++) {
            for (let j = y; j < y + 3; j++) {
                while (!this.canPlace(num, i, j)) {
                    num = this.randomPickNumber();
                }
                this.board[i][j] = num;
            }
        }
    }

    randomPickNumber(): number {
        return this.NUMBERS[Math.floor(Math.random() * this.NUMBERS.length)];
    }
}
