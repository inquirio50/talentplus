import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Button, CardMedia, Grid, Typography, useMediaQuery } from '@mui/material';
import clsx from 'clsx';
import globalStyles from '../../../config/globalCss';
import Computer from '../../../assets/images/landingPage/stop_searching_computer.png';
import { REGISTER_ROUTE } from '../../../routes/routes';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex',
        background: '#f9f9f9',
        height: '563.19px',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            height: 'auto',
        },
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
        [theme.breakpoints.down('md')]: {
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
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 20,
        lineHeight: '24px',
        color: theme.palette.common.black,
        [theme.breakpoints.down('md')]: {
            fontSize: 14,
            lineHeight: '16.94px',
        },
    },
    gridTitle: {
        paddingTop: '8px',
        [theme.breakpoints.down('md')]: {
            paddingTop: '4px',
        },
    },
    txtTitle: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: '1',
        color: theme.palette.titleDarkRed,
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
        color: theme.palette.common.black,
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

const StopSearching = () => {
    const classes = globalStyles();
    const css = styles();
    const { t } = useTranslation();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    return (
        <Grid container className={css.container}>
            <Grid item xs={12} className={css.content}>
                <Grid container className={css.contentGrid}>
                    {isMobile && (
                        <Grid item xs={12} className={css.gridImgMobile}>
                            <CardMedia component="img" alt="Computer" image={Computer} className={css.computerImg} />
                        </Grid>
                    )}
                    <Grid item xs={isMobile ? 12 : 6}>
                        <Grid container>
                            <Grid item xs={12} className={css.gridComputerTxt}>
                                <Typography className={css.txtPowered}>{t('poweredBy')}</Typography>
                            </Grid>
                            <Grid item xs={12} className={css.gridTitle}>
                                <Typography className={css.txtTitle}>{t('stopSearchStartMatching')}</Typography>
                            </Grid>
                            <Grid item xs={12} className={css.gridTxtDesc}>
                                <Typography className={css.textDesc}>{t('poweredTxt')}</Typography>
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
                    {!isMobile && (
                        <Grid item xs={6}>
                            <CardMedia component="img" alt="Computer" image={Computer} className={css.computerImg} />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default StopSearching;
