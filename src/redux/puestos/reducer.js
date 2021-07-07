import {
    GET_PUESTOS_LIST_SUCCESS,
    GET_PUESTOS_ERROR,
    SET_PUESTO_SUCCESS,
    GET_PUESTOS_MODAL,
    HIDE_PUESTOS_MODAL
} from './constants';

const INIT_STATE = {
    puestos: [],
    puesto: null,
    modal: false,
    error: ''
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_PUESTOS_LIST_SUCCESS:
            return{
                ...state,
                puestos: action.payload
            };
            case SET_PUESTO_SUCCESS:
            return{
                ...state,
                puesto: action.payload
            };
        case GET_PUESTOS_ERROR:
            return{
                ...state,
                error: action.payload
            };
            case GET_PUESTOS_MODAL:
            return{
                ...state,
                modal: true
            };
        case HIDE_PUESTOS_MODAL:
            return{
                ...state,
                puesto: null,
                modal: false
            }
        default:
            return {...state};
    }
};