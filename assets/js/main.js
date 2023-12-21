let button_start = document.getElementById('start');
let blocks = document.getElementsByClassName('block');

button_start.addEventListener('click', function () {
    blocks[0].style.zIndex = 1;
    button_start.disabled = true;
    blocks[1].style.zIndex = 2;
    drawBackground('start');
    document.getElementById('gameZone').classList.add('on');
    setTimeout(function () {
        drawBackground('main');
        document.getElementById('gameZone').classList.remove('on');
    }, 5000);
});
