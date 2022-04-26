import {createSlice} from '@reduxjs/toolkit'
import Theme from '../../tools/theme'
import {defEnableDebug} from '../../tools/utils'

export const systemSlice = createSlice({
  name: 'system',
  initialState: {
    debug: defEnableDebug(),
    theme: Theme.defineTheme
  },
  reducers: {
    switchTheme: (state, action) => {
      console.info('change theme')
      state.theme = action.payload.theme
    }
  }
})

export const {switchTheme} = systemSlice.actions

export default systemSlice.reducer
