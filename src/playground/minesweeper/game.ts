import { IMinesweeperDrawer } from './drawer';
const prompt = require('prompt-sync')();

export interface IGame {
    start(): void;
    stop(): void;
    reset(): void;
    loop(): void;
    win(): void;
    lose(): void;
}

export class MinesweeperGame implements IGame {
    drawer: IMinesweeperDrawer;
    board: number[][] = [];
    opened: number[][] = [];
    flags: number[][] = [];
    cursor: number[] = [0, 0];
    rows: number = 0;
    cols: number = 0;
    mines: number = 0;
    LOGO = `
    $$\                                                                                     
    \__|                                                                                    
$$$$$$\$$$$\  $$\ $$$$$$$\   $$$$$$$\ $$\  $$\  $$\  $$$$$$\   $$$$$$\   $$$$$$\   $$$$$$\   $$$$$$\  
$$  _$$  _$$\ $$ |$$  __$$\ $$  _____|$$ | $$ | $$ |$$  __$$\ $$  __$$\ $$  __$$\ $$  __$$\ $$  __$$\ 
$$ / $$ / $$ |$$ |$$ |  $$ |\$$$$$$\  $$ | $$ | $$ |$$$$$$$$ |$$$$$$$$ |$$ /  $$ |$$$$$$$$ |$$ |  \__|
$$ | $$ | $$ |$$ |$$ |  $$ | \____$$\ $$ | $$ | $$ |$$   ____|$$   ____|$$ |  $$ |$$   ____|$$ |      
$$ | $$ | $$ |$$ |$$ |  $$ |$$$$$$$  |\$$$$$\$$$$  |\$$$$$$$\ \$$$$$$$\ $$$$$$$  |\$$$$$$$\ $$ |      
\__| \__| \__|\__|\__|  \__|\_______/  \_____\____/  \_______| \_______|$$  ____/  \_______|\__|      
                                                            $$ |                          
                                                            $$ |                          
                                                            \__|                          
`;

    constructor(drawer: IMinesweeperDrawer) {
        this.drawer = drawer;
    }

    selectLevel(): [number, number, number] {
        console.log('Select difficulty level:');
        console.log('1. Easy 9x9 with 10 mines');
        console.log('2. Medium 16x16 with 40 mines');
        console.log('3. Hard 16x30 with 99 mines');
        const difficulty = parseInt(prompt('Choose a difficulty level: '));
        if (isNaN(difficulty)) {
            console.log('Invalid difficulty');
            return this.selectLevel();
        }

        switch (difficulty) {
            case 1:
                return [10, 9, 9];
            case 2:
                return [40, 16, 16];
            case 3:
                return [99, 16, 30];
            default:
                console.log('Invalid difficulty, please try again');
                return this.selectLevel();
        }
    }

    initBoard(): void {
        const gameBoard = Array(this.rows)
            .fill(0)
            .map(() => Array(this.cols).fill(0));

        // Place mines
        let minesPlaced = 0;
        while (minesPlaced < this.mines) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);
            if (gameBoard[row][col] === 0) {
                gameBoard[row][col] = -1;
                minesPlaced++;
            }
        }

        // Place numbers
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (gameBoard[row][col] === 0) {
                    let mines = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            if (
                                row + i >= 0 &&
                                row + i < this.rows &&
                                col + j >= 0 &&
                                col + j < this.cols &&
                                gameBoard[row + i][col + j] === -1
                            ) {
                                mines++;
                            }
                        }
                    }
                    gameBoard[row][col] = mines;
                }
            }
        }

        this.board = gameBoard;
    }

    getNeighbors(row: number, col: number): number[][] {
        const neighborCells = [
            [row - 1, col - 1],
            [row - 1, col],
            [row - 1, col + 1],
            [row, col - 1],
            [row, col + 1],
            [row + 1, col - 1],
            [row + 1, col],
            [row + 1, col + 1],
        ];
        return neighborCells.filter(
            (cell) =>
                cell[0] >= 0 &&
                cell[0] < this.rows &&
                cell[1] >= 0 &&
                cell[1] < this.cols,
        );
    }

    open(row: number, col: number): void {
        if (this.board[row][col] === -1) {
            this.lose();
        }
        if (this.board[row][col] === 0) {
            this.opened.push([row, col]);
            const neighbors = this.getNeighbors(row, col);
            for (const neighbor of neighbors) {
                if (
                    this.opened.some(
                        (cell) =>
                            cell[0] === neighbor[0] && cell[1] === neighbor[1],
                    ) === false
                ) {
                    this.open(neighbor[0], neighbor[1]);
                }
            }
        } else {
            this.opened.push([row, col]);
        }

        this.checkWin();
    }

    /**
     * If all non-mine cells are opened and all mines are flagged, the player wins
     */
    checkWin(): void {
        const isWin =
            this.flags.length === this.mines &&
            this.opened.length === this.cols * this.rows - this.mines;

        if (isWin) {
            this.win();
        }
    }

    flag(row: number, col: number): void {
        if (this.flags.some((cell) => cell[0] === row && cell[1] === col)) {
            this.flags = this.flags.filter(
                (cell) => cell[0] !== row || cell[1] !== col,
            );
        } else if (
            !this.opened.some((cell) => cell[0] === row && cell[1] === col)
        ) {
            this.flags.push([row, col]);
        }
        this.checkWin();
    }

    loop(): void {
        this.drawer.draw(this.board, this.opened, this.flags, this.cursor);
        const readline = require('readline');
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                this.stop();
            } else if (key.name === 'up') {
                this.cursor[0] = Math.max(this.cursor[0] - 1, 0);
            } else if (key.name === 'down') {
                this.cursor[0] = Math.min(this.cursor[0] + 1, this.rows - 1);
            } else if (key.name === 'left') {
                this.cursor[1] = Math.max(this.cursor[1] - 1, 0);
            } else if (key.name === 'right') {
                this.cursor[1] = Math.min(this.cursor[1] + 1, this.cols - 1);
            } else if (key.name === 'space') {
                this.open(this.cursor[0], this.cursor[1]);
            } else if (key.name === 'f') {
                this.flag(this.cursor[0], this.cursor[1]);
            }

            console.clear();
            this.drawer.draw(this.board, this.opened, this.flags, this.cursor);
            console.log('Remaining flags: ', this.mines - this.flags.length);
        });
    }

    start(): void {
        console.log(this.LOGO);
        const [mines, rows, cols] = this.selectLevel();
        this.mines = mines;
        this.rows = rows;
        this.cols = cols;
        this.initBoard();
        console.clear();
        this.loop();
    }

    stop(): void {
        process.exit(0);
    }

    reset(): void {
        throw new Error('Method not implemented.');
    }

    win(): void {
        this.drawer.drawWon(this.board, this.opened, this.flags);
        console.log('You win! 🎉🎉🎉');
        this.stop();
    }

    lose(): void {
        this.drawer.drawLost(this.board, this.opened, this.flags);
        console.log('You lose! 😥😥😥');
        this.stop();
    }
}
