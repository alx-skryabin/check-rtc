import React from 'react'
import './ButtonGradient.css'

export default function ButtonGradient({
                                           action,
                                           text,
                                           size = 'medium',
                                           disabled = false
                                       }) {
    const classes = `animate-gradient animate-gradient-${size} waves-effect waves-light`

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
