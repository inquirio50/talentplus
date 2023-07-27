/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Theme } from '@mui/system';
import clsx from 'clsx';
import globalStyles from '../../config/globalCss';
import StyledBtnComponent from '../common/StyledBtnComponent';
import {
    fetchCandidatetInfo,
    getStatisticsMatch,
    getUserJobsMatch,
} from '../../store/reducers/candidate/candidateActions';
import ProfileIncomplete from '../common/dashboard/ProfileIncomplete';
import DashboardQuestionnaire from '../common/dashboard/DashboardQuestionnaire';
import CardAcceptedDeclined from '../common/dashboard/CardAcceptedDeclined';
import CardNumbers from '../common/dashboard/CardNumbers';
import { RootState } from '../../store/store';
import User from '../../models/user';
import { getPercentageProfile } from '../../store/reducers/genericActions';
import { Profile } from '../../models/profile';
import { getPercentageTotal } from '../helpers/utilityFunctions';
import { StatisticsMatch } from '../../config/interfaces';

const useStyles: any = makeStyles((theme: Theme) => ({
    container: {
        padding: '40px 87px 84px 87px',
        backgroundColor: theme.palette.common.white,
        [theme.breakpoints.down('lg')]: {
            padding: '3rem',
        },
        [theme.breakpoints.down('md')]: {
            padding: '2rem',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '1rem',
        },
    },
    content: {
        maxWidth: 1010,
    },
    grid: {
        paddingTop: 40,
    },
    gridBox: {
        maxWidth: '258.5px !important',
        [theme.breakpoints.down('lg')]: {
            maxWidth: 'unset !important',
            width: '100%',
        },
    },
    gridBoxMatch: {
        maxWidth: 326,
        width: 326,
    },
    gridBoxMatchOther: {
        maxWidth: 342,
    },
    gridPendingMatch: {
        maxWidth: 571,
        minHeight: 421,
        width: 571,
    },
    gridPendingMatchInternal: {
        height: 361,
    },
    gridGetIncorporeted: {},
    gridBoxLeft: {
        [theme.breakpoints.down('lg')]: {
            maxWidth: 'unset !important',
        },
    },
    paddingPendingMatch: {
        padding: 30,
    },
    box: {
        background: theme.palette.common.white,
        boxShadow: '-5px -5px 8px rgba(0, 0, 0, 0.04), 4px 5px 8px rgba(0, 0, 0, 0.08)',
        borderRadius: 20,
    },
    boxMatchCount: {
        height: '100%',
    },
    matchNumber: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 10,
        color: theme.palette.common.black,
    },
    titlePendingMatchBox: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 18,
        lineHeight: '18px',
        color: theme.palette.common.black,
        textAlign: 'justify',
    },
    gridBars: {
        paddingTop: '16px',
    },
    gridBarSpace: {
        paddingLeft: '16px',
    },
    gridSpaceHelp: {},
    pendingMatchTitle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: '15px',
        color: theme.palette.common.black,
    },
    descIncorporated: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 14,
        lineHeight: '21px',
        color: theme.palette.common.black,
    },
    boxSizeHelp: {},
    gridIncorporatedIncompleted: {},
    gridNeedHelpIncompleted: {},
    gridQuebec: {
        maxWidth: '100px',
    },
    gridMatchInterviewBox: {
        paddingLeft: 16,
    },
    headingContainer: {
        maxWidth: 1010,
        margin: '0 auto',
        width: '100%',
    },
}));

const CandidateDashboard = () => {
    const { t } = useTranslation();
    const css = useStyles();
    const classes = globalStyles();
    const dispatch = useDispatch();
    const [fillingQuestion, setFillingQuestion] = useState(false);
    const { user, profile, statisticsMatch }: { user: User; profile: Profile; statisticsMatch: StatisticsMatch } =
        useSelector((state: RootState) => ({
            user: state.authentication.user,
            profile: state.generic.profile,
            statisticsMatch: state.candidate.statisticsMatch,
        }));

    const updateMatch = () => {
        if (user?.id) {
            dispatch(getUserJobsMatch());
            dispatch(getStatisticsMatch(user.id));
        }
    };

    const checkCandidateInfo = () => {
        dispatch(fetchCandidatetInfo());
        dispatch(getPercentageProfile());
    };

    useEffect(() => {
        checkCandidateInfo();
    }, [dispatch]);

    useEffect(() => {
        updateMatch();
    }, [user]);

    // const handleUrlMeeting = () => (event: React.SyntheticEvent) => {
    //     event.preventDefault();
    //     window.location.href = 'https://calendly.com/reelcruitralph';
    // };

    const handleLetsGo = () => {
        setFillingQuestion(!fillingQuestion);
    };

    if (!profile || !profile.percentage) {
        return <CircularProgress size={25} />;
    }

    const isProfileComplete = getPercentageTotal(profile, user) === 100;

    return (
        <Grid container component="main" className={css.container}>
            <Grid item xs={12} className={css.headingContainer}>
                <Typography className={classes.titleDashboard}>{t('home')}</Typography>
            </Grid>
            {!isProfileComplete && <ProfileIncomplete handleLetsGo={handleLetsGo} fillingQuestion={fillingQuestion} />}
            {fillingQuestion && (
                <DashboardQuestionnaire handleLetsGo={handleLetsGo} checkCandidateInfo={checkCandidateInfo} />
            )}
            {!fillingQuestion && (
                <Grid item xs={12} className={css.grid}>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={12} className={css.content}>
                            <Grid container justifyContent="center" spacing={5}>
                                <Grid item lg={3} md={3} sm={6} xs={12} className={css.gridBox}>
                                    <CardNumbers value={581} description={t('matches')} />
                                </Grid>
                                <Grid item lg={3} md={3} sm={6} xs={12} className={clsx(css.gridBox, css.gridBoxLeft)}>
                                    <CardNumbers value={20} description={t('interviewRequest')} />
                                </Grid>
                                <Grid item lg={3} md={3} sm={6} xs={12} className={clsx(css.gridBox, css.gridBoxLeft)}>
                                    <CardNumbers value={5} description={t('offer')} />
                                </Grid>
                                <Grid item lg={3} md={3} sm={6} xs={12} className={clsx(css.gridBox, css.gridBoxLeft)}>
                                    <CardNumbers value={16} description={t('documents')} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
            {!fillingQuestion && isProfileComplete && (
                <Grid item xs={12} className={css.grid}>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={12} className={clsx(css.content)}>
                            <Grid container>
                                <Grid item xs={12} md={4} className={css.gridBoxMatch}>
                                    <CardAcceptedDeclined
                                        accepted={statisticsMatch?.accepted || 0}
                                        declined={statisticsMatch?.declined || 0}
                                        pending={statisticsMatch?.pending || 0}
                                        title={t('matches')}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    className={clsx(css.gridBoxMatchOther, css.gridMatchInterviewBox)}>
                                    <CardAcceptedDeclined
                                        accepted={40}
                                        declined={50}
                                        pending={80}
                                        title={t('interviews')}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    className={clsx(css.gridBoxMatchOther, css.gridMatchInterviewBox)}>
                                    <CardAcceptedDeclined accepted={1} declined={10} pending={5} title={t('offers')} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
            {!fillingQuestion && (
                <Grid item xs={12} className={css.grid}>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        {isProfileComplete && (
                            <Grid item xs={6} className={css.gridPendingMatch}>
                                <Grid
                                    container
                                    className={clsx(
                                        css.box,
                                        css.boxMatchCount,
                                        css.paddingPendingMatch,
                                        css.gridPendingMatch
                                    )}>
                                    <Grid item xs={12} className={css.gridPendingMatchInternal}>
                                        <Grid container sx={{ paddingBottom: '24px' }}>
                                            <Grid item xs={6}>
                                                <Typography className={css.titlePendingMatchBox}>
                                                    {t('pendingMatches')}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} justifyContent="flex-end" margin="auto" textAlign="end">
                                                <StyledBtnComponent
                                                    title={t('viewAll')}
                                                    handleOnClick={() => {}}
                                                    classesName={classes.btnLinks}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ color: '#E8E8E8' }} />
                                        <Grid container sx={{ paddingTop: '24px' }}>
                                            <Grid item xs={12} sx={{ paddingBottom: '24px' }}>
                                                <Grid container>
                                                    <Grid item xs={8}>
                                                        <Grid container>
                                                            <Grid item xs={12}>
                                                                <Typography className={css.pendingMatchTitle}>{`${t(
                                                                    'matchAs'
                                                                )} ${t('productDesigner')}`}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography className={css.matchNumber}>{`${t(
                                                                    'matchOn'
                                                                )} 12th Nov, 2022.`}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={4}
                                                        justifyContent="flex-end"
                                                        margin="auto"
                                                        textAlign="end">
                                                        <StyledBtnComponent
                                                            title={t('potencialMatch')}
                                                            handleOnClick={() => {}}
                                                            classesName={classes.btnContainedRose}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sx={{ paddingBottom: '24px' }}>
                                                <Grid container>
                                                    <Grid item xs={8}>
                                                        <Grid container>
                                                            <Grid item xs={12}>
                                                                <Typography className={css.pendingMatchTitle}>{`${t(
                                                                    'matchAs'
                                                                )} ${t('productDesigner')}`}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography className={css.matchNumber}>{`${t(
                                                                    'matchOn'
                                                                )} 12th Nov, 2022.`}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={4}
                                                        justifyContent="flex-end"
                                                        margin="auto"
                                                        textAlign="end">
                                                        <StyledBtnComponent
                                                            title={t('topMatch')}
                                                            handleOnClick={() => {}}
                                                            classesName={classes.btnContainedRose}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                        <Grid
                            item
                            xs={isProfileComplete ? 6 : 12}
                            className={clsx(
                                css.content,
                                isProfileComplete ? css.gridGetIncorporeted : '',
                                isProfileComplete ? css.gridBarSpace : ''
                            )}>
                            <Grid container spacing={5} direction="row" justifyContent="center" alignItems="stretch">
                                <Grid
                                    item
                                    lg={isProfileComplete ? 12 : 7}
                                    md={isProfileComplete ? 12 : 7}
                                    sm={isProfileComplete ? 12 : 12}
                                    xs={isProfileComplete ? 12 : 12}
                                    className={clsx(
                                        isProfileComplete ? css.gridGetIncorporeted : css.gridIncorporatedIncompleted
                                    )}>
                                    <Grid
                                        container
                                        className={clsx(css.box, css.boxMatchCount, css.paddingPendingMatch)}>
                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography className={css.titlePendingMatchBox}>
                                                        {t('getIncorporated')}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} className={css.gridBars} sx={{ paddingBottom: '24px' }}>
                                            <Typography className={css.descIncorporated}>
                                                {t('becomeProfessionalItTxt')}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container direction="row" justifyContent="flex-start">
                                                <Grid item xs={4} className={css.gridQuebec}>
                                                    <StyledBtnComponent
                                                        title="Quebec"
                                                        handleOnClick={() => {
                                                            window.location.href =
                                                                'https://www.ownr.co/affiliates?gspk=cmFscGhmcmFuY29pczk3NTY&gsxid=71STi616NdSv&pscd=partners.ownr.co&utm_campaign=PS-AFFILIATES1_15&utm_source=affiliates';
                                                        }}
                                                        red={false}
                                                        btWidth="100%"
                                                    />
                                                </Grid>
                                                <Grid item xs={4} className={css.gridBarSpace}>
                                                    <StyledBtnComponent
                                                        title="Ontario"
                                                        handleOnClick={() => {
                                                            window.location.href =
                                                                'https://www.ownr.co/affiliates?gspk=cmFscGhmcmFuY29pczk3NTY&gsxid=71STi616NdSv&pscd=partners.ownr.co&utm_campaign=PS-AFFILIATES1_15&utm_source=affiliates';
                                                        }}
                                                        red={false}
                                                        btWidth="97px"
                                                    />
                                                </Grid>
                                                <Grid item xs={4} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    lg={isProfileComplete ? 12 : 5}
                                    md={isProfileComplete ? 12 : 5}
                                    sm={isProfileComplete ? 12 : 12}
                                    xs={isProfileComplete ? 12 : 12}
                                    className={clsx(
                                        isProfileComplete ? css.gridGetIncorporeted : css.gridNeedHelpIncompleted,
                                        !isProfileComplete ? css.gridSpaceHelp : '',
                                        isProfileComplete ? css.boxSizeHelp : ''
                                    )}>
                                    <Grid
                                        container
                                        className={clsx(css.box, css.boxMatchCount, css.paddingPendingMatch)}>
                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography className={css.titlePendingMatchBox}>
                                                        {t('needHelp')}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} className={css.gridBars} sx={{ paddingBottom: '24px' }}>
                                            <Typography className={css.descIncorporated}>
                                                {t('bookMeetingWithRecruiter')}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <StyledBtnComponent
                                                title={t('bookingMeetingBtn')}
                                                handleOnClick={() => {
                                                    window.location.href = 'https://calendly.com/reelcruitralph';
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default CandidateDashboard;
