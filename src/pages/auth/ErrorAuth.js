import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import imgServerDown from '../../assets/images/server-down.png';

const ErrorAuth = () => {
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
                            <h3 className="mt-3">Usuario no autenticado</h3>
                            <p className="text-muted mb-5">Al parecer el usuario no se encuentra firmado en Crol o está intentando acceder directamente al sistema.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
     );
}
 
export default ErrorAuth;