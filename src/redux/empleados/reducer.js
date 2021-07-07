import {
    GET_EMPLEADOS_LIST_SUCCESS,
    GET_EMPLEADOS_ERROR,
    SET_EMPLEADO_SUCCESS,
    SHOW_ADD_EMPLEADO_MODAL,
    HIDE_ADD_EMPLEADO_MODAL,
    SET_FILES_EMPLEADOS,
    SEND_MAIL_EMPLEADOS_SUCCESS,
    SEND_MAIL_EMPLEADOS_ERROR
} from './constants';

const INIT_STATE = {
    empleados: [],
    empleado: {},
    modal: false,
    newFiles: {},
    error: '',
    sendMailResponse: null
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_EMPLEADOS_LIST_SUCCESS:
            return{
                ...state,
                empleados: action.payload
            };
        case SET_EMPLEADO_SUCCESS:
            return{
                ...state,
                empleado: action.payload
            };
        case SHOW_ADD_EMPLEADO_MODAL:
            return{
                ...state,
                modal: true
            };
        case HIDE_ADD_EMPLEADO_MODAL:
            return{
                ...state,
                modal: false,
                empleado: {}
            };
        case GET_EMPLEADOS_ERROR:
            return{
                ...state,
                error: action.payload
            };
        case SET_FILES_EMPLEADOS:
            return {
                ...state,
                newFiles: action.payload
            };
        case SEND_MAIL_EMPLEADOS_SUCCESS:
            return{
                ...state,
                sendMailResponse: action.payload
            };
        case SEND_MAIL_EMPLEADOS_ERROR:
            return {
                ...state,
                error: action.payload,
                sendMailResponse: null
            }
        default:
            return {...state};
    }
};