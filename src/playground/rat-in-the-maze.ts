/**
 * Using -1 to represent a wall, 0 to represent a path,
 * @param maze
 */
export function generateMaze(maze: number[][]): void {
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze.length; j++) {
            if (Math.random() > 0.7) {
                maze[i][j] = -1;
            }
        }
    }
    maze[0][0] = 0;
    maze[maze.length - 1][maze.length - 1] = 0;
}

export function isSafe(maze: number[][], row: number, col: number): boolean {
    return (
        row >= 0 &&
        row < maze.length &&
        col >= 0 &&
        col < maze.length &&
        maze[row][col] === 0
    );
}

export function findPath(maze: number[][], row: number, col: number): boolean {
    if (row === maze.length - 1 && col === maze.length - 1) {
        return true;
    }

    if (isSafe(maze, row, col)) {
        maze[row][col] = 1;
        if (findPath(maze, row + 1, col)) {
            return true;
        }
        if (findPath(maze, row, col + 1)) {
            return true;
        }
        maze[row][col] = 0;
    }
    return false;
}

export function printBoard(maze: number[][]): void {
    for (let i = 0; i < maze.length; i++) {
        let row = '';
        for (let j = 0; j < maze.length; j++) {
            if (maze[i][j] === -1) {
                row += '| 🪨 ';
            } else if (maze[i][j] === 1) {
                row += '| 🐭 ';
            } else {
                row += '| ◾ ';
            }
        }
        row += '|\n';
        console.log(row);
    }
}

export function ratInAMaze(maze: number): void {
    const board = new Array(maze).fill(0).map(() => new Array(maze).fill(0));
    generateMaze(board);
    if (findPath(board, 0, 0)) {
        printBoard(board);
    } else {
        printBoard(board);
        console.log('No path found');
    }
}

ratInAMaze(5);
