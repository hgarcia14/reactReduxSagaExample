import {
    VALIDATE_TOKEN_SURVEY_REQUEST,
    VALIDATE_TOKEN_SURVEY_SUCCESS,
    VALIDATE_TOKEN_SURVEY_ERROR,
    SAVE_SURVEY_REQUEST,
    SAVE_SURVEY_SUCESS,
    SAVE_SURVEY_ERROR
} from './constants';


export const validateTokenRequest = ( token ) => ( {
    type: VALIDATE_TOKEN_SURVEY_REQUEST,
    payload: token
} );

export const validateTokenSuccess = ( response ) => ( {
    type: VALIDATE_TOKEN_SURVEY_SUCCESS,
    payload: response
} );

export const validateTokenError = ( response ) => ( {
    type: VALIDATE_TOKEN_SURVEY_ERROR,
    payload: response
} );

export const saveSurveyRequest = ( empleadoId, token, respuestas ) => ( {
    type: SAVE_SURVEY_REQUEST,
    payload: { empleadoId, token, respuestas }
} );

export const saveSurveySuccess = ( response ) => ( {
    type: SAVE_SURVEY_SUCESS,
    payload: response
} );

export const saveSurveyError = ( error ) => ( {
    type: SAVE_SURVEY_ERROR,
    payload: error
} );