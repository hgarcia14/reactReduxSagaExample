import { fork, takeEvery, call, put, all, takeLatest } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import swal from 'sweetalert';
import {
   // GET_DEPARTAMENTOS_ERROR,
    GET_DEPARTAMENTOS_LIST_REQUEST,
    SET_DEPARTAMENTO_REQUEST
} from './constants'


function* getDepartamentosList() {
    try {
        const result = yield call( api.getDepartamentosList );
        yield put( actions.getDepartamentosList( result.data ) );
    } catch (error) {
        console.log(error);
    }
}
function* setDepartamento( action ){
    try {
        const result = yield call( api.setDepartamento, action.payload );
        yield put( actions.setDepartamento( result.data ) );
        yield call( getDepartamentosList );
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
function* watchGetDepartamentosRequest(){
    yield takeEvery( GET_DEPARTAMENTOS_LIST_REQUEST, getDepartamentosList );
}

function* watchSetDepartamentosRequest(){
    yield takeLatest( SET_DEPARTAMENTO_REQUEST, setDepartamento );
}

function* departamentosSagas() {
    yield all([
        fork( watchGetDepartamentosRequest ),
        fork(watchSetDepartamentosRequest)
    ]);
}

export default departamentosSagas;
