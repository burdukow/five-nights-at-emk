var image = new Image();

var camButtonRect = {
    x: 600,
    y: 700,
    width: 400,
    height: 50,
};
var doorButtonRect = {
    x: 500,
    y: 350,
    width: 150,
    height: 350,
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
    contextGUI.beginPath();
    contextGUI.rect(rect.x, rect.y, rect.width, rect.height);
    contextGUI.fillStyle = 'rgba(225,225,225,0.5)';
    contextGUI.fill();
    contextGUI.lineWidth = 2;
    contextGUI.strokeStyle = '#000000';
    contextGUI.stroke();
    contextGUI.closePath();
}

function drawTime(clockTime) {
    contextGUI.fillStyle = 'white';
    contextGUI.textAlign = 'center';
    contextGUI.textBaseline = 'middle';
    contextGUI.fillText(clockTime, 1050, 50);
}

var color = 'rgba(0,255,0,1)';

function drawProgressBar(rect, color) {
    contextGUI.beginPath();
    contextGUI.rect(rect.x, rect.y, rect.width, rect.height);
    contextGUI.fillStyle = color;
    contextGUI.fill();
    contextGUI.lineWidth = 2;
    contextGUI.strokeStyle = '#000000';
    contextGUI.stroke();
    contextGUI.closePath();
}

function drawBackground(room) {
    if (room == 'start') {
        image.src = './assets/img/startsplash.png';
        image.onload = function () {
            contextBg.drawImage(image, 0, 0);
            addCrtLines();
        };
    } else if (room == 'main') {
        image.src = './assets/img/rooms/main_open.png';
        image.onload = function () {
            contextBg.drawImage(image, 0, 0);
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
                    deathScreen();
                }
            }, 400);
        };
    }
}

function addCrtLines() {
    for (var y = 0; y < canvasGUI.height; y += 3) {
        contextGUI.fillStyle = 'rgba(0, 0, 0, .2)';
        contextGUI.fillRect(0, y, canvasGUI.width, 1);
    }
}

function deathScreen() {
    contextGUI.fillStyle = 'rgba(0,0,0,1)';
    contextGUI.fillRect(0, 0, canvasGUI.width, canvasGUI.height);
    contextGUI.font = '20px Arial';
    contextGUI.fillStyle = 'white';
    contextGUI.textAlign = 'center';
    contextGUI.textBaseline = 'middle';
    contextGUI.fillText('СМЭРТ', canvasGUI.width / 2, canvasGUI.height / 2);
    addCrtLines();
    setTimeout(() => {
        window.location.reload();
    }, 2000);
}
