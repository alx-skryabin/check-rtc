import React from 'react'
import './ButtonGradient.css'

export default function ButtonGradient({
                                           action,
                                           text,
                                           disabled = false
                                       }) {
    const classes = `animate-gradient waves-effect waves-light ${defineClassStatus(action)}`

    return (
        <button
            className={classes}
            data-action={action}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

function defineClassStatus(action) {
    return (action === 'hangup' || action === 'stop')
    ? 'animate-gradient-warn' : ''
}
