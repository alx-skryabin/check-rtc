import React, {useEffect} from 'react'
import ButtonsSystem from './ButtonsSystem/ButtonsSystem'
import {FormattedMessage} from 'react-intl'
import {useDispatch, useSelector} from 'react-redux'
import {updateInternet, updateResult} from '../../store/slices/diagnosticSlice'


export default function Header() {
  const {isInternet} = useSelector((state) => state.diagnostic)
  const dispatch = useDispatch()
  let isEventConnection = false

  useEffect(() => {
    if (!isEventConnection) {
      isEventConnection = true
      window.addEventListener('online', updateOnlineStatus)
      window.addEventListener('offline', updateOnlineStatus)

      // событие вкл\откл медиа устройств
      // navigator.mediaDevices.ondevicechange = (e) => {
      //   console.log('off', e)
      // }
    }
  }, [isEventConnection])

  function updateOnlineStatus() {
    dispatch(updateInternet(navigator.onLine))

    if (!navigator.onLine && window.diagnostics) {
      window.diagnostics.stop()
      dispatch(updateResult({
        isSuccess: false,
        data: null
      }))
    }
  }

  const Connection = isInternet
    ? () => (<><i className="far fa-circle online"/> Вы в сети</>)
    : () => (<><i className="far fa-circle offline"/> Вы не подключены к интернету</>)

  return (
    <div className="ts__app-header">
      <h1 className="ts__app-title">
        <FormattedMessage
          id="Header.title"
          defaultMessage="Diagnostics of video consultation"
        />
      </h1>
      <div className="ts__app-connection">
        <Connection isInternet={isInternet}/>
      </div>

      <ButtonsSystem/>
    </div>
  )
}
