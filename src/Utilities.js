import unclickedCell from './imgs/unclickedCell.png';
import flaggedCell from './imgs/flaggedCell.png';
import clickedCell from './imgs/clickedCell.png';
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
        const scaler = 500 / this.size;
        const cell = this.cells[x][y];

        //Cells' states can be: Clicked, Flagged, or Unclicked.
        if(cell.isClicked) {
            this.context.drawImage(this.images.clickedCell, x * scaler, y * scaler, scaler, scaler);
        }else{
            this.context.drawImage(this.images.unclickedCell, x * scaler, y * scaler, scaler, scaler);
            if(cell.isFlagged) {
                this.context.drawImage(this.images.flaggedCell, x * scaler, y * scaler, scaler, scaler);
            }
        }
    }
}