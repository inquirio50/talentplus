import React from 'react';
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import globalStyles from '../../../config/globalCss';
import HeaderImage from '../../../assets/images/landingPage/header-image.png';
import { REGISTER_ROUTE } from '../../../routes/routes';
import Solution from './Solution';
import Trusted from './Trusted';
import Phone from './Phone';
import StopSearching from './StopSearching';
import Candidates from './Candidates';
import SolutionGrid from './SolutionGrid';
import Recruit from './Recruit';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        margin: 'auto',
        justifyContent: 'center',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        [theme.breakpoints.down('md')]: {
            maxWidth: '500px',
            margin: '0 auto',
        },
    },
    headerImageContainer: {
        maxWidth: '500px',
        margin: '0 auto',
    },
    imgTxt: {
        width: '499px',
        [theme.breakpoints.down('lg')]: {
            width: '371px',
        },
    },
    gridFirst: {
        padding: '5rem 3rem',
        paddingBottom: '0',
        margin: 'auto',
        justifyContent: 'center',
        maxWidth: '1300px',
        backgroundColor: theme.palette.titleDarkRed,
        [theme.breakpoints.down('md')]: {
            alignItems: 'center',
            alignContent: 'center',
            padding: '55px 28.5px 0px 28.5px',
            backgroundColor: theme.palette.titleDarkRed,
        },
    },
    headerBG: {
        backgroundColor: theme.palette.titleDarkRed,
    },

    gridSecond: {
        padding: '50px 120px 50px 120px',
        margin: 'auto',
        justifyContent: 'center',
        maxWidth: '1440px',
        [theme.breakpoints.down('lg')]: {
            padding: '30px 41.5px 30.32px 41.5px',
            backgroundColor: theme.palette.white,
        },
    },
    gridThird: {
        background: '#f3f3f3',
        padding: '5rem 0',
        overflowX: 'hidden',
    },
    solutionGrid: {
        backgroundColor: theme.palette.titleDarkRed,
        padding: '5rem 0',
    },
    gridFour: {
        padding: '50px 120px 50px 120px',
        margin: 'auto',
        justifyContent: 'center',
        maxWidth: '1440px',
        [theme.breakpoints.down('lg')]: {
            padding: '30px 34px 30px 34px',
            margin: 'unset',
            maxWidth: '100%',
        },
    },
    gridFive: {
        padding: '50px 120px 50px 120px',
        margin: 'auto',
        justifyContent: 'center',
        backgroundColor: theme.palette.titleDarkRed,
        [theme.breakpoints.down('lg')]: {
            padding: '55px 28.5px 0px 28.5px',
            backgroundColor: theme.palette.titleDarkRed,
        },
    },
    gridTxt: {
        width: '550px',
        maxWidth: '550px',
        minWidth: '550px',
        alignItems: 'center',
        [theme.breakpoints.down('lg')]: {
            width: '100%',
            maxWidth: 'unset',
            minWidth: 'unset',
            marginTop: '24px',
        },
    },
    txt: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '1.15rem',
        lineHeight: '30px',
        color: '#fff',
        [theme.breakpoints.down('md')]: {
            fontSize: 16,
            lineHeight: '24px',
        },
    },
    txtBold: {
        fontWeight: 'bold',
    },
    gridBigBtn: {
        paddingTop: '50px',
        [theme.breakpoints.down('lg')]: {
            paddingTop: '24px',
            paddingBottom: '61px',
        },
    },
    gridLandingTxtComp: {
        maxWidth: '504px !important',
        width: '504px',
        [theme.breakpoints.down('lg')]: {
            maxWidth: '371px',
            width: '371px',
        },
    },
    gridDarkRedBackground: {
        backgroundColor: theme.palette.titleDarkRed,
        width: '100%',
        minHeight: '628px',
        [theme.breakpoints.down('lg')]: {
            minHeight: '430px',
        },
    },
    txtTitleEmployers: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 20,
        lineHeight: '24px',
        color: '#E9EBF8',
        [theme.breakpoints.down('lg')]: {
            fontSize: 14,
            lineHeight: '16.94px',
        },
    },
    gridUnbiasImg: {
        paddingTop: '16px',
        [theme.breakpoints.down('lg')]: {
            minWidth: '350px',
        },
    },
    unbiasImg: {
        [theme.breakpoints.down('lg')]: {
            width: '350px',
            height: '87px',
            objectFit: 'fill',
        },
    },
    unbiasTxt: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 20,
        lineHeight: '150%',
        color: theme.palette.common.white,
        [theme.breakpoints.down('lg')]: {
            fontSize: 16,
            lineHeight: '24px',
        },
    },

    btnMeeting: {
        color: theme.palette.common.white,
        textTransform: 'none',
        fontSize: 20,
        fontWeight: 700,
        fontFamily: 'Inter',
        lineHeight: '24px',
    },
    gridBtnsMeeting: {
        paddingTop: 40,
    },
    containerUnbias: {
        maxWidth: '1440px',
        margin: 'auto',
        [theme.breakpoints.down('lg')]: {
            maxWidth: 'unset',
        },
    },
    headingText: {
        fontSize: '2.5rem',
        fontWeight: 900,
        lineHeight: '1.2',
        color: '#fff',
        '& .colored': {
            color: '#EB078C',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1.8rem',
        },
    },
    headingTextContainer: {
        margin: '0 auto',
        maxWidth: '500px',
    },
    largeScreenImage: {
        height: '100%',
        width: '100%',
        objectFit: 'contain',
    },
    cta: {
        textTransform: 'none',
        minWidth: '180px',
        width: 'auto',
    },
}));

const Content = () => {
    const classes = globalStyles();
    const css = styles();
    const { t } = useTranslation();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    return (
        <Grid container className={css.container}>
            <Grid item xs={12}>
                <Grid container className={css.headerBG}>
                    <Grid item xs={12}>
                        <Grid container className={css.gridFirst}>
                            <Grid item xs={isMobile ? 12 : 6} className={css.gridTxt}>
                                <Grid
                                    container
                                    height="100%"
                                    alignItems="center"
                                    alignContent="center"
                                    className={css.headingTextContainer}>
                                    <Grid item xs={12} alignItems="center">
                                        <Typography className={css.headingText} component="h1">
                                            <span className="colored">{t('buildYourItCareer')}</span> <br />{' '}
                                            {t('withTopOpportunities')} <br /> {t('available in the market for free')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={{ paddingTop: '24px' }}>
                                        <Grid container>
                                            <Grid item xs={12} className={css.gridLandingTxtComp}>
                                                <Typography component="span" className={css.txt}>
                                                    {t('landingPageAutomated')}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridBigBtn}>
                                        <Button
                                            component="a"
                                            disableRipple
                                            href={REGISTER_ROUTE}
                                            className={clsx(classes.btnBigOutlined, css.cta)}>
                                            {t('startMatching')}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {isMobile && (
                                <Grid item xs={12} className={css.headerImageContainer}>
                                    <img src={HeaderImage} alt="Man with phone" className={css.headerImage} />
                                </Grid>
                            )}
                            {!isMobile && (
                                <Grid item xs={6}>
                                    <img
                                        src={HeaderImage}
                                        alt="Man with phone"
                                        width="650px"
                                        height="459"
                                        className={css.largeScreenImage}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} className={css.gridSecond}>
                    <Trusted />
                </Grid>

                <Grid item xs={12} className={css.gridThird}>
                    <Solution />
                </Grid>

                <Grid item xs={12} className={css.solutionGrid}>
                    <SolutionGrid />
                </Grid>

                <Grid item xs={12} className={css.gridFour}>
                    <Phone />
                </Grid>

                <Grid item xs={12} className={css.gridDarkRedBackground}>
                    <Recruit />
                </Grid>
                <Grid item xs={12}>
                    <StopSearching />
                </Grid>
                <Grid item xs={12}>
                    <Candidates />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Content;
