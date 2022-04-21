import React from 'react'
import './VideoStreams.css'

export default function VideoStreams({isStarted, isCalling}) {


    return (
        <div className={`ts__app-streams ${isStarted ? '' : 'ts__app-streams-hidden'}`}>
            <div className="ts__app-streams-item">
                <div>Self</div>
                <video
                    id="localVideo"
                    playsInline
                    autoPlay
                />
            </div>

            <div className={`ts__app-streams-item ${isCalling ? '' : 'ts__app-streams-hidden'}`}>
                <div>Caller</div>
                <video
                    id="remoteVideo"
                    playsInline
                    autoPlay
                />
            </div>
        </div>
    )
}
