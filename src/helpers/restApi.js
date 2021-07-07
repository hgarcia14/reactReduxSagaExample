import api from './axios';

/**
 * Sucursales endpoints
 */

 export const getSucursalesList = () => {
    return api.get( '/sucursales/list' );
 };

 export const setSucursal = ( sucursal ) => {
    return api.post( '/sucursales', sucursal );
 };

 /** Puestos endpoints */

 export const getPuestosList = () => {
   return api.get( '/puestos/list' );
};

export const setPuestos = ( puesto ) => {
   return api.post( '/puestos', puesto );
};

/** Departamentos endpoints */
export const getDepartamentosList = () =>{
   return api.get( '/departamentos/list' );
};

export const setDepartamento = ( departamento ) => {
   return api.post( '/departamentos', departamento );
};

/** Empleados endpoints */
export const getEmpleadosList = () =>{
   return api.get( '/empleados/list' );
};

export const setEmpleado = ( empleado ) =>{
   return api.post( '/empleados', empleado );
};

export const sendEmpleadoMail = ( data ) =>{
   return api.post( '/email/send', data );
};

export const setFiles = ( files, opcion, id ) => {
    return api.post( `/files?opcion=${opcion}&id=${id}`, files, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    } );
};

export const getFiles = ( opcion, id ) => {
    return api.get( `/files/${opcion}/${id}` );
};

/** Centros  */
export const getCentrosList=()=>{
 return api.get("/centrostrabajo/list")
};

export const setCentro=(centrostrabajo)=>{
   return api.post("/centrostrabajo", centrostrabajo)
};

/**encuestos */
export const getEncuestasList = ( ) =>{
   return api.get(`/encuestas/-1?filter[preguntaNumero][from]=1&filter[preguntaNumero][to]=5`);
};

/** Surveys */
export const validateTokenRequest = ( token ) => {
   return api.get( `/email/validarencuesta/${token}` );
};

export const saveSurveyRequest = ( empleadoId, token, data ) => {
   return api.post( `/email/guardarencuestarespuestas/${empleadoId}/${token}`, data );
};

/** Dashboard */
export const getDashboardCardRequest = () => {
   return api.get( '/dashboard/1' );
};

export const getDashboardChartRequest = () => {
   return api.get( '/dashboard/2' );
};

/** Auth */
export const getAuth = ( token ) => {
   return api.post( '/auth', {'GUID': token} );
};

export const getUserImage = ( userId ) => {
   return api.post( '/auth/userimage', { 'id': userId } );
}

/** Validate windows focus */
export const getWindowFocusRequest = ( token ) => {
   return api.get( `/auth/verifysession/${token}` );
};

/** Reports */
export const getGlobalReportRequest = ( data ) => {
   return api.get( `/report/global/`, data );
}