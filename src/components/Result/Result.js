import React, {useContext, useEffect} from 'react'
import LocalVideo from '../LocalVideo/LocalVideo'
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
                <div className={defineStatusDevice(video)} data-position="bottom" data-tooltip={video ? 'Подключена' : 'Неподключена'}>
                    <i className="fas fa-video"/>
                    <span>Камера</span>
                </div>
                <div className={defineStatusDevice(audio)} data-position="bottom" data-tooltip={audio ? 'Подключен' : 'Неподключен'}>
                    <i className="fas fa-microphone"/>
                    <span>Микрофон</span>
                </div>
            </div>

            <LocalVideo visible={isStarted}/>

            <UserInfo/>
        </div>
    )
}

function defineStatusDevice(device) {
    const baseClass = 'ts__app-devices-item tooltipped'
    const statusClass = device ? 'ts__app-devices__success' : 'ts__app-devices__error'
    return `${baseClass} ${statusClass}`
}
