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
    scene: AbaloneGame
};

class AbaloneGame extends Phaser.Scene {
    constructor() {
        super();
        this.boardState = null;
        this.hexSize = 40;
        this.selectedMarbles = [];
        this.currentPlayer = 1; // 1: Black, 2: White
        this.marbleCounts = { 1: 14, 2: 14 };
        this.moveHistory = [];
        this.moveIndicators = [];
    }

    preload() {
        this.load.image('hex', 'assets/hex.png');
        this.load.image('black', 'assets/black.png');
        this.load.image('white', 'assets/white.png');
        this.load.image('selected', 'assets/selected.png');
        this.load.image('move', 'assets/move.png');
    }

    create() {
        this.
    initBoard() {
        this.boardState = new Map();
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        // Iterate over rows to create the hexagonal board
        for (let row = 0; row < 9; row++) {
            let rowWidth = row <= 4 ? 5 + row : 13 - row;
            const startCol = Math.floor((9 - rowWidth) / 2);

            for (let col = 0; col < rowWidth; col++) {
                const q = col + startCol - 4; // Axial coordinates (q, r)
                const r = row - 4;

                const position = this.hexToPixel(q, r, centerX, centerY);

                // Add a hexagonal cell
                const hex = this.add.image(position.x, position.y, 'hex').setScale(0.8);
                this.boardState.set(`${q},${r}`, { q, r, hex, marble: null });

                // Add marbles based on the Abalone starting formation
                if (row === 0 && col < 5) {
                    this.addMarble(position.x, position.y, q, r, 1); // Black
                } else if (row === 1 && col < 6) {
                    this.addMarble(position.x, position.y, q, r, 1); // Black
                } else if (row === 2 && col >= 1 && col <= 3) {
                    this.addMarble(position.x, position.y, q, r, 1); // Black
                } else if (row === 6 && col >= 2 && col <= 4) {
                    this.addMarble(position.x, position.y, q, r, 2); // White
                } else if (row === 7 && col < 6) {
                    this.addMarble(position.x, position.y, q, r, 2); // White
                } else if (row === 8 && col < 5) {
                    this.addMarble(position.x, position.y, q, r, 2); // White
                }
            }
        }
    }

    addMarble(x, y, q, r, player) {
        const marble = this.add.image(x, y, player === 1 ? 'black' : 'white').setScale(0.6).setInteractive();
        this.boardState.get(`${q},${r}`).marble = marble;
        marble.player = player; // Store player (1: Black, 2: White)
    }

    hexToPixel(q, r, offsetX = 0, offsetY = 0) {
        const hexSize = this.hexSize; // Ensure hexSize is consistent
        const x = hexSize * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
        const y = hexSize * (3 / 2 * r);
        return { x: x + offsetX, y: y + offsetY };
    }
    
        this.setupInput();
        this.updateUI();
    }

    // Initialize board and other methods here...
}

new Phaser.Game(config);
