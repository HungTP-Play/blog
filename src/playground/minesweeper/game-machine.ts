import { Minesweeper } from './oop/minesweeper';
import { MinesweeperClassicDrawer } from './oop/minesweeper-classic.drawer';

export function gameMachine() {
    const minesweeper = new Minesweeper(new MinesweeperClassicDrawer());
    minesweeper.start();
}

gameMachine();
