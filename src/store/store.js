import {configureStore} from '@reduxjs/toolkit'
import systemReducer from './slices/systemSlice'

export default configureStore({
    reducer: {
        system: systemReducer
    }
})
