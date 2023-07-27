import React from 'react';
import 'chartjs-plugin-doughnutlabel';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const PercentageDoughnut = ({
    total,
    percentage,
    txtColor,
    width,
    height,
}: {
    total: number;
    percentage: number;
    txtColor?: string;
    width?: string;
    height?: string;
}) => {
    const data = [percentage, total];
    const labels = ['Profile', ''];
    const dataPercentage = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: ['#EB078C', 'transparent'],
                hoverBackgroundColor: ['#EB078C', 'transparent'],
            },
        ],
        plugins: {
            labels: {
                render: 'percentage',
                fontColor: ['black', 'red'],
                precision: 2,
            },
        },
    };
    const optionsMatchPie = {
        responsive: true,
        maintainAspectRatio: true,
        cutoutPercentage: 75,
        legend: {
            display: false,
        },
        plugins: {
            mainAspectRatio: false,
            doughnutlabel: {
                labels: [
                    {
                        text: `${percentage}%`,
                        font: {
                            size: '20',
                            family: 'Inter',
                            weight: 400,
                        },
                        color: `${txtColor || 'rgba(255, 255, 255, 0.6)'}`,
                    },
                ],
            },
            ChartDataLabels,
            datalabels: {
                display: false,
                color: 'black',
                borderColor: '#000',
                font: {
                    size: 14,
                },
            },
        },
    };

    return (
        <div style={{ width: width || 'unset', height: height || 'unset' }}>
            <Doughnut data={dataPercentage} options={optionsMatchPie} />
        </div>
    );
};

PercentageDoughnut.defaultProps = {
    txtColor: null,
    width: null,
    height: null,
};

export default PercentageDoughnut;
