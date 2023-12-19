let button_start = document.getElementById("start");
let blocks = document.getElementsByClassName("block");
button_start.addEventListener("click", function () {
    blocks[0].style.zIndex = 1;
    blocks[1].style.zIndex = 2;
});
