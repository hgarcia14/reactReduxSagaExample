import { fork, takeEvery, call, put, all, takeLatest } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import {
    GET_SUCURSALES_LIST_REQUEST,
    SET_SUCURSAL_REQUEST
} from './constants'


function* getSucursalesList() {
    try {
        const result = yield call( api.getSucursalesList );
        yield put( actions.getSucursalesList( result.data ) );
    } catch (error) {
        console.log(error);
    }
}

function* setSucursal( action ){
    try {
        const result = yield call( api.setSucursal, action.payload );
        yield put( actions.setSucursal( result.data ) );
        yield call( getSucursalesList );
    } catch (error) {
        console.log(error);
    }
}

function* watchGetSucursalesRequest(){
    yield takeEvery( GET_SUCURSALES_LIST_REQUEST, getSucursalesList );
}

function* watchSetSucursalRequest(){
    yield takeLatest( SET_SUCURSAL_REQUEST, setSucursal );
}

function* sucursalesSagas() {
    yield all([
        fork( watchGetSucursalesRequest ),
        fork( watchSetSucursalRequest )
    ]);
}

export default sucursalesSagas;