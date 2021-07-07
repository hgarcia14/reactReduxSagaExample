import React from 'react';
import {Card, CardBody, Table } from 'reactstrap';



const ApplicationList = ( props ) => {
    
    return (
        <Card className="gray-brd">
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Últimas encuestas aplicadas</h4>
                <br/>
                <Table className="mb-0">                   
                    <tbody style={{fontWeight:"bold"}}>
                        {
                            ( props.dashboardCard && props.dashboardCard[0].ultimas ) ?
                                props.dashboardCard[0].ultimas.map( ( i, n ) => (
                                    <tr key={n}>
                                        <td><i className={`uil ${i.icono} font-size-24 ${i.iconoColor}`}></i></td>
                                        <td>{i.encuesta}</td>
                                        <td>{i.fecha}</td>
                                        <td style={{width:'100px'}}>{i.puntos}</td>
                                    </tr>
                                )
                                )
                                :
                                <tr>
                                    <td colSpan="4">No hay encuestas aplicadas</td>
                                </tr>
                        }                             
                    </tbody> 
                </Table>
            </CardBody>
        </Card>
    );
};
export default ApplicationList;