document.addEventListener("click", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const totalCircle = document.querySelector(".circle");

    console.log("x = ", x, "y = ", x);

    const randomNo = Math.random();
    const diameter = "100px";
    const radius = 50;

    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.top = y - radius + "px";
    circle.style.left = x - radius + "px";
    circle.style.width = diameter;
    circle.style.height = diameter;

    document.body.appendChild(circle);

});