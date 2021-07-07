import React, { useState, useEffect, Fragment } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Input } from 'reactstrap';
import * as actions from '../../redux/empleados/actions';
import { getSurveysListRequest } from '../../redux/dashboard/actions';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'reactstrap/lib/Table';
import * as _ from 'lodash';


const EncuestosModal = ( props ) => {
 
  const {
    //buttonLabel,
    className
  } = props;

  const dispatch = useDispatch();

  const encuestasStore = useSelector( state => state.Dashboard.encuestas );
  //const sendMailStore = useSelector( ( state ) => state.SendMail.sendMail );
  const [modal, setModal] = useState(false);
  const [encuestas, setEncuestas] = useState([]);
  
  const toggle = () => setModal(!modal);

  useEffect( () => {

    if( !encuestas || encuestasStore.length === 0 ){
      dispatch( getSurveysListRequest() );
    }

    // eslint-disable-next-line
  },[] );

  const handleChange = row => {
    let e = { encuestaId: row };

    setEncuestas( encuestas => [ ...encuestas, e ] );

  }

  const handleSubmit = e => {
    e.preventDefault();

    let data = {
      correos: _.uniq(props.empleados.current),
      opcion: 3,
      encuestas: _.uniq(encuestas)
    };

    dispatch( actions.sendEmpleadoMailRequest( data )  );

    props.empleados.current = [];
    setEncuestas([]);

    window.location.reload();

    //cleanForm();
  }

  return (
    <Fragment>
    <Button color="primary" className="mr-2" disabled={_.isEmpty(props.empleados.current) ? true : false} onClick={toggle} >Enviar encuesta</Button>
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
            <p>Encuestas</p>
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th></th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {
                  encuestasStore ? 
                  encuestasStore.map( ( row, i ) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td align="center">
                        <Input
                          type="checkbox"
                          name="activo"
                          id="encuestaId"
                          onChange={() => handleChange( row.encuestaId )}
                        />
                      </td>
                      <td>
                        {row.encuestaNombre}
                      </td>
                    </tr>
                  ) )
                  :
                  null
                }
              </tbody>
            </Table>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" type="submit" onClick={toggle}>Enviar</Button>
        </ModalFooter>
      </Form>
    </Modal>
    </Fragment>
  );
}

export default EncuestosModal;