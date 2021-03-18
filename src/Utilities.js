import unclickedCell from './imgs/unclickedCell.png';
import flaggedCell from './imgs/flaggedCell.png';
import clickedCell from './imgs/clickedCell.png';
import mine from './imgs/mine.png';
import n1 from './imgs/n1.png'
import n2 from './imgs/n2.png'
import n3 from './imgs/n3.png'
import n4 from './imgs/n4.png'
import n5 from './imgs/n5.png'
import n6 from './imgs/n6.png'
import n7 from './imgs/n7.png'
import n8 from './imgs/n8.png'

function getImages() {
  function processImg(src) {
    const image = new Image(32, 32);
    image.src = src;
    return image
  }
  return {
    "unclickedCell": processImg(unclickedCell),
    "flaggedCell": processImg(flaggedCell),
    "clickedCell": processImg(clickedCell),
    "mine": processImg(mine),
    "number": [
        processImg(n1),
        processImg(n2),
        processImg(n3),
        processImg(n4),
        processImg(n5),
        processImg(n6),
        processImg(n7),
        processImg(n8)
    ]
  }
}

function createGame(size) {
    //STEP 1: Creates a bidimensional array to hold the data of all cells
    const cells = Array.from(Array(size), () => {
        return Array.from(Array(size), () => {
            return {
                "isClicked": false,
                "isMine": false,
                "isFlagged": false
            }
        })
    });

    //STEP 2: Changes 20% of the cells to mines
    let mines = Math.pow(size, 2) * 0.2;
    while(mines > 0){
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);

        if(!cells[x][y].isMine) {
            cells[x][y].isMine = true;
            mines--;
        }
    }

    //STEP 3: Sets the array of cells
    return cells;
} 

export default class Handler {
    constructor() {
        this.context = null;
        this.size = 7;
        this.cells = createGame(7);
        this.images = getImages();
    }

    drawTile(x, y) {
        const cell = this.cells[x][y];

        //Cells' states can be: Clicked, Flagged, or Unclicked.
        if(cell.isClicked) {
            this.renderTile(this.images.clickedCell, x, y);
            if(cell.isMine){
                this.renderTile(this.images.mine, x, y); //Stub
            }else{
                const num = this.getSurroundingMines(x, y);
                (num > 0) && this.renderTile(this.images.number[num - 1], x, y);
            }
        }else{
            this.renderTile(this.images.unclickedCell, x, y);
            if(cell.isFlagged) {
                this.renderTile(this.images.flaggedCell, x, y);
            }
        }
    }

    renderTile(img, x, y) {
        const scaler = 500 / this.size;
        this.context.drawImage(img, x * scaler, y * scaler, scaler, scaler);
    }

    doRight(x, y) {
        const cell = this.cells[x][y];
        if(!cell.isFlagged && !cell.isClicked) { //If cell is not flagged nor clicked
            cell.isClicked = true;
            this.drawTile(x, y);
        }
    }

    doLeft(x, y) {
        const cell = this.cells[x][y];
        if(!cell.isClicked){
            cell.isFlagged = !cell.isFlagged;
            this.drawTile(x, y);
        }
    }

    /**
     * Returns if a cell exists within the limits of the grid
     * @param {Number} x X location of the cell
     * @param {Number} y Y location of the cell
     * @returns {boolean} Whether the cell exists within the limits of the grid
     */
    isValid(x, y) {
        return (x > -1) && (y > -1) && (x < this.size) && (y < this.size);
    }

    /**
     * Returns 1 if the cell is a mine, and returns 0 if it is not or if it doesn't exist
     * @param {Number} x X location of the cell 
     * @param {Number} y Y location of the cell
     * @returns {Number} 1 if the cell is a mine, and returns 0 if it is not or if it doesn't exist
     */
    checkMine(x, y) {
        if(this.isValid(x, y)) return (this.cells[x][y].isMine) ? 1 : 0;
        return 0;
    }

    /**
     * Returns the amount of cells around (x, y) that are mines
     * @param {Number} x X location of the cell
     * @param {Number} y Y location of the cell
     * @returns {boolean} The amount of cells arount (x, y)
     */
    getSurroundingMines(x, y){
        return this.checkMine(x - 1, y - 1) + this.checkMine(x, y - 1) + this.checkMine(x + 1, y - 1) + this.checkMine(x - 1, y) + this.checkMine(x + 1, y) + this.checkMine(x - 1, y + 1) + this.checkMine(x, y + 1) + this.checkMine(x + 1, y + 1);
    }
}