import React from 'react'
import Context from './context'
import {defEnableDebug, parseDevices, setFavicon} from './components/Tools/tools'
import Loader from './components/Loader/Loader'
import Container from './components/Container/Container'
import './App.css'

const requestedDevices = {
    audio: true,
    video: true
}

const offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
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
            updateState: (state) => this.setState(state)
        }

        this.$localVideo = null
        this.$remoteVideo = null
        this.pc1 = null
        this.pc2 = null
        this.localStream = null
        this.remoteStream = null
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
                this.localStream = stream
                this.$localVideo.srcObject = this.localStream


                this.$localVideo.onloadeddata = () => {
                    $btn.innerText = 'Старт'
                    this.setState({isStarted: true})
                }
            })
            .catch(e => {
                console.log(e)
                $btn.innerText = 'Старт'
                $btn.disabled = false;
                window.M.toast({
                    html: '<i class="fas fa-exclamation-triangle"/> Необходимо дать разрешения браузеру на использование камеры и микрофона',
                    classes: 'rounded'
                })
            })
    }

    call($btn) {
        $btn.innerText = 'Загрузка...'
        $btn.disabled = true;

        this.pc1 = new RTCPeerConnection(null)
        this.pc2 = new RTCPeerConnection(null)

        this.pc1.onicecandidate = e => {
            this.onIceCandidate(this.pc1, e)
        }

        this.pc2.onicecandidate = e => {
            this.onIceCandidate(this.pc2, e)
        }

        this.pc2.onaddstream = e => {
            this.remoteStream = e.stream
            this.$remoteVideo.srcObject = this.remoteStream
        }

        this.pc1.addStream(this.localStream)

        this.pc1.createOffer(offerOptions)
            .then(this.onCreateOfferSuccess.bind(this))
    }

    stop() {
        this.setState({isStarted: false})
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
                    this.$localVideo = document.querySelector('#localVideo')
                    this.$remoteVideo = document.querySelector('#remoteVideo')
                })
        } catch (e) {
            console.log('Не подключены устройства', e)
        }
    }

    render() {
        return (
            <Context.Provider value={this.methods}>
                <div className="ts__app" onClick={this.handlers.bind(this)}>
                    <h1 className="ts__app-title">WebRTC Testing</h1>
                    {this.state.debug && <i className="fas fa-bug ts__app-debug" data-action='debug'/>}

                    {this.state.loader ? <Loader/> : <Container/>}
                </div>
            </Context.Provider>
        )
    }


    //webRTC
    onIceCandidate(pc, event) {
        this.getOtherPc(pc).addIceCandidate(event.candidate)
            .then(() => {
                    console.log('addIceCandidate success ' + this.getNamePc(pc))
                },
                err => {
                    console.log('failed to add ICE Candidate ' + this.getNamePc(pc))
                }
            )
    }

    // create offer success
    onCreateOfferSuccess(desc) {
        // console.log(9999, desc)
        this.pc1.setLocalDescription(desc)
            .then(
                () => console.log(11, 'setLocalDescription complete - pc1'),
                () => console.log('Failed to set session description - pc1')
            )

        this.pc2.setRemoteDescription(desc).then(
            () => console.log(12, 'setRemoteDescription complete - pc2'),
            () => console.log('Failed to set session description - pc2')
        )

        this.pc2.createAnswer().then(
            this.onCreateAnswerSuccess.bind(this)
        )
    }

    // get answer by offer success
    onCreateAnswerSuccess(desc) {
        this.pc1.setRemoteDescription(desc).then(
            () => console.log(21, 'setLocalDescription complete - pc1'),
            () => console.log('Failed to set session description - pc1')
        )

        this.pc2.setLocalDescription(desc).then(
            () => console.log(22, 'setRemoteDescription complete - pc2'),
            () => console.log('Failed to set session description - pc2')
        )
    }

    // hangup call
    hangup() {
        console.log('end call')
        // console.log('hangup', this.pc1, this.pc2)
        const videoTracks = this.localStream.getVideoTracks()
        const audioTracks = this.localStream.getAudioTracks()
        videoTracks[0].stop()
        audioTracks[0].stop()

        this.pc1.close()
        this.pc2.close()
        this.pc1 = null
        this.pc2 = null
    }

    getNamePc(pc) {
        return (pc === this.pc1) ? 'pc1' : 'pc2'
    }

    getOtherPc(pc) {
        return (pc === this.pc1) ? this.pc2 : this.pc1
    }
}
