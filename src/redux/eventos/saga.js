import { fork, takeEvery, call, put, all, takeLatest } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    //GET_EVENTOS_ERROR,
    GET_EVENTOS_LIST_REQUEST,
    SET_EVENTO_REQUEST
} from './constants'


function* getEventosList() {
    try {
        const result = yield call( api.getEventosList );
        yield put( actions.getEventosList( result.data ) );
    } catch (error) {
        console.log(error);
    }
}

function* setEvento( action ){
    try {
        const result = yield call( api.setEvento, action.payload );
        yield put( actions.setEvento( result.data ) );
        yield call( getEventosList );
    } catch (error) {
        console.log(error);
    }
}

function* watchGetEventosRequest(){
    yield takeEvery( GET_EVENTOS_LIST_REQUEST, getEventosList );
}

function* watchSetEventoRequest(){
    yield takeLatest( SET_EVENTO_REQUEST, setEvento );
}

function* eventosSagas() {
    yield all([
        fork( watchGetEventosRequest ),
        fork( watchSetEventoRequest )
    ]);
}

export default eventosSagas;