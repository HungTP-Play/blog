export interface INQueenDrawer {
    draw(board: number[][], currentTry: number[]): void;
}

export class NQueenDrawer implements INQueenDrawer {
    /**
     * Draw the board with the current state, queen and lines
     * @param board
     * @param currentTry
     */
    draw(board: number[][], currentTry: number[]): void {
        const [cx, cy] = currentTry;
        console.clear();
        for (let i = 0; i < board.length; i++) {
            console.log(
                board[i]
                    .map((cell, index) => {
                        const x = i;
                        const y = index;

                        if (cx === x && cy === y) {
                            if (y === board.length - 1) {
                                return '🌀|';
                            }
                            return '🌀';
                        }

                        if (cell === 0) {
                            if (y === board.length - 1) {
                                return '  |';
                            }
                            return '  ';
                        }

                        if (cell === 1 && y === board.length - 1) {
                            return '👑|';
                        }

                        return '👑';
                    })
                    .join(' |'),
            );

            console.log(new Array(board.length).fill('---').join('-'));
        }
    }
}
