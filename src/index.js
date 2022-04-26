import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import Intl from './modules/intl/Intl'
import store from './store/store'
import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Intl>
      <Provider store={store}>
        <App/>
      </Provider>
    </Intl>
  </React.StrictMode>,
  document.getElementById('root')
)
