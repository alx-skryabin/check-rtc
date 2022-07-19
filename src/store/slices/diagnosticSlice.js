import {createSlice} from '@reduxjs/toolkit'

export const diagnosticSlice = createSlice({
  name: 'diagnostic',
  initialState: {
    result: {
      isSuccess: false,
      data: null // object
    },
    isInternet: navigator.onLine
  },
  reducers: {
    updateResult: (state, action) => {
      state.result = action.payload
    },
    updateInternet: (state, action) => {
      state.isInternet = action.payload
    }
  }
})

export const {updateResult, updateInternet} = diagnosticSlice.actions

export default diagnosticSlice.reducer
