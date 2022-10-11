// Simple snake game in console
export class SnakeGame {
    apple: number[] = []; // ax, ay
    snake: number[][] = []; // sx, sy
    direction: number = 0; // 0: up, 1: right, 2: down, 3: left
    score: number = 0;
    snakeHead: number[];
    constructor() {
        this.apple = [
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10),
        ];
        this.snakeHead = [0, 0];
        this.snake = [this.snakeHead];
        this.direction = 1;
        this.score = 0;
    }

    // Move snake
    move() {
        // Move snake
        switch (this.direction) {
            case 0:
                this.snakeHead[1]--;
                break;
            case 1:
                this.snakeHead[0]++;
                break;
            case 2:
                this.snakeHead[1]++;
                break;
            case 3:
                this.snakeHead[0]--;
                break;
        }

        // Check if snake ate apple
        if (
            this.snakeHead[0] === this.apple[0] &&
            this.snakeHead[1] === this.apple[1]
        ) {
            this.score++;
            this.apple = [
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
            ];

            // Add to snake body
            this.snake.push([this.snakeHead[0], this.snakeHead[1]]);
        }

        // Add new head to snake
        this.snake.unshift([this.snakeHead[0], this.snakeHead[1]]);

        // Remove tail from snake
        this.snake.pop();
    }

    // Check if snake is dead
    isDead() {
        const head = this.snake[0];
        if (head[0] < 0 || head[0] > 9 || head[1] < 0 || head[1] > 9) {
            return true;
        }
        for (let i = 1; i < this.snake.length; i++) {
            if (head[0] === this.snake[i][0] && head[1] === this.snake[i][1]) {
                return true;
            }
        }
        return false;
    }

    // Print game
    print() {
        const boardWithPadding = 12;
        const board = new Array(boardWithPadding)
            .fill(0)
            .map(() => new Array(boardWithPadding).fill(' '));
        for (let i = 0; i < board.length; i++) {
            board[i][0] = '|';
            board[i][board.length - 1] = '  |';
        }

        for (let i = 0; i < board.length; i++) {
            board[0][i] = '-';
            board[board.length - 1][i] = '---';
        }

        // Add snake to board
        for (let i = 0; i < this.snake.length; i++) {
            const [x, y] = this.snake[i];
            board[y + 1][x + 1] = 'o';
        }

        // Add apple to board
        const [ax, ay] = this.apple;
        board[ay + 1][ax + 1] = 'x';

        // Print board
        for (let i = 0; i < board.length; i++) {
            console.log(board[i].join(''));
        }
    }

    // Start game
    start() {
        this.print();
        // Listen for keypress using readline and arrow keys and CTRL+C to exit
        const readline = require('readline');
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                process.exit();
            } else {
                switch (key.name) {
                    case 'c':
                        if (key.ctrl) {
                            process.exit(0);
                        }
                        break;
                    case 'up':
                        this.setDirection(0);
                        break;
                    case 'right':
                        this.setDirection(1);
                        break;
                    case 'down':
                        this.setDirection(2);
                        break;
                    case 'left':
                        this.setDirection(3);
                        break;
                }
            }
        });

        const interval = setInterval(() => {
            console.clear();
            this.move();
            this.print();
            if (this.isDead()) {
                clearInterval(interval);
                console.log(`Game over! Score: ${this.score}`);
            }
        }, 333);
    }

    // Set direction
    setDirection(direction: number) {
        this.direction = direction;
    }

    // Get direction
    getDirection() {
        return this.direction;
    }
}

const game = new SnakeGame();
game.start();
