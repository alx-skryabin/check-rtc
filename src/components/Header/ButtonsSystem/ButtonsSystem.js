import React, {useContext} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Context} from '../../../modules/intl/Intl'
import {switchTheme} from '../../../store/slices/systemSlice'
import Theme from '../../../tools/theme'
import './ButtonsSystem.scss'

export default function ButtonsSystem() {
  const store = useSelector((state) => state)
  const context = useContext(Context)

  const {theme, debug} = store.system
  const dispatch = useDispatch()

  const handlerDebug = () => {
    console.info('store:')
    console.dir(store)
  }

  const handleSwitchTheme = (e) => {
    const theme = Theme.changeTheme(e.target.dataset.theme)
    dispatch(switchTheme({theme}))
  }

  return (
    <>
      {debug &&
      <i className="fas fa-bug ts__app-debug"
         onClick={handlerDebug}
      />}
      <div
        className="ts__app-lang"
        data-lang={context.locale}
        onClick={context.selectLanguage}
      >
        {context.locale}
      </div>
      {/*<i
        className="ts__app-theme fas fa-adjust"
        onClick={handleSwitchTheme}
        data-theme={theme}
      />*/}
    </>
  )
}


