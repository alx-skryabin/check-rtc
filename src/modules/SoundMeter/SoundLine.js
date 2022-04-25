import {SoundMeter} from './soundmeter'
import './SoundLine.scss'

export default class SoundLine {
  constructor() {
    this.intervalId = null
    this.soundMeter = null
    this.instantMeter = document.querySelector('#SoundMeter meter')
  }

  runSoundLine(stream) {
    let AudioContext = null

    try {
      AudioContext = window.AudioContext || window.webkitAudioContext
      AudioContext = new AudioContext()
    } catch (e) {
      return console.info('SoundMeter. Web Audio API not supported.')
    }

    this.soundMeter = new SoundMeter(AudioContext)

    this.soundMeter.connectToSource(stream, () => {
      this.intervalId = setInterval(this.updateValue.bind(this), 200)
    })
  }

  updateValue() {
    this.instantMeter.value = this.soundMeter.instant.toFixed(2)
  }

  resetSoundLine() {
    this.soundMeter.stop()
    clearInterval(this.intervalId)
    this.instantMeter.value = ''
  }

}
