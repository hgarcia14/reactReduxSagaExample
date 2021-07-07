import { fork, takeEvery, call, put, all, takeLatest } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import swal from 'sweetalert';
import {
    GET_PROGRAMACIONDEEVENTOS_LIST_REQUEST,
    SET_PROGRAMACIONDEEVENTO_REQUEST
} from './constants'


function* getProgramaciondeeventosList() {
    try {
        const result = yield call( api.getProgramaciondeeventosList );
        yield put( actions.getProgramaciondeeventosList( result.data ) );
    } catch (error) {
        console.log(error);
    }
}
function* setProgramaciondeevento( action ){
    try {
        const result = yield call( api.setProgramaciondeevento, action.payload );
        yield put( actions.setProgramaciondeevento( result.data ) );
        yield call( getProgramaciondeeventosList );
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
function* watchGetProgramaciondeeventosRequest(){
    yield takeEvery( GET_PROGRAMACIONDEEVENTOS_LIST_REQUEST, getProgramaciondeeventosList );
}

function* watchSetProgramaciondeeventosRequest(){
    yield takeLatest( SET_PROGRAMACIONDEEVENTO_REQUEST, setProgramaciondeevento );
}

function* programaciondeeventosSagas() {
    yield all([
        fork( watchGetProgramaciondeeventosRequest ),
        fork(watchSetProgramaciondeeventosRequest)
    ]);
}

export default programaciondeeventosSagas;
