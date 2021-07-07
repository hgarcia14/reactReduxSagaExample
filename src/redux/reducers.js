// @flow

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
import Sucursales from './sucursales/reducer';
import Puestos from './puestos/reducer';
import Departamentos from './departamentos/reducer';
import  Empleados from './empleados/reducer';
import Centrostrabajo from './centrosTrabajo/reducer';
import Dashboard from './dashboard/reducer';
import Alertas from './alertas/recuder';
import Surveys from './surveys/reducer';
import Window from './windowFocus/reducer';

export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    Sucursales,
    Puestos,
    Departamentos,
    Empleados,
    Centrostrabajo,
    Dashboard,
    Alertas,
    Surveys,
    Window
});
