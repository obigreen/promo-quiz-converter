var changeImgFlag = false;

/* ===== block_js ===== */
function updateHiddenFieldValue(fieldName, newValue) {
    const field = document.querySelector(`input[name="${fieldName}"]`);
    if (field) {
        field.setAttribute('value', newValue);
        return true;
    } else {
        console.warn(`Поле с именем "${fieldName}" не найдено.`);
        return false;
    }
}

function getMyDate(days) {
    var today = new Date();
    var searchingDate = new Date(today.getTime() + days * (24 * 60 * 60 * 1000));
    return {
        weekDay: searchingDate.getDay(),
        day: searchingDate.getDate(),
        month: searchingDate.getMonth(),
        year: searchingDate.getFullYear()
    };
}

function calculateDate(daysOffset) {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date;
}


// 12.01.2024
// 01.12.2024
function formatDateDMY(date) {
    const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
    return new Intl.DateTimeFormat('default', options).format(date);
}

// 1 January 2024
// January 1 2024
function formatDateDMYLong(date) {
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    return new Intl.DateTimeFormat('default', options).format(date);
}

// 1 January 
// January 1 
function formatDateDMLong(date) {
    const options = {day: 'numeric', month: 'long'};
    return new Intl.DateTimeFormat('default', options).format(date);
}

// 1 Jan 2024
// Jan 1 2024
function formatDateDMYShort(date) {
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    return new Intl.DateTimeFormat('default', options).format(date);
}

// January 1, 2024
// 1 January, 2024
function formatDateMDYLong(date) {
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    return new Intl.DateTimeFormat('default', options).format(date);
}

// 2024-01-01
function formatDateYMD(date) {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return new Intl.DateTimeFormat('default', options).format(date);
}

// Monday, 1 January 2024
function formatDateWithFullWeekday(selectedDate) {
    const date = new Date(selectedDate);
    const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
    return new Intl.DateTimeFormat('default', options).format(date);
}

// Mon, 1 Jan 2024
function formatDateWithShortWeekday(selectedDate) {
    const date = new Date(selectedDate);
    const options = {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'};
    return new Intl.DateTimeFormat('default', options).format(date);
}

// Monday, January 1, 2024
function formatDateMDYWithFullWeekday(selectedDate) {
    const date = new Date(selectedDate);
    const options = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
    return new Intl.DateTimeFormat('default', options).format(date);
}

// Mon, Jan 1, 2024
function formatDateMDYWithShortWeekday(selectedDate) {
    const date = new Date(selectedDate);
    const options = {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'};
    return new Intl.DateTimeFormat('default', options).format(date);
}

// Monday, 1 January
function formatDateDayMonthWithFullWeekday(selectedDate) {
    const date = new Date(selectedDate);
    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    return new Intl.DateTimeFormat('default', options).format(date);
}

// Monday
function formatDateFullWeekday(selectedDate) {
    const date = new Date(selectedDate);
    const options = {weekday: 'long'};
    return new Intl.DateTimeFormat('default', options).format(date);
}

// Mon, 1 Jan
function formatDateDayMonthWithShortWeekday(selectedDate) {
    const date = new Date(selectedDate);
    const options = {weekday: 'short', day: 'numeric', month: 'short'};
    return new Intl.DateTimeFormat('default', options).format(date);
}


//Jan 1, 2:00 PM
function formatDateTimeIntl(selectedDate, selectedHour) {
    const date = new Date(selectedDate);
    date.setHours(selectedHour);
    date.setMinutes(0);

    const options = {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    return new Intl.DateTimeFormat('default', options).format(date);
}

/* ===== block_js ===== */
let step = 0;

function prevStep() {
    step--;
    // toggleMenuButtons()
    hideStep(step + 1)
    showStep(step)

}


function flow(el) {
    let comments = document.getElementById('comments');
    let securitycheck = document.getElementById('securitycheck');
    const FAST = 0.3;

    switch (Number(step)) {
        case 0: {
            showElement(comments);
            showElement(securitycheck);
            setTimeout(() => {
                const header = document.querySelector('.header_9');
                const offset = header ? header.offsetHeight + 20 : 80;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }, 300);
            break;
        }
        case 1: {
            hideLastStep(FAST);
            setTimeout(() => {
                showCurrentStep(FAST);
                startQuiz();
            }, FAST * 1000);
            hideElement(comments);
            hideElement(securitycheck);
            break;
        }
        case 2: {
            hideLastStep(FAST);
            setTimeout(() => {
                showCurrentStep(FAST);
                startLoader();
            }, FAST * 1000);
            hideElement(comments);
            hideElement(securitycheck);
            break;
        }
        case 5: {
            hideStep(2, FAST);
            setTimeout(() => {
                showCurrentStep(FAST);
                const thankyouBlock = document.querySelector('.thankyou-main');
                if (thankyouBlock) {
                    setTimeout(() => {
                        const blockTop = thankyouBlock.getBoundingClientRect().top + window.pageYOffset;
                        const offset = 120;
                        window.scrollTo({
                            top: blockTop - offset,
                            behavior: 'smooth'
                        });
                    }, FAST * 1000 + 300);
                }
            }, FAST * 1000);

            setTimeout(() => {
                showElement(comments);
                showElement(securitycheck);
            }, FAST * 1000 + 100);
            break;
        }
        case 6: {
            openUrl(el);
            break;
        }
        default: {
            hideLastStep(FAST);
            setTimeout(() => {
                showCurrentStep(FAST);
            }, FAST * 1000);
            break;
        }
    }
}


/* ===== block_js ===== */
async function openUrl(el) {
    step--;
    saveStepToLocalStorage(step);
    waitOn(el);

    if (typeof offerUrl === 'string') {
        offerUrl = new URL(offerUrl, window.location.origin);
    }

    //-----------
    if (changeImgFlag) {
        productImageSrc = document.querySelector('.product-item-image').src;
        try {
            productImageSrc = await getShortImageSrc() || productImageSrc;
            offerUrl.searchParams.set('sub_id_15', productImageSrc);
        } catch (e) {
            //
        }
    }
    //-----------
    window.location.href = offerUrl.toString();
}

function waitOn(el) {
    let text = translation.text_wait || "Wait";
    let pointCount = 0;
    var i = setInterval(function () {
        var newText = text;
        for (let i = 0; i <= pointCount; i++) {
            newText += ".";
        }
        el.innerText = newText;
        pointCount++;
        if (pointCount > 3) {
            pointCount = 0;
        }
    }, 200);
}


/*

    В этой части расписывается вся логика показа экранов
    В index.html можно увидеть, что у блоков есть id="stepN"
    Ниже так же объявленна переменная step
    Это база для показа блоков
    В блоках уже зашиты функции nextStep() на кнопках, так что в них лезть нет необходимости,
    весь порядок и логика меняется здесь
    На последнем шаге обычно должно быть openUrl()

    Для изменения порядка меняются id в index.html и/или изменяется функция nextStep() 
    Если вся логика достаточно простая, то шаги можно не расписывать
    и оставить просто дефолт (скрыли последний шаг, показали новый)
    Если логика сложнее можно прописать кастомную логику в функции nextStep()
    Например на 1м шаге мы показываем квиз, он все еще в рамках первого экрана,
    поэтому мы ничего не скрываем, а на 2 шаге (после прохождения квиза) скрываем уже весь блок степ0 

    В блоках могут быть свои логики показа и запуска процессов (надо дорабоать, что бы они запускались сами)
    Например showQuiz(), startOrderFrameProcesses() (для получения флага и кода телефона)

    Для показа блоков, которые не привязаны конкретно к логие одного шага (например comments)
    мы добавляем их в индекс без айди и выносим из блоков с айди
    Для их отображения и скрытия просто используем функции
    showElementWithAnim, hideElementWithAnim()

*/
function nextStep(el) {
    if (!el || !el.classList.contains("clicked")) {
        step++;
        saveStepToLocalStorage(step);
        console.log(step);
        try {
            el.disabled = true;
        } catch (e) {
        }
        try {
            el.classList.add("clicked");
        } catch (e) {
        }
        flow(el);
    }
}


//скрывает последний шаг (переменная step)
function hideLastStep(animTimeInSec = 1) {
    hideStep(step - 1, animTimeInSec)
}

//Показывает текущий шаг (переменная step)
function showCurrentStep(animTimeInSec = 1) {
    showStep(step, animTimeInSec);
}

// Показывает конкретный шаг
function showStep(stepNumber, animTimeInSec = 1) {
    let stepDiv = document.getElementById('step' + stepNumber)
    showElement(stepDiv);
    startFadeInAnim(stepDiv, animTimeInSec)

}

// Скрывает конкретный шаг
function hideStep(stepNumber, animTimeInSec = 1) {
    let stepDiv = document.getElementById('step' + stepNumber)
    startFadeOutAnim(stepDiv, animTimeInSec)
    setTimeout(() => {
        hideElement(stepDiv);
    }, animTimeInSec * 1000)

}

function showModal(el, animTimeInSec = 1) {
    showElement(el);
    startScalerAnim(el.firstElementChild, animTimeInSec);
    lockScroll();
}


function startScalerAnim(el, animTimeInSec = 1) {
    el.style.animation = 'scaler ' + animTimeInSec + 's ease-in-out forwards';
    el.addEventListener('animationend', function handleAnimationEnd() {
        el.style.animation = '';
        el.removeEventListener('animationend', handleAnimationEnd);
    });
}

// Используем requestAnimationFrame для лучшей производительности на мобильных устройствах
function startAnimationWithRAF(el, animTimeInSec) {
    requestAnimationFrame(() => startScalerAnim(el, animTimeInSec));
}


function startFadeInAnim(el, animTimeInSec = 1) {
    if (el) {
        el.style.animation = 'fadeIn ' + animTimeInSec + 's ease-in-out';
    }
}

function startFadeOutAnim(el, animTimeInSec = 1) {
    if (el) {
        el.style.animation = 'fadeOut ' + animTimeInSec + 's ease-in-out';
    }
}

function hideElement(el) {
    if (el) {
        el.classList.add('hidden');
    }
    // el.style.animation = ''
}

function showElement(el) {
    if (el) {
        el.classList.remove('hidden');
    }
    // el.style.animation = ''
}

function hideElementWithAnim(el, animTimeInSec = 1) {
    if (el) {
        startFadeOutAnim(el, animTimeInSec);
        setTimeout(() => {
            hideElement(el);
        }, (animTimeInSec * 1000) - 100)
    }
}

function showElementWithAnim(el, animTimeInSec = 1) {
    if (el) {
        setTimeout(() => {
            showElement(el);
            startFadeInAnim(el, animTimeInSec);
        }, animTimeInSec * 1000)
    }
}


function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Плавная прокрутка
    });
}

function scrollToElementTop(element, offset = 0) {
    if (element) {
        if (offset != 0) {
            scrollToElementTopWithOffset(element, offset);
        } else {
            element.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    }
}

function scrollToElementTopWithOffset(element, offset = 0) {
    if (element) {
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({top: elementTop - offset, behavior: 'smooth'});
    }
}

function scrollToElementBottom(element) {
    if (element) {
        const rect = element.getBoundingClientRect();
        const elementBottom = rect.bottom + window.scrollY;
        const viewportHeight = window.innerHeight;

        // Проверка, видна ли нижняя граница элемента
        if (rect.bottom > viewportHeight) {
            window.scrollTo({top: elementBottom - viewportHeight, behavior: 'smooth'});
        }
    }
}

function isElementVisible(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    // Проверяем видимость по вертикали и горизонтали с учетом оффсета
    const verticallyVisible =
        rect.top >= offset && rect.bottom <= windowHeight - offset;
    const horizontallyVisible =
        rect.left >= offset && rect.right <= windowWidth - offset;

    return verticallyVisible && horizontallyVisible;
}

// Функция для отслеживания изменения стиля display элемента
function observeDisplayChange(element, callback) {
    if (!element || typeof callback !== 'function') return;

    const isVisible = (el) => {
        const cs = getComputedStyle(el);
        return cs.display !== 'none' && cs.visibility !== 'hidden' && el.offsetParent !== null;
    };

    let wasVisible = isVisible(element);
    const run = () => {
        const nowVisible = isVisible(element);
        if (nowVisible && !wasVisible) {
            callback();
        }
        wasVisible = nowVisible;
    };

    const observer = new MutationObserver(run);
    observer.observe(element, {attributes: true, attributeFilter: ['class', 'style']});
    let parent = element.parentElement;
    while (parent) {
        try {
            observer.observe(parent, {attributes: true, attributeFilter: ['class', 'style']});
        } catch (e) {
        }
        parent = parent.parentElement;
    }
    if (wasVisible) callback();
}


/*

Для запуска каких-либо скриптов которые должны запускаться при показывании элемента,
используем эту функцию, где первый параметр - элемент, чье отображение мы отслеживаем
второй - функция, которая запустится (например старт таймера)

observeDisplayChange(element, callback);

Пример:

//Получили родительский контейнер самого верхнего дива (потому что там степ, который скрывается и отображается)
const congratulationsContainer = document.querySelector('.show').parentElement;
 
//Передали элемент, передали функцию старта таймера
observeDisplayChange(congratulationsContainer, startCongrCountDown);

*/


let flagImgUrl = ''
let countryCallingCode = ''


async function getCountryVariables() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code.toUpperCase();
        countryCallingCode = data.country_calling_code;
        flagImgUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
    } catch (e) {
        flagImgUrl = '../img/back.svg'
    }
}

async function setFlagImage() {
    if (flagImgUrl == '' || countryCallingCode == '') {
        await getCountryVariables();
    }

    let flags = document.querySelectorAll(".flag_holder")
    flags.forEach(function (el) {
        el.src = flagImgUrl;
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);  // Округляем минимальное значение вверх
    max = Math.floor(max); // Округляем максимальное значение вниз
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function lockScroll() {
    document.body.style.overflow = 'hidden'
}

function unlockScroll() {
    document.body.style.overflow = 'auto'
}


function toggleScroll() {
    if (document.body.style.overflow == 'hidden') {
        unlockScroll()
    } else {
        lockScroll()
    }
}


function saveStepToLocalStorage(step) {
    saveToLocalStorage('currentStep', step);
    // localStorage.setItem('currentStep', step);
}

function saveToLocalStorage(param, value) {
    localStorage.setItem(lId + '_' + cId + '_' + param, value);
}

function getFromLocalStorage(param) {
    return localStorage.getItem(lId + '_' + cId + '_' + param);
}


function loadStepFromLocalStorage() {
    // const savedStep = localStorage.getItem('currentStep');
    if (!save) {
        localStorage.clear();
        return;
    }
    const savedStep = getFromLocalStorage('currentStep');
    if (savedStep) {
        // Здесь нужно реализовать логику, которая отображает нужный шаг
        step = Number(savedStep);
        if (step > 0) {
            document.getElementById('step0').classList.add('hidden');
        }
        // flow();
    } else {
        // flow();
    }
}

// Вызвать эту функцию при загрузке страницы
window.onload = flow;
document.addEventListener('DOMContentLoaded', function () {
    loadStepFromLocalStorage();
});
window.onload = loadStepFromLocalStorage;

// function backToZeroStep(){
//     saveStepToLocalStorage(0);
//     window.location.reload();
// }


//Замена картинок в случае выбора друго цвета
function changeProductItem(imageSrc, attr) {
    const itemPlaceholders = document.querySelectorAll('.product-item-image');
    //-----------
    changeImgFlag = true
    //-----------


    itemPlaceholders.forEach((el) => {
        el.src = imageSrc;
        el.setAttribute('onerror', attr);
    })
}


function getCSSVariables() {
    const stylesheets = document.styleSheets; // Получаем все стили
    const cssVariables = {};

    for (const sheet of stylesheets) {
        try {
            if (!sheet.cssRules) continue; // Защита от CORS ошибок

            for (const rule of sheet.cssRules) {
                if (rule.selectorText === ':root') { // Ищем правило :root
                    const style = rule.style;

                    for (let i = 0; i < style.length; i++) {
                        const property = style[i];
                        if (property.startsWith('--')) {
                            cssVariables[property] = style.getPropertyValue(property).trim();
                        }
                    }
                }
            }
        } catch (error) {
            console.warn('Не удалось прочитать стили из файла:', error);
        }
    }
    return cssVariables;
}

const variables = getCSSVariables();

//   console.log(variables);

function waitForTranslation() {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (typeof translation !== "undefined" && translation !== null) {
                clearInterval(interval);
                resolve();
            }
        }, 50);
    });
}


/* ===== block_js ===== */

const defaultLang = "en";
const defaultCurrency = "$"
const defaultProductName = "defaultproduct"
const rtlLangs = ["ar", "he", "fa", "ur", "ps", "sd", "ckb", "mt"]
var translation;


async function loadLangData(lang) {
    if (productName == "{sub_id_28}" || productName?.length < 1) {
        productName = defaultProductName
    }
    try {
        const response = await fetch(`${productName}/translate/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Language file not found: ${lang}`);
        }
        return await response.json();
    } catch (error) {
        langCode = defaultLang;
        return await loadLangData(defaultLang);
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    if (langCode == "{language}") {
        langCode = getLangCode();
    }

    translation = await loadLangData(langCode.toLowerCase());
    if (rtlLangs.includes(langCode.toLowerCase())) {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
    try {
        let date = getMyDate(0)
        translation.date = translation.date
            .replace('${dayTomorrow}', date.day)
            .replace('${monthArray[monthTomorrow]}', date.month + 1)
            .replace('${yearTomorrow}', date.year);

        document.querySelector('.date').innerHTML = translation.date;
    } catch (e) {
    }


    await applyTranslations(translation);
    const userLocale = navigator.language;
    setDates(userLocale);
    document.getElementById("splash").style.display = 'none';
    unlockScroll();
    flow();

});

function getLangCode() {
    let languageCode = (navigator.language || navigator.userLanguage);
    let languageCodeShort = languageCode.substring(0, 2);
    return languageCodeShort;
}

async function getCountry() {
    if (countryCurrent === "{country}") {
        try {
            const response = await fetch('https://ipinfo.io/json');
            const data = await response.json();
            countryCurrent = data.country;
            return countryCurrent;
        } catch (error) {
            //   console.error('Error fetching country code:', error);
            return "US"
        }
    } else {
        return countryCurrent;
    }
}


async function loadCurrencies() {
    try {
        const response = await fetch(`js/currency.json`);
        if (!response.ok) {
            throw new Error(`Language file not found: ${lang}`);
        }
        return await response.json();
    } catch (error) {

    }
}


function getCurrencySymbol(currencies, country) {
    try {
        let symbol = currencies[country]
        if (symbol == undefined) {
            symbol = defaultCurrency
        }
        return symbol
    } catch (e) {
        return defaultCurrency;
    }
}

// Функция для создания регулярного выражения для символов валют
function createCurrencyRegex(currencies) {
    const symbols = Object.values(currencies).map(symbol => {
        // Экранируем символы, которые могут иметь специальное значение в регулярных выражениях
        return symbol.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    });
    const boundaryCharacters = '\\s\\d.,!?¿¡:;\'"\\-(){}\\[\\]';
    return new RegExp(`(?<=\\s|^|\\d|[.,!?¿¡:;"\\-(){}\\[\\]])(${symbols.join('|')})(?=\\s|\\d|$|[.,!?¿¡:;"\\-(){}\\[\\]])`, 'g');
}

async function setPlaceholders(translate) {
    const filteredKeys = Object.keys(translate).filter(key => key.startsWith('text_placeholder_'));
    filteredKeys.forEach(function (className) {
        let value = translate[className]
        let elements = document.querySelectorAll('.' + className)
        elements.forEach(function (el) {
            el.placeholder = value
        })
    })
}

async function applyTranslations(translate) {
    setPlaceholders(translate);
    let currencies = await loadCurrencies()
    let country = await getCountry()
    let symbol = getCurrencySymbol(currencies, country)
    let currencyRegex = createCurrencyRegex(currencies)
    pricenew = pricenew.replaceAll(currencyRegex, symbol)
    priceold = priceold.replaceAll(currencyRegex, symbol)

    Object.keys(translate).forEach(key => {
        const elements = document.querySelectorAll(`.${key}`);
        elements.forEach(element => {
            let text = translate[key]
                .replaceAll("{_cc_country}", cc_country)
                .replaceAll("{_pricenew}", pricenew)
                .replaceAll("{_priceold}", priceold)
                .replaceAll("{_name1}", name1)
                .replaceAll("{_name2}", name2)
                .replaceAll("{_name3}", name3)
                .replaceAll("{_name4}", name4)
                .replaceAll("{_name5}", name5)
                .replaceAll("{_name6}", name6)
                .replaceAll("{_name7}", name7)
                .replaceAll("{_name8}", name8)
                .replaceAll("{_name9}", name9)
                .replaceAll("{_supportname}", supportName)
                .replaceAll("{_product}", product)
                .replaceAll("{_offertitle}", offerTitle)
                .replaceAll(currencyRegex, symbol)


            element.innerHTML = text;
        });
    })
}

function setDates(locale = 'default') {
    const elements = document.querySelectorAll('[class*="text_date_"]');

    const formatters = {
        DMY: new Intl.DateTimeFormat(locale, {day: '2-digit', month: '2-digit', year: 'numeric'}),
        DMYLong: new Intl.DateTimeFormat(locale, {day: 'numeric', month: 'long', year: 'numeric'}),
        DMYShort: new Intl.DateTimeFormat(locale, {day: 'numeric', month: 'short', year: 'numeric'}),
        MDYLong: new Intl.DateTimeFormat(locale, {day: 'numeric', month: 'long', year: 'numeric'}),
        YMD: new Intl.DateTimeFormat(locale, {year: 'numeric', month: '2-digit', day: '2-digit'}),
        FullWeekdayDMY: new Intl.DateTimeFormat(locale, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }),
        ShortWeekdayDMY: new Intl.DateTimeFormat(locale, {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }),
        FullWeekdayMDY: new Intl.DateTimeFormat(locale, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }),
        ShortWeekdayMDY: new Intl.DateTimeFormat(locale, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }),
        FullWeekdayDayMonth: new Intl.DateTimeFormat(locale, {weekday: 'long', day: 'numeric', month: 'long'}),
        ShortWeekdayDayMonth: new Intl.DateTimeFormat(locale, {weekday: 'short', day: 'numeric', month: 'short'}),
        DMLong: new Intl.DateTimeFormat(locale, {day: 'numeric', month: 'long'}),
        FullWeekday: new Intl.DateTimeFormat(locale, {weekday: 'long'}),
    };

    elements.forEach(element => {
        const classNames = Array.from(element.classList);
        classNames.forEach(className => {
            if (className.startsWith('text_date_')) {
                const [base, modifier] = className.substring(10).split('_');
                let daysOffset = 0;

                if (modifier) {
                    const direction = modifier.charAt(0);
                    const amount = parseInt(modifier.substring(1), 10);

                    if (direction === 'm') {
                        daysOffset = -amount;
                    } else if (direction === 'p') {
                        daysOffset = amount;
                    }
                }

                const targetDate = calculateDate(daysOffset);

                if (formatters[base]) {
                    const formattedDate = formatters[base].format(targetDate);
                    element.textContent = formattedDate;
                } else {
                    console.warn(`Unknown date format: ${base}`);
                }
            }
        });
    });
}

function setImages() {
    const images = document.querySelectorAll('img[data-default]');

    images.forEach(img => {
        const defaultSrc = img.getAttribute('data-default');
        const originalSrc = img.src;

        checkImage(originalSrc, function (exists) {
            if (!exists) {
                img.src = defaultSrc;
            }
        });
    });
}

function checkImage(src, callback) {
    const img = new Image();
    img.onload = function () {
        callback(true);
    };
    img.onerror = function () {
        callback(false);
    };
    img.src = src;
}

function filterDictionary(keyPart) {
    const filteredKeys = Object.keys(translation)
        .filter(key => key.startsWith(keyPart))
        .reduce((obj, key) => {
            obj[key] = translation[key];
            return obj;
        }, {});

    console.log(filteredKeys);
    return filteredKeys;
}


/* ===== notification_from_3122 ===== */
const notifContainer = document.querySelector('.notif');
const notifList = notifContainer.querySelector('.notif__list');
const notifTemplate = notifContainer.querySelector('.notif__template li');

const cityAlternatesKeys = [
    "Boise",
    "Savannah",
    "Madison",
    "Santa Fe",
    "Tallahassee",
    "Eugene",
    "Chattanooga",
    "Duluth",
    "Lubbock",
    "Burlington",
    "Reno",
    "Fargo",
    "Little Rock",
    "Missoula",
    "Spokane"
];


function createNotificationFromTemplate() {
    const li = notifTemplate.cloneNode(true);

    li.style.display = 'flex';
    li.classList.remove('notif--hide');
    li.classList.add('notif--show');

    li.addEventListener('click', () => li.remove());
    return li;
}

let nameSwitchIndex = 0;

function sendNotificationFromTemplate() {
    if (!notifnames.length) return;

    const li = createNotificationFromTemplate();

    const currentName = notifnames[nameSwitchIndex];
    nameSwitchIndex = (nameSwitchIndex + 1) % notifnames.length;

    const nameSpan = li.querySelector('#text_popup_name');
    if (nameSpan) {
        nameSpan.textContent = currentName;
    }

    const locationSpan = li.querySelector('.notif__location');
    if (locationSpan) {
        locationSpan.textContent = cityAlternatesKeys[nameSwitchIndex];
    }

    notifList.prepend(li);
    hideNotification(li);
}

function hideNotification(notif) {
    setTimeout(() => {
        notif.classList.remove('notif--show');
        notif.classList.add('notif--hide');

        setTimeout(() => {
            notif.remove();
        }, 1500);
    }, 7500);
}

function startNotifications() {
    sendNotificationFromTemplate();
    setTimeout(startNotifications, 20000);
}

setTimeout(startNotifications, 20000);


/* ===== block_main_top_content_3_carousel ===== */
document.addEventListener('DOMContentLoaded', function () {
    createColorElements('--carousel_3_color_selector_1_color_s');
    // createSizeElements();
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    let slides = document.querySelectorAll('.swiper-slide');
    const paginationContainer = document.querySelector('.hero__pagination');
    // const leftArrow = document.querySelector('.swiper-arrow--left');
    // const rightArrow = document.querySelector('.swiper-arrow--right');
    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let dragging = false;
    let moved = false;
    const slideWidth = slides[0].clientWidth;
    const minSwipeDistance = 10;
    let imageCount = 1;
    let isImagesOver = false;
    var carouselTouched = false;
    var shouldWait = false;
    var isAutoSliding = false;
    var defImagesSetted = false;
    // function goToSlide(index) {
    //     if (index >= 0 && index < slides.length) {
    //         swiperWrapper.style.transition = 'transform 0.3s ease-out';
    //         swiperWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
    //         currentIndex = index;
    //         prevTranslate = -index * slideWidth;
    //         updatePagination();
    //     }
    // }

    function handleArrowClick(direction) {
        if (direction === 'left' && currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else if (direction === 'right' && currentIndex < slides.length - 1) {
            goToSlide(currentIndex + 1);
        }
    }

    // leftArrow.addEventListener('click', () => handleArrowClick('left'));
    // rightArrow.addEventListener('click', () => handleArrowClick('right'));

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = () => reject(src);
        });
    }


    async function addImageToSwipper(sName) {
        const newSlide = document.createElement('div');
        newSlide.className = 'swiper-slide';


        const basePaths = [
            `./${productName}/img/${countryCurrent}/`,
            `./${productName}/img/`,
            `./img/${countryCurrent}/`,
            `./img/`
        ];

        let imageLoaded = false;

        for (const path of basePaths) {
            const newImageName = `main_top_content_3_carousel_${sName ? sName + "-" : ""}${imageCount + 1}.webp`;
            const newImageSrc = path + newImageName;

            try {
                const newImage = await loadImage(newImageSrc);
                newImage.alt = 'image';
                newSlide.appendChild(newImage);
                swiperWrapper.appendChild(newSlide);

                console.log(newImageName + " LOADED from " + path);
                imageLoaded = true;
                break;
            } catch (error) {
                console.log(newImageName + " FAILED at " + path);
            }
        }

        if (!imageLoaded) {
            console.error('Image not found on any path');
            isImagesOver = true;
        } else {
            imageCount++;
        }
        return imageLoaded;
    }

    function clearSwiper() {
        slides = document.querySelectorAll('.swiper-slide');
        slides.forEach((slide) => slide.remove());
        slides = document.querySelectorAll('.swiper-slide');
        clearPagination()
    }

    function clearPagination() {
        while (paginationContainer.firstChild) {
            paginationContainer.removeChild(paginationContainer.firstChild);
        }
    }


    async function createSwipper(sName) {
        while (!isImagesOver) {
            const success = await addImageToSwipper(sName);
            if (!success) break;
        }
        slides = document.querySelectorAll('.swiper-slide');
        if (slides.length > 1) {
            createPagination();
            if (!isAutoSliding) {
                isAutoSliding = true;
                startAutoSlide();
            }
        }
    }


    function createPagination() {
        slides.forEach((_, index) => {
            const span = document.createElement('span');
            span.addEventListener('click', () => {
                goToSlide(index);
            });
            paginationContainer.appendChild(span);
        });
        updatePagination();
    }

    function updatePagination() {
        const dots = paginationContainer.children;
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === currentIndex);
        }
    }

    function goToSlide(index) {
        try {
            const slideWidth = slides[0].clientWidth;
            if (index >= 0 && index < slides.length) {
                swiperWrapper.style.transition = 'transform 0.3s ease-out';
                swiperWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
                currentIndex = index;
                prevTranslate = -index * slideWidth;
                updatePagination();
            }
        } catch (e) {
        }
    }

    function handleStart(event) {
        slides = document.querySelectorAll('.swiper-slide');
        if (slides.length <= 1) return;
        startX = event.touches ? event.touches[0].clientX : event.clientX;
        currentX = startX;
        dragging = true;
        moved = false;
        carouselTouched = true;
        // swiperWrapper.style.transition = 'none'; // Отключить анимацию при перетаскивании
    }

    function handleMove(event) {
        if (!dragging) return;
        const newX = event.touches ? event.touches[0].clientX : event.clientX;
        const diff = newX - startX;
        carouselTouched = true;
        if (Math.abs(diff) > minSwipeDistance) {
            moved = true;
            swiperWrapper.classList.add('dragging');
        }
        currentTranslate = prevTranslate + diff;
        swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;

        // Остановить распространение события, чтобы предотвратить сдвиг всего контента
        // event.preventDefault();
    }

    function handleEnd() {
        if (!dragging) return;
        dragging = false;
        swiperWrapper.classList.remove('dragging');
        const movedBy = currentTranslate - prevTranslate;

        if (Math.abs(movedBy) < minSwipeDistance) {
            // Если движение было меньше порогового значения, вернуть на место без анимации
            swiperWrapper.style.transform = `translateX(${prevTranslate}px)`;
        } else {
            if (movedBy < -minSwipeDistance && currentIndex < slides.length - 1) {
                currentIndex += 1;
            }
            if (movedBy > minSwipeDistance && currentIndex > 0) {
                currentIndex -= 1;
            }

            goToSlide(currentIndex);
        }
        carouselTouched = false;
        shouldWait = true;
    }

    swiperWrapper.addEventListener('touchstart', handleStart, {passive: true});
    swiperWrapper.addEventListener('touchmove', handleMove, {passive: true});
    swiperWrapper.addEventListener('touchend', handleEnd);
    swiperWrapper.addEventListener('touchcancel', handleEnd);
    swiperWrapper.addEventListener('mousedown', handleStart);
    swiperWrapper.addEventListener('mousemove', handleMove);
    swiperWrapper.addEventListener('mouseup', handleEnd);
    swiperWrapper.addEventListener('mouseleave', handleEnd);


    // function startAutoSlide(interval = 3000) {
    //     setInterval(() => {
    //         if (!carouselTouched) {
    //             let nextIndex = (currentIndex + 1) % slides.length;
    //             goToSlide(nextIndex);
    //         }
    //         delay
    //     }, interval);
    // }

    function startAutoSlide(interval = 3000, delayAfterTouch = 5000) {
        async function scheduleSlide() {
            if (!carouselTouched && !shouldWait) {
                // Переключаем на следующий слайд
                let nextIndex = (currentIndex + 1) % slides.length;
                goToSlide(nextIndex);
                setTimeout(scheduleSlide, interval); // Запускаем следующий слайд через интервал
            } else {
                // Ожидаем, пока флаг carouselTouched станет false
                await waitForFlagToChange();
                // Добавляем задержку после касания
                setTimeout(() => {
                    scheduleSlide(); // Возобновляем переключение слайдов
                }, delayAfterTouch);
            }
        }

        // Функция для ожидания смены флага
        function waitForFlagToChange() {
            return new Promise(resolve => {
                const intervalId = setInterval(() => {
                    if (!carouselTouched) {
                        shouldWait = false;
                        clearInterval(intervalId); // Останавливаем проверку
                        resolve(); // Завершаем ожидание
                    }
                }, 100); // Проверяем флаг каждые 100 мс
            });
        }

        scheduleSlide(); // Запускаем авто-слайд
    }

    // createSwipper();


    const colorOptions = document.querySelectorAll('.color-option');

    function reuploadImages() {
        var sliderImages = document.querySelectorAll('.swiper-slide img');
        // colorOptions.forEach(opt => opt.classList.remove('active-color'));
        const selectedColor = getFromLocalStorage('scolor') ?? "s1";
        sliderImages.forEach((sliderImage, index) => {

            const newSrc = `./{sub_id_28}/img/{country}/main_top_content_3_carousel_${selectedColor}-1.webp`;

            sliderImage.src = newSrc;
            sliderImage.setAttribute(
                'onerror',
                `handleImageError(this, 'main_top_content_3_carousel_${selectedColor}-1.webp');`
            );
        });
        sliderImages = document.querySelectorAll('.swiper-slide img');
        try {
            const attr = `handleImageError(this, 'cards_s1.webp');`
            const cardSrc = `./${productName}/img/${countryCurrent}/cards_s1.webp`
            setDefaultProductImage(cardSrc, attr);
            productImageSrc = document.querySelector('.product-item-image').src
        } catch (e) {

        }
        try {

            const attr = `handleImageError(this, 'cards_${selectedColor}.webp');`
            const cardSrc = `./${productName}/img/${countryCurrent}/cards_${selectedColor}.webp`
            changeProductItem(cardSrc, attr);
        } catch (e) {
            console.log(e)
        }

    }

    function setDefaultProductImage(imageSrc, attr) {
        if (!defImagesSetted) {
            const itemPlaceholders = document.querySelectorAll('.def-product-item-image');


            itemPlaceholders.forEach((el) => {
                el.src = imageSrc;
                el.setAttribute('onerror', attr);
            })
            defImagesSetted = true;
        }
    }

    // if (colorOptions.length > 1) {
    try {
        reuploadImages();
    } catch (e) {
    }
    // }
    imageCount = 0;
    currentIndex = 0;
    isImagesOver = false;
    const selectedColor = getFromLocalStorage('scolor') ?? "s1";
    clearSwiper();
    createSwipper(selectedColor);

    const savedColor = getFromLocalStorage('scolor');
    if (savedColor) {
        colorOptions.forEach(option => {
            if (option.getAttribute('data-color') === savedColor) {
                option.classList.add('active-color');
            } else {
                option.classList.remove('active-color');
            }
        });
    }

    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('active-color'));
            option.classList.add('active-color');
            const selectedColor = option.getAttribute('data-color');
            saveToLocalStorage('scolor', selectedColor);
            reuploadImages();
            imageCount = 0;
            currentIndex = 0;
            isImagesOver = false;
            goToSlide(currentIndex);
            clearSwiper();
            createSwipper(selectedColor);
        });
    });


});


function createColorElements(prefix) {

    const container = document.getElementById("main_top_content_3_color_container");
    const spanContainer = container.querySelector(".main__flex-2")
    const stylesheets = document.styleSheets;
    var sColorCount = 0;
    for (const sheet of stylesheets) {
        try {
            if (!sheet.cssRules) continue;

            for (const rule of sheet.cssRules) {
                if (rule.selectorText === ':root') {
                    const style = rule.style;

                    for (let i = 0; i < style.length; i++) {
                        const property = style[i];

                        if (property.startsWith(prefix)) {
                            sColorCount++;
                            const value = style.getPropertyValue(property).trim();
                            const variableNumber = property.match(/s(\d+)/)?.[1];

                            if (variableNumber) {
                                const span = document.createElement("span");
                                span.className = "color-option";
                                if (variableNumber == 1) {
                                    span.classList.add("active-color")
                                }
                                span.setAttribute("data-color", `s${variableNumber}`);
                                span.style.setProperty("background", `var(${property})`);
                                spanContainer.appendChild(span);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.warn('Не удалось прочитать стили из файла:', error);
        }
    }
    if (sColorCount < 1) {
        container.style.display = 'none';
    }
}

/* ===== block_main_top_content_3_carousel ===== */
let itemAvailableCount = 50;
let isTopContentFunctionStarted = false;

document.addEventListener('DOMContentLoaded', function () {
    // createSizeElements();
    // createSexElemetns();
    createDynamicContainers("text_main_top_content_3_selector_", "root_dynamic_containers");

})

function startDecreasingItems() {
    if (!isTopContentFunctionStarted) {
        isTopContentFunctionStarted = true;
        setInterval(function () {
            decreaseItems();
        }, 5000);
    }
}

function decreaseItems() {
    const topContentItemCountElements = document.querySelectorAll('.main_top_content_1_item_count');
    let random = getRandomInt(1, 5);
    itemAvailableCount -= random;

    if (itemAvailableCount > 20) {
        topContentItemCountElements.forEach((element) => {
            element.innerHTML = itemAvailableCount;
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    startDecreasingItems();
});


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// async function createSexElemetns() {

//     await waitForTranslation();
//     const container = document.getElementById("main_top_content_3_select_container");
//     const spanContainer = container.querySelector(".main__flex");
//     let sizeKeys = filterDictionary("text_main_top_content_3_select-");
//     if (Object.keys(sizeKeys) == null || Object.keys(sizeKeys) == undefined || Object.keys(sizeKeys).length == 0){
//         container.style.display = 'none';
//     }
//     Object.keys(sizeKeys).forEach(function(sizeKey) {
//         const sizeNumber = sizeKey.split("-").pop();
//         const span = document.createElement("span");
//         span.innerHTML = translation[sizeKey];
//         spanContainer.appendChild(span);
//     })

//     const flexItems = container.querySelectorAll('span');

//     flexItems.forEach(item => {
//         item.addEventListener('click', () => {
//             flexItems.forEach(el => el.classList.remove('active'));
//             item.classList.add('active');
//         });
//     });

// }

async function createSelectors() {

}

// async function createSizeElements(){

//     await waitForTranslation();
//     const container = document.getElementById("main_top_content_3_size_container");
//     const spanContainer = container.querySelector(".main__flex");
//     let sizeKeys = filterDictionary("text_main_top_content_3_size-");
//     if (Object.keys(sizeKeys) == null || Object.keys(sizeKeys).length == 0){
//         container.style.display = 'none';
//     }
//     Object.keys(sizeKeys).forEach(function(sizeKey) {
//         const sizeNumber = sizeKey.split("-").pop();
//         const span = document.createElement("span");
//         span.innerHTML = translation[sizeKey];
//         spanContainer.appendChild(span);
//     })

//     const flexItems = container.querySelectorAll('span');

//     flexItems.forEach(item => {
//         item.addEventListener('click', () => {
//             flexItems.forEach(el => el.classList.remove('active'));
//             item.classList.add('active');
//         });
//     });
// }

async function createDynamicContainers(keyPrefix, rootContainerId) {
    // Ждем инициализации переменной translation
    await waitForTranslation();

    const rootContainer = document.getElementById(rootContainerId);
    if (!rootContainer) return;

    // Получаем ключи, которые начинаются с keyPrefix
    const keys = filterDictionary(keyPrefix);
    const keyList = Object.keys(keys);

    if (!keyList.length) {
        rootContainer.style.display = 'none';
        return; // Если ключей нет, ничего не делаем
    }

    const containersMap = new Map();
    var title = ''

    // Проходим по каждому ключу
    keyList.forEach((key) => {
        const titleMatch = key.match(/.*_selector_(\d+)$/);

        if (titleMatch) {
            title = translation[key];
        }
        const match = key.match(/.*_(\d+)_(\d+)$/);
        if (titleMatch && !match) return;


        const [, containerNumber, selectorNumber] = match;
        const containerId = `container-${containerNumber}`;

        // Создаем контейнер, если он еще не существует
        if (!containersMap.has(containerId)) {
            const container = document.createElement("div");
            container.id = containerId;
            container.classList.add("selector-container");
            container.innerHTML = `<p class="main__text-5">${title}</p><div class="main__flex"></div>`;
            rootContainer.appendChild(container);
            containersMap.set(containerId, container.querySelector(".main__flex"));
        }

        // Создаем span внутри контейнера
        const span = document.createElement("span");
        span.className = "color-option";
        if (selectorNumber == 1) {
            span.classList.add("active");
        }
        span.dataset.color = `s${selectorNumber}`;
        span.style.background = keys[key];
        span.innerHTML = translation[key];

        containersMap.get(containerId).appendChild(span);
    });

    // Добавляем делегирование событий для всех контейнеров
    rootContainer.addEventListener("click", (event) => {
        if (event.target.tagName === "SPAN") {
            const flexContainer = event.target.parentElement;
            flexContainer.querySelectorAll("span").forEach(el => el.classList.remove("active"));
            event.target.classList.add("active");
        }
    });
}


/* ===== end_selectors_block ===== */
function cardColors() {
    const list = document.getElementById("cardsColorsContainer");
    const image = document.getElementById("cardsImage");
    const imageLoader = document.getElementById("cardsImgLoader");
    const imageBox = image ? image.closest(".prize-image-box") : null;
    if (!list || !image) return;

    const title = document.querySelector(".con-prize .title-inner");
    if (title) title.remove();

    let i = 1;
    let first = null;
    let cardLoadRequestId = 0;

    function setCardImageLoadingState(isLoading) {
        if (!imageBox || !imageLoader) return;

        if (isLoading) {
            imageBox.classList.add("is-loading");
            imageLoader.style.display = "flex";
        } else {
            imageBox.classList.remove("is-loading");
            imageLoader.style.display = "none";
        }
    }

    function preloadImage(src) {
        return new Promise((resolve, reject) => {
            const preloaded = new Image();
            preloaded.onload = () => resolve(src);
            preloaded.onerror = reject;
            preloaded.src = src;
        });
    }

    async function resolveCardImageSrc(file) {
        const sources = [
            `./${productName}/img/${countryCurrent}/${file}`,
            `./${productName}/img/${file}`,
            `./img/${countryCurrent}/${file}`,
            `./img/${file}`
        ];

        for (const source of sources) {
            try {
                await preloadImage(source);
                return source;
            } catch (e) {
            }
        }

        return sources[0];
    }

    async function applyCardImage(file) {
        const requestId = ++cardLoadRequestId;
        const primarySrc = `./${productName}/img/${countryCurrent}/${file}`;

        setCardImageLoadingState(true);

        try {
            const resolvedSrc = await resolveCardImageSrc(file);
            if (requestId !== cardLoadRequestId) return;

            image.src = resolvedSrc;
            image.setAttribute("onerror", `handleImageError(this, '${file}')`);
            productImageSrc = resolvedSrc;
        } catch (e) {
            if (requestId !== cardLoadRequestId) return;

            image.src = primarySrc;
            image.setAttribute("onerror", `handleImageError(this, '${file}')`);
            productImageSrc = primarySrc;
        } finally {
            if (requestId !== cardLoadRequestId) return;
            setCardImageLoadingState(false);
        }
    }

    while (true) {
        const varName = `--cards_color_selector_1_color_s${i}`;
        const color = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        if (!color) break;

        const li = document.createElement("li");
        li.className = "colors__item";
        li.style.background = color;

        const file = `cards_s${i}.webp`;
        const src = `./${productName}/img/${countryCurrent}/${file}`;

        li.dataset.image = src;

        li.addEventListener("click", () => {
            list.querySelectorAll(".colors__item").forEach(el => el.classList.remove("--active"));
            li.classList.add("--active");
            applyCardImage(file);
        });

        list.appendChild(li);
        if (!first) first = li;
        i++;
    }

    if (first) first.click();
}

function onceOnShow(target, fn) {
    if (!target || typeof fn !== "function") return;
    observeDisplayChange(target, () => {
        if (target.dataset._inited === "1") return;
        fn();
        target.dataset._inited = "1";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const step5 = document.getElementById("step5");
    if (step5) onceOnShow(step5, cardColors);
});


/* ===== end_modal_block ===== */
function prizeModal() {
    const modal = document.getElementById('modal-prize');
    const btnClaim = document.getElementById('btn-claim');
    const btnClose = document.getElementById('btn-close');
    const qtyEl = document.getElementById('qty');
    if (!modal || !btnClaim || !btnClose || !qtyEl) return;

    function openModal() {
        modal.classList.add('mod-con-bg');
        modal.classList.remove('hidden');
        modal.children[0].classList.add('mod-con-inn');
    }

    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('mod-con-bg');
        modal.children[0].classList.remove('mod-con-inn');
    }

    btnClaim.addEventListener('click', openModal);
    btnClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    let qty = 5;
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const timer = setInterval(() => {
        qty -= random(1, 2);
        qtyEl.textContent = qty <= 0 ? 1 : qty;
        if (qty <= 0) clearInterval(timer);
    }, 5000);
}

document.addEventListener('DOMContentLoaded', prizeModal);


/* ===== block_quiz_1_auto ===== */
document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('mainTopBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function (e) {
            e.preventDefault();
            nextStep(startBtn);
        });
    }
});

let timer = document.getElementById('timer') || document.querySelector('.que__timer');
let quetions = document.getElementById('quetions');
let queCounter = document.getElementById('queCounter');
let queCount = document.getElementById('queCount');
let questions = document.querySelectorAll('.question');
let question = 0;
let questionsCount = questions.length;
let totalQuestionsText = document.querySelectorAll('.question-total');
let seconds = 120;
let countdownInterval;

function getQuestions() {
    let questionTexts = filterDictionary("text_quiz_1_auto_question_");
    return questionTexts;
}

function getAnswers(qNumber) {
    console.log("Q number: " + qNumber);
    let answerTexts = filterDictionary("text_quiz_1_auto_answer_" + qNumber + "_");
    return answerTexts;
}

function createQuiz() {
    let questionKeys = getQuestions();
    let index = 1;

    Object.keys(questionKeys).forEach(function (questionKey) {
        if (questionKey.includes("total")) {
            return;
        }
        const qNumber = questionKey.split("_").pop();
        const questionText = translation[questionKey]
            .replaceAll("{_cc_country}", cc_country)
            .replaceAll("{_pricenew}", pricenew)
            .replaceAll("{_priceold}", priceold)
            .replaceAll("{_name1}", name1)
            .replaceAll("{_name2}", name2)
            .replaceAll("{_name3}", name3)
            .replaceAll("{_name4}", name4)
            .replaceAll("{_name5}", name5)
            .replaceAll("{_name6}", name6)
            .replaceAll("{_name7}", name7)
            .replaceAll("{_name8}", name8)
            .replaceAll("{_name9}", name9)
            .replaceAll("{_supportname}", supportName)
            .replaceAll("{_product}", product)
            .replaceAll("{_offertitle}", offerTitle);

        const answerKeys = getAnswers(qNumber);
        const questionBlock = addQuestionBlock(questionText, index);

        try {
            addAnswersBlock(questionBlock, answerKeys);
        } catch (e) {
        }

        index++;
    });
}

function addQuestionBlock(text, index) {
    const questionDiv = document.createElement("div");
    questionDiv.className = `quetion-${index} question`;

    const questionTextElement = document.createElement("p");
    questionTextElement.className = `quetion__text text-11 text_quiz_1_auto_question_${index}`;
    questionTextElement.textContent = text;

    questionDiv.appendChild(questionTextElement);
    quetions.appendChild(questionDiv);

    return questionDiv;
}

function addAnswersBlock(parent, answerTexts) {
    Object.keys(answerTexts).forEach(function (answerKey, index) {
        const answerText = translation[answerKey]
            .replaceAll("{_cc_country}", cc_country)
            .replaceAll("{_pricenew}", pricenew)
            .replaceAll("{_priceold}", priceold)
            .replaceAll("{_name1}", name1)
            .replaceAll("{_name2}", name2)
            .replaceAll("{_name3}", name3)
            .replaceAll("{_name4}", name4)
            .replaceAll("{_name5}", name5)
            .replaceAll("{_name6}", name6)
            .replaceAll("{_name7}", name7)
            .replaceAll("{_name8}", name8)
            .replaceAll("{_name9}", name9)
            .replaceAll("{_supportname}", supportName)
            .replaceAll("{_product}", product)
            .replaceAll("{_offertitle}", offerTitle);

        addAnswerButton(parent, answerText, index + 1);
    });
}

function addAnswerButton(parent, text, index) {
    const button = document.createElement("button");
    button.setAttribute("aria-label", "button");
    button.className = `quetion__btn btn-reset text-${12 + index} text_quiz_1_auto_answer_${index}`;
    button.textContent = text;
    button.disabled = true; // Оставляем кнопку отключенной

    parent.appendChild(button);
}

function startQuiz() {
    loadQuizState();
    createQuiz();

    questions = document.querySelectorAll('.question');
    questionsCount = questions.length;
    totalQuestionsText = document.querySelectorAll('.question-total');

    if (queCount) queCount.textContent = questionsCount;
    if (timer) timer.style.opacity = "1";

    totalQuestionsText.forEach(function (questionTotal) {
        questionTotal.innerHTML = questionTotal.innerHTML.split(" ")[0] + " " + questionsCount;
    });

    setClickListeners();

    setTimeout(function () {
        quetions.style.display = 'inline-block';
        quetions.style.animation = 'fadeInFirst 0.3s ease forwards';
        updateProgress();
    }, 150);

    setTimeout(function () {
        if (questions[question]) {
            questions[question].querySelectorAll(".quetion__btn").forEach(function (btn) {
                btn.removeAttribute('disabled');
            });
            questions[question].style.display = 'block';
        }
        scrollToElementBottom(quetions);
    }, 300);
}


function setClickListeners() {
    questions.forEach(function (el) {
        let btns = el.querySelectorAll('.quetion__btn');

        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                let currentQuestion = questions[question];

                if (timer) timer.style.color = 'red';
                if (!isQuizTimerStarted) startQuizCountDown();

                currentQuestion.querySelectorAll('.quetion__btn').forEach(function (b) {
                    b.setAttribute('disabled', 'true');
                });

                question++;
                saveQuizState();
                updateProgress();

                if (question >= questionsCount) {
                    nextStep();
                    return;
                }

                let nextQuestion = questions[question];
                el.style.animation = 'fadeOut 1s ease-in-out forwards';

                setTimeout(function () {
                    currentQuestion.style.display = 'none';
                    nextQuestion.style.display = 'block';
                    nextQuestion.style.animation = 'fadeIn 1s ease-in-out';
                    if (queCounter) queCounter.textContent = question + 1;
                    saveQuizState();

                    scrollToElementBottom(quetions);
                    const height = quetions.getBoundingClientRect().height;
                    const minHeight = parseFloat(quetions.style.minHeight) || 0;
                    if (minHeight < height) {
                        quetions.style.minHeight = `${height}px`;
                    }
                }, 700);

                setTimeout(function () {
                    nextQuestion.querySelectorAll('.quetion__btn').forEach(function (b) {
                        b.removeAttribute('disabled');
                    });
                }, 1200);
            });
        });
    });
}

let progressFill = document.getElementById('quizProgressFill');
let progressPercent = document.getElementById('quizProgressPercent');
let progressCurrent = document.getElementById('quizProgressCurrent');
let progressTotal = document.getElementById('quizProgressTotal');

function updateProgress() {
    if (!questionsCount || questionsCount === 0) return;
    const answered = question;
    const pct = Math.round((answered / questionsCount) * 100);

    if (progressFill) progressFill.style.width = pct + '%';
    if (progressPercent) progressPercent.textContent = pct + '%';
    if (progressCurrent) progressCurrent.textContent = answered;
    if (progressTotal) progressTotal.textContent = questionsCount;

    if (queCounter) queCounter.textContent = answered;
    if (queCount) queCount.textContent = questionsCount;
}


let isQuizTimerStarted = false;

function startQuizCountDown() {
    if (!isQuizTimerStarted) {
        isQuizTimerStarted = true;
        countdownInterval = setInterval(function () {
            if (seconds <= 0) {
                clearInterval(countdownInterval);
                if (timer) timer.style.color = 'red';
                return;
            }
            seconds--;
            updateTimerDisplay();
            saveQuizState();
        }, 1000);
    }
}

function saveQuizState() {
    saveToLocalStorage('currentQuestion', question);
    saveToLocalStorage('remainingTime', seconds);
    saveToLocalStorage('queCounter', question + 1);
}

function loadQuizState() {
    const savedQuestion = getFromLocalStorage('currentQuestion');
    const savedTime = getFromLocalStorage('remainingTime');
    const savedQueCounter = getFromLocalStorage('queCounter');

    if (savedQuestion !== null) {
        question = parseInt(savedQuestion, 10);
    }
    if (savedTime !== null) {
        seconds = parseInt(savedTime, 10);
        updateTimerDisplay();
    }
    if (queCounter) {
        queCounter.textContent = (savedQueCounter !== null) ? savedQueCounter : 1;
    }
}

function updateTimerDisplay() {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    document.getElementById("quiz_min").textContent = minutes;
    document.getElementById("quiz_sec").textContent = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
}

// Очистка локального хранилища при завершении теста
function clearQuizState() {
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('remainingTime');
}

// Вызов clearQuizState() в нужном месте, например, когда тест завершён.


/* ===== block_loader_1 ===== */
let loaderItem1 = document.querySelector('.loader__item-1');
let loaderItem2 = document.querySelector('.loader__item-2');
let loaderItem3 = document.querySelector('.loader__item-3');


function startLoader() {
    setTimeout(function () {
        loaderItem1.style.animation = 'fadeIn 1s ease-in-out';
        loaderItem1.style.display = 'block';
    }, 1200);
    setTimeout(function () {
        loaderItem2.style.animation = 'fadeIn 1s ease-in-out';
        loaderItem2.style.display = 'block';
    }, 2400);
    setTimeout(function () {
        loaderItem3.style.animation = 'fadeIn 1s ease-in-out';
        loaderItem3.style.display = 'block';
    }, 3600);

    setTimeout(function () {
        step = 5;
        saveStepToLocalStorage(step);
        flow();
    }, 4200);
}

/* ===== block_scrolltotop_1 ===== */
(function () {
    const btn = document.getElementById('scrollToTopBtn');
    if (!btn) return;
    const ANIM = 0.4;
    let visible = false;

    const targets = ['#mainTopBtn', '#btn-claim'];

    function pickAnchor() {
        const nodes = document.querySelectorAll('#comments');
        for (const el of nodes) {
            const cs = getComputedStyle(el);
            if (cs.display !== 'none' && el.offsetHeight > 0) return el;
        }
        return null;
    }

    function shouldShow() {
        const anchor = pickAnchor();
        if (anchor) return anchor.getBoundingClientRect().top <= 0;
        return window.scrollY > 600;
    }

    function rafThrottle(fn) {
        let ticking = false;
        return function () {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                fn();
                ticking = false;
            });
        };
    }

    function update() {
        const need = shouldShow();
        if (need && !visible) {
            btn.classList.add('show');
            if (typeof startFadeInAnim === 'function') startFadeInAnim(btn, ANIM);
            visible = true;
        } else if (!need && visible) {
            if (typeof startFadeOutAnim === 'function') startFadeOutAnim(btn, ANIM);
            setTimeout(() => btn.classList.remove('show'), ANIM * 1000 - 50);
            visible = false;
        }
    }

    window.addEventListener('scroll', rafThrottle(update), { passive: true });
    update();

    btn.addEventListener('click', () => {
        // ищем первую видимую кнопку из двух
        let target = null;
        for (const sel of targets) {
            const el = document.querySelector(sel);
            if (el && getComputedStyle(el).display !== 'none' && el.offsetHeight > 0) {
                target = el;
                break;
            }
        }

        if (target) {
            const rect = target.getBoundingClientRect();
            const scrollTop = window.scrollY + rect.top - 10; // лёгкий отступ
            window.scrollTo({ top: scrollTop, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
})();



/* ===== block_comments_1 ===== */
document.addEventListener('DOMContentLoaded', function () {
    const commentBlocks = document.querySelectorAll('.comments-block');

    commentBlocks.forEach(function (block, blockIndex) {
        const textarea = block.querySelector('#textarea') || block.querySelector('textarea');
        const placeholder = block.querySelector('.placeholder');
        const postBtn = block.querySelector('#postCommentBtn') || block.querySelector('.comment-button-right button');
        const commentsList = block.querySelector('.comment__list');
        const totalEl = block.querySelector('#commentsTotal');
        const formAvatarImg = block.querySelector('.add-comment .com__flex > img, .add-comment .comment__avatar img, .add-comment .comment__avatar');

        const storageKey = `user_comments_block_${blockIndex}`;
        const staticReplyKey = `user_replies_block_${blockIndex}`;
        const liveSigKey = `${storageKey}__live_signatures`;
        const userAvatarKey = `${storageKey}__user_avatar_dataurl`;

        const MAX_DEPTH = 2;
        const staticThreads = new Map();
        const buildSignature = (name, text) => `${name}:::${text}`;

        if (!textarea || !postBtn || !commentsList) return;

        const loadSigSet = () => {
            try {
                return new Set(JSON.parse(localStorage.getItem(liveSigKey)) || []);
            } catch {
                return new Set();
            }
        };
        const saveSigSet = (set) => localStorage.setItem(liveSigKey, JSON.stringify([...set]));

        function safeReadJSON(key, fallback) {
            try {
                const raw = localStorage.getItem(key);
                if (!raw) return fallback;
                const parsed = JSON.parse(raw);
                return parsed === null ? fallback : parsed;
            } catch (e) {
                return fallback;
            }
        }

        function safeWriteJSON(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }

        function normalizeComment(raw) {
            const safe = raw && typeof raw === 'object' ? raw : {};
            const likesVal = Number(safe.likes);
            const dynIndex = Number(safe.dynIndex);
            const origin = safe.origin === 'live' ? 'live' : 'user';
            const normalized = {
                id: String(safe.id || `${Date.now()}_${Math.random().toString(16).slice(2)}`),
                text: typeof safe.text === 'string' ? safe.text : '',
                name: typeof safe.name === 'string' && safe.name.trim() ? safe.name.trim() : (origin === 'live' ? 'User' : 'You'),
                liked: !!safe.liked,
                likes: Number.isFinite(likesVal) ? Math.max(0, likesVal) : 0,
                date: typeof safe.date === 'string' && safe.date.trim() ? safe.date : formatDateDMY(new Date()),
                replies: [],
                origin,
                avatar: safe.avatar === 'user' ? 'user' : null,
                dynIndex: Number.isFinite(dynIndex) ? dynIndex : null
            };
            if (Array.isArray(safe.replies)) {
                normalized.replies = safe.replies.map(normalizeComment);
            }
            return normalized;
        }

        function escapeHtml(value) {
            return String(value || '')
                .replaceAll('&', '&amp;')
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('"', '&quot;')
                .replaceAll("'", '&#39;');
        }

        function getUserAvatarDataURL() {
            try {
                return localStorage.getItem(userAvatarKey) || '';
            } catch {
                return '';
            }
        }

        function setUserAvatarDataURL(dataUrl) {
            localStorage.setItem(userAvatarKey, dataUrl || '');
        }

        window.handleDynAvatarError = function (img, fileName) {
            const basePaths = [
                `./${productName}/img/${countryCurrent}/`,
                `./${productName}/img/`,
                `./img/${countryCurrent}/`,
                `./img/`
            ];

            let i = 0;
            img.onerror = function () {
                if (i < basePaths.length) {
                    img.src = basePaths[i++] + fileName;
                } else {
                    img.onerror = function () {
                        this.onerror = null;
                        this.src = `./{sub_id_28}/img/{country}/comments_1_user.webp`;
                        this.setAttribute('onerror', "handleImageError(this, 'comments_1_user.webp');");
                    };
                    img.src = `./{sub_id_28}/img/{country}/comments_1_user.webp`;
                }
            };
            img.src = basePaths[i++] + fileName;
        };

        function getStaticThreadKey(sid) {
            return `${staticReplyKey}_${sid}`;
        }

        function getStaticThread(sid) {
            if (!sid) return [];
            if (!staticThreads.has(sid)) {
                const rawThread = safeReadJSON(getStaticThreadKey(sid), []);
                const normalizedThread = Array.isArray(rawThread) ? rawThread.map(normalizeComment) : [];
                staticThreads.set(sid, normalizedThread);
                safeWriteJSON(getStaticThreadKey(sid), normalizedThread);
            }
            return staticThreads.get(sid);
        }

        function saveStaticThread(sid) {
            if (!sid) return;
            safeWriteJSON(getStaticThreadKey(sid), getStaticThread(sid));
        }

        function getThreadSid(item) {
            return item.dataset.threadSid || item.dataset.sid || '';
        }

        function getCommentDepth(node) {
            let depth = 0;
            let parentItem = node.parentElement ? node.parentElement.closest('.comment__item') : null;
            while (parentItem) {
                depth++;
                parentItem = parentItem.parentElement ? parentItem.parentElement.closest('.comment__item') : null;
            }
            return depth;
        }

        function ensureRepliesContainer(node) {
            let replies = node.querySelector(':scope > ul.replies');
            if (!replies) {
                replies = document.createElement('ul');
                replies.classList.add('replies');
                node.appendChild(replies);
            }
            return replies;
        }

        function enforceReplyLimit(node) {
            const depth = getCommentDepth(node);
            if (depth < MAX_DEPTH) return;
            const container = node.querySelector(':scope > .comment__container');
            if (!container) return;
            const replyBtn = container.querySelector('.comment__time .reply-btn');
            if (replyBtn) replyBtn.remove();
        }

        function findCommentById(arr, id) {
            for (let i = 0; i < arr.length; i++) {
                const comment = arr[i];
                if (comment.id === id) return comment;
                if (Array.isArray(comment.replies)) {
                    const found = findCommentById(comment.replies, id);
                    if (found) return found;
                }
            }
            return null;
        }

        function restoreLikeVisual(li, liked) {
            const counter = li.querySelector('.likes_counter');
            if (!counter) return;
            counter.classList.toggle('incremented', !!liked);
        }

        let savedComments = safeReadJSON(storageKey, []).map(normalizeComment);
        safeWriteJSON(storageKey, savedComments);
        const liveSigSet = loadSigSet();

        const initialStaticItems = Array.from(commentsList.querySelectorAll('.comment__item[data-origin="static"]'));
        initialStaticItems.forEach((item, idx) => {
            if (!item.dataset.sid) item.dataset.sid = `s-${idx}`;
            item.dataset.threadSid = item.dataset.sid;
            ensureRepliesContainer(item);
            enforceReplyLimit(item);

            const staticLikeKey = `static_comment_${blockIndex}_${item.dataset.sid}`;
            const likesCounter = item.querySelector('.likes_counter');
            if (likesCounter && localStorage.getItem(staticLikeKey) === 'true' && !likesCounter.dataset.likedRestored) {
                likesCounter.classList.add('incremented');
                likesCounter.textContent = Number(likesCounter.textContent) + 1;
                likesCounter.dataset.likedRestored = '1';
            }
        });

        initialStaticItems.forEach((item) => {
            const replies = getStaticThread(item.dataset.sid);
            if (replies.length) {
                renderStaticRepliesRecursive(item, replies);
            }
        });

        savedComments.forEach((c) => {
            if (c.origin === 'live' && c.name && c.text) {
                liveSigSet.add(buildSignature(c.name, c.text));
            }
            const node = renderSavedComment(c, commentsList);
            if (Array.isArray(c.replies) && c.replies.length) {
                renderUserRepliesRecursive(node, c.replies);
            }
        });

        saveSigSet(liveSigSet);
        updateTotal();

        async function renderReviewImageIfExists(li, dynIndex) {
            const reviewFile = `comments_dynamic_1_rev${dynIndex}.webp`;
            const possiblePaths = [
                `./${productName}/img/${countryCurrent}/${reviewFile}`,
                `./${productName}/img/${reviewFile}`,
                `./img/${countryCurrent}/${reviewFile}`,
                `./img/${reviewFile}`,
                `./{sub_id_28}/img/{country}/${reviewFile}`
            ];

            for (const path of possiblePaths) {
                try {
                    const res = await fetch(path, {method: 'HEAD'});
                    if (res.ok) {
                        const img = document.createElement('img');
                        img.src = path;
                        img.loading = 'lazy';
                        img.alt = 'photo';
                        img.classList.add('comment__review-image');
                        li.querySelector('.comment__text')?.after(img);
                        return;
                    }
                } catch (_) {
                    continue;
                }
            }
        }

        const hiddenFileInput = document.createElement('input');
        hiddenFileInput.type = 'file';
        hiddenFileInput.accept = 'image/*';
        hiddenFileInput.style.display = 'none';
        block.appendChild(hiddenFileInput);

        function applyUserAvatarToDOM(dataUrl) {
            const fallback = `./{sub_id_28}/img/{country}/comments_1_user.webp`;

            if (formAvatarImg) {
                formAvatarImg.src = dataUrl || fallback;
                if (!dataUrl) {
                    formAvatarImg.setAttribute('onerror', "handleImageError(this, 'comments_1_user.webp');");
                } else {
                    formAvatarImg.removeAttribute('onerror');
                }
            }

            const userAvatars = block.querySelectorAll(
                '.comment__item[data-author="user"] .comment__avatar img, ' +
                '.comment__item[data-author="user"] > .comment__container .comment__avatar img'
            );

            userAvatars.forEach((img) => {
                img.src = dataUrl || fallback;
                if (!dataUrl) {
                    img.setAttribute('onerror', "handleImageError(this, 'comments_1_user.webp');");
                } else {
                    img.removeAttribute('onerror');
                }
            });
        }

        applyUserAvatarToDOM(getUserAvatarDataURL());

        if (formAvatarImg) {
            formAvatarImg.style.cursor = 'pointer';
            formAvatarImg.addEventListener('click', () => hiddenFileInput.click());
        }

        hiddenFileInput.addEventListener('change', function () {
            const file = this.files && this.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result;
                setUserAvatarDataURL(dataUrl);
                applyUserAvatarToDOM(dataUrl);

                let changed = false;
                function markUser(node) {
                    if (node && node.origin === 'user') {
                        node.avatar = 'user';
                        changed = true;
                    }
                    if (Array.isArray(node?.replies)) node.replies.forEach(markUser);
                }

                savedComments.forEach(markUser);
                if (changed) safeWriteJSON(storageKey, savedComments);
            };
            reader.readAsDataURL(file);
            this.value = '';
        });

        function updatePostButtonState() {
            const hasText = textarea.value.trim().length > 0;
            postBtn.classList.toggle('disabled', !hasText);
            postBtn.disabled = !hasText;
        }

        function updatePlaceholderVisibility() {
            const hasText = textarea.value.trim().length > 0;
            const hasFocus = document.activeElement === textarea;
            if (placeholder) {
                placeholder.style.display = (hasText || hasFocus) ? 'none' : 'block';
            }
            updatePostButtonState();
        }

        textarea.addEventListener('input', updatePlaceholderVisibility);
        textarea.addEventListener('focus', updatePlaceholderVisibility);
        textarea.addEventListener('blur', updatePlaceholderVisibility);
        updatePlaceholderVisibility();

        postBtn.addEventListener('click', function () {
            const text = textarea.value.trim();
            if (!text) return;

            const newComment = {
                id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
                text,
                name: 'You',
                liked: false,
                likes: 0,
                date: formatDateDMY(new Date()),
                replies: [],
                origin: 'user',
                avatar: 'user',
                dynIndex: null
            };

            savedComments.push(newComment);
            safeWriteJSON(storageKey, savedComments);
            renderSavedComment(newComment, commentsList);
            textarea.value = '';
            updatePlaceholderVisibility();
            updateTotal();
        });

        block.addEventListener('click', function (e) {
            const item = e.target.closest('.comment__item');
            if (!item) return;

            if (e.target.classList.contains('reply-btn')) {
                onReply(item);
            } else if (e.target.classList.contains('like-btn') || e.target.closest('.comment__actions')) {
                onLike(item);
            }
        });

        function onReply(item) {
            if (getCommentDepth(item) >= MAX_DEPTH) return;

            const name = (item.querySelector('.comment__name')?.textContent || 'User').trim();
            const existingForm = item.querySelector('.mini-reply-form');
            if (existingForm) {
                existingForm.remove();
                return;
            }
            block.querySelectorAll('.mini-reply-form').forEach((f) => f.remove());

            const cancelText = (translation && translation.text_comments_1_cancel) ? translation.text_comments_1_cancel : 'Cancel';
            const postText = (translation && translation.text_comments_1_post) ? translation.text_comments_1_post : 'Post';

            const form = document.createElement('div');
            form.className = 'mini-reply-form';
            form.innerHTML = `
                <div class="relative">
                    <textarea class="mini-textarea" maxlength="800">@${name} </textarea>
                    <div class="comment-button-box">
                        <div class="comment-button-right">
                            <button type="button" class="mini-cancel-btn">${cancelText}</button>
                            <button type="button" class="mini-post-btn disabled" disabled>${postText}</button>
                        </div>
                    </div>
                </div>
            `;
            item.appendChild(form);

            const miniTextarea = form.querySelector('.mini-textarea');
            const postBtnMini = form.querySelector('.mini-post-btn');
            const cancelBtnMini = form.querySelector('.mini-cancel-btn');

            miniTextarea.focus();
            const val = miniTextarea.value;
            miniTextarea.setSelectionRange(val.length, val.length);
            setTimeout(() => miniTextarea.setSelectionRange(val.length, val.length), 0);

            miniTextarea.addEventListener('input', () => {
                const hasText = miniTextarea.value.trim().length > 0;
                postBtnMini.disabled = !hasText;
                postBtnMini.classList.toggle('disabled', !hasText);
            });

            cancelBtnMini.addEventListener('click', () => form.remove());

            postBtnMini.addEventListener('click', () => {
                const text = miniTextarea.value.trim();
                if (!text) return;

                const newComment = {
                    id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
                    text,
                    name: 'You',
                    liked: false,
                    likes: 0,
                    date: formatDateDMY(new Date()),
                    replies: [],
                    origin: 'user',
                    avatar: 'user',
                    dynIndex: null
                };

                const threadSid = getThreadSid(item);
                if (threadSid) {
                    const thread = getStaticThread(threadSid);
                    if (item.dataset.origin === 'static') {
                        thread.push(newComment);
                    } else {
                        const parent = findCommentById(thread, item.dataset.id);
                        if (!parent) return;
                        if (!Array.isArray(parent.replies)) parent.replies = [];
                        parent.replies.push(newComment);
                    }
                    saveStaticThread(threadSid);
                    renderReply(item, newComment, true, 'static', 'user');
                } else {
                    const parent = findCommentById(savedComments, item.dataset.id);
                    if (!parent) return;
                    if (!Array.isArray(parent.replies)) parent.replies = [];
                    parent.replies.push(newComment);
                    safeWriteJSON(storageKey, savedComments);
                    renderReply(item, newComment, true, 'user', 'user');
                }

                updateTotal();
                form.remove();
            });
        }

        function onLike(item) {
            const likesCounter = item.querySelector('.likes_counter');
            if (!likesCounter) return;

            if (item.dataset.origin === 'static' && item.dataset.sid) {
                const key = `static_comment_${blockIndex}_${item.dataset.sid}`;
                const wasLiked = localStorage.getItem(key) === 'true';
                const next = Number(likesCounter.textContent) + (wasLiked ? -1 : 1);
                likesCounter.textContent = next;
                localStorage.setItem(key, wasLiked ? 'false' : 'true');
                likesCounter.classList.toggle('incremented', !wasLiked);
                return;
            }

            const threadSid = getThreadSid(item);
            if (threadSid && item.dataset.origin !== 'static') {
                const thread = getStaticThread(threadSid);
                const node = findCommentById(thread, item.dataset.id);
                if (node) {
                    node.liked = !node.liked;
                    node.likes = Math.max(0, (node.likes || 0) + (node.liked ? 1 : -1));
                    likesCounter.textContent = node.likes;
                    likesCounter.classList.toggle('incremented', !!node.liked);
                    saveStaticThread(threadSid);
                }
                return;
            }

            const dyn = findCommentById(savedComments, item.dataset.id);
            if (dyn) {
                dyn.liked = !dyn.liked;
                dyn.likes = Math.max(0, (dyn.likes || 0) + (dyn.liked ? 1 : -1));
                likesCounter.textContent = dyn.likes;
                likesCounter.classList.toggle('incremented', !!dyn.liked);
                safeWriteJSON(storageKey, savedComments);
            }
        }

        function renderSavedComment(c, list) {
            const li = document.createElement('li');
            li.classList.add('comment__item');
            li.dataset.id = c.id;
            li.dataset.origin = c.origin === 'live' ? 'live' : 'user';
            li.dataset.author = c.origin === 'live' ? 'live' : 'user';

            li.innerHTML = template(
                c,
                c.name || (c.origin === 'user' ? 'You' : 'User'),
                true,
                c.origin === 'user' ? 'user' : 'dynamic',
                c.dynIndex || null
            );

            list.prepend(li);

            if (c.origin === 'live' && typeof c.dynIndex === 'number') {
                renderReviewImageIfExists(li, c.dynIndex);
            }

            restoreLikeVisual(li, c.liked);
            ensureRepliesContainer(li);
            enforceReplyLimit(li);
            return li;
        }

        function renderReply(parentNode, r, highlight, scope, author = null) {
            const normalized = normalizeComment(r);
            const replies = ensureRepliesContainer(parentNode);
            const li = document.createElement('li');
            li.classList.add('comment__item');
            li.dataset.id = normalized.id;
            li.dataset.parentId = parentNode.dataset.id || parentNode.dataset.parentId || '';

            const childDepth = getCommentDepth(parentNode) + 1;
            const allowReply = childDepth < MAX_DEPTH;

            li.dataset.origin = allowReply ? 'reply' : 'reply-stop';
            if (scope === 'static') {
                const sid = getThreadSid(parentNode);
                if (sid) li.dataset.threadSid = sid;
            }

            if (author === 'user' || normalized.origin === 'user') {
                li.dataset.author = 'user';
            } else if (author === 'live' || normalized.origin === 'live') {
                li.dataset.author = 'live';
            }

            li.innerHTML = template(
                normalized,
                normalized.name || (author === 'user' ? 'You' : 'User'),
                allowReply,
                author === 'user' || normalized.origin === 'user' ? 'user' : (author === 'live' || normalized.origin === 'live' ? 'dynamic' : null),
                normalized.dynIndex || null
            );
            ensureRepliesContainer(li);
            replies.appendChild(li);

            if (highlight) {
                const cont = li.querySelector('.comment__container');
                if (cont) {
                    cont.classList.add('is-reply-target');
                    setTimeout(() => cont.classList.add('fade'), 10);
                    setTimeout(() => cont.classList.remove('is-reply-target', 'fade'), 800);
                }
            }

            if (normalized.origin === 'live' && typeof normalized.dynIndex === 'number') {
                renderReviewImageIfExists(li, normalized.dynIndex);
            }

            restoreLikeVisual(li, normalized.liked);
            enforceReplyLimit(li);
            return li;
        }

        function template(c, name, allowReply, avatarType, dynIndex) {
            let avatarHTML = '';
            if (avatarType === 'user') {
                const dataUrl = getUserAvatarDataURL();
                if (dataUrl) {
                    avatarHTML = `<img loading="lazy" src="${dataUrl}" alt="User">`;
                } else {
                    avatarHTML = `<img loading="lazy" src="./{sub_id_28}/img/{country}/comments_1_user.webp"
                                   onerror="handleImageError(this, 'comments_1_user.webp');" alt="User">`;
                }
            } else if (avatarType === 'dynamic' && typeof dynIndex === 'number') {
                const fileName = `comments_dynamic_1_av${dynIndex}.webp`;
                avatarHTML = `<img loading="lazy" alt="User"
                                   onerror="handleDynAvatarError(this, '${fileName}')"
                                   src="./{sub_id_28}/img/{country}/${fileName}">`;
            } else {
                avatarHTML = `<img loading="lazy" src="./{sub_id_28}/img/{country}/comments_1_user.webp"
                               onerror="handleImageError(this, 'comments_1_user.webp');" alt="User">`;
            }

            return `
                <div class="comment__container">
                    <div class="comment__avatar">
                        ${avatarHTML}
                    </div>
                    <div class="comment__content">
                        <div class="comment__name">${escapeHtml(name)}</div>
                        <div class="comment__text">${escapeHtml(c.text)}</div>
                        <ul class="comment__actions list-reset" style="cursor:pointer">
                            <span>
                                <img loading="lazy" src="./{sub_id_28}/img/{country}/comments_1_like.webp"
                                     onerror="handleImageError(this, 'comments_1_like.webp');" alt="">
                            </span>
                            <div class="likes_counter">${Number(c.likes) || 0}</div>
                        </ul>
                    </div>
                    <div class="comment__time">
                        <span>${escapeHtml(c.date || formatDateDMY(new Date()))}</span>
                        <span class="like-btn text_comments_1_like">Like</span>
                        ${allowReply ? '<span class="reply-btn text_comments_1_reply">Reply</span>' : ''}
                    </div>
                </div>`;
        }

        function renderUserRepliesRecursive(parentNode, repliesArr) {
            if (!Array.isArray(repliesArr) || !repliesArr.length) return;
            repliesArr.forEach((replyObj) => {
                const normalized = normalizeComment(replyObj);
                const childLi = renderReply(parentNode, normalized, false, 'user', normalized.origin === 'live' ? 'live' : 'user');
                if (Array.isArray(normalized.replies) && normalized.replies.length) {
                    renderUserRepliesRecursive(childLi, normalized.replies);
                }
            });
        }

        function renderStaticRepliesRecursive(parentNode, repliesArr) {
            if (!Array.isArray(repliesArr) || !repliesArr.length) return;
            repliesArr.forEach((replyObj) => {
                const normalized = normalizeComment(replyObj);
                const childLi = renderReply(parentNode, normalized, false, 'static', 'user');
                if (Array.isArray(normalized.replies) && normalized.replies.length) {
                    renderStaticRepliesRecursive(childLi, normalized.replies);
                }
            });
        }

        function updateTotal() {
            const total = block.querySelectorAll('.comment__item').length;
            if (totalEl) totalEl.textContent = total;
        }

        function expandMacros(text) {
            if (typeof text !== 'string') return text;
            return text
                .replaceAll('{_cc_country}', cc_country)
                .replaceAll('{_pricenew}', pricenew)
                .replaceAll('{_priceold}', priceold)
                .replaceAll('{_name1}', name1)
                .replaceAll('{_name2}', name2)
                .replaceAll('{_name3}', name3)
                .replaceAll('{_name4}', name4)
                .replaceAll('{_name5}', name5)
                .replaceAll('{_name6}', name6)
                .replaceAll('{_name7}', name7)
                .replaceAll('{_name8}', name8)
                .replaceAll('{_name9}', name9)
                .replaceAll('{_name10}', name10)
                .replaceAll('{_name11}', name11)
                .replaceAll('{_name12}', name12)
                .replaceAll('{_name13}', name13)
                .replaceAll('{_name14}', name14)
                .replaceAll('{_name15}', name15)
                .replaceAll('{_supportname}', supportName)
                .replaceAll('{_product}', product)
                .replaceAll('{_offertitle}', offerTitle);
        }

        function getLiveQueueFromTranslation() {
            const out = [];
            if (!translation) return out;

            for (let i = 1; i < 999; i++) {
                const rawName = translation[`text_live_comments_${i}_name`];
                const rawText = translation[`text_live_comments_${i}_text`];

                if (typeof rawName === 'undefined' && typeof rawText === 'undefined') break;

                const name = expandMacros(rawName || '');
                const text = expandMacros(rawText || '');

                if (name && text) out.push({name, text});
            }
            return out;
        }

        async function scheduleLiveComments() {
            await waitForTranslation();
            const queue = getLiveQueueFromTranslation();
            if (!queue.length) return;

            savedComments.forEach((c) => {
                if (c.origin === 'live' && c.name && c.text) {
                    liveSigSet.add(buildSignature(c.name, c.text));
                }
            });
            saveSigSet(liveSigSet);

            let acc = 0;
            queue.forEach((item, idx) => {
                const delay = 5000 + Math.floor(Math.random() * 5000);
                acc += delay;
                setTimeout(() => {
                    const sig = buildSignature(item.name, item.text);
                    if (liveSigSet.has(sig)) return;

                    const payload = {
                        id: `live_${Date.now()}_${Math.random().toString(16).slice(2)}`,
                        text: item.text,
                        name: item.name,
                        liked: false,
                        likes: 0,
                        date: formatDateDMY(new Date()),
                        replies: [],
                        origin: 'live',
                        avatar: null,
                        dynIndex: idx + 1
                    };

                    const exists = savedComments.some((c) => c.name === payload.name && c.text === payload.text);
                    if (exists) {
                        liveSigSet.add(sig);
                        saveSigSet(liveSigSet);
                        return;
                    }

                    savedComments.push(payload);
                    safeWriteJSON(storageKey, savedComments);
                    liveSigSet.add(sig);
                    saveSigSet(liveSigSet);

                    renderSavedComment(payload, commentsList);
                    updateTotal();
                }, acc);
            });
        }

        block.querySelectorAll('textarea').forEach((t) => {
            t.value = '';
        });
        block.querySelectorAll('.comment__item').forEach(enforceReplyLimit);
        updateTotal();

        scheduleLiveComments();
    });
});

/* ===== block_qty_countdown ===== */
function startQtyCountdown() {
    const qtyEl = document.getElementById('qty');
    if (!qtyEl) return;

    let current = 5;
    qtyEl.textContent = current;

    const interval = setInterval(() => {
        if (current > 1) {
            current--;
            qtyEl.textContent = current;
        } else {
            clearInterval(interval);
        }
    }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
    const step5 = document.getElementById("step5");
    if (step5) {
        observeDisplayChange(step5, startQtyCountdown);
    }
});


document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        const upperCaseWord = document.querySelector(".last__text .text_date_FullWeekday");

        if (upperCaseWord) {
            const text = upperCaseWord.textContent;
            upperCaseWord.textContent = text.charAt(0).toUpperCase() + text.slice(1);
        }
    }, 1000);


});
