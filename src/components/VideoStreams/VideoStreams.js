import React from 'react'
import './VideoStreams.css'

export default function VideoStreams({visible}) {
    const classes = `ts__app-streams ${visible ? '' : 'ts__app-streams-hidden'}`

    return (
        <div className={classes}>
            <div className="ts__app-streams-item">
                <div>Local</div>
                <video
                    id="localVideo"
                    muted
                    playsInline
                    autoPlay
                />
            </div>

            <div className="ts__app-streams-item">
                <div>Remote</div>
                <video
                    id="remoteVideo"
                    muted
                    playsInline
                    autoPlay
                />
            </div>
        </div>
    )
}
