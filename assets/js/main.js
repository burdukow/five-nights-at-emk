let button_start = document.getElementById('start');
let blocks = document.getElementsByClassName('block');

var clock = ['8AM', '9AM', '10AM', '11AM', '12AM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM'];
var clockIndex = 0;

function vapeInterval() {
    return setInterval(function () {
        if (vapeProgress > 0) {
            vapeProgress -= 1;
            vapeProgressRect.height = vapeProgress;
            drawProgressBar(vapeProgressRect, 'rgba(0,255,0,1)');
        } else {
            deathScreen();
        }
    }, 400);
}

// function randomAnimatronicMove() {
//     return setInterval(function () {
//         let animatronics = ['Student', 'Maxim', 'Katya', 'Dima', 'ZamDir']; // TODO
//         gameMap.getAccessibleRooms();
//     }, 156);
// }

var vapeIntervalID;

button_start.addEventListener('click', function () {
    startGame();
    setTimeout(function () {
        drawBackground('main');
        document.getElementById('gameBackground').classList.remove('on');
        activeGUI();
        audio.src = './assets/sounds/pc_on.mp3';
        audio.loop = true;
        audio.play();
        drawTime(clock[clockIndex]);
        vapeIntervalId = vapeInterval();
        setInterval(() => {
            clockIndex += 1;
            if (clock[clockIndex] == '6PM') {
                endGame();
            } else {
                drawTime(clock[clockIndex]);
            }
        }, 150000);
    }, 5000);
});

function startGame() {
    blocks[0].style.zIndex = 1;
    blocks[0].style.width = 0;
    blocks[0].style.height = 0;
    audio.src = './assets/sounds/start_game.mp3';
    audio.play();
    button_start.disabled = true;
    button_start.style.visibility = 'hidden';
    blocks[1].style.zIndex = 2;
    drawBackground('start');
    document.getElementById('gameBackground').classList.add('on');
}

function endGame() {
    clearInterval(vapeIntervalId);
    contextBg.clearRect(0, 0, canvasBg.width, canvasBg.height);
    contextGUI.fillStyle = 'rgba(0,0,0,1)';
    contextGUI.fillRect(0, 0, canvasGUI.width, canvasGUI.height);
    contextZone.clearRect(0, 0, canvasZone.width, canvasZone.height);
    contextGUI.font = '48px Arial';
    contextGUI.fillStyle = 'white';
    contextGUI.textAlign = 'center';
    contextGUI.textBaseline = 'middle';
    contextGUI.fillText('6PM', canvasGUI.width / 2, canvasGUI.height / 2);
}
