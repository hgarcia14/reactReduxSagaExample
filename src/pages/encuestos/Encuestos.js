// @flow
import React from 'react';
import { Row, Col} from 'reactstrap';
import PageTitle from '../../components/PageTitle';
const Encuestos = () => {
   
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col className="col-12">
                    <PageTitle
                        breadCrumbItems={[
                            {
                                label: 'Encuestos',
                                path: '/Encuestos/Encuestos',
                                active: true,
                            },
                        ]}
                        title={'Encuestos'}
                    />
                </Col>
            </Row>
           
        </React.Fragment>
    );
};

export default Encuestos;
