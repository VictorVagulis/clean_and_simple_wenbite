const modalWrapper = document.querySelector('.modalWindowWrapper');
const modal = document.querySelector('.modal');
const headerModalBtn = document.querySelector('.headerBtn');
const footerModalBtn = document.querySelectorAll('.btn');
const close = document.querySelector('.close');
const body = document.querySelector('body');

    headerModalBtn.onclick = function () {
        modal.style.display = 'block';
        body.style.overflowY = 'hidden';

        if (modal.style.display === 'block') {
            modalWrapper.onclick = function () {
                modal.style.display = 'none';
                body.style.overflowY = 'scroll';
            };
        }

    };

    close.onclick = function () {
        modal.style.display = 'none';
        body.style.overflowY = 'scroll';
    };

    footerModalBtn.forEach(item => {
        item.addEventListener('click', () => {
            modal.style.display = 'block';
            body.style.overflowY = 'hidden';
        });
    });
