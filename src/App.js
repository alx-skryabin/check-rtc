import React from 'react'
import Context from './context'
import Container from './components/Container/Container'
import Loader from './components/Loader/Loader'
import {parseDevices} from './components/Tools/tools'
import './App.css'

const initialState = {
    isStarted: false,
    isFinish: false, //!!!
    loader: true,
    devices: {
        audio: false,
        video: false
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {...initialState}
        this.methods = {
            getState: this.getState.bind(this),
            updateState: this.updateState.bind(this)
        }
    }

    getState() {
        return this.state
    }

    updateState(state) {
        this.setState(state)
    }

    handlers(e) {
        const action = e.target.dataset.action
        if (!action) return

        switch (action) {
            case 'start':
                this.start(e.target)
                break
            case 'stop':
                this.stop()
                break
            case 'debug':
                console.dir(this.state)
                break
        }
    }

    start($btn) {
        $btn.innerText = 'Загрузка...'
        $btn.setAttribute('data-action', 'disabled')

        navigator.mediaDevices.getUserMedia({audio: true, video: true})
            .then(stream => {
                let $video = document.querySelector('#localVideo')
                $video.srcObject = stream

                $video.onloadeddata = () => {
                    const state = this.state
                    state.isStarted = true
                    this.setState(state)
                }
            })
            .catch(e => {
                console.log(e)
                $btn.innerText = 'Запустить тест'
                $btn.setAttribute('data-action', 'start')
                window.M.toast({html: '<i class="fas fa-exclamation-triangle"/> Необходимо дать разрешения браузеру на использование камеры и микрофона', classes: 'rounded'})
            })
    }

    stop() {
        const state = this.state
        state.isStarted = false
        this.setState(state)
    }

    componentDidMount() {
        this.checkDevices()
    }

    checkDevices() {
        try {
            navigator.mediaDevices.enumerateDevices()
                .then(list => {
                    const state = this.state
                    state.devices = parseDevices(list)
                    state.loader = false
                    this.setState(state)
                })
        } catch (e) {
            console.log('Не подключены устройства', e)
        }
    }

    render() {
        return (
            <Context.Provider value={this.methods}>
                <div className="ts__app" onClick={this.handlers.bind(this)}>
                    <h1 className="ts__app-title">WebRTC testing</h1>
                    <i className="fas fa-bug ts__app-debug" data-action='debug'/>

                    {this.state.loader ? <Loader/> : <Container/>}
                </div>
            </Context.Provider>
        )
    }
}
