import { configureStore } from '@reduxjs/toolkit';
import CloneCounterReducer from './CloneCounterReducer';
import counterReducer from './CounterReducer';
import { combineReducers } from 'redux';

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../saga'

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

// put the reducer state in whitelist to persist
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['cloneCounter'],
    stateReconciler: autoMergeLevel1,
};

const reducers = combineReducers({
    counter: counterReducer,
    cloneCounter: CloneCounterReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
        middleware.push(sagaMiddleware);
        return middleware;
    }
})

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { persistor, store };