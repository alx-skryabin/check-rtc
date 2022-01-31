import React, {useContext} from 'react'
import ButtonGradient from '../ButtonGradient/ButtonGradient'
import Context from '../../context'

export default function Controls() {
    const context = useContext(Context)
    const {devices: {audio, video}, isStarted, isFinish} = context.getState()

    return (
        <div className='ts__app-controls'>
            {(!audio || !video) ? <NotConnectDevice/> : ''}

            {(!audio || !video || isStarted)
                ? '' : <ButtonGradient action='start' text='Запустить тест'/>
            }

            {(isStarted && !isFinish)
                ? <ButtonGradient action='stop' text='Остановить' size='small'/> : ''
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
