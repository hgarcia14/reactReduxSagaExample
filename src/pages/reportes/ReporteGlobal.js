/* eslint-disable no-sequences */
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../components/PageTitle';
import { Row, Col, FormGroup, Label, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import * as actionsDashboard from '../../redux/dashboard/actions';
import * as actionsCentrostrabajo from '../../redux/centrosTrabajo/actions';
import ReporteGlobalPDF from './ReporteGlobalPDF';
import Container from 'reactstrap/lib/Container';
import * as actionsAlerta from '../../redux/alertas/actions';
import * as actionsEmpleados from '../../redux/empleados/actions';
import * as actionsPuestos from '../../redux/puestos/actions';
import * as actionsDepartamentos from '../../redux/departamentos/actions';
import * as actionsSucursales from '../../redux/sucursales/actions';
import * as _ from 'lodash';

const ReporteGlobal = ( props ) => {
    const {
        //buttonLabel,
        className
      } = props;
    const dispatch = useDispatch();

    const dashboard = useSelector( state => state.Dashboard );
    const sucursalesState = useSelector( state => state.Sucursales );
    const centrosState = useSelector( state => state.Centrostrabajo );
    const empleadosState = useSelector( state => state.Empleados );
    const puestosState = useSelector( state => state.Puestos );
    const departamentosState = useSelector( state => state.Departamentos );
    const modalPDF = useSelector( state => state.Dashboard.modalGlobal );
    const userInfo = useSelector( state => state.Auth.userInfo );

    let periodosArray = [];
    let empleadosArray = [];
    let puestosArray = [];
    let departamentosArray = [];
    let sucursalesArray = [];
    let centrosTrabajoArray = [];
    let encuestasArray = [];

    const [filtros, setFiltros] = useState( {
        periodo: '',
        encuestaId: 0,
        empleadoId: 0,
        puestoId: 0,
        departamentoId: 0,
        sucursalId: 0,
        centrotrabajoId: 0,
        centrotrabajoSelected: null,
        empleadosSelected: null,
        puestoSelected: null,
        departamentoSelected: null
    } );

    const { 
        periodo, 
        encuestaId,
        empleadoId,
        puestoId,
        departamentoId,
        sucursalId, 
        centrotrabajoId,
        centrotrabajoSelected,
        empleadosSelected,
        puestoSelected,
        departamentoSelected
    } = filtros;

    const [resultado, setResultado] = useState(null);

    useEffect( () => {

        dispatch( actionsDashboard.getDashboardCardRequest() );

        dispatch( actionsDashboard.getSurveysListRequest() );

        dispatch( actionsSucursales.getSucursalesRequest() );

        dispatch( actionsCentrostrabajo.getCentrosRequest() );

        dispatch( actionsEmpleados.getEmpleadosRequest() );

        dispatch( actionsPuestos.getPuestosRequest() );

        dispatch( actionsDepartamentos.getDepartamentosRequest() );

        // eslint-disable-next-line
    }, [] );

    /** Asignamos valores a los combos */

    periodosArray = dashboard.dashboardCard ? 
                        ( dashboard.dashboardCard[0].hasOwnProperty( 'periodos' ) ? 
                            dashboard.dashboardCard[0].periodos.map( ( periodo ) => ( { value: periodo.fecha, label: periodo.fecha } ) ) : [] ) : [];

    encuestasArray = dashboard.encuestas ? dashboard.encuestas.map( r => ( {value: r.encuestaId, label: r.encuestaNombre} ) ) : [];

    if( empleadosState ){
        empleadosArray.push( {value: 0, label: 'TODOS', centrotrabajoId:0} );
        empleadosState.empleados.map( ( row ) => (
            empleadosArray.push( {
                value: Number( row.empleadoId ), 
                label: `${row.empleadoNombre} ${row.empleadoApellidos}`, 
                centrotrabajoId: Number( row.centrotrabajoId ),
                puestoId: Number( row.puestoId ),
                departamentoId: Number( row.departamentoId )
            } )
        ) );
    }

    if( puestosState ){
        puestosArray.push( {value: 0, label: 'TODOS'} );
        puestosState.puestos.map( ( row ) => (
            puestosArray.push( {value: Number( row.puestoId ), label: row.puestoNombre} )
        ) );
    }

    if( departamentosState ){
        departamentosArray.push( {value: 0, label: 'TODOS'} );
        departamentosState.departamentos.map( ( row ) => (
            departamentosArray.push( {value: Number( row.departamentoId ), label: row.departamentoNombre} )
        ) );
    }

    if( sucursalesState ){
        sucursalesArray.push( {value: 0, label: 'TODAS'} );
        sucursalesState.sucursales.map( ( row ) => (
            sucursalesArray.push( {value: Number( row.sucursalId ), label: row.sucursalNombre} )
        ) );
    }

    if( centrosState ){
        centrosTrabajoArray.push( {value: 0, label: 'TODOS', sucursalId: 0} );
        centrosState.centrostrabajo.map( ( row ) => (
            centrosTrabajoArray.push( {value: Number( row.centrotrabajoId ), label: row.centrotrabajoNombre, sucursalId: Number( row.sucursalId )} )
        ) );
    }
    

    const consultarReporte = async () => {
        let result;

        if( periodo === '' || encuestaId === 0 ){
            dispatch(
                actionsAlerta.showAlert(
                    'Error', 
                    'Es necesario seleccionar la fecha de aplicación y una encuesta.',
                    'danger'
                )
            );
        } else {

            if( encuestaId === 1 ){
                result = await actionsDashboard.postGlobalReport( 
                    {
                        periodo: periodo !== '' ? periodo : '',
                        encuestaId: encuestaId !== 0 ? encuestaId : 0,
                        empleadoId: empleadoId !== 0 ? empleadoId : 0, 
                        puestoId: puestoId !== 0 ? puestoId : 0,
                        departamentoId: departamentoId !== 0 ? departamentoId : 0,
                        sucursalId: sucursalId !== 0 ? sucursalId : 0, 
                        centrotrabajoId: centrotrabajoId !== 0 ? centrotrabajoId : 0,
                    }
                );
            } else {
                result = await actionsDashboard.postDetailReport( 
                    {
                        periodo: periodo !== '' ? periodo : '',
                        encuestaId: encuestaId !== 0 ? encuestaId : 0,
                        empleadoId: empleadoId !== 0 ? empleadoId : 0, 
                        puestoId: puestoId !== 0 ? puestoId : 0,
                        departamentoId: departamentoId !== 0 ? departamentoId : 0,
                        sucursalId: sucursalId !== 0 ? sucursalId : 0, 
                        centrotrabajoId: centrotrabajoId !== 0 ? centrotrabajoId : 0,
                    }
                );
            }
    
            setResultado( result );
        }
    }

    const handleChangePeriodo = e => {

        setFiltros( {
            ...filtros,
            periodo: e.value
        } );

    }

    const handleChangeEncuesta = e => {

        setFiltros( {
            ...filtros,
            encuestaId: e.value
        } );

    }

    const handleChangeEmpleado = e => {

        setFiltros( {
            ...filtros,
            empleadoId: e.value,
            empleadosSelected: {value: e.value, label: e.label, centrotrabajoId: e.centrotrabajoId}
        } );

    }

    const handleChangePuesto = e => {

        setFiltros( {
            ...filtros,
            puestoId: e.value,
            puestoSelected: {value: e.value, label: e.label},
            empleadoId: 0,
            empleadosSelected: {value: 0, label: 'TODOS', centrotrabajoId: 0, puestoId: 0, departamentoId: 0}
        } );

    }

    const handleChangeDepartamento = e => {

        setFiltros( {
            ...filtros,
            departamentoId: e.value,
            departamentoSelected: {value: e.value, label: e.label},
            empleadoId: 0,
            empleadosSelected: {value: 0, label: 'TODOS', centrotrabajoId: 0, puestoId: 0, departamentoId: 0}
        } );

    }

    const handleChangeSucursal = e => {

        setFiltros( {
            ...filtros,
            sucursalId: e.value,
            centrotrabajoId: 0,
            centrotrabajoSelected: {value: 0, label: 'TODOS', sucursalId: 0},
            puestoId: 0,
            puestoSelected: {value:0, label: 'TODOS'},
            departamentoId: 0,
            departamentoSelected: {value: 0, label: 'TODOS'},
            empleadoId: 0,
            empleadosSelected: {value: 0, label: 'TODOS', centrotrabajoId: 0, puestoId: 0, departamentoId: 0}
        } );

    }

    const handleChangeCentroTrabajo = e => {

        setFiltros( {
            ...filtros,
            centrotrabajoId: e.value,
            centrotrabajoSelected: {value: e.value, label: e.label, sucursalId: e.sucursalId},
            puestoId: 0,
            puestoSelected: {value:0, label: 'TODOS'},
            departamentoId: 0,
            departamentoSelected: {value: 0, label: 'TODOS'},
            empleadoId: 0,
            empleadosSelected: {value: 0, label: 'TODOS', centrotrabajoId: 0, puestoId: 0, departamentoId: 0}
        } );

    }

    const togglePDF = () => {

        if( !modalPDF ){
            dispatch( actionsDashboard.showModalGlobal() );
        } else {
            dispatch( actionsDashboard.hideModalGlobal() );
        }

    }

    const cargarCentrosTrabajo = ( inputValue, callback ) => {
        
        callback(
            _.filter( centrosTrabajoArray, ( e ) => ( e.value === 0 || e.sucursalId === ( sucursalId !== 0 ? sucursalId : e.sucursalId ) ) 
            && e.label.toLowerCase().includes( inputValue.toLowerCase() ) )
        );
    }

    const cargarEmpleados = ( inputValue, callback ) => {
        
        callback(
            _.filter( empleadosArray, ( e ) => ( e.value === 0 
                || ( e.centrotrabajoId === ( centrotrabajoId !== 0 ? centrotrabajoId : e.centrotrabajoId )
                    && e.puestoId === ( puestoId !== 0 ? puestoId : e.puestoId )
                    && e.departamentoId === ( departamentoId !== 0 ? departamentoId : e.departamentoId ) ) ) 
                        && e.label.toLowerCase().includes( inputValue.toLowerCase() ) )
        );
    }

    return ( 
        <Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Reportes', path: '/Reportes/Resultado global' },
                            { label: 'Resultado global', path: '/Reportes/Resultado global', active: true },
                        ]}
                        title={'Resultado global'}
                    />
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <Row>
                        <Col lg={3}>
                            <FormGroup>
                                <Label for="fechas">Fecha de aplicación</Label>
                                <Select
                                    options={periodosArray}
                                    onChange={handleChangePeriodo}
                                    isSearchable={true}
                                    placeholder='Seleccione periodo'
                                    noOptionsMessage={() => 'Sin datos'}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3}>
                            <FormGroup>
                                <Label for="encuestas">Encuesta</Label>
                                <Select
                                    options={encuestasArray}
                                    onChange={handleChangeEncuesta}
                                    isSearchable={true}
                                    placeholder='Seleccione encuesta'
                                    noOptionsMessage={() => 'Sin datos'}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3}>
                            <FormGroup>
                                <Label for="encuesta">Sucursal</Label>
                                <Select
                                    options={sucursalesArray}
                                    onChange={handleChangeSucursal}
                                    defaultValue={sucursalesArray[0]}
                                    isSearchable={true}
                                    placeholder='Seleccione sucursal'
                                    noOptionsMessage={() => 'Sin datos'}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3}>
                            <FormGroup>
                                <Label for="centroTrabajo">Centro de trabajo</Label>
                                <AsyncSelect
                                    loadOptions={cargarCentrosTrabajo}
                                    defaultOptions={sucursalId !== 0 ? 
                                        _.filter( centrosTrabajoArray, ( e ) => e.value === 0 || e.sucursalId === sucursalId ) : centrosTrabajoArray}
                                    value={centrotrabajoSelected || centrosTrabajoArray[0]}
                                    isSearchable={true}
                                    onChange={handleChangeCentroTrabajo}
                                    noOptionsMessage={() => 'Sin datos'}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3}>
                            <FormGroup>
                                <Label for="puesto">Puesto</Label>
                                <Select
                                    options={puestosArray}
                                    onChange={handleChangePuesto}
                                    value={puestoSelected || puestosArray[0]}
                                    isSearchable={true}
                                    placeholder='Seleccione puesto'
                                    noOptionsMessage={() => 'Sin datos'}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3}>
                            <FormGroup>
                                <Label for="departamento">Departamento</Label>
                                <Select
                                    options={departamentosArray}
                                    onChange={handleChangeDepartamento}
                                    defaultValue={departamentoSelected || departamentosArray[0]}
                                    isSearchable={true}
                                    placeholder='Seleccione departamento'
                                    noOptionsMessage={() => 'Sin datos'}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3}>
                            <FormGroup>
                                <Label for="encuesta">Empleado</Label>
                                <AsyncSelect
                                    loadOptions={cargarEmpleados}
                                    defaultOptions={centrotrabajoId !== 0 || puestoId !== 0 || departamentoId !== 0 ? 
                                        _.filter( empleadosArray, ( e ) => ( e.value === 0 
                                            || ( e.centrotrabajoId === ( centrotrabajoId !== 0 ? centrotrabajoId : e.centrotrabajoId )
                                                && e.puestoId === ( puestoId !== 0 ? puestoId : e.puestoId )
                                                && e.departamentoId === ( departamentoId !== 0 ? departamentoId : e.departamentoId ) ) ) ) : empleadosArray}
                                    value={empleadosSelected || empleadosArray[0]}
                                    isSearchable={true}
                                    placeholder='Seleccione empleado'
                                    onChange={handleChangeEmpleado}
                                    noOptionsMessage={() => 'Sin datos'}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3} className="d-flex align-items-center">
                            <Row>
                                <Col><Button color="primary" onClick={consultarReporte}>Consultar</Button></Col>
                                <Col>
                                    <Button
                                        color='secondary'
                                        disabled={resultado ? false: true}
                                        onClick={togglePDF}>PDF
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br/>
                    {
                        !resultado ? '' :
                            resultado.hasOwnProperty( 'mensaje' ) ? 
                                <div className='text-center'>No se encontraron registros</div> :
                                resultado[0].hasOwnProperty( 'categorias' ) ? 
                        <Container>
                            <Row>
                                <Col lg={12} className="text-center">
                                    <h5>Resultado general</h5>
                                </Col>
                            </Row>
                            <Row>
                                <table className='table'>
                                    {
                                        resultado.map(
                                            ( r, i ) => (
                                                <Fragment key={i}>
                                                    <thead className='thead-light'>
                                                        <tr>
                                                            <th>Encuesta</th>
                                                            <th className='text-center'>Empleado</th>
                                                            <th className='text-center'>Resultado general</th>
                                                            <th className='text-center'>Nivel de riesgo</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{r.encuesta}</td>
                                                            <td className='text-center'>{r.empleado}</td>
                                                            <td className='text-center'>{r.resultado}</td>
                                                            <td className='text-center'>{r.nivel}</td>
                                                            <td className='text-center'><i className={`uil ${r.icono} font-size-24 ${r.iconoColor}`}></i></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan='5' className='text-center'><h5>Resultado por categoría y dominio</h5></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan='2'><strong>Categoría y dominio</strong></td>
                                                            <td className='text-center'><strong>Resultado</strong></td>
                                                            <td className='text-center'><strong>Nivel de riesgo</strong></td>
                                                            <td></td>
                                                        </tr>
                                                    {
                                                        r.categorias.map(
                                                            ( c, x ) => (
                                                                <Fragment key={x}>
                                                                    <tr>
                                                                        <td colSpan='2'>{c.categoria}</td>
                                                                        <td className='text-center'>{c.resultado}</td>
                                                                        <td className='text-center'>{c.nivel}</td>
                                                                        <td className='text-center'><i className={`uil ${c.icono} font-size-24 ${c.iconoColor}`}></i></td>
                                                                    </tr>
                                                                    {
                                                                        c.dominios.map(
                                                                            ( d, y ) => (
                                                                                <tr key={y}>
                                                                                    <td colSpan='2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{d.dominio}</td>
                                                                                    <td className='text-center'>{d.resultado}</td>
                                                                                    <td className='text-center'>{d.nivel}</td>
                                                                                    <td className='text-center'><i className={`uil ${d.icono} font-size-24 ${d.iconoColor}`}></i></td>
                                                                                </tr>
                                                                            )
                                                                        )
                                                                    }
                                                                </Fragment>
                                                            )
                                                        )
                                                    }
                                                    </tbody>
                                                </Fragment>
                                            )
                                        )
                                    }
                                </table>
                            </Row>
                        </Container>
                        :
                        <Container>
                            <Row>
                                <Col lg={12} className="text-center">
                                    <h4>Resultado general ATS</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12} className="text-center">
                                    <h4>Conteo de respuestas por sección</h4>
                                </Col>
                            </Row>
                            <Row>
                                <table className='table'>
                                {
                                    resultado.map( 
                                        ( row, i ) => (
                                            <Fragment key={i}>
                                                <thead className='thead-light'>
                                                    <tr>
                                                        <th>{row.seccionNombre}</th>
                                                        <th className='text-center'>Si</th>
                                                        <th className='text-center'>No</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        row.hasOwnProperty( 'preguntas' ) ?
                                                            row.preguntas.map( 
                                                                ( p, x ) => (
                                                                    <tr key={x}>
                                                                        <td>{`${p.preguntaNumero} ${p.pregunta}`}</td>
                                                                        <td className='text-center'>{p.si}</td>
                                                                        <td className='text-center'>{p.no}</td>
                                                                    </tr>
                                                                )
                                                            )
                                                        :
                                                            null
                                                    }
                                                </tbody>
                                            </Fragment>
                                        ) 
                                    
                                    )
                                }
                                </table>
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <h5>Diagnostico: {resultado[0].diagnostico}</h5>
                                </Col>
                            </Row>
                        </Container>
                    }
                </CardBody>
            </Card>
            <Modal isOpen={modalPDF} toggle={togglePDF} size="lg" className={className, "modal-lg"}>
                <ModalHeader toggle={togglePDF}>
                    Reporte global
                </ModalHeader>
                <ModalBody>
                    <div className="card h100 p20 mt20">
                        <div id="pfDoc" style={{ height: '100vh' }}>
                            <ReporteGlobalPDF pdf={resultado} user={userInfo} />
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </Fragment>
    );
}
 
export default ReporteGlobal;