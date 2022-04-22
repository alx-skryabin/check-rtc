import WebRTC from './WebRTC'
import SoundLine from './SoundMeter/SoundLine'
import {getConnectedDevices} from '../tools/utils'

const checkPoints = {
    permission: {
        devices: null,
        status: false,
        message: ''
    },
    rtc: {
        status: false,
        message: ''
    },
    call: {
        status: false,
        message: ''
    },
    speed: {
        status: false,
        message: ''
    }
}

const requestedDevices = {
    audio: true,
    video: true
}

export default class Diagnostics {
    constructor() {
        this.points = checkPoints
        this.webRTC = new WebRTC()
        this.soundLine = new SoundLine()
    }

    async run() {
        console.info('run - start')
        await this.checkPermission()
        await this.checkRTC()
        await this.checkSpeed()
        await this.checkCall()
        console.info('run - finish')
        return this.points
    }

    checkPermission() {
        console.log('checkPermission - start')
        const permission = {
            status: false,
            message: ''
        }

        return navigator.mediaDevices.getUserMedia(requestedDevices)
            .then(async stream => {
                this.webRTC.localStream = stream

                const devices = await getConnectedDevices()

                this.webRTC.$localVideo.onloadeddata = () => {
                    console.log('localVideo onloadeddata')
                }

                permission.status = true
                permission.message = 'Камера и микрофон подключены'
                permission.devices = devices
            })
            .catch(async e => {
                console.log(e)
                const {audio, video} = await getConnectedDevices()

                permission.message = (audio && video)
                    ? 'Необходимо дать разрешение на использование устройств'
                    : 'Устройства не подключены'

                throw {permission}
            })
            .finally(() => {
                this.points.permission = permission
                console.log('checkPermission - finish')
            })
    }

    checkRTC() {
        console.log('checkRTC - start')
        const rtc = {
            status: false,
            message: 'Браузер не поддерживает видеосвязь'
        }

        try {
            new RTCPeerConnection(null)
            rtc.status = true
            rtc.message = 'Браузер поддерживает видеосвязь'
        } catch (e) {
            console.log(e, rtc.message)
        }

        this.points.rtc = rtc
        console.log('checkRTC - finish')
    }

    checkCall() {
        console.log('checkCall - start')
        const call = {
            status: false,
            message: 'Звонок не состоялся'
        }

        try {
            this.webRTC.connectCall()
                .then(() => {
                    this.soundLine.runSoundLine(this.webRTC.localStream)
                    call.status = true
                    call.message = 'Звонок состоялся'
                })
        } catch (e) {
            console.log(e, call.message)
        }
        this.points.call = call
        console.log('checkCall - finish')
    }

    checkSpeed() {
        console.log('checkSpeed - start')
        const speed = {
            status: false,
            message: 'Скорость интернета менее 5 мб/с'
        }

        const speedInternet = 3

        if (speedInternet > 5) {
            speed.status = true
            speed.message = `Скорость интернета ${speedInternet}`
        }

        this.points.speed = speed
        console.log('checkSpeed - finish')
    }
}
