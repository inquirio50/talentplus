import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const InterviewChart = () => {
    const { t } = useTranslation();

    const barChartData = {
        labels: [t('Completed'), t('Pending'), t('Cancelled')],
        datasets: [
            {
                barPercentage: 0.7,
                categoryPercentage: 0.5,
                label: 'This week',
                backgroundColor: '#ec008b',
                borderColor: '#ec008b',
                data: [0, 0, 0, 0],
            },
        ],
    };

    const barChartOpts: any = {
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        tooltips: {
            intersect: false,
        },
        hover: {
            intersect: true,
        },
        plugins: {
            filler: {
                propagate: false,
            },
        },
        scales: {
            xAxes: [
                {
                    reverse: true,
                    gridLines: {
                        color: 'rgba(0,0,0,0.05)',
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        stepSize: 1,
                        display: true,
                    },
                    min: 10,
                    max: 100,
                    display: true,
                    borderDash: [5, 5],
                    gridLines: {
                        color: 'rgba(0,0,0,0)',
                        fontColor: '#fff',
                    },
                },
            ],
        },
    };

    return (
        <Card className="streched_card">
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                        <i className="mdi mdi-dots-vertical" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>{t('Weekly Report')}</Dropdown.Item>
                        <Dropdown.Item>{t('Monthly Report')}</Dropdown.Item>
                        <Dropdown.Item>{t('Yearly Report')}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="header-title mb-4">{t('Interviews')}</h4>

                <div dir="ltr">
                    <div style={{ height: '320px' }} className="mt-3 chartjs-chart">
                        <Bar data={barChartData} options={barChartOpts} />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default InterviewChart;
