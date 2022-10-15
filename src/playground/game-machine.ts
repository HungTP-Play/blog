const prompt = require('prompt-sync')();
import { Game2048 } from './2048/2048';
import { Game2048ColorNumberDrawer } from './2048/drawer';
import { KnightTour, KnightTourDrawer } from './knight-tour';
import { IGame } from './minesweeper/oop/game.interface';
import { Minesweeper } from './minesweeper/oop/minesweeper';
import { MinesweeperClassicDrawer } from './minesweeper/oop/minesweeper-classic.drawer';
import { NQueen } from './n-queen/oop/n-queen';
import { NQueenDrawer } from './n-queen/oop/n-queen.drawer';
import { SudokuGame, SudokuNumberColorDrawer } from './sudoku';
import { SudokuDiagonalGenerator } from './sudoku/oop/sudoku.generate';

export class GameMachine {
    private games: IGame[];

    private LOGO = `
    
 ██████   █████  ███    ███ ███████     ███    ███  █████   ██████ ██   ██ ██ ███    ██ ███████ 
 ██       ██   ██ ████  ████ ██          ████  ████ ██   ██ ██      ██   ██ ██ ████   ██ ██      
 ██   ███ ███████ ██ ████ ██ █████       ██ ████ ██ ███████ ██      ███████ ██ ██ ██  ██ █████   
 ██    ██ ██   ██ ██  ██  ██ ██          ██  ██  ██ ██   ██ ██      ██   ██ ██ ██  ██ ██ ██      
  ██████  ██   ██ ██      ██ ███████     ██      ██ ██   ██  ██████ ██   ██ ██ ██   ████ ███████ 
                                                                                                 
                                                                                                 
                                                                                                                        
    `;

    constructor(games: IGame[]) {
        this.games = games;
    }

    showGames(): void {
        console.log('Available games:');
        this.games.forEach((game, index) => {
            console.log(`${index + 1}. ${game.name()}`);
        });
    }

    /**
     * Select game or x to exit
     * @returns
     */
    selectGame(): IGame {
        const selected = prompt('Select game or x to exit: ');
        if (selected === 'x') {
            console.log('Bye! 👐👐👐');
            process.exit(0);
        }
        const game = this.games[parseInt(selected) - 1];
        if (!game) {
            console.log('Invalid game');
            return this.selectGame();
        }

        return game;
    }

    powerOn(): void {
        console.clear();
        console.log(this.LOGO);
        this.showGames();
        const game = this.selectGame();
        console.clear();
        game.start();
    }
}

const gameMachine = new GameMachine([
    new Minesweeper(new MinesweeperClassicDrawer()),
    new Game2048(new Game2048ColorNumberDrawer()),
    new SudokuGame(
        new SudokuNumberColorDrawer(),
        new SudokuDiagonalGenerator(),
    ),
    new NQueen(new NQueenDrawer()),
    new KnightTour(new KnightTourDrawer()),
]);

gameMachine.powerOn();
