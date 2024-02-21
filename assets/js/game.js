let canvasGUI = document.getElementById('gameGUI');
let contextGUI = canvasGUI.getContext('2d');
let canvasZone = document.getElementById('gameZone');
let contextZone = canvasZone.getContext('2d');
let canvasBg = document.getElementById('gameBackground');
let contextBg = canvasBg.getContext('2d');

canvasBg.style.zIndex = 3;
canvasZone.style.zIndex = 4;
canvasGUI.style.zIndex = 5;

var audio = new Audio();
var gameAudio = new Audio();

canvasGUI.height = 768;
canvasGUI.width = 1152;
canvasZone.height = 768;
canvasZone.width = 1152;
canvasBg.height = 768;
canvasBg.width = 1152;
contextGUI.font = '72px VT323';

let camOpened = false;
let doorOpened = true;
let vapeProgress = 200;
let vapeCharge = 50;
let canVapeBusted = false;

let curRoom = 'A1';

let animatronicsList = ['Student', 'Maxim', 'Katya', 'Dima', 'ZamDir'];

let gameMap = {
    rooms: [
        { name: 'A1', animatronics: ['Student'], canMove: ['Student', 'Katya', 'Dima'] },
        { name: 'main', animatronics: [], canMove: ['Student', 'Maxim', 'Katya', 'Dima', 'ZamDir'] },
        { name: 'A3', animatronics: ['Katya', 'Dima'], canMove: ['Katya', 'Dima', 'Student'] },
        { name: 'outside', animatronics: ['ZamDir', 'Maxim'], canMove: ['Dima', 'ZamDir', 'Maxim'] },
    ],

    getAnimatronics: function (roomName) {
        const room = this.rooms.find((room) => room.name === roomName);
        return room ? room.animatronics : [];
    },

    getAccessibleRooms: function (animatronicName) {
        let accessibleRooms = [];
        this.rooms.forEach((el) => {
            el.canMove.includes(animatronicName) ? accessibleRooms.push(el.name) : '';
        });
        return accessibleRooms;
    },

    findRoomByAnimatronic: function (animatronicName) {
        for (const room of this.rooms) {
            if (room.animatronics.includes(animatronicName)) {
                return room;
            }
        }
        return null;
    },

    moveAnimatronics: function (animatronicName, roomTo) {
        const to = this.rooms.find((room) => room.name === roomTo);
        if (to) {
            const from = this.findRoomByAnimatronic(animatronicName);
            const index = from.animatronics.indexOf(animatronicName);
            if (index !== -1) {
                if (this.canAnimatronicsMoveTo(animatronicName, roomTo)) {
                    from.animatronics.splice(index, 1);
                    to.animatronics.push(animatronicName);
                    console.log(`${animatronicName} moved to ${roomTo}.`);
                }
            }
        }
    },

    canAnimatronicsMoveTo: function (animName, roomToGo) {
        const to = this.rooms.find((room) => room.name === roomToGo);
        if (to.canMove.length === 0) {
            return true;
        }
        if (to.canMove.includes(animName)) {
            return true;
        }
        return false;
    },
};

function randomAnimatronicMove() {
    let rndAnimatronic = animatronicsList[Math.floor(Math.random() * animatronicsList.length)];
    let rndRoom = gameMap.getAccessibleRooms(rndAnimatronic)[Math.floor(Math.random() * gameMap.getAccessibleRooms(rndAnimatronic).length)];
    if (rndAnimatronic == 'ZamDir' && !doorOpened) {
        playScreamer(rndAnimatronic);
    }
    gameMap.moveAnimatronics(rndAnimatronic, rndRoom);
    const randomInterval = Math.floor(Math.random() * (30000 - 10000) + 10000);
    setTimeout(randomAnimatronicMove, randomInterval);
}

function checkRoom(roomName) {
    switch (roomName) {
        case 'A1':
            if (gameMap.getAnimatronics(roomName).includes('Student')) {
                gameAudio.src = './assets/sounds/static_camera.mp3';
                gameAudio.play();
                var image = new Image();
                image.src = './assets/img/animatronics/student.png';
                image.onload = function () {
                    contextZone.drawImage(image, 800, 350, 200, 200);
                };
            }
            if (gameMap.getAnimatronics(roomName).includes('Katya')) {
                gameAudio.src = './assets/sounds/static_camera.mp3';
                gameAudio.play();
                var image = new Image();
                image.src = './assets/img/animatronics/katya.png';
                image.onload = function () {
                    contextZone.drawImage(image, 400, 400, 200, 200);
                };
            }
            if (gameMap.getAnimatronics(roomName).includes('Dima')) {
                gameAudio.src = './assets/sounds/static_camera.mp3';
                gameAudio.play();
                var image = new Image();
                image.src = './assets/img/animatronics/dima.png';
                image.onload = function () {
                    contextZone.drawImage(image, 640, 340, 200, 200);
                };
            }
            break;
        case 'A3':
            if (gameMap.getAnimatronics(roomName).includes('Student')) {
                gameAudio.src = './assets/sounds/static_camera.mp3';
                gameAudio.play();
                image.src = './assets/img/animatronics/student.png';
                image.onload = function () {
                    contextZone.drawImage(image, 800, 350, 200, 200); // TODO edit position
                };
            }
            break;
        case 'main':
            if (gameMap.getAnimatronics(roomName).includes('Student')) {
                gameAudio.src = './assets/sounds/static_camera.mp3';
                gameAudio.play();
                var image = new Image();
                image.src = './assets/img/animatronics/student.png';
                image.onload = function () {
                    contextZone.drawImage(image, 800, 350, 200, 200);
                };
            }
            if (gameMap.getAnimatronics(roomName).includes('Katya')) {
                gameAudio.src = './assets/sounds/static_camera.mp3';
                gameAudio.play();
                var image = new Image();
                image.src = './assets/img/animatronics/katya.png';
                image.onload = function () {
                    contextZone.drawImage(image, 200, 420, 200, 200);
                };
            }
            if (gameMap.getAnimatronics(roomName).includes('Dima')) {
                gameAudio.src = './assets/sounds/static_camera.mp3';
                gameAudio.play();
                var image = new Image();
                image.src = './assets/img/animatronics/dima.png';
                image.onload = function () {
                    contextZone.drawImage(image, 640, 340, 200, 200);
                };
            }
            break;
    }
}

function activeGUI(e) {
    var mousePos = getMousePos(canvasGUI, e);
    if (isInside(mousePos, camButtonRect)) {
        camOpenClose(camOpened);
        camOpened = !camOpened;
    }
    if (isInside(mousePos, vapeChargeButtonRect)) {
        if (vapeCharge > 0) {
            canVapeBusted = true;
            gameAudio.src = './assets/sounds/vape.mp3';
            gameAudio.play();
            if (vapeProgress + 20 <= 200) {
                vapeProgress += 20;
                vapeProgressRect.height = vapeProgress;
                vapeCharge -= 1;
                drawVapeCharge(vapeCharge);
            } else {
                vapeProgress = 200;
                vapeProgressRect.height = vapeProgress;
                vapeProgress.y = 284;
                vapeCharge -= 1;
                drawVapeCharge(vapeCharge);
            }
            setTimeout(() => {
                canVapeBusted = false;
            }, 7000);
        }
    }
    if (!camOpened) {
        if (isInside(mousePos, doorButtonRect)) {
            if (doorOpened) {
                gameAudio.src = './assets/sounds/door_key_lock.mp3';
                gameAudio.play();
            } else {
                gameAudio.src = './assets/sounds/door_open.mp3';
                gameAudio.play();
            }
            doorOpened = !doorOpened;
            doorOpenClose(doorOpened);
        }
    }
}

function camOpenClose(isCamOpened) {
    if (isCamOpened) {
        gameAudio.src = './assets/sounds/camera_off.mp3';
        gameAudio.play();
        document.getElementById('game').classList.add('off');
        contextGUI.clearRect(
            camBackButtonRect.x - 2,
            camBackButtonRect.y - 2,
            camNextButtonRect.x + camNextButtonRect.width - camBackButtonRect.x + 4,
            camNextButtonRect.y + camNextButtonRect.height - camBackButtonRect.y + 4,
        );
        setTimeout(function () {
            document.getElementById('game').classList.remove('off');
            doorOpenClose(doorOpened);
            checkRoom('main');
        }, 500);
    } else {
        gameAudio.src = './assets/sounds/camera_on.mp3';
        gameAudio.play();
        drawButton(camBackButtonRect);
        drawButton(camNextButtonRect);
        drawBackground(curRoom);
    }
}

function doorOpenClose(isDoorOpened) {
    contextZone.clearRect(0, 0, 1152, 768);
    if (isDoorOpened) {
        imageBg.src = './assets/img/rooms/main_open.png';
        imageBg.onload = function () {
            contextBg.drawImage(imageBg, 0, 0);
        };
    } else {
        imageBg.src = './assets/img/rooms/main_closed.png';
        imageBg.onload = function () {
            contextBg.drawImage(imageBg, 0, 0);
        };
    }
}
