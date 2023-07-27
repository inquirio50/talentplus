import React from 'react';
import Chart from 'react-apexcharts';
import { Card, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import UserMatch from '../../../models/userMatch';

interface MatchProps {
    matches: UserMatch[];
}

const ConsultantsChart = ({ matches }: MatchProps) => {
    const { t } = useTranslation();

    const apexDonutOpts: any = {
        chart: {
            height: 340,
            type: 'donut',
        },
        colors: ['#ec008b', '#808080', '#00FF00'],
        legend: {
            show: false,
        },
        responsive: [
            {
                breakpoint: 376,
                options: {
                    chart: {
                        width: 250,
                        height: 250,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };

    const apexDonutData: any = [0, 0, matches];

    return (
        <Card className="streched_card">
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                        <i className="mdi mdi-dots-vertical" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>{t('This week')}</Dropdown.Item>
                        <Dropdown.Item>{t('This month')}</Dropdown.Item>
                        <Dropdown.Item>{t('This year')}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="header-title">{t('Consultants')}</h4>

                <Chart
                    options={apexDonutOpts}
                    series={apexDonutData}
                    type="donut"
                    height={236}
                    className="apex-charts mb-4 mt-4"
                />

                <div className="chart-widget-list">
                    <p>
                        <i className="mdi mdi-square text-hired" /> {t('Hired')}
                        <span className="float-end">0</span>
                    </p>
                    <p>
                        <i className="mdi mdi-square text-rejected" /> {t('Rejected')}
                        <span className="float-end">0</span>
                    </p>
                    <p>
                        <i className="mdi mdi-square text-match" /> {t('Matches Received')}
                        <span className="float-end">{matches}</span>
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ConsultantsChart;
