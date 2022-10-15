export interface IKnightTourDrawer {
    draw(board: number[][], start?: number[], cursor?: number[]): void;
}

export class KnightTourDrawer implements IKnightTourDrawer {
    padNumber(num: number): string {
        return num < 10 ? ` ${num}` : `${num}`;
    }

    draw(board: number[][], start: number[], cursor: number[]): void {
        console.clear();
        for (let i = 0; i < board.length; i++) {
            console.log(
                board[i]
                    .map((cell, index) => {
                        const x = i;
                        const y = index;

                        if (cursor && cursor[0] === x && cursor[1] === y) {
                            if (y === board.length - 1) {
                                return '🥌|';
                            }
                            return '🥌';
                        }

                        if (start && start[0] === x && start[1] === y) {
                            if (y === board.length - 1) {
                                return '🏁|';
                            }
                            return '🏁';
                        }

                        if (cell === 0) {
                            if (y === board.length - 1) {
                                return '  |';
                            }
                            return '  ';
                        }

                        if (cell === 1 && y === board.length - 1) {
                            return `${this.padNumber(cell)}|`;
                        }

                        return `${this.padNumber(cell)}`;
                    })
                    .join(' |'),
            );

            console.log(new Array(board.length).fill('---').join('-'));
        }
    }
}
