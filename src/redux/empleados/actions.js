import {
    GET_EMPLEADOS_LIST_REQUEST,
    GET_EMPLEADOS_LIST_SUCCESS,
    SET_EMPLEADO_SUCCESS,
    SET_EMPLEADO_REQUEST,
    GET_EMPLEADOS_ERROR,
    SHOW_ADD_EMPLEADO_MODAL,
    HIDE_ADD_EMPLEADO_MODAL,
    SET_UPLOAD_FILES_EMPLEADO_REQUEST,
    SET_FILES_EMPLEADOS,
    GET_FILES_REQUEST,
    SEND_MAIL_EMPLEADOS_REQUEST,
    SEND_MAIL_EMPLEADOS_SUCCESS,
    SEND_MAIL_EMPLEADOS_ERROR
} from './constants';

export const getEmpleadosRequest = () => ( {
    type: GET_EMPLEADOS_LIST_REQUEST
} );

export const setEmpleadoRequest = ( empleado, files ) => ( {
    type: SET_EMPLEADO_REQUEST,
    payload: empleado,
    newFiles: files
} );

export const getEmpleadosList = ( empleados ) => ( {
    type: GET_EMPLEADOS_LIST_SUCCESS,
    payload: empleados
} );

export const setEmpleado = ( empleado ) => ( {
    type: SET_EMPLEADO_SUCCESS,
    payload: empleado
} );

export const getAddEmpleadoModal = () => ( {
    type: SHOW_ADD_EMPLEADO_MODAL
} );

export const hideAddEmpleadoModal = () => ( {
    type: HIDE_ADD_EMPLEADO_MODAL
} );

export const getError = ( error ) => ( {
    type: GET_EMPLEADOS_ERROR,
    payload: error
} );

export const setFilesEmpleado = ( files ) => ( {
    type: SET_FILES_EMPLEADOS,
    payload: files
} );

export const sendEmpleadoMailRequest = ( data ) =>( {
    type: SEND_MAIL_EMPLEADOS_REQUEST,
    payload: data
} );

export const sendEmpleadosEmailSuccess = ( response ) => ( {
    type: SEND_MAIL_EMPLEADOS_SUCCESS,
    payload: response
} );

export const sendEmpleadosEmailError = ( response ) => ( {
    type: SEND_MAIL_EMPLEADOS_ERROR,
    payload: response
} );

export const setUploadFilesEmpleadoRequest = ( file ) => ( {
    type: SET_UPLOAD_FILES_EMPLEADO_REQUEST,
    payload: file
} );

export const getFilesRequest = ( opcion, id ) => ( {
    type: GET_FILES_REQUEST,
    payload: opcion,
    id: id
} );