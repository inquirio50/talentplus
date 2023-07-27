/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CircularProgress, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Theme } from '@mui/system';
import UserMatch from '../../models/userMatch';
import PercentageDoughnut from '../common/PercentageDoughnut';
import globalStyles from '../../config/globalCss';
import { getTypeOfWorkDisplay } from '../helpers/utilityFunctions';
import { PERMANENT_ROLE } from '../../config/constants';
import { Skills } from '../../models/skills';
import { getOptionsLabeled, LEVEL_LANGUAGE_OPTIONS } from '../helpers/typeOptions';

const styles: any = makeStyles((theme: Theme) => ({
    matchType: {
        width: 'fit-content',
        maxWidth: 99,
        height: 28,
        backgroundColor: '#FEE7F4',
        borderRadius: 10,
        color: '#FF3AAE',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 10,
        lineHeight: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
    },
    contentDesc: {
        paddingTop: '40px',
    },
    titleDesc: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '16.71px',
        color: 'rgba(0, 0, 0, 0.6)',
    },
    descBackground: {
        width: 'fit-content',
        height: 25,
        backgroundColor: '#DBEEF8',
        borderRadius: 10,
        color: '#0E71A7',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 10px 5px 10px',
        marginTop: '4px',
    },
    gridSpace: {
        paddingTop: '24px',
    },
    summary: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '18px',
        color: theme.palette.common.black,
    },
    summaryColor: {
        color: '#128DD1',
    },
}));

const CandidateMatchView = ({ currentMatch }: { currentMatch: UserMatch | undefined }) => {
    const { t } = useTranslation();
    const css = styles();
    const classes = globalStyles();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'), {
        noSsr: true,
    });

    const langues = getOptionsLabeled(LEVEL_LANGUAGE_OPTIONS, t);
    if (!currentMatch) {
        return <CircularProgress size="large" />;
    }
    const titles = currentMatch.job.titles.map((x) => x.label).join(' , ');
    const isPermanentJob = currentMatch.job.role === 'employee';
    const getMatchTitle = () => {
        if (currentMatch.score < 47) return t('notAMatch');
        if (currentMatch.score < 62) return t('potencialMatch');
        if (currentMatch.score < 77) return t('match');
        return t('topMatch');
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container spacing={isMobile ? 5 : 0}>
                    <Grid item lg={11} md={11} sm={10} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={css.matchType}>{getMatchTitle()}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    component="span"
                                    className={clsx(classes.baseText, classes.textTitle)}>{`${t(
                                    'matchedAs'
                                )}: `}</Typography>
                                <Typography component="span" className={clsx(classes.baseText, classes.textDesc)}>
                                    {titles}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    component="span"
                                    className={clsx(classes.baseText, classes.textTitle)}>{`${t(
                                    'typeOfWork'
                                )}: `}</Typography>
                                <Typography component="span" className={clsx(classes.baseText, classes.textDesc)}>
                                    {getTypeOfWorkDisplay(currentMatch.job.typeOfWork, t)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="span" className={clsx(classes.baseText, classes.textTitle)}>
                                    {isPermanentJob ? `${t('salary')}: ` : `${t('ratePerHour')}: `}
                                </Typography>
                                <Typography component="span" className={clsx(classes.baseText, classes.textDesc)}>
                                    {isPermanentJob
                                        ? `$${currentMatch.job.salary.min}k - $${currentMatch.job.salary.max}k`
                                        : `$${currentMatch.job.salary.min}/h - $${currentMatch.job.salary.max}/h`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={1} md={1} sm={2} xs={12} display="flex" justifyContent="center">
                        <PercentageDoughnut
                            percentage={currentMatch.score}
                            total={100 - currentMatch.score}
                            txtColor="rgba(0, 0, 0, 0.6);"
                            width={isMobile ? '150px' : '100px'}
                            height="auto"
                        />
                    </Grid>
                </Grid>
                <Divider sx={{ color: '#EFE7EC', marginTop: '16px' }} />
            </Grid>
            <Grid item xs={12} className={css.contentDesc}>
                <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography className={css.titleDesc}>{t('yearsOfExperience')}</Typography>
                        <Typography className={css.descBackground}>
                            {t(currentMatch.job.experienceLevels?.map((x) => x.label).join(', '))}
                        </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography className={css.titleDesc}>{t('sizeOfIndustry')}</Typography>
                        <Typography className={css.descBackground}>
                            {t(currentMatch.owner?.company?.sizeOfWork || '')}
                        </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography className={css.titleDesc}>{t('selectLanguageEngPlaceholder')}</Typography>
                        <Typography className={css.descBackground}>
                            {
                                langues
                                    .filter((x) => x.value === currentMatch.job.selectLanguageEng)
                                    .map((x) => x.label)[0]
                            }
                        </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography className={css.titleDesc}>{t('selectLanguageFrPlaceholder')}</Typography>
                        <Typography className={css.descBackground}>
                            {
                                langues
                                    .filter((x) => x.value === currentMatch.job.selectLanguageFr)
                                    .map((x) => x.label)[0]
                            }
                        </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography className={css.titleDesc}>{t('culture')}</Typography>
                        <Typography
                            className={css.descBackground}>{` ${currentMatch.owner?.company.culture}. `}</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography className={css.titleDesc}>{t('distanceFromWork')}</Typography>
                        <Typography className={css.descBackground}>{` ${currentMatch.job.localisations
                            ?.map((x) => x.label)
                            .join(', ')} `}</Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ color: '#EFE7EC', marginTop: '16px' }} />
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={css.summary}>{`${t('hey')} ${
                            currentMatch.profile.firstName
                        }!`}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: '16px' }}>
                        <Typography component="span" className={css.summary}>
                            {t('summaryJobMatchView')}
                        </Typography>
                        <Typography component="span" className={clsx(css.summary, css.summaryColor)}>
                            {titles}
                        </Typography>
                        <Typography component="span" className={css.summary}>
                            {`${t('andYouWill')} `}
                        </Typography>
                        <Typography component="span" className={clsx(css.summary, css.summaryColor)}>
                            {` ${currentMatch.job.jobFunctions?.map((x) => x.label).join(', ')} `}
                        </Typography>
                        <Typography component="span" className={css.summary}>
                            {` ${t('usingCoreSkills')} `}
                        </Typography>
                        <Typography component="span" className={clsx(css.summary, css.summaryColor)}>
                            {currentMatch.job.skills.map((s: Skills) => s.skill).join(',')}.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: '16px' }}>
                        <Typography component="span" className={css.summary}>
                            {`${t('thisCompanyIsIn')} `}
                        </Typography>
                        <Typography component="span" className={clsx(css.summary, css.summaryColor)}>
                            {`${currentMatch.owner?.company.industry}.`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: '16px' }}>
                        <Typography component="span" className={css.summary}>
                            {t('areYouInterestedInLearningMore')}
                        </Typography>
                    </Grid>
                    <Divider sx={{ color: '#EFE7EC', marginTop: '16px' }} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CandidateMatchView;
