import { delay, takeEvery, takeLatest, put, all, fork } from 'redux-saga/effects';
import sagaActions from './SagaAction';
import { increment, decrement } from '../store/CounterReducer';

// Worker: Increase Counter Async (Delayed By 4 Seconds)
function* increaseCounterAsync() {
    try {
        // Delay 4 Seconds
        yield delay(4000);
        // Dispatch Action To Redux Store
        yield put(increment(1));
    } catch (error) {
        console.log(error);
    }
}
// Watcher: Increase Counter Async
export function* watchIncreaseCounter() {
    // Take Last Action Only
    yield takeEvery(sagaActions.counter.INCREASE_COUNTER, increaseCounterAsync);
}
// Worker: Decrease Counter
function* decreaseCounter() {
    try {
        // Dispatch Action To Redux Store
        yield put(decrement(1));
    } catch (error) {
        console.log(error);
    }
}
// Watcher: Decrease Counter
export function* watchDecreaseCounter() {
    // Take Last Action Only
    yield takeLatest(sagaActions.counter.DECREASE_COUNTER, decreaseCounter);
}

export function* rootSaga() {
    yield all([fork(watchIncreaseCounter), fork(watchDecreaseCounter)]);
}