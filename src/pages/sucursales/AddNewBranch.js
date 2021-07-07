import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';
import * as actions from '../../redux/sucursales/actions';

const AddNewBranchModals = ( props ) => {

    const dispatch = useDispatch();

    const modal = useSelector( ( state ) => state.Sucursales.modal );
    const sucursalStore = useSelector( ( state ) => state.Sucursales.sucursal );

  const {
    //buttonLabel,
    className
  } = props;

  //const [modal, setModal] = useState(false);
  const [sucursal, setSucursal] = useState( {
      sucursalId: -1,
      sucursalNombre: '',
      activo: true
  } );
  

  const { sucursalId, sucursalNombre, activo } = sucursal;

  useEffect( () => {
      
    setSucursal( {
        ...sucursal,
        sucursalId: sucursalStore ? sucursalStore.sucursalId : -1,
        sucursalNombre: sucursalStore ? sucursalStore.sucursalNombre : '',
        activo: sucursalStore ? sucursalStore.activo : true
    } );

    // eslint-disable-next-line
  }, [sucursalStore] );

  

  const toggle = () => {
    
    if( !modal ){
        dispatch( actions.getSucursalModal() );
    }else{
        dispatch( actions.hideSucursalModal() );
    }

  } 

  const handleSubmit = e => {
      e.preventDefault();

    dispatch( actions.setSucursalRequest( sucursal ) );

    cleanForm();

    dispatch( actions.setSucursal( null ) );

  }

  const handleChange = e => {
      setSucursal( {
          ...sucursal,
          [e.target.name]: e.target.value
      } );
  }

  const handleCheckBox = e => {
      setSucursal( {
          ...sucursal,
          activo: e.target.checked
      } );
  }

  const cleanForm = () => {
      setSucursal( {
          ...sucursal,
          sucursalId: -1,
          sucursalNombre: '',
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
                {sucursalId === -1 ? 'Nueva sucursal' : 'Sucursal'}
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
                <ModalBody>
                    <Row>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="sucursalNombre">Nombre</Label>
                                <Input
                                    type="text"
                                    name="sucursalNombre"
                                    id="sucursalNombre"
                                    placeholder="Nombre"
                                    value={sucursalNombre || ''}
                                    maxLength={50}
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
                    {/*<Row>
                        <Col lg={12}>
                            <Table className="mb-0">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Activo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((record, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{record.nombre}</td>
                                                <td>{record.activo()}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                                </Row>*/}
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary" onClick={toggle}>Agregar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Form>
        </Modal>
    </div>
  );
}

export default AddNewBranchModals;