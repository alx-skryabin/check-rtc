import React, {useContext, useEffect} from 'react'
import ButtonGradient from '../ButtonGradient/ButtonGradient'
import Context from '../../context'

export default function Controls() {
    const state = useContext(Context).getState()
    const {devices: {audio, video}, isStarted, isCalling} = state

    const ViewControl = () => {
        if (!audio || !video) {
            return <NotConnectDevice/>
        }
        else {
            return (
                <>
                    <ToggleStartButton isStarted={isStarted}/>
                    <ToggleCallButton props={{isStarted, isCalling}}/>
                </>
            )
        }
    }

    return (
        <div className='ts__app-controls'>
            <ViewControl/>
        </div>
    )
}

function ToggleStartButton({isStarted}) {
    if (isStarted) {
        return <ButtonGradient action='stop' text='Завершить'/>
    }

    return <ButtonGradient action='start' text='Старт'/>
}

function ToggleCallButton({props}) {
    if (props.isCalling) {
        return <ButtonGradient action='hangup' text='Сбросить'/>
    }

    return <ButtonGradient action='call' text='Позвонить' disabled={!props.isStarted}/>
}

function NotConnectDevice() {
    useEffect(() => {
        window.M.toast({
            html: '<i class="fas fa-exclamation-triangle"/> Некоторые устройства не подключены',
            classes: 'rounded'
        })
    }, [])

    return (
        <div className='ts__app-controls-not-device'>
            <i className="fas fa-exclamation-triangle"/> Некоторые устройства не подключены:
        </div>
    )
}
