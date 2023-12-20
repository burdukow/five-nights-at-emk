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

function addCrtLines() {
    for (var y = 0; y < canvas.height; y += 3) {
        context.fillStyle = 'rgba(0, 0, 0, .2)';
        context.fillRect(0, y, canvas.width, 1);
    }
}
