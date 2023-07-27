import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Divider,
    Grid,
    Typography,
    Link,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import useQuery from '../../hooks/useQuery';
import { LOGIN_ROUTE } from '../../routes/routes';
import { verifyEmailAction } from '../../store/reducers/auth/authActions';
import { RootState } from '../../store/store';
import LanguageTopApp from '../common/LanguageTopApp';
import MessageModal from '../common/MessageModal';
import AppRefreshSnackBar from '../common/SnackBarTopMsg';
import Logo from '../../assets/images/logo.png';
import { VerifyEmailDto } from '../../config/interfaces';
import { FAILED, SUCCESS, VERIFYING } from '../../config/constants';

const Status = {
    Verifying: VERIFYING,
    Failed: FAILED,
    Success: SUCCESS,
};

interface BodyProps {
    status: string;
    t: any;
}

const VerifyBody = ({ status, t }: BodyProps) => {
    switch (status) {
        case Status.Verifying:
            return <p className="mb-0 text-center">{t('verifying')}</p>;
        case Status.Failed:
            return (
                <Grid className="mb-0 text-center">
                    <Typography>{t('verifyFailed')}</Typography>
                </Grid>
            );
        case Status.Success:
            return (
                <Grid className="mb-0 text-center">
                    <Typography>{t('verifySuccess')}</Typography>
                </Grid>
            );
        default:
            return <Typography>{t('noInformation')}</Typography>;
    }
};

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const email = useQuery().get('email') as string;
    const token = useQuery().get('token') as string;
    const { t } = useTranslation();

    const [status, setStatus] = useState(Status.Verifying);

    const { loading, error } = useSelector((state: RootState) => state.authentication);

    useEffect(() => {
        const data: VerifyEmailDto = {
            email,
            token,
        };
        dispatch(verifyEmailAction(data));
    }, [dispatch]);

    useEffect(() => {
        if (loading) {
            setStatus(Status.Verifying);
        } else if (!error) {
            setStatus(Status.Success);
        } else {
            setStatus(Status.Failed);
        }
    }, [loading, error, Status.Verifying, Status.Success, Status.Failed]);

    return (
        <div>
            <Grid container>
                <Grid item xs={12} className="login-top-menu" sx={{ textAlign: 'end' }}>
                    <LanguageTopApp />
                </Grid>
            </Grid>
            <Box
                component="main"
                className="authentication-bg"
                sx={{
                    flexDirection: 'column',
                }}>
                <Container
                    maxWidth="sm"
                    sx={{
                        py: {
                            xs: '60px',
                            md: '120px',
                        },
                    }}>
                    <Card elevation={16} sx={{ p: 4, maxWidth: 440 }}>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}>
                            <CardMedia component="img" height={40} image={Logo} sx={{ maxWidth: 134 }} />
                            <CardContent className="pt-4 pb-4 text-center">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <VerifyBody status={status} t={t} />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <CardActions>
                            <Grid container className="text-center">
                                <Link
                                    sx={{ cursor: 'pointer' }}
                                    color="textSecondary"
                                    variant="body2"
                                    href={LOGIN_ROUTE}>
                                    <Typography
                                        className="text-muted text-dark-50"
                                        sx={{
                                            fontWeight: 'bold',
                                            textAlign: 'left',
                                            marginTop: '15px',
                                        }}
                                        paddingLeft="10px">
                                        {t('backToLogin')}
                                    </Typography>
                                </Link>
                            </Grid>
                        </CardActions>
                    </Card>
                </Container>
            </Box>
            <MessageModal />
            <AppRefreshSnackBar />
        </div>
    );
};

export default VerifyEmail;
