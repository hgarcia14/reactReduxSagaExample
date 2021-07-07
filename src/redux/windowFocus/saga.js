import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { getWindowFocusRequest } from '../../helpers/restApi';
import { WINDOW_FOCUS_REQUEST } from './constants';
import { getCrolGUID } from '../../helpers/authUtils';
import {
    windowFocusSuccess,
    windowFocusError
} from './actions';

function* windowFocusRequest() {
    try {
        let guid = getCrolGUID();

        let result = yield call( getWindowFocusRequest, guid  );
        yield put( windowFocusSuccess( result.data ) );
    } catch (error) {
        yield put( windowFocusError( error ) );
    }
}


function* watchWindowFocusRequest() {
    yield takeEvery( WINDOW_FOCUS_REQUEST, windowFocusRequest );
}

function* windowFocus() {
    yield all([fork(watchWindowFocusRequest)]);
}

export default windowFocus;