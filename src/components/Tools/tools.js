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

function defEnableDebug() {
    return window.location.hostname === 'localhost'
}

function setFavicon({audio, video}, $favicon) {
    if (audio && video) {
        $favicon.setAttribute('href', 'favicon/success.ico')
    }
    else if (audio || video) {
        $favicon.setAttribute('href', 'favicon/warning.ico')
    }
    else {
        $favicon.setAttribute('href', 'favicon/error.ico')
    }
}

export {parseDevices, defEnableDebug, setFavicon}
