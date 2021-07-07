import {
    GET_EVENTOS_LIST_REQUEST,
    GET_EVENTOS_LIST_SUCCESS,
    SET_EVENTO_REQUEST,
    GET_EVENTOS_ERROR,
    SET_EVENTO_SUCCESS,
    GET_EVENTOS_MODAL,
    HIDE_EVENTOS_MODAL
} from './constants';
 
export const getEventosRequest = () => ( {
    type: GET_EVENTOS_LIST_REQUEST
} );

export const setEventoRequest = ( evento ) => ( {
    type: SET_EVENTO_REQUEST,
    payload: evento
} );

export const getEventosList = ( eventos ) => ( {
    type: GET_EVENTOS_LIST_SUCCESS,
    payload: eventos
} );

export const setEvento = ( evento ) => ( {
    type: SET_EVENTO_SUCCESS,
    payload: evento
} );

export const getEventoModal = () => ( {
    type: GET_EVENTOS_MODAL
} );

export const hideEventoModal = () => ( {
    type: HIDE_EVENTOS_MODAL
} );

export const getError = ( error ) => ( {
    type: GET_EVENTOS_ERROR,
    payload: error
} );