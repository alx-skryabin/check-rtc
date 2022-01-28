import React, {useContext} from 'react'
import Context from '../../context'
import './ButtonGradient.css'


export default function ButtonGradient({action, text, size}) {
    const {devices} = useContext(Context)
    // console.log(devices)
    size = size || 'medium'
    const classes = `animate-gradient animate-gradient-${size}`

    action = devices ? action : 'disable'

    return (
        <div className={classes} data-action={action}>{text}</div>
    )
}
