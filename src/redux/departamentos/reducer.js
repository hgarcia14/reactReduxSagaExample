import {
    GET_DEPARTAMENTOS_LIST_SUCCESS,
    GET_DEPARTAMENTOS_ERROR,
    SET_DEPARTAMENTO_SUCCESS,
    GET_DEPARTAMENTOS_MODAL,
    HIDE_DEPARTAMENTOS_MODAL
} from './constants';

const INIT_STATE = {
    departamentos: [],
    departamento: null,
    modal: false,
    error: ''
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_DEPARTAMENTOS_LIST_SUCCESS:
            return{
                ...state,
                departamentos: action.payload
            };
            case SET_DEPARTAMENTO_SUCCESS:
            return{
                ...state,
                departamento: action.payload
            };
        case GET_DEPARTAMENTOS_ERROR:
            return{
                ...state,
                error: action.payload
            };
            case GET_DEPARTAMENTOS_MODAL:
                return{
                    ...state,
                    modal: true
                };
            case HIDE_DEPARTAMENTOS_MODAL:
                return{
                    ...state,
                    departamento: null,
                    modal: false
                }
        default:
            return {...state};
    }
};
