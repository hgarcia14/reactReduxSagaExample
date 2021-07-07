import {
    GET_CENTROS_LIST_REQUEST,
    GET_CENTROS_LIST_SUCCESS,
    SET_CENTRO_REQUEST,
    GET_CENTROS_ERROR,
    SET_CENTRO_SUCCESS,
    GET_CENTROS_MODAL,
    HIDE_CENTROS_MODAL
} from './constants';
 
export const getCentrosRequest = () => ( {
    type: GET_CENTROS_LIST_REQUEST,
    
} );

export const setCentroRequest = ( centrotrabajo ) => ( {
    type: SET_CENTRO_REQUEST,
    payload: centrotrabajo,
    
} );

export const getCentrosList = ( centrostrabajo ) => ( {
    type: GET_CENTROS_LIST_SUCCESS,
    payload: centrostrabajo
} );
    
export const setCentro = ( centrotrabajo ) => ( {
    type: SET_CENTRO_SUCCESS,
    payload: centrotrabajo
} );

export const getCentroModal = () => ( {
    type: GET_CENTROS_MODAL
} );

export const hideCentroModal = () => ( {
    type: HIDE_CENTROS_MODAL
} );

export const getError = ( error ) => ( {
    type: GET_CENTROS_ERROR,
    payload: error
} );