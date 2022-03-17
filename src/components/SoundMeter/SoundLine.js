import {SoundMeter} from './soundmeter'
import './SoundLine.css'

export default class SoundLine {
    constructor() {
        this.intervalId = null
        this.soundMeter = null
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
        const val = this.soundMeter.instant.toFixed(2)
        this.instantMeter.value = val
        this.instantValueDisplay.innerText = val
    }

    initElem() {
        this.instantMeter = document.querySelector('#SoundMeter meter')
        this.instantValueDisplay = document.querySelector('#SoundMeter div')
    }

    resetSoundLine() {
        this.soundMeter.stop()
        clearInterval(this.intervalId)
        this.instantMeter.value = this.instantValueDisplay.innerText = ''
    }

}
