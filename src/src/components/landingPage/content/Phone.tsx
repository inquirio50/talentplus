import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Button, CardMedia, Grid, Typography, useMediaQuery } from '@mui/material';
import clsx from 'clsx';
import globalStyles from '../../../config/globalCss';
import PhoneImg from '../../../assets/images/landingPage/hand-holding-phone.png';
import { REGISTER_ROUTE } from '../../../routes/routes';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        margin: 'auto',
        justifyContent: 'center',
        maxWidth: '1440px',
        [theme.breakpoints.down('lg')]: {
            maxWidth: 'unset',
        },
    },
    phoneGrid: {
        maxWidth: '477px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('lg')]: {
            margin: 'auto',
            justifyContent: 'center',
            display: 'flex',
        },
    },
    phoneImg: {
        width: '100%',
        height: '750px',
        [theme.breakpoints.down('lg')]: {
            width: '80%',
            height: '550px',
        },
        [theme.breakpoints.down('md')]: {
            height: '500px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '110vw',
        },
    },
    gridTxtPhone: {
        padding: '64.87px 0px 0px 110px',
        minWidth: '720px',
        [theme.breakpoints.down('lg')]: {
            minWidth: 'unset',
            padding: '24px 0px 30px 0px',
        },
        [theme.breakpoints.down('md')]: {
            maxWidth: '500px',
            padding: '2rem',
            margin: '0 auto',
        },
    },
    phoneTitleTxt: {
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
    gridPhoneSteps: {
        paddingTop: '100px',
        width: 'auto',
        [theme.breakpoints.down('lg')]: {
            paddingTop: '36px',
            maxWidth: '342px',
        },
    },
    gridStepTxtContainer: {
        paddingLeft: '36px',
    },
    stepTitleTxt: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '24px',
        lineHeight: '28.64px',
        color: theme.palette.titleDarkRed,
        [theme.breakpoints.down('lg')]: {
            fontSize: 18,
            lineHeight: '21.48px',
        },
    },
    stepDescriptionTxt: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 20,
        lineHeight: '30px',
        color: theme.palette.common.black,
        [theme.breakpoints.down('lg')]: {
            fontSize: 14,
            lineHeight: '21px',
        },
    },
    gridStepDescTxt: {
        paddingTop: '8px',
        maxWidth: '408px',
    },
    verticalLine: {
        width: '80px',
        height: '0px',
        border: '1px solid #EC008B',
        transform: 'rotate(90deg)',
        marginTop: '32px',
    },
    paddingGridStep: {
        paddingTop: '8px',
    },
    paddingGridStep3: {
        paddingTop: '13px',
        [theme.breakpoints.down('lg')]: {
            paddingTop: '8px',
        },
    },
    paddingGridStep4: {
        paddingTop: '10px',
    },
    gridBtn: {
        paddingTop: '100px',
        paddingLeft: '13px',
        [theme.breakpoints.down('lg')]: {
            paddingTop: '36px',
            paddingLeft: '0px',
        },
    },
    numberTxtCenter: {
        textAlign: 'center',
    },
}));

const Phone = () => {
    const classes = globalStyles();
    const css = styles();
    const { t } = useTranslation();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    return (
        <Grid container className={css.container}>
            <Grid item xs={isMobile ? 12 : 6} className={css.phoneGrid}>
                <CardMedia component="img" alt="Phone" image={PhoneImg} className={css.phoneImg} />
            </Grid>
            <Grid item xs={isMobile ? 12 : 6} className={css.gridTxtPhone}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={css.phoneTitleTxt}>{t('getMatched4steps')}</Typography>
                    </Grid>
                    <Grid item xs={12} className={css.gridPhoneSteps}>
                        <Grid container>
                            <Grid item xs={1}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography className={clsx(classes.numberTxt, css.numberTxtCenter)}>
                                            01
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.verticalLine} />
                                </Grid>
                            </Grid>
                            <Grid item xs={11} className={css.gridStepTxtContainer}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography className={css.stepTitleTxt}>{t('stepTitle1')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridStepDescTxt}>
                                        <Typography className={css.stepDescriptionTxt}>
                                            {t('stepDescription1')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1} className={css.paddingGridStep}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography className={clsx(classes.numberTxt, css.numberTxtCenter)}>
                                            02
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.verticalLine} />
                                </Grid>
                            </Grid>
                            <Grid item xs={11} className={clsx(css.gridStepTxtContainer, css.paddingGridStep)}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography className={css.stepTitleTxt}>{t('stepTitle2')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridStepDescTxt}>
                                        <Typography className={css.stepDescriptionTxt}>
                                            {t('stepDescription2')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1} className={css.paddingGridStep}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography className={clsx(classes.numberTxt, css.numberTxtCenter)}>
                                            03
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.verticalLine} />
                                </Grid>
                            </Grid>
                            <Grid item xs={11} className={clsx(css.gridStepTxtContainer, css.paddingGridStep3)}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography className={css.stepTitleTxt}>{t('stepTitle3')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridStepDescTxt}>
                                        <Typography className={css.stepDescriptionTxt}>
                                            {t('stepDescription3')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1} className={css.paddingGridStep}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography className={clsx(classes.numberTxt, css.numberTxtCenter)}>
                                            04
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={11} className={clsx(css.gridStepTxtContainer, css.paddingGridStep4)}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography className={css.stepTitleTxt}>{t('stepTitle4')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridStepDescTxt}>
                                        <Typography className={css.stepDescriptionTxt}>
                                            {t('stepDescription4')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={css.gridBtn}>
                        <Button component="a" disableRipple href={REGISTER_ROUTE} className={classes.btnSmallOutlined}>
                            {t('getStarted')}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Phone;
