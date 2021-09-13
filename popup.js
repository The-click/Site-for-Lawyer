const popupLink = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLink.length > 0) {
    popupLink.forEach(i => i.addEventListener('click', e => {
        const popupName = i.getAttribute('data-popupName');
        openPopup(document.querySelector('#' + popupName))

    }));

}

const closePopupIcon = document.querySelectorAll('.close-popup');
if (closePopupIcon.length > 0) {
    closePopupIcon.forEach(i => {
        i.addEventListener('click', () => closePopup(i.closest('.popup')));

    })
}

function openPopup(popup) {
    if (popup && unlock) {
        const popupActive = document.querySelector('.popup.active');
        if (popupActive) {
            closePopup(popupActive, false);
        } else {
            bodyLock()
        }
        popup.classList.add('open');
        popup.addEventListener('click', e => {
            if (!e.target.closest('.popup__content')) {
                closePopup(e.target.closest('.popup'));
            }
        })
    }
}

function closePopup(popup, doUnlock = true) {
    if (unlock) {
        popup.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }


}

function bodyLock() {
    let lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            lockPadding[i].style.padddingRight = lockPaddingValue;

        }
    }
    body.classList.add('lock');

    body.style.marginRight = lockPaddingValue;

    unlock = false;
    setTimeout(() => {
            unlock = true;
        },
        timeout)
}

function bodyUnLock() {
    setTimeout(() => {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                lockPadding[i].style.padddingRight = '0';

            }
        }
        body.style.marginRight = '0';
        body.classList.remove('lock');

    }, timeout)
    unlock = false;
    setTimeout(() => {
            unlock = true;
        },
        timeout)

}