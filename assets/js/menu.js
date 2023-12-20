var image = new Image();

var CamButtonRect = {
    x: 600,
    y: 700,
    width: 400,
    height: 50,
};
var DoorButtonRect = {
    x: 100,
    y: 250,
    width: 100,
    height: 250,
};

function drawButton(rect) {
    context.beginPath();
    context.rect(rect.x, rect.y, rect.width, rect.height);
    context.fillStyle = 'rgba(225,225,225,0.5)';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.stroke();
    context.closePath();
}

function drawBackground(room) {
    if (room == 'start') {
        image.src = './assets/img/startsplash.png';
        image.onload = function () {
            context.drawImage(image, 0, 0);
            addCrtLines();
        };
    } else if (room == 'main') {
        image.src = './assets/img/rooms/placeholder.png'; // TODO: Add photos
        image.onload = function () {
            context.drawImage(image, 0, 0);
            drawButton(CamButtonRect);
            drawButton(DoorButtonRect);
            addCrtLines();
        };
    }
}
