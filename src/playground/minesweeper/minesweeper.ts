const prompt = require('prompt-sync')();
export class MinesweeperGame {
    greeting() {
        const LOGO = `
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
        console.log(LOGO);
    }

    selectDifficulty(): number[] {
        console.log('Select difficulty level:');
        console.log('1. Easy');
        console.log('2. Medium');
        console.log('3. Hard');
        console.log('4. Custom');
        const difficulty = parseInt(prompt('Choose a difficulty level: '));
        if (isNaN(difficulty)) {
            console.log('Invalid difficulty');
            return this.selectDifficulty();
        }

        switch (difficulty) {
            case 1:
                return [10, 9, 9];
            case 2:
                return [40, 16, 16];
            case 3:
                return [99, 16, 30];
            case 4:
                return this.selectCustomDifficulty();
            default:
                console.log('Invalid difficulty');
                return this.selectDifficulty();
        }
    }

    selectCustomDifficulty(): number[] {
        const mines = parseInt(prompt('Number of mines: '));
        const rows = parseInt(prompt('Number of rows: '));
        const cols = parseInt(prompt('Number of columns: '));
        if (isNaN(mines) || isNaN(rows) || isNaN(cols)) {
            console.log('Invalid difficulty');
            return this.selectCustomDifficulty();
        }
        return [mines, rows, cols];
    }

    start() {
        this.greeting();
        const [mines, rows, cols] = this.selectDifficulty();
    }
}
