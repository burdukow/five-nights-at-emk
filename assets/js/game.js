let canvas = document.getElementById('gameZone');
let context = canvas.getContext('2d');
let camOpened = false;
let vapeProgress = 200;

canvas.height = 768;
canvas.width = 1152;

canvas.addEventListener(
    'click',
    function (e) {
        var mousePos = getMousePos(canvas, e);
        if (isInside(mousePos, camButtonRect)) {
            camOpenClose(camOpened);
            camOpened = !camOpened;
        }
        if (isInside(mousePos, doorButtonRect)) {
            console.log('Door clicked!');
        }
    },
    false,
);

function camOpenClose(isCamOpened) {
    if (isCamOpened) {
        document.getElementById('gameZone').classList.add('off');
        setTimeout(function () {
            document.getElementById('gameZone').classList.remove('off');
        }, 500);
    } else {
        openCamera();
    }
}

function openCamera() {
    console.log('WIP');
}
