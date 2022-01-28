import React, {useContext} from 'react'
import Context from '../../context'
import ButtonGradient from '../ButtonGradient/ButtonGradient'

export default function Controls() {
    const context = useContext(Context)

    return (
        <div className='ts__app-controls'>
            <ButtonGradient action='start' text='Запустить тест'/>
            {/*<ButtonGradient action='stop' text='Остановить' size='small'/>*/}
        </div>
    )
}
