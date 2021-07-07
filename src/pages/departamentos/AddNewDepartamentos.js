import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import * as actions from '../../redux/departamentos/actions';

const AddNewDepartamentosModals = (props) => {
   
    const dispatch = useDispatch();

    const modal = useSelector( ( state ) => state.Departamentos.modal );
    const departamentoStore = useSelector( ( state ) => state.Departamentos.departamento );

  const {
    //buttonLabel,
    className
  } = props;

  //const [modal, setModal] = useState(false);
  const [departamento, setDepartamento] = useState( {
      departamentoId: -1,
      departamentoNombre: '',
      activo: true
  } );
  

  const { departamentoId, departamentoNombre, departamentoDescripcion, activo } = departamento;

  useEffect( () => {
      
    setDepartamento( {
        ...departamento,
        departamentoId: departamentoStore ? departamentoStore.departamentoId : -1,
        departamentoNombre: departamentoStore ? departamentoStore.departamentoNombre : '',
        departamentoDescripcion:departamentoStore ? departamentoStore.departamentoDescripcion:'',
        activo: departamentoStore ? departamentoStore.activo : true
    } );

    // eslint-disable-next-line
  }, [departamentoStore] );

  

  const toggle = () => {
    
    if( !modal ){
        dispatch( actions.getDepartamentosModal() );
    }else{
        dispatch( actions.hideDepartamentosModal() );
    }

  } 

  const handleSubmit = e => {
      e.preventDefault();

    dispatch( actions.setDepartamentosRequest( departamento ) );

    cleanForm();

    dispatch( actions.setDepartamento( null ) );

  }

  const handleChange = e => {
    setDepartamento( {
          ...departamento,
          [e.target.name]: e.target.value
      } );
  }

  const handleCheckBox = e => {
    setDepartamento( {
          ...departamento,
          activo: e.target.checked
      } );
  }

  const cleanForm = () => {
    setDepartamento( {
        ...departamento,
        departamentoId: -1,
        departamentoNombre: '',
        departamentoDescripcion:'',
        activo: true
    } );
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
        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>
                {departamentoId === -1 ? 'Nuevo departamento' : 'Departamento'}
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
                <ModalBody>
                    <Row>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="departamentoNombre">Nombre</Label>
                                <Input
                                    type="text"
                                    name="departamentoNombre"
                                    id="departamentoNombre"
                                    placeholder="Nombre"
                                    value={ departamentoNombre || '' }
                                    maxLength={149}
                                    onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                        <FormGroup>
                                <Label for="departamentoDescripcion">Descripcion</Label>
                                <Input
                                    type="textarea"
                                    name="departamentoDescripcion"
                                    id="departamentoDescripcion"
                                    placeholder="Descripcion"
                                    value={departamentoDescripcion || ''}
                                    maxLength={999}
                                    onChange={handleChange} />
                            </FormGroup>                           
                        </Col>
                    </Row> 
                    <Row>
                        <Col lg={12}>
                            <FormGroup check>
                                <Label check>
                                <Input
                                    type="checkbox"
                                    name="activo"
                                    id="activo"
                                    defaultChecked={activo}
                                    value={activo || true}
                                    onClick={handleCheckBox} />{' '}Activa
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary" onClick={toggle}>Agregar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Form>
        </Modal>
    </div>
    );
};

export default AddNewDepartamentosModals;

