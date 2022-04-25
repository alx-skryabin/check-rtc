import {locales} from './locales'

export default class I18n {
  static #defaultLang = 'ru'
  static #dictionary = null

  static get defineLang() {
    const savedLang = window.localStorage.getItem('lang')
    const lang = savedLang || I18n.#defaultLang
    I18n.#dictionary = locales[lang]
    return lang
  }

  static anotherLang(current) {
    const newLang = (current === 'ru') ? 'en' : 'ru'
    window.localStorage.setItem('lang', newLang)
    I18n.#dictionary = locales[newLang]
    return newLang
  }

  static t(path) {
    const empty = 'not found'

    if (!path || typeof path !== 'string') return empty

    try {
      const result = path.split('.')
        .reduce((all, item) => all[item], I18n.#dictionary)

      return typeof result === 'string' ? result : empty
    } catch (e) {
      console.warn(path, '- path translate not exist!')
      return path
    }
  }
}
