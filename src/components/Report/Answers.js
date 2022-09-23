import React, {useEffect, useState} from 'react'
import noPermission from '../../assets/no-permission.gif'
import {detectBrowser, detectSpeed} from '../../tools/utils'

const Permission = ({data}) => {
  const {status, devices} = data

  if (!status) {
    if (devices) {
      // устройства подключены, но нужно дать разрешения
      return (
        <div>
          <p>
            Иногда такое случается, особенно, когда вы пользуетесь другими веб-сервисами и приложениями, которые требуют
            разрешения на использование вашей веб-камеры. Ниже мы наглядно показываем, как вернуть разрешение на
            использование веб-камеры и микрофона в вашем браузере. Не забудьте перезагрузить страницу, после включения
            разрешений.
          </p>
          <div>
            <img src={noPermission} alt="no permission gif" width="100%"/>
          </div>
          <p>
            Если ошибка осталась, проверьте вкладки, открытые в вашем браузере. Возможно вы используете несколько
            браузеров, или другие запущенные в вашей операционной системе веб-приложения. Они могут не всегда корректно
            срабатывать на разрыв разрешения использования веб-камеры. Закройте их и перезагрузите страницу</p>
        </div>
      )
    } else {
      // физически не подключены устройства
      return (
        <div>
          Убедитесь в правильности подключения и выборе нужного вам устройства. Проверьте, какое устройство используется
          в вашей системе по умолчанию. Проверьте, какое устройство используется в вашем браузере по умолчанию.
          <p>Chrome: <a href="chrome://settings/content/camera"
                        target="_blank">chrome://settings/content/camera</a> (ссылка откроется в браузере Chrome)
          </p>
          <p>Yandex: <a href="browser://settings/content"
                        target="_blank">browser://settings/content</a> (ссылка откроется в браузере Yandex)
          </p>
          <p>Opera: <a href="opera://settings/content/camera"
                       target="_blank">browser://settings/content</a> (ссылка откроется в браузере Opera)
          </p>
          <p>
            Firefox: Данный браузер предлагает выбрать веб-камеру при запросе разрешения на ее использование.
          </p>
        </div>
      )
    }
  }

  // Устройства подключены и есть разрешения
  return (
    <div>
      <div>
        <i className="fas fa-microphone-alt"/>
        <mark>{devices.audio}</mark>
      </div>
      <div>
        <i className="fas fa-video"/>
        <mark>{devices.video}</mark>
      </div>
      <p>
        Всё в порядке! Если вы по прежнему не видите изображение с вашей веб-камеры, закройте запущенные в вашей
        операционной системе приложения для видеоконференций и перезагрузите страницу. В случае повторной ошибки,
        проверьте правильность подключения и работоспособность вашего устройства.
      </p>
    </div>

  )
}

const Call = ({data}) => {
  if (!data.status) {
    return (
      <div>
        Что-то пошло не так... Попробуйте перезагрузить страницу
      </div>
    )
  }

  return (
    <div>
      Все хорошо!
    </div>
  )
}

const Rtc = ({data}) => {
  if (!data.status) {
    return (
      <div>
        Попробуйте воспользоваться другим браузером. Наиболее популярные: Yandex browser, Firefox, Google Chrome.
        Список <a href="https://caniuse.com/rtcpeerconnection"
                  target="_blank">браузеров</a>, поддерживающих технологию WebRTC
      </div>
    )
  }

  return (
    <div>
      Ваш браузер <mark>{detectBrowser()}</mark> поддерживает технологию передачи потоковых данных WebRTC
    </div>
  )
}

const Speed = ({data}) => {
  const minSpeed = 10

  const [dataSpeed, setDataSpeed] = useState({
    speed: 0,
    count: 0
  })

  useEffect(() => {
    detectSpeed(dataSpeed.count, setDataSpeed)
  })

  let iconClass = ''
  let colorClass = ''
  let MoreText

  switch (dataSpeed.speed) {
    case 0:
      iconClass = 'fas fa-spinner fa-spin'
      MoreText = () => `Вычисляется...`
      break
    case (dataSpeed.speed < minSpeed) ? dataSpeed.speed : false:
      iconClass = 'fas fa-exclamation-circle'
      colorClass = 'red-text text-lighten-1'
      MoreText = () => (
        <div>Мы зафиксировали медленную скорость передачи данных - <mark>{dataSpeed.speed}</mark> Мбит/c. Предлагаем
          изменить
          ваше интернет подключение, на подключения со скоростью от {minSpeed} Мбит/с (так же подойдет смена сетей
          4g/5g, или
          беспроводной тип подключения wifi
        </div>)
      break
    case (dataSpeed.speed >= minSpeed) ? dataSpeed.speed : false:
      iconClass = 'far fa-check-square'
      colorClass = 'teal-text text-accent-4'
      MoreText = () => (<div>Скорость интернет соединения оптимальная - <mark>{dataSpeed.speed}</mark> Мбит/c</div>)
      break
  }

  return (
    <li className="collection-item">
      <div className="collapsible-header">
        <span>{data.message}</span>
        <i className={`${iconClass} ${colorClass}`}/>
      </div>
      <div className="collapsible-body">
        <MoreText/>
      </div>
    </li>
  )
}

const Answers = {
  permission: Permission,
  call: Call,
  rtc: Rtc,
  speed: Speed
}

export const PointTemplates = ({item, index}) => {
  const [point, {status, message}] = item
  const Answer = Answers[point]

  const colorClass = status ? 'teal-text text-accent-4' : 'red-text text-lighten-1'
  const iconClass = status ? 'far fa-check-square' : 'fas fa-exclamation-circle'

  if (point === 'speed') {
    return <Answer data={item[1]}/>
  }

  return (
    <li className={`collection-item ${index === 0 ? 'active' : ''}`} key={index}>
      <div className="collapsible-header">
        <span>{message}</span>
        <i className={`${iconClass} ${colorClass}`}/>
      </div>
      <div className="collapsible-body">
        <Answer data={item[1]}/>
      </div>
    </li>
  )
}
