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

    const OrgainzacionComponent = ( props ) => {
    
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
                            type: "matrix", name: "Condiciones", isRequired: true, 
                            title:"Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca" }
                            ],
                            rows: [
                                { value: 69, text:"1. El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica" },
                                { value: 70, text:"2. Mi trabajo me exige hacer mucho esfuerzo físico" },
                                { value: 71, text:"3. Me preocupa sufrir un accidente en mi trabajo" },
                                { value: 72, text:"4. Considero que en mi trabajo se aplican las normas de seguridad y salud en el trabajo" },
                                { value: 73, text:"5. Considero que las actividades que realizo son peligrosas " }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Condiciones.69}>0 && {Condiciones.70}>0 && {Condiciones.71}>0 && {Condiciones.72}>0 && {Condiciones.73}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Cantidad", isRequired: true, 
                            title:"Para responder a las preguntas siguientes piense en la cantidad y ritmo de trabajo que tiene.",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca" }
                            ],
                            rows: [
                                { value: 74, text:"6. Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno" },
                                { value: 75, text:"7. Por la cantidad de trabajo que tengo debo trabajar sin parar" },
                                { value: 76, text:"8. Considero que es necesario mantener un ritmo de trabajo acelerado" },
                            
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Cantidad.74}>0 && {Cantidad.75}>0 && {Cantidad.76}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Esfuerzo", isRequired: true, 
                            title:"Las preguntas siguientes están relacionadas con el esfuerzo mental que le exige su trabajo.",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca" }
                            ],
                            rows: [
                                { value: 77, text:"9. Mi trabajo exige que esté muy concentrado" },
                                { value: 78, text:"10. Mi trabajo requiere que memorice mucha información" },
                                { value: 79, text:"11. En mi trabajo tengo que tomar decisiones difíciles muy rápido" },
                                { value: 80, text:"12. Mi trabajo exige que atienda varios asuntos al mismo tiempo" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Esfuerzo.77}>0 && {Esfuerzo.78}>0 && {Esfuerzo.79}>0 && {Esfuerzo.80}>0", 
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
                            title:"Las preguntas siguientes están relacionadas con las actividades que realiza en su trabajo y las responsabilidades que tiene.",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca" }
                            ],
                            rows: [
                                { value: 81, text:"13. En mi trabajo soy responsable de cosas de mucho valor" },
                                { value: 82, text:"14. Respondo ante mi jefe por los resultados de toda mi área de trabajo" },
                                { value: 83, text:"15. En el trabajo me dan órdenes contradictorias" },
                                { value: 84, text:"16. Considero que en mi trabajo me piden hacer cosas innecesarias" },
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Actividades.81}>0 && {Actividades.82}>0 && {Actividades.83}>0 && {Actividades.84}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Jornada",isRequired: true, 
                            title:"Las preguntas siguientes están relacionadas con su jornada de trabajo.",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca" }
                            ],
                            rows: [
                                { value: 85, text:"17. Trabajo horas extras más de tres veces a la semana" },
                                { value: 86, text:"18. Mi trabajo me exige laborar en días de descanso, festivos o fines de semana" },
                                { value: 87, text:"19. Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales" },
                                { value: 88, text:"20. Debo atender asuntos de trabajo cuando estoy en casa" },
                                { value: 89, text:"21. Pienso en las actividades familiares o personales cuando estoy en mi trabajo" },
                                { value: 90, text:"22. Pienso que mis responsabilidades familiares afectan mi trabajo " }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Jornada.85}>0 && {Jornada.86}>0 && {Jornada.87}>0 && {Jornada.88}>0 && {Jornada.89}>0 && {Jornada.90}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Decisciones", isRequired: true, 
                            title:"Las preguntas siguientes están relacionadas con las decisiones que puede tomar en su trabajo.",
                            columns: [
                                { value: 3, text: "Siempre" },
                                { value: 4, text: "Casi siempre" },
                                { value: 5, text: "Algunas veces" },
                                { value: 6, text: "Casi nunca" },
                                { value: 7, text: "Nunca" }
                            ],
                            rows: [
                                { value: 91, text:"23. Mi trabajo permite que desarrolle nuevas habilidades " },
                                { value: 92, text:"24. En mi trabajo puedo aspirar a un mejor puesto" },
                                { value: 93, text:"25. Durante mi jornada de trabajo puedo tomar pausas cuando las necesito" },
                                { value: 94, text:"26. Puedo decidir cuánto trabajo realizo durante la jornada laboral" },
                                { value: 95, text:"27. Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo" },
                                { value: 96, text:"28. Puedo cambiar el orden de las actividades que realizo en mi trabajo " },
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Decisciones.91}>0 && {Decisciones.92}>0 && {Decisciones.93}>0 && {Decisciones.94}>0 && {Decisciones.95}>0 && {Decisciones.96}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Responsabilidades", isRequired: true, 
                            title:"Las preguntas siguientes están relacionadas con las actividades que realiza en su trabajo y las responsabilidades que tiene.",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca" }
                            ],
                            rows: [
                                { value: 97, text:"29. Los cambios que se presentan en mi trabajo dificultan mi labor" },
                                { value: 98, text:"30. Cuando se presentan cambios en mi trabajo se tienen en cuenta mis ideas o aportaciones" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Responsabilidades.97}>0 && {Responsabilidades.98}>0", 
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
                            title:" Las preguntas siguientes están relacionadas con la capacitación e información que se le proporciona sobre su trabajo.",
                            columns: [
                                { value: 3, text: "Siempre" },
                                { value: 4, text: "Casi siempre" },
                                { value: 5, text: "Algunas veces" },
                                { value: 6, text: "Casi nunca" },
                                { value: 7, text: "Nunca" }
                            ],
                            rows: [
                                { value: 99, text:"31. Me informan con claridad cuáles son mis funciones " },
                                { value: 100, text:"32. Me explican claramente los resultados que debo obtener en mi trabajo" },
                                { value: 101, text:"33. Me explican claramente los objetivos de mi trabajo" },
                                { value: 102, text:"34. Me informan con quién puedo resolver problemas o asuntos de trabajo" },
                                { value: 103, text:"35. Me permiten asistir a capacitaciones relacionadas con mi trabajo" },
                                { value: 104, text:"36. Recibo capacitación útil para hacer mi trabajo " }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Capacitacion.99}>0 && {Capacitacion.100}>0 && {Capacitacion.101}>0 && {Capacitacion.102}>0 && {Capacitacion.103}>0 && {Capacitacion.104}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Jefes", isRequired: true, 
                            title:"Las preguntas siguientes están relacionadas con el o los jefes con quien tiene contacto.",
                            columns: [
                                { value: 3, text: "Siempre" },
                                { value: 4, text: "Casi siempre" },
                                { value: 5, text: "Algunas veces" },
                                { value: 6, text: "Casi nunca" },
                                { value: 7, text: "Nunca" }
                            ],
                            rows: [
                                { value: 105, text:"37. Mi jefe ayuda a organizar mejor el trabajo " },
                                { value: 106, text:"38. Mi jefe tiene en cuenta mis puntos de vista y opiniones" },
                                { value: 107, text:"39. Mi jefe me comunica a tiempo la información relacionada con el trabajo" },
                                { value: 108, text:"40. La orientación que me da mi jefe me ayuda a realizar mejor mi trabajo" },
                                { value: 109, text:"41. Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Jefes.105}>0 && {Jefes.106}>0 && {Jefes.107}>0 && {Jefes.108}>0 && {Jefes.109}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Companeros", isRequired: true, 
                            title:"Las preguntas siguientes se refieren a las relaciones con sus compañeros.",
                            columns: [
                                { value: 3, text: "Siempre" },
                                { value: 4, text: "Casi siempre" },
                                { value: 5, text: "Algunas veces" },
                                { value: 6, text: "Casi nunca" },
                                { value: 7, text: "Nunca" }
                            ],
                            rows: [
                                { value: 110, text:"42. Puedo confiar en mis compañeros de trabajo " },
                                { value: 111, text:"43. Entre compañeros solucionamos los problemas de trabajo de forma respetuosa" },
                                { value: 112, text:"44. En mi trabajo me hacen sentir parte del grupo" },
                                { value: 113, text:"45. Cuando tenemos que realizar trabajo de equipo los compañeros colaboran" },
                                { value: 114, text:"46. Mis compañeros de trabajo me ayudan cuando tengo dificultades" },
                            
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Companeros.110}>0 && {Companeros.111}>0 && {Companeros.112}>0 && {Companeros.113}>0 && {Companeros.114}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Rendimiento", isRequired: true, 
                            title:"Las preguntas siguientes están relacionadas con la información que recibe sobre su rendimiento en el trabajo, el reconocimiento, el sentido de pertenencia y la estabilidad que le ofrece su trabajo.",
                            columns: [
                                { value: 3, text: "Siempre" },
                                { value: 4, text: "Casi siempre" },
                                { value: 5, text: "Algunas veces" },
                                { value: 6, text: "Casi nunca" },
                                { value: 7, text: "Nunca" }
                            ],
                            rows: [
                                { value: 115, text:"47. Me informan sobre lo que hago bien en mi trabajo" },
                                { value: 116, text:"48. La forma como evalúan mi trabajo en mi centro de trabajo me ayuda a mejorar mi desempeño" },
                                { value: 117, text:"49. En mi centro de trabajo me pagan a tiempo mi salario" },
                                { value: 118, text:"50. El pago que recibo es el que merezco por el trabajo que realizo" },
                                { value: 119, text:"51. Si obtengo los resultados esperados en mi trabajo me recompensan o reconocen" },
                                { value: 120, text:"52. Las personas que hacen bien el trabajo pueden crecer laboralmente" },
                                { value: 121, text:"53. Considero que mi trabajo es estable" },
                                { value: 122, text:"54. En mi trabajo existe continua rotación de personal" },
                                { value: 123, text:"55. Siento orgullo de laborar en este centro de trabajo" },
                                { value: 124, text:"56. Me siento comprometido con mi trabajo" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Rendimiento.115}>0 && {Rendimiento.116}>0 && {Rendimiento.117}>0 && {Rendimiento.118}>0 && {Rendimiento.119}>0 && {Rendimiento.120}>0 && {Rendimiento.121}>0 && {Rendimiento.122}>0 && {Rendimiento.123}>0 && {Rendimiento.124}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "matrix", name: "Violencia", isRequired: true, 
                            title:"Las preguntas siguientes están relacionadas con actos de violencia laboral (malos tratos, acoso, hostigamiento, acoso psicológico).",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca" }
                            ],
                            rows: [
                                { value: 125, text:"57. En mi trabajo puedo expresarme libremente sin interrupciones" },
                                { value: 126, text:"58. Recibo críticas constantes a mi persona y/o trabajo" },
                                { value: 127, text:"59. Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones" },
                                { value: 128, text:"60. Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones" },
                                { value: 129, text:"61. Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador" },
                                { value: 130, text:"62. Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores" },
                                { value: 131, text:"63. Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo" },
                                { value: 132, text:"64. He presenciado actos de violencia en mi centro de trabajo" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Violencia.125}>0 && {Violencia.126}>0 && {Violencia.127}>0 && {Violencia.128}>0 && {Violencia.129}>0 && {Violencia.130}>0 && {Violencia.131}>0 && {Violencia.132}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "radiogroup", name: "133", colCount: 2, 
                            title: "Las preguntas siguientes están relacionadas con la atención a clientes y usuarios.", 
                            choices:[{ value: 1, text: "Si" }, { value: 2, text: "No" }]
                        },
                        {  
                            type: "matrix", name:"Servicio",  isRequired: true, title:"En mi trabajo debo brindar servicio a clientes o usuarios:", visibleIf: "{133}=1",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca" }
                            ],
                            rows: [
                                { value: 134, text:"65. Atiendo clientes o usuarios muy enojados" },
                                { value: 135, text:"66. Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas" },
                                { value: 136, text:"67. Para hacer mi trabajo debo demostrar sentimientos distintos a los míos" },
                                { value: 137, text:"68. Mi trabajo me exige atender situaciones de violencia" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{Servicio.134}>0 && {Servicio.135}>0 && {Servicio.136}>0 && {Servicio.137}>0", 
                                    text: "Es necesario responder todas las preguntas" 
                                }
                            ]
                        }
                        
                    ]
                },
                {
                    questions: [
                        { 
                            type: "radiogroup", name: "138", colCount: 2, 
                            title: "Las preguntas siguientes están relacionadas con las actitudes de las personas que supervisa.", 
                            choices:[{ value: 1, text: "Si" }, { value: 2, text: "No" }]
                        },
                        { 
                            type: "matrix", name:"JefeTrabajadores",  isRequired: true, title:"Soy jefe de otros trabajadores:", visibleIf: "{138}=1",
                            columns: [
                                { value: 8, text: "Siempre" },
                                { value: 9, text: "Casi siempre" },
                                { value: 10, text: "Algunas veces" },
                                { value: 11, text: "Casi nunca" },
                                { value: 12, text: "Nunca" }
                            ],
                            rows: [
                                { value: 139, text:"69. Comunican tarde los asuntos de trabajo" },
                                { value: 140, text:"70. Dificultan el logro de los resultados del trabajo" },
                                { value: 141, text:"71. Cooperan poco cuando se necesita" },
                                { value: 142, text:"72. Ignoran las sugerencias para mejorar su trabajo" }
                            ],
                            validators: [
                                { 
                                    type: "expression", 
                                    expression: "{JefeTrabajadores.139}>0 && {JefeTrabajadores.140}>0 && {JefeTrabajadores.141}>0 && {JefeTrabajadores.142}>0", 
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

            let d = result.data;

            d.Condiciones['69'] = getRespuestaValor( result.data.Condiciones['1'] );
            d.Condiciones['72'] = getRespuestaValor( result.data.Condiciones['4'] );
            d.Responsabilidades['97'] = getRespuestaValor( result.data.Responsabilidades['97'] );
            d.Violencia['125'] = getRespuestaValor( result.data.Violencia['125'] );

            var data = _.omit( result.data, ['133','138'] );

            saveSurvey( data );
            
        });

        const getRespuestaValor = ( n ) => {

            switch( n ){
                case '8':
                    return '3';
                case '9':
                    return '4';
                case '10':
                    return '5';
                case '11':
                    return '6';
                case '12':
                    return '7';
                default:
                    return '0';
            }

        }

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
                                            <i className="uil uil-file-edit-alt mr-2"></i> Cuestionario para identificar los factores de riesgo psicosocial y evaluar el entorno organizacional en los centros de trabajo
                                        </h4>
                                    
                                    </div>

                                    <Survey.Survey model={survey} />
                                    <div id="surveyResult"></div>
                                </CardBody>
                            </Card>
                }
            </div>
        );
    }


export default OrgainzacionComponent;
