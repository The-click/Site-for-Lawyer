// Slide details practice

const detailsPractice = document.querySelectorAll('.practice__details');
const burgerMenu = document.querySelector('.header__burger');
const headerMenuBlock = document.querySelector('.header__subabout');

function tooglePractice(item) {
    console.log(item);
    if (!item.open) return;
    detailsPractice.forEach(i => {
        if (i.open && i !== item) {
            i.open = false;
        }
    })
}

function toggleBurger() {
    burgerMenu.classList.toggle('active');
    headerMenuBlock.classList.toggle('active');

}


detailsPractice.forEach(i => i.addEventListener('toggle', (e) => tooglePractice(i)))
burgerMenu.addEventListener('click', toggleBurger)