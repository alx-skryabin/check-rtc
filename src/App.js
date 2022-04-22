import React from 'react'
import {useSelector} from 'react-redux'
import Theme from './tools/theme'
import StartButton from './components/StartButton/StartButton'
import Result from './components/Result/Result'
import Header from './components/Header/Header'
import './App.css'

export default function App() {
    const {isSuccess} = useSelector((state) => state.diagnostic.result)

    // this.$favicon = document.querySelector('link[rel=icon]')

    // start($btn) {
    //     navigator.mediaDevices.getUserMedia(requestedDevices)
    //         .then(stream => {
    //             this.webRTC.localStream = stream
    //             this.webRTC.$localVideo.srcObject = stream
    //             this.soundLine.runSoundLine(stream)
    //
    //             this.webRTC.$localVideo.onloadeddata = () => {
    //                 navigator.mediaDevices.enumerateDevices()
    //                     .then(list => {
    //                         const devices = parseDevices(list)
    //                         this.setState({devices, isStarted: true})
    //                     })
    //             }
    //         })
    //         .catch(e => {
    //             console.log(e)
    //             window.M.toast({
    //                 html: `<i class="fas fa-exclamation-triangle"/> ${I18n.t('tips.mustAccess')}`,
    //             })
    //         })
    // }

    // call($btn) {
    //     $btn.innerText = I18n.t('buttons.loading')
    //     $btn.disabled = true
    //
    //     this.webRTC.connectCall(this.setState.bind(this))
    // }

    // hangup() {
    //     if (this.state.isCalling) this.webRTC.disconnectCall()
    //     this.setState({isCalling: false})
    // }

    // stop() {
    //     if (this.state.isCalling) this.webRTC.disconnectCall()
    //     this.webRTC.disableStreams()
    //     this.soundLine.resetSoundLine()
    //     this.setState({isStarted: false, isCalling: false})
    // }

    // checkDevices() {
    //     try {
    //         navigator.mediaDevices.enumerateDevices()
    //             .then(list => {
    //                 const devices = parseDevices(list)
    //                 setFavicon(devices, this.$favicon)
    //                 this.setState({devices})
    //                 this.webRTC = new WebRTC()
    //                 this.soundLine.initElem()
    //             })
    //     } catch (e) {
    //         console.log('Не подключены устройства', e)
    //     }
    // }

    return (
        <div className={Theme.defineClass}>
            <Header/>
            {!isSuccess && <StartButton/>}
            <Result/>
        </div>
    )
}
