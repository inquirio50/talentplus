import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Divider, Grid, Popover, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import 'chartjs-plugin-doughnutlabel';

import { MAX_LIST_DASHBOARD } from '../../../config/constants';
import UserMatch from '../../../models/userMatch';
import globalStyles from '../../../config/globalCss';
import { Jobs } from '../../../models/jobs';
import { convertPlainToHtml, getSkillsDisplay, getTypeOfWorkDisplay } from '../../helpers/utilityFunctions';
import { RootState } from '../../../store/store';
import DialogMsg from '../../common/DialogMsg';
import MatchView from './MatchView';
import JobMatchContent from './JobMatchContent';

interface PopOverJobsDescriptionProps {
    job: Jobs;
    anchorEl: any;
    open: boolean;
    handleClose: any;
}

const useStyles: any = makeStyles((theme: Theme) => ({
    titleJob: {
        color: theme.palette.baseColorTxt,
        fontSize: '0.9rem',
        fontWeight: 600,
    },
    description: {
        color: theme.palette.baseColorTxt,
        textAlign: 'justify',
        fontSize: '0.8rem',
        paddingTop: 0,
    },
    subTitle: {
        color: theme.palette.baseColorTxt,
        fontWeight: 600,
        fontSize: '0.8rem',
        whiteSpace: 'nowrap',
    },
    category: {
        color: theme.palette.baseColorTxt,
        fontSize: '1rem',
        fontWeight: 500,
    },
    grid: {
        paddingTop: '10px !important',
    },
    gridValue: {
        paddingRight: 10,
    },
    gridChart: {
        margin: 'auto',
        overflow: 'initial',
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 15,
        },
    },
    gridChartDashboard: {
        marginLeft: '-25px',
    },
}));

const PopOverJobDescription = ({ job, anchorEl, open, handleClose }: PopOverJobsDescriptionProps) => {
    const { t } = useTranslation();
    const customClasses = useStyles();
    return (
        <Popover
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={1}>
                                    <WorkOutlineOutlinedIcon fontSize="large" />
                                </Grid>
                                <Grid item xs={11} className={customClasses.grid}>
                                    <Typography className={customClasses.titleJob}>{job.title}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={customClasses.grid}>
                            <Typography className={customClasses.subTitle}>{t('Description')}:</Typography>
                            <Typography className={customClasses.description}>
                                {convertPlainToHtml(job.description)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={customClasses.grid}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography className={customClasses.subTitle}>{t('Requirements')}:</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography className={customClasses.description}>
                                        {t(job.skills.map((s) => `${getSkillsDisplay(s, t)}`).join(','))}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography className={customClasses.subTitle}>{t('Type of Work')}:</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography className={customClasses.description}>
                                        {getTypeOfWorkDisplay(job.typeOfWork, t)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Popover>
    );
};

interface ConsultantJobMatchProps {
    userMatches: UserMatch[];
    isDashBoard?: boolean;
    updateMatch: any;
}

/**
 * @deprecated
 * @param param0
 * @returns
 */
const ConsultantJobMatch = ({ userMatches, isDashBoard, updateMatch }: ConsultantJobMatchProps) => {
    const { t } = useTranslation();
    const [isLoading] = useState(false);
    const [isOpenPopOver, setIsOpenPopOver] = useState(false);
    const [currentJob, setCurrentJob] = useState<Jobs | undefined>();
    const [currentMatch, setCurrentMatch] = useState<UserMatch>();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [openViewMatch, setOpenViewMatch] = useState(false);
    // const dispatch = useDispatch();
    const classes = globalStyles();
    const customClasses = useStyles();

    const { loading }: { loading: boolean } = useSelector((state: RootState) => ({
        loading: state.candidate.loading,
    }));

    const userMatchArray =
        isDashBoard && userMatches.length > MAX_LIST_DASHBOARD ? userMatches.slice(0, MAX_LIST_DASHBOARD) : userMatches;

    /* const handleDecisionMatch = (matchDecision: boolean, userMatch: UserMatch) => (e: React.SyntheticEvent | Event) => {
        e.preventDefault();
        const newUserMatch: UserMatch = {
            ...userMatch,
            isAccepted: matchDecision,
        };
        dispatch(sendJobMatchApplicationDecision(newUserMatch));
        setIsLoading(true);
    }; */

    const handleOpenPopOver = (job: Jobs) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        setCurrentJob(job);
        setIsOpenPopOver(true);
    };

    const handleViewMatch = (userMatch: UserMatch) => (event: React.SyntheticEvent) => {
        event.stopPropagation();
        setCurrentMatch(userMatch);
        setOpenViewMatch(true);
    };

    const handleCloseMatch = () => {
        setCurrentMatch(undefined);
        setOpenViewMatch(false);
    };

    useEffect(() => {
        if (isLoading && !loading) {
            updateMatch();
        }
    }, [isLoading, loading]);

    if (userMatchArray.length === 0) {
        return (
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    px: 2,
                    py: 1.5,
                }}>
                <Card>
                    <CardContent>
                        <Typography variant="subtitle1">{t('noJobsAvailable')}</Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Grid container>
                    {userMatchArray.map((userMatch, index) => (
                        <Grid
                            item
                            xs={12}
                            key={userMatch.id}
                            md={!isDashBoard ? 6 : 12}
                            lg={!isDashBoard ? 6 : 12}
                            marginTop={!isDashBoard ? '5px' : 0}>
                            {!isDashBoard && (
                                <Card sx={{ marginRight: '10px' }}>
                                    <CardContent>
                                        <JobMatchContent
                                            userMatch={userMatch}
                                            classes={classes}
                                            customClasses={customClasses}
                                            t={t}
                                            handleOpenPopOver={handleOpenPopOver}
                                            // handleDecisionMatch={handleDecisionMatch}
                                            isLoading={isLoading}
                                            handleViewMatch={handleViewMatch}
                                        />
                                    </CardContent>
                                </Card>
                            )}
                            {isDashBoard && (
                                <>
                                    <JobMatchContent
                                        userMatch={userMatch}
                                        classes={classes}
                                        customClasses={customClasses}
                                        t={t}
                                        handleOpenPopOver={handleOpenPopOver}
                                        // handleDecisionMatch={handleDecisionMatch}
                                        isDashBoard
                                        isLoading={isLoading}
                                        handleViewMatch={handleViewMatch}
                                    />
                                    {index !== userMatchArray.length - 1 && <Divider />}
                                </>
                            )}
                        </Grid>
                    ))}
                </Grid>
                {/* !isDashBoard && (
                <Grid item xs={12} md={5} lg={5}>
                    <Card>
                        <CardContent>
                            <JobMatchContent
                                userMatch={userMatch}
                                classes={classes}
                                customClasses={customClasses}
                                t={t}
                                handleOpenPopOver={handleOpenPopOver}
                                // handleDecisionMatch={handleDecisionMatch}
                                isLoading={isLoading}
                                handleViewMatch={handleViewMatch}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            ) */}

                {currentJob && (
                    <PopOverJobDescription
                        anchorEl={anchorEl}
                        job={currentJob}
                        open={isOpenPopOver}
                        handleClose={() => setIsOpenPopOver(false)}
                    />
                )}
                <DialogMsg open={openViewMatch} title={t('match')} handleClose={handleCloseMatch} isAction={false}>
                    <MatchView currentMatch={currentMatch} />
                </DialogMsg>
            </CardContent>
        </Card>
    );
};

ConsultantJobMatch.defaultProps = {
    isDashBoard: false,
};

export default ConsultantJobMatch;
