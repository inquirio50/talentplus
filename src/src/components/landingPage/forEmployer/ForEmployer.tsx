import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { CardMedia, Grid, styled, Typography, useMediaQuery } from '@mui/material';
import clsx from 'clsx';
import SimpleBar from 'simplebar-react';
import globalStyles from '../../../config/globalCss';
import Trusted from '../content/Trusted';
import StopSearching2 from '../content/StopSearching2';
import Candidates from '../content/Candidates';
import EmployerImage from '../../../assets/images/employer/for-employer-image.png';
// import UnbiasBlack from '../../../assets/images/landingPage/unbiasBlack.png';
// import ComputerEmployer from '../../../assets/images/landingPage/computer_employers.png';
import Unbias_Employer_01 from '../../../assets/images/landingPage/unbias_employer_01.png';
import Unbias_Employer_02 from '../../../assets/images/landingPage/unbias_employer_02.png';
import Unbias_Employer_03 from '../../../assets/images/landingPage/unbias_employer_03.png';
import Unbias_Employer_04 from '../../../assets/images/landingPage/unbias_employer_04.png';
import Unbias_Employer_05 from '../../../assets/images/landingPage/unbias_employer_05.png';
import Unbias_Employer_06 from '../../../assets/images/landingPage/unbias_employer_06.png';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        margin: 'auto',
        justifyContent: 'center',
    },
    maxScreen: {
        maxWidth: '1440px',
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
        },
    },
    content: {
        padding: '100px 120px 100px 120px',
        [theme.breakpoints.down('md')]: {
            padding: '35px 27px 24px 30px',
        },
    },
    content2: {
        padding: '50px 120px 50px 120px',
        [theme.breakpoints.down('md')]: {
            padding: '30px 53px 30px 30px',
        },
    },
    trustedGrid: {
        backgroundColor: theme.palette.common.white,
    },
    gridStopMatching: {
        backgroundColor: '#FDE6F4',
    },
    contentBackground: {
        backgroundColor: theme.palette.backgroundGray,
    },
    unbiasImg: {
        width: '559px',
        [theme.breakpoints.down('md')]: {
            width: '371px',
            height: '87px',
            objectFit: 'fill',
        },
    },
    unbiasTxt: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontSize: 20,
        lineHeight: '30px',
        color: theme.palette.common.black,
        [theme.breakpoints.down('md')]: {
            fontSize: 16,
            lineHeight: '24px',
        },
    },
    gridUnbiasTxt: {
        paddingTop: '24px',
        maxWidth: '546px',
        [theme.breakpoints.down('md')]: {
            minWidth: '371px',
        },
    },
    gridImgTxt: {
        maxWidth: '559px',
        [theme.breakpoints.down('md')]: {
            maxWidth: 'unset',
            paddingTop: '24px',
            paddingBottom: '24px',
        },
    },
    gridImgMaxWidth: {
        maxWidth: '559px',
        [theme.breakpoints.down('md')]: {
            maxWidth: 'unset',
        },
    },
    gridComputer: {
        paddingLeft: '121px',
        [theme.breakpoints.down('md')]: {
            minWidth: '350px',
            paddingLeft: 'unset',
        },
    },
    computerEmployer: {
        width: '500px',
        height: '299.71px',
        objectFit: 'fill',
        [theme.breakpoints.down('md')]: {
            width: '371px',
            height: '222.38px',
        },
    },
    gridBoxesEmployers: {},
    gridBox: {
        maxWidth: '100%',
        [theme.breakpoints.down('md')]: {
            maxWidth: '360px',
        },
    },
    gridBoxDown: {
        [theme.breakpoints.down('md')]: {
            paddingTop: 'unset',
        },
    },
    box: {
        width: '100%',
        maxHeight: '532px',
        minHeight: '532px',
        background: theme.palette.common.white,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
        borderRadius: '20px',
        padding: '34px 69px 26.62px 49px',
        [theme.breakpoints.down('md')]: {
            width: '360px',
            maxHeight: '300px',
            minHeight: '300px',
            padding: '1.5rem',
            paddinRight: '1rem',
        },
    },
    title: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '24px',
        lineHeight: '29px',
        color: theme.palette.titleDarkRed,
        [theme.breakpoints.down('md')]: {
            fontSize: 16,
            lineHeight: '19.09px',
        },
    },
    gridTitle: {
        paddingTop: '16px',
        [theme.breakpoints.down('md')]: {
            paddingTop: '8px',
        },
    },
    gridDesc: {
        paddingTop: '8px',
        maxWidth: '339px',
        [theme.breakpoints.down('md')]: {
            maxWidth: '260px',
        },
    },
    description: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 16,
        lineHeight: '24px',
        color: theme.palette.common.black,
        [theme.breakpoints.down('md')]: {
            fontSize: 14,
            lineHeight: '21px',
        },
    },
    gridUnbiasImg: {
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('md')]: {
            paddingTop: '24px',
        },
    },
    gridUnbiasImg03: {
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    unbiasImg01: {
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        [theme.breakpoints.down('md')]: {
            width: '130px',
            height: '130px',
        },
    },
    unbiasImg02: {
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        [theme.breakpoints.down('md')]: {
            width: '130px',
            height: '130px',
        },
    },
    unbiasImg03: {
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        [theme.breakpoints.down('md')]: {
            width: '130px',
            height: '130px',
        },
    },
    unbiasImg04: {
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        [theme.breakpoints.down('md')]: {
            width: '130px',
            height: '130px',
        },
    },
    unbiasImg06: {
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        [theme.breakpoints.down('md')]: {
            width: '130px',
            height: '130px',
        },
    },
    gridUnbiasImgRight: {
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('md')]: {
            paddingTop: '24px',
        },
    },
    gridBoxLeft: {
        [theme.breakpoints.down('md')]: {
            paddingLeft: '16px',
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
    headingTextContainer: {
        margin: '0 auto',
        maxWidth: '500px',
    },
    headingText: {
        fontSize: '3rem',
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
    gridLandingTxtComp: {
        maxWidth: '504px !important',
        width: '504px',
        [theme.breakpoints.down('md')]: {
            maxWidth: '371px',
            width: '371px',
        },
    },
    txt: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '1.25rem',
        lineHeight: '30px',
        color: '#fff',
        [theme.breakpoints.down('md')]: {
            fontSize: 16,
            lineHeight: '24px',
        },
        '& .bold': {
            fontWeight: 700,
        },
    },
    headerImageContainer: {
        maxWidth: '500px',
        margin: '0 auto',
        marginTop: '2rem',
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
    largeScreenImage: {
        height: '100%',
        width: '100%',
        objectFit: 'contain',
    },
    cardsContainer: {
        margin: '0 auto',
        padding: '5rem 0',
        [theme.breakpoints.down('md')]: {
            padding: '5rem 2rem',
        },
    },
    gridTxt: {
        paddingBottom: '3rem',
        [theme.breakpoints.down('md')]: {
            paddingBottom: 0,
        },
    },
}));

const ScrollbarRoot = styled(SimpleBar)``;

const ForEmployer = () => {
    const classes = globalStyles();
    const css = styles();
    const { t } = useTranslation();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    return (
        <Grid container className={css.container}>
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
                                        <span className="colored">{t('The unbias automated')}</span> <br />{' '}
                                        {t('employment decision tools for busy hiring managers.')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{ paddingTop: '24px' }}>
                                    <Grid container>
                                        <Grid item xs={12} className={css.gridLandingTxtComp}>
                                            <Typography component="span" className={css.txt}>
                                                {t(
                                                    // eslint-disable-next-line max-len
                                                    'The automated matchmaking platform that saves you time, understands your fields of expertise and corporate culture.'
                                                )}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {isMobile && (
                            <Grid item xs={12} className={css.headerImageContainer}>
                                <img src={EmployerImage} alt="Man with phone" className={css.headerImage} />
                            </Grid>
                        )}
                        {!isMobile && (
                            <Grid item xs={6}>
                                <img
                                    src={EmployerImage}
                                    alt="Man with phone"
                                    width="600"
                                    height="507"
                                    className={css.largeScreenImage}
                                />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>

            <Grid container width="100%" maxWidth={1200} className={css.cardsContainer}>
                {!isMobile && (
                    <Grid item xs={12} className={css.gridBoxesEmployers}>
                        <Grid container spacing={isMobile ? 0 : 10}>
                            <Grid item xs={6} className={css.gridBox}>
                                <Grid container className={css.box} spacing={0}>
                                    <Grid item xs={12}>
                                        <Typography className={classes.numberTxt}>01</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridTitle}>
                                        <Typography className={css.title}>{t('automatedSelective')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridDesc}>
                                        <Typography className={css.description}>
                                            {t('permanentCandidatesDesc')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridUnbiasImg}>
                                        <CardMedia
                                            component="img"
                                            alt="ComputerTable"
                                            image={Unbias_Employer_01}
                                            className={css.unbiasImg01}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} className={css.gridBoxLeft}>
                                <Grid container className={css.box} spacing={0}>
                                    <Grid item xs={12} className={css.gridNumber}>
                                        <Typography className={classes.numberTxt}>02</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridTitle}>
                                        <Typography className={css.title}>{t('atificialIntelligence')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridDesc}>
                                        <Typography className={css.description}>{t('aritificialDesc')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridUnbiasImgRight}>
                                        <CardMedia
                                            component="img"
                                            alt="Ai"
                                            image={Unbias_Employer_02}
                                            className={css.unbiasImg02}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} className={clsx(css.gridBox, css.gridBoxDown)}>
                                <Grid container className={css.box} spacing={0}>
                                    <Grid item xs={12} className={css.gridNumber}>
                                        <Typography className={classes.numberTxt}>03</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridTitle}>
                                        <Typography className={css.title}>{t('reduceRecruitmentBias')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridDesc}>
                                        <Typography className={css.description}>
                                            {t('reduceRecruitmentDesc')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridUnbiasImg03}>
                                        <CardMedia
                                            component="img"
                                            alt="ComputerTable"
                                            image={Unbias_Employer_03}
                                            className={css.unbiasImg03}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} className={clsx(css.gridBoxLeft, css.gridBoxDown)}>
                                <Grid container className={css.box} spacing={0}>
                                    <Grid item xs={12} className={css.gridNumber}>
                                        <Typography className={classes.numberTxt}>04</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridTitle}>
                                        <Typography className={css.title}>{t('realTimeData')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridDesc}>
                                        <Typography className={css.description}>{t('realTimeDataDesc')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridUnbiasImgRight}>
                                        <CardMedia
                                            component="img"
                                            alt="Analysis"
                                            image={Unbias_Employer_04}
                                            className={css.unbiasImg04}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} className={clsx(css.gridBox, css.gridBoxDown)}>
                                <Grid container className={css.box} spacing={0}>
                                    <Grid item xs={12} className={css.gridNumber}>
                                        <Typography className={classes.numberTxt}>05</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridTitle}>
                                        <Typography className={css.title}>{t('saveSomeMoney')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridDesc}>
                                        <Typography className={css.description}>{t('saveSomeMoneyDesc')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridUnbiasImg03}>
                                        <CardMedia
                                            component="img"
                                            alt="Pig"
                                            image={Unbias_Employer_05}
                                            className={css.unbiasImg03}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} className={clsx(css.gridBoxLeft, css.gridBoxDown)}>
                                <Grid container className={css.box} spacing={0}>
                                    <Grid item xs={12} className={css.gridNumber}>
                                        <Typography className={classes.numberTxt}>06</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridTitle}>
                                        <Typography className={css.title}>{t('congratulations')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridDesc}>
                                        <Typography className={css.description}>{t('congratulationsDesc')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridUnbiasImgRight}>
                                        <CardMedia
                                            component="img"
                                            alt="HandShake"
                                            image={Unbias_Employer_06}
                                            className={css.unbiasImg06}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                {isMobile && (
                    <ScrollbarRoot
                        direction="rtl"
                        sx={{
                            width: '100%',
                            height: '320px',
                            '& .simplebar-content': {
                                height: '320px%',
                            },
                        }}>
                        <Grid container wrap="nowrap">
                            <Grid item xs="auto" className={css.gridBox}>
                                <Grid container className={css.box} spacing={0}>
                                    <Grid item xs={12} className={css.gridNumber}>
                                        <Typography className={classes.numberTxt}>01</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridTitle}>
                                        <Typography className={css.title}>{t('automatedSelective')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridDesc}>
                                        <Typography className={css.description}>
                                            {t('permanentCandidatesDesc')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridUnbiasImg}>
                                        <CardMedia
                                            component="img"
                                            alt="ComputerTable"
                                            image={Unbias_Employer_01}
                                            className={css.unbiasImg01}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs="auto" className={css.gridBoxLeft}>
                                <Grid container className={css.box} spacing={0}>
                                    <Grid item xs={12} className={css.gridNumber}>
                                        <Typography className={classes.numberTxt}>02</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridTitle}>
                                        <Typography className={css.title}>{t('atificialIntelligence')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridDesc}>
                                        <Typography className={css.description}>{t('aritificialDesc')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridUnbiasImgRight}>
                                        <CardMedia
                                            component="img"
                                            alt="Ai"
                                            image={Unbias_Employer_02}
                                            className={css.unbiasImg02}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs="auto" className={clsx(css.gridBoxLeft, css.gridBoxDown)}>
                                <Grid container className={css.box} spacing={0}>
                                    <Grid item xs={12} className={css.gridNumber}>
                                        <Typography className={classes.numberTxt}>03</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridTitle}>
                                        <Typography className={css.title}>{t('reduceRecruitmentBias')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridDesc}>
                                        <Typography className={css.description}>
                                            {t('reduceRecruitmentDesc')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridUnbiasImg03}>
                                        <CardMedia
                                            component="img"
                                            alt="ComputerTable"
                                            image={Unbias_Employer_03}
                                            className={css.unbiasImg03}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs="auto" className={clsx(css.gridBoxLeft, css.gridBoxDown)}>
                                <Grid container className={css.box} spacing={0}>
                                    <Grid item xs={12} className={css.gridNumber}>
                                        <Typography className={classes.numberTxt}>04</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridTitle}>
                                        <Typography className={css.title}>{t('realTimeData')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridDesc}>
                                        <Typography className={css.description}>{t('realTimeDataDesc')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridUnbiasImgRight}>
                                        <CardMedia
                                            component="img"
                                            alt="Analysis"
                                            image={Unbias_Employer_04}
                                            className={css.unbiasImg04}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs="auto" className={clsx(css.gridBoxLeft, css.gridBoxDown)}>
                                <Grid container className={css.box} spacing={0}>
                                    <Grid item xs={12} className={css.gridNumber}>
                                        <Typography className={classes.numberTxt}>05</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridTitle}>
                                        <Typography className={css.title}>{t('saveSomeMoney')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridDesc}>
                                        <Typography className={css.description}>{t('saveSomeMoneyDesc')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridUnbiasImg03}>
                                        <CardMedia
                                            component="img"
                                            alt="Pig"
                                            image={Unbias_Employer_05}
                                            className={css.unbiasImg03}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs="auto" className={clsx(css.gridBoxLeft, css.gridBoxDown)}>
                                <Grid container className={css.box} spacing={0}>
                                    <Grid item xs={12} className={css.gridNumber}>
                                        <Typography className={classes.numberTxt}>06</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridTitle}>
                                        <Typography className={css.title}>{t('congratulations')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridDesc}>
                                        <Typography className={css.description}>{t('congratulationsDesc')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridUnbiasImgRight}>
                                        <CardMedia
                                            component="img"
                                            alt="HandShake"
                                            image={Unbias_Employer_06}
                                            className={css.unbiasImg06}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ScrollbarRoot>
                )}
            </Grid>

            <Grid item xs={12} className={css.trustedGrid}>
                <Grid container className={clsx(css.container, css.content2, css.maxScreen)} sx={{ display: 'flex' }}>
                    <Trusted />
                </Grid>
            </Grid>
            <Grid item xs={12} className={css.gridStopMatching}>
                <Grid container className={clsx(css.container)} sx={{ display: 'flex' }}>
                    <StopSearching2 />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container className={clsx(css.container, css.maxScreen)} sx={{ display: 'flex' }}>
                    <Candidates isSecundary />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ForEmployer;
