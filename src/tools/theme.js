export default class Theme {
  static #defaultTheme = 'dark' // dark or light
  static #selectedTheme = null

  static get defineTheme() {
    const savedTheme = window.localStorage.getItem('theme')
    const theme = savedTheme || Theme.#defaultTheme
    Theme.#selectedTheme = theme
    return theme
  }

  static get defineClass() {
    const themeClass = (Theme.#selectedTheme === 'dark')
      ? 'ts__app_theme-dark' : 'ts__app_theme-light'

    return `ts__app ${themeClass}`
  }

  static changeTheme(current) {
    const newTheme = (current === 'dark') ? 'light' : 'dark'
    window.localStorage.setItem('theme', newTheme)
    Theme.#selectedTheme = newTheme
    return newTheme
  }
}
