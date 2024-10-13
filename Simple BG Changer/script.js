const buttons = document.querySelectorAll(".button");
const body = document.querySelector('body');

buttons.forEach(function(button) {
    console.log(button);
    button.addEventListener('click', (e) =>{
        console.log(e);
        if(e.target.id === "white"){
            body.style.backgroundColor = e.target.id;
        }
        if(e.target.id === "green"){
            body.style.backgroundColor = "#67d167";
        }
        if(e.target.id === "blue"){
            body.style.backgroundColor = "#0099ff";
        }
        if(e.target.id === "yellow"){
            body.style.backgroundColor = e.target.id;
        }
    });
});