import { fork, takeEvery, call, put, all, takeLatest } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    //GET_EVENTOS_ERROR,
    GET_ENCUESTOS_LIST_REQUEST,
    SET_ENCUESTO_REQUEST
} from './constants'
 

function* getEncuestosList() {
    try {
        const result = yield call( api.getEncuestosList );
        yield put( actions.getEncuestosList( result.data ) );
    } catch (error) {
        console.log(error);
    }
}

function* setEncuesto( action ){
    try {
        const result = yield call( api.setEncuesto, action.payload );
        yield put( actions.setEncuesto( result.data ) );
        yield call( getEncuestosList );
    } catch (error) {
        console.log(error);
    }
}

function* watchGetEncuestosRequest(){
    yield takeEvery( GET_ENCUESTOS_LIST_REQUEST, getEncuestosList );
}

function* watchSetEncuestoRequest(){
    yield takeLatest( SET_ENCUESTO_REQUEST, setEncuesto );
}

function* encuestosSagas() {
    yield all([
        fork( watchGetEncuestosRequest ),
        fork( watchSetEncuestoRequest )
    ]);
}

export default encuestosSagas;