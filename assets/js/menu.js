var image = new Image();

var camButtonRect = {
    x: 600,
    y: 700,
    width: 400,
    height: 50,
};
var doorButtonRect = {
    x: 100,
    y: 250,
    width: 100,
    height: 250,
};

var vapeProgressRect = {
    x: 10,
    y: 284,
    width: 20,
    height: 200,
};

var vapeChargeButtonRect = {
    x: 50,
    y: 700,
    width: 100,
    height: 50,
};

var maskButtonRect = {
    x: 190,
    y: 700,
    width: 400,
    height: 50,
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

var color = 'rgba(0,255,0,1)';

function drawProgressBar(rect, color) {
    context.beginPath();
    context.rect(rect.x, rect.y, rect.width, rect.height);
    context.fillStyle = color;
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
            addCrtLines();
            drawButton(camButtonRect);
            drawButton(doorButtonRect);
            drawButton(vapeChargeButtonRect);
            drawButton(maskButtonRect);
            drawProgressBar(vapeProgressRect, color);
            let vapeInterval = setInterval(function () {
                if (vapeProgress > 0) {
                    vapeProgress -= 1;
                    vapeProgressRect.height = vapeProgress;
                    drawProgressBar(vapeProgressRect, color);
                } else {
                    alert('Death');
                    clearInterval(vapeInterval);
                }
            }, 500);
        };
    }
}

function addCrtLines() {
    for (var y = 0; y < canvas.height; y += 3) {
        context.fillStyle = 'rgba(0, 0, 0, .2)';
        context.fillRect(0, y, canvas.width, 1);
    }
}
