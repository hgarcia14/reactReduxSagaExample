import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, CardBody, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import AddNewDepartamentosModals from './AddNewDepartamentos';
import { getDepartamentosRequest, setDepartamento, getDepartamentosModal } from '../../redux/departamentos/actions';
import PageTitle from '../../components/PageTitle';

const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
];

const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
    <React.Fragment>
        <label className="d-inline mr-1">Mostrar</label>
        <Input
            type="select"
            name="select"
            id="no-entries"
            className="custom-select custom-select-sm d-inline col-2"
            defaultValue={currSizePerPage}
            onChange={(e) => onSizePerPageChange(e.target.value)}>
            {options.map((option, idx) => {
                return <option key={idx}>{option.text}</option>;
            })}
        </Input>
        <label className="d-inline ml-1">entradas</label>
    </React.Fragment>
);

const TableWithSearch = (props) => {
    const { SearchBar } = Search;
    const dispatch = useDispatch();

    const rowEvent = {
        onDoubleClick: ( e, row, index ) => {

            dispatch( setDepartamento( row ) );

            dispatch( getDepartamentosModal() );
            //console.log(props.result)
        }
    }
    return (
        <Card>
            <CardBody>
                <div className="row">
                    <h4 className="header-title mt-0 mb-1 col-sm-6">
                        <i className="uil uil-share-alt"></i> Listado de departamentos
                    </h4>
                    <div className="sub-header col-sm-6">
                        <AddNewDepartamentosModals />
                    </div>
                </div>
                <ToolkitProvider bootstrap4 keyField="ROW_NUMBER" data={props.records} columns={props.columns} search>
                    {(props) => (
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

const Departamentos = () => {

    const dispatch = useDispatch(); 
    let records = useSelector((state) => state.Departamentos.departamentos);

    useEffect(() => {
        dispatch(getDepartamentosRequest());

        // eslint-disable-next-line 
    }, []);

    const columns = [
        {
            dataField: 'ROW_NUMBER',
            text: 'No.',
            sort: true,
        },
        {
            dataField: 'departamentoNombre',
            text: 'Nombre',
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
        }
    ];

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Departamentos', path: '/Departamentos' },
                            { label: 'Departamentos', path: '/Departamentos', active: true },
                        ]}
                        title={'Departamentos'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Departamentos;


