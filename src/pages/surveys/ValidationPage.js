import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import imgNotFound from '../../assets/images/not-found.png';

const ValidationPage = () => {

    useEffect( () => {

        setTimeout( () => {

            window.location.href = 'https://www.crol.mx';

        }, 3500 );

    },[] );

    return ( 
        <div className="account-pages my-5">
            <Container>
                <Row className="justify-content-center">
                    <Col xl={4} lg={5}>
                        <div className="text-center">
                            <div>
                                <img src={imgNotFound} alt="" className="img-fluid" />
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col className="text-center">
                        <h3 className="mt-3">Gracias por responder la encuesta</h3>
                        <p className="text-muted mb-5">Al parecer su encuesta ya ha sido respondida. De no ser así comuníquese con el administrador de su empresa. <br /> 
                            Será redireccionado a Crol.</p>
                    </Col>
                </Row>
            </Container>
        </div>
     );
}
 
export default ValidationPage;