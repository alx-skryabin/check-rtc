import React, {useContext, useEffect, useState} from 'react'
import {detectBrowser, detectDevice, detectOS, detectSpeed, getIP} from '../Tools/tools'
import Context from '../../context'
import I18n from '../../I18n/I18n'
import './UserInfo.css'

export default function UserInfo() {
    const [ip, setIp] = useState('0.0.0.0000')
    const state = useContext(Context).getState()
    const {audio, video} = state.devices
    const {language, onLine, userAgent} = navigator

    useEffect(() => {
      detectSpeed()
      getIP().then(r => {
        setIp(r.ip)
      })
    }, [])

    return (
        <div className="ts__app-info">
            <div className="ts__app-info-item">
                <i className="fas fa-video"/>
                <div className="ts__app-info-title">
                    {I18n.t('userInfo.camera.label')}:
                    <span>{video || I18n.t('userInfo.camera.value')}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="fas fa-microphone"/>
                <div className="ts__app-info-title">
                    {I18n.t('userInfo.microphone.label')}:
                    <span>{audio || I18n.t('userInfo.microphone.value')}</span>
                </div>
            </div>
            <div className="ts__app-info-item">
                <i className="far fa-address-book"/>
                <div className="ts__app-info-title">
                    IP адрес:
                    <span>{ip}</span>
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
                    {I18n.t('userInfo.device.label')}:
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
                    {I18n.t('userInfo.speed.label')}:
                    <span id="speedEnthernet"><i className="fas fa-spinner fa-spin"/></span>
                </div>
            </div>
        </div>
    )
}




