import {
    GET_EVENTOS_LIST_SUCCESS,
    SET_EVENTO_SUCCESS,
    GET_EVENTOS_ERROR,
    GET_EVENTOS_MODAL,
    HIDE_EVENTOS_MODAL
} from './constants';

const INIT_STATE = {
    eventos: [],
    evento: {},
    modal: false,
    error: ''
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_EVENTOS_LIST_SUCCESS:
            return{
                ...state,
                eventos: action.payload
            };
        case SET_EVENTO_SUCCESS:
            return{
                ...state,
                evento: action.payload
            };
        case GET_EVENTOS_ERROR:
            return{
                ...state,
                error: action.payload
            };
        case GET_EVENTOS_MODAL:
            return{
                ...state,
                modal: true
            };
        case HIDE_EVENTOS_MODAL:
            return{
                ...state,
                modal: false
            }
        default:
            return {...state};
    }
};