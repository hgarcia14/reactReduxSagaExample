import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Row, Col, Form, Table} from 'reactstrap';
const AttachmentListModal = (props) => {
  const {
    //buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <i className="uil uil-paperclip" onClick={toggle}></i>
        <Modal isOpen={modal} toggle={toggle}  className={className}>
        <Form >
                <ModalBody>
                  
                    <Row>
                        <Col lg={12}>
                        <Table className="mb-0" bordered striped>
                    <thead>
                        <tr>
                            <th colSpan="3">Archivos digitales</th>
                        </tr>
                        <tr>
                              <th >Nombre</th>
                              <th >Fecha</th>
                              <th >Tipo</th>
                          </tr>
                    </thead>
                    <tbody>
                          <tr>
                              <td >Archivos 1</td>
                              <td >12/02/2020</td>
                              <td >PDF</td>
                          </tr>
                    </tbody>
                </Table>
                        </Col>
                    </Row>
            
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cerca</Button>
                </ModalFooter>
            </Form>
      </Modal>
    </div>
  );
}

export default AttachmentListModal;