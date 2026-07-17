"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnakeGame = SnakeGame;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_SPEED = 150;
function SnakeGame() {
    const [snake, setSnake] = (0, react_1.useState)(INITIAL_SNAKE);
    const [direction, setDirection] = (0, react_1.useState)(INITIAL_DIRECTION);
    const [food, setFood] = (0, react_1.useState)({ x: 15, y: 5 });
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(false);
    const [isGameOver, setIsGameOver] = (0, react_1.useState)(false);
    const [score, setScore] = (0, react_1.useState)(0);
    const [highScore, setHighScore] = (0, react_1.useState)(0);
    const generateFood = (0, react_1.useCallback)(() => {
        let newFood;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
            // eslint-disable-next-line no-loop-func
            if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
                break;
            }
        }
        return newFood;
    }, [snake]);
    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setScore(0);
        setIsGameOver(false);
        setIsPlaying(true);
        setFood(generateFood());
    };
    const handleKeyPress = (0, react_1.useCallback)((e) => {
        if (!isPlaying)
            return;
        switch (e.key) {
            case 'ArrowUp':
                if (direction.y !== 1)
                    setDirection({ x: 0, y: -1 });
                break;
            case 'ArrowDown':
                if (direction.y !== -1)
                    setDirection({ x: 0, y: 1 });
                break;
            case 'ArrowLeft':
                if (direction.x !== 1)
                    setDirection({ x: -1, y: 0 });
                break;
            case 'ArrowRight':
                if (direction.x !== -1)
                    setDirection({ x: 1, y: 0 });
                break;
        }
    }, [direction, isPlaying]);
    (0, react_1.useEffect)(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);
    (0, react_1.useEffect)(() => {
        if (!isPlaying || isGameOver)
            return;
        const moveSnake = () => {
            setSnake(prevSnake => {
                const head = prevSnake[0];
                const newHead = {
                    x: head.x + direction.x,
                    y: head.y + direction.y
                };
                // Check collision with walls
                if (newHead.x < 0 ||
                    newHead.x >= GRID_SIZE ||
                    newHead.y < 0 ||
                    newHead.y >= GRID_SIZE) {
                    setIsGameOver(true);
                    setIsPlaying(false);
                    if (score > highScore)
                        setHighScore(score);
                    return prevSnake;
                }
                // Check collision with self
                if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    setIsGameOver(true);
                    setIsPlaying(false);
                    if (score > highScore)
                        setHighScore(score);
                    return prevSnake;
                }
                const newSnake = [newHead, ...prevSnake];
                // Check food collision
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore(s => s + 10);
                    setFood(generateFood());
                }
                else {
                    newSnake.pop();
                }
                return newSnake;
            });
        };
        const gameLoop = setInterval(moveSnake, Math.max(50, INITIAL_SPEED - (score * 2)));
        return () => clearInterval(gameLoop);
    }, [snake, direction, food, isPlaying, isGameOver, score, highScore, generateFood]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center p-6 font-sans bg-white h-full min-h-[500px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between w-full max-w-[400px] mb-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-primary-cyan border-4 border-black p-3 flex flex-col items-center flex-1 mr-4 shadow-[4px_4px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-black text-black uppercase tracking-widest", children: "Score" }), (0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-black text-black", children: score })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-primary-yellow border-4 border-black p-3 flex flex-col items-center flex-1 shadow-[4px_4px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-black text-black uppercase tracking-widest flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trophy, { size: 12, strokeWidth: 3 }), " Best"] }), (0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-black text-black", children: highScore })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative border-4 border-black bg-surface-alt shadow-[8px_8px_0px_0px_#000]", style: { width: '400px', height: '400px' }, children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 opacity-[0.1]", style: { backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' } }), !isPlaying && !isGameOver && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-10 backdrop-blur-sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Gamepad2, { size: 64, className: "mb-4 text-black", strokeWidth: 1.5 }), (0, jsx_runtime_1.jsx)("h3", { className: "text-3xl font-black mb-6 uppercase tracking-widest text-black", children: "Snake" }), (0, jsx_runtime_1.jsx)("button", { onClick: resetGame, className: "bg-primary-green text-black border-4 border-black px-8 py-3 font-black uppercase text-lg hover:bg-black hover:text-primary-green transition-all shadow-[4px_4px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none", children: "Start Game" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-4 text-sm font-bold text-gray-500 uppercase", children: "Use Arrow Keys" })] })), isGameOver && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-10", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-4xl font-black mb-2 uppercase tracking-widest text-primary-red", children: "Game Over" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-white font-bold mb-6 uppercase tracking-wider", children: ["Final Score: ", (0, jsx_runtime_1.jsx)("span", { className: "text-primary-yellow", children: score })] }), (0, jsx_runtime_1.jsxs)("button", { onClick: resetGame, className: "bg-white text-black border-4 border-black px-8 py-3 font-black uppercase text-lg flex items-center gap-2 hover:bg-primary-yellow transition-all shadow-[4px_4px_0px_0px_#primary-yellow] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RotateCcw, { size: 20, strokeWidth: 3 }), " Play Again"] })] })), snake.map((segment, index) => ((0, jsx_runtime_1.jsx)("div", { className: "absolute bg-primary-green border-2 border-black", style: {
                            width: '20px',
                            height: '20px',
                            left: `${segment.x * 20}px`,
                            top: `${segment.y * 20}px`,
                            zIndex: index === 0 ? 5 : 2
                        } }, index))), (0, jsx_runtime_1.jsx)("div", { className: "absolute bg-primary-red border-2 border-black rounded-full", style: {
                            width: '20px',
                            height: '20px',
                            left: `${food.x * 20}px`,
                            top: `${food.y * 20}px`,
                            zIndex: 3
                        } })] })] }));
}
