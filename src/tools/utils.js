function defineLogger() {
  let url = new URL(window.location.href)
  return Boolean(url.searchParams.get('logger'))
}

const isLogger = defineLogger()

function logger(...arg) {
  if (!isLogger || !arg.length) return
  console.log(...arg)
}

function getNameUsedDevice(stream) {
  return stream.getTracks().reduce((list, device) => {
    const {kind, label} = device
    return {...list, [kind]: label}
  }, {})
}

function getConnectedDevices() {
  return navigator.mediaDevices.enumerateDevices()
    .then(parseDevices)
    .catch(error => {
      console.error('enumerateDevices', error)
    })
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
      if (!label.includes('OBS')) {
        res.video = label || true
      }
    }
  })

  return res
}

function defEnableDebug() {
  return window.location.hostname === 'localhost'
}

function detectDevice(userAgent) {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(userAgent))
    ? 'userInfo.device.mobile' : 'userInfo.device.pc'
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

function detectApple() {
  const isSafari = detectBrowser().toLowerCase().includes('safari')
  const isMac = detectOS().toLowerCase().includes('mac')
  return (isSafari && isMac)
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

function detectSpeed(count, setDataSpeed) {
  const countCheck = 3

  if (count === countCheck) return

  const timeout = 10
  let downloadedSize = 0
  const startTime = (new Date()).getTime()
  let endTime = null
  let duration = null

  const xhr = new XMLHttpRequest()
  xhr.open('GET', `https://dashboard.callshark.ru/resources/client/img/31120037-5mb.jpg?hash=${startTime}`, true)
  xhr.timeout = timeout * 1000


  xhr.ontimeout = () => {
    xhr.abort()
    logger('Запрос превысил максимальное время')
  }

  xhr.onreadystatechange = function () {
    if (this.readyState === 3) {
      downloadedSize = xhr.response.length
    }

    if (this.readyState === 4) {
      endTime = (new Date()).getTime()
      duration = (endTime - startTime) / 1000
      const speedBps = Math.round((downloadedSize * 8) / duration)
      const speedMbps = (speedBps / 1024 / 1024).toFixed(2)
      logger('speed', speedMbps)

      setDataSpeed({
        speed: speedMbps,
        count: ++count
      })
    }
  }

  xhr.send()
}

export {
  logger,
  defineLogger,
  getNameUsedDevice,
  getConnectedDevices,
  parseDevices,
  defEnableDebug,
  detectBrowser,
  detectApple,
  detectOS,
  detectSpeed,
  detectDevice
}
