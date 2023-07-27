import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { CardMedia, Grid, Typography, useMediaQuery } from '@mui/material';
import clsx from 'clsx';
import AboutUsImg from '../../../assets/images/landingPage/aboutUsImg.png';
import OurVision from '../../../assets/images/landingPage/ourVision.png';
import OurValues from '../../../assets/images/landingPage/ourValues.png';
import MeetTeam from './MeetTeam';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        margin: 'auto',
        justifyContent: 'center',
        backgroundColor: theme.palette.backgroundGray,
    },
    content: {
        maxWidth: 1300,
        margin: '0 auto',
        padding: '4rem',
        [theme.breakpoints.down('md')]: {
            padding: '55px 28.5px 24px 28.5px',
            maxWidth: '100%',
        },
    },
    backgroundContent: {
        backgroundColor: theme.palette.backgroundGray,
    },
    gridArtificialTxt: {
        [theme.breakpoints.down('md')]: {
            maxWidth: 'unset',
        },
    },
    aboutUsImg: {
        // maxWidth: '800px',
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        [theme.breakpoints.down('md')]: {
            height: 'auto',
        },
    },
    artificialInteligenceIcon: {
        width: '100%',
        height: '100%',
    },
    artificialInteligenceTitle: {
        color: theme.palette.titleDarkRed,
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '24px',
        lineHeight: '28.8px',
    },
    gridArtificialInteligenceDesc: {
        paddingTop: '16px',
        maxWidth: '491px',
        [theme.breakpoints.down('md')]: {
            maxWidth: 'unset',
        },
    },
    artificialInteligenceDesc: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '1.5',
        color: theme.palette.common.black,
        [theme.breakpoints.down('md')]: {
            fontSize: 16,
            lineHeight: '24px',
        },
    },
    gridAboutImg: {
        // paddingLeft: '53px',
        [theme.breakpoints.down('md')]: {
            paddingLeft: 'unset',
            paddingTop: '16px',
        },
    },
    gridOurStory: {
        paddingTop: '100px',
        [theme.breakpoints.down('md')]: {
            paddingTop: '44px',
        },
    },
    titleOurStory: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '2.5rem',
        color: theme.palette.titleDarkRed,
        [theme.breakpoints.down('md')]: {
            fontSize: '1.8rem',
        },
    },
    txtDescOurStory: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 15,
        lineHeight: '22.5px',
        color: theme.palette.common.black,
        [theme.breakpoints.down('md')]: {
            fontSize: 14,
            lineHeight: '21px',
        },
    },
    paddingBtnParagraphs: {
        paddingTop: '24px',
        [theme.breakpoints.down('md')]: {
            paddingTop: '16px',
        },
    },
    gridStoryDesc: {
        maxWidth: '550px',
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
        },
    },
    gridSecondColumn: {
        paddingLeft: '100px',
        maxWidth: '550px',
        [theme.breakpoints.down('md')]: {
            paddingLeft: 'unset',
            maxWidth: '100%',
        },
    },
    gridValues: {
        [theme.breakpoints.down('md')]: {
            backgroundColor: '#F3F3F3',
        },
    },
    contentValue: {
        maxWidth: 1300,
        margin: '0 auto',
        padding: '3rem',
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
            padding: '2rem',
        },
    },
    box: {
        width: '564px',
        maxWidth: '564px',
        maxHeight: '300px',
        height: '300px',
        borderRadius: '20px',
        padding: '44px 16px 0px 40px',
        [theme.breakpoints.down('md')]: {
            maxWidth: 'unset',
            maxHeight: 'unset',
            padding: '2rem',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '110vw',
            maxHeight: '450px',
        },
    },
    boxValues: {
        backgroundColor: '#F3F3F3',
    },
    boxVision: {
        backgroundColor: '#F3F3F3',
    },
    titleBox: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 24,
        lineHeight: '28.64px',
        color: theme.palette.titleDarkRed,
        [theme.breakpoints.down('md')]: {
            fontSize: 18,
            lineHeight: '21.48px',
        },
    },
    gridDescBox: {
        paddingTop: '16px',
        maxWidth: '280px',
        [theme.breakpoints.down('md')]: {
            maxWidth: 'unset',
        },
    },
    descBox: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 15,
        lineHeight: '22.5px',
        color: theme.palette.common.black,
        [theme.breakpoints.down('md')]: {
            fontSize: 14,
            lineHeight: '21px',
        },
    },
    descBoxValues: {
        maxWidth: '280px',
    },
    descBoxVision: {
        maxWidth: '331px',
    },
    gridImgValue: {
        margin: 'auto',
        justifyContent: 'flex-end',
        display: 'flex',
        marginTop: '-34px',
        [theme.breakpoints.down('md')]: {
            marginTop: 'unset',
            paddingTop: '51px',
        },
    },
    imgValues: {
        width: '100px',
        height: '100px',
        objectFit: 'contain',
        [theme.breakpoints.down('md')]: {
            width: '100px',
            height: '100px',
        },
    },
    gridVisionLg: {
        paddingLeft: '50px',
        width: '564px',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            paddingLeft: '0',
            marginTop: '3rem',
        },
    },
    imgVision: {
        width: '100px',
        height: '100px',
        objectFit: 'contain',
        [theme.breakpoints.down('md')]: {
            width: '100px',
            height: '100px',
        },
    },
    gridImgVision: {
        margin: 'auto',
        justifyContent: 'flex-end',
        display: 'flex',
        marginTop: '-127px',
        [theme.breakpoints.down('md')]: {
            marginTop: 'unset',
            paddingTop: '51px',
        },
    },
    boxVisionMobile: {
        marginTop: '16px',
        marginBottom: '24px',
    },
    headingText: {
        fontSize: '3rem',
        fontWeight: 900,
        lineHeight: '1.2',
        color: theme.palette.common.black,
        '& .colored': {
            color: '#EB078C',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1.8rem',
        },
    },
    visionBox: {
        position: 'relative',
        height: '100%',
        width: '100%',
    },
    visionBoxIcon: {
        position: 'absolute',
        bottom: '10%',
        right: '5%',
    },
}));

const AboutUs = () => {
    const css = styles();
    const { t } = useTranslation();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    return (
        <Grid container className={css.container}>
            <Grid item xs={12} className={clsx(css.content, css.backgroundContent)}>
                <Grid container width="100%">
                    <Grid item xs={isMobile ? 12 : 6} className={css.gridArtificialTxt}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={css.headingText} component="h1">
                                    <span className="colored">{t('Artificial Intelligence')}</span> <br />{' '}
                                    {t('at the heart of the Reelcruit model.')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={css.gridArtificialInteligenceDesc}>
                                <Typography className={css.artificialInteligenceDesc}>
                                    {t('artificialInteligenceDesc')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={isMobile ? 12 : 6} className={css.gridAboutImg}>
                        <CardMedia component="img" alt="AboutUs" image={AboutUsImg} className={css.aboutUsImg} />
                    </Grid>
                    <Grid item xs={12} className={css.gridOurStory}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={css.titleOurStory}>{t('ourStory')}</Typography>
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6} className={css.gridStoryDesc}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography
                                            component="p"
                                            className={clsx(css.txtDescOurStory, css.paddingBtnParagraphs)}>
                                            {t('thePandemicMade')}
                                        </Typography>
                                        <Typography
                                            component="p"
                                            className={clsx(css.txtDescOurStory, css.paddingBtnParagraphs)}>
                                            {t('foundedByRalph')}
                                        </Typography>
                                        <Typography
                                            component="p"
                                            className={clsx(css.txtDescOurStory, css.paddingBtnParagraphs)}>
                                            {t('recruitmentIndustry')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6} className={css.gridSecondColumn}>
                                <Typography
                                    component="p"
                                    className={clsx(css.txtDescOurStory, css.paddingBtnParagraphs)}>
                                    {t('appropriationAndSegmentation')}
                                </Typography>
                                <Typography
                                    component="p"
                                    className={clsx(css.txtDescOurStory, css.paddingBtnParagraphs)}>
                                    {t('webelieveThatOur')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={clsx(css.gridValues, css.backgroundContent)}>
                <Grid container className={clsx(css.container, css.contentValue)}>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={clsx(css.box, css.boxValues)}>
                        <Grid container className={css.visionBox} alignContent="start">
                            <Grid item xs={12}>
                                <Typography className={css.titleBox}>{t('ourValues')}</Typography>
                            </Grid>
                            <Grid item xs={12} className={css.gridDescBox}>
                                <Typography className={clsx(css.descBox, css.descBoxValues)}>
                                    {t('ourValuesDesc')}
                                </Typography>
                            </Grid>

                            <CardMedia
                                component="img"
                                alt="Values"
                                image={OurValues}
                                className={clsx(css.visionBoxIcon, css.imgValues)}
                            />
                        </Grid>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} className={css.gridVisionLg}>
                        <Grid container className={css.visionBox} alignContent="start">
                            <Grid item xs={12} className={clsx(css.box, css.boxVision)}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography className={css.titleBox}>{t('ourVision')}</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={css.gridDescBox}>
                                        <Typography className={clsx(css.descBox, css.descBoxVision)}>
                                            {t('ourVisionDesc')}
                                        </Typography>
                                    </Grid>

                                    <CardMedia
                                        component="img"
                                        alt="Values"
                                        image={OurVision}
                                        className={clsx(css.visionBoxIcon, css.imgVision)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <MeetTeam />
            </Grid>
        </Grid>
    );
};

export default AboutUs;
