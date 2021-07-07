/* eslint-disable no-sequences */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Container } from 'reactstrap';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import FileManager from './FileManager';
import * as PuestosActions from '../../redux/puestos/actions';
import * as DepartamentosActions from '../../redux/departamentos/actions';
import * as actions from '../../redux/empleados/actions';
import Select from 'react-select';


const AddNewEmpleado = ( props ) => {
  const {
    //buttonLabel,
    className
  } = props;

  const dispatch = useDispatch();

  const modal = useSelector( ( state ) => state.Empleados.modal );
  const puestos = useSelector( state => state.Puestos.puestos );
  const departamentos = useSelector( state => state.Departamentos.departamentos );
  const empleadoStore = useSelector( state => state.Empleados.empleado );

  const [empleadoId, setEmpleadoId] = useState(-1);
  const [empleadoApellidos, setEmpleadoApellidos] = useState('');
  const [empleadoNombre, setEmpleadoNombre] = useState('');
  const [puestoId, setPuestoId] = useState(0);
  const [departamentoId, setDepartamentoId] = useState(0);
  const [activo, setActivo] = useState(true);
  const [empleadoCorreo, setEmpleadoCorreo]= useState('');
  const empleadoApellidosRef = useRef();
  const empleadoNombreRef = useRef();
  const selectedPuestoRef = useRef( [] );
  const activoRef = useRef(true);
  const selectedDepartamentoRef = useRef( [] );
  const fileManagerRef = useRef( [] );
  const empleadoStoreRef = useRef();
  const empleadoCorreoRef = useRef();
  useEffect( () => {

    if( !puestos || puestos.length === 0 ){
        dispatch( PuestosActions.getPuestosRequest() );
    }

    if( !departamentos || departamentos.length === 0 ){
        dispatch( DepartamentosActions.getDepartamentosRequest() );
    }

    setEmpleadoId( empleadoStore.empleadoId || -1 );
    setEmpleadoApellidos( empleadoStore.empleadoApellidos || '' );
    setEmpleadoNombre( empleadoStore.empleadoNombre || '' );
    setPuestoId( empleadoStore.puestoId || 0 );
    setDepartamentoId( empleadoStore.departamentoId || 0 );
    setActivo( empleadoStore.activo || true );
    setEmpleadoCorreo( empleadoStore.empleadoCorreo || '' );
    
    selectPuesto({
        value: empleadoStore.puestoId || 0,
        label: empleadoStore.puesto || ''
    });

    selectDepartamento( {
        value: empleadoStore.departamentoId || 0,
        label: empleadoStore.departamento || ''
    } );

    if( empleadoStore.empleadoId ){
        dispatch( actions.getEmpleadosRequest( 'empleados',  empleadoStore.empleadoId ) );
    }

    empleadoStoreRef.current = empleadoStore || null;

    
    // eslint-disable-next-line
  },[empleadoStore] );

  const optionsPuestos = puestos ? puestos.map( ( puesto ) => ( { value: puesto.puestoId, label: puesto.puestoNombre } ) ) : [];
  const optionsDepartamentos = departamentos ? departamentos.map( ( departamento ) => ( { value: departamento.departamentoId, label: departamento.departamentoNombre } ) ) : [];

  const toggle = () => {

    if( !modal ){
        dispatch( actions.getAddEmpleadoModal() );
    }else{
        dispatch( actions.hideAddEmpleadoModal() );
    }
  }

  const selectPuesto = e => {
      selectedPuestoRef.current = e;
  }

  const selectDepartamento = e => {
    selectedDepartamentoRef.current = e;
}

  const handleSubmit = e => {
      e.preventDefault();

      let empleado = {
          empleadoId: empleadoId,
          empleadoApellidos: empleadoApellidosRef.current.value,
          empleadoNombre: empleadoNombreRef.current.value,
          empleadoCorreo: empleadoCorreoRef.current.value,
          puestoId: selectedPuestoRef.current.value || puestoId,
          departamentoId: selectedDepartamentoRef.current.value || departamentoId,
          activo: activoRef.current.value
      };
      
      dispatch( actions.setEmpleadoRequest( empleado, fileManagerRef.current ) );

      dispatch( actions.setEmpleado( {} ) );

      cleanForm();

      toggle();
    }

  const cleanForm = () => {
    setEmpleadoApellidos( '' );
    setEmpleadoNombre( '' );
    setEmpleadoCorreo('');
    setPuestoId( 0 );
    setDepartamentoId( 0 );
}

  return (
    <>
                <Button color="primary" onClick={toggle}>
                    <i className="uil uil-plus"></i>Nuevo
                </Button>
        <Modal isOpen={modal} toggle={toggle} size="lg" className={className, "modal-lg"}>
            <ModalHeader toggle={toggle}>
                {empleadoId === -1 ? 'Nuevo empleado' : 'Empleado'}
            </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label for="empleadoNombre">Nombre(s)</Label>
                                    <Input
                                        type="text"
                                        id="empleadoNombre"
                                        name="empleadoNombre"
                                        defaultValue={empleadoNombre}
                                        maxLength={250}
                                        innerRef={empleadoNombreRef} />
                                </FormGroup>
                            </Col>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label for="empleadoApellidos">Apellidos</Label>
                                    <Input
                                        type="text"
                                        id="empleadoApellidos"
                                        name="empleadoApellidos"
                                        defaultValue={empleadoApellidos}
                                        maxLength={250}
                                        innerRef={empleadoApellidosRef} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label for="puesto">Puesto</Label>
                                    <Select
                                        options={optionsPuestos}
                                        defaultValue={selectedPuestoRef.current}
                                        onChange={selectPuesto}
                                        ref={selectedPuestoRef}
                                        placeholder='Seleccione puesto'
                                        noOptionsMessage={() => 'Sin datos'}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label for="departamento">Departamento</Label>
                                    <Select
                                        options={optionsDepartamentos}
                                        defaultValue={selectedDepartamentoRef.current}
                                        onChange={selectDepartamento}
                                        ref={selectedDepartamentoRef}
                                        placeholder='Seleccione departamento'
                                        noOptionsMessage={() => 'Sin datos'}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col lg={6}>
                                <FormGroup>
                                    <Label for="empleadoNombre">Correo</Label>
                                    <Input
                                        type="email"
                                        id="empleadoCorreo"
                                        name="empleadoCorreo"
                                        required
                                        defaultValue={empleadoCorreo}
                                        maxLength={499}
                                        innerRef={empleadoCorreoRef} />
                                </FormGroup>
                            </Col>
                            <Col lg={6}>
                                <FormGroup check>
                                    <Label check>
                                    <Input
                                        type="checkbox"
                                        name="activo"
                                        id="activo"
                                        defaultChecked={activo}
                                        defaultValue={activo || true}
                                        innerRef={activoRef}
                                        />{' '}Activo
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} className="text-right">
                                <Button type="submit" color="primary" >Guardar</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Container>
                        <Row>
                            <Col lg={6}>
                                <p className="font-weight-bold">Archivos digitales</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <FileManager fileManagerRef={fileManagerRef} empleadoStoreRef={empleadoStoreRef} />
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>  
      </Modal>
    </>
  );
}

export default AddNewEmpleado;