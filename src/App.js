import React from 'react'
import {useSelector} from 'react-redux'
import Theme from './tools/theme'
import StartButton from './components/StartButton/StartButton'
import Result from './components/Result/Result'
import Header from './components/Header/Header'
import './App.scss'

export default function App() {
  console.log('v2.0.1') // 08.02.23

  const {
    result: {isSuccess},
    isInternet
  } = useSelector((state) => state.diagnostic)

  return (
    <div className={Theme.defineClass}>
      <Header/>
      {!isSuccess && isInternet && <StartButton/>}
      <Result/>
    </div>
  )
}
