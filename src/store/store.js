import {configureStore} from '@reduxjs/toolkit'
import systemReducer from './slices/systemSlice'
import diagnosticReducer from './slices/diagnosticSlice'

export default configureStore({
  reducer: {
    system: systemReducer,
    diagnostic: diagnosticReducer
  }
})
