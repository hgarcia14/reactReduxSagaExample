import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Fragment } from 'react';

const styles = StyleSheet.create({
    body: {
      padding: 20
    },
    content: {
        padding: 1,
        '@media max-width: 400': {
          flexDirection: 'column',
        },
        '@media min-width: 400': {
          flexDirection: 'row',
        },
        alignContent: "center",
        borderRadius: "2px"
    },
    table: { 
      display: "table", 
      width: "auto", 
      borderRightWidth: 0, 
      borderBottomWidth: 1
    }, 
    tableRow: { 
      margin: "auto", 
      flexDirection: "row" 
    }, 
    tableColHeader: { 
      width: "25%", 
      borderBottomColor: '#000',
      borderLeftWidth: 0, 
      borderTopWidth: 0
    },
    tableColHeader20: { 
        width: "20%", 
        borderBottomColor: '#000',
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        textAlign: "center"
    },
    tableColHeader15: { 
        width: "15%", 
        borderBottomColor: '#000',
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        textAlign: "center",
        backgroundColor: "#D3D2D2"
    },
    tableColHeader25: { 
        width: "25%", 
        borderBottomColor: '#000',
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        textAlign: "center",
        backgroundColor: "#D3D2D2"
    },
    tableColHeader75: { 
        width: "75%", 
        borderBottomColor: '#000',
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        backgroundColor: "#D3D2D2"
    },
    tableColHeader100: { 
        width: "100%", 
        borderBottomColor: '#000',
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        textAlign: "center"
    },  
    tableCol: { 
      width: "25%",  
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    },
    tableColCenter: {
        width: "25%",  
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        textAlign: "center"
    },
    tableCol15: { 
        width: "15%",  
        borderLeftWidth: 0, 
        borderTopWidth: 0 
    },
    tableCol20: { 
        width: "20%",  
        borderLeftWidth: 0, 
        borderTopWidth: 0 
    },
    tableCol85: { 
        width: "85%",  
        borderLeftWidth: 0, 
        borderTopWidth: 0 
    },
    tableCol20Center: { 
        width: "20%",  
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        textAlign: "center"
    },
    tableCol15Center: { 
        width: "15%",  
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        textAlign: "center"
    },
    tableCol2: { 
        width: "50%", 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
    },
    tableCol75: { 
        width: "75%", 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
    },
    tableCol100: { 
        width: "100%", 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
    },
    tableCol3: { 
        width: "25%",  
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        textAlign: "center"
    }, 
    tableHead: { 
        width: "100%",
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        textAlign: "center"
    },
    tableHeadBorder: { 
        width: "100%",
        borderLeftWidth: 0, 
        borderTopWidth: 1,
        borderBottomWidth: 1,
        textAlign: "center"
    },
    tableCellHeader: {
      margin: 5, 
      fontSize: 10,
      fontWeight: "bold",
      textAlign: "center"
    },
    tableCellHeaderLeft: {
        margin: 5, 
        fontSize: 10,
        fontWeight: "bold"
    }, 
    tableCell: { 
      margin: 5, 
      fontSize: 8
    },
    tableCellCenter: { 
        margin: 5, 
        fontSize: 8,
        textAlign: "center"
    },
    tableCellTab: {  
        margin: 5,
        marginLeft: "20px",
        fontSize: 8 
    },
    footerText: {
        margin: 5,
        fontSize: 6
    },
    footerText10: {
        margin: 5,
        fontSize: 10
    },
    block: {
        height: 12,
        width: 12,
        backgroundColor: 'red',
    }
  });

  const ColorRed = () => (
    <View style={styles.content}>
      <View style={[styles.block, { backgroundColor: 'red' }]} />
    </View>
  );

  const ColorYellow = () => (
    <View style={styles.content}>
      <View style={[styles.block, { backgroundColor: 'yellow' }]} />
    </View>
  );

  const ColorGreen = () => (
    <View style={styles.content}>
      <View style={[styles.block, { backgroundColor: 'green' }]} />
    </View>
  );

const ReporteIndividualPDF = ( props ) => {
    const [info, setInfo] = useState( props.pdf );
    const [userInfo, setUserInfo] = useState( props.user );
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setisLoading(false), 1000);
        setInfo( props.pdf );
        setUserInfo( props.user );
        // eslint-disable-next-line
    }, []);

    const Documento = () => (
        <PDFViewer width="100%" height="100%">
            <Document title="ReporteGlobalPDF">
                <Page style={styles.body}>
                    <View style={styles.table}> 
                        <View style={styles.tableRow}> 
                            <View style={styles.tableCol15}> 
                                <Text style={styles.tableCell}>{userInfo.empresa}</Text> 
                            </View> 
                            <View style={styles.tableCol85}> 
                                <Text style={styles.tableCell}></Text> 
                            </View> 
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.tableCol15}> 
                                <Text style={styles.tableCell}>Encuesta:</Text> 
                            </View> 
                            <View style={styles.tableCol85}> 
                                <Text style={styles.tableCell}>{info[0].encuesta}</Text> 
                            </View> 
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.tableCol15}> 
                                <Text style={styles.tableCell}>Fecha de aplicación</Text> 
                            </View> 
                            <View style={styles.tableCol85}> 
                                <Text style={styles.tableCell}>{info[0].fecha}</Text> 
                            </View> 
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.tableCol15}> 
                                <Text style={styles.tableCell}>Empleado</Text> 
                            </View> 
                            <View style={styles.tableCol85}> 
                                <Text style={styles.tableCell}>{info[0].empleado}</Text> 
                            </View> 
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableHead}>
                                <Text style={styles.tableCellHeader}>Resultado general</Text> 
                            </View>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}> 
                                <Text style={styles.tableCellHeader}>Resultado</Text> 
                            </View>
                            <View style={styles.tableColHeader}> 
                                <Text style={styles.tableCellHeader}>Nivel de riesgo</Text> 
                            </View>
                            <View style={styles.tableColHeader}> 
                                <Text style={styles.tableCellHeader}></Text> 
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol3}> 
                                <Text style={styles.tableCell}>{info[0].resultado}</Text> 
                            </View>
                            <View style={styles.tableCol3}> 
                                <Text style={styles.tableCell}>{info[0].nivel}</Text> 
                            </View>
                            <View style={styles.tableCol3}> 
                            {
                                info[0].nivel === 'Muy alto' || info[0].nivel === 'Alto' ? 
                                    <ColorRed />
                                :
                                    info[0].nivel === 'Medio' ?
                                        <ColorYellow />
                                    :
                                        <ColorGreen />
                            }
                            </View>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableHead}>
                                <Text style={styles.tableCellHeader}>Necesidad de acción según el nivel de riesgo</Text> 
                            </View>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol75}> 
                                <Text style={styles.tableCell}>{info[0].diagnostico}</Text> 
                            </View>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableHead}>
                                <Text style={styles.tableCellHeader}>Resultado por categoría y dominio</Text> 
                            </View>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}> 
                                <Text style={styles.tableCellHeader}>Categoría</Text> 
                            </View>
                            <View style={styles.tableColHeader}> 
                                <Text style={styles.tableCellHeader}>Resultado</Text> 
                            </View>
                            <View style={styles.tableColHeader}> 
                                <Text style={styles.tableCellHeader}>Nivel de riesgo</Text> 
                            </View>
                            <View style={styles.tableColHeader}> 
                                <Text style={styles.tableCellHeader}></Text> 
                            </View>
                        </View>
                        { info[0].categorias.map(
                            ( row, i ) => (
                                <Fragment key={i}>
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableCol}> 
                                            <Text style={styles.tableCell}>{row.categoria}</Text> 
                                        </View>
                                        <View style={styles.tableCol3}> 
                                            <Text style={styles.tableCell}>{row.resultado}</Text> 
                                        </View>
                                        <View style={styles.tableCol3}> 
                                            <Text style={styles.tableCell}>{row.nivel}</Text> 
                                        </View>
                                        <View style={styles.tableCol3}>
                                            {
                                                row.nivel === 'Muy alto' || row.nivel === 'Alto' ? 
                                                    <ColorRed />
                                                :
                                                    row.nivel === 'Medio' ?
                                                        <ColorYellow />
                                                    :
                                                        <ColorGreen />
                                            }
                                        </View>
                                    </View>
                                {
                                    row.dominios.map( 
                                        ( dominio, x ) => (
                                            <View style={styles.tableRow} key={x}>
                                                <View style={styles.tableCol}> 
                                                    <Text style={styles.tableCellTab}>{dominio.dominio}</Text> 
                                                </View>
                                                <View style={styles.tableCol3}> 
                                                    <Text style={styles.tableCell}>{dominio.resultado}</Text> 
                                                </View>
                                                <View style={styles.tableCol3}> 
                                                    <Text style={styles.tableCell}>{dominio.nivel}</Text> 
                                                </View>
                                                <View style={styles.tableCol3}>
                                                </View>
                                            </View>
                                        )
                                    )
                                }
                                </Fragment>
                            ) 
                        )
                        }
                    </View>
                </Page>
                <Page style={styles.body}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableHead}>
                                <Text style={styles.tableCellHeader}>Acumulado de respuestas</Text> 
                            </View>
                        </View>
                    </View>
                    { info[0].categorias.map(
                            ( row, i ) => (
                                <Fragment key={i}>
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableHeadBorder}> 
                                            <Text style={styles.tableCellHeader}>{row.categoria}</Text> 
                                        </View>
                                    </View>
                                {
                                    row.dominios.map( 
                                        ( dominio, x ) => (
                                            <Fragment key={x}>
                                                <View style={styles.tableRow}>
                                                    <View style={styles.tableColHeader25}> 
                                                        <Text style={styles.tableCellHeaderLeft}>{dominio.dominio}</Text> 
                                                    </View>
                                                    <View style={styles.tableColHeader15}> 
                                                        <Text style={styles.tableCellHeader}>Siempre</Text> 
                                                    </View>
                                                    <View style={styles.tableColHeader15}> 
                                                        <Text style={styles.tableCellHeader}>Casi siempre</Text> 
                                                    </View>
                                                    <View style={styles.tableColHeader15}> 
                                                        <Text style={styles.tableCellHeader}>Algunas veces</Text> 
                                                    </View>
                                                    <View style={styles.tableColHeader15}> 
                                                        <Text style={styles.tableCellHeader}>Casi nunca</Text> 
                                                    </View>
                                                    <View style={styles.tableColHeader15}> 
                                                        <Text style={styles.tableCellHeader}>Nunca</Text> 
                                                    </View>
                                                </View>
                                                {
                                                    dominio.preguntas.map(
                                                        ( r, y ) => (
                                                            <View style={styles.tableRow} key={y}>
                                                                <View style={styles.tableCol}> 
                                                                    <Text style={styles.tableCell}>{`${r.preguntaNumero}.- ${r.pregunta}`}</Text> 
                                                                </View>
                                                                <View style={styles.tableCol15Center}> 
                                                                    <Text style={styles.tableCell}>{r.Siempre}</Text> 
                                                                </View>
                                                                <View style={styles.tableCol15Center}> 
                                                                    <Text style={styles.tableCell}>{r.Casi_siempre}</Text> 
                                                                </View>
                                                                <View style={styles.tableCol15Center}> 
                                                                    <Text style={styles.tableCell}>{r.Algunas_veces}</Text> 
                                                                </View>
                                                                <View style={styles.tableCol15Center}> 
                                                                    <Text style={styles.tableCell}>{r.Casi_nunca}</Text> 
                                                                </View>
                                                                <View style={styles.tableCol15Center}> 
                                                                    <Text style={styles.tableCell}>{r.Nunca}</Text> 
                                                                </View>
                                                            </View>
                                                        )
                                                    )
                                                }
                                            </Fragment>
                                        )
                                    )
                                }
                                </Fragment>
                            ) 
                        )
                        }
                </Page>
            </Document>
        </PDFViewer>
    );

    const ATS = () => (
        <PDFViewer width="100%" height="100%">
            <Document title="ReporteGlobalPDF">
                <Page style={styles.body}>
                    <View style={styles.table}> 
                        <View style={styles.tableRow}> 
                            <View style={styles.tableCol15}> 
                                <Text style={styles.tableCell}>{userInfo.empresa}</Text> 
                            </View> 
                            <View style={styles.tableCol85}> 
                                <Text style={styles.tableCell}></Text> 
                            </View> 
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.tableCol15}> 
                                <Text style={styles.tableCell}>Encuesta</Text> 
                            </View> 
                            <View style={styles.tableCol85}> 
                                <Text style={styles.tableCell}>{info[0].encuesta}</Text> 
                            </View> 
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.tableCol15}> 
                                <Text style={styles.tableCell}>Fecha de aplicación</Text> 
                            </View> 
                            <View style={styles.tableCol85}> 
                                <Text style={styles.tableCell}>{info[0].fecha}</Text> 
                            </View> 
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.tableCol15}> 
                                <Text style={styles.tableCell}>Empleado</Text> 
                            </View> 
                            <View style={styles.tableCol85}> 
                                <Text style={styles.tableCell}>{info[0].empleado}</Text> 
                            </View> 
                        </View>
                    </View>
                    <View style={styles.table}>
                        {
                            info.map( 
                                ( row, i ) => (
                                    <Fragment key={i}>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableColHeader75}> 
                                                <Text style={styles.tableCellHeaderLeft}>{row.seccionNombre}</Text> 
                                            </View>
                                            <View style={styles.tableColHeader15}> 
                                                <Text style={styles.tableCellHeader}>Si</Text> 
                                            </View>
                                            <View style={styles.tableColHeader15}> 
                                                <Text style={styles.tableCellHeader}>No</Text> 
                                            </View>
                                        </View>
                                        {
                                            row.preguntas.map( 
                                                ( p, x ) => (
                                                    <View style={styles.tableRow} key={x}>
                                                        <View style={styles.tableCol75}> 
                                                            <Text style={styles.tableCell}>{p.pregunta}</Text> 
                                                        </View>
                                                        <View style={styles.tableCol15Center}> 
                                                            <Text style={styles.tableCellCenter}>{p.si === 1 ? 'X' : ''}</Text> 
                                                        </View>
                                                        <View style={styles.tableCol15Center}> 
                                                            <Text style={styles.tableCellCenter}>{p.no === 1 ? 'X' : ''}</Text> 
                                                        </View>
                                                    </View>
                                                ) 
                                            )
                                        }
                                    </Fragment>
                                ) 
                            )
                        }
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol100}>
                                <Text style={styles.footerText10}>{`Diagnostico: ${info[0].diagnostico}`}</Text>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );

    return (
        <div id='pdf'>
            <div className="card h100 p20 mt20">
                <div id="pfDoc" style={{ height: '100vh' }}>
                    { 
                        isLoading ? 
                            <div className='text-center'>Cargando</div> 
                            :
                            !info ?
                                <div className='text-center'>No se encontraron registros</div> :
                                info.hasOwnProperty( 'mensaje' ) ? 
                                    <div className='text-center'>No se encontraron registros</div> :
                                    info[0].hasOwnProperty( 'icono' ) ?
                                        <Documento />
                                    :
                                        <ATS />
                    }
                </div>
            </div>
        </div>
    );
}
 
export default ReporteIndividualPDF;