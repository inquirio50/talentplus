import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { Theme } from '@mui/system';
import TextFieldComponent from '../common/TextFieldComponent';
import StyledBtnComponent from '../common/StyledBtnComponent';
import { RootState } from '../../store/store';
import MessageModal from '../common/MessageModal';
import { LOGIN_ROUTE } from '../../routes/routes';
import User from '../../models/user';
import { failMessageModal } from '../../store/reducers/genericActions';
import { passwordValidation } from '../helpers/utilityFunctions';
import { resetPassword } from '../../store/reducers/auth/authActions';
import { CONFIRM_PASSWORD, PASSWORD } from '../../config/constants';
import useQuery from '../../hooks/useQuery';
import Header from '../landingPage/Header';
import globalStyles from '../../config/globalCss';
import PasswordCheck from '../common/PasswordCheck';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        margin: 'auto',
        justifyContent: 'center',
    },
    padding16: {
        paddingTop: '16px',
    },
    padding31: {
        paddingTop: '31px',
        [theme.breakpoints.down('lg')]: {
            paddingTop: '19px',
        },
    },
    gridFields: {
        maxWidth: '460px',
        [theme.breakpoints.down('lg')]: {
            maxWidth: '360px',
        },
    },
}));

const ResetPassword = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useNavigate();
    const classes = globalStyles();
    const css = styles();
    const params = { email: useQuery().get('email') as string, token: useQuery().get('token') as string };
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disabledBtn, setDisableBtn] = useState(true);
    const [msgErr, setMsgErr] = useState<Map<string, string> | null>();

    const { loading, passwordReset } = useSelector((state: RootState) => ({
        loading: state.authentication.loading,
        passwordReset: state.authentication.passwordReset,
    }));

    useEffect(() => {
        if (!params?.email || !params.token) {
            // history(LOGIN_ROUTE);
        }
    }, [params]);

    useEffect(() => {
        if (passwordReset) {
            history(LOGIN_ROUTE);
        }
    }, [passwordReset]);

    const handleChange = (type: string) => (event: any) => {
        const { value } = event.target;
        let newPassword = password;
        let newConfirmPassword = confirmPassword;
        if (type === 'password') {
            newPassword = value;
            setPassword(value);
        }
        if (type === 'confirmPassword') {
            newConfirmPassword = value;
            setConfirmPassword(value);
        }
        const errPass = passwordValidation(newPassword, newConfirmPassword, t);
        const errTxtConfirm = errPass.get(CONFIRM_PASSWORD);
        const errTxtPassword = errPass.get(PASSWORD);
        if (errTxtConfirm !== '' || errTxtPassword !== '') {
            setMsgErr(errPass);
        } else {
            setMsgErr(null);
            setDisableBtn(false);
        }
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        if (msgErr) {
            const errTxtConfirm = msgErr.get(CONFIRM_PASSWORD);
            const errTxtPassword = msgErr.get(PASSWORD);
            const errTxtPasswordTest = errTxtPassword !== '' ? errTxtPassword : '';
            const errMessage = errTxtConfirm !== '' ? errTxtPassword : errTxtPasswordTest;
            dispatch(failMessageModal(t(errMessage || '')));
        } else {
            const user: User = {
                email: encodeURIComponent(params?.email),
                token: params?.token,
                password,
            };
            dispatch(resetPassword(user));
        }
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12} component="main">
                <Grid
                    container
                    className={css.container}
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}>
                    <form onSubmit={onSubmit}>
                        <Card elevation={16} sx={{ p: 4, maxWidth: 440 }}>
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
                                            <Typography className={classes.title}>{t('resetPassword')}</Typography>
                                        </Grid>
                                        <Grid item xs={12} className={clsx(css.padding31, css.gridFields)}>
                                            <TextFieldComponent
                                                id="password"
                                                label={t('password')}
                                                name="password"
                                                placeholder={t('passwordPlaceholder')}
                                                type="password"
                                                value={password}
                                                handleChange={handleChange('password')}
                                                required
                                                autoCompleteInput="new-password"
                                            />
                                        </Grid>
                                        <Grid item xs={12} className={clsx(css.padding31, css.gridFields)}>
                                            <TextFieldComponent
                                                id="confirmPassword"
                                                label={t('confirmPassword')}
                                                name="confirmPassword"
                                                placeholder={t('confirmPassword')}
                                                type="password"
                                                value={confirmPassword}
                                                handleChange={handleChange('confirmPassword')}
                                                autoCompleteInput="new-password"
                                            />
                                        </Grid>
                                        <Grid item xs={12} className={css.padding16} sx={{ textAlign: 'justify' }}>
                                            <PasswordCheck
                                                password={password || ''}
                                                confirmPassword={confirmPassword || ''}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Box>
                            <CardActions>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <StyledBtnComponent
                                            disabled={disabledBtn}
                                            loading={loading}
                                            isSubmit
                                            title={t('resetPassword')}
                                            red
                                        />
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </form>
                </Grid>
            </Grid>
            <MessageModal />
        </Grid>
    );
};

export default ResetPassword;
