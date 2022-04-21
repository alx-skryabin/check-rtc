import React from 'react'
import Context from './tools/context'
import {Provider} from 'react-redux'
// import WebRTC from './WebRTC/WebRTC'
// import SoundLine from './components/SoundMeter/SoundLine'
// import I18n from './I18n/I18n'
// import {parseDevices, setFavicon} from './components/Tools/tools'
import Theme from './tools/theme'
import './App.css'
import StartButton from './components/StartButton/StartButton'
import Result from './components/Result/Result'
import Header from './components/Header/Header'
import store from './store/store'

const initialState = {
    isStarted: false,
    isCalling: false
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {...initialState}
        this.data = {
            getState: () => this.state,
            setState: state => this.setState(state)
        }

        // this.$favicon = document.querySelector('link[rel=icon]')
        // this.webRTC = null
        // this.soundLine = new SoundLine()
    }

    start($btn) {
        // $btn.innerText = I18n.t('buttons.loading')
        // $btn.disabled = true
        //
        // navigator.mediaDevices.getUserMedia(requestedDevices)
        //     .then(stream => {
        //         this.webRTC.localStream = stream
        //         this.webRTC.$localVideo.srcObject = stream
        //         this.soundLine.runSoundLine(stream)
        //
        //         this.webRTC.$localVideo.onloadeddata = () => {
        //             navigator.mediaDevices.enumerateDevices()
        //                 .then(list => {
        //                     const devices = parseDevices(list)
        //                     this.setState({devices, isStarted: true})
        //                 })
        //         }
        //     })
        //     .catch(e => {
        //         console.log(e)
        //         $btn.innerText = I18n.t('buttons.start')
        //         $btn.disabled = false
        //         window.M.toast({
        //             html: `<i class="fas fa-exclamation-triangle"/> ${I18n.t('tips.mustAccess')}`,
        //             classes: 'rounded'
        //         })
        //     })
    }

    call($btn) {
        // $btn.innerText = I18n.t('buttons.loading')
        // $btn.disabled = true
        //
        // this.webRTC.connectCall(this.setState.bind(this))
    }

    hangup() {
        // if (this.state.isCalling) this.webRTC.disconnectCall()
        // this.setState({isCalling: false})
    }

    stop() {
        // if (this.state.isCalling) this.webRTC.disconnectCall()
        // this.webRTC.disableStreams()
        // this.soundLine.resetSoundLine()
        // this.setState({isStarted: false, isCalling: false})
    }

    checkDevices() {
        // try {
        //     navigator.mediaDevices.enumerateDevices()
        //         .then(list => {
        //             const devices = parseDevices(list)
        //             setFavicon(devices, this.$favicon)
        //             this.setState({devices})
        //             this.webRTC = new WebRTC()
        //             this.soundLine.initElem()
        //         })
        // } catch (e) {
        //     console.log('Не подключены устройства', e)
        // }
    }

    render() {
        return (
            <Context.Provider value={this.data}>
                <Provider store={store}>
                    <div className={Theme.defineClass}>
                        <Header/>
                        <StartButton/>
                        <Result/>
                    </div>
                </Provider>
            </Context.Provider>
        )
    }
}
