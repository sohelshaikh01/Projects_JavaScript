const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;
// Specify Grid Size, Cells, Gap.

export default class Grid {
    #cells

    constructor(gridElement) {
        gridElement.style.setProperty("--grid-size", GRID_SIZE)
        gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`)
        gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`)
        // Put Elements in grid container
        this.#cells = createCellElements(gridElement).map((cellElement, index) => {
            return new Cell(
                cellElement, 
                index % GRID_SIZE, 
                Math.floor(index / GRID_SIZE)
            )
        })
        // Running Cell Class
    }

    get cells() {
        return this.#cells 
    }

    get cellsByRow() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.x] || []
            cellGrid[cell.y][cell.x] = cell 
            return cellGrid
        }, [])
        
    }
    get cellsByColumn() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || []
            cellGrid[cell.x][cell.y] = cell 
            return cellGrid
        }, [])
    }

    get #emptyCells() {
        return this.#cells.filter(cell => cell.tile == null )
    }

    randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * this.#emptyCells.length)
        return this.#emptyCells[randomIndex]
    }

}

class Cell {
    #cellElement
    #x
    #y
    // Private Variable Declaration
    #tile
    #mergeTile

    constructor(cellElement, x, y) {
        this.#cellElement = cellElement
        this.#x = x
        this.#y = y
    }

    get x() {
        return this.#x
    }

    get y() {
        return this.#y
    }

    get tile() {
        return this.#tile
    }

    set tile(value) {
        this.#tile = value
        if(value == null) return
        this.#tile.x = this.#x
        this.#tile.y = this.#y
        // Moving tile from old to new cell
    }

    get mergeTile() {
        return this.mergeTile
    }

    set mergeTile(value) {
        this.#mergeTile = value
        if(value == null) return 
        this.#mergeTile.x = this.#x
        this.#mergeTile.y = this.#y
    }

    canAccept(tile) {
        return 
        this.tile == null ||
        (this.mergeTile == null || this.tile.value == tile.value)
        // Merge one Tile At once
        // If two cell in same direction have same value also get merged
    }

    mergeTile() {
        if(this.tile == null || this.mergeTile == null) return 
        this.tile.value = this.tile.value + this.mergeTile.value
        this.mergeTile.remove()
        this.mergeTile = null
    }


}


function createCellElements(gridElement) {
    const cells = [];
    for(let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell")
        cells.push(cell)
        gridElement.append(cell)
    }
    // Adding Each Cell in Box
    return cells;
}