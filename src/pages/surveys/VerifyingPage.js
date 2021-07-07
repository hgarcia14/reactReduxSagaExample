import React from 'react';
import { Container, Row, Col, Card, CardBody, } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const VeryfingPage = () => {
    return ( 
    <Container>
        <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
                <Card className="text-center">
                    <CardBody className="p-4">
                        <div className="mx-auto mb-5">
                            <a href="/">
                                <img src={logo} alt="" height="24" />
                                <h3 className="d-inline align-middle ml-1 text-logo">Crol</h3>
                            </a>
                        </div>
                        
                        <h6 className="h5 mb-0 mt-4">Verificando información</h6>
                        <p className="text-muted mt-3 mb-3">Su información está siendo verificada, por favor espere.</p>
                    </CardBody>
                </Card>
            </Col>
        </Row>

        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">Ir a <Link to="https://www.crol.mx" className="text-primary font-weight-bold ml-1">Crol</Link></p>
            </Col>
        </Row>
    </Container> 
    );
}
 
export default VeryfingPage;