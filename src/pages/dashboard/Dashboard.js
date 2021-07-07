// @flow
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import * as FeatherIcon from 'react-feather';
import PageTitle from '../../components/PageTitle';
import StatisticsWidget from './StatisticsWidget';
import ApplicationList from './ApplicationList';
//import Chart from './Chart';
import * as actions from '../../redux/dashboard/actions';
import BarColumnChart from './BarColumnChart';
//import { loginUser } from '../../redux/auth/actions';
//import { isUserAuthenticated } from '../../helpers/authUtils';


const Dashboard = ( props ) => {

    const dispatch = useDispatch();
    const Dashboard = useSelector( state => state.Dashboard );

    useEffect( () => {

        /*if( !isUserAuthenticated() ){
            dispatch( loginUser( '' ) );
        }*/

        dispatch( actions.getDashboardCardRequest() );

        dispatch( actions.getDashboardChartRequest() );

        // eslint-disable-next-line
    },[] );



    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Dashboard', path: '/Dashboard' },
                            { label: 'Dashboard', path: '/Dashboard', active: true },
                        ]}
                        title={'Dashboard'}
                    />
                </Col>
            </Row>
            <Card>
                <CardBody>
                    <Row>
                        <Col md={6} xl={4}>
                            {
                                Dashboard.dashboardCard ? 
                                <StatisticsWidget
                                    description="Riesgo psicosocial alto"
                                    title={`${JSON.parse(Dashboard.dashboardCard[0].calificaciones).empleadosAlto}`}
                                    footerPara={
                                        `De ${JSON.parse(Dashboard.dashboardCard[0].calificaciones).empleadosEncuestados} 
                                        ${JSON.parse(Dashboard.dashboardCard[0].calificaciones).empleadosEncuestados <= 1 ? ' encuestado' : ' encuestados'}, 
                                        ${JSON.parse(Dashboard.dashboardCard[0].calificaciones).empleadosAlto} se encuentran en nivel de riesgo alto`
                                    }
                                    iconFootClass="icon-dual-danger"
                                    icon={FeatherIcon.Frown}
                                    iconSmallFootClass="uil-heart-medical icon-dual-danger"
                                    iconClass="icon-dual-dark">
                                </StatisticsWidget>
                                :
                                <StatisticsWidget
                                    description="Riesgo psicosocial alto"
                                    title="0"
                                    footerPara="Sin encuestas aplicadas"
                                    iconFootClass="icon-dual-success"
                                    icon={FeatherIcon.Smile}
                                    iconSmallFootClass="uil-heart-medical icon-dual-success"
                                    iconClass="icon-dual-dark">
                                </StatisticsWidget>
                            }
                            
                        </Col>
                        <Col md={6} xl={4}>
                            {
                                Dashboard.dashboardCard ? 
                                <StatisticsWidget
                                    description="Riesgo alto en el entorno organizacional"
                                    title={`${JSON.parse(Dashboard.dashboardCard[1].calificaciones).empleadosAlto}`}
                                    footerPara={
                                        `De ${JSON.parse(Dashboard.dashboardCard[1].calificaciones).empleadosEncuestados} 
                                        ${JSON.parse(Dashboard.dashboardCard[1].calificaciones).empleadosEncuestados <= 1 ? ' encuestado' : 'encuestados'}, 
                                        ${JSON.parse(Dashboard.dashboardCard[1].calificaciones).empleadosAlto} se encuentran en nivel de riesgo alto`
                                    }
                                    iconFootClass="icon-dual-danger"
                                    icon={FeatherIcon.Users}
                                    iconSmallFootClass="uil-heart-medical icon-dual-danger"
                                    iconClass="icon-dual-dark">
                                </StatisticsWidget>
                                :
                                <StatisticsWidget
                                    description="Riesgo alto en el entorno organizacional"
                                    title="0"
                                    footerPara="Sin encuestas aplicadas"
                                    iconFootClass="icon-dual-success"
                                    icon={FeatherIcon.Users}
                                    iconSmallFootClass="uil-heart-medical icon-dual-success"
                                    iconClass="icon-dual-dark">
                                </StatisticsWidget>
                            }
                            
                        </Col>
                        <Col md={6} xl={4}>
                            {
                                Dashboard.dashboardCard ?
                                <StatisticsWidget
                                    description="Encuestas pendientes"
                                    title={`${Dashboard.dashboardCard[0].pendientes}`}
                                    footerPara={`Fecha de última encuesta recibida ${Dashboard.dashboardCard[0].fechaUltimaRecibida}`}
                                    icon={FeatherIcon.FileText}
                                    iconClass="icon-dual-success"
                                    iconSmallFootClass=" uil-files-landscapes-alt">
                                </StatisticsWidget>
                                :
                                <StatisticsWidget
                                    description="Encuestas pendientes"
                                    title="0"
                                    footerPara="Sin encuestas aplicadas"
                                    icon={FeatherIcon.FileText}
                                    iconClass="icon-dual-success"
                                    iconSmallFootClass=" uil-files-landscapes-alt">
                                </StatisticsWidget>
                            }
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} xl={6}>
                            <ApplicationList dashboardCard={Dashboard.dashboardCard} />
                        </Col>
                        <Col md={6} xl={6}>
                            <BarColumnChart dashboardChart={Dashboard.dashboardChart} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Dashboard;
