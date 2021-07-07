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
import ErrorPage from './ErrorPage';
import * as _ from 'lodash';

Survey.StylesManager.applyTheme("bootstrap");

    const FriesgoComponent = ( props ) => {
    

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
            pages: [
                {
                    questions: [
                        {
                            type: "matrix", name: "Condiciones",  isRequired: true, 
                            title:"Para responder las preguntas siguientes considere las condiciones de su centro de trabajo, así como la cantidad y ritmo de trabajo",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca"  }
                            ],
                            rows: [
                                { value: 21, text:"1. Mi trabajo me exige hacer mucho esfuerzo físico" },
                                { value: 22, text:"2. Me preocupa sufrir un accidente en mi trabajo" },
                                { value: 23, text:"3. Considero que las actividades que realizo son peligrosas" },
                                { value: 24, text:"4. Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno" },
                                { value: 25, text:"5. Por la cantidad de trabajo que tengo debo trabajar sin parar " },
                                { value: 26, text:"6. Considero que es necesario mantener un ritmo de trabajo acelerado" },
                                { value: 27, text:"7. Mi trabajo exige que esté muy concentrado " },
                                { value: 28, text:"8. Mi trabajo requiere que memorice mucha información" },
                                { value: 29, text:"9. Mi trabajo exige que atienda varios asuntos al mismo tiempo" },
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Condiciones.21}>0 && {Condiciones.22}>0 && {Condiciones.23}>0 && {Condiciones.24}>0 && {Condiciones.25}>0 && {Condiciones.26}>0 && {Condiciones.27}>0 && {Condiciones.28}>0 && {Condiciones.29}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Actividades", isRequired: true, 
                            title:" Las preguntas siguientes están relacionadas con las actividades que realiza en su trabajo y las responsabilidades que tiene.",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca"  }
                            ],
                            rows: [
                                { value: 30, text:"10. En mi trabajo soy responsable de cosas de mucho valor" },
                                { value: 31, text:"11. Respondo ante mi jefe por los resultados de toda mi área de trabajo" },
                                { value: 32, text:"12. En mi trabajo me dan órdenes contradictorias" },
                                { value: 33, text:"13. Considero que en mi trabajo me piden hacer cosas innecesarias" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Actividades.30}>0 && {Actividades.31}>0 && {Actividades.32}>0 && {Actividades.33}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Tiempo", isRequired: true, 
                            title:" Las preguntas siguientes están relacionadas con el tiempo destinado a su trabajo y sus responsabilidades familiares.",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca"  }
                            ],
                            rows: [
                                { value: 34, text:"14. Trabajo horas extras más de tres veces a la semana" },
                                { value: 35, text:"15. Mi trabajo me exige laborar en días de descanso, festivos o fines de semana" },
                                { value: 36, text:"16. Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales" },
                                { value: 37, text:"17. Pienso en las actividades familiares o personales cuando estoy en mi trabajo" },
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Tiempo.34}>0 && {Tiempo.35}>0 && {Tiempo.36}>0 && {Tiempo.37}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Decisiones",  isRequired: true, 
                            title:"Las preguntas siguientes están relacionadas con las decisiones que puede tomar en su trabajo..",
                            columns: [
                                { value: 3, text: "Siempre" },
                                { value: 4, text: "Casi siempre" },
                                { value: 5, text: "Algunas veces" },
                                { value: 6, text: "Casi nunca" },
                                { value: 7, text: "Nunca" }
                            ],
                            rows: [
                                { value: 38, text:"18. Mi trabajo permite que desarrolle nuevas habilidades " },
                                { value: 39, text:"19. En mi trabajo puedo aspirar a un mejor puesto" },
                                { value: 40, text:"20. Durante mi jornada de trabajo puedo tomar pausas cuando las necesito" },
                                { value: 41, text:"21. Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo" },
                                { value: 42, text:"22. Puedo cambiar el orden de las actividades que realizo en mi trabajo" },
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Decisiones.38}>0 && {Decisiones.39}>0 && {Decisiones.40}>0 && {Decisiones.41}>0 && {Decisiones.42}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Capacitacion", isRequired: true, 
                            title:"Las preguntas siguientes están relacionadas con la capacitación e información que recibe sobre su trabajo.",
                            columns: [
                                { value: 3, text: "Siempre" },
                                { value: 4, text: "Casi siempre" },
                                { value: 5, text: "Algunas veces" },
                                { value: 6, text: "Casi nunca" },
                                { value: 7, text: "Nunca" }
                            ],
                            rows: [
                                { value: 43, text:"23. Me informan con claridad cuáles son mis funciones " },
                                { value: 44, text:"24. Me explican claramente los resultados que debo obtener en mi trabajo" },
                                { value: 45, text:"25. Me informan con quién puedo resolver problemas o asuntos de trabajo" },
                                { value: 46, text:"26. Me permiten asistir a capacitaciones relacionadas con mi trabajo" },
                                { value: 47, text:"27. Recibo capacitación útil para hacer mi trabajo" },
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Capacitacion.43}>0 && {Capacitacion.44}>0 && {Capacitacion.45}>0 && {Capacitacion.46}>0 && {Capacitacion.47}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Relaciones", isRequired: true, 
                            title:"Las preguntas siguientes se refieren a las relaciones con sus compañeros de trabajo y su jefe.",
                            columns: [
                                { value: 3, text: "Siempre" },
                                { value: 4, text: "Casi siempre" },
                                { value: 5, text: "Algunas veces" },
                                { value: 6, text: "Casi nunca" },
                                { value: 7, text: "Nunca" }
                            ],
                            rows: [
                                { value: 48, text:"28. Mi jefe tiene en cuenta mis puntos de vista y opiniones" },
                                { value: 49, text:"29. Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo" },
                                { value: 50, text:"30. Puedo confiar en mis compañeros de trabajo" },
                                { value: 51, text:"31. Cuando tenemos que realizar trabajo de equipo los compañeros colaboran" },
                                { value: 52, text:"32. Mis compañeros de trabajo me ayudan cuando tengo dificultades " },
                                { value: 53, text:"33. En mi trabajo puedo expresarme libremente sin interrupciones" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Relaciones.48}>0 && {Relaciones.49}>0 && {Relaciones.50}>0 && {Relaciones.51}>0 && {Relaciones.52}>0 && {Relaciones.53}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Relaciones2", isRequired: true,
                            title: "Continuación...",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca"  }
                            ],
                            rows: [
                                { value: 54, text:"34. Recibo críticas constantes a mi persona y/o trabajo " },
                                { value: 55, text:"35. Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones" },
                                { value: 56, text:"36. Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones" },
                                { value: 57, text:"37. Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador" },
                                { value: 58, text:"38. Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores" },
                                { value: 59, text:"39. Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo" },
                                { value: 60, text:"40. He presenciado actos de violencia en mi centro de trabajo" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Relaciones2.54}>0 && {Relaciones2.55}>0 && {Relaciones2.56}>0 && {Relaciones2.57}>0 && {Relaciones2.58}>0 && {Relaciones2.59}>0 && {Relaciones2.60}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "radiogroup", name: "61", colCount: 2, isRequired: true,
                            title: "En mi trabajo debo brindar servicio a clientes o usuarios",
                            choices:[{ value: 1, text: "Si" }, { value: 2, text: "No" }],
                            validator: [
                                {
                                    type: "expression",
                                    expression: "{61.value}>0",
                                    text: "Es necesario elegir al menos una respuesta para continuar"
                                }
                            ]
                        },
                        { 
                            type: "matrix", name: "ServicioCliente",  isRequired: true, 
                            title:"Las preguntas siguientes están relacionadas con la atención a clientes y usuarios", visibleIf: "{61}=1",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca"  }
                            ],
                            rows: [
                                { value: 62, text:"41. Atiendo clientes o usuarios muy enojados" },
                                { value: 63, text:"42. Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas" },
                                { value: 64, text:"43. Para hacer mi trabajo debo demostrar sentimientos distintos a los míos" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Relaciones2.62}>0 && {Relaciones2.63}>0 && {Relaciones2.64}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                        
                    ]
                },
                {
                    questions: [
                        {
                            type: "radiogroup", name: "65",colCount: 2, isReuired: true,
                            title: "Soy jefe de otros trabajadores: ",  choices:[{ value: 1, text: "Si" }, { value: 2, text: "No" }],
                            validator: [
                                {
                                    type: "expression",
                                    expression: "{65.value}>0",
                                    text: "Es necesario elegir al menos una respuesta para continuar"
                                }
                            ]
                        },
                        { 
                            type: "matrix", name: "Actitudes", isRequired: true, 
                            title:"Las siguientes preguntas están relacionadas con las actitudes de los trabajadores que supervisa.", visibleIf: "{65}=1",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca"  }
                            ],
                            rows: [
                                { value: 66, text:"41. Atiendo clientes o usuarios muy enojados" },
                                { value: 67, text:"42. Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas" },
                                { value: 68, text:"43. Para hacer mi trabajo debo demostrar sentimientos distintos a los míos" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Actitudes.66}>0 && {Actitudes.67}>0 && {Actitudes.68}>0", 
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
                //.innerHTML = "result: " + JSON.stringify( result.data );
 
            var data = _.omit( result.data, ['61','65'] );
                 
            saveSurvey( data );
        });

        return (
            <div>
                <Row className="page-title">
                    <Col md={12}>
                        NOM 035
                    </Col>
                </Row>
                { surveyStore.empleadoId === -2 ?
                    <ErrorPage />
                    :
                    surveyStore.empleadoId === -1 ? 
                        <ValidationPage />
                        :
                        surveyStore.empleadoId === 0 ?
                            <VeryfingPage />
                            :
                            <Card>
                                <CardBody>
                                    <div className="row">
                                        <h4 className="header-title mt-0 mb-1 col-sm-12">
                                            <i className="uil uil-file-edit-alt mr-2"></i> Cuestionario para identificar los factores de riesgo psicosocial en los centros de trabajo
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


export default FriesgoComponent;
