import React, {useContext, useEffect} from 'react'
import ButtonGradient from '../ButtonGradient/ButtonGradient'
import Context from '../../context'
import I18n from "../../I18n/I18n";

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
        return <ButtonGradient action='stop' text={I18n.t('buttons.complete')}/>
    }

    return <ButtonGradient action='start' text={I18n.t('buttons.start')}/>
}

function ToggleCallButton({props}) {
    if (props.isCalling) {
        return <ButtonGradient action='hangup' text={I18n.t('buttons.hangup')}/>
    }

    return <ButtonGradient action='call' text={I18n.t('buttons.call')} disabled={!props.isStarted}/>
}

function NotConnectDevice() {
    useEffect(() => {
        window.M.toast({
            html: `<i class="fas fa-exclamation-triangle"/> ${I18n.t('tips.devicesDisconnect')}`,
            classes: 'rounded'
        })
    }, [])

    return (
        <div className='ts__app-controls-not-device'>
            <i className="fas fa-exclamation-triangle"/> {I18n.t('tips.devicesDisconnect')}:
        </div>
    )
}
