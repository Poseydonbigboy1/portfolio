import './styles/app.scss';
import * as ru from './assets/ru.json';
import * as en from './assets/en.json';
// import PhotoSwipeLightbox from 'photoswipe/lightbox';

$(document).ready(function () {
    loadLanguage('ru');

    $('li.nav-item').on('click', (e) => {
        const el = $(e.currentTarget);
        const route = el.data('route').toString();

        $('li.nav-item').removeClass('active');
        el.addClass('active')

        $('section.route').removeClass('showed');
        $(`section.route#${route}`).addClass('showed');
    })

    $('.lan-item').on('click', (e) => {
        const el = $(e.currentTarget);
        const lang = el.data('select-lang').toString();

        $('.lan-item').removeClass('active');
        el.addClass('active')

        loadLanguage(lang);
    });

    // const lightbox = new PhotoSwipeLightbox({
    //     gallery: '.projects-container',
    //     children: '.prject-item',
    //     pswpModule: () => import('photoswipe/dist/photoswipe.esm.js')
    // });
    // lightbox.init();
});

function loadLanguage(lan) {
    let langObject = null;
    switch (lan) {
        case 'ru': langObject = ru; break;
        case 'en': langObject = en; break;
    }
    let sourceStringArray = buildExpression('', langObject);
    sourceStringArray.forEach(f => {
        $(`[data-lang="${f.source}"]`).text(f.dest)
    })
}

function buildExpression(key, obj) {
    return Object.entries(obj)
        .reduce((acc, curr) => {
            if (isLiteralObject(curr[1])) {
                let arr = []
                if (key !== null && key !== '') {
                    arr = buildExpression(`${key}.${curr[0]}`, curr[1]);
                } else {
                    arr = buildExpression(`${curr[0]}`, curr[1]);
                }
                acc.push(...arr);
            } else {
                acc.push({
                    source: key !== null && key !== '' ? `${key}.${curr[0]}` : `${curr[0]}`,
                    dest: curr[1]
                });
            }
            return acc;
        }, []);
}

function isLiteralObject(variable) {
    return (!!variable) && (variable.constructor === Object);
};