const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
}

const CONSOLE_LOG = false

export default class WebRTC {
  constructor() {
    this.$localVideo = document.getElementById('localVideo')
    this.$remoteVideo = document.getElementById('remoteVideo')
    this.pc1 = null //webRTCPeer
    this.pc2 = null //webRTCPeer
    this.localStream = null //media flow
    this.remoteStream = null //media flow
  }

  async connectCall() {
    // For output stream local video
    // this.$localVideo.srcObject = this.localStream

    this.pc1 = new RTCPeerConnection(null)
    this.pc2 = new RTCPeerConnection(null)

    this.pc1.onicecandidate = e => {
      this.onIceCandidate(this.pc1, e)
    }

    this.pc2.onicecandidate = e => {
      this.onIceCandidate(this.pc2, e)
    }

    // this.pc1.addStream(this.localStream) // not work in safari
    this.localStream.getTracks()
      .forEach(track => this.pc1.addTrack(track, this.localStream))

    this.pc1.createOffer(offerOptions)
      .then(this.onCreateOfferSuccess.bind(this))

    // onaddstream event not work on safari
    return this.pc2.ontrack = e => {
      this.remoteStream = e.streams[0]
      this.$remoteVideo.srcObject = this.remoteStream
    }
  }

  disconnectCall() {
    this.pc1.close()
    this.pc2.close()
    this.pc1 = null
    this.pc2 = null
  }

  disableStreams() {
    const videoTracks = this.localStream.getVideoTracks()
    const audioTracks = this.localStream.getAudioTracks()
    videoTracks[0].stop()
    audioTracks[0].stop()
  }

  //webRTC
  onIceCandidate(pc, event) {
    this.getOtherPc(pc).addIceCandidate(event.candidate)
      .then(() => {
          logger(3, 'AddIceCandidate success ' + this.getNamePc(pc))
        },
        err => {
          logger(3, 'Failed to add ICE Candidate ' + this.getNamePc(pc), err)
        }
      )
  }

  // create offer success
  onCreateOfferSuccess(desc) {
    // console.log('desc', desc)
    this.pc1.setLocalDescription(desc)
      .then(
        () => logger(1, 'The offer was created successfully - pc1'),
        () => logger('Ошибка создания офера - pc1')
      )

    this.pc2.setRemoteDescription(desc).then(
      () => logger(1, 'The offer was created successfully - pc2'),
      () => logger('Ошибка создания офера - pc2')
    )

    this.pc2.createAnswer().then(
      this.onCreateAnswerSuccess.bind(this)
    )
  }

  // get answer by offer success
  onCreateAnswerSuccess(desc) {
    this.pc1.setRemoteDescription(desc).then(
      () => logger(2, 'The response was received successfully - pc1'),
      () => logger('Error receiving the response - pc1')
    )

    this.pc2.setLocalDescription(desc).then(
      () => logger(2, 'The response was received successfully - pc2'),
      () => logger('Error receiving the response - pc2')
    )
  }

  getNamePc(pc) {
    return (pc === this.pc1) ? 'pc1' : 'pc2'
  }

  getOtherPc(pc) {
    return (pc === this.pc1) ? this.pc2 : this.pc1
  }
}

function logger(val1, val2 = '') {
  if (CONSOLE_LOG) {
    if (val2) console.log(val1, val2)
    else console.log(val1)
  }
}
