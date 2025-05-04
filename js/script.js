document.addEventListener('DOMContentLoaded', () => {
    const quiz = document.querySelector('#quiz');
    const textBlock = document.querySelector('#text-block');
    const questions = document.querySelectorAll('.question__item');
    const answers = document.querySelectorAll('.js-answer');
    const preloader = document.querySelector('#preloader');
    const results = document.querySelectorAll('.result');
    const chooseBlock = document.querySelector('#choose');
    const modal1 = document.querySelector('#modal1');
    const modal2 = document.querySelector('#modal2');
    const modal3 = document.querySelector('#modal3');
    const iterationSpan = document.querySelector('#iteration');
    const chooseItems = document.querySelectorAll('.choose__item');
    const lender = document.querySelector('main.lender');
    const prefil = document.querySelector('main.prefil');
    const overlay = document.createElement('div');
    document.body.appendChild(overlay);
    overlay.classList.add('overlay-hidden');


    let currentQuestionIndex = 0;
    let attemptsLeft = 3;
    let isBoxOpened = false;

    questions[currentQuestionIndex].classList.add('active');


    answers.forEach((answer) => {
        answer.addEventListener('click', (event) => {
            event.preventDefault();

            const nextQuestionId = answer.dataset.next;
            const currentQuestion = questions[currentQuestionIndex];

            currentQuestion.classList.remove('active');
            setTimeout(() => {
                currentQuestion.style.display = 'none';

                if (nextQuestionId !== 'end') {
                    const nextQuestion = document.querySelector(`#${nextQuestionId}`);
                    if (nextQuestion) {
                        nextQuestion.style.display = 'block';
                        setTimeout(() => nextQuestion.classList.add('active'), 10);
                        currentQuestionIndex++;
                    }
                }

                if (nextQuestionId === 'end') {
                    quiz.style.display = 'none';
                    textBlock.style.display = 'none';
                    preloader.style.display = 'block';

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });

                    setTimeout(() => {
                        document
                            .querySelector('.circle-loader')
                            .classList.add('load-complete');
                        setTimeout(() => {
                            document.querySelector('.check-icon').style.display = 'block';
                        }, 4000);
                    }, 4000);

                    const delay = 1000;
                    results.forEach((result, index) => {
                        setTimeout(() => {
                            result.style.display = 'block';
                            setTimeout(() => {
                                result.style.opacity = '1';
                            }, 10);
                        }, delay * (index + 1));
                    });

                    setTimeout(() => {
                        preloader.style.display = 'none';
                        chooseBlock.style.display = 'block';
                        setTimeout(() => {
                            chooseBlock.style.opacity = '1';
                        }, 100);
                    }, delay * (results.length + 1));

                    setTimeout(() => {
                        showModalWithAnimation(modal1);
                    }, delay * (results.length + 2));
                }
            }, 500);
        });
    });

    chooseItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();

            if (isBoxOpened) return;
            isBoxOpened = true;

            if (attemptsLeft > 0) {
                attemptsLeft--;
                iterationSpan.textContent = attemptsLeft;

                const tapa = item.querySelector('.choose_tapa');
                tapa.classList.add('opened');

                if (attemptsLeft === 1) {
                    const gift = item.querySelector('.choose_gift');
                    setTimeout(() => {
                        gift.classList.add('show-gift');
                        setTimeout(() => {
                            gift.classList.add('lift-up');
                            setTimeout(() => {
                                showModalWithAnimation(modal3);
                                startConfetti();
                            }, 1000);
                        }, 500);
                    }, 500);
                } else {
                    setTimeout(() => {
                        showModalWithAnimation(modal2);
                    }, 1000);
                }
            }
        });
    });

    function showModalWithAnimation(modal) {
        overlay.classList.remove('overlay-hidden');
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('fade', 'show');
            document.body.classList.add('modal-open');
        }, 10);
    }

    const modalButton1 = document.querySelector('#modal-button1');
    const modalButton2 = document.querySelector('#modal-button2');
    const modalButton3 = document.querySelector('#modal-button3');


    //=====confetti========
    let confettiCanvas = document.getElementById('confetti-canvas');

    let confettiInstance = confetti.create(confettiCanvas, {resize: true});

    function startConfetti() {
        confettiInstance({
            particleCount: 200,
            spread: 90,
            origin: {y: 0.4},
        });
    }

    //=====confetti========
    modalButton1.addEventListener('click', () => {
        modal1.style.display = 'none';
        modal1.classList.remove('fade', 'show');
        document.body.classList.remove('modal-open');
        overlay.classList.add('overlay-hidden');
        isBoxOpened = false;
    });

    modalButton2.addEventListener('click', () => {
        modal2.style.display = 'none';
        modal2.classList.remove('fade', 'show');
        document.body.classList.remove('modal-open');
        overlay.classList.add('overlay-hidden');
        isBoxOpened = false;
    });


    modalButton3.addEventListener('click', () => {
        modal3.style.display = 'none';
        modal3.classList.remove('fade', 'show');
        document.body.classList.remove('modal-open');
        overlay.classList.add('overlay-hidden');
        isBoxOpened = false;

        if (lender && prefil) {
            lender.classList.add('fade-out');
            lender.classList.remove('fade');
            setTimeout(() => {
                lender.style.display = 'none';

                hasPassedToPrefil = true;
                localStorage.setItem('hasPassedToPrefil', 'true');
                prefil.classList.add('fade-in');
                prefil.classList.remove('fade');
                prefil.style.display = 'block';
            }, 500);
        }
    });





    //=====flag_and_country_code========
    getCountryDataAndSet();


    async function getCountryDataAndSet() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();

            const countryCode = data.country_code.toUpperCase();       // пример: "FR"
            const phoneCode = data.country_calling_code;               // пример: "+33"
            const flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;

            const codeSpan = document.querySelector('.country-input__value');
            const flagImg = document.querySelector('.flag_holder');


            if (codeSpan) codeSpan.textContent = phoneCode;
            if (flagImg) flagImg.src = flagUrl;
        } catch (e) {
            console.error("Не удалось загрузить страну:", e);
            const codeSpan = document.querySelector('.country-input__value');
            const flagImg = document.querySelector('.flag_holder');

            if (codeSpan) codeSpan.textContent = '+XX';
            if (flagImg) flagImg.src = '../img/back.svg';
        }
    }

    //=====flag_and_country_code========
});






