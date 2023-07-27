import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Divider, Grid, linearProgressClasses, Typography } from '@mui/material';
import clsx from 'clsx';
import globalStyles from '../../../config/globalCss';
import StyledBtnComponent from '../StyledBtnComponent';
import PercentageBarBox from './PercentageBarBox';

const styles: any = makeStyles((theme: Theme) => ({
    box: {
        background: theme.palette.common.white,
        boxShadow: '-5px -5px 8px rgba(0, 0, 0, 0.04), 4px 5px 8px rgba(0, 0, 0, 0.08)',
        borderRadius: '20px',
    },
    boxMatchCount: {
        height: '100%',
        width: 326,
    },
    paddingMatchBox: {
        padding: '20px 23px 20px 23px',
    },
    titleMatchBox: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 15,
        lineHeight: '18px',
        color: theme.palette.common.black,
        textAlign: 'justify',
    },
    gridBars: {
        paddingTop: '16px',
    },
    matchDesc: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        color: theme.palette.common.black,
    },
    greenLinearProgress: {
        height: 6,
        borderRadius: '10px 0px 0px 10px',
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: '#2E7D32',
        },
    },
    matchNumber: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 10,
        color: theme.palette.common.black,
    },
    gridBarSpace: {
        paddingLeft: '16px',
    },
    redLinearProgress: {
        height: 6,
        borderRadius: '10px 0px 0px 10px',
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: '#D32F2F',
        },
    },
    darkRedLinearProgress: {
        height: 6,
        borderRadius: '10px 0px 0px 10px',
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: '#B0056',
        },
    },
}));

const CardAcceptedDeclined = ({
    accepted,
    declined,
    pending,
    title,
}: {
    accepted: number;
    declined: number;
    pending: number;
    title: string;
}) => {
    const { t } = useTranslation();
    const classes = globalStyles();
    const css = styles();
    return (
        <Grid container className={clsx(css.box, css.boxMatchCount)}>
            <Grid container onClick={() => {}} className={css.paddingMatchBox}>
                <Grid container>
                    <Grid container sx={{ paddingBottom: '16px' }}>
                        <Grid item xs={6} margin="auto">
                            <Typography className={css.titleMatchBox}>{title}</Typography>
                        </Grid>
                        <Grid item xs={6} justifyContent="flex-end" margin="auto" textAlign="end">
                            <StyledBtnComponent
                                title={t('view')}
                                handleOnClick={() => {}}
                                classesName={classes.btnLinks}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ color: '#E8E8E8' }} />
                    <Grid container className={css.gridBars}>
                        <Grid item xs={12}>
                            <PercentageBarBox
                                css={{
                                    titlePercentage: css.matchDesc,
                                    greenLinearProgress: css.greenLinearProgress,
                                    percentagemString: css.matchNumber,
                                    gridBarSpace: css.gridBarSpace,
                                }}
                                title={t('accepted')}
                                percentage={accepted}
                                percentageString="128"
                            />
                        </Grid>
                        <Grid item xs={12} className={css.gridBars}>
                            <PercentageBarBox
                                css={{
                                    titlePercentage: css.matchDesc,
                                    greenLinearProgress: css.redLinearProgress,
                                    percentagemString: css.matchNumber,
                                    gridBarSpace: css.gridBarSpace,
                                }}
                                title={t('declined')}
                                percentage={declined}
                                percentageString="264"
                            />
                        </Grid>
                        <Grid item xs={12} className={css.gridBars}>
                            <PercentageBarBox
                                css={{
                                    titlePercentage: css.matchDesc,
                                    greenLinearProgress: css.darkRedLinearProgress,
                                    percentagemString: css.matchNumber,
                                    gridBarSpace: css.gridBarSpace,
                                }}
                                title={t('pending')}
                                percentage={pending}
                                percentageString="192"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CardAcceptedDeclined;
