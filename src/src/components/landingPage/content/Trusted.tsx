import React from 'react';
import { CardMedia, Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import Partners from '../../../assets/images/landingPage/logosPartners.png';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        justifyContent: 'center',
        maxWidth: 1300,
        margin: '5rem auto',
        padding: '0 5rem',
        [theme.breakpoints.down('md')]: {
            padding: '0',
        },
    },
    trustedTxt: {
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: '43px',
        color: theme.palette.titleDarkRed,
        [theme.breakpoints.down('md')]: {
            maxWidth: 500,
            margin: '0 auto',
            marginBottom: '1rem',
            fontSize: '1.75rem',
            lineHeight: '28.64px',
        },
    },
    trustedDetailTxt: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: '30px',
        color: '#18191F',
        maxWidth: 330,
        [theme.breakpoints.down('md')]: {
            maxWidth: 'unset',
            fontSize: '1rem',
            lineHeight: '24px',
        },
    },
    gridTrustedTxt: {
        maxWidth: 500,
        [theme.breakpoints.down('md')]: {
            margin: '0 auto',
        },
    },
    gridImg: {
        [theme.breakpoints.down('lg')]: {
            paddingTop: '24px',
        },
    },
    imgPartners: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
            maxWidth: 500,
            margin: '0 auto',
        },
    },
}));

const Trusted = () => {
    const css = styles();
    const { t } = useTranslation();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    return (
        <Grid container className={css.container} alignItems="center" justifyContent="center">
            <Grid item xs={isMobile ? 12 : 6}>
                <Grid container width="100%">
                    <Grid item xs={12}>
                        <Typography className={css.trustedTxt}>{t('trustedByTxt')}</Typography>
                    </Grid>
                    <Grid item xs={12} className={css.gridTrustedTxt}>
                        <Typography className={css.trustedDetailTxt}>{t('trustedDetail')}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={isMobile ? 12 : 6} className={css.gridImg}>
                <CardMedia component="img" image={Partners} alt="Partners" className={css.imgPartners} />
            </Grid>
        </Grid>
    );
};

export default Trusted;
