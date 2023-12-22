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
let vapeCharge = 50;

let curRoom = 'A1';

let gameMap = {
    rooms: [
        { name: 'A1', animatronics: ['Student'], canMove: ['Student'] },
        { name: 'A2', animatronics: [], canMove: ['Student', 'Maxim'] },
        { name: 'main', animatronics: [], canMove: [] },
        { name: 'A3', animatronics: ['Katya'], canMove: ['Katya'] },
        { name: 'B1', animatronics: ['Dima'], canMove: ['Dima'] },
        { name: 'B2', animatronics: [], canMove: [] },
        { name: 'B3', animatronics: [], canMove: ['Dima'] },
        { name: 'staircase', animatronics: [], canMove: ['ZamDir', 'Maxim'] },
        { name: 'C1', animatronics: [], canMove: ['Katya'] },
        { name: 'hall', animatronics: [], canMove: [] },
        { name: 'outside', animatronics: ['ZamDir', 'Maxim'], canMove: ['Dima', 'ZamDir', 'Maxim'] },
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
                if (this.canAnimatronicsMoveTo(animatronicName, roomTo)) {
                    from.animatronics.splice(index, 1);
                    to.animatronics.push(animatronicName);
                    console.log(`${animatronicName} moved from ${roomFrom} to ${roomTo}.`);
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

function activeGUI() {
    canvasGUI.addEventListener(
        'click',
        function (e) {
            var mousePos = getMousePos(canvasGUI, e);
            if (isInside(mousePos, camButtonRect)) {
                camOpenClose(camOpened);
                camOpened = !camOpened;
            }
            if (isInside(mousePos, vapeChargeButtonRect)) {
                if (vapeCharge > 0) {
                    if (vapeProgress + 5 <= 200) {
                        vapeProgress += 5;
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
                }
            }
            if (isInside(mousePos, doorButtonRect)) {
                doorOpened = !doorOpened;
                doorOpenClose(doorOpened);
            }
        },
        false,
    );
}

function camOpenClose(isCamOpened) {
    if (isCamOpened) {
        document.getElementById('game').classList.add('off');
        setTimeout(function () {
            document.getElementById('game').classList.remove('off');
            doorOpenClose(doorOpened);
        }, 500);
    } else {
        drawBackground(curRoom);
    }
}

function doorOpenClose(isDoorOpened) {
    if (isDoorOpened) {
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
