import {createSlice} from '@reduxjs/toolkit'

export const diagnosticSlice = createSlice({
    name: 'diagnostic',
    initialState: {
        result: {
            isSuccess: false,
            data: null // object
        }
    },
    reducers: {
        updateResult: (state, action) => {
            console.log(action.payload)
            state.result = action.payload
        }
    },
})

export const {updateResult} = diagnosticSlice.actions

export default diagnosticSlice.reducer