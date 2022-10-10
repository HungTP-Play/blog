import { Game2048 } from '../2048/2048';
import { Game2048ColorNumberDrawer } from '../2048/drawer';

export function gameMachine() {
    const game2048 = new Game2048(new Game2048ColorNumberDrawer());
}

gameMachine();
