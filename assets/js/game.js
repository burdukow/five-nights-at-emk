let canvas = document.getElementById('gameZone');
let context = canvas.getContext('2d');

canvas.height = 768;
canvas.width = 1152;

canvas.addEventListener(
    'click',
    function (e) {
        var mousePos = getMousePos(canvas, e);
        if (isInside(mousePos, CamButtonRect)) {
            console.log('Cam clicked!');
        }
        if (isInside(mousePos, DoorButtonRect)) {
            console.log('Door clicked!');
        }
    },
    false,
);
