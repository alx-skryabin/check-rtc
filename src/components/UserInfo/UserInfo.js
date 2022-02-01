import React, {useContext} from 'react'
import {detectBrowser, detectOS, detectSpeed} from '../Tools/tools'
import Context from '../../context'
import './UserInfo.css'

export default function UserInfo() {
    const context = useContext(Context)
    const {language, onLine, userAgent} = navigator
    const {audio, video} = context.getState().devices

    detectSpeed()

    return (
        <div className="ts__app-info">
            <div className="ts__app-info-item">
                <i className="fas fa-video"/>
                <div className="ts__app-info-title">
                    Камера:
                    <span>{video ? 'Подключена' : 'Не подключена'}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fas fa-microphone"/>
                <div className="ts__app-info-title">
                    Микрофон:
                    <span>{audio ? 'Подключен' : 'Не подключен'}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fas fa-microchip"/>
                <div className="ts__app-info-title">
                    RTCPeerConnection:
                    <span>{new RTCPeerConnection(null) ? 'Да' : 'unknown'}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fas fa-desktop"/>
                <div className="ts__app-info-title">
                    Устройство:
                    <span>{detectDevice(userAgent)}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fas fa-cog"/>
                <div className="ts__app-info-title">
                    Система:
                    <span>{detectOS()}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fab fa-internet-explorer"/>
                <div className="ts__app-info-title">
                    Браузер:
                    <span>{detectBrowser()}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fas fa-expand-arrows-alt"/>
                <div className="ts__app-info-title">
                    Размер экрана:
                    <span>{window.screen.width} x {window.screen.height}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fas fa-globe-americas"/>
                <div className="ts__app-info-title">
                    Язык:
                    <span>{language}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fas fa-signal"/>
                <div className="ts__app-info-title">
                    Online:
                    <span>{onLine ? 'Да' : 'Нет'}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fas fa-tachometer-alt"/>
                <div className="ts__app-info-title">
                    Скорость интернета:
                    <span id="speedEnthernet"><i className="fas fa-spinner fa-spin"/></span>
                </div>
            </div>
        </div>
    )
}

function detectDevice(userAgent) {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(userAgent))
        ? 'Мобильное устройство' : 'Персональный компьютер'
}

function getIP() {
    // работает, сделать через useEffect
    return fetch('https://api.ipify.org?format=json')
        .then(r => r.json().ip)
}
