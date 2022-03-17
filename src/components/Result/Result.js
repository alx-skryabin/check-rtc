import React, {useContext, useEffect} from 'react'
import VideoStreams from '../VideoStreams/VideoStreams'
import UserInfo from '../UserInfo/UserInfo'
import Context from '../../context'

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
                    data-tooltip={video ? 'Подключено' : 'Не подключено'}
                >
                    {video ? <i className="fas fa-video"/> : <i className="fas fa-video-slash"/>}
                    <span>Камера</span>
                </div>
                <div
                    className={defineStatusDevice(audio)}
                    data-position="bottom"
                    data-tooltip={audio ? 'Подключено' : 'Не подключено'}
                >
                    {audio ? <i className="fas fa-microphone"/> : <i className="fas fa-microphone-slash"/>}
                    <span>Микрофон</span>
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
