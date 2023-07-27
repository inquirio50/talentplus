import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Card, CardActions, CardContent, Grid, Link, Theme, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import TextFieldComponent from '../common/TextFieldComponent';
import {
    FORGET_PASSWORD_ROUTE,
    ADMIN_DASHBOARD_ROUTE,
    CANDIDATE_DASHBOARD_ROUTE,
    RECRUITER_DASHBOARD_ROUTE,
    MAIN_ROUTE,
} from '../../routes/routes';
import StyledBtnComponent from '../common/StyledBtnComponent';
import { RootState } from '../../store/store';
import {
    loginUser,
    setFinishSignUp,
    resendConfirmationEmail,
    initializeLogin,
} from '../../store/reducers/auth/authActions';
import { ADMIN_ROLE, CONSULTANT_ROLE, PERMANENT_ROLE, EMPLOYER_ROLE, RECRUITER_ROLE } from '../../config/constants';
import MessageModal from '../common/MessageModal';
import { autoRefreshPage, updateServiceWorker } from '../../serviceWorker';
import { refreshApp } from '../../store/reducers/genericActions';
import AppRefreshSnackBar from '../common/SnackBarTopMsg';
import globalStyles from '../../config/globalCss';
import Header from '../landingPage/Header';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        minHeight: '100%',
        margin: 'auto',
        justifyContent: 'center',
    },
    gridField: {
        paddingTop: '31px',
    },
    wrapper: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: 1,
        display: 'grid',
        placeItems: 'center',
    },
    cardContainer: {
        width: '90vw',
        maxWidth: 440,
        margin: 'auto',
        padding: '2rem',
        [theme.breakpoints.down('sm')]: {
            padding: '1.5rem',
        },
    },
}));

const Login = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useNavigate();
    const classes = globalStyles();
    const css = styles();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { accessToken, loading, isAuthenticated, user, finishSignUp, isEmailConfirmed } = useSelector(
        (state: RootState) => ({
            layout: state.authentication.layout,
            user: state.authentication.user,
            loading: state.authentication.loading,
            isAuthenticated: state.authentication.isAuthenticated,
            accessToken: state.authentication.accessToken,
            finishSignUp: state.authentication.finishSignUp,
            isEmailConfirmed: state.authentication.isEmailConfirmed,
        })
    );

    const handleChange = (type: string) => (event: any) => {
        const { value } = event.target;
        if (type === 'usernameOrEmail') {
            setLogin(value);
        }
        if (type === 'password') {
            setPassword(value);
        }
    };

    const handleResendLink = (event: any) => {
        event.preventDefault();
        dispatch(resendConfirmationEmail(login));
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        dispatch(loginUser(login, password));
    };

    useEffect(() => {
        if (finishSignUp) {
            dispatch(setFinishSignUp(false));
        }
    }, [finishSignUp]);

    useEffect(() => {
        dispatch(initializeLogin());
    }, []);

    useEffect(() => {
        if (isAuthenticated && accessToken) {
            if (user?.role === ADMIN_ROLE) {
                history(ADMIN_DASHBOARD_ROUTE);
            } else if (user?.role === CONSULTANT_ROLE || user?.role === PERMANENT_ROLE) {
                history(CANDIDATE_DASHBOARD_ROUTE);
            } else if (user?.role === RECRUITER_ROLE || user?.role === EMPLOYER_ROLE) {
                history(RECRUITER_DASHBOARD_ROUTE);
            } else {
                history(MAIN_ROUTE);
            }
        }

        setInterval(() => {
            // Check server every 30s for service worker update
            updateServiceWorker();
        }, 30000);

        autoRefreshPage();

        // Open Refresh Message Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.oncontrollerchange = () => {
                dispatch(refreshApp(true));
            };
        }
    }, [isAuthenticated, accessToken]);

    return (
        <div className={css.wrapper}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12} component="main" className={css.content}>
                <Grid
                    container
                    className={css.container}
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center">
                    <form onSubmit={onSubmit}>
                        <Card elevation={16} className={css.cardContainer}>
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography className={classes.title}>{t('welcomeBack')}</Typography>
                                        </Grid>
                                        <Grid item xs={12} className={css.gridField}>
                                            <TextFieldComponent
                                                id="usernameOrEmail"
                                                label={t('usernameOrEmail')}
                                                name="usernameOrEmail"
                                                placeholder={t('usernameOrEmail')}
                                                handleChange={handleChange('usernameOrEmail')}
                                                value={login}
                                                autoCompleteInput="username"
                                            />
                                        </Grid>
                                        <Grid item xs={12} className={css.gridField}>
                                            <TextFieldComponent
                                                id="password"
                                                label={t('password')}
                                                name="password"
                                                placeholder={t('password')}
                                                type="password"
                                                value={password}
                                                handleChange={handleChange('password')}
                                                autoCompleteInput="current-password"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Link
                                                color="textSecondary"
                                                variant="body2"
                                                href={FORGET_PASSWORD_ROUTE}
                                                sx={{ textDecoration: 'none' }}>
                                                <Typography className={classes.txtLinkBtn}>
                                                    {t('Forgot your password?')}
                                                </Typography>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Box>
                            <CardActions>
                                <Grid container>
                                    <Grid item xs={isEmailConfirmed ? 12 : 5}>
                                        <StyledBtnComponent
                                            loading={loading}
                                            isSubmit
                                            title={t('login')}
                                            red
                                            btHeight="50px"
                                            btWidth="131px"
                                        />
                                    </Grid>
                                    {!isEmailConfirmed && (
                                        <Grid item xs={7} sx={{ textAlign: 'center', size: '10px' }}>
                                            <StyledBtnComponent
                                                handleOnClick={handleResendLink}
                                                title={t('ResendConfirmationLink')}
                                                red
                                                btHeight="50px"
                                                btWidth="131px"
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                            </CardActions>
                        </Card>
                    </form>
                </Grid>
            </Grid>
            <MessageModal />
            <AppRefreshSnackBar />
        </div>
    );
};

export default Login;
