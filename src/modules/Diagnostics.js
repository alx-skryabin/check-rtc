import WebRTC from './WebRTC'
import SoundLine from './SoundMeter/SoundLine'
import {getConnectedDevices, getNameUsedDevice} from '../tools/utils'

const CONSOLE_LOG = true

const checkPointsDefault = {
  permission: {
    devices: null,
    status: false,
    message: ''
  },
  rtc: {
    status: false,
    message: 'Браузер не поддерживает видеосвязь'
  },
  call: {
    status: false,
    message: 'Звонок не состоялся'
  },
  speed: {
    status: false, // unused
    message: 'Скорость соединения с сервером'
  }
}

const requestedDevices = {
  // шумодав
  audio: {
    autoGainControl: true,
    echoCancellation: true,
    noiseSuppression: true,
    mandatory: {
      googNoiseSupression: true,
      googAudioMirroring: true
    }
  },
  video: true
}

export default class Diagnostics {
  constructor() {
    this.points = {...checkPointsDefault}
    this.webRTC = new WebRTC()
    this.soundLine = new SoundLine()

    window.diagnostics = this
  }

  stop() {
    console.log('Diagnostics stopped')
    this.webRTC.disconnectCall()
    this.webRTC.disableStreams()
    this.soundLine.resetSoundLine()
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
    logger('checkPermission - start')
    const permission = {...checkPointsDefault.permission}

    return navigator.mediaDevices.getUserMedia(requestedDevices)
      .then(stream => {
        this.webRTC.localStream = stream

        const devices = getNameUsedDevice(stream)

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
        const devices = audio && video

        permission.message = (devices)
          ? 'Необходимо дать разрешение на использование устройств'
          : 'Устройства не подключены'
        permission.devices = devices

        throw {permission}
      })
      .finally(() => {
        this.points.permission = permission
        logger('checkPermission - finish')
      })
  }

  checkRTC() {
    logger('checkRTC - start')
    const rtc = {...checkPointsDefault.rtc}

    return Promise.resolve('success')
      .then(() => {
        new RTCPeerConnection(null)
        rtc.status = true
        rtc.message = 'Браузер поддерживает видеосвязь'
      })
      .catch(() => {
        throw {rtc}
      })
      .finally(() => {
        this.points.rtc = rtc
        logger('checkRTC - finish')
      })
  }

  checkCall() {
    logger('checkCall - start')
    const call = {...checkPointsDefault.call}

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
    logger('checkCall - finish')
  }

  checkSpeed() {
    logger('checkSpeed - start')
    this.points.speed = {...checkPointsDefault.speed}
    logger('checkSpeed - finish')
  }
}

function logger(val1, val2 = '') {
  if (CONSOLE_LOG) {
    if (val2) console.log(val1, val2)
    else console.log(val1)
  }
}

// hangup() {
//      this.webRTC.disconnectCall()
// }

// stop() {
//     this.webRTC.disconnectCall()
//     this.webRTC.disableStreams()
//     this.soundLine.resetSoundLine()
// }
