// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import BootstrapTheme from '@fullcalendar/bootstrap';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { getSucursalModal } from '../../redux/sucursales/actions';
import PageTitle from '../../components/PageTitle';
import ViewEvento from './ViewEvento';

const ProgramacionDeEventos = () => {
    const events = [
        {
            id: 1,
            title: 'Meeting with Mr. Shreyu!',
            start: new Date().setDate(new Date().getDate() + 1),
            end: new Date().setDate(new Date().getDate() + 2),
            className: 'bg-warning text-white',
        },
        {
            id: 2,
            title: 'See John Deo',
            start: new Date(),
            end: new Date(),
            className: 'bg-success text-white',
        },
        {
            id: 3,
            title: 'Meet John Deo',
            start: new Date().setDate(new Date().getDate() + 8),
            className: 'bg-info text-white',
        },
        {
            id: 4,
            title: 'Buy a Theme',
            start: new Date().setDate(new Date().getDate() + 7),
            className: 'bg-primary text-white',
        },
    ];
    
    const dispatch = useDispatch();
    var eventClick = () => {
        dispatch(getSucursalModal());
    };
    var addNewEvent =()=>{
        dispatch(getSucursalModal()); 
    }
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col className="col-12">
                    <PageTitle
                        breadCrumbItems={[
                            {
                                label: 'Programacion de eventos',
                                path: '/ProgramacionDeEventos/programaciondeeventos',
                                active: true,
                            },
                        ]}
                        title={'Programacion de eventos'}
                    />
                </Col>
            </Row>
            <ViewEvento />
            <Row>
                <Col className="col-12">
                    <Card>
                        <CardBody>
                            <div className="row">
                                <h4 className="header-title mt-0 mb-1 col-sm-6">
                                    <i className="uil uil-calendar-alt"></i> Calendario de eventos
                                </h4>
                                <div className="sub-header col-sm-6 text-right">
                                <Button color="primary" onClick={addNewEvent}>
                                    <i className="uil uil-plus"></i>Nuevo
                                </Button>
                                </div>
                            </div>
                            {/* fullcalendar control */}
                            <FullCalendar
                                defaultView="dayGridMonth"
                                plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                                slotDuration="00:15:00"
                                minTime="08:00:00"
                                maxTime="19:00:00"
                                themeSystem="bootstrap"
                                handleWindowResize={true}
                                bootstrapFontAwesome={false}
                                buttonText={{
                                    today: 'Today',
                                    month: 'Month',
                                    week: 'Week',
                                    day: 'Day',
                                    list: 'List',
                                    prev: 'Prev',
                                    next: 'Next',
                                }}
                                header={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                                }}
                                droppable={true}
                                editable={true}
                                eventClick={eventClick}
                                eventLimit={true} // allow "more" link when too many events
                                selectable={true}
                                events={events}
                                id="calendar"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ProgramacionDeEventos;
