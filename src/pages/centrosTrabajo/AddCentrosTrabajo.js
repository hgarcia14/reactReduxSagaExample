/* eslint-disable no-sequences */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Row, Col, Form, FormGroup, Label, Input, Table} from 'reactstrap';
import * as actions from '../../redux/centrosTrabajo/actions';
//import AddCentrosModalTable from '../centrosTrabajo/AddCentrosModalTable';
import * as SucursalesActions from '../../redux/sucursales/actions';
import Select from 'react-select';
import * as EmpleadosActions from '../../redux/empleados/actions';
import _ from 'lodash';


const AddCentrosDeTarbajo = ( props ) => {

    const dispatch = useDispatch();

    const modal = useSelector( ( state ) => state.Centrostrabajo.modal );
    const centrotrabajoStore = useSelector( state => state.Centrostrabajo.centrotrabajo );
    const sucursales = useSelector( state => state.Sucursales.sucursales );
    const empleadosStore = useSelector( ( state ) => state.Empleados.empleados );
    const [empleadosTable, setEmpleadosTable] = useState([]);


  const {
    //buttonLabel,
    className
  } = props;

  //const [modal, setModal] = useState(false);
  const [centrostrabajo, setCentrostrabajo] = useState( {
      centrotrabajoId: -1,
      centrotrabajoNombre: centrotrabajoStore ? centrotrabajoStore.centrotrabajoNombre : '',
      centrotrabajoDescripcion: '',
      sucursalId: 0,
      sucursal: {},
      empleados: [],
      activo: true
  } );

  useEffect( () => {

    if( !sucursales || sucursales.length === 0 ){
        dispatch( SucursalesActions.getSucursalesRequest() );
    }

    if( !empleadosStore || empleadosStore.length === 0 ){
        dispatch( EmpleadosActions.getEmpleadosRequest() );
    }

    setCentroState();

    // eslint-disable-next-line
  }, [centrotrabajoStore] );

  const { centrotrabajoId, centrotrabajoNombre ,sucursal, activo } = centrostrabajo;

  const optionsSucursales = sucursales ? sucursales.map( ( sucursal ) => ( { value: sucursal.sucursalId, label: sucursal.sucursalNombre } ) ) : [];
  const optionsEmpleados = empleadosStore ? 
    empleadosStore.map( ( empleado ) => ( 
        {
            value: empleado.empleadoId, 
            label: `${empleado.empleadoNombre} ${empleado.empleadoApellidos}`,
            puesto: empleado.puesto,
            departamentos: empleado.departamento
        } ) ) : [];

  const toggle = () => {
    
    if( !modal ){
        dispatch( actions.getCentroModal() );
    }else{
        dispatch( actions.hideCentroModal() );
    }

  }

  const setCentroState = () => {
      setCentrostrabajo( {
        ...centrostrabajo,
        centrotrabajoId: centrotrabajoStore ? centrotrabajoStore.centrotrabajoId : -1,
        centrotrabajoNombre: centrotrabajoStore ? centrotrabajoStore.centrotrabajoNombre : '',
        centrotrabajoDescripcion: centrotrabajoStore ? centrotrabajoStore.centrotrabajoDescripcion:'',
        sucursalId: centrotrabajoStore ? centrotrabajoStore.sucursalId : 0,
        sucursal: {value: centrotrabajoStore ? centrotrabajoStore.sucursalId : 0,
            label: centrotrabajoStore ? centrotrabajoStore.sucursalNombre : '' },
        empleados: centrotrabajoStore ? centrotrabajoStore.empleados : [],
        activo: centrotrabajoStore ? centrotrabajoStore.activo : true
      } );
      
      if( !_.isEmpty( centrotrabajoStore ) && centrotrabajoStore.hasOwnProperty( 'empleados' ) ){
        const tableEmpleados = JSON.parse(centrotrabajoStore.empleados);
        setEmpleadosTable( tableEmpleados );
      }
  }

  const selectSucursales = e => {
    setCentrostrabajo( {
        ...centrostrabajo,
        sucursalId: e.value,
        sucursal: e
    } );
}
  const handleSubmit = e => {
      e.preventDefault();

      if( centrotrabajoNombre === '' ){
          return
      }
    
    centrostrabajo.empleados = empleadosTable;

    dispatch( actions.setCentroRequest( centrostrabajo ) );

    cleanForm();

    dispatch( actions.setCentro( null ) );

    toggle();
  }

  const handleChange = e => {
    setCentrostrabajo( {
          ...centrostrabajo,
          [e.target.name]: e.target.value
      } );
  }

  const handleCheckBox = e => {
    setCentrostrabajo( {
          ...centrostrabajo,
          activo: e.target.checked
      } );
  }

  const selectEmpleado = e => {
      let datos = { 
          empleadoId: Number(e.value),
          empleadoNombre: e.label,
          puesto: e.puesto,
          departamento: e.departamento
         };

    setEmpleadosTable( empleadosTable => [...empleadosTable, datos] );
  }

  const removeEmpleado = e => {
      setEmpleadosTable( empleadosTable.filter( item => item.empleadoId !== e ) )
  }

  const cleanForm = () => {
    setCentrostrabajo( {
        ...centrostrabajo,
        centrotrabajoId: -1,
        centrotrabajoNombre: '',
        centrotrabajoDescripcion:'',
        sucursalId: 0,
        sucursal: {},
        activo: true
    } );

    setEmpleadosTable( null );
    
  }

  return (
    <div>
        <div className="row">
            <div className="button-list col-sm-12 text-right pr-1">
                <Button color="primary" onClick={toggle}>
                    <i className="uil uil-plus"></i>Nuevo
                </Button>
            </div>
        </div>
        <Modal isOpen={modal} toggle={toggle} className={className, "modal-lg"} size="lg" >
            <ModalHeader toggle={toggle}>
                {centrotrabajoId === -1 ? 'Nuevo centro de trabajo' : 'Centro de trabajo'}
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
                <ModalBody>
                    <Row>
                        <Col lg={6}>
                            <FormGroup>
                                <Label for="centrotrabajoNombre">Nombre</Label>
                                <Input
                                    type="text"
                                    name="centrotrabajoNombre"
                                    placeholder="Nombre del centro de trabajo"
                                    value={centrotrabajoNombre || ''}
                                    maxLength={149}
                                    onChange={handleChange}
                                    />
                            </FormGroup>
                        </Col>
                        <Col lg={6}>
                            <FormGroup>
                                <Label for="Sucursal">Sucursal</Label>
                                <Select
                                        options={optionsSucursales}
                                        defaultValue={sucursal}
                                        onChange={selectSucursales}
                                        placeholder='Seleccione sucursal'
                                        noOptionsMessage={() => 'Sin datos'}
                                        required
                                    />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}></Col>
                        <Col lg={6} className="text-right">
                            <FormGroup check>
                                <Label check>
                                <Input
                                    type="checkbox"
                                    name="activo"
                                    id="activo"
                                    defaultChecked={activo}
                                    value={activo || true}
                                    onClick={handleCheckBox} />{' '}Activo
                                </Label>
                            </FormGroup>
                        </Col>                        
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <h5>Empleados</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th align="center">No.</th>
                                        <th align="center">Nombre</th>
                                        <th align="center">Puesto</th>
                                        <th align="center">Departamento</th>
                                        <th align="center">Eliminar</th>
                                    </tr> 
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="2">
                                            <Select
                                                options={optionsEmpleados}
                                                onChange={selectEmpleado}
                                                placeholder='Seleccione empleado'
                                                noOptionsMessage={() => 'Sin datos'}
                                            />
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    {
                                        centrotrabajoStore ?
                                        JSON.parse(centrotrabajoStore.empleados).map( ( e, i ) => ( 
                                            <tr key={e.empleadoId}>
                                                <td>{i + 1}</td>
                                                <td>{e.empleadoNombre}</td>
                                                <td>{e.puesto}</td>
                                                <td>{e.departamento}</td>
                                                <td align="center"><Button outline color="danger" size="sm" onClick={() => removeEmpleado(e.empleadoId)}>X</Button></td>
                                            </tr>
                                        ) ) : null
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary">Guardar</Button>
                </ModalFooter>
            </Form>
        </Modal>
    </div>
  );
}

export default AddCentrosDeTarbajo;