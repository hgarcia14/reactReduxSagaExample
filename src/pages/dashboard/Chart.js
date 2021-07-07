// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';
import * as _ from 'lodash';

// simple line chart
const LineChart = ( props ) => {

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

    const apexLineChartWithLables = {
        chart: {
            height: 380,
            type: 'line',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3', '#ffbe0b'],
        tooltip: {
            theme: 'dark',
            x: { show: false }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            width: [3, 3],
            curve: 'smooth',
        },
        title: {
            text: 'Últimas encuestas',
            align: 'left',

            style: {
                fontSize: '14px',
            },
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2,
            },
            borderColor: '#f1f3fa',
        },
        markers: {
            style: 'inverted',
            size: 6,
        },
        xaxis: {
            categories: categories, //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
                text: 'Últimas encuestas aplicadas',
            },
        },
        yaxis: {
            title: {
                text: 'Puntos de la evaluación',
            },
            min: 5,
            max: _.max( values ) + 10,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    chart: {
                        toolbar: {
                            show: false,
                        },
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
    };

    const apexLineChartWithLablesData = data;/*[
        {
            name: 'High - 2018',
            data: [28, 29, 33, 36, 32, 32, 33],
        },
        {
            name: 'Low - 2018',
            data: [12, 11, 14, 18, 17, 13, 13],
        },
    ];*/

    return (
        <Card className="gray-brd">
            <CardBody>
                <h4 className="header-title mt-0 mb-3">Gráfica de resultados de evaluaciones</h4>
                <Chart
                    options={apexLineChartWithLables}
                    series={apexLineChartWithLablesData}
                    type="line"
                    className="apex-charts"
                />
            </CardBody>
        </Card>
    );
};

export default LineChart;
