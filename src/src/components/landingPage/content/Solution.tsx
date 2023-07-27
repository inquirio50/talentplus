import React from 'react';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Theme } from '@mui/system';
import { makeStyles } from '@mui/styles';
import i18next from '../../../config/i18next';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        margin: '0 auto',
        padding: '0 5rem',
        justifyContent: 'center',
        maxWidth: 1300,
        width: '100%',
        background: '#F3F3F3',
        [theme.breakpoints.down('md')]: {
            padding: '0 2rem',
            width: '100%',
            maxWidth: '500px',
        },
    },
    gridVideo: {
        minHeight: '310px',
        paddingLeft: '0 !important',
        paddingTop: '1rem !important',
        [theme.breakpoints.down('lg')]: {
            minHeight: 'unset',
            width: '100%',
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '500px',
        },
        [theme.breakpoints.down('md')]: {
            minHeight: 'unset',
            width: '100%',
        },
    },
    videoBox: {
        background: theme.palette.common.black,
        border: '1px solid #000000',
        borderColor: theme.palette.common.black,
        borderRadius: '20px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '500px',
        minHeight: '300px',
        [theme.breakpoints.down('md')]: {
            maxWidth: 'unset',
            minHeight: '300px',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: 'unset',
            minHeight: '200px',
        },
    },
    gridExplanation: {
        padding: '67px 0px 67px 141px',
        [theme.breakpoints.down('md')]: {
            padding: 0,
            paddingTop: '2rem',
        },
    },
    permanentTxt: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: '120%',
        color: theme.palette.titleDarkRed,
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem',
            lineHeight: '1',
        },
    },
    stopSearching: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '20px',
        lineHeight: '150%',
        color: 'rgba(0, 0, 0, 0.8)',
        [theme.breakpoints.down('lg')]: {
            fontSize: 18,
            lineHeight: '27px',
        },
    },
    freeTxt: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '20px',
        lineHeight: '150%',
        color: '#EC008B',
        textTransform: 'uppercase',
    },
    gridSolution: {
        paddingTop: '125px',
        [theme.breakpoints.down('lg')]: {
            paddingTop: '24px',
            height: 'auto!important',
            overflow: 'hidden',
            width: 'auto!important',
        },
    },
    gridImgItems: {
        paddingTop: '40px',
        [theme.breakpoints.down('lg')]: {
            paddingTop: 0,
        },
    },
    gridImgSize: {
        width: '116.67px',
        maxWidth: '116.67px',
    },
    gridItemsMargin: {
        marginLeft: '125px',
        maxWidth: '316.67px',
        [theme.breakpoints.down('lg')]: {
            marginLeft: '16px',
        },
    },
    gridBoxSize: {
        height: '287.54px',
        width: '316.67px',
        maxWidth: '316.67px',
    },
    solutionTxt: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '150%',
        color: theme.palette.common.black,
        paddingLeft: '20px',
    },
    solutionImg: {
        height: '197.54px',
    },
    gridStopTxt: {
        paddingTop: 16,
    },
}));

const Solution = () => {
    const css = styles();
    const { t } = useTranslation();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    const isFrench = i18next.language === 'fr';

    const engVideo = isFrench
        ? 'https://www.youtube.com/embed/d37cAKofXOg'
        : 'https://www.youtube.com/embed/jyrMYBhWK9Y';

    return (
        <Grid
            container
            className={css.container}
            spacing={isMobile ? 0 : 5}
            justifyContent="center"
            alignItems="center">
            <Grid item xs={isMobile ? 12 : 6} className={css.gridVideo}>
                <Grid container>
                    <Grid item xs={12} className={css.videoBox}>
                        <iframe
                            title="Reelcruit"
                            width="100%"
                            height="100%"
                            padding-bottom="56.25%"
                            src={engVideo}
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={isMobile ? 12 : 6} className={css.gridExplanation}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={css.permanentTxt}>{t('permanentJobSeeker')}</Typography>
                    </Grid>
                    <Grid item xs={12} className={css.gridStopTxt}>
                        <Typography component="span" className={css.stopSearching}>
                            {t('stopSearching')}
                        </Typography>
                        <Typography component="span" className={css.freeTxt}>
                            {` ${t('free')}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Solution;
