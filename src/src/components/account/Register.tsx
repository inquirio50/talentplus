import React, { useCallback, useEffect, useState } from 'react';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Link,
    MobileStepper,
    Typography,
} from '@mui/material';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { KeyboardArrowRight } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import clsx from 'clsx';
import Logo from '../../assets/images/logo.png';
import { CONFIRM_PASSWORD, CONSULTANT_ROLE, EMPLOYER_ROLE, PASSWORD, PERMANENT_ROLE } from '../../config/constants';
import { FormDataType, SignUpForm } from '../../config/interfaces';
import { LOGIN_ROUTE, REGISTER_CONTRACT_ROUTE, REGISTER_PERMANENT_ROUTE } from '../../routes/routes';
import {
    isEmailAvailable as isEmailAvailableAction,
    isUserNameAvailable as isUserNameAvailableAction,
    signupUser,
} from '../../store/reducers/auth/authActions';
import { RootState } from '../../store/store';
import DialogMsg from '../common/DialogMsg';
import LanguageTopApp from '../common/LanguageTopApp';
import MessageModal from '../common/MessageModal';
import TermsAndConditions from '../common/TermsAgreement';
import { passwordValidation } from '../helpers/utilityFunctions';
import RegisterSteps from './RegisterSteps';
import RegisterBg1 from '../../assets/images/register_bg1.png';
import { saveRegisterForm } from '../../store/reducers/genericActions';
import globalStyles from '../../config/globalCss';
import StyledBtnComponent from '../common/StyledBtnComponent';

const useStyles: any = makeStyles((theme: Theme) => ({
    appTransition: {
        transitionProperty: 'background-image',
        transitionDuration: '1s',
        transitionTimingFunction: 'linear',
    },
    background: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        alignItems: 'center',
        display: 'flex',
        minHeight: '100vh',
    },
    mainBox: {
        marginBottom: '-10px',
    },
    cardClass: {
        margin: 'auto',
        height: 'auto',
        [theme.breakpoints.down('md')]: {
            maxWidth: '370px !important',
            margin: 'auto',
        },
        [theme.breakpoints.up('xs')]: {
            maxWidth: 440,
            padding: 32,
        },
    },
    media: {
        maxWidth: 134,
        marginTop: 10,
        [theme.breakpoints.only('xs')]: {},
    },
    lastDiv: {
        [theme.breakpoints.only('xs')]: {
            marginBottom: 10,
        },
    },
}));

const Register = () => {
    const initialSteps = 5;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();
    const styles = useStyles();
    const globalStylesCss = globalStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [modal, setModal] = useState(false);
    const [moveNext, setMoveNext] = useState(false);
    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());

    const {
        loading,
        isEmailAvailable,
        isUserNameAvailable,
        finishSignUp,
        trackEmailOrUserNameVerification,
        formRegister,
    } = useSelector((state: RootState) => ({
        layout: state.authentication.layout,
        loading: state.authentication.loading,
        isEmailAvailable: state.authentication.isEmailAvailable,
        isUserNameAvailable: state.authentication.isUserNameAvailable,
        finishSignUp: state.authentication.finishSignUp,
        trackEmailOrUserNameVerification: state.authentication.trackEmailOrUserNameVerification,
        formRegister: state.generic.formRegister,
    }));

    const [formData, setFormData] = useState<FormDataType>({
        agreementRead: false,
        finished: false,
        agreementLocalization: false,
    });

    const updateForm = async () => {
        const isBack = location.state as { isBack: boolean };
        if (location && isBack) {
            const newForm: FormDataType = {
                ...formRegister,
            };
            await setFormData(newForm);
            setActiveStep(initialSteps - 1);
            history(location.pathname, { replace: true });
        }
    };

    useEffect(() => {
        updateForm();
    }, [navigator]);

    const isValidForm = useCallback((): boolean => {
        if (loading) return false;
        let foundError = false;
        msgErr.forEach((key, value) => {
            if (value !== '') {
                foundError = true;
            }
        });
        if (foundError) {
            return foundError;
        }
        // Test fields
        switch (activeStep) {
            case 1: {
                return (
                    formData.email !== '' &&
                    formData.password !== '' &&
                    formData.confirmPassword !== '' &&
                    formData.agreementRead
                );
            }
            case 2: {
                return (
                    formData.userName !== undefined &&
                    formData.userName !== '' &&
                    formData.firstName !== undefined &&
                    formData.firstName !== '' &&
                    formData.lastName !== undefined &&
                    formData.lastName !== ''
                );
            }
            default: {
                break;
            }
        }
        return !foundError;
    }, [msgErr, formData, activeStep, loading]);

    const handleNext = (newForm?: FormDataType) => {
        if (newForm) {
            setFormData(newForm);
        }
        // Check avaiability
        if (isValidForm()) {
            switch (activeStep) {
                case 1: {
                    if (formData.email !== undefined) {
                        dispatch(isEmailAvailableAction(formData?.email));
                        setMoveNext(true);
                    }
                    break;
                }
                case 2: {
                    if (formData?.userName !== undefined) {
                        dispatch(isUserNameAvailableAction(formData?.userName));
                        setMoveNext(true);
                    }
                    break;
                }
                case 4: {
                    if (newForm !== null) {
                        setActiveStep(initialSteps - 1);
                        dispatch(saveRegisterForm(formData));
                        if (newForm?.typeSearch === 'contractual') {
                            history(REGISTER_CONTRACT_ROUTE);
                        } else {
                            history(REGISTER_PERMANENT_ROUTE);
                        }
                    }
                    break;
                }
                default: {
                    setActiveStep(activeStep + 1);
                    break;
                }
            }
        }
    };

    const handleNextBtn = () => {
        handleNext();
    };

    const handleBack = () => {
        if (activeStep === 2 && formData?.role === EMPLOYER_ROLE) {
            const newForm: FormDataType = {
                ...formData,
                role: '',
            };
            setFormData(newForm);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            msgErr.clear();
            setMoveNext(false);
        }
    };

    const getMsgError = useCallback(() => msgErr, [msgErr]);

    const toggle = () => {
        setModal(!modal);
    };

    const confirmAgreement = () => {
        const newForm: FormDataType = {
            ...formData,
            agreementRead: true,
        };
        setFormData(newForm);
        toggle();
    };

    const handleChange = (type: string, valueSelected: any) => (event: any) => {
        let value = null;
        if (event) {
            event.stopPropagation();
            value = event.target.value;
        }
        const newForm: FormDataType = {
            ...formData,
            agreementRead: formData?.agreementRead || false,
        };

        switch (type) {
            case 'IWork': {
                handleNext(newForm);
                break;
            }
            case 'IEmploy': {
                newForm.role = EMPLOYER_ROLE;
                // handleNext(newForm);
                window.location.href = 'https://meetings.hubspot.com/frederik-gauthier';
                break;
            }
            case 'email': {
                newForm.email = value;
                if (!newForm.email || newForm?.email === '') {
                    msgErr?.set('email', t('Enter Email address'));
                } else if (newForm.email !== formData.email) {
                    msgErr?.delete('email');
                }
                break;
            }
            case 'password': {
                newForm.password = value;
                const errPass = passwordValidation(newForm.password || '', newForm.confirmPassword || '', t);
                const errTxtConfirm = errPass.get(CONFIRM_PASSWORD) || '';
                const errTxtPassword = errPass.get(PASSWORD) || '';

                if (errTxtPassword) {
                    msgErr.set(PASSWORD, errTxtPassword);
                } else {
                    msgErr.delete(PASSWORD);
                }

                if (errTxtConfirm) {
                    msgErr.set(CONFIRM_PASSWORD, errTxtConfirm);
                } else {
                    msgErr.delete(CONFIRM_PASSWORD);
                }

                break;
            }
            case 'confirmPassword': {
                newForm.confirmPassword = value;
                const errPass = passwordValidation(newForm.password || '', newForm.confirmPassword || '', t);
                const errTxtConfirm = errPass.get(CONFIRM_PASSWORD) || '';

                if (errTxtConfirm) {
                    msgErr.set(CONFIRM_PASSWORD, errTxtConfirm);
                } else {
                    msgErr.delete(CONFIRM_PASSWORD);
                }

                break;
            }
            case 'agreement': {
                newForm.agreementRead = !formData?.agreementRead;
                if (!newForm.agreementRead) {
                    msgErr.set('agreement', t('agreementAcceptation'));
                } else {
                    msgErr.delete('agreement');
                }
                break;
            }
            case 'userName': {
                newForm.userName = value;
                if (newForm?.userName === '') {
                    msgErr?.set('userName', t('Enter your userName'));
                } else {
                    msgErr?.delete('userName');
                }
                break;
            }
            case 'firstName': {
                newForm.firstName = value;
                if (newForm?.firstName === '') {
                    msgErr?.set('firstName', t('Enter your first name'));
                } else {
                    msgErr?.delete('firstName');
                }
                break;
            }
            case 'lastName': {
                newForm.lastName = value;
                if (newForm?.lastName === '') {
                    msgErr?.set('lastName', t('Enter your last name'));
                } else {
                    msgErr?.delete('lastName');
                }
                break;
            }

            case 'company': {
                newForm.company = value;
                if (newForm?.lastName === '') {
                    msgErr?.set('company', t('enterCompanyName'));
                } else {
                    msgErr?.delete('company');
                }
                break;
            }
            case 'typeSearch': {
                const valeur = valueSelected as string;
                newForm.role = valeur.toLowerCase() === PERMANENT_ROLE.toLowerCase() ? PERMANENT_ROLE : CONSULTANT_ROLE;
                newForm.typeSearch = valeur;
                handleNext(newForm);
                break;
            }
            default: {
                break;
            }
        }
        setFormData(newForm);
        setMsgErr(msgErr);
    };

    const setMsgErrorUsernameEmail = useCallback(() => {
        if (moveNext) {
            if (isValidForm()) {
                if (activeStep === 1) {
                    if (isEmailAvailable) {
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                        msgErr.delete('email');
                        setMoveNext(false);
                    } else {
                        msgErr.set('email', t('emailExist'));
                    }
                    setMsgErr(msgErr);
                    handleChange('email', formData.email);
                }
                if (activeStep === 2) {
                    if (isUserNameAvailable) {
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                        msgErr.delete('userName');
                        setMoveNext(false);
                    } else {
                        msgErr.set('userName', t('userNameExist'));
                        setMoveNext(false);
                    }
                    setMsgErr(msgErr);
                    handleChange('userName', formData.userName);
                }
            }
        }
    }, [trackEmailOrUserNameVerification, isUserNameAvailable]);

    useEffect(() => {
        setMsgErrorUsernameEmail();
    }, [loading]);

    const onSubmit = () => {
        if (isValidForm()) {
            const newForm: FormDataType = {
                ...formData,
                finished: true,
            };
            setFormData(newForm);
            const payload: SignUpForm = {
                firstName: formData.firstName || '',
                lastName: formData.lastName || '',
                userName: formData.userName || '',
                email: formData.email || '',
                password: formData.password || '',
                role: formData.role || '',
                company: formData.company,
                url: window.location.origin,
            };
            dispatch(signupUser(payload));
        }
    };

    const showBtnComplete = activeStep === 3 && formData.role === EMPLOYER_ROLE;

    const loadingBtn = loading ? (
        <LoadingButton loading={loading} type="button" color="primary" variant="contained" />
    ) : (
        <IconButton
            color="primary"
            aria-label="next"
            onClick={handleNextBtn}
            disabled={!isValidForm()}
            component="label">
            <RedoIcon />
        </IconButton>
    );

    const showBtnNext = showBtnComplete ? (
        <StyledBtnComponent
            title={t('complete')}
            gridWidth={145}
            endIcon={!loading ? <KeyboardArrowRight /> : null}
            handleOnClick={onSubmit}
            disabled={!isValidForm()}
            loading={loading}
            startIcon={loading ? <KeyboardArrowRight /> : null}
        />
    ) : (
        loadingBtn
    );

    return (
        <div>
            <Grid container>
                <Grid item xs={12} className="login-top-menu" sx={{ textAlign: 'end' }}>
                    <LanguageTopApp />
                </Grid>
                <Grid
                    item
                    xs={12}
                    className={`${styles.appTransition} ${activeStep < 3 ? 'authentication-bg' : styles.background}`}
                    sx={activeStep > 2 ? { backgroundImage: `url(${RegisterBg1})` } : {}}
                    component="main">
                    <Grid container>
                        <Grid item xs={12} margin="auto">
                            <Card elevation={16} className={styles.cardClass}>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }}>
                                    <CardMedia component="img" height={40} image={Logo} className={styles.media} />
                                    <CardContent className={clsx('pt-4 pb-4 text-center', styles.mainBox)}>
                                        {activeStep > 0 && activeStep < 3 && (
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography className={globalStylesCss.title}>
                                                        {t('FreeSignUp')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} className="text-muted mb-4">
                                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>
                                                        {t('SignUpTxt')}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        )}
                                        {!finishSignUp && (
                                            <RegisterSteps
                                                step={activeStep}
                                                handleChange={handleChange}
                                                msgErr={getMsgError()}
                                                formData={formData}
                                                toggle={toggle}
                                                loading={loading}
                                            />
                                        )}
                                        {finishSignUp && (
                                            <Grid container>
                                                <Grid item xs={12} sx={{ textAlign: '-webkit-center' }}>
                                                    <Typography className="text-dark-50 text-center mt-0 fw-bold">
                                                        {t('Confirmation')}
                                                    </Typography>
                                                </Grid>
                                                <Grid container textAlign="left">
                                                    <Grid item xs={4} paddingTop={3}>
                                                        <Typography className={globalStylesCss.fieldDisplayTitle}>
                                                            {t('Username')}:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={8} className="text-muted mb-4" paddingTop={3}>
                                                        <Typography sx={{ fontSize: 14 }}>
                                                            {formData?.userName}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography className={globalStylesCss.fieldDisplayTitle}>
                                                            {t('Email')}:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={8} className="text-muted mb-4">
                                                        <Typography sx={{ fontSize: 14 }}>{formData?.email}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography className={globalStylesCss.fieldDisplayTitle}>
                                                            {t('firstName')}:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={8} className="text-muted mb-4">
                                                        <Typography sx={{ fontSize: 14 }}>
                                                            {formData?.firstName}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography className={globalStylesCss.fieldDisplayTitle}>
                                                            {t('Last Name')}:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={8} className="text-muted mb-4">
                                                        <Typography sx={{ fontSize: 14 }}>
                                                            {formData?.lastName}
                                                        </Typography>
                                                    </Grid>
                                                    {formData?.role === EMPLOYER_ROLE && (
                                                        <Grid container>
                                                            <Grid item xs={4}>
                                                                <Typography
                                                                    className={globalStylesCss.fieldDisplayTitle}>
                                                                    {t('Company')}:
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={8} className="text-muted mb-4">
                                                                <Typography sx={{ fontSize: 14 }}>
                                                                    {formData?.company}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        )}
                                    </CardContent>
                                </Box>
                                <CardActions>
                                    <Grid container className="text-center">
                                        <Grid item xs={12} sx={{ textAlign: activeStep === 4 ? 'left' : 'center' }}>
                                            {!formData.finished && activeStep !== 4 && (
                                                <MobileStepper
                                                    sx={{
                                                        fontSize: 12,
                                                        fontFamily: 'Roboto',
                                                        display: activeStep === 0 ? 'block' : 'flex',
                                                    }}
                                                    variant="text"
                                                    steps={initialSteps}
                                                    position="static"
                                                    activeStep={activeStep}
                                                    nextButton={activeStep > 0 ? showBtnNext : null}
                                                    backButton={
                                                        activeStep > 0 ? (
                                                            <IconButton
                                                                aria-label="upload picture"
                                                                onClick={handleBack}
                                                                disabled={activeStep === 0 || loading}
                                                                component="label">
                                                                <UndoIcon />
                                                            </IconButton>
                                                        ) : null
                                                    }
                                                />
                                            )}
                                            {activeStep === 4 && (
                                                <IconButton
                                                    aria-label="upload picture"
                                                    onClick={handleBack}
                                                    disabled={loading}
                                                    component="label">
                                                    <UndoIcon />
                                                </IconButton>
                                            )}
                                            {loading && activeStep === initialSteps - 1 && formData.finished && (
                                                <div className="lds-roller">
                                                    <div />
                                                    <div />
                                                    <div />
                                                    <div />
                                                    <div />
                                                    <div />
                                                    <div />
                                                    <div />
                                                </div>
                                            )}
                                            <Grid item xs={12} textAlign="right" className={styles.lastDiv}>
                                                <Link color="textSecondary" variant="body2" href={LOGIN_ROUTE}>
                                                    <Typography
                                                        className="text-muted text-dark-50"
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            fontSize: 12,
                                                        }}
                                                        paddingLeft="10px">
                                                        {t('Back to Login Page')}
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <DialogMsg open={modal} title="termsAgreement" callBackFn={confirmAgreement} handleClose={toggle} isAction>
                <TermsAndConditions />
            </DialogMsg>
            <MessageModal />
        </div>
    );
};

export default Register;
