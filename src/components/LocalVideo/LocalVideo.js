import React from 'react'

export default function LocalVideo({visible}) {
    const display = visible ? 'block' : 'none'

    return (
        <div className="ts__app-stream">
            <video
                id="localVideo"
                style={{display: display}}
                muted={visible ? '' : true}
                playsInline
                autoPlay
            />
        </div>
    )
}
