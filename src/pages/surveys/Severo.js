import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import * as Survey from "survey-react";
import 'bootstrap/dist/css/bootstrap.css';
import "survey-react/survey.css";
import '../../assets/scss/custom-survey-react.css';
import * as actions from '../../redux/surveys/actions';
import VeryfingPage from './VerifyingPage';
import ValidationPage from './ValidationPage';

Survey.StylesManager.applyTheme("bootstrap");


    const SurveyComponent = ( props ) => {

        const dispatch = useDispatch();

        const surveyStore = useSelector( state => state.Surveys );

        const datos = useRef( {} );
        const page = useRef( 0 );

        useEffect( () => {

            if( !surveyStore.token ){
                dispatch( actions.validateTokenRequest( props.match.params.id ) );
            }

            // eslint-disable-next-line
        },[] );

        const saveSurvey = ( respuestas ) => {

            dispatch( actions.saveSurveyRequest( surveyStore.empleadoId, surveyStore.token, respuestas ) );

        }

        const json = {
            showProgressBar: "top",
            triggers: [
                {
                    type: "complete",
                    expression: "{Acontecimiento.1}=2 && {Acontecimiento.2}=2 && {Acontecimiento.3}=2 && {Acontecimiento.4}=2 && {Acontecimiento.5}=2 && {Acontecimiento.6}=2"
                }
            ],
            pages: [
                {
                    questions: [
                        {
                            type: "matrix", name: "Acontecimiento", isRequired: true, title: "Acontecimiento traumático severo",
                            columns: [{ value: 1, text: "Si" },{ value: 2, text: "No" }],
                            rows: [
                                { value: 1, text: "¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los siguientes:  ¿Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión grave?" },
                                { value: 2, text: "¿Asaltos?" },
                                { value: 3, text: "¿Actos violentos que derivaron en lesiones graves?" },
                                { value: 4, text: "¿Secuestro?" },
                                { value: 5, text: "¿Amenazas?" },
                                { value: 6, text: "¿Cualquier otro que ponga en riesgo su vida o salud, y/o la de otras personas?" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Acontecimiento.1}>0 && {Acontecimiento.2}>0 && {Acontecimiento.3}>0 && {Acontecimiento.4}>0 && {Acontecimiento.5}>0 && {Acontecimiento.6}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Recuerdos", isRequired: true, title: "Recuerdos persistentes sobre el acontecimiento (durante el último mes)",
                            visibleIf: "{Acontecimiento.1}=1 || {Acontecimiento.2}=1 || {Acontecimiento.3}=1 || {Acontecimiento.4}=1 || {Acontecimiento.5}=1 || {Acontecimiento.6}=1",
                            columns: [{ value: 1, text: "Si" },{ value: 2, text: "No" }],
                            rows: [
                                { value: 7, text: "¿Ha tenido recuerdos recurrentes sobre el acontecimiento que le provocan malestares?" },
                                { value: 8, text: "¿Ha tenido sueños de carácter recurrente sobre el acontecimiento, que le producen malestar?" },
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Recuerdos.7}>0 && {Recuerdos.8}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Esfuerzo", isRequired: true, title: "Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento (durante el último mes)",
                            columns: [{ value: 1, text: "Si",  },{ value: 2, text: "No",  }],
                            rows: [
                                { value: 9, text: "¿Se ha esforzado por evitar todo tipo de sentimientos, conversaciones o situaciones que le puedan recordar el acontecimiento?" },
                                { value: 10, text: "¿Se ha esforzado por evitar todo tipo de actividades, lugares o personas que motivan recuerdos del acontecimiento?" },
                                { value: 11, text: "¿Ha tenido dificultad para recordar alguna parte importante del evento?" },
                                { value: 12, text: "¿Ha disminuido su interés en sus actividades cotidianas?" },
                                { value: 13, text: "¿Se ha sentido usted alejado o distante de los demás?" },
                                { value: 14, text: "¿Ha notado que tiene dificultad para expresar sus sentimientos?" },
                                { value: 15, text: "¿Ha tenido la impresión de que su vida se va a acortar, que va a morir antes que otras personas o que tiene un futuro limitado?" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Esfuerzo.9}>0 && {Esfuerzo.10}>0 && {Esfuerzo.11}>0 && {Esfuerzo.12}>0 && {Esfuerzo.13}>0 && {Esfuerzo.14}>0 && {Esfuerzo.15}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Afectacion", isRequired: true, title: "Afectación (durante el último mes)",
                            columns: [{ value: 1, text: "Si",  },{ value: 2, text: "No",  }],
                            rows: [
                                { value: 16, text: "¿Ha tenido usted dificultades para dormir?" },
                                { value: 17, text: "¿Ha estado particularmente irritable o le han dado arranques de coraje?" },
                                { value: 18, text: "¿Ha tenido dificultad para concentrarse?" },
                                { value: 19, text: "¿Ha estado nervioso o constantemente en alerta?" },
                                { value: 20, text: "¿Se ha sobresaltado fácilmente por cualquier cosa?" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Afectacion.16}>0 && {Afectacion.17}>0 && {Afectacion.18}>0 && {Afectacion.20}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        const survey = new Survey.Model(json);

        survey.pagePrevText = 'Anterior';
        survey.pageNextText = 'Siguiente';
        survey.completeText = 'Finalizar';

        survey.data = datos.current;
        survey.currentPageNo = page.current;
        
        survey
            .onValueChanged
            .add( 
                function( sender, options ){

                    datos.current = sender.data;
                    var el = document.getElementById( options.name );
                    if (el) {
                        el.value = options.value;
                    }
                    page.current = sender.currentPageNo;
                    
                } 
            );

        survey
        .onComplete
        .add(function (result) {
            document
                .querySelector('#surveyResult');
                //.innerHTML = "result: " + JSON.stringify(result.data);

            saveSurvey( result.data );
        });


        return (
            <div>
                <Row className="page-title">
                    <Col md={12}>
                        NOM-035
                    </Col>
                </Row>
                { surveyStore.empleadoId === -1 ? 
                    <ValidationPage />
                    :
                    surveyStore.empleadoId === 0 ?
                        <VeryfingPage />
                        :
                        <Card>
                            <CardBody>
                                <div className="row">
                                    <h4 className="header-title mt-0 mb-1 col-sm-12">
                                        <i className="uil uil-file-edit-alt mr-2"></i> Cuestionario para identificar a los trabajadores que fueron sujetos a acontecimientos traumáticos severos
                                    </h4>
                                    <p className="col-sm-12">Seleccione las respuestas de las siguientes preguntas</p>
                                </div>

                                <Survey.Survey model={survey} />
                                <div id="surveyResult"></div>
                            </CardBody>
                        </Card>
                }
            </div>
        );
    }


export default SurveyComponent;
