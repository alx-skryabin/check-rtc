import {createSlice} from '@reduxjs/toolkit'
import I18n from '../../tools/I18n/I18n'
import Theme from '../../tools/theme'
import {defEnableDebug} from '../../tools/utils'

export const systemSlice = createSlice({
    name: 'system',
    initialState: {
        debug: defEnableDebug(),
        theme: Theme.defineTheme,
        lang: I18n.defineLang
    },
    reducers: {
        switchTheme: (state, action) => {
            console.info('change theme')
            state.theme = action.payload.theme
        },
        switchLang: (state, action) => {
            console.info('change lang')
            state.lang = action.payload.lang
        },
    },
})

export const {switchTheme, switchLang} = systemSlice.actions

export default systemSlice.reducer
