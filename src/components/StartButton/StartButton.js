import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Diagnostics from '../../modules/Diagnostics'
import I18n from '../../tools/I18n/I18n'
import {updateResult} from '../../store/slices/diagnosticSlice'
import './StartButton.scss'

export default function StartButton() {
  const {data} = useSelector((state) => state.diagnostic.result)
  const [inProgress, setInProgress] = useState(false)
  const dispatch = useDispatch()

  const handlerStart = () => {
    setInProgress(true)
    new Diagnostics().run()
      .then(onSuccess)
      .catch(onError)
      .finally(
        () => setInProgress(false)
      )
  }

  function onSuccess(data) {
    dispatch(updateResult({
      isSuccess: true,
      data
    }))
  }

  function onError(data) {
    dispatch(updateResult({
      isSuccess: false,
      data
    }))
  }

  return (
    <div className={`ts__app-start-button ${(inProgress || data) ? '' : 'centered'}`}>
      <button
        className={`animate-gradient waves-effect waves-light ts__app-start-button_circle`}
        disabled={inProgress}
        onClick={handlerStart}
      >
        {
          inProgress
            ? <i className="fas fa-spinner fa-spin fa-3x"/>
            : I18n.t('buttons.start')
        }
      </button>
    </div>
  )
}
