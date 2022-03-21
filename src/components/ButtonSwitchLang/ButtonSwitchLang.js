import React, {useContext} from 'react'
import Context from '../../context'
import './ButtonSwitchLang.css'

export default function ButtonSwitchLang() {
    const lang = useContext(Context).getState().lang

    return (
        <div className="ts__app-lang" data-action='lang' data-lang={lang}>
            {lang}
        </div>
    )
}
