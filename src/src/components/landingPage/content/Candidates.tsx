/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Avatar, CardMedia, Grid, styled, Typography, useMediaQuery } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import clsx from 'clsx';
import SimpleBar from 'simplebar-react';
import { UserCircle } from '../../icons/Icons';
import QuoteOpen from '../../../assets/images/landingPage/quoteOpen.png';
import QuoteClose from '../../../assets/images/landingPage/quoteClose.png';
import Candidate1 from '../../../assets/images/landingPage/candidate-1.png';
// @ts-ignore
import Candidate2 from '../../../assets/images/landingPage/candidate-2.jpg';
// @ts-ignore
import Candidate3 from '../../../assets/images/landingPage/candidate-3.jpg';
// @ts-ignore
import Candidate4 from '../../../assets/images/landingPage/candidate-4.jpeg';
import Candidate5 from '../../../assets/images/landingPage/candidate-5.png';
import Candidate6 from '../../../assets/images/landingPage/candidate-6.png';
// @ts-ignore
import Candidate7 from '../../../assets/images/landingPage/candidate-7.jpg';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: '#f3f3f3',
        justifyContent: 'center',
        display: 'flex',
        // height: '734px',
        width: '100%',
        boxSizing: 'border-box',
        [theme.breakpoints.down('lg')]: {
            height: 'auto',
        },
    },
    containerBackground: {
        backgroundColor: '#F3F3F3',
    },
    content: {
        padding: '100px 120px 100px 120px',
        [theme.breakpoints.down('lg')]: {
            padding: '3px 0px 30px 30px',
        },
    },
    gridTitle: {
        marginTop: '5rem',
        [theme.breakpoints.down('lg')]: {
            textAlign: 'start',
        },
    },
    titleTxt: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 36,
        lineHeight: '43px',
        color: theme.palette.titleDarkRed,
        [theme.breakpoints.down('lg')]: {
            fontSize: 24,
            lineHeight: '28.64px',
        },
    },
    gridCandidates: {
        paddingTop: '50px',
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex',
        paddingLeft: '16px',
        [theme.breakpoints.down('lg')]: {
            paddingTop: '24px',
            paddingRight: '30px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            height: '100%',
        },
    },
    boxCandidates: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        width: '700px',
        height: '450px',
        maxHeight: '490px',
        background: theme.palette.titleDarkRed,
        // boxShadow: '-10px 10px 50px rgba(0, 0, 0, 0.24)',
        borderRadius: '20px',
        padding: '3rem',
        [theme.breakpoints.down('md')]: {
            padding: '2rem',
            width: '500px',
            height: '100%',
            minHeight: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '1rem',
            width: '320px',
            height: '100%',
            minHeight: '100%',
        },
    },
    contentGrid: {
        textAlign: 'center',
        maxWidth: '1440px',
        margin: 'auto',
    },
    txtBoxCandidates: {
        textAlign: 'justify',
        [theme.breakpoints.down('lg')]: {
            width: '100%',
        },
    },
    gridTitleCandidate: {
        paddingTop: '16px',
    },
    title: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '1.2rem',
        lineHeight: '17px',
        textAlign: 'left',
        color: theme.palette.common.white,
    },
    gridSubTitleCandidate: {
        paddingTop: '4px',
    },
    subTitle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '14.52px',
        color: theme.palette.common.white,
    },
    gridImgQuoteOpen: {
        paddingTop: '22px',
    },
    commaImg: {
        width: '14px',
        height: '11px',
    },
    commaImgPos: {
        top: -5,
    },
    gridDesc: {
        paddingTop: '11px',
    },
    txtDesc: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '25px',
        textAlign: 'left',
        color: theme.palette.common.white,
        [theme.breakpoints.down('sm')]: {
            fontSize: 13,
            lineHeight: 1.5,
        },
    },
    scrollGrid: {
        width: '100%',
        height: '520px',
        maxHeight: '529px',
        marginBottom: '3rem',
        [theme.breakpoints.down('md')]: {
            maxHeight: 'none',
        },
    },
    heading: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingRight: '2rem',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: '17px',
        color: theme.palette.common.white,
        marginTop: '3rem',
    },
    headingText: {
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: '43px',
        color: theme.palette.titleDarkRed,
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem',
            lineHeight: '28.64px',
        },
    },
    pageButtons: {
        display: 'flex',
        gap: '1rem',
    },
    pageButton: {
        appearance: 'unset',
        border: 'none',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: '#E9E8E8',
        height: '3rem',
        width: '3rem',
        borderRadius: '0.5rem',
    },
}));

const ScrollbarRoot = styled(SimpleBar)``;

const GridBoxCandidates = ({
    css,
    name,
    title,
    testeminhal,
    image,
}: {
    css: any;
    name: string;
    title: string;
    testeminhal: string;
    image: string | undefined;
}) => (
    <Grid item xs={12} className={css.gridCandidates}>
        <Grid container className={css.boxCandidates}>
            <Grid item xs={12} className={css.txtBoxCandidates}>
                <Grid container>
                    <Grid item xs={12}>
                        <Avatar
                            alt="Reecruit 1"
                            sx={{
                                height: '5rem',
                                width: '5rem',
                            }}
                            src={image}
                        />
                    </Grid>
                    <Grid item xs={12} className={css.gridTitleCandidate}>
                        <Typography className={css.title}>{name}</Typography>
                    </Grid>
                    <Grid item xs={12} className={css.gridSubTitleCandidate}>
                        <Typography className={css.subTitle}>{title}</Typography>
                    </Grid>
                    <Grid item xs={12} className={css.gridImgQuoteOpen}>
                        <CardMedia component="img" alt="Quote" src={QuoteOpen} className={css.commaImg} />
                    </Grid>
                    <Grid item xs={12} className={css.gridDesc}>
                        <Typography className={css.txtDesc}>{testeminhal}</Typography>
                    </Grid>
                    <Grid item xs={12} justifyContent="flex-end" display="flex">
                        <CardMedia
                            component="img"
                            alt="Quote"
                            src={QuoteClose}
                            className={clsx(css.commaImg, css.commaImgPos)}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);

const Candidates = ({ isSecundary }: { isSecundary?: boolean }) => {
    const css = styles();
    const { t } = useTranslation();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    const handleSlideRight = () => {
        const scrollContainer = document.getElementById('scroll-container');
        if (typeof scrollContainer?.scrollLeft !== 'undefined') {
            scrollContainer.scrollTo({
                left: scrollContainer.scrollLeft + 350,
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    const handleSlideLeft = () => {
        const scrollContainer = document.getElementById('scroll-container');
        if (typeof scrollContainer?.scrollLeft !== 'undefined' && scrollContainer.scrollLeft !== 0) {
            scrollContainer.scrollTo({
                left: scrollContainer.scrollLeft - 350,
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Grid container className={clsx(css.container, !isSecundary ? css.containerBackground : '')}>
            <Grid item xs={12} className={css.content}>
                <Grid container className={css.contentGrid}>
                    <div className={css.heading}>
                        <Typography className={css.headingText}>
                            {isSecundary ? t('whatEmployersAreSaying') : t('whatCandidatesSaying')}
                        </Typography>

                        <div className={css.pageButtons}>
                            <button type="button" className={css.pageButton} onClick={handleSlideLeft}>
                                <ChevronLeftIcon />
                            </button>
                            <button type="button" className={css.pageButton} onClick={handleSlideRight}>
                                <ChevronRightIcon />
                            </button>
                        </div>
                    </div>
                    <ScrollbarRoot
                        direction="rtl"
                        scrollableNodeProps={{ id: 'scroll-container' }}
                        className={css.scrollGrid}
                        sx={{
                            width: '100%',
                            height: '100%',
                            '& .simplebar-content': {
                                height: '100%',
                            },
                        }}>
                        <Grid container wrap="nowrap" alignContent="stretch" height="100%">
                            {!isSecundary && (
                                <>
                                    <Grid item xs="auto" height="100%">
                                        <GridBoxCandidates
                                            css={css}
                                            name="Phoenix Hoang"
                                            title={t('seniorTech')}
                                            testeminhal={t('testimonialPhoenix')}
                                            image={Candidate1}
                                        />
                                    </Grid>
                                    <Grid item xs="auto" height="100%">
                                        <GridBoxCandidates
                                            css={css}
                                            name="Sonny Guénette "
                                            title={t('analystProgrammer')}
                                            testeminhal={t('testimonialSonny')}
                                            image={Candidate2}
                                        />
                                    </Grid>
                                    <Grid item xs="auto" height="100%">
                                        <GridBoxCandidates
                                            css={css}
                                            name="Yvens Chery"
                                            title={t('consultantDotNet')}
                                            testeminhal={t('testimonialYvens')}
                                            image={Candidate3}
                                        />
                                    </Grid>
                                    <Grid item xs="auto" height="100%">
                                        <GridBoxCandidates
                                            css={css}
                                            name="Sophia Adio"
                                            title={t('solutionsArchitect')}
                                            testeminhal={t('testimonialSophia')}
                                            image={Candidate4}
                                        />
                                    </Grid>
                                </>
                            )}
                            {isSecundary && (
                                <>
                                    <Grid item xs="auto" height="100%">
                                        <GridBoxCandidates
                                            css={css}
                                            name="Daniel Morissette"
                                            title={t('president')}
                                            testeminhal={t('testimonialDaniel')}
                                            image={Candidate5}
                                        />
                                    </Grid>
                                    <Grid item xs="auto" height="100%">
                                        <GridBoxCandidates
                                            css={css}
                                            name="Mariève Ménard‑Piazzolla CRIA"
                                            title={t('humanResources')}
                                            testeminhal={t('testimonialMarieve')}
                                            image={Candidate6}
                                        />
                                    </Grid>
                                    <Grid item xs="auto" height="100%">
                                        <GridBoxCandidates
                                            css={css}
                                            name="Anthony Guilhem"
                                            title={t('presidentMomentumm')}
                                            testeminhal={t('testimonialAnthony')}
                                            image={Candidate7}
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </ScrollbarRoot>
                </Grid>
            </Grid>
        </Grid>
    );
};

Candidates.defaultProps = {
    isSecundary: false,
};

export default Candidates;
