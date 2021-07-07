import {
    GET_SURVEYS_LIST_REQUEST,
    GET_SURVEYS_LIST_SUCCESS,
    GET_DASHBOARD_CARD_REQUEST,
    GET_DASHBOARD_CARD_SUCCESS,
    GET_DASHBOARD_CHART_REQUEST,
    GET_DASHBOARD_CHART_SUCCESS,
    GET_DASHBOARD_CHART_ERROR,
    GET_DASHBOARD_CARD_ERROR,
    GET_SURVEYS_ERROR,
    GET_GLOBAL_REPORT_REQUEST,
    GET_GLOBAL_REPORT_SUCCESS,
    SHOW_MODAL_GLOBAL,
    HIDE_MODAL_GLOBAL,
    SHOW_MODAL_INDIVIDUAL,
    HIDE_MODAL_INDIVIDUAL
} from './constants';
import api from '../../helpers/axios';

export const getSurveysListRequest = () => ( {
    type: GET_SURVEYS_LIST_REQUEST
} );

export const getSurveysListSuccess = ( response ) => ( {
    type: GET_SURVEYS_LIST_SUCCESS,
    payload: response
} );

export const getSurveysListError = ( response ) => ( {
    type: GET_SURVEYS_ERROR,
    payload: response
} );

/** Dashboard */
export const getDashboardCardRequest = () => ( {
    type: GET_DASHBOARD_CARD_REQUEST
} );

export const getDashboardCardSuccess = ( response ) => ( {
    type: GET_DASHBOARD_CARD_SUCCESS,
    payload: response
} );

export const setDashboardCardError = ( error ) => ( {
    type: GET_DASHBOARD_CARD_ERROR,
    payload: error
} );

export const getDashboardChartRequest = () => ( {
    type: GET_DASHBOARD_CHART_REQUEST
} );

export const getDashboardChartSuccess = ( response ) => ( {
    type: GET_DASHBOARD_CHART_SUCCESS,
    payload: response
} );

export const setDashboardChartError = ( error ) => ( {
    type: GET_DASHBOARD_CHART_ERROR,
    payload: error
} );

export const getGlobalReportRequest = ( data ) => ( {
    type: GET_GLOBAL_REPORT_REQUEST,
    payload: data
} );

export const getGlobalReportSuccess = ( response ) => ( {
    type: GET_GLOBAL_REPORT_SUCCESS,
    payload: response
} );

export const showModalGlobal = () => ( {
    type: SHOW_MODAL_GLOBAL
} );

export const hideModalGlobal = () => ( {
    type: HIDE_MODAL_GLOBAL
} );

export const showModalIndividual = () => ( {
    type: SHOW_MODAL_INDIVIDUAL
} );

export const hideModalIndividual = () => ( {
    type: HIDE_MODAL_INDIVIDUAL
} );

export const postGlobalReport = async ( data ) => {

    try {
        
        let resultado = await api.post( '/reportes/global', data );

        if( data.encuestaId === 1 ){
            if( resultado.data[0].hasOwnProperty( 'preguntas' ) ){
                return resultado.data;
            } else {
                return {mensaje: 'No hay registros'};
            }
        }
        return resultado.data;

    } catch ( error ) {
        console.log( error );
    }

}

export const postDetailReport = async ( data ) => {

    try {
        
        let resultado = await api.post( '/reportes/detallado', data );
        console.log(resultado.data);
        return resultado.data;

    } catch ( error ) {
        console.log( error );
    }

}
