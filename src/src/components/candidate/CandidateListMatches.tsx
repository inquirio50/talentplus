import React from 'react';
import { Avatar, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import UserMatch from '../../models/userMatch';
import { MATCH_STATUS_ACTIVE, PERMANENT_ROLE } from '../../config/constants';
import { Skills } from '../../models/skills';
import { getExperienceDisplay, getTypeOfWorkDisplay } from '../helpers/utilityFunctions';
import PercentageDoughnut from '../common/PercentageDoughnut';
import StyledBtnComponent from '../common/StyledBtnComponent';
import globalStyles from '../../config/globalCss';
import { UserCircle } from '../icons/Icons';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        paddingTop: 24,
        backgroundColor: theme.palette.common.white,
        marginBottom: '24px',
        width: '100%',
    },
    maxContent: {
        width: '100%',
        maxWidth: 1200,
    },

    gridChart: {
        margin: 'auto',
        overflow: 'initial',
    },
    companyName: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 15,
        lineHeight: '18.15px',
        color: theme.palette.common.black,
    },
    activeMatchtedAs: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 12,
        lineHeight: '14.52px',
        color: theme.palette.common.black,
    },
    scrollable: {
        width: '100%',
        // minWidth: '1000px',
        overflowX: 'auto',
    },
}));

const CandidateListMatches = ({
    type,
    userMatch,
    handleView,
}: {
    type: string;
    userMatch: UserMatch;
    handleView: any;
}) => {
    const { t } = useTranslation();
    const css = styles();
    const classes = globalStyles();
    const isActive = type === MATCH_STATUS_ACTIVE;

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    return (
        <Grid container className={css.container}>
            <Grid
                item
                xs={12}
                sx={{
                    overflowX: 'auto',
                }}>
                <div className={css.scrollable}>
                    <Grid container className={css.maxContent} spacing={isMobile ? 3 : 0}>
                        {isActive && (
                            <Grid item lg={1} md={1} sm={12} xs={12}>
                                <Avatar
                                    sx={{
                                        height: 50,
                                        width: 50,
                                    }}
                                    src={undefined}>
                                    <UserCircle fontSize="small" />
                                </Avatar>
                            </Grid>
                        )}
                        <Grid item lg={isActive ? 3.5 : 4.5} md={isActive ? 3.5 : 4.5} sm={12} xs={12}>
                            <Grid container>
                                <Grid item xs={12} display="flex" alignItems="start">
                                    {isActive && (
                                        <Typography className={css.companyName}>
                                            {userMatch.owner?.company?.name}
                                        </Typography>
                                    )}
                                    {!isActive && (
                                        <>
                                            <Typography
                                                component="span"
                                                className={clsx(classes.baseText, classes.textTitle)}>{`${t(
                                                'matchedAs'
                                            )}: `}</Typography>
                                            <Typography
                                                component="span"
                                                className={clsx(classes.baseText, classes.textDesc)}
                                                sx={{ flex: 1, ml: 0.5 }}>
                                                {userMatch.job.title}
                                            </Typography>
                                        </>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    {isActive && (
                                        <Typography className={css.activeMatchtedAs}>{userMatch.job.title}</Typography>
                                    )}
                                    {!isActive && (
                                        <>
                                            <Typography
                                                component="span"
                                                className={clsx(classes.baseText, classes.textTitle)}>{`${t(
                                                'typeOfWork'
                                            )}: `}</Typography>
                                            <Typography
                                                component="span"
                                                className={clsx(classes.baseText, classes.textDesc)}
                                                sx={{ flex: 1, ml: 0.5 }}>
                                                {getTypeOfWorkDisplay(userMatch.job.typeOfWork, t)}
                                            </Typography>
                                        </>
                                    )}
                                </Grid>
                                {!isActive && (
                                    <Grid item xs={12}>
                                        <Typography
                                            component="span"
                                            className={clsx(classes.baseText, classes.textTitle)}>{`${t(
                                            'ratePerHour'
                                        )}: `}</Typography>
                                        <Typography
                                            component="span"
                                            className={clsx(classes.baseText, classes.textDesc)}
                                            sx={{ flex: 1, ml: 0.5 }}>
                                            {userMatch.profile.role === PERMANENT_ROLE
                                                ? `$${userMatch.job.maxSalaryRange}k - $${userMatch.job.minSalaryRange}k`
                                                : `$${userMatch.job.startingRatePerHour}/h - $${userMatch.job.endingRatePerHour}/h`}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item lg={4.5} md={4.5} sm={12} xs={12} className={css.gridMiddle}>
                            <Grid container>
                                <Grid item xs={12} display="flex" alignItems="start">
                                    <Typography
                                        component="span"
                                        className={clsx(classes.baseText, classes.textTitle)}>{`${t(
                                        'mainSkills'
                                    )}: `}</Typography>
                                    <Typography
                                        component="span"
                                        className={clsx(classes.baseText, classes.textDesc)}
                                        sx={{ flex: 1, ml: 0.5 }}>
                                        {userMatch.job.skills.map((skill: Skills) => `${skill.skill} `)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} display="flex" alignItems="start">
                                    <Typography
                                        component="span"
                                        className={clsx(classes.baseText, classes.textTitle)}>{`${t(
                                        'typeOfIndustry'
                                    )}: `}</Typography>
                                    <Typography
                                        component="span"
                                        className={clsx(classes.baseText, classes.textDesc)}
                                        sx={{ flex: 1, ml: 0.5 }}>
                                        {userMatch.owner?.industry}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} display="flex" alignItems="start">
                                    <Typography
                                        component="span"
                                        className={clsx(classes.baseText, classes.textTitle)}>{`${t(
                                        'experience'
                                    )}: `}</Typography>
                                    <Typography
                                        component="span"
                                        className={clsx(classes.baseText, classes.textDesc)}
                                        sx={{ flex: 1, ml: 0.5 }}>
                                        {getExperienceDisplay(userMatch.job.experience, t)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={2} md={2} sm={12} xs={12} justifyContent="flex-end">
                            <Grid container>
                                <Grid item xs={12} className={css.gridChart} sx={{ width: 40, height: 40 }}>
                                    <PercentageDoughnut
                                        percentage={50}
                                        total={100 - 50}
                                        txtColor="rgba(0, 0, 0, 0.6);"
                                        width="100px"
                                        height="auto"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={1} md={1} sm={12} xs={12} justifyContent="flex-end">
                            <StyledBtnComponent
                                title={t('view')}
                                handleOnClick={handleView(userMatch)}
                                classesName={classes.btnLinks}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ color: '#EFE7EC', marginTop: '24px', marginBottom: '24px', maxWidth: '1010px' }} />
                </div>
            </Grid>
        </Grid>
    );
};

export default CandidateListMatches;
