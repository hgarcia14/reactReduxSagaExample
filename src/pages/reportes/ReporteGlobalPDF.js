import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import { Fragment } from 'react';
import Lato from '../../assets/fonts/Lato-Regular.ttf';

const styles = StyleSheet.create({
    body: {
      padding: 20
    },
    content: {
        padding: 0,
        '@media max-width: 400': {
          flexDirection: 'column',
        },
        '@media min-width: 400': {
          flexDirection: 'row',
        },
        alignContent: "center"
    },
    table: { 
      display: "table", 
      width: "auto", 
      borderRightWidth: 0, 
      borderBottomWidth: 0
    }, 
    tableRow: { 
      margin: "auto", 
      flexDirection: "row" 
    },
    tableRowHeader: {
        margin: "auto",
        flexDirection: "row",
        backgroundColor: '#f8f9fa'
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
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        textAlign: "center",
        backgroundColor: "#f8f9fa"
    },
    tableColHeader45: { 
        width: "45%",
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        backgroundColor: "#f8f9fa"
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
    tableCol20: { 
        width: "20%",  
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        textAlign: 'center'
    },
    tableCol45: { 
        width: "45%",  
        borderLeftWidth: 0, 
        borderTopWidth: 0 
    },
    tableCol80: { 
        width: "80%",  
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
    tableCol4: { 
        width: "10%",  
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        textAlign: "center"
    }, 
    tableHead: { 
        width: "100%",
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        borderBottomWidth: 0,
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
      fontSize: 12,
      fontWeight: "bold",
      textAlign: "center",
      fontFamily: 'Lato'
    },
    tableCellHeaderLeft: {
        margin: 5, 
        fontSize: 10,
        fontWeight: "bold",
        fontFamily: 'Lato'
    }, 
    tableCell: { 
      margin: 5, 
      fontSize: 10,
      fontFamily: 'Lato'
    },
    tableCellCenter: { 
        margin: 5, 
        fontSize: 8,
        textAlign: "center",
        fontFamily: 'Lato'
    },
    tableCellTab: {  
        margin: 5,
        marginLeft: "20px",
        fontSize: 8 
    },
    footerText: {
        margin: 5,
        fontSize: 6,
        fontFamily: 'Lato'
    },
    footerText10: {
        margin: 5,
        fontSize: 10,
        fontFamily: 'Lato'
    },
    block: {
        height: 12,
        width: 12,
        borderRadius: 10,
        backgroundColor: 'red',
    }
  });

  Font.register({
    family: 'Lato',
    src: `${Lato}`,
    });

  const ColorRed = () => (
    <View style={[styles.content, { marginTop: '5px' }]}>
      <View style={[styles.block, { backgroundColor: 'red' }]} />
    </View>
  );

  const ColorYellow = () => (
    <View style={[styles.content, { marginTop: '5px' }]}>
      <View style={[styles.block, { backgroundColor: 'yellow' }]} />
    </View>
  );

  const ColorGreen = () => (
    <View style={[styles.content, { marginTop: '5px' }]}>
      <View style={[styles.block, { backgroundColor: 'green' }]} />
    </View>
  );

  const ReporteGlobalPDF = ( props ) => {

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
                            <View style={styles.tableCol20}> 
                                <Text style={styles.tableCell}>{userInfo.empresa}</Text> 
                            </View> 
                            <View style={styles.tableCol80}>
                            </View> 
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.tableCol20}> 
                                <Text style={styles.tableCell}>Encuesta</Text> 
                            </View> 
                            <View style={styles.tableCol80}> 
                                <Text style={styles.tableCell}>{info[0].encuesta}</Text> 
                            </View> 
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.tableCol20}> 
                                <Text style={styles.tableCell}>Fecha de aplicación</Text> 
                            </View> 
                            <View style={styles.tableCol80}> 
                                <Text style={styles.tableCell}>{info[0].fechaAplicacion}</Text> 
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
                        {
                            info.map(
                                ( r, i ) => (
                                    <Fragment key={i}>
                                        <View style={styles.tableRowHeader}>
                                            <View style={styles.tableColHeader}> 
                                                <Text style={styles.tableCellHeader}>Encuesta</Text> 
                                            </View>
                                            <View style={styles.tableColHeader20}> 
                                                <Text style={styles.tableCellHeader}>Empleado</Text> 
                                            </View>
                                            <View style={styles.tableColHeader20}> 
                                                <Text style={styles.tableCellHeader}>Resultado general</Text> 
                                            </View>
                                            <View style={styles.tableColHeader20}> 
                                                <Text style={styles.tableCellHeader}>Nivel de riesgo</Text> 
                                            </View>
                                            <View style={styles.tableColHeader15}>
                                            </View>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol}> 
                                                <Text style={styles.tableCell}>{r.encuesta}</Text> 
                                            </View>
                                            <View style={styles.tableCol20Center}> 
                                                <Text style={styles.tableCell}>{r.empleado}</Text> 
                                            </View>
                                            <View style={styles.tableCol20Center}> 
                                                <Text style={styles.tableCell}>{r.resultado}</Text> 
                                            </View>
                                            <View style={styles.tableCol20Center}> 
                                                <Text style={styles.tableCell}>{r.nivel}</Text> 
                                            </View>
                                            <View style={styles.tableCol15Center}> 
                                            {
                                                r.nivel === 'Muy alto' || r.nivel === 'Alto' ? 
                                                    <ColorRed />
                                                :
                                                    r.nivel === 'Medio' ?
                                                        <ColorYellow />
                                                    :
                                                        <ColorGreen />
                                            }
                                            </View>
                                        </View>
                                        <View style={styles.table}>
                                            <View style={styles.tableRow}>
                                                <View style={styles.tableHead}>
                                                    <Text style={styles.tableCellHeader}>Resultado por categoría y dominio</Text> 
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.tableRowHeader}>
                                            <View style={styles.tableColHeader45}> 
                                                <Text style={styles.tableCellHeader}>Categoría y dominio</Text> 
                                            </View>
                                            <View style={styles.tableColHeader20}> 
                                                <Text style={styles.tableCellHeader}>Resultado</Text> 
                                            </View>
                                            <View style={styles.tableColHeader20}> 
                                                <Text style={styles.tableCellHeader}>Nivel de riesgo</Text> 
                                            </View>
                                            <View style={styles.tableColHeader15}>
                                            </View>
                                        </View>
                                        {
                                            r.categorias.map(
                                                ( c, x ) => (
                                                    <Fragment key={x}>
                                                        <View style={styles.tableRow}>
                                                            <View style={styles.tableCol45}> 
                                                                <Text style={styles.tableCell}>{c.categoria}</Text> 
                                                            </View>
                                                            <View style={styles.tableCol20Center}> 
                                                                <Text style={styles.tableCell}>{c.resultado}</Text> 
                                                            </View>
                                                            <View style={styles.tableCol20Center}> 
                                                                <Text style={styles.tableCell}>{c.nivel}</Text> 
                                                            </View>
                                                            <View style={styles.tableCol15Center}> 
                                                                {
                                                                    c.nivel === 'Muy alto' || c.nivel === 'Alto' ? 
                                                                        <ColorRed />
                                                                    :
                                                                        c.nivel === 'Medio' ?
                                                                            <ColorYellow />
                                                                        :
                                                                            <ColorGreen />
                                                                }
                                                            </View>
                                                        </View>
                                                        {
                                                            c.dominios.map(
                                                                ( d, y ) => (
                                                                    <View style={styles.tableRow} key={y}>
                                                                        <View style={styles.tableCol45}> 
                                                                            <Text style={styles.tableCell}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{d.dominio}</Text> 
                                                                        </View>
                                                                        <View style={styles.tableCol20Center}> 
                                                                            <Text style={styles.tableCell}>{d.resultado}</Text> 
                                                                        </View>
                                                                        <View style={styles.tableCol20Center}> 
                                                                            <Text style={styles.tableCell}>{d.nivel}</Text> 
                                                                        </View>
                                                                        <View style={styles.tableCol15Center}> 
                                                                            {
                                                                                d.nivel === 'Muy alto' || d.nivel === 'Alto' ? 
                                                                                    <ColorRed />
                                                                                :
                                                                                    d.nivel === 'Medio' ?
                                                                                        <ColorYellow />
                                                                                    :
                                                                                        <ColorGreen />
                                                                            }
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
                    </View>
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
                            <View style={styles.tableCol20}> 
                                <Text style={styles.tableCell}>{userInfo.empresa}</Text> 
                            </View> 
                            <View style={styles.tableCol80}> 
                                <Text style={styles.tableCell}></Text> 
                            </View> 
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.tableCol20}> 
                                <Text style={styles.tableCell}>Encuesta</Text> 
                            </View> 
                            <View style={styles.tableCol80}> 
                                <Text style={styles.tableCell}>{info[0].encuesta}</Text> 
                            </View> 
                        </View>
                        <View style={styles.tableRow}> 
                            <View style={styles.tableCol20}> 
                                <Text style={styles.tableCell}>Fecha de aplicación</Text> 
                            </View> 
                            <View style={styles.tableCol80}> 
                                <Text style={styles.tableCell}>{info[0].fecha}</Text> 
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
                                                            <Text style={styles.tableCellCenter}>{p.si}</Text> 
                                                        </View>
                                                        <View style={styles.tableCol15Center}> 
                                                            <Text style={styles.tableCellCenter}>{p.no}</Text> 
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
   
  export default ReporteGlobalPDF;