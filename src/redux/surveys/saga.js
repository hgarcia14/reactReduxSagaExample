import { fork, takeEvery, call, put, all, takeLatest } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import {
    VALIDATE_TOKEN_SURVEY_REQUEST,
    SAVE_SURVEY_REQUEST,
} from './constants';
import * as actions from './actions';

function* validateTokenRequest( action ) {

    try {
        console.log(action.payload);
        const result = yield call( api.validateTokenRequest, action.payload );
        yield put( actions.validateTokenSuccess( result.data[0] ) );
    } catch (error) {
        yield put( actions.validateTokenError( error ) );
    }

}

function* saveSurveyRequest( action ) {

    try {
        const result = yield call( api.saveSurveyRequest, action.payload.empleadoId, action.payload.token, action.payload.respuestas );
        yield put( actions.saveSurveySuccess( result.data[0] ) );
    } catch ( error ) {
        yield put( actions.saveSurveyError( error ) );
    }

}


/** Watchers */
function* watchValidateTokenRequest() {
    yield takeEvery( VALIDATE_TOKEN_SURVEY_REQUEST, validateTokenRequest );
}

function* watchSaveSurveyRequest() {
    yield takeLatest( SAVE_SURVEY_REQUEST, saveSurveyRequest );
}

function* surveysSagas() {
    yield all([
        fork( watchValidateTokenRequest ),
        fork( watchSaveSurveyRequest )
    ]);
}

export default surveysSagas;