import React, {useContext} from 'react'
import Context from '../../context'
import './ButtonSwitch.css'

export default function ButtonSwitch() {
    const {lang, theme} = useContext(Context).getState()

    return (
        <>
            <div className="ts__app-lang" data-action='lang' data-lang={lang}>
                {lang}
            </div>
            <i className="ts__app-theme fas fa-adjust" data-action='theme' data-theme={theme}/>
        </>
    )
}


