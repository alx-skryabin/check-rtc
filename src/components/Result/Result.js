import React from 'react'
import VideoStreams from '../VideoStreams/VideoStreams'
import {useSelector} from 'react-redux'
// import UserInfo from '../UserInfo/UserInfo'

export default function Result() {
    const {isSuccess} = useSelector((state) => state.diagnostic.result)

    return (
        <div className='ts__app-result' hidden={!isSuccess ?? ''}>
            <VideoStreams/>

            {/*<UserInfo/>*/}
        </div>
    )
}
