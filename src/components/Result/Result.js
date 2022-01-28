import React, {useContext} from 'react'
import Context from '../../context'


export default function Result() {
    const context = useContext(Context)
    console.log(context)

    return (
        <div className='ts__app-result'>
            <div className="ts__app-devices">
                <div className='ts__app-devices-item ts__app-devices__error'>
                    <i className="fas fa-video"/>
                    <span>Камера</span>
                </div>
                <div className='ts__app-devices-item ts__app-devices__success'>
                    <i className="fas fa-microphone"/>
                    <span>Микрофон</span>
                </div>
            </div>

            <div className="ts__app-info">

            </div>
        </div>
    )
}
