import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './CharacterReducer';

export const store = configureStore({
    reducer: {
        character: characterReducer,
    }
})  