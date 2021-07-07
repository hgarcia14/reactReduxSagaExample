import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCentrosRequest, setCentro, getCentroModal } from '../../redux/centrosTrabajo/actions';
import { Row, Col, Card, CardBody, Input, Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const defaultSorted = [
    {
        dataField: 'id',
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
    //const { SearchBar } = Search;

    const dispatch = useDispatch();

    const rowEvent = {
        onDoubleClick: ( e, row, index ) => {

            dispatch( setCentro( row ) );

            dispatch( getCentroModal() );
        }
    }

   // const { ExportCSVButton } = CSVExport;
    /*const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        selectColumnPosition: 'right',
        style: { backgroundColor: '#727cf5', color: '#fff' },
    };*/
    return (
        <Card>
            <CardBody>
                {/* <div className="row">
                    <h4 className="header-title mt-0 mb-1 col-sm-6"><i className="uil uil-bright"></i> Listado Centros De Tarbajo</h4>
                    <div className="sub-header col-sm-6"><AddCentrosDeTarbajo/></div>
                </div> */}
                <ToolkitProvider
                    bootstrap4
                    keyField="ROW_NUMBER"
                    data={props.records}
                    columns={props.columns}
                    >
                    {props => (
                        <React.Fragment>
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
                                                { text: '50', value: 50 }, 
                                                { text: 'Todos', value: ( props.records ? props.records.length : 0 ) }
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

const AddCentrosModalTable = () => {

    const dispatch = useDispatch();
    let records = useSelector( state => state.Centrostrabajo.empleados);

    useEffect( () => {

        dispatch( getCentrosRequest() );
        console.log(records)
        // eslint-disable-next-line
    }, []);

    const columns = [
        {
            dataField: 'ROW_NUMBER',
            text: 'No.',
            sort: true,
        },
        {
            dataField: '[empleadoNombre]',
            text: 'Nombre',
            sort: true,
        },
        {
            dataField: 'departamento',
            text: 'Departamento',
            sort: true,
        },
        {
            dataField: 'puesto',
            text: 'Puesto',
            sort: true,
        },
        {
            dataField: 'activo',
            text: 'Activa',
            formatter: ( cell, row, index) => {
              return (    
                <input type="checkbox" checked={cell} disabled />
              )
            }
        },
        {
            dataField: 'eliminar',
            text: 'Eliminar',
            formatter: ( cell, row, index) => {
              return (    
                <Button color="danger" size="sm" >X</Button>
              )
            }
        }
    ];

    return (
        <React.Fragment>
            <Row>
                <Col>
                <TableWithSearch records={records} columns={columns}/>
                </Col>
            </Row>

        </React.Fragment>
    );
};

export default AddCentrosModalTable;
