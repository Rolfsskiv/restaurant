
Loc = {
    setLang: function (lang) {
        localStorage.setItem('lang', lang)
    },
    getLang: function () {
        if (localStorage.getItem('lang') == undefined) {
            return Loc.default;
        } else {
            return localStorage.getItem('lang');
        }
    },
    get: function (component) {
        return Localizations[Loc.getLang()][component];
    },
    'default': 'ru'
};

var Localizations = {
    ru: {
        cook: {
            title: 'Лучшие рецепты от шеф-поваров, специально для Вас',
            main: 'Главная',
            currentPage: 'Блюдо от Шеф повара',
            h3: 'БЛЮДО ОТ ШЕФА',
            h3x: 'БЛЮДО ОТ ШЕФ ПОВАРА'
        }
    }
};