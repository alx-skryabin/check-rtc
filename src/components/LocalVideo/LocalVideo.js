import React from 'react'

export default function LocalVideo({visible}) {
    visible = visible ? 'block' : 'none'

    return (
        <div className="ts__app-stream">
            <video id="localVideo" style={{display: visible}} playsInline autoPlay muted/>
        </div>
    )
}
