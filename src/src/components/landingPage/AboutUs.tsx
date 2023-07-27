import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import i18next from '../../config/i18next';

const useStyles: any = makeStyles((theme: Theme) => ({
    mainTxtGridContainer: {
        display: 'grid',
        gridTemplateColumns: '100%',
        gridTemplateRows: 'repeat(4,min-content) 1fr',
        height: 'auto',
        minHeight: 'auto',
        position: 'static',
        width: '100%',
    },
    mainTxt: {
        height: 'auto',
        alignSelf: 'start',
        gridArea: '1/1/2/2',
        justifySelf: 'start',
        left: 0,
        [theme.breakpoints.up('md')]: {
            margin: '103px 0 38px calc(50% - 490px)',
            width: 407,
        },
        [theme.breakpoints.down('lg')]: {
            margin: '24px 0 38px calc(6% - 0px)',
        },
        [theme.breakpoints.only('md')]: {
            width: '100%',
        },
        maxWidth: 407,
        position: 'relative',
        minWidth: '140px',
        overflowWrap: 'break-word',
        textAlign: 'start',
    },
    txtStyle: {
        fontFamily: 'raleway-semibold,raleway,sans-serif',
    },
    normalTxt: {
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'raleway, sans-serif',
    },
    title: {
        fontSize: 20,
    },
    titleLarge: {
        fontSize: 29,
        fontWeight: 'bold',
    },
    sessionsMain: {
        '--bg-overlay-color': 'transparent',
        '--bg-gradient': 'none',
        '--padding': 0,
        '--margin': 0,
        '--firstChildMarginTop': -1,
        '--lastChildMarginBottom': -1,
        [theme.breakpoints.up('md')]: {
            minWidth: 980,
        },
    },
    mainFirstSession: {
        display: 'flex',
        margin: '0 auto',
        position: 'relative',
        width: 'calc(100% - 2px)',
    },
    sessionDownTxtBackground: {
        '--bg-gradient': 'linear-gradient(90deg,#d0d0d0,#fff 0)',
        '--bg-overlay-color': 'transparent',
        '--column-width': '980px',
        '--column-flex': 980,
        width: '100%',
    },
    sessionTwoTxt: {
        [theme.breakpoints.up('md')]: {
            width: 980,
            margin: '60px 0 7px calc(50% - 490px)',
        },
        alignSelf: 'start',
        gridArea: '1/1/2/2',
        justifySelf: 'start',
        left: 5,
        position: 'relative',
        minWidth: '140px',
        overflowWrap: 'break-word',
    },
    sessionThree: {
        height: 'auto',
        marginTop: 40,
        margin: 'auto',
        paddingTop: 35,
        left: 5,
        position: 'relative',
        minWidth: '140px',
        overflowWrap: 'break-word',
        backgroundColor: '#f4f4f4',
        paddingBottom: '40px',
    },
}));

const AboutUs = () => {
    const { t } = useTranslation();
    const isFrench = i18next.language === 'fr';
    const classes = useStyles();

    return (
        <Grid container marginTop={10}>
            <Grid item xs={12} className={classes.mainTxt}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={clsx(classes.txtStyle, 'color_18', classes.title)}>
                            {t('aboutUs')}
                        </Typography>
                        <Typography
                            className={clsx(classes.txtStyle, 'color_14', classes.titleLarge)}
                            sx={{ marginTop: '38px' }}>
                            {`${t('artificialIntelligence')}.`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} marginTop="30px">
                        <Typography className={classes.normalTxt}>{`${t('combiningHumanIntelligence')}.`}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.sessionsMain}>
                <Grid container className={classes.mainFirstSession} sx={{ backgroundColor: 'white' }}>
                    <Grid item xs={12} className={classes.sessionDownTxtBackground}>
                        <Grid container sx={{ position: 'relative', height: 'auto', width: '100%' }}>
                            <Grid item xs={12} className={classes.mainTxtGridContainer}>
                                <Grid container className={classes.sessionTwoTxt}>
                                    <Grid item xs={12}>
                                        <Typography
                                            className={clsx(classes.txtStyle, classes.titleLarge, 'color_14')}
                                            sx={{ textAlign: 'center', width: '100%' }}>
                                            {!isFrench && (
                                                <>
                                                    {`${t('ourCompany')} `}
                                                    <Typography
                                                        component="span"
                                                        className={clsx(
                                                            classes.txtStyle,
                                                            classes.titleLarge,
                                                            'color_18'
                                                        )}
                                                        sx={{
                                                            fontSize: '40px !important',
                                                            textTransform: 'capitalize',
                                                        }}>
                                                        {t('Story')}
                                                    </Typography>
                                                </>
                                            )}
                                            {isFrench && (
                                                <>
                                                    <Typography
                                                        component="span"
                                                        className={clsx(
                                                            classes.txtStyle,
                                                            classes.titleLarge,
                                                            'color_18'
                                                        )}
                                                        sx={{
                                                            fontSize: '40px !important',
                                                            // textTransform: 'capitalize',
                                                        }}>
                                                        {`${t('la')} ${t('Story')} `}
                                                    </Typography>
                                                    {`${t('ourCompany')} `}
                                                </>
                                            )}
                                        </Typography>
                                        <Grid container textAlign="center">
                                            <Grid item xs={12} marginTop="30px">
                                                <Typography className={classes.normalTxt}>{`${t(
                                                    'thePandemicMade'
                                                )}.`}</Typography>
                                            </Grid>
                                            <Grid item xs={12} marginTop="20px">
                                                <Typography className={classes.normalTxt}>{`${t(
                                                    'foundedByRalph'
                                                )}.`}</Typography>
                                            </Grid>
                                            <Grid item xs={12} marginTop="20px">
                                                <Typography className={classes.normalTxt}>
                                                    {`${t('recruitmentIndustry')}`}
                                                    {!isFrench && (
                                                        <>
                                                            <br />
                                                            {`${t('ourTollWantsToSolve')}`}
                                                        </>
                                                    )}
                                                    .
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} marginTop="20px">
                                                <Typography className={classes.normalTxt}>{`${t(
                                                    'appropriationAndSegmentation'
                                                )}.`}</Typography>
                                            </Grid>
                                            <Grid item xs={12} marginTop="20px">
                                                <Typography className={classes.normalTxt}>{`${t(
                                                    'webelieveThatOur'
                                                )}.`}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.sessionThree} textAlign="center">
                                    <Grid item xs={12} marginTop="20px">
                                        <Typography
                                            className={clsx(classes.txtStyle, classes.titleLarge, 'color_14')}
                                            sx={{ textAlign: 'center', width: '100%' }}>
                                            {`${t('our')} `}
                                            <Typography
                                                component="span"
                                                className={clsx(classes.txtStyle, classes.titleLarge, 'color_18')}
                                                sx={{
                                                    textTransform: 'capitalize',
                                                }}>
                                                {t('Values')}
                                            </Typography>
                                            <Grid item xs={12} marginTop="15px">
                                                <Typography className={classes.normalTxt}>
                                                    {t('innovationExcellence')}
                                                </Typography>
                                            </Grid>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} marginTop="30px">
                                        <Typography
                                            className={clsx(classes.txtStyle, classes.titleLarge, 'color_14')}
                                            sx={{ textAlign: 'center', width: '100%' }}>
                                            {`${t('andOur')} `}
                                            <Typography
                                                component="span"
                                                className={clsx(classes.txtStyle, classes.titleLarge, 'color_18')}
                                                sx={{
                                                    textTransform: 'capitalize',
                                                }}>
                                                {t('Vision')}
                                            </Typography>
                                            <Grid
                                                item
                                                xs={12}
                                                className={classes.sessionTwoTxt}
                                                sx={{ marginTop: '20px !important' }}>
                                                <Typography className={classes.normalTxt}>
                                                    {`${t('anInternationallyRecognized')}.`}
                                                    {isFrench && (
                                                        <>
                                                            {t('desEmployeurs')}
                                                            <br />
                                                            {t('nousVisons')}
                                                        </>
                                                    )}
                                                </Typography>
                                            </Grid>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AboutUs;
