import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import StyledBtnComponent from '../../common/StyledBtnComponent';
import globalStyles from '../../../config/globalCss';
import { LOGIN_ROUTE } from '../../../routes/routes';
import BackgroundCongrats from '../../../assets/images/landingPage/backgroundCongrats.png';
import Shapes from '../../../assets/images/landingPage/shapes.png';

const styles: any = makeStyles((theme: Theme) => ({
    gridTxt: {
        paddingTop: '20px',
    },
    gridDesc: {
        paddingTop: '16px',
    },
    description: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 16,
        lineHeight: '24px',
        color: theme.palette.common.black,
        maxWidth: '290px',
        textAlign: 'center',
    },
    gridBtn: {
        paddingTop: '51.5px',
    },
    background: {
        background: `url(${BackgroundCongrats}) 0% 126%  no-repeat`,
        backgroundSize: '100%',
        [theme.breakpoints.down('lg')]: {
            background: `url(${BackgroundCongrats}) 83% 0%  no-repeat`,
            backgroundSize: '181%',
        },
        height: '554px',
    },
    bgImgShapes: {
        background: `url(${Shapes}) 241% 44%  no-repeat`,
        backgroundSize: '80%',
        [theme.breakpoints.down('lg')]: {
            background: `url(${Shapes}) 49% 7%  no-repeat`,
            backgroundSize: '17%',
        },
        height: '628px',
    },
}));

const RegisterSuccess = () => {
    const { t } = useTranslation();
    const classes = globalStyles();
    const css = styles();
    const history = useNavigate();

    const handleLogin = () => {
        history(LOGIN_ROUTE);
    };

    return (
        <Grid container>
            <Grid item xs={12} className={css.background}>
                <Grid container>
                    <Grid item xs={12} className={css.bgImgShapes}>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            style={{ minHeight: '100vh' }}>
                            <Grid item xs={12}>
                                <CheckCircleOutlineIcon fontSize="large" sx={{ color: '#15C077' }} />
                            </Grid>
                            <Grid item xs={12} className={css.gridTxt}>
                                <Typography className={classes.title}>{t('congratulations')}</Typography>
                            </Grid>
                            <Grid item xs={12} className={css.gridDesc}>
                                <Typography className={css.description}>{t('youHaveSuccessfully')}</Typography>
                            </Grid>
                            <Grid item xs={12} className={css.gridBtn}>
                                <StyledBtnComponent title={t('startMatching')} handleOnClick={handleLogin} red />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default RegisterSuccess;
