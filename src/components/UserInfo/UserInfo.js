import React from 'react'
import './UserInfo.css'

export default function UserInfo() {
    const {language, onLine, oscpu, userAgent} = navigator

    return (
        <div className="ts__app-info">
            <div className="ts__app-info-item">
                <i className="fas fa-microchip"/>
                <div className="ts__app-info-title">
                    RTCPeerConnection:
                    <span>{new RTCPeerConnection(null) ? 'true' : 'unknown'}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fas fa-mobile-alt"/>
                <div className="ts__app-info-title">
                    Устройство:
                    <span>{detectDevice(userAgent)}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fab fa-windows"/>
                <div className="ts__app-info-title">
                    Система:
                    <span>{oscpu}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fab fa-chrome"/>
                <div className="ts__app-info-title">
                    Браузер:
                    <span>{userAgent}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fas fa-desktop"/>
                <div className="ts__app-info-title">
                    Разрешение экрана:
                    <span>{window.screen.width} x {window.screen.height}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fas fa-language"/>
                <div className="ts__app-info-title">
                    Язык:
                    <span>{language}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fas fa-signal"/>
                <div className="ts__app-info-title">
                    Online:
                    <span>{onLine ? 'true' : 'unknown'}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fas fa-tachometer-alt"/>
                <div className="ts__app-info-title">
                    Скорость интернета:
                    <span>{window.navigator.connection?.downlink || 'unknown'}</span>
                </div>
            </div>
        </div>
    )
}

function detectDevice(userAgent) {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(userAgent))
        ? 'Телефон или планшет' : 'ПК'
}

function getIP() {
    // работает, сделать через useEffect
    return fetch('https://api.ipify.org?format=json')
        .then(r => r.json().ip)
}
