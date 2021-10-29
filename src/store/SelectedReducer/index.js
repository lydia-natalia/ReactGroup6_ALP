import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0
}

export const selectedSlice = createSlice({
    name: 'selected',
    initialState,
    reducers: {
        selected: (state,action) => {
            state.value = action.payload
        }
    },
})
export const valueSelected = state => state.selected.value
export const { selected } = selectedSlice.actions

export default selectedSlice.reducer