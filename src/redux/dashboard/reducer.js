import {
    GET_SURVEYS_LIST_SUCCESS,
    GET_DASHBOARD_CARD_SUCCESS,
    GET_DASHBOARD_CHART_SUCCESS,
    GET_SURVEYS_ERROR,
    GET_DASHBOARD_CARD_ERROR,
    GET_DASHBOARD_CHART_ERROR,
    SHOW_MODAL_GLOBAL,
    HIDE_MODAL_GLOBAL,
    SHOW_MODAL_INDIVIDUAL,
    HIDE_MODAL_INDIVIDUAL
} from './constants';

const INIT_STATE = {
    encuestas: [],
    error: '',
    dashboardCard: null,
    dashboardChart: null,
    modalGlobal: false,
    modalIndividual : false
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case GET_SURVEYS_LIST_SUCCESS:
            return {
                ...state,
                encuestas: action.payload
            };
        case GET_DASHBOARD_CHART_ERROR:
        case GET_DASHBOARD_CARD_ERROR:
        case GET_SURVEYS_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case GET_DASHBOARD_CARD_SUCCESS:
            return {
                ...state,
                dashboardCard: action.payload
            };
        case GET_DASHBOARD_CHART_SUCCESS:
            return {
                ...state,
                dashboardChart: action.payload
            };
        case SHOW_MODAL_GLOBAL:
            return {
                ...state,
                modalGlobal: true
            };
        case HIDE_MODAL_GLOBAL:
            return {
                ...state,
                modalGlobal: false
            };
        case SHOW_MODAL_INDIVIDUAL:
            return {
                ...state,
                modalIndividual: true
            };
        case HIDE_MODAL_INDIVIDUAL:
            return {
                ...state,
                modalIndividual: false
            };
        default:
            return {...state};
    }
};