import React from 'react'
import I18n from '../../tools/I18n/I18n'
import ButtonsSystem from './ButtonsSystem/ButtonsSystem'

export default function Header() {
    return (
        <div className="ts__app-header">
            <h1 className="ts__app-title">
                {I18n.t('mainTitle')}
            </h1>

            <ButtonsSystem/>
        </div>
    )
}
