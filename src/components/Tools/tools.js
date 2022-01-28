function parseDevices(list) {
    const res = {
        audio: false,
        video: false
    }

    list.map(({kind}) => {
        if (kind === 'audioinput') {
            res.audio = true
        }

        if (kind === 'videoinput') {
            res.video = true
        }
    })

    return res
}

export {parseDevices}
