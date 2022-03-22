import {locales} from './locales'

export default class I18n {
    static lang = 'ru'

    static get defaultLang() {
        // define language by browser
        return I18n.lang
    }

    static anotherLang(current) {
        I18n.lang = (current === 'ru') ? 'en' : 'ru'
        return I18n.lang
    }

    static t(path) {
        const base = locales[I18n.lang]
        const empty = 'not found'

        if (!path || typeof path !== 'string') return empty

        try {
            const result = path.split('.')
                .reduce((all, item) => all[item], base)

            return typeof result === 'string' ? result : empty
        } catch (e) {
            console.warn(path, '- path translate not exist!')
            return path
        }
    }
}
