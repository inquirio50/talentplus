import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import clsx from 'clsx';
import globalStyles from '../../../config/globalCss';

import Shapes from '../../../assets/images/landingPage/shapes.png';
import { REGISTER_ROUTE } from '../../../routes/routes';

const styles: any = makeStyles((theme: Theme) => ({
    wrapper: {
        width: '100vw',
        background: theme.palette.titleDarkRed,
    },
    container: {
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex',
        height: '563.19px',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            height: 'auto',
        },
    },
    bgImgDarkRed: {
        width: '100%',
        background: `url(${Shapes}) 241% 44%  no-repeat`,
        backgroundSize: '80%',
        [theme.breakpoints.down('md')]: {
            background: `url(${Shapes}) 49% 7%  no-repeat`,
            backgroundSize: '17%',
        },
        // minHeight: '628px',
    },
    content: {
        margin: '0 auto',
        padding: '5rem',
        maxWidth: 1300,
        [theme.breakpoints.down('md')]: {
            padding: '5rem 2rem',
        },
    },
    computerImg: {
        width: '514px',
        height: '363.19px',
        objectFit: 'contain',
        [theme.breakpoints.down('md')]: {
            objectFit: 'contain',
            width: '282.79px',
            height: '199.82px',
        },
    },
    gridComputerTxt: {
        paddingTop: '28.6px',
        [theme.breakpoints.down('md')]: {
            paddingTop: '24px',
        },
    },
    txtPowered: {
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 20,
        lineHeight: '24px',
        color: '#fff',
        [theme.breakpoints.down('md')]: {
            fontSize: 14,
            lineHeight: '16.94px',
        },
    },
    gridTitle: {
        paddingTop: '8px',
        maxWidth: '280px',
        [theme.breakpoints.down('md')]: {
            maxWidth: 'unset',
            paddingTop: '4px',
        },
    },
    txtTitle: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: '1',
        color: '#EB078C',
        maxWidth: '404px',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem',
            lineHeight: '1',
        },
    },
    gridTxtDesc: {
        paddingTop: '16px',
    },
    textDesc: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: '30px',
        color: '#fff',
        maxWidth: '40ch',
    },
    gridBtn: {
        paddingTop: '53px',
        [theme.breakpoints.down('md')]: {
            paddingTop: '36px',
        },
    },
    gridImgReelcruit: {
        paddingTop: '28.4px',
        [theme.breakpoints.down('md')]: {
            paddingTop: '36px',
            justifyContent: 'flex-end',
            display: 'flex',
        },
    },
    reelcruitImg: {
        width: '50px',
        height: '50px',
        [theme.breakpoints.down('md')]: {
            width: '36px',
            height: '36px',
        },
    },
    contentGrid: {
        maxWidth: 1300,
        margin: 'auto',
        [theme.breakpoints.down('md')]: {
            maxWidth: 500,
        },
    },
    gridImgMobile: {
        [theme.breakpoints.down('md')]: {
            margin: 'auto',
            justifyContent: 'center',
            display: 'flex',
        },
    },
    cta: {
        width: 'auto',
        minWidth: '153px',
        textTransform: 'none',
    },
}));

const StopSearching2 = () => {
    const classes = globalStyles();
    const css = styles();
    const { t } = useTranslation();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    return (
        <div className={css.wrapper}>
            <div className={css.bgImgDarkRed}>
                <Grid container className={css.container}>
                    <Grid item xs={12} className={css.content}>
                        <Grid container className={css.contentGrid}>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <Grid container>
                                    <Grid item xs={12} className={css.gridComputerTxt}>
                                        <Typography className={css.txtPowered}>{t('poweredBy')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridTitle}>
                                        <Typography className={css.txtTitle}>{t('stopSearchStartMatching')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridTxtDesc}>
                                        <Typography className={css.textDesc}>{t('theAutomated')}</Typography>
                                    </Grid>
                                    <Grid item xs={isMobile ? 6 : 12} className={css.gridBtn}>
                                        <Button
                                            component="a"
                                            disableRipple
                                            href={REGISTER_ROUTE}
                                            className={clsx(classes.btnSmallOutlined, css.cta)}>
                                            {t('createAccount')}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {!isMobile && <Grid item xs={6} />}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default StopSearching2;
