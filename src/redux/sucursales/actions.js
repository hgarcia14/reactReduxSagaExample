import {
    GET_SUCURSALES_LIST_REQUEST,
    GET_SUCURSALES_LIST_SUCCESS,
    SET_SUCURSAL_REQUEST,
    GET_SUCURSALES_ERROR,
    SET_SUCURSAL_SUCCESS,
    GET_SUCURSALES_MODAL,
    HIDE_SUCURSALES_MODAL
} from './constants';

export const getSucursalesRequest = () => ( {
    type: GET_SUCURSALES_LIST_REQUEST
} );

export const setSucursalRequest = ( sucursal ) => ( {
    type: SET_SUCURSAL_REQUEST,
    payload: sucursal
} );

export const getSucursalesList = ( sucursales ) => ( {
    type: GET_SUCURSALES_LIST_SUCCESS,
    payload: sucursales
} );

export const setSucursal = ( sucursal ) => ( {
    type: SET_SUCURSAL_SUCCESS,
    payload: sucursal
} );

export const getSucursalModal = () => ( {
    type: GET_SUCURSALES_MODAL
} );

export const hideSucursalModal = () => ( {
    type: HIDE_SUCURSALES_MODAL
} );

export const getError = ( error ) => ( {
    type: GET_SUCURSALES_ERROR,
    payload: error
} );