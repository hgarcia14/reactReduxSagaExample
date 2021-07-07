import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, CardBody, } from 'reactstrap';
import logo from '../../assets/images/logo.png';
import * as action from '../../redux/auth/actions';
import imgServerDown from '../../assets/images/server-down.png';

const LoadingPage = ( props ) => {

    const dispatch = useDispatch();

    const authError = useSelector( state => state.Auth.error );
    const urlString = window.location.pathname;
    const param = urlString.substring(1,urlString.length);

    useEffect( () => {

        if( param.length > 25 ) {
            localStorage.removeItem( 'crolGUID' );
            localStorage.setItem( 'crolGUID', param );
        }

        dispatch( action.loginUser( '/dashboard' ) );

        /*if( isUserAuthenticated() ){
            window.location.pathname = '/dashboard';
        } else {

            if( param.length > 25 ) {
                localStorage.removeItem( 'crolGUID' );
                localStorage.setItem( 'crolGUID', param );
            }

            dispatch( action.loginUser() );
        }*/

        // eslint-disable-next-line
    }, [] );

    return ( 
        <Container>
            { ( authError ) ? 
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
                :
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
                                
                                <h6 className="h5 mb-0 mt-4">Validando acceso</h6>
                                <p className="text-muted mt-3 mb-3">Sus accesos están siendo validados.</p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            }
        </Container> 
     );
}
 
export default LoadingPage;