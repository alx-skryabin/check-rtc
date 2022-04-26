import WebRTC from './WebRTC'
import SoundLine from './SoundMeter/SoundLine'
import {getConnectedDevices} from '../tools/utils'

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
  /*speed: {
    status: false,
    message: 'Скорость интернета менее 5 мб/с'
  }*/
}

const requestedDevices = {
  audio: true,
  video: true
}

export default class Diagnostics {
  constructor() {
    this.points = checkPointsDefault
    this.webRTC = new WebRTC()
    this.soundLine = new SoundLine()
  }

  async run() {
    console.info('run - start')
    await this.checkPermission()
    await this.checkRTC()
    // await this.checkSpeed()
    await this.checkCall()
    console.info('run - finish')
    return this.points
  }

  checkPermission() {
    logger('checkPermission - start')
    const permission = {...checkPointsDefault.permission}

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
    const speed = {...checkPointsDefault.speed}

    const speedInternet = 3

    if (speedInternet > 5) {
      speed.status = true
      speed.message = `Скорость интернета ${speedInternet}`
    }

    this.points.speed = speed
    logger('checkSpeed - finish')
  }
}

function logger(val1, val2 = '') {
  if (CONSOLE_LOG) {
    if (val2) console.log(val1, val2)
    else console.log(val1)
  }
}
