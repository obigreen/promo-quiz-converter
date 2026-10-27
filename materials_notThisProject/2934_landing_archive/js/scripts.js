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
const stepElementMap = {
    5: 3,
    6: 4
};

function getStepElement(stepNumber) {
    const mappedStepNumber = Object.prototype.hasOwnProperty.call(stepElementMap, stepNumber)
        ? stepElementMap[stepNumber]
        : stepNumber;
    return document.getElementById('step' + mappedStepNumber);
}

function prevStep() {
    step--;
    // toggleMenuButtons()
    hideStep(step + 1)
    showStep(step)

}


function flow(el) {
    let comments = document.getElementById('comments');
    let securitycheck = document.getElementById('securitycheck');
    let modal01 = document.getElementById("modal01");
    switch (Number(step)) {
        case 0: {
            showElement(comments);
            showElement(securitycheck);
            scrollToTop();
            break;
        }
        case 1: {
            hideLastStep();
            setTimeout(() => {
                showCurrentStep();
                startLoader();
            }, 1000);

            hideElement(comments);
            hideElement(securitycheck);
            break;
        }
        case 2: {
            hideLastStep();

            setTimeout(() => {

                showCurrentStep();
                showElement(comments);
                showElement(securitycheck);
            }, 1000);

            break;
        }
        case 3: {
            showStep(2);
            showModal(modal01, 0.5);
            showElement(comments);
            showElement(securitycheck);
            break;
        }
        case 4: {
            showStep(2);
            showElement(comments);
            showElement(securitycheck);
            hideElementWithAnim(modal01);
            break;
        }
        case 5: {
            hideStep(2);
            setTimeout(() => {
                showCurrentStep();
            }, 1000)
            setTimeout(() => {
                showElement(comments);
                showElement(securitycheck);
            }, 1100)

            break;
        }
        case 6: {
            hideStep(5);
            hideElementWithAnim(comments);
            hideElementWithAnim(securitycheck);
            let step6 = getStepElement(6);
            showElement(step6);
            startOrderFrameProcesses()
            break;
        }
        case 7: {
            openUrl(el)
            break;
        }
        default: {
            hideLastStep();
            setTimeout(() => {
                showCurrentStep();
            }, 1000)
            break;
        }
    }
}

/* ===== block_js ===== */
async function openUrl(el) {
    step--;
    saveStepToLocalStorage(step);
    waitOn(el);
    fbButtonClickEvent();

    productImageSrc = document.querySelector('.product-item-image').src;
    try {
        productImageSrc = await getShortImageSrc() || productImageSrc;
    } catch (e) {
    }

    if (typeof offerUrl === 'string') {
        offerUrl = new URL(offerUrl, window.location.origin);
    }

    offerUrl.searchParams.set('sub_id_15', productImageSrc);

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
    let stepDiv = getStepElement(stepNumber)
    showElement(stepDiv);
    startFadeInAnim(stepDiv, animTimeInSec)

}

// Скрывает конкретный шаг
function hideStep(stepNumber, animTimeInSec = 1) {
    let stepDiv = getStepElement(stepNumber)
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
    // Создаем экземпляр MutationObserver
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'style') {
                const display = window.getComputedStyle(element).display;
                if (display !== 'none' || display !== '') {
                    callback();
                }
            }
        });
    });

    // Наблюдаем за изменением атрибутов элемента
    observer.observe(element, {
        attributes: true,
        attributeFilter: ['style']
    });

    // Проверяем начальное состояние элемента
    const display = window.getComputedStyle(element).display;
    if (display !== 'none') {
        callback();
    }
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

    await applyTranslations(translation);
    const countElems = document.querySelectorAll('.main_top_content_1_item_count');
    countElems.forEach(el => {
        el.textContent = itemAvailableCount;
    });
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

function resolveTranslationText(text) {
    return text
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
        .replaceAll("{_offertitle}", offerTitle)
        .replaceAll("{_product}", product);
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
            let text = resolveTranslationText(translate[key]).replaceAll(currencyRegex, symbol)


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

    return filteredKeys;
}

/* ===== block_popup_1 ===== */
let notification = document.querySelector('.notification');
let notificationClose = document.querySelector('.notification__closeIcon');

window.addEventListener('load', function () {
    //Получам из локал стораж popupshowed
    // const popupshowed = localStorage.getItem('popupshowed');
    const popupshowed = getFromLocalStorage('popupShowed');

    //Если такого значения там нет или оно не тру показываем поп ап
    if (popupshowed != 'true') {
        setTimeout(() => {
            notification.style.display = 'block';
            notification.style.animation = 'fadeIn 1s ease';
            //отмечаем что попап показан
            // localStorage.setItem('popupshowed', 'true');
            saveToLocalStorage('popupShowed', 'true');

        }, 5000);
        setTimeout(() => {
            notification.style.animation = 'fadeOut 1s ease';

        }, 10000);
        setTimeout(() => {
            notification.style.display = 'none';

        }, 11000);
        notificationClose.addEventListener('click', function () {
            notification.style.display = 'none';

        });
    }
});
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

/* ===== block_main_top_content_3_carousel_counter ===== */
const storedCount = getFromLocalStorage('itemAvailableCount');
let itemAvailableCount = storedCount === null ? 50 : parseInt(storedCount, 10);
let isTopContentFunctionStarted = false;
let decreaseInterval = null;


function startDecreasingItems() {
    if (itemAvailableCount <= 5) return;

    if (!isTopContentFunctionStarted) {
        isTopContentFunctionStarted = true;
        decreaseInterval = setInterval(decreaseItems, 5000);
    }
}

function decreaseItems() {
    const topContentItemCountElements = document.querySelectorAll('.main_top_content_1_item_count');
    let random = getRandomInt(1, 5);

    itemAvailableCount -= random;

    if (itemAvailableCount <= 5) {
        clearInterval(decreaseInterval);
        isTopContentFunctionStarted = false
    }

    saveToLocalStorage('itemAvailableCount', itemAvailableCount);

    topContentItemCountElements.forEach((element) => {
        element.textContent = itemAvailableCount;
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const topContentItemCountElements = document.querySelectorAll('.main_top_content_1_item_count');
    topContentItemCountElements.forEach((el) => (el.innerHTML = itemAvailableCount));

    startDecreasingItems();
});
/* ===== block_main_top_content_3_carousel_counter ===== */


/* ===== block_main_top_content_3_carousel ===== */

document.addEventListener('DOMContentLoaded', function () {
    // createSizeElements();
    // createSexElemetns();
    createDynamicContainers("text_main_top_content_3_selector_", "root_dynamic_containers");

})

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


/* ===== block_quiz_1_auto ===== */

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        startQuiz();
    }, 1000);
});

let timer = document.getElementById('timer');
let quetions = document.getElementById('quetions');
let questions = document.querySelectorAll('.question');
let question = 0;
let questionsCount = questions.length;
let totalQuestionsText = document.querySelectorAll('.question-total');
let seconds = 120; // Время в секундах (2 минуты)
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
        const questionText = resolveTranslationText(translation[questionKey]);

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
        const answerText = resolveTranslationText(translation[answerKey]);

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
    loadQuizState(); // Восстанавливаем состояние
    createQuiz();
    questions = document.querySelectorAll('.question');
    questionsCount = questions.length;
    totalQuestionsText = document.querySelectorAll('.question-total');
    setClickListeners();
    timer.style.opacity = "1";
    totalQuestionsText.forEach(function (questionTotal) {
        questionTotal.innerHTML = questionTotal.innerHTML.split(" ")[0] + " " + questionsCount;
    });

    setTimeout(function () {
        quetions.style.display = 'inline-block';
        quetions.style.animation = 'fadeInFirst 0.5s ease forwards';
    }, 800);

    setTimeout(function () {
        questions[question].querySelectorAll(".quetion__btn").forEach(function (quetion1btn) {
            quetion1btn.removeAttribute('disabled');
        });
        questions[question].style.display = 'block';
        scrollToElementBottom(quetions);
    }, 1200);
}

function setClickListeners() {
    questions.forEach(function (el) {
        let btns = el.querySelectorAll('.quetion__btn');

        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                let currentQuestion = questions[question];

                // Меняем цвет таймера на красный
                timer.style.color = 'red';

                if (question || !question) {
                    startQuizCountDown(); // Начинаем отсчет таймера
                }

                currentQuestion.querySelectorAll('.quetion__btn').forEach(function (quetion2btn) {
                    quetion2btn.setAttribute('disabled', 'true');
                });

                question++;
                saveQuizState(); // Сохраняем состояние

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
                    queCounter.textContent = question + 1; // Обновляем текст счетчика
                    saveQuizState(); // Сохраняем состояние после изменения вопроса
                    scrollToElementBottom(quetions);
                    const height = quetions.getBoundingClientRect().height;
                    const minHeight = parseFloat(quetions.style.minHeight) || 0;
                    if (minHeight < height) {
                        quetions.style.minHeight = `${height}px`;
                    }
                }, 700);

                setTimeout(function () {
                    nextQuestion.querySelectorAll('.quetion__btn').forEach(function (quetion2btn) {
                        quetion2btn.removeAttribute('disabled');
                    });
                }, 1200);
            });
        });
    });
}

let isQuizTimerStarted = false;

function startQuizCountDown() {
    if (!isQuizTimerStarted) {
        isQuizTimerStarted = true;

        countdownInterval = setInterval(function () {
            if (seconds <= 0) {
                clearInterval(countdownInterval);
                timer.style.color = 'red'; // Таймер становится красным
                return; // Таймер завершен
            }

            seconds--;

            // Обновляем отображение таймера
            updateTimerDisplay();

            // Сохраняем состояние каждую секунду
            saveQuizState();
        }, 1000);
    }
}

function saveQuizState() {
    saveToLocalStorage('currentQuestion', question);
    saveToLocalStorage('remainingTime', seconds);
    saveToLocalStorage('queCounter', question + 1); // Сохраняем номер текущего вопроса
}

function loadQuizState() {
    const savedQuestion = getFromLocalStorage('currentQuestion');
    const savedTime = getFromLocalStorage('remainingTime');
    const savedQueCounter = getFromLocalStorage('queCounter'); // Получаем сохраненный номер вопроса

    if (savedQuestion !== null) {
        question = parseInt(savedQuestion);
    }

    if (savedTime !== null) {
        seconds = parseInt(savedTime);
        updateTimerDisplay();
    }

    if (savedQueCounter !== null) {
        queCounter.textContent = savedQueCounter; // Восстанавливаем номер вопроса
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
let loader = document.querySelector('.loader');
let loaderItem1 = document.querySelector('.loader__item-1');
let loaderItem2 = document.querySelector('.loader__item-2');
let loaderItem3 = document.querySelector('.loader__item-3');


function startLoader() {
    setTimeout(function () {
        // hideEls.array.forEach(element => {
        //     element.style.display = 'none';
        // });
        // loader.style.animation = 'fadeIn 1s ease-in-out';


    }, 1200)
    setTimeout(function () {
        loaderItem1.style.animation = 'fadeIn 1s ease-in-out';
        loaderItem1.style.display = 'block';
    }, 3000)
    setTimeout(function () {
        loaderItem2.style.animation = 'fadeIn 1s ease-in-out';
        loaderItem2.style.display = 'block';
    }, 4500)
    setTimeout(function () {
        loaderItem3.style.animation = 'fadeIn 1s ease-in-out';
        loaderItem3.style.display = 'block';
    }, 5500)
    setTimeout(function () {
        nextStep()
    }, 6500)
}

/* ===== block_boxes_2 ===== */
let boxes2 = document.getElementById('boxes-2');
let box = document.querySelectorAll('.box');
let prizeFlag = false;
let boxOpened = false;
let prize = document.querySelector('.prize');
let hide = document.querySelector('.hide');
let lastSpinner = document.querySelector('.last__spinner');
let show = document.querySelector('.show');

function reopenBox() {
    var boxIndex = localStorage.getItem('openedBox');
    var boxIndex = getFromLocalStorage('openedBox');
    if (boxIndex != null) {
        let boxElement = box[boxIndex];
        boxElement.classList.add('clicked');
        let lid = boxElement.querySelector('.lid');
        let inside = boxElement.querySelector('.inside');
        setTimeout(() => {

            inside.style.transform = 'translate(0px, 0px)';
        }, 500)
        setTimeout(() => {
            prizeFlag = true;
            boxOpened = false
        }, 2000);
    }
}

function boxClickHandler(boxElement) {
    if (boxElement.classList.contains("clicked")) {
        return;
    }
    if (boxOpened) {
        return;
    }
    let boxIndex = Array.from(box).indexOf(boxElement);
    // console.log("Box Index: " + boxIndex);

    localStorage.setItem('openedBox', boxIndex);
    saveToLocalStorage('openedBox', boxIndex)

    boxOpened = true;
    let lid = boxElement.querySelector('.lid');
    let inside = boxElement.querySelector('.inside');
    if (prizeFlag === true) {
        let prizes = boxElement.querySelector('.boxes_2__prize');
        prizes.style.opacity = '1';


        setTimeout(() => {

            prizes.classList.add('open')
            inside.style.transform = 'translate(0px, 0px)';
        }, 500)
        setTimeout(() => {
            document.querySelector(".prize-layout").classList.toggle('hidden')
            prize.style.animation = 'scaler 1s ease-in-out forwards';
            prize.style.display = 'block';
            confetti({
                particleCount: 300,
                spread: 70,
                origin: {y: 0.6},
                zIndex: 99999,
            });
        }, 2000);
        setTimeout(() => {
            boxOpened = false
            nextStep(boxElement);

        }, 3000);

    } else {
        // lid.style.transform = 'translateY(-40px)';

        setTimeout(() => {

            inside.style.transform = 'translate(0px, 0px)';
        }, 500)
        setTimeout(() => {
            prizeFlag = true;
            boxOpened = false
            nextStep(boxElement);
        }, 2000);

    }

};


box.forEach(function (boxElement) {
    boxElement.addEventListener('click', () => boxClickHandler(boxElement))
});


reopenBox();
// observeDisplayChange(boxes2.parentElement, reopenBox)


/* ===== block_modal_1 ===== */
let okBtn3 = document.querySelector('.modal_1_btn');

okBtn3.addEventListener('click', function () {
    unlockScroll();
    nextStep(okBtn3);
})

/* ===== block_comments_1 ===== */
document.addEventListener('DOMContentLoaded', function () {
    const commentBlocks = document.querySelectorAll('.comments-block');

    commentBlocks.forEach(function (block) {
        const textarea = block.querySelector('textarea');
        const placeholder = block.querySelector('.placeholder');
        const commentButtonRight = block.querySelector('.comment-button-right button');
        const commentButtonLeftP = block.querySelector('.comment-button-left p');
        const commentButtonLeftCheckbox = block.querySelector('.comment-button-left [type=checkbox]');

        const replyBtns = block.querySelectorAll('.reply-btn');
        const likeBtns = block.querySelectorAll('.like-btn');

        textarea.addEventListener('keyup', function () {
            const text_length = textarea.value.length;
            if (text_length <= 0) {
                commentButtonRight.classList.add('disabled');
                commentButtonRight.disabled = true;
                placeholder.style.display = 'block';
            } else {
                commentButtonRight.classList.remove('disabled');
                commentButtonRight.disabled = false;
                placeholder.style.display = 'none';
            }

            const text_remaining = 6 - text_length;

            if (commentButtonLeftCheckbox.checked) {
                if (text_remaining <= 0) {
                    commentButtonLeftP.style.display = 'none';
                    commentButtonRight.classList.remove('disabled');
                    commentButtonRight.disabled = false;
                } else {
                    commentButtonLeftP.style.display = 'block';
                    commentButtonRight.classList.add('disabled');
                    commentButtonRight.disabled = true;
                }
            }
        });

        commentButtonRight.addEventListener('click', function () {
            textarea.value = '';
            placeholder.style.display = 'block';
            try {
                alert(translation.text_comments_1_alert3);
            } catch (e) {
                alert("Thank you! The comment has been submitted for moderation.");
            }
        });

        replyBtns.forEach(function (el) {
            el.addEventListener('click', function () {
                try {
                    alert(translation.text_comments_1_alert4);
                } catch (e) {
                    alert("Forbidden action. You are not authenticated.");
                }
            });
        });

        // === Likes ===
        block.querySelectorAll('.comment__item').forEach((item, idx) => {
            const likeContainer = item.querySelector('.comment__actions');
            const likeBtn = item.querySelector('.like-btn');
            const likesCounter = item.querySelector('.likes_counter');
            const storageKey = `comment_${idx}_liked`;


            if (getFromLocalStorage(storageKey) === 'true') {
                likesCounter.classList.add('incremented');
                likesCounter.textContent = Number(likesCounter.textContent) + 1;
            }


            function toggleLike() {

                const wasLiked = getFromLocalStorage(storageKey) === 'true';
                let count = Number(likesCounter.textContent);

                if (wasLiked) {
                    count--;
                    likesCounter.classList.remove('incremented');
                    saveToLocalStorage(storageKey, 'false');
                } else {
                    count++;
                    likesCounter.classList.add('incremented');
                    saveToLocalStorage(storageKey, 'true');
                }

                likesCounter.textContent = count;
            }

            if (likeContainer) {
                likeContainer.style.cursor = 'pointer';
                likeContainer.addEventListener('click', toggleLike);
            }

            if (likeBtn) {
                likeBtn.style.cursor = 'pointer';
                likeBtn.addEventListener('click', toggleLike);
            }
        });


        block.querySelectorAll('textarea').forEach(t => t.value = '');
    });
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

/* ===== block_order_1 ===== */

function getOfferUrlParams() {
    try {
        const offerUrlValue = offerUrl instanceof URL ? offerUrl.toString() : String(offerUrl || '');
        const [, queryString = ''] = offerUrlValue.split('?');
        if (!queryString) {
            return [];
        }
        return queryString
            .split('&')
            .filter(Boolean)
            .map(item => item.split('='));
    } catch (e) {
        return [];
    }
}

function upsertHiddenField(form, name, value) {
    if (!form || !name) {
        return;
    }
    let field = form.querySelector(`input[type="hidden"][name="${name}"]`);
    if (!field) {
        field = document.createElement('input');
        field.setAttribute('type', 'hidden');
        field.setAttribute('name', name);
        form.appendChild(field);
    }
    field.setAttribute('value', value ?? '');
}

function syncOfferParamsToForm(form) {
    const params = getOfferUrlParams();
    params.forEach(([name, value]) => {
        upsertHiddenField(form, name, value);
    });
}

document.getElementById('mForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const form = document.getElementById("mForm");
    try {
        this.querySelectorAll("input[name='_lp'], input[name='_token']").forEach(input => input.remove());
    } catch (e) {
    }
    syncOfferParamsToForm(form);

    let valid = true;

    valid = validate()
    console.log(valid)
    if (valid) {
        let btn = document.getElementById('startBtn');
        btn.disabled = true;
        waitOn(btn)
        productImageSrc = document.querySelector('.product-item-image').src
        try {
            productImageSrc = await getShortImageSrc() || productImageSrc; // И ТУТ
        } catch (e) {
        }
        let fieldUpdateResult = updateHiddenFieldValue('sub_id_15', productImageSrc)
        if (!fieldUpdateResult) {
            const mForm = document.getElementById('mForm')
            if (mForm) {
                const field = document.createElement('input');
                field.setAttribute('type', 'hidden');
                field.setAttribute('name', 'sub_id_15');
                field.setAttribute('value', productImageSrc);
                mForm.appendChild(field);

            } else {
                console.error("Форма с ID 'mForm' не найдена.");
            }
        }
        event.target.submit();
    }
})

function findFirstInvalid() {
    let mForm = document.getElementById("mForm");
    let allInputs = mForm.querySelectorAll('.input');
    var firstInvalid = null;
    allInputs.forEach((input) => {
        if (!input.classList.contains("valid") && input.type != "hidden") {
            console.log(input);
            if (firstInvalid == null) {
                firstInvalid = input;
                console.log(firstInvalid)
            }
        }
    })
    console.log(firstInvalid);
    shakeInvalid(firstInvalid);
    if (!isElementVisible(firstInvalid, 20)) {
        scrollToElementTop(mForm, 20);
    }

    firstInvalid.focus();
}


function shakeInvalid(el) {
    if (el) {
        el.style.animation = 'shake .5s ease infinite';
        setTimeout(() => {
            el.style.animation = 'unset';
        }, 1000);
    }

}

// Очистка поля ввода при нажатии на кнопку
document.querySelectorAll('.input-clear-button').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const formGroup = this.closest('.form-group');
        formGroup.querySelector('input').value = '';
        const input = formGroup.querySelector('.input');
        input.classList.remove('valid');
        input.classList.remove('invalid');
    });
});

// Валидация ввода в поле формы
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('keyup', function () {
        const inputElement = this;
        const inputValue = inputElement.value;
        const inputContainer = inputElement.closest('.input');
        if (inputValue.length >= 1) {
            inputContainer.classList.add('valid');
            inputContainer.classList.remove('invalid');
        } else {
            inputContainer.classList.remove('valid');
            inputContainer.classList.add('invalid');
        }
        if (inputValue.length < 1) {
            inputContainer.classList.remove('valid');
            inputContainer.classList.remove('invalid');
        }
        validate();
    });
});

// Валидация ввода номера телефона
document.querySelectorAll('.js-phone-input').forEach(input => {
    input.addEventListener('keypress', function (event) {
        event = event || window.event;
        if (event.charCode && event.charCode !== 0 && event.charCode !== 46 && (event.charCode < 48 || event.charCode > 57)) {
            event.preventDefault();
        }
    });
});

// Функция для проверки корректности email
function validateEmail(email) {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}


function validatePhone(phone) {
    var re = /^\d{5,}$/;
    return re.test(String(phone));
}

function validateZipCode(zipCode) {
    var re = /^\d{5}(-\d{4})?$/;
    return re.test(String(zipCode));
}


// Валидация email
function validate() {
    var valid = true;
    const email = document.querySelector('.js-email-input').value;
    const phone = document.querySelector('.js-phone-input').value;
    const inputEmailContainer = document.querySelector('.js-email-input').closest('.form-group').querySelector('.input');
    const inputPhoneContainer = document.querySelector('.js-phone-input').closest('.form-group').querySelector('.input');
    if (email !== '') {
        if (validateEmail(email)) {
            inputEmailContainer.classList.add('valid');
            inputEmailContainer.classList.remove('invalid');
        } else {
            inputEmailContainer.classList.remove('valid');
            inputEmailContainer.classList.add('invalid');
            valid = false;
        }
    } else {
        inputEmailContainer.classList.remove('valid');
        inputEmailContainer.classList.remove('invalid');
        valid = false;
    }
    if (phone !== '') {
        if (validatePhone(phone)) {
            inputPhoneContainer.classList.add('valid');
            inputPhoneContainer.classList.remove('invalid');
        } else {
            inputPhoneContainer.classList.remove('valid');
            inputPhoneContainer.classList.add('invalid');
            valid = false;
        }
    } else {
        inputPhoneContainer.classList.remove('valid');
        inputPhoneContainer.classList.remove('invalid');
        valid = false;
    }
    return valid;
}

// Переход к следующему этапу
document.querySelectorAll('.js-pickup').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('page_box').style.display = 'none';
        document.querySelector('.two_modal_icon_Two').style.display = 'none';
        document.querySelector('.order-data-wrp').style.display = 'flex';
    });
});

// Проверка соглашения
document.getElementById('agreement__1').addEventListener('click', function () {
    if (this.checked) {
        document.querySelector('.js-submit-button').classList.remove('disable');
    } else {
        document.querySelector('.js-submit-button').classList.add('disable');
    }
});

// Обработка формы при отправке
document.querySelector('.cart-form').addEventListener('submit', function () {
    const inputField = document.getElementById('phoneInput');
    const inputValue = inputField.value.replace(/[^0-9]/g, '');
    inputField.value = inputValue;
});

// Обработка URL параметров
syncOfferParamsToForm(document.getElementById("mForm"));


async function startOrderFrameProcesses() {
    const lastCards = document.querySelectorAll('.last__card');
    const loaderSpin = document.querySelector('.loader-spin');
    lastCards.forEach(function (el) {
        el.style.display = 'none'
    })

    const orderDataWrp = document.querySelector('.order-data-wrp');
    orderDataWrp.style.display = 'none'
    if (flagImgUrl == '' || countryCallingCode == '') {
        await setFlagImage();
    }

    // flag.src = flagImgUrl;
    document.querySelector('.country-input__value').textContent = countryCallingCode;
    document.getElementById('countryCodeHiddenField').value = countryCallingCode;


    lastCards.forEach(el => {
        el.style.animation = 'fadeOut 1s ease';
    });

    setTimeout(() => {
        lastCards.forEach(el => {
            el.style.display = 'none';
        });
        loaderSpin.style.display = 'block';
        loaderSpin.style.animation = 'fadeIn 1s ease';
    }, 1000);

    setTimeout(() => {
        loaderSpin.style.animation = 'fadeOut 1s ease';
    }, 3000);

    setTimeout(() => {
        loaderSpin.style.display = 'none';
        // const orderDataWrp = document.querySelector('.order-data-wrp');
        orderDataWrp.style.animation = 'slideInFromDown 1s ease';
        orderDataWrp.style.display = 'flex';
    }, 4000);
}
