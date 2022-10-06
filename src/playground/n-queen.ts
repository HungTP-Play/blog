export function buildBoard(n: number): number[][] {
    return new Array(n).fill(0).map(() => new Array(n).fill(0));
}

export function isSafe(board: number[][], row: number, col: number): boolean {
    // Check row
    for (let i = 0; i < col; i++) {
        if (board[row][i] === 1) {
            return false;
        }
    }

    // Check upper diagonal on left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) {
            return false;
        }
    }

    // Check lower diagonal on left side
    for (let i = row, j = col; j >= 0 && i < board.length; i++, j--) {
        if (board[i][j] === 1) {
            return false;
        }
    }

    return true;
}

export function placeNQueens(board: number[][], placementCol: number): boolean {
    if (placementCol === board.length) {
        return true;
    }

    for (let row = 0; row < board.length; row++) {
        if (isSafe(board, row, placementCol)) {
            board[row][placementCol] = 1;
            if (placeNQueens(board, placementCol + 1)) {
                return true;
            }
            board[row][placementCol] = 0;
        }
    }
    return false;
}

/**
 * Print N-Queen solution and board with '|' and '-' using console.log
 * @param board
 */
export function printNQueens(board: number[][]): void {
    for (let i = 0; i < board.length; i++) {
        let row = '';
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === 1) {
                row += '|Q|';
            } else {
                row += '|-|';
            }
        }
        console.log(row);
    }
}

export function NQueens(N: number): void {
    const board = buildBoard(N);
    if (placeNQueens(board, 0)) {
        printNQueens(board);
    } else {
        console.log('No solution');
    }
}

NQueens(12);
