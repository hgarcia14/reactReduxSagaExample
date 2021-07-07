import {
    GET_PROGRAMACIONDEEVENTOS_LIST_SUCCESS,
    GET_PROGRAMACIONDEEVENTOS_ERROR,
    SET_PROGRAMACIONDEEVENTO_SUCCESS,
    GET_PROGRAMACIONDEEVENTOS_MODAL,
    HIDE_PROGRAMACIONDEEVENTOS_MODAL
} from './constants';

const INIT_STATE = {
    programaciondeeventos: [],
    programaciondeevento: {},
    modal: false,
    error: ''
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_PROGRAMACIONDEEVENTOS_LIST_SUCCESS:
            return{
                ...state,
                programaciondeeventos: action.payload
            };
            case SET_PROGRAMACIONDEEVENTO_SUCCESS:
            return{
                ...state,
                programaciondeevento: action.payload
            };
        case GET_PROGRAMACIONDEEVENTOS_ERROR:
            return{
                ...state,
                error: action.payload
            };
            case GET_PROGRAMACIONDEEVENTOS_MODAL:
                return{
                    ...state,
                    modal: true
                };
            case HIDE_PROGRAMACIONDEEVENTOS_MODAL:
                return{
                    ...state,
                    modal: false
                }
        default:
            return {...state};
    }
};
