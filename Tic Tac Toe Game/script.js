let ting = new Audio("ting.mp3");
let gameover = new Audio("overmusic.mp3");
let turn = "X";
let gamestatus = false;

// Function to change the turn 
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// Reset Button Logic
const reset = document.getElementById("resetBtn");
reset.addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    boxtexts.forEach(elem => {
        elem.innerText = "";
    });
    turn = "X";
    gamestatus = false;
    document.querySelector(".info").innerText = "Turn For " + turn;
    document.querySelector(".winImg").style.height = "0px";
    document.querySelector(".line").style.width = "0px";
});

// Function to check for a win
// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let win = [
        [0, 1, 2, 0, -120, 0, 0, 90],
        [3, 4, 5, 0, 0, 0, 0, 0],
        [6, 7, 8, 0, 120, 0, 90],
        [0, 3, 6, -120, 0, 90, -90, 0],
        [1, 4, 7, 0, 0, 90, 0, 0],
        [2, 5, 8, 120, 0, 90, 90, 0], 
        [0, 4, 8, 0, 0, 45, 0, 0],
        [2, 4, 6, 0, 0, -45, 0, 0] 
    ];

    win.forEach(e => {
        if((boxtext[e[0]].innerHTML === boxtext[e[1]].innerHTML) &&
            (boxtext[e[2]].innerHTML === boxtext[e[1]].innerHTML) && 
            (boxtext[e[0]].innerHTML !== "")) {

            document.querySelector(".info").innerText = boxtext[e[0]].innerHTML + " Won the Game";
            gamestatus = true;
            gameover.play();
            document.querySelector(".winImg").style.height = "120px";
            
            const line = document.querySelector('.line');
            const mwidth = window.innerWidth;

            if(mwidth > 800) {
                line.style.transform = 
                `translate(${e[3]}px, ${e[4]}px) rotate(${e[5]}deg)`;
            line.style.width = "360px"; 
            // Width of the line to cover the grid  
            }
            else {
                line.style.transform = 
                `translate(${e[6]}px, ${e[7]}px) rotate(${e[5]}deg)`;
                line.style.width = "270px";
            }
            
        }
    });
}


// Game Logic
const boxes = document.querySelectorAll(".box");

boxes.forEach(elem => {
    let boxtext = elem.querySelector(".boxtext");
    elem.addEventListener("click", () => {
        if(boxtext.innerText === '' && !gamestatus) {
            boxtext.innerText = turn;
            turn = changeTurn();
            ting.play();
            checkWin();
            if(!gamestatus) {
                document.querySelector(".info").innerText = "Turn For " + turn;
            }
        }
    });
}); 
