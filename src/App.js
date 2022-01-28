import React from 'react'
import Context from './context'
import Container from './components/Container/Container'
import Loader from './components/Loader/Loader'
import {parseDevices} from './components/Tools/tools'
import './App.css'

const initialState = {
    isStarted: false,
    isFinish: false,
    loader: false,
    devices: {
        audio: false,
        video: false
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {...initialState}
    }

    handlers(e) {
        const action = e.target.dataset.action
        if (!action) return
        // console.log(action)

        switch (action) {
            case 'start':
                this.start()
                break
            case 'stop':
                this.stop()
                break
            case 'debug':
                console.log(this.state)
                break
        }
    }

    start() {
        const state = this.state
        state.isStarted = true
        this.setState(state)
    }

    stop() {
        const state = this.state
        state.isStarted = false
        this.setState(state)
    }

    componentDidMount() {
        this.checkDevices()

        // navigator.mediaDevices.getUserMedia({audio: true, video: true})
        //     .then(stream => {
        //         document.querySelector('#localVideo').srcObject = stream
        //         console.log(2222, stream)
        //     })
    }

    checkDevices() {
        try {
            navigator.mediaDevices.enumerateDevices()
                .then(list => {
                    const state = this.state
                    state.devices = parseDevices(list)
                    this.setState(state)
                })
        } catch (e) {
            console.log('Не подключены устройства', e)
        }
    }

    render() {
        return (
            <Context.Provider value={initialState}>
                <div className="ts__app" onClick={this.handlers.bind(this)}>
                    <h1 className="ts__app-title">WebRTC testing</h1>
                    <i className="fas fa-bug ts__app-debug" data-action='debug'/>

                    {this.state.loader ? <Loader/> : <Container/>}
                </div>
            </Context.Provider>
        )
    }
}
