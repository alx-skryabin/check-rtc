import React from 'react'

export default function LocalVideo({visible}) {
    visible = visible ? 'block' : 'none'

    return (
        <video id="localVideo" style={{display: visible}} playsInline autoPlay muted/>
    )
}
