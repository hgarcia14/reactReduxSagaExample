import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/empleados/actions';
import { Row, Col, Card, CardBody, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import AddNewEmpleado from './AddNewEmpleado';
import PageTitle from '../../components/PageTitle';
import EncuestasModal from './EncuestasModal';

const defaultSorted = [
    {
        dataField: 'empleadoId',
        order: 'asc',
    },
];
const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
    
    <React.Fragment>
        <label className="d-inline mr-1">Mostrar</label>
        <Input type="select" name="select" id="no-entries" className="custom-select custom-select-sm d-inline col-2"
            defaultValue={currSizePerPage}
            onChange={(e) => onSizePerPageChange(e.target.value)}>
            {options.map((option, idx) => {
                return <option key={idx}>{option.text}</option>
            })}
        </Input>
        <label className="d-inline ml-1">entradas</label>
    </React.Fragment>
);

const TableWithSearch = ( props ) => {
    const { SearchBar } = Search;

    const dispatch = useDispatch();

    const rowEvent = {
        onDoubleClick: ( e, row, index ) => {

            dispatch( actions.setEmpleado( row ) );

            dispatch( actions.getAddEmpleadoModal() );

        }
    }

    return (
        <Card>
            <CardBody>
                <div className="row">
                <h4 className="header-title mt-0 mb-1 col-sm-6"><i className="uil uil-users-alt"></i> Listado de empleados</h4>
                    <div className="sub-header col-sm-6 text-right">
                        <EncuestasModal empleados={props.empleados} />
                        <AddNewEmpleado />
                    </div>
                </div>
                <ToolkitProvider
                    bootstrap4
                    keyField="ROW_NUMBER"
                    data={props.records}
                    columns={props.columns}
                    search>
                    {props => (
                        <React.Fragment>
                            <Row>
                                <Col className="text-right">
                                    <SearchBar placeholder='Buscar' {...props.searchProps} />
                                </Col>                                
                            </Row>

                            <BootstrapTable
                                {...props.baseProps}
                                bordered={false}
                                defaultSorted={defaultSorted}
                                rowEvents={rowEvent}
                                pagination={
                                    paginationFactory( 
                                        { 
                                            sizePerPage: 10, 
                                            sizePerPageRenderer: sizePerPageRenderer, 
                                            sizePerPageList: [
                                                { text: '10', value: 10, }, 
                                                { text: '20', value: 20 }, 
                                                { text: '50', value: 50 }
                                            ] 
                                        } 
                                    )
                                }
                                
                                wrapperClasses="table-responsive"
                            />
                        </React.Fragment>
                    )}
                </ToolkitProvider>
            </CardBody>
        </Card>
    );
};
 
const Empleados = ( props ) => {
    
    const dispatch = useDispatch();
    let records = useSelector( state => state.Empleados.empleados );
    const [empleados, setEmpleados] = useState([]);
    const list = useRef([]);

    useEffect( () => {

        dispatch( actions.getEmpleadosRequest() );

        // eslint-disable-next-line
    }, []);

    const handleChange = ( e, row ) => {

        if( empleados ) {
            
        }


        let enc = { empleadoId: Number( row.empleadoId ), correo: row.empleadoCorreo };

        if( e.target.checked ) {

            list.current.push( enc );
            setEmpleados( empleados => [...empleados, enc] );
            
        } else {

            const newList = list.current.filter( item => item.empleadoId !== enc.empleadoId );
            list.current = newList;
            setEmpleados( list.current );
            
        }

    }

    const columns = [
    {
        dataField: 'ROW_NUMBER',
        text: '#',
        sort: true,
        headerStyle: (column, colIndex) => {
            return { width: '50px' }; 
        },
    },
    {
        dataField:"checked",
        text:"",
        sort:true,
        headerStyle: (column, colIndex) => {
            return { width: '50px' }; 
        },
        formatter: ( cell, row, index) => {
            return (    
               <input type="checkbox" onChange={(e) => handleChange( e,row )} />
            )
          },
    },
    {
        dataField: 'nombreCompleto',
        text: 'Nombre',
        sort: true,
    },
    {
        dataField: 'puesto',
        text: 'Puesto',
        sort: false,
    },
    {
        dataField: 'centrotrabajo',
        text: 'Centro de trabajo',
        sort: true,
    },
    {
        dataField: 'encuestasEnviadas',
        text: 'Encuestas enviadas',
        sort: true,
    },
    {
        dataField: 'encuestasPendientes',
        text: 'Encuestas pendientes',
        sort: true,
    }
];

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Empleados', path: '/Empleados', color: 'green' },
                            { label: 'Empleados', path: '/Empleados', active: true },
                        ]}
                        title={'Empleados'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <TableWithSearch empleados={list} records={records} columns={columns} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Empleados;
