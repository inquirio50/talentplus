import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TextFieldComponent from '../common/TextFieldComponent';
import StyledBtnComponent from '../common/StyledBtnComponent';
import { RootState } from '../../store/store';
import { forgotPassword } from '../../store/reducers/auth/authActions';
import MessageModal from '../common/MessageModal';
import Header from '../landingPage/Header';
import globalStyles from '../../config/globalCss';

const styles: any = makeStyles(() => ({
    container: {
        margin: 'auto',
        justifyContent: 'center',
    },
    gridField: {
        paddingTop: '31px',
    },
}));

const ForgetPassword = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const classes = globalStyles();
    const css = styles();

    const { loading } = useSelector((state: RootState) => ({
        loading: state.authentication.loading,
    }));

    const onSubmit = (event: any) => {
        event.preventDefault();
        dispatch(forgotPassword(email));
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
                                            <Typography className={classes.title}>{t('forgotPassword')}</Typography>
                                        </Grid>
                                        <Grid item xs={12} className={css.gridField}>
                                            <TextFieldComponent
                                                id="email"
                                                label={t('emailAddress')}
                                                name="email"
                                                placeholder={t('emailAddress')}
                                                handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    setEmail(e.target.value)
                                                }
                                                value={email}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Box>
                            <CardActions>
                                <Grid container sx={{ paddingLeft: '16px', paddingBottom: '16px' }}>
                                    <Grid item xs={12}>
                                        <StyledBtnComponent loading={loading} isSubmit title={t('Submit')} />
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

export default ForgetPassword;
