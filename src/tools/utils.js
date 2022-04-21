import I18n from './I18n/I18n'

function getConnectedDevices() {
    return navigator.mediaDevices.enumerateDevices()
        .then(list => parseDevices(list))
}

function parseDevices(list) {
    const res = {
        audio: false,
        video: false
    }

    list.map(({kind, label}) => {
        if (kind === 'audioinput') {
            res.audio = label || true
        }

        if (kind === 'videoinput') {
            res.video = label || true
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

function detectDevice(userAgent) {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(userAgent))
        ? I18n.t('userInfo.device.mobile') : I18n.t('userInfo.device.pc')
}

function detectBrowser() {
    const ua = navigator.userAgent;
    let tem;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}

function detectOS() {
    let OSName = 'Unknown'
    if (window.navigator.userAgent.indexOf('Windows NT 10.0') !== -1) OSName = 'Windows 10'
    if (window.navigator.userAgent.indexOf('Windows NT 6.3') !== -1) OSName = 'Windows 8.1'
    if (window.navigator.userAgent.indexOf('Windows NT 6.2') !== -1) OSName = 'Windows 8'
    if (window.navigator.userAgent.indexOf('Windows NT 6.1') !== -1) OSName = 'Windows 7'
    if (window.navigator.userAgent.indexOf('Windows NT 6.0') !== -1) OSName = 'Windows Vista'
    if (window.navigator.userAgent.indexOf('Windows NT 5.1') !== -1) OSName = 'Windows XP'
    if (window.navigator.userAgent.indexOf('Windows NT 5.0') !== -1) OSName = 'Windows 2000'
    if (window.navigator.userAgent.indexOf('Mac') !== -1) OSName = 'Mac/iOS'
    if (window.navigator.userAgent.indexOf('X11') !== -1) OSName = 'UNIX'
    if (window.navigator.userAgent.indexOf('Linux') !== -1) OSName = 'Android'
    return OSName
}

function detectSpeed() {
    const imageSrc = "https://f.vividscreen.info/soft/4ede9b3f82605d5387667910528f236b/Nature-Reflection-2880x1920.jpg?n=" + Math.random()
    const downloadSize = 1971322 // bytes
    const startTime = (new Date()).getTime()

    const download = new Image()
    download.src = imageSrc

    download.onload = () => {
        const endTime = (new Date()).getTime()
        const duration = Math.round((endTime - startTime) / 1000)
        const speedBps = Math.round((downloadSize * 8) / duration)
        const speedMbps = (speedBps / 1024 / 1024).toFixed(2)
        document.querySelector('#speedEnthernet')
            .innerHTML = `${speedMbps}  ${I18n.t('userInfo.speed.si')}`
    }
}

function getIP() {
    return fetch('https://api.ipify.org?format=json')
        .then(r => r.json())
}

export {
    getConnectedDevices,
    parseDevices,
    defEnableDebug,
    setFavicon,
    detectBrowser,
    detectOS,
    detectSpeed,
    detectDevice,
    getIP
}
