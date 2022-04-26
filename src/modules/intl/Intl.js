import React, {useState} from 'react'
import {IntlProvider} from 'react-intl'
import Russian from './lang/ru.json'
import English from './lang/en.json'

export const Context = React.createContext({})

const DEFAULT = 'ru'
const LOCALES = {
  ru: Russian,
  en: English
}

export default function Intl(props) {
  const code = defineLang()
  const [locale, setLocale] = useState(code)
  const [messages, setMessages] = useState(LOCALES[code])

  const selectLanguage = (e) => {
    const newLocale = anotherLang(e.target.dataset.lang)

    setLocale(newLocale)
    setMessages(LOCALES[newLocale])
  }

  return (
    <Context.Provider value={{locale, selectLanguage}}>
      <IntlProvider messages={messages} locale={locale} defaultLocale={DEFAULT}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  )
}

function defineLang() {
  const savedLang = window.localStorage.getItem('lang')
  return savedLang || DEFAULT
}

function anotherLang(current) {
  const newLang = (current === 'ru') ? 'en' : 'ru'
  window.localStorage.setItem('lang', newLang)
  return newLang
}
