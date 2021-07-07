import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import imgServerDown from '../../assets/images/server-down.png';

const ErrorPage = () => {
    return ( 
        <React.Fragment>
            <div className="account-pages my-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col xl={4} lg={5}>
                            <div className="text-center">
                                <div>
                                    <img src={imgServerDown} alt="" className="img-fluid" />
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="text-center">
                            <h3 className="mt-3">Opps, ocurrió un error</h3>
                            <p className="text-muted mb-5">Al parecer usted ya respondió la encuesta o su acceso no pudo ser validado.<br /> 
                            Comuníquese con el administrador para que le vuelva a enviar la encuesta.</p>

                            <Link to="https://www.crol.mx" className="btn btn-lg btn-primary mt-4">Ir a Crol</Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
     );
}
 
export default ErrorPage;