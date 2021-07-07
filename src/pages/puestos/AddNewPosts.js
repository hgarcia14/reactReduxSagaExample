import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal,  ModalBody, ModalFooter, ModalHeader, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import * as actions from '../../redux/puestos/actions';
const AddNewPostsModals = (props) => {
    const dispatch = useDispatch();

    const modal = useSelector( ( state ) => state.Puestos.modal );
    const puestoStore = useSelector( ( state ) => state.Puestos.puesto );

  const {
    //buttonLabel,
    className
  } = props;

  //const [modal, setModal] = useState(false);
  const [puesto, setPuestos] = useState( {
      puestoId: -1,
      puestoNombre: '',
      puestoDescripcion:'',
      activo: true,

  } );
  
  const { puestoId, puestoNombre, puestoDescripcion, activo } = puesto;
  useEffect( () => {
      
    setPuestos( {
        ...puesto,
        puestoId: puestoStore ? puestoStore.puestoId : -1,
        puestoNombre: puestoStore ? puestoStore.puestoNombre : '',
        puestoDescripcion:puestoStore ? puestoStore.puestoDescripcion:'',
        activo: puestoStore ? puestoStore.activo : true
    } );

    // eslint-disable-next-line
  }, [puestoStore] );
  const toggle = () => {
    
    if( !modal ){
        dispatch( actions.getPuestosModal() );
    }else{
        dispatch( actions.hidePuestosModal() );
    }

  } 
  const handleSubmit = e => {
    e.preventDefault();

  dispatch( actions.setPuestoRequest( puesto ) );

  cleanForm();

  dispatch( actions.setPuestos( null ) );

}

const handleChange = e => {
    setPuestos( {
        ...puesto,
        [e.target.name]: e.target.value
    } );
}

const handleCheckBox = e => {
    setPuestos( {
        ...puesto,
        activo: e.target.checked
    } );
}
const cleanForm = () => {
    setPuestos( {
        ...puesto,
        puestoId: -1,
        puestoNombre: '',
        puestoDescripcion:'',
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
            <Form onSubmit={handleSubmit}>
                <ModalHeader toggle={toggle}>
                    {puestoId === -1 ? 'Nuevo puesto' : 'Puesto'}
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="puestoNombre">Nombre</Label>
                                <Input
                                    type="text"
                                    name="puestoNombre"
                                    id="puestoNombre"
                                    placeholder="Nombre"
                                    value={puestoNombre || ''}
                                    maxLength={149}
                                    onChange={handleChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col lg={12}>
                        <FormGroup>
                                <Label for="puestoDescripcion">Descripcion</Label>
                                <Input
                                    type="textarea"
                                    name="puestoDescripcion"
                                    id="puestoDescripcion"
                                    placeholder="Descripcion"
                                    value={puestoDescripcion || ''}
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

export default AddNewPostsModals;
