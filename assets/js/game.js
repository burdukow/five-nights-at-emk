let canvasGUI = document.getElementById('gameGUI');
let contextGUI = canvasGUI.getContext('2d');
let canvasBg = document.getElementById('gameBackground');
let contextBg = canvasBg.getContext('2d');

canvasBg.style.zIndex = 3;
canvasGUI.style.zIndex = 5;

canvasGUI.height = 768;
canvasGUI.width = 1152;
canvasBg.height = 768;
canvasBg.width = 1152;
contextGUI.font = '72px VT323';

let camOpened = false;
let doorOpened = true;
let vapeProgress = 200;

let gameMap = {
    rooms: [
        { name: 'A1', animatronics: ['Student'], canMove: ['Student', 'Katya', 'Dima'] },
        { name: 'A2', animatronics: [], canMove: ['Student', 'Maxim'] },
        { name: 'main', animatronics: [], canMove: [] },
        { name: 'A3', animatronics: ['Katya'], canMove: [] },
        { name: 'B1', animatronics: ['Dima'], canMove: [] },
        { name: 'B2', animatronics: [], canMove: [] },
        { name: 'B1', animatronics: [], canMove: [] },
        { name: 'staircase', animatronics: [], canMove: [] },
        { name: 'C1', animatronics: [], canMove: [] },
        { name: 'hall', animatronics: [], canMove: [] },
        { name: 'outside', animatronics: ['ZamDir', 'Maxim'], canMove: ['Dima'] },
    ],

    getAnimatronics: function (roomName) {
        const room = this.rooms.find((room) => room.name === roomName);
        return room ? room.animatronics : [];
    },

    moveAnimatronics: function (animatronicName, roomFrom, roomTo) {
        const from = this.rooms.find((room) => room.name === roomFrom);
        const to = this.rooms.find((room) => room.name === roomTo);

        if (from && to) {
            const index = from.animatronics.indexOf(animatronicName);
            if (index !== -1) {
                from.animatronics.splice(index, 1);
                to.animatronics.push(animatronicName);
                console.log(`${animatronicName} moved from ${roomFrom} to ${roomTo}.`);
            }
        }
    },
};

canvasGUI.addEventListener(
    'click',
    function (e) {
        var mousePos = getMousePos(canvasGUI, e);
        if (isInside(mousePos, camButtonRect)) {
            camOpenClose(camOpened);
            camOpened = !camOpened;
        }
        if (isInside(mousePos, vapeChargeButtonRect)) {
            if (vapeProgress + 5 <= 200) {
                vapeProgress += 5;
                vapeProgressRect.height = vapeProgress;
            } else {
                vapeProgress = 200;
                vapeProgressRect.height = vapeProgress;
                vapeProgress.y = 284;
            }
        }
        if (isInside(mousePos, doorButtonRect)) {
            doorOpened = !doorOpened;
            if (doorOpened) {
                image.src = './assets/img/rooms/main_open.png';
                image.onload = function () {
                    contextBg.drawImage(image, 0, 0);
                };
            } else {
                image.src = './assets/img/rooms/main_closed.png';
                image.onload = function () {
                    contextBg.drawImage(image, 0, 0);
                };
            }
        }
    },
    false,
);

function camOpenClose(isCamOpened) {
    if (isCamOpened) {
        document.getElementById('game').classList.add('off');
        setTimeout(function () {
            document.getElementById('game').classList.remove('off');
        }, 500);
    } else {
        openCamera();
    }
}

function openCamera() {
    console.log('WIP');
}
