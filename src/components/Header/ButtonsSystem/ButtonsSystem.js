import React, {useContext} from 'react'
import Context from '../../../tools/context'
import {useDispatch, useSelector} from 'react-redux'
import {switchLang, switchTheme} from '../../../store/slices/systemSlice'
import I18n from '../../../tools/I18n/I18n'
import Theme from '../../../tools/theme'
import './ButtonsSystem.css'

export default function ButtonsSystem() {
    const state = useContext(Context).getState()
    const {lang, theme, debug} = useSelector((state) => state.system)
    const dispatch = useDispatch()

    const handlerDebug = () => {
        console.info('debug:')
        console.dir(state)
    }

    const handleSwitchLang = (e) => {
        const lang = I18n.anotherLang(e.target.dataset.lang)
        dispatch(switchLang({lang}))
    }

    const handleSwitchTheme = (e) => {
        const theme = Theme.changeTheme(e.target.dataset.theme)
        dispatch(switchTheme({theme}))
    }

    return (
        <>
            {debug &&
            <i className="fas fa-bug ts__app-debug"
               onClick={handlerDebug}
            />}
            <div
                className="ts__app-lang"
                data-lang={lang}
                onClick={handleSwitchLang}
            >
                {lang}
            </div>
            <i
                className="ts__app-theme fas fa-adjust"
                onClick={handleSwitchTheme}
                data-theme={theme}
            />
        </>
    )
}


