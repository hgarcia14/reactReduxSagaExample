import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Row, Col, Form, Input, Table} from 'reactstrap';

const SeleccionarEmpleadosModal = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
 

  return (
    <div>
      <Button color="link" onClick={toggle}><i className="uil uil-user-plus"></i> Agregar empleados</Button>
      <Modal isOpen={modal} toggle={toggle} className={className, "modal-lg"} size="lg">
        <ModalHeader toggle={toggle}>Seleccionar empleados</ModalHeader>
        <Form >
                <ModalBody>
                   
                    <Row>
                        <Col lg={12}>
                        <Table className="mb-0" bordered striped>
                    <thead>
                        <tr>
                              <th >Nombre</th>
                              <th >Departamento</th>
                              <th >Puesto</th>
                              <th >Agregar</th>
                          </tr>
                    </thead>
                    <tbody>
                          <tr>
                              <td > <Input type="text" /></td>
                              <td > <Input type="text" /></td>
                              <td > <Input type="text" /></td>
                              <td><Button color="primary" size="sm" ><i className="uil uil-check"></i></Button></td>
                          </tr>
                          <tr>
                              <td >Archivos 1</td>
                              <td >12/02/2020</td>
                              <td >PDF</td>
                              <td><Button color="primary" size="sm" ><i className="uil uil-check"></i></Button></td>
                          </tr>
                          <tr>
                              <td >Archivos 1</td>
                              <td >12/02/2020</td>
                              <td >PDF</td>
                              <td></td>
                          </tr>
                    </tbody>
                </Table>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary" onClick={toggle}>Guardar</Button>
                </ModalFooter>
            </Form>
      </Modal>
    </div>
  );
}

export default SeleccionarEmpleadosModal;