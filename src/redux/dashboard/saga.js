import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from '../../helpers/restApi';
import * as actions from './actions';
import { 
    GET_SURVEYS_LIST_REQUEST,
    GET_DASHBOARD_CARD_REQUEST,
    GET_DASHBOARD_CHART_REQUEST,
    GET_GLOBAL_REPORT_REQUEST
} from './constants';


function* getSurveyListRequest(){
    try {
        let result = yield call( api.getEncuestasList );
        yield put( actions.getSurveysListSuccess( result.data ) );
    } catch ( error ) {
        console.log( error );
        yield put( actions.getSurveysListError( error ) );
    }
}

function* getDashboardCardRequest() {
    let result;
    try {

        result = yield call( api.getDashboardCardRequest );
        yield put( actions.getDashboardCardSuccess( result.data ) );
        
    } catch ( error ) {
        console.log(error);
    }
}

function* getDashboardChartRequest() {
    try {
        let result = yield call( api.getDashboardChartRequest );
        yield put( actions.getDashboardChartSuccess( result.data ) );
    } catch ( error ) {
        console.log(error);
    }
}

function* getGlobalReportRequest( action ){
    try {
        let result = yield call( api.getGlobalReportRequest, action.payload );
        yield put( actions.getGlobalReportSuccess( result.data ) );
    } catch (error) {
        console.log( error );
    }
}

function* watchGetSurveysRequest(){
    yield takeEvery( GET_SURVEYS_LIST_REQUEST, getSurveyListRequest );
}

function* watchGetDashboardCardRequest(){
    yield takeEvery( GET_DASHBOARD_CARD_REQUEST, getDashboardCardRequest );
}

function* watchGetDashboardChartRequest(){
    yield takeEvery( GET_DASHBOARD_CHART_REQUEST, getDashboardChartRequest );
}

function* watchGetGlobalReportRequest(){
    yield takeEvery( GET_GLOBAL_REPORT_REQUEST, getGlobalReportRequest );
}

function* dashboardSagas() {
    yield all([
        fork( watchGetSurveysRequest ),
        fork( watchGetDashboardCardRequest ),
        fork( watchGetDashboardChartRequest ),
        fork( watchGetGlobalReportRequest )
    ]);
}

export default dashboardSagas;