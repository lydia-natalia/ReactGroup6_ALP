import { takeLatest, put, all, fork } from 'redux-saga/effects';
import sagaActions from './SagaAction';
import { selected,valueSelected } from '../store/SelectedReducer';

function* selectedAsync(action) {
    try {
        yield put(selected(action.id));
    } catch (error) {
        console.log(error);
    }
}

export function* watchSelected() {
    yield takeLatest(sagaActions.selected.SELECTED, selectedAsync);
}

// // Worker: Decrease Counter
// function* decreaseCounter() {
//     try {
//         // Dispatch Action To Redux Store
//         yield put(decrement(1));
//     } catch (error) {
//         console.log(error);
//     }
// }
// // Watcher: Decrease Counter
// export function* watchDecreaseCounter() {
//     // Take Last Action Only
//     yield takeLatest(sagaActions.counter.DECREASE_COUNTER, decreaseCounter);
// }

export function* rootSaga() {
    //yield all([fork(watchIncreaseCounter), fork(watchDecreaseCounter)]);
    yield all([fork(watchSelected)]);
}