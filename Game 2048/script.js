import Grid from "./grid.js";
import Tile from "./tile.js";

const gameBoard = document.getElementById ("game-board");

const grid = new Grid(gameBoard);


// Random Cell Values Generation
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)

setupInput() 


function setupInput() {
    window.addEventListener("keydown", handleInput, {once: true})
    // Run this only once then remove event
}   // First animation ends then add new tile 

async function handleInput() {

    switch(e.key) {
        case "ArrowUP": 
            if( !canMoveUp()) {
                setupInput()
                return 
            }
            await moveUp()
            break
        case "ArrowDown":
            if( !canMoveDown()) {
                setupInput()
                return 
            }
            await moveDown()
            break
        case "ArrowLeft":
            if( !canMoveLeft()) {
                setupInput()
                return 
            }
            await moveLeft()
            break
        case "ArrowRight":
            if( !canMoveRight()) {
                setupInput()
                return 
            }
            await moveRight()
            break
        default:
            break
    }

    grid.cells.forEach(cell => cell.mergeTile())

    const newTile = new Tile(gameBoard)
    gameBoard.randomEmptyCell().tile = newTile

    if(!canMoveUp() && !canMoveDown() && !canMoveLeft && !canMoveRight){
        newTile.waitForTransition(true).then(() => {
            alert("You lose")
        })
        // Alert At Last
        return
    }

    setupInput()
}

function moveUp() {
    return slideTiles(grid.cellsByColumn)
}

function moveDown() {
    return slideTiles(grid.cellsByColumn.map(column => [...column].reverse() ) )
}

function moveLeft() {
    return slideTiles(grid.cellsByRow)
}

function moveRight() {
    return slideTiles(grid.cellsByRow)
}

function slideTiles(cells) {

    return Promize.all(

    cells.flatMap(group => {

        const promises = []
        for (let i = 1; i < group.length; i++) {
            const cell = group[i]
            if (cell.tile == null) continue
            // Give cell above this
            let lastValidCell

            for(let j = i - 1; j >= 0; j-- ) {
                const moveToCell = group[j]
                // If not move one then not any.
                if (!moveToCell.canAccept(cell.tile)) break;
                lastValidCell = moveToCell  // Which cell valid last
                                
            }

            if(lastValidCell != null) {
                promises.push(cell.tile.waitForTransition())
                if(lastValidCell.tile != null) {
                    lastValidCell.mergeTile = cell.tile
                }
                else {
                    lastValidCell.tile = cell.tile
                }
                cell.tile = null
            }
        } 

        return promises
    }))
}

function canMoveUp() {
    return canMoveUp(grid.cellsByColumn)
}

function canMoveDown() {
    return canMoveUp(grid.cellsByColumn.map(column => [...column].reverse()))
}

function canMoveLeft() {
    return canMoveUp(grid.cellsByColumn)
}

function canMoveRight() {
    return canMoveUp(grid.cellsByRow.map(row => [...row].reverse()))
}

function canMove(cells) {
    return cells.some(group => {
        return group.some((cell, index) => {
            if(index == 0 ) return false
            if (cell.tile == null) return false
            const moveToCell = group[index - 1]
            return moveToCell.canAccept(cell.tile);
        })
    })
}

