import {
    GET_PUESTOS_LIST_REQUEST,
    SET_PUESTO_REQUEST,
    GET_PUESTOS_LIST_SUCCESS,
    GET_PUESTOS_ERROR,
    SET_PUESTO_SUCCESS,
    GET_PUESTOS_MODAL,
    HIDE_PUESTOS_MODAL
} from './constants';


export const getPuestosRequest = () => ( {
    type: GET_PUESTOS_LIST_REQUEST
} );
export const setPuestoRequest = ( puesto ) => ( {
    type: SET_PUESTO_REQUEST,
    payload: puesto
} );
export const getPuestosList = ( puestos ) => ( {
    type: GET_PUESTOS_LIST_SUCCESS,
    payload: puestos
} );

export const setPuestos = ( puesto ) => ( {
    type: SET_PUESTO_SUCCESS,
    payload: puesto
} );

export const getPuestosModal = () => ( {
    type: GET_PUESTOS_MODAL
} );

export const hidePuestosModal = () => ( {
    type: HIDE_PUESTOS_MODAL
} );
export const getError = ( error ) => ( {
    type: GET_PUESTOS_ERROR,
    payload: error
} );