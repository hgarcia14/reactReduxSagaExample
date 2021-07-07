import {
    GET_DEPARTAMENTOS_LIST_REQUEST,
    GET_DEPARTAMENTOS_LIST_SUCCESS,
    SET_DEPARTAMENTO_REQUEST,
    GET_DEPARTAMENTOS_ERROR,
    SET_DEPARTAMENTO_SUCCESS,
    GET_DEPARTAMENTOS_MODAL,
    HIDE_DEPARTAMENTOS_MODAL
} from './constants';

export const getDepartamentosRequest = () => ( {
    type: GET_DEPARTAMENTOS_LIST_REQUEST
} );
export const setDepartamentosRequest = ( departamento ) => ( {
    type: SET_DEPARTAMENTO_REQUEST,
    payload: departamento
} );
export const getDepartamentosList = ( departamentos ) => ( {
    type: GET_DEPARTAMENTOS_LIST_SUCCESS,
    payload: departamentos
} );
export const setDepartamento = ( departamento ) => ( {
    type: SET_DEPARTAMENTO_SUCCESS,
    payload: departamento
} );
export const getDepartamentosModal = () => ( {
    type: GET_DEPARTAMENTOS_MODAL
} );

export const hideDepartamentosModal = () => ( {
    type: HIDE_DEPARTAMENTOS_MODAL
} );

export const getError = ( error ) => ( {
    type: GET_DEPARTAMENTOS_ERROR,
    payload: error
} );
