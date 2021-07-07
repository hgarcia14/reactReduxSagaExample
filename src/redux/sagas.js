// @flow
import { all } from 'redux-saga/effects';
//import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import sucursalesSagas from './sucursales/saga';
import puestosSagas from './puestos/saga';
import departamentosSagas from './departamentos/saga';
import empleadosSagas from './empleados/saga';
import centrosSagas from './centrosTrabajo/saga';
import dashboardSagas from './dashboard/saga';
import surveysSagas from './surveys/saga';
import authSaga from './auth/saga';
import windowSaga from './windowFocus/saga';

export default function* rootSaga(getState: any): any {
    yield all( [
        authSaga(), 
        layoutSaga(), 
        appMenuSaga(), 
        sucursalesSagas(),
        puestosSagas(),
        departamentosSagas(),
        empleadosSagas(),
        centrosSagas(),
        dashboardSagas(),
        surveysSagas(),
        windowSaga()
    ] );
}
