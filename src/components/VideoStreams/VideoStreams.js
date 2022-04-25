import React from 'react'
import {useSelector} from 'react-redux'
import './VideoStreams.css'

export default function VideoStreams() {
  const {isSuccess} = useSelector((state) => state.diagnostic.result)

  return (
    <div className="ts__app-media" hidden={!isSuccess ?? ''}>
      <div className="ts__app-streams">
        <div className="ts__app-streams-item" hidden>
          <video
            id="localVideo"
            playsInline
            autoPlay
          />
        </div>

        <div className="ts__app-streams-item">
          <video
            id="remoteVideo"
            playsInline
            autoPlay
          />
        </div>
      </div>

      <div id="SoundMeter" className="ts__app-meters">
        <meter high="0.25" max="1" value="0"/>
      </div>
    </div>
  )
}
