import React from 'react'
import Context from './context'
import Loader from './components/Loader/Loader'
import Container from './components/Container/Container'
import WebRTC from './WebRTC/WebRTC'
import {defEnableDebug, parseDevices, setFavicon} from './components/Tools/tools'
import './App.css'

const requestedDevices = {
    audio: true,
    video: true
}

const initialState = {
    isStarted: false,
    isCalling: false,
    loader: true,
    devices: {
        audio: false,
        video: false
    },
    debug: defEnableDebug()
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.$favicon = document.querySelector('link[rel=icon]')
        this.state = {...initialState}
        this.methods = {
            getState: () => this.state,
            updateState: state => this.setState(state)
        }

        this.webRTC = null
    }

    handlers(e) {
        const action = e.target.dataset.action
        if (!action) return

        switch (action) {
            case 'start':
                console.info('start')
                this.start(e.target)
                break
            case 'stop':
                console.info('stop')
                this.stop()
                break
            case 'call':
                console.info('call')
                this.call(e.target)
                break
            case 'hangup':
                console.info('hangup')
                this.hangup()
                break
            case 'debug':
                console.info('debug:')
                console.dir(this.state)
                break
        }
    }

    start($btn) {
        $btn.innerText = 'Загрузка...'
        $btn.disabled = true

        navigator.mediaDevices.getUserMedia(requestedDevices)
            .then(stream => {
                this.webRTC.localStream = stream
                this.webRTC.$localVideo.srcObject = stream

                this.webRTC.$localVideo.onloadeddata = () => {
                    navigator.mediaDevices.enumerateDevices()
                        .then(list => {
                            const devices = parseDevices(list)
                            this.setState({devices, isStarted: true})
                        })
                }
            })
            .catch(e => {
                console.log(e)
                $btn.innerText = 'Старт'
                $btn.disabled = false
                window.M.toast({
                    html: '<i class="fas fa-exclamation-triangle"/> Необходимо дать разрешения браузеру на использование камеры и микрофона',
                    classes: 'rounded'
                })
            })
    }

    call($btn) {
        $btn.innerText = 'Загрузка...'
        $btn.disabled = true

        this.webRTC.connectCall(this.setState.bind(this))
    }

    hangup() {
        if (this.state.isCalling) this.webRTC.disconnectCall()
        this.setState({isCalling: false})
    }

    stop() {
        if (this.state.isCalling) this.webRTC.disconnectCall()
        this.webRTC.disableStreams()
        this.setState({isStarted: false, isCalling: false})
    }

    componentDidMount() {
        this.checkDevices()
    }

    checkDevices() {
        try {
            navigator.mediaDevices.enumerateDevices()
                .then(list => {
                    const devices = parseDevices(list)
                    setFavicon(devices, this.$favicon)
                    this.setState({devices, loader: false})
                    this.webRTC = new WebRTC()
                })
        } catch (e) {
            console.log('Не подключены устройства', e)
        }
    }

    render() {
        return (
            <Context.Provider value={this.methods}>
                <div className="ts__app" onClick={this.handlers.bind(this)}>
                    <h1 className="ts__app-title">Диагностика видеоконсультации</h1>
                    {this.state.debug && <i className="fas fa-bug ts__app-debug" data-action='debug'/>}

                    {this.state.loader ? <Loader/> : <Container/>}
                </div>
            </Context.Provider>
        )
    }
}
