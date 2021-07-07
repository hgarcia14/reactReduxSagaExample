import {
    GET_ENCUESTOS_LIST_SUCCESS,
    SET_ENCUESTO_SUCCESS,
    GET_ENCUESTOS_ERROR,
    GET_ENCUESTOS_MODAL,
    HIDE_ENCUESTOS_MODAL
} from './constants';

const INIT_STATE = {
    encuestos: [],
    encuesto: {},
    modal: false,
    error: ''
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_ENCUESTOS_LIST_SUCCESS:
            return{
                ...state,
                encuestos: action.payload
            };
        case SET_ENCUESTO_SUCCESS:
            return{
                ...state,
                encuesto: action.payload
            };
        case GET_ENCUESTOS_ERROR:
            return{
                ...state,
                error: action.payload
            };
        case GET_ENCUESTOS_MODAL:
            return{
                ...state,
                modal: true
            };
        case HIDE_ENCUESTOS_MODAL:
            return{
                ...state,
                modal: false
            }
        default:
            return {...state};
    }
};