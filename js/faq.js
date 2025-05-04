document.getElementById('faqBtn').addEventListener('click', function () {
    document.getElementById('faq').classList.add('active');
    this.style.display = 'none';
});

document.getElementById('faqClose').addEventListener('click', function () {
    document.getElementById('faq').classList.remove('active');
    document.getElementById('faqBtn').style.display = 'block';
});

document.addEventListener('mouseup', function (event) {
    let faq = document.getElementById('faq');
    if (!faq.contains(event.target)) {
        faq.classList.remove('active');
        document.getElementById('faqBtn').style.display = 'block';
    }
});

document.querySelectorAll('.js-faq-header').forEach(function (header) {
    header.addEventListener('click', function () {
        document
            .querySelectorAll('.js-faq-header')
            .forEach(function (otherHeader) {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('active');
                }
            });
        document.querySelectorAll('.js-faq-body').forEach(function (body) {
            if (body !== header.nextElementSibling) {
                body.style.display = 'none';
            }
        });
        header.classList.toggle('active');
        let body = header.nextElementSibling;
        if (body.style.display === 'block') {
            body.style.display = 'none';
        } else {
            body.style.display = 'block';
        }
    });
});

document.getElementById('faqBtn').addEventListener('click', function () {
    document.getElementById('faq').classList.add('active');
    this.style.display = 'none';
});

document.getElementById('faqClose').addEventListener('click', function () {
    document.getElementById('faq').classList.remove('active');
    document.getElementById('faqBtn').style.display = 'block';
});

document.addEventListener('mouseup', function (event) {
    let faq = document.getElementById('faq');
    if (!faq.contains(event.target)) {
        faq.classList.remove('active');
        document.getElementById('faqBtn').style.display = 'block';
    }
});

document.querySelectorAll('.js-faq-header').forEach(function (header) {
    header.addEventListener('click', function () {
        document
            .querySelectorAll('.js-faq-header')
            .forEach(function (otherHeader) {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('active');
                }
            });
        document.querySelectorAll('.js-faq-body').forEach(function (body) {
            if (body !== header.nextElementSibling) {
                body.style.maxHeight = null;
                body.style.overflow = 'hidden';
                body.style.transition = 'max-height 0.3s ease-out';
            }
        });
        header.classList.toggle('active');
        let body = header.nextElementSibling;
        if (body.style.maxHeight) {
            body.style.maxHeight = null;
        } else {
            body.style.maxHeight = body.scrollHeight + 'px';
        }
    });
});
