import { fork, takeEvery, call, put, all, takeLatest } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import * as actionsAlerta from '../alertas/actions';
import swal from 'sweetalert';
import {
    GET_EMPLEADOS_LIST_REQUEST,
    SET_EMPLEADO_REQUEST,
    SET_UPLOAD_FILES_EMPLEADO_REQUEST,
    GET_FILES_REQUEST,
    SEND_MAIL_EMPLEADOS_REQUEST
} from './constants';

function* getEmpleadosList() {
    try {
        const result = yield call( api.getEmpleadosList );
        yield put( actions.getEmpleadosList( result.data ) );
    } catch (error) {
        console.log(error);
    }
}

function* setEmpleado( action ){
    try {
        var formData = new FormData();
        for( let file of action.newFiles ){
            formData.append( 'files', file );
        }
        let result = yield call( api.setEmpleado, action.payload );
        
        if( result && action.newFiles.length > 0){
             yield call( api.setFiles, formData, 'empleados', result.data[0].empleadoId );
        }
        yield call( getEmpleadosList );
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

function* setUploadFilesEmpleados( action ){
    //console.log(action.payload);
    yield;
}
function* sendEmpleadoMailRequest( action ){
    try {
        const result = yield call( api.sendEmpleadoMail, action.payload );
        if( result.data ){
            yield put( actions.sendEmpleadosEmailSuccess( result.data ) );
            yield put(
                actionsAlerta.showAlert( 
                    'Registro guardado', 
                    'Los registros han sido guardados correctamente',
                    'primary' )
                );
        }
        
    } catch (error) {
        yield put( action.sendEmpleadosEmailError( error ) );
        yield put(
            actionsAlerta.showAlert( 
                'Error', 
                'El registro no pudo ser guardado.',
                'danger' )
            );
    }
}

function* getFilesRequest( action ){
    let result = yield call( api.getFiles, action.payload, action.id );
    yield put( action.setFilesEmpleado( result.data ) );
}

function* watchGetEmpleadosRequest(){
    yield takeEvery( GET_EMPLEADOS_LIST_REQUEST, getEmpleadosList );
}

function* watchSetEmpleadosRequest(){
    yield takeLatest( SET_EMPLEADO_REQUEST, setEmpleado );
}

function* watchSendMail(){
    yield takeLatest( SEND_MAIL_EMPLEADOS_REQUEST, sendEmpleadoMailRequest );
}

function* watchSetUploadFilesEmpleadosRequest(){
    yield takeEvery( SET_UPLOAD_FILES_EMPLEADO_REQUEST, setUploadFilesEmpleados );
}

function* watchGetFilesRequest(){
    yield takeEvery( GET_FILES_REQUEST, getFilesRequest );
}

function* empleadosSagas() {
    yield all([
        fork( watchGetEmpleadosRequest ),
        fork( watchSetEmpleadosRequest ),
        fork( watchSetUploadFilesEmpleadosRequest ),
        fork( watchGetFilesRequest ),
        fork( watchSendMail )
    ]);
}

export default empleadosSagas;