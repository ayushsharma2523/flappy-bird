// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Constants
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const GRAVITY = 0.6;
const FLAP = -10;
const PIPE_WIDTH = 50;
const PIPE_SPEED = 2;
const PIPE_INTERVAL = 150;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;

// Variables
let birdY = CANVAS_HEIGHT / 2;
let velocity = 0;
let pipes = [];
let score = 0;
let gameOver = false;

// Event listeners
document.addEventListener('keydown', flap);

// Functions
function flap(event) {
    if (event.keyCode === 32 && !gameOver) {
        velocity = FLAP;
    }
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw bird
    ctx.fillStyle = '#f00';
    ctx.fillRect(50, birdY, BIRD_WIDTH, BIRD_HEIGHT);

    // Draw pipes
    ctx.fillStyle = '#0f0';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.height);
        ctx.fillRect(pipe.x, pipe.height + 150, PIPE_WIDTH, CANVAS_HEIGHT - pipe.height - 150);
        pipe.x -= PIPE_SPEED;

        // Check collision
        if (
            (50 < pipe.x + PIPE_WIDTH) && (50 + BIRD_WIDTH > pipe.x) &&
            (birdY < pipe.height || birdY + BIRD_HEIGHT > pipe.height + 150)
        ) {
            gameOver = true;
        }

        // Increase score
        if (pipe.x === 10) {
            score++;
        }
    });

    // Draw score
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 20, 30);

    // Update bird position
    if (!gameOver) {
        birdY += velocity;
        velocity += GRAVITY;
    } else {
        ctx.fillText('Game Over!', CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT / 2);
    }

    // Generate new pipe
    if (pipes.length === 0 || pipes[pipes.length - 1].x < CANVAS_WIDTH - PIPE_INTERVAL) {
        pipes.push({ x: CANVAS_WIDTH, height: Math.random() * (CANVAS_HEIGHT - 200) });
    }

    // Remove passed pipes
    if (pipes.length > 0 && pipes[0].x + PIPE_WIDTH < 0) {
        pipes.shift();
    }
}

// Game loop
setInterval(draw, 1000 / 60);
