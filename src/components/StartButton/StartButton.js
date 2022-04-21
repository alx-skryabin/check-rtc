import React, {useState} from 'react'
import I18n from '../../tools/I18n/I18n'
import Diagnostics from '../../modules/Diagnostics'
import './StartButton.scss'


export default function StartButton() {
    const [inProgress, setInProgress] = useState(false)
    const [errors, setErrors] = useState(false)

    const handlerStart = () => {
        setInProgress(true)
        new Diagnostics().run()
            .then(onSuccess)
            .catch(onError)
            .finally(() => setInProgress(false))
    }

    function onSuccess(e) {
        console.log(123, e)
    }

    function onError(e) {
        setErrors(true)
        console.log(321, e)
    }

    const typeButtonClass = errors
        ? 'ts__app-start-button_rect'
        : 'ts__app-start-button_circle'

    const nameButton = errors ? 'Повторить' : I18n.t('buttons.start')

    return (
        <div className="ts__app-start-button">
            <button
                className={`animate-gradient waves-effect waves-light ${typeButtonClass}`}
                disabled={inProgress}
                onClick={handlerStart}
            >
                {
                    inProgress
                        ? <i className="fas fa-spinner fa-spin fa-3x"/>
                        : nameButton
                }
            </button>
        </div>
    )
}
