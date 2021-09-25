// Slide details practice
"use strict"

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


// load page Pseudo Lazy effects
window.onload = () => {
    document.querySelectorAll('.load-page').forEach(i => i.classList.remove('load-page'))
};


// Phone mask 
document.addEventListener("DOMContentLoaded", function() {
    var phoneInputs = document.querySelectorAll('input[data-tel-input]');

    var getInputNumbersValue = function(input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function(e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function(e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function(e) {
        // Clear input after remove last symbol
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
})

// Send Form
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form[data-form-send]');
    forms.forEach(i => i.addEventListener('submit', (e) => formSend(e, i)));

    async function formSend(e, form) {
        e.preventDefault();

        let formData = new FormData(form);
        form.classList.add('_sending')
        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        })
        if (response.ok) {
            let result = await response.json();
            alert(result.message);
            form.reset();
            form.classList.remove('_sending')


        } else {
            alert('Ошибка');
        }



    }

})


// Slider function


window.onload = function() {
    // load page Pseudo Lazy effects
    document.querySelectorAll('.load-page').forEach(i => i.classList.remove('load-page'))
        // console.log(document.querySelector('#popup-civil .popup-serv__wrap'));
    function Slider(obj) {
        this.slides = obj.querySelectorAll('.popup-serv__block');
        this.paginations = obj.querySelectorAll('.serv__slide_pag');
        let blockonSlide = Math.floor(((this.slides).length + 1) / 2);
        if (document.querySelector('body').clientWidth <= 500) {
            blockonSlide = this.slides.length;
        } else {
            this.paginations.forEach((item, index) => {

                if (index >= blockonSlide) item.classList.add('hide');
            })
        };
        this.countSlide = blockonSlide;
        let currentSlide = 0;
        this.paginations[currentSlide].classList.add('check');
        this.btnNext = obj.querySelector('.popup-serv__block_btn.go');
        this.btnPrev = obj.querySelector('.popup-serv__block_btn.back');

        this.next = function() {
            currentSlide = +(currentSlide) + 1;
            if (currentSlide >= this.countSlide) currentSlide = 0;
            this.changeSlide.call(this);
        };
        this.prev = function(e) {
            currentSlide -= 1;
            if (currentSlide < 0) currentSlide = this.countSlide - 1;
            this.changeSlide.call(this);
        }
        this.changeSlide = function() {
            this.widthOneSlide = this.slides[0].getBoundingClientRect().width;
            let distPage = 5;
            if (blockonSlide !== this.slides.length) {
                this.widthOneSlide *= 2;
                distPage *= 2;
            };
            obj.querySelector('.check').classList.remove('check');
            this.paginations[currentSlide].classList.add('check');
            this.slides[0].style.marginLeft = `-${(currentSlide * this.widthOneSlide) + (currentSlide * distPage)}px`;
        }
        this.handlerChangeSlide = function(index) {
            currentSlide = index;
            this.changeSlide.call(this);


        }


        this.paginations.forEach((item, index) => item.addEventListener('click', this.handlerChangeSlide.bind(this, index)))
        this.btnNext.addEventListener('click', this.next.bind(this));
        this.btnPrev.addEventListener('click', this.prev.bind(this));


    }

    new Slider(document.querySelector('#popup-civil .popup-serv__wrap'));

}