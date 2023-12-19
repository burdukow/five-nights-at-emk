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

function CamButton(CamButtonRect) {
    context.beginPath();
    context.rect(CamButtonRect.x, CamButtonRect.y, CamButtonRect.width, CamButtonRect.height);
    context.fillStyle = "rgba(225,225,225,0.5)";
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = "#000000";
    context.stroke();
    context.closePath();
}

function DoorButton(DoorButtonRect) {
    context.beginPath();
    context.rect(DoorButtonRect.x, DoorButtonRect.y, DoorButtonRect.width, DoorButtonRect.height);
    context.fillStyle = "rgba(225,225,225,0.5)";
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = "#000000";
    context.stroke();
    context.closePath();
}

function DrawBackground(room) {
    switch (room) {
        case "start":
            image.src = "./assets/img/testimage.jpg";
            context.drawImage(image, image.width / 4, image.height / 4, image.width / 2, image.height / 2, 0, 0, canvas.width, canvas.height);
    }
}
