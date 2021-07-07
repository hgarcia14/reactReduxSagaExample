// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';
import * as _ from 'lodash';

// simple bar chart
const BarColumnChart = ( props ) => {

    let categories = [];
    let data = [];
    let values = [];

    if( props.dashboardChart && props.dashboardChart[0].data ){
        for( var i of props.dashboardChart ){
            let v = [];
            if( i.hasOwnProperty( 'data' ) ){
                for( var x of i.data ){
                    v.push( x.valor );
                    values.push( x.valor );
                    categories.push( `${x.fecha}` );
                }
            }
            data.push( { name: i.name, data: v } );
        }

    }

    const apexBarChartOpts = {
        chart: {
            height: 380,
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        tooltip: {
            theme: 'dark',
            x: { show: false }
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff'],
            },
        },
        colors: ["#5369f8", "#43d39e", "#f77e53", "#ffbe0b"],
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
        },

        xaxis: {
            categories: _.uniq( categories ),
            axisBorder: {
                color: '#d6ddea',
            },
            axisTicks: {
                color: '#d6ddea',
            }
        },
        yaxis: {
            title: {
                text: 'Puntos de la evaluación'
            },
            labels: {
                offsetX: -5,
            }
        },
        legend: {
            offsetY: -10,
        },
        states: {
            hover: {
                filter: 'none',
            },
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2,
            },
            borderColor: '#f1f3fa',
        },
    };

    const apexBarChartData = data;/*[
        {
            name: 'Series 1',
            data: [44, 55, 41, 64, 22, 43, 21],
        },
        {
            name: 'Series 2',
            data: [53, 32, 33, 52, 13, 44, 32],
        },
    ];*/

    return (
        <Card className="gray-brd">
            <CardBody>
                <h4 className="header-title mt-0 mb-3">Gráfica de resultados de evluaciones</h4>
                <Chart options={apexBarChartOpts} series={apexBarChartData} type="bar" className="apex-charts" />
            </CardBody>
        </Card>
    );
};

export default BarColumnChart;
