import { fork, takeEvery, call, put, all, takeLatest } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import swal from 'sweetalert';
import {
    GET_CENTROS_LIST_REQUEST,
    SET_CENTRO_REQUEST
} from './constants'


function* getCentrosList() {
    try {
        const result = yield call( api.getCentrosList );
        yield put( actions.getCentrosList( result.data ) );
    } catch (error) {
        console.log(error);
    }
}

function* setCentro( action ){
    try {
        const result = yield call( api.setCentro, action.payload );
        yield put( actions.setCentro( result.data ) );
        yield call( getCentrosList );
        console.log("setCentroList", result.data);
        swal({
            title: "¡Buen trabajo!",
            text: "Registro guardado",
            icon: "success",
          });
    } catch (error) {
        console.log(error);
        swal({
            title: "Error",
            text: 'Registro no guardado',
            icon: "Warning",
          });
    }
}

function* watchGetCentrosRequest(){
    yield takeEvery( GET_CENTROS_LIST_REQUEST, getCentrosList );
}

function* watchSetCentroRequest(){
    yield takeLatest( SET_CENTRO_REQUEST, setCentro );
}

function* centrosSagas() {
    yield all([
        fork( watchGetCentrosRequest ),
        fork( watchSetCentroRequest )
    ]);
}

export default centrosSagas;