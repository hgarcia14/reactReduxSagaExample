import {
    VALIDATE_TOKEN_SURVEY_SUCCESS,
    VALIDATE_TOKEN_SURVEY_ERROR,
    SAVE_SURVEY_SUCESS,
    SAVE_SURVEY_ERROR
} from './constants'

const INIT_STATE = {
    empleadoId: 0,
    token: '',
    error: null,
    completeResponse: null
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case VALIDATE_TOKEN_SURVEY_SUCCESS:
            return {
                ...state,
                empleadoId: action.payload.empleadoId,
                token: action.payload.token
            };
        case VALIDATE_TOKEN_SURVEY_ERROR:
        case SAVE_SURVEY_ERROR:
            return {
                ...state,
                empleadoId: -2,
                token: '',
                completeResponse: null,
                error: action.payload
            };
        case SAVE_SURVEY_SUCESS:
            return {
                ...state,
                empleadoId: -1,
                token: '',
                error: null,
                completeResponse: action.payload
            };
        default:
            return { ...state };
        
    }
}