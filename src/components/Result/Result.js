import React, {useContext, useEffect} from 'react'
import VideoStreams from '../VideoStreams/VideoStreams'
import UserInfo from '../UserInfo/UserInfo'
import Context from '../../context'


export default function Result() {
    const context = useContext(Context)
    const {devices: {audio, video}, isStarted} = context.getState()

    useEffect(() => {
        const elems = document.querySelectorAll('.tooltipped')
        window.M.Tooltip.init(elems)
    }, [])

    return (
        <div className='ts__app-result'>
            <div className="ts__app-devices">
                <div className={defineStatusDevice(video)} data-position="bottom" data-tooltip={video ? 'Подключена' : 'Не подключена'}>
                    {video ? <i className="fas fa-video"/> : <i className="fas fa-video-slash"/>}
                    <span>Камера</span>
                </div>
                <div className={defineStatusDevice(audio)} data-position="bottom" data-tooltip={audio ? 'Подключен' : 'Не подключен'}>
                    {audio ? <i className="fas fa-microphone"/> : <i className="fas fa-microphone-slash"/>}
                    <span>Микрофон</span>
                </div>
            </div>

            <VideoStreams visible={isStarted}/>

            {/*<UserInfo/>*/}
        </div>
    )
}

function defineStatusDevice(device) {
    const baseClass = 'ts__app-devices-item tooltipped'
    const statusClass = device ? 'ts__app-devices__success' : 'ts__app-devices__error'
    return `${baseClass} ${statusClass}`
}
