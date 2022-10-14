export interface ISudokuDrawer {
    draw(board: number[][], cursor: number[], seconds: number): void;
}

export class SudokuNumberColorDrawer implements ISudokuDrawer {
    NUMBERS: { [key: number]: string } = {
        1: '\x1b[34m1\x1b[0m',
        2: '\x1b[32m2\x1b[0m',
        3: '\x1b[31m3\x1b[0m',
        4: '\x1b[35m4\x1b[0m',
        5: '\x1b[36m5\x1b[0m',
        6: '\x1b[37m6\x1b[0m',
        7: '\x1b[38m7\x1b[0m',
        8: '\x1b[39m8\x1b[0m',
        9: '\x1b[40m9\x1b[0m',
    };

    private drawTime(seconds: number): void {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        const time = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
        console.log(time);
    }

    draw(board: number[][], cursor: number[], seconds: number): void {
        console.clear();
        this.drawTime(seconds);
        for (let i = 0; i < board.length; i++) {
            const line = board[i]
                .map((cell, index) => {
                    const x = i;
                    const y = index;

                    if (cursor[0] === x && cursor[1] === y) {
                        return '▓ ';
                    }

                    if (cell === 0) {
                        return '  ';
                    }
                    return `${this.NUMBERS[cell]} `;
                })
                .map((cell, index) => {
                    if (index % 3 === 0) {
                        return `|${cell}`;
                    }
                    if (index === 8) {
                        return `${cell}|`;
                    }
                    return cell;
                })
                .join(' ');
            console.log(line);
            if (i % 3 === 2) {
                console.log('------------------------------');
            }
        }
    }
}
