let button_start = document.getElementById('start');
let blocks = document.getElementsByClassName('block');

button_start.addEventListener('click', function () {
    startGame();
    setTimeout(function () {
        drawBackground('main');
        document.getElementById('gameBackground').classList.remove('on');
    }, 5000);
});

function startGame() {
    blocks[0].style.zIndex = 1;
    button_start.disabled = true;
    button_start.style.visibility = 'hidden';
    blocks[1].style.zIndex = 2;
    drawBackground('start');
    document.getElementById('gameBackground').classList.add('on');
    var clock = ['8AM', '9AM', '10AM', '11AM', '12AM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM'];
    var clockIndex = 0;
    setInterval(() => {
        clockIndex += 1;
        drawTime(clock[clockIndex]);
    }, 1500);
}
