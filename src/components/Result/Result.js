import React, {useContext, useEffect} from 'react'
import VideoStreams from '../VideoStreams/VideoStreams'
import UserInfo from '../UserInfo/UserInfo'
import Context from '../../context'
import I18n from '../../I18n/I18n'

export default function Result() {
    const state = useContext(Context).getState()
    const {devices: {audio, video}, isStarted, isCalling} = state

    useEffect(() => {
        const elems = document.querySelectorAll('.tooltipped')
        window.M.Tooltip.init(elems)
    }, [])

    return (
        <div className='ts__app-result'>
            <div className="ts__app-devices">
                <div
                    className={defineStatusDevice(video)}
                    data-position="bottom"
                    data-tooltip={video ? I18n.t('tips.connected') : I18n.t('tips.notConnected')}
                >
                    {video ? <i className="fas fa-video"/> : <i className="fas fa-video-slash"/>}
                    <span>{I18n.t('userInfo.camera.label')}</span>
                </div>
                <div
                    className={defineStatusDevice(audio)}
                    data-position="bottom"
                    data-tooltip={audio ? I18n.t('tips.connected') : I18n.t('tips.notConnected')}
                >
                    {audio ? <i className="fas fa-microphone"/> : <i className="fas fa-microphone-slash"/>}
                    <span>{I18n.t('userInfo.microphone.label')}</span>
                </div>
            </div>

            <div id="SoundMeter" className='ts__meters' style={{display: isStarted ? 'flex' : 'none'}}>
                <meter high="0.25" max="1" value="0"/>
                <div/>
            </div>

            <VideoStreams isStarted={isStarted} isCalling={isCalling}/>

            <UserInfo/>
        </div>
    )
}

function defineStatusDevice(device) {
    const baseClass = 'ts__app-devices-item tooltipped'
    const statusClass = device ? 'ts__app-devices__success' : 'ts__app-devices__error'
    return `${baseClass} ${statusClass}`
}
