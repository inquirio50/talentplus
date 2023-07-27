/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

const ProfileMatchChart = (match: any) => {
    const { t } = useTranslation();

    const apexOpts: any = {
        grid: {
            padding: {
                left: 0,
                right: 0,
            },
        },
        chart: {
            height: 343,
            type: 'radar',
            parentHeightOffset: 0,
            toolbar: {
                show: false,
            },
        },
        labels: [
            t('Match Selection 1'),
            t('Match Selection 2'),
            t('Match Selection 3'),
            t('Match Selection 4'),
            t('Match Selection 5'),
            'Match Selection AI',
        ],
        plotOptions: {
            radar: {
                size: 130,
                polygons: {
                    strokeColor: '#e9e9e9',
                    fill: {
                        colors: ['#f8f8f8', '#fff'],
                    },
                },
            },
        },
        colors: ['#727cf5'],
        yaxis: {
            labels: {
                formatter(val: any) {
                    return `${val}%`;
                },
            },
        },
        dataLabels: {
            enabled: true,
        },
        markers: {
            size: 4,
            colors: ['#fff'],
            strokeColor: ['#727cf5'],
            strokeWidth: 2,
        },
    };

    const matchPoints = match.match;
    const expereincePercentage = matchPoints.experiencePoints; // Math.round((match.match.experiencePoints / 15) * 100).toFixed(2);
    const { enterprisePoints } = matchPoints; // Math.round((match.match.enterprisePoints / 15) * 100).toFixed(2);
    const skillPercentage = matchPoints.skillPoints; // Math.round((matchPoints.skillPoints / 45) * 100).toFixed(2);
    const locationPercentage = matchPoints.locationPoints;
    // matchPoints.locationPoints === 0 ? 0 : Math.round((matchPoints.locationPoints / 10) * 100).toFixed(2);
    const compatabilityPercentage =
        matchPoints.enterprisePoints +
        matchPoints.experiencePoints +
        matchPoints.locationPoints +
        matchPoints.salaryPoints +
        matchPoints.skillPoints;

    const apexData = [
        {
            name: t('Compatibility'),
            data: [
                expereincePercentage,
                enterprisePoints,
                skillPercentage,
                locationPercentage,
                compatabilityPercentage,
                matchPoints.score,
            ],
        },
    ];

    return <Chart options={apexOpts} series={apexData} type="radar" height={352} className="apex-charts mt-3" />;
};

export default ProfileMatchChart;
