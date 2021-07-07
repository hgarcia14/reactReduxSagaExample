import {
    GET_SUCURSALES_LIST_SUCCESS,
    SET_SUCURSAL_SUCCESS,
    GET_SUCURSALES_ERROR,
    GET_SUCURSALES_MODAL,
    HIDE_SUCURSALES_MODAL
} from './constants';

const INIT_STATE = {
    sucursales: [],
    sucursal: null,
    modal: false,
    error: ''
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_SUCURSALES_LIST_SUCCESS:
            return{
                ...state,
                sucursales: action.payload
            };
        case SET_SUCURSAL_SUCCESS:
            return{
                ...state,
                sucursal: action.payload
            };
        case GET_SUCURSALES_ERROR:
            return{
                ...state,
                error: action.payload
            };
        case GET_SUCURSALES_MODAL:
            return{
                ...state,
                modal: true
            };
        case HIDE_SUCURSALES_MODAL:
            return{
                ...state,
                sucursal: null,
                modal: false
            }
        default:
            return {...state};
    }
};