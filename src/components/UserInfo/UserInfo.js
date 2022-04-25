import React, {useEffect, useState} from 'react'
import {detectBrowser, detectDevice, detectOS, detectSpeed, getIP} from '../../tools/utils'
import I18n from '../../tools/I18n/I18n'
import './UserInfo.css'

export default function UserInfo() {
  const [ip, setIp] = useState('0.0.0.0000')
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
          <span>{'название камеры' || I18n.t('userInfo.camera.value')}</span>
        </div>
      </div>
      <div className="ts__app-info-item">
        <i className="fas fa-microphone"/>
        <div className="ts__app-info-title">
          {I18n.t('userInfo.microphone.label')}:
          <span>{'название микро' || I18n.t('userInfo.microphone.value')}</span>
        </div>
      </div>
      <div className="ts__app-info-item">
        <i className="far fa-address-book"/>
        <div className="ts__app-info-title">
          {I18n.t('userInfo.IPaddress.label')}:
          <span>{ip}</span>
        </div>
      </div>
      <div className="ts__app-info-item">
        <i className="fas fa-microchip"/>
        <div className="ts__app-info-title">
          RTCPeerConnection:
          <span>{detectRTCPeer() ? I18n.t('simple.yes') : 'unknown'}</span>
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
          {I18n.t('userInfo.system.label')}:
          <span>{detectOS()}</span>
        </div>
      </div>
      <div className="ts__app-info-item">
        <i className="fab fa-internet-explorer"/>
        <div className="ts__app-info-title">
          {I18n.t('userInfo.browser.label')}:
          <span>{detectBrowser()}</span>
        </div>
      </div>
      <div className="ts__app-info-item">
        <i className="fas fa-expand-arrows-alt"/>
        <div className="ts__app-info-title">
          {I18n.t('userInfo.screenSize.label')}:
          <span>{window.screen.width} x {window.screen.height}</span>
        </div>
      </div>
      <div className="ts__app-info-item">
        <i className="fas fa-globe-americas"/>
        <div className="ts__app-info-title">
          {I18n.t('userInfo.language.label')}:
          <span>{language}</span>
        </div>
      </div>
      <div className="ts__app-info-item">
        <i className="fas fa-signal"/>
        <div className="ts__app-info-title">
          Online:
          <span>{onLine ? I18n.t('simple.yes') : I18n.t('simple.no')}</span>
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

function detectRTCPeer() {
  try {
    return new RTCPeerConnection(null)
  } catch (e) {
    console.log('RTCPeerConnection ', e)
    return false
  }
}
