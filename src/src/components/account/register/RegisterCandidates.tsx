import React, { useCallback, useEffect, useState } from 'react';
import { Button, Grid, MobileStepper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import globalStyles from '../../../config/globalCss';
import Header from '../../landingPage/Header';
import TextFieldComponent from '../../common/TextFieldComponent';
import { FormDataType, SignUpForm } from '../../../config/interfaces';
import StyledBtnComponent from '../../common/StyledBtnComponent';
import { RootState } from '../../../store/store';
import DialogMsg from '../../common/DialogMsg';
import TermsAndConditions from '../../common/TermsAgreement';
import MessageModal from '../../common/MessageModal';
import PasswordCheck from '../../common/PasswordCheck';
import { checkErrorMsg, convertSkillsForProfileDto, passwordValidation } from '../../helpers/utilityFunctions';
import { CONFIRM_PASSWORD, PASSWORD, PERMANENT } from '../../../config/constants';
import {
    isEmailAvailable as isEmailAvailableAction,
    isUserNameAvailable as isUserNameAvailableAction,
    signupUser,
} from '../../../store/reducers/auth/authActions';
import RegisterCandidatesSteps from './RegisterCandidatesSteps';
import { saveRegisterForm } from '../../../store/reducers/genericActions';
import RegisterSuccess from './RegisterSuccess';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex',
        minHeight: 700,
    },
    gridBox: {
        paddingTop: '93px',
        [theme.breakpoints.down('lg')]: {
            paddingTop: 0,
        },
    },
    gridBoxStep: {
        paddingTop: '24px',
        [theme.breakpoints.down('lg')]: {
            paddingTop: 0,
        },
    },
    gridStep: {
        paddingTop: '43px',
    },
    box: {
        padding: '50px',
        gap: '10px',
        position: 'absolute',
        width: '625px',
        height: 'auto',
        background: theme.palette.backgroundGray,
        border: '1px solid #DBDBDB',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
        borderRadius: '10px',
        [theme.breakpoints.down('lg')]: {
            background: 'unset',
            boxShadow: 'unset',
            border: 'unset',
            borderRadius: 'unset',
            width: '100%',
            height: 'auto',
        },
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
            maxWidth: 'unset',
            width: '100%',
        },
    },
    title: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 24,
        lineHeight: '29px',
        color: theme.palette.common.black,
    },
    txt: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 15,
        lineHeight: '18px',
        color: theme.palette.common.black,
    },
    gridBtn: {
        paddingTop: '36px',
    },
    txtTapping: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 13,
        lineHeight: '16px',
        color: theme.palette.common.black,
    },
    gridStepContent: {
        margin: 'auto',
        justifyContent: 'center',
        maxWidth: '400px',
    },
    percentage: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '17px',
        color: theme.palette.common.black,
    },
    progress: {
        background: 'unset',
        '& .MuiLinearProgress-barColorPrimary': {
            backgroundColor: theme.palette.baseColor,
        },
    },
    stepperProgress: {
        width: '100%',
        backgroundColor: '#FDE6F4',
    },
}));

const RegisterCandidates = () => {
    const classes = globalStyles();
    const css = styles();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { loading, isEmailAvailable, isUserNameAvailable, finishSignUp } = useSelector((state: RootState) => ({
        loading: state.authentication.loading,
        isEmailAvailable: state.authentication.isEmailAvailable,
        isUserNameAvailable: state.authentication.isUserNameAvailable,
        finishSignUp: state.authentication.finishSignUp,
    }));

    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());
    const [modal, setModal] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);

    const [formData, setFormData] = useState<FormDataType>({
        agreementRead: true,
        finished: false,
        agreementLocalization: false,
    });

    const checkPasswordError = (password: string | undefined, confirmPassword: string | undefined) => {
        const errPass = passwordValidation(password || '', confirmPassword || '', t);
        const errTxtConfirm = errPass.get(CONFIRM_PASSWORD) || '';
        const errTxtPassword = errPass.get(PASSWORD) || '';

        if (errTxtPassword) {
            msgErr.set(PASSWORD, errTxtPassword);
            setMsgErr(msgErr);
        } else {
            msgErr.delete(PASSWORD);
        }
        if (errTxtConfirm) {
            msgErr.set(CONFIRM_PASSWORD, errTxtConfirm);
            setMsgErr(msgErr);
        } else {
            msgErr.delete(CONFIRM_PASSWORD);
        }
    };

    const isValidForm = useCallback((): boolean => {
        if (loading) return false;
        let isValid = true;
        msgErr.forEach((key, value) => {
            if (value !== '') {
                isValid = false;
            }
        });

        if (!isValid) {
            return isValid;
        }
        switch (activeStep) {
            case 0: {
                return (
                    formData.email !== undefined &&
                    formData.email !== '' &&
                    formData.password !== undefined &&
                    formData.password !== '' &&
                    formData.confirmPassword !== undefined &&
                    formData.confirmPassword !== '' &&
                    formData.userName !== undefined &&
                    formData.userName !== '' &&
                    formData.firstName !== undefined &&
                    formData.firstName !== '' &&
                    formData.lastName !== undefined &&
                    formData.lastName !== ''
                );
            }
            default:
                break;
        }

        return isValid;
    }, [msgErr, formData, loading]);

    const onSubmit = (newForm: FormDataType) => {
        if (newForm) {
            const payload: SignUpForm = {
                firstName: newForm.firstName || '',
                lastName: newForm.lastName || '',
                userName: newForm.userName || '',
                email: newForm.email || '',
                password: newForm.password || '',
                role: newForm.role || '',
                company: newForm.company,
                url: window.location.origin,
                ...newForm,
                skills: convertSkillsForProfileDto(newForm.skills || []),
                additionalsSkills: convertSkillsForProfileDto(newForm.additionalsSkills || []),
                industry: newForm.industry ? newForm.industry.map((x) => x.value).join(',') : '',
                unWantedIndustry: newForm.unWantedIndustry
                    ? newForm.unWantedIndustry.map((x) => x.value).join(',')
                    : '',
                experienceLevel: newForm.experienceLevel ? newForm.experienceLevel : '',
                salaryId: newForm.salaryId ? newForm.salaryId : '',
                culture: newForm.culture ? newForm.culture.map((x) => x.value).join(',') : '',
                title: newForm.title ? newForm.title.map((x) => x.value).join(',') : '',
                jobFunction: newForm.jobFunction ? newForm.jobFunction.map((x) => x.value).join(',') : '',
                personality: newForm.personality ? newForm.personality.map((x) => x.value).join(',') : '',
                sizeOfWork: newForm.sizeOfWork ? newForm.sizeOfWork : '',
                resume: newForm.resume,
                startingSalary: newForm.payRange ? newForm.payRange[0] : 0,
                endingSalary: newForm.payRange ? newForm.payRange[1] : 0,
            };
            // New questionaire field benefits: formData.benefits ? convertCommonTypeToJson(formData.benefits) : {},
            payload.questionaire = {
                ...payload,
                benefits: formData.benefits ? formData.benefits.map((x) => x.value).join(',') : '',
                password: null,
                confirmPassword: null,
            };
            dispatch(signupUser(payload));
        }
    };

    const handleNext = async (newForm?: FormDataType) => {
        let saveNewForm: FormDataType = {
            ...formData,
        };
        if (newForm) {
            saveNewForm = {
                ...newForm,
                agreementLocalization: newForm.agreementLocalization,
            };
            await setFormData(saveNewForm);
        }
        if (isValidForm()) {
            switch (activeStep) {
                case 0: {
                    if (formData.email !== undefined) {
                        dispatch(isEmailAvailableAction(formData?.email));
                        setIsCheckingEmail(true);
                    }
                    break;
                }
                case 3: {
                    onSubmit(saveNewForm);
                    break;
                }
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        if (!loading) {
            if (isCheckingEmail) {
                if (isEmailAvailable && formData.userName) {
                    dispatch(isUserNameAvailableAction(formData.userName));
                    setIsCheckingUsername(true);
                } else {
                    msgErr.set('email', t('emailExist'));
                    setMsgErr(msgErr);
                }
                setIsCheckingEmail(false);
            }
            if (isCheckingUsername) {
                if (isUserNameAvailable) {
                    setActiveStep(1);
                    dispatch(saveRegisterForm(formData));
                } else {
                    msgErr.set('userName', t('userNameExist'));
                    setMsgErr(msgErr);
                }
                setIsCheckingUsername(false);
            }
        }
    }, [loading, isCheckingUsername, isCheckingEmail]);

    function onlyLettersAndNumbers(str: string) {
        return /^[A-Za-z0-9]*$/.test(str);
    }

    function ValidateEmail(str: string) {
        // eslint-disable-next-line no-useless-escape
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str);
    }

    const manageForm = (type: string, newValue?: string) => {
        const newForm: FormDataType = {
            ...formData,
            agreementRead: formData?.agreementRead || false,
        };
        switch (type) {
            case 'typeSearch': {
                newForm.typeSearch = newValue;
                checkErrorMsg(newForm.userName, 'userName', t('userNamePlaceholder'), msgErr, setMsgErr);
                checkErrorMsg(newForm.email, 'email', t('emailPlaceholder'), msgErr, setMsgErr);
                checkPasswordError(newForm.password, newForm.confirmPassword);
                checkErrorMsg(newForm.firstName, 'firstName', t('firstNamePlaceholder'), msgErr, setMsgErr);
                checkErrorMsg(newForm.lastName, 'lastName', t('lastNamePlaceholder'), msgErr, setMsgErr);

                handleNext(newForm);
                break;
            }
            case 'userName': {
                if (!newValue || onlyLettersAndNumbers(newValue)) {
                    newForm.userName = newValue;
                    checkErrorMsg(newForm.userName, 'userName', t('userNamePlaceholder'), msgErr, setMsgErr);
                }
                break;
            }
            case 'email': {
                newForm.email = newValue;
                checkErrorMsg(newForm.email, 'email', t('emailPlaceholder'), msgErr, setMsgErr);
                if (newValue && !ValidateEmail(newValue)) {
                    msgErr.set('email', t('emailInvalid'));
                    setMsgErr(msgErr);
                }
                break;
            }
            case 'password': {
                newForm.password = newValue;
                checkPasswordError(newForm.password, newForm.confirmPassword);
                break;
            }
            case 'confirmPassword': {
                newForm.confirmPassword = newValue;
                checkPasswordError(newForm.password, newForm.confirmPassword);
                break;
            }
            case 'firstName': {
                newForm.firstName = newValue;
                checkErrorMsg(newForm.firstName, 'firstName', t('firstNamePlaceholder'), msgErr, setMsgErr);
                break;
            }
            case 'lastName': {
                newForm.lastName = newValue;
                checkErrorMsg(newForm.lastName, 'lastName', t('lastNamePlaceholder'), msgErr, setMsgErr);
                break;
            }
            default:
                break;
        }
        setFormData(newForm);
    };

    const handleChange = (type: string, valueSelected?: any) => (event: any) => {
        let value = null;
        if (event) {
            event.stopPropagation();
            value = event.target.value;
        }
        if (valueSelected) {
            manageForm(type, valueSelected as string);
        } else {
            manageForm(type, value);
        }
    };

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

    const handleStep = (type: string, formDataPassed?: FormDataType) => {
        if (type && type === 'back') {
            setActiveStep(activeStep - 1);
        } else {
            if (activeStep < 3) setActiveStep(activeStep + 1);
            handleNext(formDataPassed);
        }
    };

    const getLabelPercentage = () => {
        if (activeStep === 2) return '60%';
        if (activeStep === 3) return '90%';
        return '10%';
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Header />
            </Grid>
            {activeStep !== 0 && !finishSignUp && (
                <Grid item xs={12} className={css.gridStep}>
                    <Grid container className={css.gridStepContent}>
                        <Grid item xs={11}>
                            <MobileStepper
                                variant="progress"
                                steps={4}
                                position="static"
                                activeStep={activeStep}
                                nextButton={null}
                                backButton={null}
                                className={css.progress}
                                LinearProgressProps={{
                                    className: css.stepperProgress,
                                }}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Typography className={css.percentage}>{getLabelPercentage()}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            )}
            <Grid item xs={12} className={activeStep === 0 ? css.gridBox : css.gridBoxStep}>
                <Grid container className={css.container}>
                    {!finishSignUp && (
                        <Grid item xs={12} className={css.box}>
                            <form>
                                {activeStep === 0 && (
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Typography className={css.title}>{t('createAccount')}</Typography>
                                        </Grid>
                                        <Grid item xs={12} className={css.padding16}>
                                            <Typography className={css.txt}>{t('letsHelpMatch')}</Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={12}
                                            md={6}
                                            sm={6}
                                            xs={12}
                                            className={clsx(css.padding31, css.gridFields)}>
                                            <TextFieldComponent
                                                id="firstName"
                                                label={t('firstName')}
                                                name="firstName"
                                                placeholder={t('firstNamePlaceholder')}
                                                handleChange={handleChange('firstName')}
                                                value={formData?.firstName}
                                                autoCompleteInput="name"
                                                error={msgErr}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={12}
                                            md={6}
                                            sm={6}
                                            xs={12}
                                            className={clsx(css.padding31, css.gridFields)}>
                                            <TextFieldComponent
                                                id="lastName"
                                                label={t('lastName')}
                                                name="lastName"
                                                placeholder={t('lastNamePlaceholder')}
                                                handleChange={handleChange('lastName')}
                                                value={formData?.lastName}
                                                autoCompleteInput="lastname"
                                                error={msgErr}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={12}
                                            md={6}
                                            sm={6}
                                            xs={12}
                                            className={clsx(css.padding31, css.gridFields)}>
                                            <TextFieldComponent
                                                id="userName"
                                                label={t('userName')}
                                                name="userName"
                                                placeholder={t('userNamePlaceholder')}
                                                handleChange={handleChange('userName')}
                                                value={formData?.userName}
                                                autoCompleteInput="name"
                                                error={msgErr}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={12}
                                            md={6}
                                            sm={6}
                                            xs={12}
                                            className={clsx(css.padding31, css.gridFields)}>
                                            <TextFieldComponent
                                                id="email"
                                                label={t('email')}
                                                name="email"
                                                placeholder={t('emailPlaceholder')}
                                                handleChange={handleChange('email')}
                                                value={formData?.email}
                                                error={msgErr}
                                                autoCompleteInput="username"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={12}
                                            md={6}
                                            sm={6}
                                            xs={12}
                                            className={clsx(css.padding31, css.gridFields)}>
                                            <TextFieldComponent
                                                id="password"
                                                label={t('password')}
                                                name="password"
                                                placeholder={t('passwordPlaceholder')}
                                                type="password"
                                                value={formData?.password}
                                                error={msgErr}
                                                handleChange={handleChange('password')}
                                                required
                                                autoCompleteInput="new-password"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={12}
                                            md={6}
                                            sm={6}
                                            xs={12}
                                            className={clsx(css.padding31, css.gridFields)}>
                                            <TextFieldComponent
                                                id="confirmPassword"
                                                label={t('confirmPassword')}
                                                name="confirmPassword"
                                                placeholder={t('confirmPassword')}
                                                type="password"
                                                value={formData?.confirmPassword}
                                                error={msgErr}
                                                handleChange={handleChange('confirmPassword')}
                                                autoCompleteInput="new-password"
                                            />
                                        </Grid>
                                        <Grid item xs={12} className={css.padding16}>
                                            <PasswordCheck
                                                password={formData.password || ''}
                                                confirmPassword={formData.confirmPassword || ''}
                                            />
                                        </Grid>
                                        <Grid item xs={12} className={css.gridBtn}>
                                            <StyledBtnComponent
                                                title={t('createAccount')}
                                                handleOnClick={handleChange('typeSearch', PERMANENT)}
                                                loading={isCheckingEmail && isCheckingUsername}
                                                disabled={!isValidForm()}
                                            />
                                        </Grid>
                                        <Grid item xs={12} className={css.padding16}>
                                            <Typography component="span" className={css.txtTapping}>
                                                {t('byTappingCreate')}
                                            </Typography>
                                            <Button onClick={toggle} className={classes.linkBtn}>
                                                {t('termsConditions')}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                )}
                                {activeStep !== 0 && (
                                    <RegisterCandidatesSteps
                                        activeStep={activeStep}
                                        handleStep={handleStep}
                                        formData={formData}
                                    />
                                )}
                            </form>
                        </Grid>
                    )}
                    {finishSignUp && (
                        <Grid item xs={12}>
                            <RegisterSuccess />
                        </Grid>
                    )}
                </Grid>
            </Grid>
            <DialogMsg open={modal} title="termsAgreement" callBackFn={confirmAgreement} handleClose={toggle} isAction>
                <TermsAndConditions />
            </DialogMsg>
            <MessageModal />
        </Grid>
    );
};

export default RegisterCandidates;
