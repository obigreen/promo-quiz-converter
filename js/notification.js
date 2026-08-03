const notifContainer = document.querySelector('.notif');
const notifList = notifContainer.querySelector('.notif__list');
const notifTemplate = notifContainer.querySelector('.notif__template li');

const reviewAuthorAlternates = ["reviewAuthor6", "reviewAuthor7"];
let nameSwitchIndex = 0;
let translations = {};

function createNotificationFromTemplate() {
    const li = notifTemplate.cloneNode(true);

    li.style.display = 'flex';
    li.classList.remove('notif--hide');
    li.classList.add('notif--show');

    li.addEventListener('click', () => li.remove());
    return li;
}

function sendNotificationFromTemplate() {
    const activeNameKey = reviewAuthorAlternates[nameSwitchIndex];
    nameSwitchIndex = (nameSwitchIndex + 1) % reviewAuthorAlternates.length;

    // подмена имени динамически (не в JSON напрямую)
    translations["text_popup_1_name"] = `[[${activeNameKey}]]`;

    for (const key in translations) {
        const elements = document.querySelectorAll(`.${key}`);
        if (!elements.length) continue;

        const value = replacePlaceholders(translations[key], contentTokens);

        elements.forEach(el => {
            el.innerHTML = value;
        });
    }

    const notif = createNotificationFromTemplate();
    notifList.prepend(notif);
    hideNotification(notif);
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
    setTimeout(startNotifications, 5000);
}

setTimeout(startNotifications, 5000);
