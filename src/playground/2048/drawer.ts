export interface IGame2048Drawer {
    drawWin(board: number[][]): void;
    drawLose(board: number[][]): void;
    drawScore(score: number): void;
    drawNumbOfMoves(moves: number): void;
    draw(board: number[][]): void;
}

export class Game2048ColorNumberDrawer implements IGame2048Drawer {
    private NUMBERS: { [key: number]: (num: string) => string } = {
        2: (num: string) => `\x1b[31m${num}\x1b[0m`,
        4: (num: string) => `\x1b[32m${num}\x1b[0m`,
        8: (num: string) => `\x1b[33m${num}\x1b[0m`,
        16: (num: string) => `\x1b[34m${num}\x1b[0m`,
        32: (num: string) => `\x1b[35m${num}\x1b[0m`,
        64: (num: string) => `\x1b[36m${num}\x1b[0m`,
        128: (num: string) => `\x1b[37m${num}\x1b[0m`,
        256: (num: string) => `\x1b[41m${num}\x1b[0m`,
        512: (num: string) => `\x1b[42m${num}\x1b[0m`,
        1024: (num: string) => `\x1b[45m${num}\x1b[0m`,
        2048: (num: string) => `\x1b[44m${num}\x1b[0m`,
    };

    /**
     * Add padding to number
     *
     * If it 4 digits, return the number
     *
     * If it 3 digits, return the number with 1 space in front
     *
     * If it 2 digits, return the number with 2 spaces in front
     *
     * If it 1 digit, return the number with 3 spaces in front
     * @param num
     * @returns
     */
    padNumber(num: number): string {
        if (num < 10) {
            return `   ${num}`;
        }
        if (num < 100) {
            return `  ${num}`;
        }
        if (num < 1000) {
            return ` ${num}`;
        }
        return `${num}`;
    }

    /**
     * Add padding line between rows
     * @param board
     */
    padLine(board: number[][]) {
        const pad = board[0].map(() => '    ').join(' ');
        console.log(pad);
    }

    /**
     * Draw 0 with space
     * @param board
     */
    draw(board: number[][]): void {
        console.clear();
        for (let i = 0; i < board.length; i++) {
            console.log(
                board[i]
                    .map((cell, index) => {
                        if (cell === 0) {
                            return '    ';
                        }
                        return this.NUMBERS[cell](this.padNumber(cell));
                    })
                    .join(' '),
            );

            if (i < board.length - 1) {
                this.padLine(board);
            }
        }
    }

    drawScore(score: number): void {
        console.log(`Score: ${score}`);
    }

    drawNumbOfMoves(moves: number): void {
        console.log(`Moves: ${moves}`);
    }

    drawWin(board: number[][]): void {
        this.draw(board);
        console.log('You win! 🎉🎉🎉');
    }
    drawLose(board: number[][]): void {
        this.draw(board);
        console.log('You lose! 😭😭😭');
    }
}
