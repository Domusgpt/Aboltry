
const config = {
    type: Phaser.AUTO,
    parent: 'game-canvas',
    width: 800,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#ffffff',
    scene: DebugAbaloneGame
};

class DebugAbaloneGame extends Phaser.Scene {
    constructor() {
        super();
        this.boardState = null;
        this.hexSize = 40;
    }

    preload() {
        // Load essential assets
        this.load.image('hex', 'assets/hex.png');
        this.load.image('black', 'assets/black.png');
        this.load.image('white', 'assets/white.png');
    }

    create() {
        // Initialize a basic board with just hexes and marbles
        this.initBoard();
    }

    initBoard() {
        this.boardState = new Map();
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        console.log('Initializing board...');

        for (let row = 0; row < 9; row++) {
            let rowWidth = row <= 4 ? 5 + row : 13 - row;
            const startCol = Math.floor((9 - rowWidth) / 2);

            for (let col = 0; col < rowWidth; col++) {
                const q = col + startCol - 4; // Axial coordinates (q, r)
                const r = row - 4;

                const position = this.hexToPixel(q, r, centerX, centerY);
                const hex = this.add.image(position.x, position.y, 'hex').setScale(0.8);

                // Add black or white marbles for testing
                let marble = null;
                if (row === 0 && col < 5) {
                    marble = this.add.image(position.x, position.y, 'black').setScale(0.6);
                } else if (row === 8 && col < 5) {
                    marble = this.add.image(position.x, position.y, 'white').setScale(0.6);
                }

                this.boardState.set(`${q},${r}`, { q, r, hex, marble });
            }
        }

        console.log('Board initialized successfully.');
    }

    hexToPixel(q, r, offsetX = 0, offsetY = 0) {
        const x = this.hexSize * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
        const y = this.hexSize * (3 / 2 * r);
        return { x: x + offsetX, y: y + offsetY };
    }
}

new Phaser.Game(config);
