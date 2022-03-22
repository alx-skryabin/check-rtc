import React, {useContext} from 'react'
import Context from '../../context'
import ButtonSwitch from '../ButtonSwitch/ButtonSwitch'
import I18n from '../../I18n/I18n'

export default function Header() {
    const debug = useContext(Context).getState().debug

    return (
        <>
            <h1 className="ts__app-title">{I18n.t('mainTitle')}</h1>
            {debug && <i className="fas fa-bug ts__app-debug" data-action='debug'/>}
            <ButtonSwitch/>
        </>
    )
}
