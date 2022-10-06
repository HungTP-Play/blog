import { MinesweeperClassicDrawer } from './playground/minesweeper/drawer';
import { MinesweeperGame } from './playground/minesweeper/game';

function gameMachine() {
    const minesweeper = new MinesweeperGame(new MinesweeperClassicDrawer());
    minesweeper.start();
}

gameMachine();
