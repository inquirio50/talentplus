import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Header from '../../landingPage/Header';
import { ConsultantIcon, EmployerIcon, NextIcon } from '../../icons/Icons';

import { REGISTER_CANDIDATE_ROUTE } from '../../../routes/routes';
import globalStyles from '../../../config/globalCss';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex',
        boxSizing: 'border-box',
    },
    gridBox: {
        paddingTop: '93px',
        boxSizing: 'border-box',
    },
    innerContainer: {
        padding: '50px',
        gap: '10px',
        position: 'absolute',
        maxWidth: '750px',
        width: '100%',
        height: 'auto',
        border: 'none',
        borderRadius: '10px',
        boxSizing: 'border-box',
        [theme.breakpoints.down('sm')]: {
            padding: '1.5rem',
        },
    },
    box: {
        padding: '40px',
        width: '690px',
        height: '197px',
        boxSizing: 'border-box',
        borderRadius: '10px',
        '&:hover': {
            fontSize: 22,
            boxSizing: 'border-box',
            border: '1px solid #EB078C',
        },
        gap: '10px',
        background: 'rgba(247, 247, 247, 0.5)',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            maxWidth: 'unset',
            height: 'auto',
        },
    },
    txt: {
        paddingTop: '16px',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '24px',
        color: theme.palette.common.black,
    },
    gridBoxSpacing: {
        marginTop: '24px',
    },
    gridLimit: {
        maxWidth: '400px',
        margin: 'auto',
        [theme.breakpoints.down('md')]: {
            maxWidth: 'unset',
            margin: 0,
        },
    },
    iconContainer: {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'start',
            marginBottom: '2rem',
        },
    },
}));

const TypeRegister = () => {
    const css = styles();
    const classes = globalStyles();
    const { t } = useTranslation();
    const history = useNavigate();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12} className={css.gridBox}>
                <Grid container className={css.container}>
                    <Grid item xs={12} className={css.innerContainer}>
                        <Grid container className={css.box}>
                            <Grid item md={1.5} sm={12} xs={12} className={css.iconContainer}>
                                <ConsultantIcon fontSize="large" />
                            </Grid>
                            <Grid item md={8.5} sm={8} xs={8} className={css.gridLimit}>
                                <Typography className={classes.title}>{t('Iwantwork')}</Typography>

                                <Typography className={css.txt}>{t('IwantworkDescription')}</Typography>
                            </Grid>
                            <Grid
                                item
                                onClick={() => {
                                    history(REGISTER_CANDIDATE_ROUTE);
                                }}
                                md={2}
                                sm={3}
                                xs={3}
                                sx={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <NextIcon />
                            </Grid>
                        </Grid>

                        <Grid container className={clsx(css.box, css.gridBoxSpacing)}>
                            <Grid item md={1.5} sm={12} xs={12} className={css.iconContainer}>
                                <EmployerIcon fontSize="large" />
                            </Grid>
                            <Grid item md={8.5} sm={8} xs={8} className={css.gridLimit}>
                                <Typography className={classes.title}>{t('Iwantemploy')}</Typography>
                                <Typography className={css.txt}>{t('IwantemployDescription')}</Typography>
                            </Grid>
                            <Grid
                                item
                                md={2}
                                sm={3}
                                xs={3}
                                onClick={() =>
                                    window.open(
                                        'https://meetings.hubspot.com/frederik-gauthier',
                                        '_blank',
                                        'noreferrer'
                                    )
                                }
                                sx={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <NextIcon />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TypeRegister;
