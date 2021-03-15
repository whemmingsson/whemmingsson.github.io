
const ROWS = 10;
const COLS = 20;
const BOMB_CHANCE_PERCENTAGE = 25;
const EXACT_NUMBER_OF_BOMBS = true;
const board = [];
let game;

const createBoard = () => {
    let numBombs = 0;
    const maxNumOfBombs = Math.round(ROWS*COLS*0.01*BOMB_CHANCE_PERCENTAGE);
    for(let i = 0; i < ROWS; i++) {
        const divRow = document.createElement("div");

        board[i] = [];
        for(let j = 0; j < COLS; j++) {
            const spanSquare = document.createElement("span");  

            spanSquare.setAttribute("class", "square"); 
            spanSquare.setAttribute("data-row", i);
            spanSquare.setAttribute("data-col", j);
      
            divRow.appendChild(spanSquare);  

            let hasBomb;
            if(EXACT_NUMBER_OF_BOMBS)
                hasBomb = numBombs < maxNumOfBombs && Math.floor(Math.random() * 100) >= (100 - BOMB_CHANCE_PERCENTAGE);
            else
                hasBomb = Math.floor(Math.random() * 100) >= (100 - BOMB_CHANCE_PERCENTAGE);

            board[i][j] = {bomb: hasBomb};

            if(hasBomb) {
                const iBomb = document.createElement("i");
                iBomb.setAttribute("class", "fa fa-bomb");
                spanSquare.appendChild(iBomb);
                numBombs++;
            }
        }

        divRow.setAttribute("class", "row");
        game.appendChild(divRow); 
    } 

    console.log(`Bombs: ${BOMB_CHANCE_PERCENTAGE}% (expected)`);
    console.log(`Bombs: ${Math.round(numBombs / (ROWS*COLS) * 100)}% (actual)`);

    calculateNeighborsWithBombs();  
}

const forEachCell = (innerFunc) => {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            innerFunc(board[i][j], i, j);
        }
    }
}

const calculateNeighborsWithBombs = () => {
    forEachCell((cell,i,j) => {
        if (!cell.bomb) {
            cell.nearbyBombs = countNeighborsWithBombs(i, j);
            let square = document.querySelector(`span[data-row='${i}'][data-col='${j}']`);
            square.setAttribute("data-n", cell.nearbyBombs);
            square.innerHTML = cell.nearbyBombs;  
        }  
    })
}

const countNeighborsWithBombs = (i, j) => {
    let count = 0;

    if(i < ROWS-1 &&  board[i+1][j].bomb)     
        count++;
    if(j < COLS-1 && board[i][j+1].bomb)     
        count++;
    if(i < ROWS-1 && j < COLS-1  && board[i+1][j+1].bomb)     
        count++;
    if(j > 0  && board[i][j-1].bomb)     
        count++;
    if(i > 0 && board[i-1][j].bomb)     
        count++;
    if(j < COLS-1 && i > 0 &&  board[i-1][j+1].bomb)     
        count++;
    if(i > 0 && j > 0  && board[i-1][j-1].bomb)     
        count++;
    if(j > 0 && i < ROWS-1  && board[i+1][j-1].bomb)     
        count++;

    return count;
}

const setup = (e) => {
    console.log("setup");
    game = document.getElementById("game");
    createBoard();
}

document.body.onload = setup;