import {
    GET_ENCUESTOS_LIST_REQUEST,
    GET_ENCUESTOS_LIST_SUCCESS,
    SET_ENCUESTO_REQUEST,
    GET_ENCUESTOS_ERROR,
    SET_ENCUESTO_SUCCESS,
    GET_ENCUESTOS_MODAL,
    HIDE_ENCUESTOS_MODAL
} from './constants';

export const getEncuestosRequest = () => ( {
    type: GET_ENCUESTOS_LIST_REQUEST
} );

export const setEncuestoRequest = ( encuesto ) => ( {
    type: SET_ENCUESTO_REQUEST,
    payload: encuesto
} );

export const getEncuestosList = ( encuestos ) => ( {
    type: GET_ENCUESTOS_LIST_SUCCESS,
    payload: encuestos
} );

export const setEncuesto = ( encuesto ) => ( {
    type: SET_ENCUESTO_SUCCESS,
    payload: encuesto
} );

export const getEncuestoModal = () => ( {
    type: GET_ENCUESTOS_MODAL
} );

export const hideEncuestoModal = () => ( {
    type: HIDE_ENCUESTOS_MODAL
} );


export const getError = ( error ) => ( {
    type: GET_ENCUESTOS_ERROR,
    payload: error
} );

