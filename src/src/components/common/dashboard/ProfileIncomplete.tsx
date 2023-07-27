import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { Grid, linearProgressClasses, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import StyledBtnComponent from '../StyledBtnComponent';
import PercentageBarBox from './PercentageBarBox';
import { RootState } from '../../../store/store';
import { CONSULTANT_ROLE } from '../../../config/constants';
import PercentageDoughnut from '../PercentageDoughnut';
import User from '../../../models/user';
import { Profile } from '../../../models/profile';
import { getPercentageTotal } from '../../helpers/utilityFunctions';

const useStyles: any = makeStyles((theme: Theme) => ({
    content: {
        paddingTop: '43px',
    },
    gridBlackBox: {
        padding: '50px',
        width: '100%',
        maxWidth: '1010px',
        minHeight: '300px',
        backgroundColor: '#0B1B39',
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.05), -4px -4px 8px rgba(0, 0, 0, 0.05)',
        borderRadius: '20px',
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
    textWelcomeWhite: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 20,
        lineHeight: '30px',
        color: theme.palette.common.white,
        textAlign: 'justify',
    },
    textWelcomeWhiteDesc: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 15,
        lineHeight: '22.5px',
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'inherit',
        maxWidth: '351px',
        [theme.breakpoints.down('md')]: {
            maxWidth: 'unset',
        },
    },
    gridBoxSpace: {
        paddingTop: '24px',
    },
    gridBox: {
        padding: '10px',
        width: '446px',
        height: '40px',
        background: '#19356A',
        borderRadius: '20px',
        [theme.breakpoints.down('lg')]: {
            width: '100%',
        },
    },
    title: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        color: theme.palette.common.white,
    },
    linearProgress: {
        height: 6,
        borderRadius: '10px 0px 0px 10px',
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: '#F79CD1',
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: '#EC008B',
        },
    },
    gridBarSpace: {
        paddingLeft: '16px',
    },
    gridChart: {
        margin: 'auto',
        overflow: 'initial',
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 15,
        },
    },
}));

const PercentageBox = ({ title, percentage, css }: { title: string; percentage: number; css: any }) => (
    <Grid container className={css.gridBox}>
        <Grid item xs={12}>
            <PercentageBarBox
                css={{
                    titlePercentage: css.title,
                    greenLinearProgress: css.linearProgress,
                    percentagemString: css.title,
                    gridBarSpace: css.gridBarSpace,
                }}
                title={title}
                percentage={percentage}
                percentageString={`${percentage}%`}
                sizeBar={6}
            />
        </Grid>
    </Grid>
);

const ProfileIncomplete = ({ handleLetsGo, fillingQuestion }: { handleLetsGo: any; fillingQuestion: boolean }) => {
    const { t } = useTranslation();
    const css = useStyles();
    const { user, profile }: { user: User; profile: Profile } = useSelector((state: RootState) => ({
        user: state.authentication.user,
        profile: state.generic.profile,
    }));

    const getMatchPercentage = () => getPercentageTotal(profile, user);
    const total: number = 100 - getMatchPercentage();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    return (
        <Grid item xs={12} className={css.content}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12} className={css.gridBlackBox}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container spacing={isMobile ? 5 : 0} justifyContent="space-between">
                                <Grid item lg={2} md={2} xs={4} className={css.gridChart} order={1}>
                                    <PercentageDoughnut total={total} percentage={getMatchPercentage()} />
                                </Grid>
                                <Grid item lg={8} md={8} xs={12} order={isMobile ? 3 : 2}>
                                    <Typography className={css.textWelcomeWhite}>{t('welcomeToReelcruit')}</Typography>
                                    <Typography className={css.textWelcomeWhiteDesc}>
                                        {user.role === CONSULTANT_ROLE
                                            ? t('welcomeReelcruitDescContract')
                                            : t('welcomeReelcruitDesc')}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    lg={2}
                                    md={2}
                                    xs={6}
                                    order={isMobile ? 2 : 3}
                                    justifyContent="flex-end"
                                    alignItems={isMobile ? 'start' : 'end'}
                                    display="flex">
                                    {!fillingQuestion && (
                                        <div>
                                            <StyledBtnComponent
                                                title={t('letsGo')}
                                                red
                                                btWidth="auto"
                                                handleOnClick={handleLetsGo}
                                            />
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={css.gridBoxSpace}>
                            <Grid container spacing={2}>
                                <Grid item lg={6} md={6} xs={12}>
                                    <PercentageBox
                                        title={t('personalInformation')}
                                        percentage={profile?.percentage?.personalInformation || 0}
                                        css={css}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <PercentageBox
                                        title={t('professionalInformation')}
                                        percentage={profile?.percentage?.professionalInformation || 0}
                                        css={css}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <PercentageBox
                                        title={t('myPreferences')}
                                        percentage={profile?.percentage?.myPreferences || 0}
                                        css={css}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    {user.role === CONSULTANT_ROLE && (
                                        <PercentageBox
                                            title={t('paymentInformation')}
                                            percentage={profile?.percentage?.paymentInformation || 0}
                                            css={css}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProfileIncomplete;
