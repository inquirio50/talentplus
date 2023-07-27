import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, Pagination, Tab, Tabs, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import clsx from 'clsx';
import UserMatch from '../../models/userMatch';
import { RootState } from '../../store/store';
import { acceptOrDeclineMatchAction, getUserJobsMatch } from '../../store/reducers/candidate/candidateActions';
import globalStyles from '../../config/globalCss';
import TabPanel from '../common/TabPanel';
import CandidateListMatches from './CandidateListMatches';
import {
    MATCH_STATUS_ACTIVE,
    MATCH_STATUS_ALL,
    MATCH_STATUS_ARCHIVED,
    MATCH_STATUS_PENDING,
    MATCH_STATUS_TOP,
} from '../../config/constants';
import DialogMsg from '../common/DialogMsg';
import CandidateMatchView from './CandidateMatchView';
import StyledBtnComponent from '../common/StyledBtnComponent';
import { AcceptOrDeclineMatch } from '../../config/interfaces';
import CandidateDeclineView from './CandidateDeclineView';
import NoMatch from '../../assets/images/dashboard/no-match.png';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        padding: '40px 87px 84px 87px',
        minHeight: '80vh',
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
        paddingTop: 33,
    },
    maxContent: {
        width: '100%',
        overflowX: 'auto',
        maxWidth: 1010,
    },
    tabMargin: {
        marginLeft: 24,
    },
    text: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '15px',
        color: 'rgba(0, 0, 0, 0.6)',
    },
    centralize: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5rem 0',
    },
    scrollable: {
        overflowX: 'auto',
    },
    noMatch: {
        width: '10rem',
        height: '10rem',
        marginBottom: '2rem',
    },
    noMatchImage: {
        width: '100%',
        height: '100%',
        objectContain: 'contain',
    },
    actionContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        justifySelf: 'start',
    },
}));

const NoMatchComponent = ({ css, t }: { css: any; t: any }) => (
    <Grid container>
        <Grid item xs={12} className={css.centralize} display="flex" flexDirection="column" alignItems="center">
            <figure className={css.noMatch}>
                <img src={NoMatch} alt="" className={css.noMatchImage} />
            </figure>
            <Typography className={css.text}>{t('noJobsAvailable')}</Typography>
        </Grid>
    </Grid>
);

const CandidateMatches = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const css = styles();
    const classes = globalStyles();
    const { loading, userMatches }: { loading: boolean; userMatches: UserMatch[] } = useSelector(
        (state: RootState) => ({
            loading: state.candidate.loading,
            userMatches: state.candidate.userMatches,
        })
    );

    const [paginatedMatches, setPaginatedMatches] = useState<UserMatch[]>([]);

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(10);
    const [limit] = useState(10);

    const [currentTab, setCurrentTab] = useState(0);
    const [openViewMatch, setOpenViewMatch] = useState(false);
    const [currMatch, setCurrMatch] = useState<UserMatch | undefined>();
    const [openDecline, setOpenDecline] = useState(false);

    useEffect(() => {
        const paginated = userMatches.splice((page - 1) * limit, limit);
        setPaginatedMatches(paginated);
        setPages(Math.ceil((userMatches || []).length / limit) + 1);
    }, [userMatches, page, limit]);

    const updateMatch = (tab: number) => {
        dispatch(getUserJobsMatch(tab));
    };

    const handleChange = (event: React.SyntheticEvent, newTab: number) => {
        event.preventDefault();
        setCurrentTab(newTab);
        setPage(1);
        updateMatch(newTab);
    };

    const handleViewMatch = (userMatch: UserMatch) => (event: React.SyntheticEvent) => {
        event.stopPropagation();
        setCurrMatch(userMatch);
        setOpenViewMatch(true);
    };

    const handleClose = () => {
        setCurrMatch(undefined);
        setOpenViewMatch(false);
    };

    const handleAccept = () => {
        if (currMatch) {
            const data: AcceptOrDeclineMatch = {
                matchId: currMatch.id,
                isAccepted: true,
            };
            dispatch(acceptOrDeclineMatchAction(data));
        }
    };

    const handleDecline = () => {
        setOpenDecline(true);
    };

    const ActionMatchComponent = (
        <div className={css.actionContainer}>
            <div>
                <StyledBtnComponent
                    title={t('decline')}
                    handleOnClick={handleDecline}
                    classesName={classes.btnOutlinedRed}
                />
            </div>

            {!currMatch?.isAccepted && (
                <div style={{ marginLeft: '2rem' }}>
                    <StyledBtnComponent
                        title={t('accept')}
                        handleOnClick={handleAccept}
                        classesName={classes.btnContainedGreen}
                    />
                </div>
            )}
        </div>
    );

    const handleConfirmDecline = () => {
        if (currMatch) {
            const data: AcceptOrDeclineMatch = {
                matchId: currMatch.id,
                isAccepted: false,
            };
            dispatch(acceptOrDeclineMatchAction(data));
        }
    };

    const handleCloseDecline = () => {
        setOpenDecline(false);
    };

    const ActionDeclineComponent = (
        <div className={css.actionContainer}>
            <div>
                <StyledBtnComponent
                    title={t('cancel')}
                    handleOnClick={handleCloseDecline}
                    classesName={classes.btnOutlinedRed}
                />
            </div>

            <div style={{ marginLeft: '2rem' }}>
                <StyledBtnComponent title={t('submit')} handleOnClick={handleConfirmDecline} red />
            </div>
        </div>
    );

    return (
        <Grid container component="main" className={css.container} alignContent="start">
            <Grid item xs={12}>
                <Typography className={classes.titleDashboard}>{t('matches')}</Typography>
            </Grid>
            <Grid item xs={12} className={css.content}>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                    <Grid item xs={12} className={css.maxContent}>
                        <Tabs
                            className={clsx(classes.tabs, css.scrollable)}
                            value={currentTab}
                            onChange={handleChange}
                            aria-label="match options"
                            variant="scrollable">
                            <Tab label={t('all')} id="tab-0" aria-controls="tabpanel-0" className={classes.tab} />
                            <Tab
                                label={t('top')}
                                id="tab-1"
                                aria-controls="tabpanel-0"
                                className={clsx(classes.tab, css.tabMargin)}
                            />
                            <Tab
                                label={t('pending')}
                                id="tab-2"
                                aria-controls="tabpanel-0"
                                className={clsx(classes.tab, css.tabMargin)}
                            />
                            <Tab
                                label={t('active')}
                                id="tab-3"
                                aria-controls="tabpanel-0"
                                className={clsx(classes.tab, css.tabMargin)}
                            />
                            <Tab
                                label={t('archived')}
                                id="tab-4"
                                aria-controls="tabpanel-0"
                                className={clsx(classes.tab, css.tabMargin)}
                            />
                        </Tabs>
                    </Grid>
                    <Grid item xs={12}>
                        <TabPanel value={currentTab} index={0}>
                            {loading && (
                                <div className={css.centralize}>
                                    <CircularProgress size={25} />
                                </div>
                            )}
                            {!loading && paginatedMatches && paginatedMatches.length === 0 && (
                                <NoMatchComponent css={css} t={t} />
                            )}
                            {!loading &&
                                paginatedMatches.map((userMatch) => (
                                    <CandidateListMatches
                                        key={userMatch.id}
                                        type={MATCH_STATUS_ALL}
                                        userMatch={userMatch}
                                        handleView={handleViewMatch}
                                    />
                                ))}
                        </TabPanel>
                        <TabPanel value={currentTab} index={1}>
                            {loading && (
                                <div className={css.centralize}>
                                    <CircularProgress size={25} />
                                </div>
                            )}
                            {!loading && paginatedMatches && paginatedMatches.length === 0 && (
                                <NoMatchComponent css={css} t={t} />
                            )}
                            {paginatedMatches.map((userMatch) => (
                                <CandidateListMatches
                                    key={userMatch.id}
                                    type={MATCH_STATUS_TOP}
                                    userMatch={userMatch}
                                    handleView={handleViewMatch}
                                />
                            ))}
                        </TabPanel>
                        <TabPanel value={currentTab} index={2}>
                            {loading && (
                                <div className={css.centralize}>
                                    <CircularProgress size={25} />
                                </div>
                            )}
                            {!loading && paginatedMatches && paginatedMatches.length === 0 && (
                                <NoMatchComponent css={css} t={t} />
                            )}
                            {paginatedMatches.map((userMatch) => (
                                <CandidateListMatches
                                    key={userMatch.id}
                                    type={MATCH_STATUS_PENDING}
                                    userMatch={userMatch}
                                    handleView={handleViewMatch}
                                />
                            ))}
                        </TabPanel>
                        <TabPanel value={currentTab} index={3}>
                            {loading && (
                                <div className={css.centralize}>
                                    <CircularProgress size={25} />
                                </div>
                            )}
                            {!loading && paginatedMatches && paginatedMatches.length === 0 && (
                                <NoMatchComponent css={css} t={t} />
                            )}
                            {paginatedMatches.map((userMatch) => (
                                <CandidateListMatches
                                    key={userMatch.id}
                                    type={MATCH_STATUS_ACTIVE}
                                    userMatch={userMatch}
                                    handleView={handleViewMatch}
                                />
                            ))}
                        </TabPanel>
                        <TabPanel value={currentTab} index={4}>
                            {loading && (
                                <div className={css.centralize}>
                                    <CircularProgress size={25} />
                                </div>
                            )}
                            {!loading && paginatedMatches && paginatedMatches.length === 0 && (
                                <NoMatchComponent css={css} t={t} />
                            )}
                            {!loading &&
                                paginatedMatches.map((userMatch) => (
                                    <CandidateListMatches
                                        key={userMatch.id}
                                        type={MATCH_STATUS_ARCHIVED}
                                        userMatch={userMatch}
                                        handleView={handleViewMatch}
                                    />
                                ))}
                        </TabPanel>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="center">
                        {!loading && paginatedMatches && paginatedMatches.length > 0 && (
                            <Pagination
                                shape="rounded"
                                count={pages}
                                onChange={(_, pageNumber) => setPage(pageNumber)}
                                color="primary"
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <DialogMsg
                open={openViewMatch}
                title={`${t('ref')}: ${currMatch && currMatch.job.reference ? currMatch.job.reference : ''}`}
                handleClose={handleClose}
                isAction
                ActionComponent={ActionMatchComponent}>
                <CandidateMatchView currentMatch={currMatch} />
            </DialogMsg>
            <DialogMsg
                open={openDecline}
                title={t('reasonForDeclining')}
                handleClose={handleClose}
                isAction
                ActionComponent={ActionDeclineComponent}>
                <CandidateDeclineView currentMatch={currMatch} />
            </DialogMsg>
        </Grid>
    );
};

export default CandidateMatches;
