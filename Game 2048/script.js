import Grid from "./grid.js";

const gameBoard = document.getElementById ("game-board");

const grid = new Grid(gameBoard);
console.log(grid.randomEmptyCells);
grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);