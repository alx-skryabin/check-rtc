import React from 'react'
import Context from './context'
import Header from './components/Header/Header'
import Loader from './components/Loader/Loader'
import Container from './components/Container/Container'
import WebRTC from './WebRTC/WebRTC'
import SoundLine from './components/SoundMeter/SoundLine'
import I18n from './I18n/I18n'
import {defEnableDebug, parseDevices, setFavicon} from './components/Tools/tools'
import './App.css'

const requestedDevices = {
    audio: true,
    video: true
}

const initialState = {
    lang: I18n.defaultLang,
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
        this.data = {
            getState: () => this.state,
            updateState: state => this.setState(state)
        }

        this.webRTC = null
        this.soundLine = new SoundLine()
    }

    handlers(e) {
        const action = e.target.dataset.action
        if (!action) return

        switch (action) {
            case 'start':
                console.info('start stream')
                this.start(e.target)
                break
            case 'stop':
                console.info('stop all')
                this.stop()
                break
            case 'call':
                console.info('calling')
                this.call(e.target)
                break
            case 'hangup':
                console.info('hangup call')
                this.hangup()
                break
            case 'lang':
                console.info('change lang')
                this.switchLang(e.target.dataset.lang)
                break
            case 'debug':
                console.info('debug:')
                console.dir(this.state)
                break
        }
    }

    start($btn) {
        $btn.innerText = I18n.t('buttons.loading')
        $btn.disabled = true

        navigator.mediaDevices.getUserMedia(requestedDevices)
            .then(stream => {
                this.webRTC.localStream = stream
                this.webRTC.$localVideo.srcObject = stream
                this.soundLine.runSoundLine(stream)

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
                $btn.innerText = I18n.t('buttons.start')
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
        this.soundLine.resetSoundLine()
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
                    this.soundLine.initElem()
                })
        } catch (e) {
            console.log('Не подключены устройства', e)
        }
    }

    switchLang(current) {
        this.setState({lang: I18n.anotherLang(current)})
    }

    render() {
        return (
            <Context.Provider value={this.data}>
                <div className="ts__app" onClick={this.handlers.bind(this)}>
                    <Header/>

                    {this.state.loader ? <Loader/> : <Container/>}
                </div>
            </Context.Provider>
        )
    }
}
