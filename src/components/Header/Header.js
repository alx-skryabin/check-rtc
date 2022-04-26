import React from 'react'
import ButtonsSystem from './ButtonsSystem/ButtonsSystem'
import {FormattedMessage} from 'react-intl'

export default function Header() {
  return (
    <div className="ts__app-header">
      <h1 className="ts__app-title">
        <FormattedMessage
          id="Header.title"
          defaultMessage="Diagnostics of video consultation"
        />
      </h1>

      <ButtonsSystem/>
    </div>
  )
}
