import React from 'react'
import VideoStreams from '../VideoStreams/VideoStreams'
import Report from '../Report/Report'
import {useSelector} from 'react-redux'

export default function Result() {
  const {data} = useSelector((state) => state.diagnostic.result)

  return (
    <div className="ts__app-result">
      <VideoStreams/>
      {data && <Report/>}
    </div>
  )
}
