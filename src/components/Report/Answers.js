import React from 'react'
import gifError from '../../assets/gif-error.gif'

const Permission = ({data}) => {
  const {status, devices} = data

  if (!status) {
    if (devices) {
      // устройства подключены, но нужно дать разрешения
      return (
        <div>
          Иногда такое случается, особенно, когда вы пользуетесь другими веб-сервисами и приложениями, которые требуют
          разрешения на использование вашей веб-камеры. Проверьте вкладки, открытые в вашем браузере. Возможно вы
          используете несколько браузеров, или другие запущенные в вашей операционной системе веб-приложения. Они могут
          не всегда корректно срабатывать на разрыв разрешения использования веб-камеры. Закройте их и перезагрузите
          страницу
        </div>
      )
    } else {
      // физически не подключены устройства
      return (
        <div>
          убедитесь в правильности подключения и выборе нужного вам устройства. Проверьте, какое устройство используется
          в вашей системе по умолчанию. Проверьте, какое устройство используется в вашем браузере по умолчанию.
          Chrome: chrome://settings/content/camera (ссылка откроется в браузере Chrome)
          Yandex: browser://settings/content (ссылка откроется в браузере Yandex)
          Opera: opera://settings/content/camera (ссылка откроется в браузере Opera)
          Firefox: Данный браузер предлагает выбрать веб-камеру при запросе разрешения на ее использование.
        </div>
      )
    }
  }

  // Устройства подключены и есть разрешения
  return (
    <div>
      <div>
        <i className="fas fa-microphone-alt"/> {devices.audio}
      </div>
      <div>
        <i className="fas fa-video"/> {devices.video}
      </div>
      <img src={gifError} alt="hui"/>
      Всё в порядке! Если вы по прежнему не видите изображение с вашей веб-камеры, закройте запущенные в вашей
      операционной системе приложения для видеоконференций и перезагрузите страницу. В случае повторной ошибки,
      проверьте правильность подключения и работоспособность вашего устройства.
    </div>

  )
}

const Call = ({data}) => {
  if (!data.status) {
    return (
      <div>
        Звонок не состоялся
      </div>
    )
  }

  return (
    <div>
      Звонок состоялся
    </div>
  )
}

const Rtc = ({data}) => {
  if (!data.status) {
    return (
      <div>
        Браузер не поддерживает технологию видеообщения, смените браузер на chrome
      </div>
    )
  }

  return (
    <div>
      Браузер поддерживает технологию видеообщения
    </div>
  )
}

const Speed = ({data}) => {
  if (!data.status) {
    return (
      <div>
        Слабый сигнал соединения
      </div>
    )
  }

  return (
    <div>
      Скорость интернет соединения оптимальная
    </div>
  )
}

export const Answers = {
  permission: Permission,
  call: Call,
  rtc: Rtc,
  speed: Speed
}
