// Slide details practice

const detailsPractice = document.querySelectorAll('.practice__details');

function tooglePractice(item) {
    console.log(item);
    if (!item.open) return;
    detailsPractice.forEach(i => {
        if (i.open && i !== item) {
            i.open = false;
        }
    })
}
detailsPractice.forEach(i => i.addEventListener('toggle', (e) => tooglePractice(i)))