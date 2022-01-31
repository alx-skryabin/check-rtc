import React from 'react'
import './ButtonGradient.css'


export default function ButtonGradient({action, text, size}) {
    size = size || 'medium'
    const classes = `animate-gradient animate-gradient-${size} waves-effect waves-light`

    return (
        <div className={classes} data-action={action}>{text}</div>
    )
}
