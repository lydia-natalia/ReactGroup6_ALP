import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedCharacterId: 0,
}

export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        changeSelectedCharacter: (state, action) => {
            state.selectedCharacterId = action.payload
        },
    },
})

export const { changeSelectedCharacter } = characterSlice.actions

export default characterSlice.reducer