/* eslint-disable no-sequences */
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../components/PageTitle';
import { Row, Col, FormGroup, Label, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Select from 'react-select';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import * as actionsDashboard from '../../redux/dashboard/actions';
import * as actionsEmpleados from '../../redux/empleados/actions';
import ReporteIndividualPDF from './ReporteIndividualPDF';
import Container from 'reactstrap/lib/Container';
import * as actionsAlerta from '../../redux/alertas/actions';

const ReporteIndividual = ( props ) => {
    const {
        //buttonLabel,
        className
      } = props;
    const dispatch = useDispatch();

    const dashboard = useSelector( state => state.Dashboard );
    const empleadosState = useSelector( state => state.Empleados );
    const modalPDF = useSelector( state => state.Dashboard.modalIndividual );
    const userInfo = useSelector( state => state.Auth.userInfo );

    const [filtros, setFiltros] = useState( {
        periodo: null,
        encuesta: null,
        empleado: null
    } );

    const { periodo, encuesta, empleado } = filtros;

    const [resultado, setResultado] = useState(null);

    useEffect( () => {

        dispatch( actionsDashboard.getDashboardCardRequest() );

        dispatch( actionsDashboard.getSurveysListRequest() );

        dispatch( actionsEmpleados.getEmpleadosRequest() );

        // eslint-disable-next-line
    }, [] );

    const periodos = dashboard.dashboardCard ? 
                        ( dashboard.dashboardCard[0].hasOwnProperty( 'periodos' ) ? 
                            dashboard.dashboardCard[0].periodos.map( ( periodo ) => ( { value: periodo.fecha, label: periodo.fecha } ) ) : [] ) : [];
    const encuestas = dashboard ? dashboard.encuestas.map( ( encuesta ) => ( { value: encuesta.encuestaId, label: encuesta.encuestaNombre } ) ) : [];
    const empleados = empleadosState ? empleadosState.empleados.map( ( e ) => ( { value: e.empleadoId, label: `${e.empleadoNombre} ${e.empleadoApellidos}` } ) ) : [];
    

    const consultarReporte = async () => {
        let result;

        if( !empleado || !encuesta || !periodo ){

            dispatch(
                actionsAlerta.showAlert(
                    'Error', 
                    'Es necesario seleccionar por lo menos una encuesta, periodo y empleado.',
                    'danger'
                )
            );

        } else {

            result = await actionsDashboard.postGlobalReport( 
                {
                    empleadoId: empleado ? empleado : 0, 
                    encuestaId: encuesta ? encuesta : 0, 
                    centrotrabajoId: 0, 
                    periodo: periodo ? periodo : ''
                }
            );
    
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
            encuesta: e.value
        } );

    }

    const handleChangeEmpleado = e => {

        setFiltros( {
            ...filtros,
            empleado: e.value
        } );

    }

    const togglePDF = () => {

        if( !modalPDF ){
            dispatch( actionsDashboard.showModalIndividual() );
        } else {
            dispatch( actionsDashboard.hideModalIndividual() );
        }

    }

    return ( 
        <Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Reportes', path: '/Reportes/Resultado individual' },
                            { label: 'Resultado individual', path: '/Reportes/Resultado individual', active: true },
                        ]}
                        title={'Resultado individual'}
                    />
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <Row>
                        <Col lg={3}>
                            <FormGroup>
                                <Label for="empleado">Empleado</Label>
                                <Select
                                    options={empleados}
                                    onChange={handleChangeEmpleado}
                                    isSearchable={true}
                                    placeholder='Seleccione empleado'
                                    noOptionsMessage={() => 'Sin datos'}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3}>
                            <FormGroup>
                                <Label for="encuestasEjecutadas">Periodo de evaluación</Label>
                                <Select
                                    options={periodos}
                                    onChange={handleChangePeriodo}
                                    isSearchable={true}
                                    placeholder='Seleccione periodo'
                                    noOptionsMessage={() => 'Sin datos'}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3}>
                            <FormGroup>
                                <Label for="encuesta">Encuesta</Label>
                                <Select
                                    options={encuestas}
                                    onChange={handleChangeEncuesta}
                                    isSearchable={true}
                                    placeholder='Seleccione encuesta'
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
                                resultado[0].hasOwnProperty( 'icono' ) ? 
                        <Container>
                            <Row>
                                <Col lg={12} className="text-center">
                                    <h4>Resultado general</h4>
                                </Col>
                            </Row>
                            <Row>
                                <table className='table text-center'>
                                    <thead className='thead-light'>
                                        <tr>
                                            <th>Resultado</th>
                                            <th>Nivel de riesgo</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{resultado[0].resultado}</td>
                                            <td>{resultado[0].nivel}</td>
                                            <td><i className={`uil ${resultado[0].icono} font-size-24 ${resultado[0].iconoColor}`}></i></td>
                                        </tr>
                                        <tr>
                                            <td colSpan='4' className='text-center'>
                                                <h4>Necesidad de acción según el nivel de riesgo</h4></td>
                                        </tr>
                                        <tr>
                                            <td colSpan='4'>{resultado[0].diagnostico}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Row>
                            <br/>
                            <Row>
                                <Col lg={12} className="text-center">
                                    <h4>Resultado por categoría y dominio</h4>
                                </Col>
                            </Row>
                            <Row>
                                <table className='table'>
                                    <thead className='thead-light'>
                                        <tr>
                                            <th>Categoría</th>
                                            <th className='text-center'>Resultado</th>
                                            <th className='text-center'>Nivel de riesgo</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            resultado[0].categorias.map( ( row, i ) => (
                                                <Fragment key={i}>
                                                    <tr>
                                                        <td>{row.categoria}</td>
                                                        <td className='text-center'>{row.resultado}</td>
                                                        <td className='text-center'>{row.nivel}</td>
                                                        <td><i className={`uil ${row.icono} font-size-24 ${row.iconoColor}`}></i></td>
                                                    </tr>
                                                    {
                                                        row.dominios.map( ( dominio, x ) => (
                                                            <tr key={x}>
                                                                <td>&nbsp;&nbsp;&nbsp;&nbsp;{dominio.dominio}</td>
                                                                <td className='text-center'>{dominio.resultado}</td>
                                                                <td className='text-center'>{dominio.nivel}</td>
                                                                <td></td>
                                                            </tr>
                                                        ) )
                                                    }
                                                </Fragment>
                                            ) 
                                            )
                                        }
                                    </tbody>
                                </table>
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <p>* Para ver el resultado de la encuesta, oprima el botón PDF.</p>
                                </Col>
                            </Row>
                        </Container>
                        :
                        !resultado[0].hasOwnProperty( 'preguntas' ) ?
                            <div className='text-center'>No se encontraron registros</div>
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
                                                        row.preguntas.map( 
                                                            ( p, x ) => (
                                                                <tr key={x}>
                                                                    <td>{`${p.preguntaNumero} ${p.pregunta}`}</td>
                                                                    <td className='text-center'>{p.si === 1 ? 'X' : ''}</td>
                                                                    <td className='text-center'>{p.no === 1 ? 'X' : ''}</td>
                                                                </tr>
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
                    Reporte por empleado
                </ModalHeader>
                <ModalBody>
                    <div className="card h100 p20 mt20">
                        <div id="pfDoc" style={{ height: '100vh' }}>
                            <ReporteIndividualPDF pdf={resultado} user={userInfo} />
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </Fragment>
    );
}
 
export default ReporteIndividual;