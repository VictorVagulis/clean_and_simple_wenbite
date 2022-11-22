const modal = document.querySelector('.modalWindowWrapper');
const modalBtn = document.querySelector('.headerBtn');
const modalBtn2 = document.querySelector('.btn');
const close = document.querySelector('.close');
const body = document.querySelector('body');

    modalBtn.onclick = function () {
        modal.style.display = 'block';
        body.style.overflowY = 'hidden';
    };
    modalBtn2.onclick = function () {
        modal.style.display = 'block';
        body.style.overflowY = 'hidden';
    };

    close.onclick = function () {
        modal.style.display = 'none';
        body.style.overflowY = 'scroll';
    };