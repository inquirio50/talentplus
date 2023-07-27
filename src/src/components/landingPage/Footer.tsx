/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Theme } from '@mui/system';
import Shapes from '../../assets/images/landingPage/shapes.png';
import ReelcruitWhite from '../../assets/images/landingPage/reelcruit_white.png';
import FacebookWhite from '../../assets/images/landingPage/facebook_white.png';
import InstagramWhite from '../../assets/images/landingPage/instagram_white.png';
import TwitterWhite from '../../assets/images/landingPage/twitter_white.png';
import YoutubeWhite from '../../assets/images/landingPage/youtube_white.png';
import LinkedInWhite from '../../assets/images/landingPage/linkedin_white.png';
import { NON_DISCRIMINATION, PRIVACY_POLICY, TERMS_AND_CONDITION } from '../../routes/routes';
import NewsletterForm from './NewsletterForm';

const styles: any = makeStyles((theme: Theme) => ({
    footerContainer: {
        margin: 'auto',
        justifyContent: 'center',
        maxWidth: 1300,
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    footerContainerWithMaxWidth: {
        [theme.breakpoints.down('md')]: {
            maxWidth: 500,
        },
    },
    subscription: {
        padding: '5rem',
        [theme.breakpoints.down('md')]: {
            padding: '2rem',
        },
    },
    getLatestDiv: {
        maxWidth: '527px',
    },
    getLatest: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        lineHeight: '120%',
        textAlign: 'left',
        color: theme.palette.titleDarkRed,
        fontSize: '3rem',
        fontWeight: 700,
        [theme.breakpoints.down('md')]: {
            fontSize: '2.5rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.8rem',
        },
    },
    footer: {
        width: '100%',
        left: 0,
        borderRadius: 0,
        backgroundColor: theme.palette.titleDarkRed,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        color: '#FFFFFF',
        margin: 'auto',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            padding: '3rem 0',
        },
    },
    footerImg: {
        background: `url(${Shapes}) 96% 45%  no-repeat`,
        backgroundSize: '40%',
        [theme.breakpoints.down('lg')]: {
            background: `url(${Shapes}) 49% 7%  no-repeat`,
            backgroundSize: '17%',
        },
    },
    footerPadding: {
        padding: '5rem',
        paddingBottom: '2rem',
        [theme.breakpoints.down('md')]: {
            padding: '2rem',
            paddingBottom: '1rem',
        },
    },
    inputText: {
        width: '100%',
        maxWidth: '573px',
        boxSizing: 'border-box',
        borderRadius: '10px',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
        padding: '10px 10px',
        boxShadow: 'none',
        background: 'transparent',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            height: '70px',
            marginLeft: 0,
        },
    },
    inputCss: {
        flex: 1,
        minWidth: '200px',
        fontSize: '1rem',
    },
    copyright: {
        fontFamily: 'Inter',
        fontSize: '1rem',
        fontWeight: 400,
        color: theme.palette.common.white,
    },
    footerList: {
        fontSize: '1rem',
        fontWeight: 400,
        color: theme.palette.common.white,
    },
    quicklinks: {
        fontSize: '1.2rem',
        fontWeight: 700,
        lineHeight: '19px',
        color: theme.palette.common.white,
    },
    btnOutlinedFooter: {
        background: theme.palette.baseColor,
        borderRadius: '10px',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: '18px',
        textTransform: 'none',
        color: theme.palette.common.white,
        border: '1px solid #EB078C',
        borderColor: theme.palette.baseColor,
        width: '119px',
        height: '50px',
        '&:hover': {
            border: 0,
            fontSize: 19,
            lineHeight: '23px',
            color: theme.palette.common.white,
            background:
                'linear-gradient(110.16deg, rgba(82, 2, 49, 0.8) -3.22%, rgba(249, 178, 219, 0.8) 104.03%), #EB078C',
        },
    },
    gridSocial: {
        marginTop: '1rem',
        [theme.breakpoints.down('md')]: {
            marginTop: '0',
        },
    },
    gridQuickLink: {
        [theme.breakpoints.down('lg')]: {
            paddingTop: '50px',
            minWidth: '140px',
        },
    },
    gridOtherLinks: {
        [theme.breakpoints.down('lg')]: {
            marginLeft: '40px',
            minWidth: '112px',
            paddingTop: '70px',
        },
    },
    gridLinks: {
        marginTop: '1rem',
    },
    gridNon: {
        marginTop: '51px',
        [theme.breakpoints.down('lg')]: {
            marginTop: '16px',
        },
    },
    gridCopyRight: {
        maxWidth: 1300,
        textAlign: 'center',
        paddingTop: '3rem',
    },
    quickLinkTitleGrid: {
        paddingTop: '5px',
    },
    gridLinksAlignment: {
        paddingLeft: '5rem',
        [theme.breakpoints.down('md')]: {
            paddingLeft: '0',
        },
    },
    gridSocialImg: {
        paddingLeft: '5px',
    },
    subscribeButton: {
        paddingTop: '1rem',
        paddingBottom: '1rem',
    },
    inputError: {
        marginRight: '0px',
    },
    logoColumn: {
        [theme.breakpoints.down('md')]: {
            maxWidth: 500,
            margin: '0 auto',
        },
    },
}));

const Footer = () => {
    const css = styles();
    const { t } = useTranslation();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    return (
        <footer>
            <Grid container>
                <Grid item xs={12} className={css.subscription}>
                    <Grid
                        container
                        alignItems="center"
                        className={clsx(css.footerContainer, css.footerContainerWithMaxWidth)}>
                        <Grid item xs={isMobile ? 12 : 6} className={css.getLatestDiv}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography className={css.getLatest}>{t('getLatest')}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <NewsletterForm />
                    </Grid>
                </Grid>
                <Grid item xs={12} className={css.footer}>
                    <Grid container className={css.footerImg}>
                        <Grid
                            container
                            className={clsx(css.footerPadding, css.footerContainer)}
                            justifyContent="center">
                            <Grid item xs={12}>
                                <Grid container textAlign="left" justifyContent="center" className={css.footerMaxWidth}>
                                    <Grid
                                        item
                                        xs={isMobile ? 12 : 4}
                                        className={clsx(css.gridLinksAlignment)}
                                        justifyContent="center">
                                        <Grid container alignItems="center" className={css.logoColumn}>
                                            <Grid item xs={isMobile ? 6 : 12}>
                                                <img src={ReelcruitWhite} alt="reelcruit" width="91px" height="24px" />
                                            </Grid>
                                            <Grid item xs={isMobile ? 6 : 12} className={css.gridSocialImg}>
                                                <Grid container>
                                                    <Grid item xs={isMobile ? 2 : 12} className={css.gridSocial}>
                                                        <Grid
                                                            container
                                                            component="a"
                                                            href="https://www.facebook.com/reelcruit/"
                                                            target="_blank"
                                                            rel="noreferrer">
                                                            <Grid
                                                                item
                                                                xs={isMobile ? 12 : 2}
                                                                sx={{
                                                                    paddingLeft: '5px',
                                                                    maxWidth: '30px !important',
                                                                }}>
                                                                <img
                                                                    src={FacebookWhite}
                                                                    alt="facebook"
                                                                    width="9px"
                                                                    height="15px"
                                                                />
                                                            </Grid>
                                                            {!isMobile && (
                                                                <Grid item xs={10} sx={{ paddingTop: '4px' }}>
                                                                    <Typography className={css.footerList}>
                                                                        Facebook
                                                                    </Typography>
                                                                </Grid>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={isMobile ? 2 : 12} className={css.gridSocial}>
                                                        <Grid
                                                            container
                                                            component="a"
                                                            href="https://www.instagram.com/reelcruit/?hl=en"
                                                            target="_blank"
                                                            rel="noreferrer">
                                                            <Grid
                                                                item
                                                                xs={2}
                                                                sx={{
                                                                    paddingLeft: '2px',
                                                                    maxWidth: '30px !important',
                                                                }}>
                                                                <img
                                                                    src={InstagramWhite}
                                                                    alt="instagram"
                                                                    width="15.61px"
                                                                    height="15.61px"
                                                                />
                                                            </Grid>
                                                            {!isMobile && (
                                                                <Grid item xs={10} sx={{ paddingTop: '4px' }}>
                                                                    <Typography className={css.footerList}>
                                                                        instagram
                                                                    </Typography>
                                                                </Grid>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={isMobile ? 2 : 12} className={css.gridSocial}>
                                                        <Grid
                                                            container
                                                            component="a"
                                                            href="https://twitter.com/Reelcruit"
                                                            target="_blank"
                                                            rel="noreferrer">
                                                            <Grid
                                                                item
                                                                xs={2}
                                                                sx={{
                                                                    paddingLeft: '2px',
                                                                    maxWidth: '30px !important',
                                                                }}>
                                                                <img
                                                                    src={TwitterWhite}
                                                                    alt="twitter"
                                                                    width="18.92px"
                                                                    height="15.38px"
                                                                />
                                                            </Grid>
                                                            {!isMobile && (
                                                                <Grid item xs={10} sx={{ paddingTop: '4px' }}>
                                                                    <Typography className={css.footerList}>
                                                                        Twitter
                                                                    </Typography>
                                                                </Grid>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={isMobile ? 2 : 12} className={css.gridSocial}>
                                                        <Grid
                                                            container
                                                            component="a"
                                                            href="https://www.youtube.com/channel/UCnViWSi3CbALwlQqAiSIlUA"
                                                            target="_blank"
                                                            rel="noreferrer">
                                                            <Grid
                                                                item
                                                                xs={2}
                                                                sx={{
                                                                    paddingLeft: '2px',
                                                                    maxWidth: '30px !important',
                                                                }}>
                                                                <img
                                                                    src={YoutubeWhite}
                                                                    alt="youtube"
                                                                    width="16.68px"
                                                                    height="11.68px"
                                                                />
                                                            </Grid>
                                                            {!isMobile && (
                                                                <Grid item xs={10} sx={{ paddingTop: '4px' }}>
                                                                    <Typography className={css.footerList}>
                                                                        Youtube
                                                                    </Typography>
                                                                </Grid>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={isMobile ? 3 : 12} className={css.gridSocial}>
                                                        <Grid
                                                            container
                                                            component="a"
                                                            href="https://www.linkedin.com/company/reelcruit/"
                                                            target="_blank"
                                                            rel="noreferrer">
                                                            <Grid
                                                                item
                                                                xs={2}
                                                                sx={{
                                                                    paddingLeft: '2px',
                                                                    maxWidth: '30px !important',
                                                                }}>
                                                                <img
                                                                    src={LinkedInWhite}
                                                                    alt="linkedIn"
                                                                    width="16.67px"
                                                                    height="16.67px"
                                                                />
                                                            </Grid>
                                                            {!isMobile && (
                                                                <Grid item xs={10} sx={{ paddingTop: '4px' }}>
                                                                    <Typography className={css.footerList}>
                                                                        LinkedIn
                                                                    </Typography>
                                                                </Grid>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4} className={clsx(css.gridQuickLink, css.gridLinksAlignment)}>
                                        <Grid container>
                                            <Grid item xs={12} className={css.quickLinkTitleGrid}>
                                                <Typography className={css.quicklinks}>{t('quickLinks')}</Typography>
                                            </Grid>
                                            <Grid item xs={12} className={css.gridLinks}>
                                                <Link to="/account/register">
                                                    <Typography className={css.footerList}>{t('signUp')}</Typography>
                                                </Link>
                                            </Grid>
                                            <Grid item xs={12} className={css.gridLinks}>
                                                <Link to="/account/login">
                                                    <Typography className={css.footerList}>{t('logIn')}</Typography>
                                                </Link>
                                            </Grid>
                                            <Grid item xs={12} className={css.gridLinks}>
                                                <Link to="/about-us">
                                                    <Typography className={css.footerList}>{t('aboutUs')}</Typography>
                                                </Link>
                                            </Grid>
                                            <Grid item xs={12} className={css.gridLinks}>
                                                <Link to="/forEmployer">
                                                    <Typography className={css.footerList}>
                                                        {t('reelcruitForEmployer')}
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4} className={clsx(css.gridOtherLinks, css.gridLinksAlignment)}>
                                        <Grid container>
                                            <Grid item xs={12} />
                                            <Grid item xs={12} className={css.gridNon}>
                                                <a href={NON_DISCRIMINATION}>
                                                    <Typography className={css.footerList}>
                                                        {t('nonDiscrimination')}
                                                    </Typography>
                                                </a>
                                            </Grid>
                                            <Grid item xs={12} className={css.gridLinks}>
                                                <a href={TERMS_AND_CONDITION}>
                                                    <Typography className={css.footerList}>
                                                        {t('termsAndConditions')}
                                                    </Typography>
                                                </a>
                                            </Grid>
                                            <Grid item xs={12} className={css.gridLinks}>
                                                <a href={PRIVACY_POLICY}>
                                                    <Typography className={css.footerList}>
                                                        {t('privacyPolicy')}
                                                    </Typography>
                                                </a>
                                            </Grid>
                                            <Grid item xs={12} className={css.gridLinks}>
                                                <Typography className={css.footerList}>{t('language')}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className={css.gridCopyRight}>
                                <Typography className={css.copyright}>{t('copyrightFooter')}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
