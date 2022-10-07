export interface IMinesweeperDrawer {
    draw(
        board: number[][],
        opened: number[][],
        flags: number[][],
        cursor: number[],
    ): void;

    drawLost(board: number[][]): void;

    drawWon(board: number[][], opened: number[][], flags: number[][]): void;

    drawRemainingFlags(remainingFlags: number): void;
}
