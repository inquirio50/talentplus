import React from 'react';
import { Box, Button, Grid, Typography, useMediaQuery, Tooltip as MaterialTooltip } from '@mui/material';
import { Theme } from '@mui/system';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import UserMatch from '../../../models/userMatch';
import {
    calculateMatch,
    getExperienceDisplay,
    getHourFromStringToDisplay,
    getSkillsDisplay,
    getTypeOfWorkDisplay,
} from '../../helpers/utilityFunctions';
import { JOB_HYBRID } from '../../../config/constants';
import StyledBtnComponent from '../../common/StyledBtnComponent';

/**
 * @deprecated
 * @param param0
 * @returns
 */
const JobMatchContent = ({
    userMatch,
    customClasses,
    classes,
    handleOpenPopOver,
    t,
    // handleDecisionMatch,
    isDashBoard,
    isLoading,
    handleViewMatch,
}: {
    userMatch: UserMatch;
    customClasses: any;
    classes: any;
    handleOpenPopOver: any;
    t: any;
    // handleDecisionMatch: any;
    isDashBoard?: boolean;
    isLoading: boolean;
    handleViewMatch?: any;
}) => {
    const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    const getMatchPercentage = () => {
        const matchPercentage = calculateMatch(
            userMatch.enterprisePoints,
            userMatch.experiencePoints,
            userMatch.locationPoints,
            userMatch.salaryPoints,
            userMatch.skillPoints,
            userMatch.score
        );
        return matchPercentage;
    };
    const total: number = 100 - getMatchPercentage();

    const data = [total, getMatchPercentage()];
    const labels = ['', 'Match'];
    const matchData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: ['#d1dbdd', '#16cbf2'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
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
        cutoutPercentage: 75,
        legend: {
            display: false,
        },
        plugins: {
            mainAspectRatio: false,
            doughnutlabel: {
                labels: [
                    {
                        text: `${getMatchPercentage()}%`,
                        font: {
                            size: '40',
                        },
                        color: 'grey',
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
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
            }}>
            <Grid container>
                {!isDashBoard && (
                    <Grid item xs={1} style={{ maxWidth: '5%' }} margin="auto">
                        <Grid container justifyContent="center" minHeight="20vh" alignItems="center">
                            <Grid item xs={12}>
                                <WorkOutlineOutlinedIcon sx={{ fontSize: 48 }} />
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                <Grid
                    item
                    xs={2}
                    className={clsx(customClasses.gridChart, isDashBoard ? customClasses.gridChartDashboard : '')}>
                    <Doughnut data={matchData} options={optionsMatchPie} />
                </Grid>
                <Grid item xs={!isDashBoard ? 9 : 10}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Button
                                variant="text"
                                className={customClasses.titleJob}
                                onClick={isDashBoard ? handleOpenPopOver(userMatch.job) : handleViewMatch(userMatch)}>
                                {userMatch.job.title}
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={isDashBoard ? 8 : 7} lg={isDashBoard ? 8 : 7}>
                            {isDashBoard && (
                                <Typography
                                    color="textSecondary"
                                    variant="caption"
                                    sx={{ paddingLeft: '8px !important' }}>
                                    {userMatch.job.typeOfWork.includes(JOB_HYBRID)
                                        ? t('remotePossible')
                                        : `${userMatch.job.address?.country}, ${userMatch.job.address?.city}`}{' '}
                                    <Typography color="inherit" noWrap variant="caption">
                                        • {userMatch.job.startingRatePerHour}k - {userMatch.job.endingRatePerHour}k
                                    </Typography>
                                    {userMatch.job.skills.length > 0 && (
                                        <MaterialTooltip
                                            title={userMatch.job.skills.map((skill) => skill.skill).join(',')}>
                                            <Typography color="inherit" noWrap variant="caption">
                                                {` • ${userMatch.job.skills
                                                    .map((skill, indSkill) =>
                                                        indSkill < 3 ? t(getSkillsDisplay(skill, t)) : ''
                                                    )
                                                    .join(',')}`}
                                            </Typography>
                                        </MaterialTooltip>
                                    )}
                                </Typography>
                            )}
                            {!isDashBoard && (
                                <Grid container>
                                    <Grid item xs={12} className={customClasses.grid}>
                                        <Typography className={customClasses.category}>{t('competences')}:</Typography>
                                    </Grid>
                                    <Grid item xs={8} md={5} lg={5} className={customClasses.grid}>
                                        <Typography className={customClasses.subTitle}>{t('experience')}:</Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={4}
                                        md={7}
                                        lg={7}
                                        className={clsx(customClasses.grid, customClasses.gridValue)}>
                                        <Typography className={customClasses.description}>
                                            {t(getExperienceDisplay(userMatch.job.experience, t))}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={5} lg={5} sx={{ minWidth: '93px' }}>
                                        <Typography className={customClasses.subTitle}>{t('ratePerHour')}:</Typography>
                                    </Grid>
                                    <Grid item xs={4} md={7} lg={7}>
                                        <Typography className={customClasses.description}>
                                            {`${userMatch.job.startingRatePerHour}k - ${userMatch.job.endingRatePerHour}k`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={5} lg={5} sx={{ minWidth: '93px' }}>
                                        <Typography className={customClasses.subTitle}>
                                            {t('selectedTypeWork')}:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={7} lg={7}>
                                        <Typography className={customClasses.description}>
                                            {t(getTypeOfWorkDisplay(userMatch.job.typeOfWork, t))}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={5} lg={5} sx={{ minWidth: '112px' }}>
                                        <Typography className={customClasses.subTitle}>
                                            {t('employmentType')}:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={7} lg={7}>
                                        <Typography className={customClasses.description}>
                                            {t(userMatch.job.role)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                        {!isMdDown && (
                            <Grid item xs={isDashBoard ? 2 : 3} margin="auto">
                                <Typography color="textSecondary" sx={{ mr: 2 }} variant="caption">
                                    {getHourFromStringToDisplay(userMatch.job.createdAt)}
                                </Typography>
                            </Grid>
                        )}
                        <Grid
                            item
                            xs={12}
                            md={2}
                            lg={2}
                            margin="auto"
                            textAlign="end"
                            maxWidth={isDashBoard ? '70px' : '100%'}>
                            <StyledBtnComponent
                                handleOnClick={handleViewMatch(userMatch)}
                                title={t('view')}
                                classesName={classes.baseBtnDashboard}
                                loading={isLoading}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                {/* }
                <Grid
                    item
                    xs={isDashBoard ? 10 : 9}
                    md={isDashBoard ? 6 : 5}
                    lg={isDashBoard ? 7 : 6}
                    sx={{ marginLeft: '-25px' }}>
                    <Grid item xs={12} />
                    <Grid item xs={12}>
                        {!isDashBoard && (
                            <Grid container sx={{ paddingLeft: '8px !important' }}>
                                <Grid item xs={12} className={customClasses.grid}>
                                    <Typography className={customClasses.category}>{t('competences')}:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={11}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Grid container>
                                                        <Grid item xs={4} className={customClasses.grid}>
                                                            <Typography className={customClasses.subTitle}>
                                                                {t('experience')}:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={8}
                                                            className={clsx(
                                                                customClasses.grid,
                                                                customClasses.gridValue
                                                            )}>
                                                            <Typography className={customClasses.description}>
                                                                {t(getExperienceDisplay(userMatch.job.experience))}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Typography className={customClasses.subTitle}>
                                                                {t('ratePerHour')}:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <Typography className={customClasses.description}>
                                                                {`${userMatch.job.startingRatePerHour}k - ${userMatch.job.endingRatePerHour}k`}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={4} className={customClasses.grid}>
                                                            <Typography className={customClasses.subTitle}>
                                                                {t('selectedTypeWork')}:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={8} className={customClasses.grid}>
                                                            <Typography className={customClasses.description}>
                                                                {t(getTypeOfWorkDisplay(userMatch.job.typeOfWork))}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Typography className={customClasses.subTitle}>
                                                                {t('employmentType')}:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <Typography className={customClasses.description}>
                                                                {t(userMatch.job.role)}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={1} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                        {isDashBoard && (
                            <Typography color="textSecondary" variant="caption" sx={{ paddingLeft: '8px !important' }}>
                                {userMatch.job.typeOfWork.includes(JOB_HYBRID)
                                    ? t('remotePossible')
                                    : `${userMatch.job.address?.country}, ${userMatch.job.address?.city}`}{' '}
                                <Typography color="inherit" noWrap variant="caption">
                                    • {userMatch.job.startingRatePerHour}k - {userMatch.job.endingRatePerHour}k
                                </Typography>
                                {userMatch.job.skills.length > 0 && (
                                    <MaterialTooltip title={userMatch.job.skills.map((skill) => skill.skill).join(',')}>
                                        <Typography color="inherit" noWrap variant="caption">
                                            {` • ${userMatch.job.skills
                                                .map((skill, indSkill) =>
                                                    indSkill < 3 ? t(getSkillsDisplay(skill)) : ''
                                                )
                                                .join(',')}`}
                                        </Typography>
                                    </MaterialTooltip>
                                )}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3} lg={3} margin="auto">
                    <Grid container justifyContent="center" alignItems="center">
                        {!isMdDown && (
                            <Grid item xs={12} md={4} lg={5} sx={{ paddingLeft: isLgDown ? '8px !important' : 'none' }}>
                                <Typography color="textSecondary" sx={{ mr: 2 }} variant="caption">
                                    {getHourFromStringToDisplay(userMatch.job.createdAt)}
                                </Typography>
                            </Grid>
                        )}
                        <Grid item xs={12} md={8} lg={7} margin="auto" alignContent="center">
                            <Grid container spacing={1} justifyContent="flex-end" margin="auto">
                                {/* <Grid item xs={isDashBoard ? 8 : 4} textAlign="right" paddingRight={1} margin="auto">
                                    <StyledBtnComponent
                                        handleOnClick={handleDecisionMatch(true, userMatch)}
                                        title={t('accept')}
                                        classesName={classes.baseBtnDashboard}
                                        loading={isLoading}
                                    />
                                </Grid>
                                <Grid item xs={4} textAlign="end" margin="auto">
                                    <StyledBtnComponent
                                        handleOnClick={handleDecisionMatch(false, userMatch)}
                                        title={t('decline')}
                                        classesName={classes.baseBtnDashboard}
                                        loading={isLoading}
                                    />
                                            </Grid>
                                <Grid item>
                                    <StyledBtnComponent
                                        handleOnClick={handleViewMatch(userMatch)}
                                        title={t('view')}
                                        classesName={classes.baseBtnDashboard}
                                        loading={isLoading}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                        */}
            </Grid>
        </Box>
    );
};

JobMatchContent.defaultProps = {
    isDashBoard: false,
    handleViewMatch: null,
};

export default JobMatchContent;
