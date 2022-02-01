import React, {useContext} from 'react'
import ButtonGradient from '../ButtonGradient/ButtonGradient'
import Context from '../../context'

export default function Controls() {
    const context = useContext(Context)
    const {devices: {audio, video}, isStarted} = context.getState()

    return (
        <div className='ts__app-controls'>
            {(!audio || !video) ? <NotConnectDevice/> : ''}

            {(!audio || !video || isStarted)
                ? '' : <ButtonGradient action='start' text='Старт'/>
            }

            {(isStarted)
                ? <ButtonGradient action='stop' text='Стоп' size='small'/> : ''
            }
        </div>
    )
}

function NotConnectDevice() {
    window.M.toast({
        html: '<i class="fas fa-exclamation-triangle"/> Некоторые устройства не подключены',
        classes: 'rounded'
    })

    return (
        <div className='ts__app-controls-not-device'>
            <i className="fas fa-exclamation-triangle"/> Некоторые устройства не подключены:
        </div>
    )
}
