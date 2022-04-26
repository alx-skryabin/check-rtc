import React from 'react'
import {useSelector} from 'react-redux'
import Theme from './tools/theme'
import StartButton from './components/StartButton/StartButton'
import Result from './components/Result/Result'
import Header from './components/Header/Header'
import './App.css'

export default function App() {
  const {isSuccess} = useSelector((state) => state.diagnostic.result)

  return (
    <div className={Theme.defineClass}>
      <Header/>
      {!isSuccess && <StartButton/>}
      <Result/>
    </div>
  )
}
