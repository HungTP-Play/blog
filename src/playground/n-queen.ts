/**
 * Solve the N-Queens problem
 * @param n
 */
export function solveNQueens(n: number): void {
    const board = new Array(n).fill(0).map(() => new Array(n).fill(0))
    solveNQueensHelper(board, 0)
}

function solveNQueensHelper(board: number[][], row: number): void {
    if (row === board.length) {
        console.log(board)
        return
    }

    for (let col = 0; col < board.length; col++) {
        if (isSafe(board, row, col)) {
            board[row][col] = 1
            solveNQueensHelper(board, row + 1)
            board[row][col] = 0
        }
    }
}

// Check if the current position is safe
function isSafe(board: number[][], row: number, col: number): boolean {
    // check column
    for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) {
            return false
        }
    }

    // check left diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) {
            return false
        }
    }

    // check right diagonal
    for (let i = row, j = col; i >= 0 && j < board.length; i--, j++) {
        if (board[i][j] === 1) {
            return false
        }
    }

    return true
}
