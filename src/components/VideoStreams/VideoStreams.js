import React from 'react'
import './VideoStreams.css'

export default function VideoStreams() {
    return (
        <>
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

            <div id="SoundMeter" className="ts__meters">
                <meter high="0.25" max="1" value="0"/>
            </div>
        </>
    )
}
