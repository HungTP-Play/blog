export interface IMinesweeperDrawer {
    draw(
        board: number[][],
        opened: number[][],
        flags: number[][],
        cursor: number[],
    ): void;

    drawLost(board: number[][], opened: number[][], flags: number[][]): void;

    drawWon(board: number[][], opened: number[][], flags: number[][]): void;
}

export class MinesweeperClassicDrawer implements IMinesweeperDrawer {
    NUMBERS: { [key: number]: string } = {
        1: '\x1b[34m1\x1b[0m',
        2: '\x1b[32m2\x1b[0m',
        3: '\x1b[31m3\x1b[0m',
        4: '\x1b[35m4\x1b[0m',
        5: '\x1b[36m5\x1b[0m',
        6: '\x1b[37m6\x1b[0m',
        7: '\x1b[38m7\x1b[0m',
        8: '\x1b[39m8\x1b[0m',
    };

    drawLost(board: number[][], opened: number[][], flags: number[][]): void {
        for (let i = 0; i < board.length; i++) {
            console.log(
                board[i]
                    .map((cell, index) => {
                        const x = i;
                        const y = index;

                        if (cell === 0) {
                            return '  ';
                        }

                        if (cell === -1) {
                            return '🚀';
                        }

                        return `${this.NUMBERS[cell]} `;
                    })
                    .join(' '),
            );
        }
    }

    drawWon(board: number[][], opened: number[][], flags: number[][]): void {
        for (let i = 0; i < board.length; i++) {
            console.log(
                board[i]
                    .map((cell, index) => {
                        const x = i;
                        const y = index;

                        if (
                            opened.some(
                                (cell) => cell[0] === x && cell[1] === y,
                            )
                        ) {
                            if (cell === 0) {
                                return '  ';
                            }
                            return `${this.NUMBERS[cell]} `;
                        }

                        if (
                            flags.some((cell) => cell[0] === x && cell[1] === y)
                        ) {
                            return '🚩';
                        }
                        return '~ ';
                    })
                    .join(' '),
            );
        }
    }

    draw(
        board: number[][],
        opened: number[][],
        flags: number[][],
        cursor: number[],
    ): void {
        for (let i = 0; i < board.length; i++) {
            console.log(
                board[i]
                    .map((cell, index) => {
                        const x = i;
                        const y = index;

                        if (cursor[0] === x && cursor[1] === y) {
                            return '▓ ';
                        }

                        if (
                            opened.some(
                                (cell) => cell[0] === x && cell[1] === y,
                            )
                        ) {
                            if (cell === 0) {
                                return '  ';
                            }
                            return `${this.NUMBERS[cell]} `;
                        }

                        if (
                            flags.some((cell) => cell[0] === x && cell[1] === y)
                        ) {
                            return '🚩';
                        }
                        return '~ ';
                    })
                    .join(' '),
            );
        }
    }
}
