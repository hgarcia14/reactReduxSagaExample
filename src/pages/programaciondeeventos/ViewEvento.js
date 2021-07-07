import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Row, Col, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import FileUpload from './FileUpload';
import * as actions from '../../redux/sucursales/actions';
const ViewEvento = (props) => {
    const {
        //buttonLabel,
        className,
    } = props;
    const dispatch = useDispatch();

    const modal = useSelector((state) => state.Sucursales.modal);
    const toggle = () => {
        if (!modal) {
            dispatch(actions.getSucursalModal());
        } else {
            dispatch(actions.hideSucursalModal());
        }
    };
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Evento</ModalHeader>

                <ModalBody>
                    <Form>
                        <Row>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label for="departamentoNombre">Titulo</Label>
                                    <Input type="text" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label for="departamentoNombre">Descripcion del evento</Label>
                                    <Input type="textarea" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label for="exampleDate">Fecha y hora de inicio</Label>
                                    <Input type="date" name="date" id="exampleDate" placeholder="/ /" />
                                </FormGroup>
                            </Col>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label for="exampleDate">Fecha y hora fin</Label>
                                    <Input type="date" name="date" id="exampleDate2" placeholder="/ /" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <FormGroup>
                                    <Button color="primary">Seleccionar empleados</Button>
                                </FormGroup>
                            </Col>
                            <Col lg={6} className="text-right">
                                <FormGroup>
                                    <Button color="secondary">Ver resultados <i className="uil uil-angle-right"></i></Button>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FileUpload />

                        <Row>
                            <Col lg={12}>
                                <Table className="mb-0" bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Nombre del archivo</th>
                                            <th>Tipo</th>
                                            <th>Tamano</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Archivos 1</td>
                                            <td>12/02/2020</td>
                                            <td>PDF</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="activo" /> Activa
                                    </Label>
                                </FormGroup>
                            </Col>

                            <Col lg={6} className="text-right">
                                <Button type="submit" color="primary" onClick={toggle}>
                                    Guardar
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default ViewEvento;
