import {
    GET_PROGRAMACIONDEEVENTOS_LIST_REQUEST,
    GET_PROGRAMACIONDEEVENTOS_LIST_SUCCESS,
    SET_PROGRAMACIONDEEVENTO_REQUEST,
    GET_PROGRAMACIONDEEVENTOS_ERROR,
    SET_PROGRAMACIONDEEVENTO_SUCCESS,
    GET_PROGRAMACIONDEEVENTOS_MODAL,
    HIDE_PROGRAMACIONDEEVENTOS_MODAL
} from './constants';

export const getProgramaciondeeventosRequest = () => ( {
    type: GET_PROGRAMACIONDEEVENTOS_LIST_REQUEST
} );
export const setProgramaciondeeventosRequest = ( programaciondeevento ) => ( {
    type: SET_PROGRAMACIONDEEVENTO_REQUEST,
    payload: programaciondeevento
} );
export const getProgramaciondeeventosList = ( programaciondeeventos ) => ( {
    type: GET_PROGRAMACIONDEEVENTOS_LIST_SUCCESS,
    payload: programaciondeeventos
} );
export const setProgramaciondeevento = ( programaciondeevento ) => ( {
    type: SET_PROGRAMACIONDEEVENTO_SUCCESS,
    payload: programaciondeevento
} );
export const getProgramaciondeeventosModal = () => ( {
    type: GET_PROGRAMACIONDEEVENTOS_MODAL
} );

export const hideProgramaciondeeventosModal = () => ( {
    type: HIDE_PROGRAMACIONDEEVENTOS_MODAL
} );

export const getError = ( error ) => ( {
    type: GET_PROGRAMACIONDEEVENTOS_ERROR,
    payload: error
} );
