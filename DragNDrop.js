var sourceContainerId;

const validOrder = [];
const containers = document.getElementsByClassName('drop-container');
const sortText = document.getElementById("sort-text");

var refreshOrder = () => {
    for(let container of containers) {
        const imgs = container.getElementsByTagName('img');
        const imgArray = Object.assign([], imgs);
        const orderText = container.nextElementSibling;

        orderText.innerText = `Order: ${imgArray.map(x => x.alt).join(', ')}`;
    }
}

var randomizeImgs = () => {
    // pick random img between 0 and array.length
    // append img to container
    var imgs = containers[0].getElementsByTagName('img');
    var randImgNum;
    var len = imgs.length;
    for (i = 0; i < len; i++) {
        randImgNum = getRandomInt(0, imgs.length - 1);
        containers[0].appendChild(imgs[randImgNum]);
    }
}

var createValidOrder = () => {
    var imgs = containers[0].getElementsByTagName('img');
    sortText.innerText = "";
    for (i = 0; i < imgs.length; i++) {
        validOrder[i] = imgs[i].alt;
        if (i !== 0) {
            sortText.innerText += ", " + validOrder[i];
        } else {
            sortText.innerText += validOrder[i]
        }
    }
}

var checkValidOrder = () => {
    var pass = true;
    var currentOrder = containers[1].getElementsByTagName('img');
    if (currentOrder.length == validOrder.length) {
        for(i = 0; i < currentOrder.length; i++) {
            if (currentOrder[i].alt != validOrder[i]) {
                pass = false;
            }
        }
        if (pass) {
            sortText.innerText = "Success!"
        }
    }
}

var dragStart = function(e) {
    console.log('source: dragstart');

    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.effectAllowed = 'move';
    sourceContainerId = this.parentElement.id;
    refreshOrder();
};

var cancel = function(e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    return false;
};

var dragEnd = function(e) {
    console.log('source: dragend');
    refreshOrder();
    checkValidOrder();
};
    
var drag = function(e) {
    console.log('source: drag');
};

var dropped = function(e) {
    var id;
    console.log('target: drop');
    if (this.id !== sourceContainerId) {
        cancel(e);
        try {
            id = e.dataTransfer.getData('text/plain');
        } catch (ex) {
            id = e.dataTransfer.getData('Text');
        }
        e.target.appendChild(document.querySelector('#' + id));
    }
};

var dragEnter = function(e) {
    refreshOrder();
    cancel(e);
    console.log('target: dragenter');
};

var dragOver = function(e) {
    refreshOrder();
    cancel(e);
    console.log('target: dragover');
};
    
var dragLeave = function(e) {
    console.log('target: dragleave');
};
    
var targets = document.querySelectorAll('[data-role="drag-drop-target"]');

targets.forEach(target =>  {
    target.addEventListener('drop', dropped, false);
    target.addEventListener('dragenter', dragEnter, false);
    target.addEventListener('dragover', dragOver, false);
    target.addEventListener('dragleave', dragLeave, false);
});

var sources = document.querySelectorAll('[draggable="true"]');

sources.forEach(source => {
    source.addEventListener('dragstart', dragStart, false);
    source.addEventListener('drag', drag, false);
    source.addEventListener('dragend', dragEnd, false);
});

randomizeImgs();
createValidOrder();
randomizeImgs();
refreshOrder();

document.getElementById('reset-button').onclick = () => {
    var imgs = containers[1].getElementsByTagName('img');
    var len = imgs.length;
    if (imgs.length > 0) {
        for (i = 0; i < len; i++) {
            containers[0].append(imgs[0]);
        }
    }
    randomizeImgs();
    createValidOrder();
    randomizeImgs();
    refreshOrder();
};

function getRandomInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var myModule = (() => {

    const dragEnter = (e) => {

    };

    const dragEnd = (e) => {

    }

    const theBestFunction = () => {
        console.log('lol');
    }

    return {
        dragEnter: dragEnter,
        dragEnd: dragEnd,
        theBestFunction: theBestFunction
    }
})();