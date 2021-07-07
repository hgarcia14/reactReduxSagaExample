import { fork, takeEvery, takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import swal from 'sweetalert';
import {
    //GET_PUESTOS_ERROR,
    GET_PUESTOS_LIST_REQUEST,
    SET_PUESTO_REQUEST
} from './constants'


function* getPuestosList() {
    try {
        const result = yield call( api.getPuestosList );
        yield put( actions.getPuestosList( result.data ) );
    } catch (error) {
        console.log(error);
    }
}
function* setPuestos( action ){
    try {
        const result = yield call( api.setPuestos, action.payload );
        yield put( actions.setPuestos( result.data ) );
        yield call( getPuestosList );
        //console.log("pesto set action", result.data)
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
function* watchGetPuestosRequest(){
    yield takeEvery( GET_PUESTOS_LIST_REQUEST, getPuestosList );
}
function* watchSetPuestosRequest(){
    yield takeLatest( SET_PUESTO_REQUEST, setPuestos );
}
function* puestosSagas() {
    yield all([
        fork( watchGetPuestosRequest ),
        fork( watchSetPuestosRequest )
    ]);
}

export default puestosSagas;

