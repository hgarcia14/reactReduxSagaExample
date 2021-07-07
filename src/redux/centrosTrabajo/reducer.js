import {
    GET_CENTROS_LIST_SUCCESS,
    SET_CENTRO_SUCCESS,
    GET_CENTROS_ERROR,
    GET_CENTROS_MODAL,
    HIDE_CENTROS_MODAL
} from './constants';

const INIT_STATE = {
    centrostrabajo: [],
    centrotrabajo: null,
    modal: false,
    error: ''
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_CENTROS_LIST_SUCCESS:
            return{
                ...state,
                centrostrabajo: action.payload
            };
        case SET_CENTRO_SUCCESS:
            return{
                ...state,
                centrotrabajo: action.payload
            };
        case GET_CENTROS_ERROR:
            return{
                ...state,
                error: action.payload
            };
        case GET_CENTROS_MODAL:
            return{
                ...state,
                modal: true
            };
        case HIDE_CENTROS_MODAL:
            return{
                ...state,
                modal: false,
                centrotrabajo: null
            }
        default:
            return {...state};
    }
};