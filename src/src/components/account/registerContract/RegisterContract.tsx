import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardActions, CardContent, Grid, IconButton, MobileStepper, Tooltip, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import HelpIcon from '@mui/icons-material/Help';
import { Theme } from '@mui/system';
import { FormDataType, SignUpForm } from '../../../config/interfaces';
import { signupUser } from '../../../store/reducers/auth/authActions';
import { RootState } from '../../../store/store';
import LanguageTopApp from '../../common/LanguageTopApp';
import ContentStepsContract from './ContentStepsContract';
import StyledBtnComponent from '../../common/StyledBtnComponent';
import { REGISTER_ROUTE } from '../../../routes/routes';
import { fetchParametersAdmin, saveRegisterForm } from '../../../store/reducers/genericActions';
import { JOB_HYBRID, JOB_OFFICE, CONSULTANT_ROLE } from '../../../config/constants';
import { backgroundImg, getUserCoordinates, removeFormatPhone } from '../../helpers/utilityFunctions';
import globalStyles from '../../../config/globalCss';

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
    cardClass: {
        margin: 'auto',
        height: 'auto',
        [theme.breakpoints.down('md')]: {
            maxWidth: '370px !important',
            margin: 'auto',
        },
        [theme.breakpoints.up('xs')]: {
            maxWidth: 440,
        },
    },
    cardContentClass: {
        [theme.breakpoints.up('xs')]: {
            padding: 32,
            paddingTop: 0,
        },
    },
}));

const RegisterContract = () => {
    const maxStepsContract = 19;
    const classes = useStyles();
    const cssGlobal: any = globalStyles();
    const dispatch = useDispatch();
    const history = useNavigate();
    const { t } = useTranslation();
    const location = useLocation();

    const { loading, finishSignUp, formRegister, profilParameters } = useSelector((state: RootState) => ({
        loading: state.authentication.loading,
        finishSignUp: state.authentication.finishSignUp,
        formRegister: state.generic.formRegister,
        profilParameters: state.generic.profilParameters,
    }));

    const [formData, setFormData] = useState<FormDataType>(formRegister || ({} as FormDataType));
    const [activeStep, setActiveStep] = useState(0);
    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());

    const populareForm = () => {
        if (formRegister) {
            setFormData({
                ...formRegister,
            });
        }
    };

    useEffect(() => {
        populareForm();
    }, [formRegister]);

    useEffect(() => {
        dispatch(fetchParametersAdmin());
    }, [t]);

    const getValue = (value: any): string => {
        let result = '';
        if (Array.isArray(value)) {
            result = value
                .map((x) => `${x}`)
                .toString()
                .trim();
        } else {
            result = value;
        }
        return result;
    };

    const handleSetError = (error: string) => {
        msgErr.set('localization', t(error));
        setMsgErr(msgErr);
    };

    const handleActiveLocation = () => {
        msgErr.delete('localization');
        setMsgErr(msgErr);
        const newForm: FormDataType = {
            ...formData,
            agreementLocalization: true,
        };
        setFormData(newForm);
    };

    const handleChange = (type: string, valueSelected: any) => (event: any, valueChange: any) => {
        let value = null;
        if (event) {
            event.stopPropagation();
            value = event.target.value;
        }
        const newForm: FormDataType = {
            ...formData,
        };
        switch (type) {
            case 'incorporated': {
                newForm.incorporated = valueSelected as boolean;
                newForm.incorporatedHelp = undefined;
                if (valueSelected) {
                    setActiveStep(activeStep + 1);
                }
                break;
            }
            case 'incorporated_help': {
                newForm.incorporatedHelp = valueSelected as boolean;
                newForm.searchOpportunity = undefined;
                newForm.title = undefined;
                setActiveStep(activeStep + 1);
                break;
            }
            case 'searchOpportunity': {
                newForm.searchOpportunity = valueSelected as string;
                setActiveStep(activeStep + 1);
                break;
            }
            case 'selectTitle': {
                newForm.title = valueChange;
                break;
            }
            case 'selectJobFunction': {
                newForm.jobFunction = valueChange;
                break;
            }
            case 'skills': {
                newForm.skills = valueChange;
                break;
            }
            case 'additionalsSkills': {
                newForm.additionalsSkills = valueChange;
                break;
            }
            case 'selectExperience': {
                newForm.experienceLevel = getValue(value);
                setActiveStep(activeStep + 1);
                break;
            }
            case 'selectIndustry': {
                newForm.industry = valueChange;
                break;
            }
            case 'selectUnWantedIndustry': {
                newForm.unWantedIndustry = valueChange;
                break;
            }
            case 'selectRate': {
                newForm.salaryId = getValue(value);
                break;
            }
            case 'selectedSizeWork': {
                newForm.sizeOfWork = value;
                setActiveStep(activeStep + 1);
                break;
            }
            case 'legallyWork': {
                newForm.legallyWork = valueSelected as boolean;
                if (valueSelected) {
                    setActiveStep(activeStep + 1);
                }
                break;
            }
            case 'needSponsor': {
                newForm.needSponsor = valueSelected as boolean;
                setActiveStep(activeStep + 1);
                break;
            }
            case 'contractDuration': {
                newForm.duration = valueChange;
                break;
            }
            case 'selectLanguageEng': {
                newForm.selectLanguageEng = value;
                break;
            }
            case 'selectLanguageFr': {
                newForm.selectLanguageFr = value;
                break;
            }
            case 'processWithCompany': {
                newForm.processWithCompany = valueSelected as boolean;
                if (!valueSelected) {
                    newForm.companyProcess = undefined;
                    setActiveStep(activeStep + 1);
                }
                break;
            }
            case 'companyProcess': {
                newForm.companyProcess = value;
                break;
            }
            case 'payRange': {
                newForm.payRange = valueChange;
                break;
            }
            case 'selectedTypeWork': {
                newForm.typeOfWork = getValue(value);
                newForm.noCompany = undefined;
                break;
            }
            case 'workDistance': {
                newForm.localisation = getValue(value);
                break;
            }
            case 'noCompany': {
                newForm.noCompany = valueSelected as boolean;
                if (!valueSelected) {
                    setActiveStep(activeStep + 1);
                }
                break;
            }
            case 'noCompanyList': {
                newForm.noCompanyList = value;
                break;
            }
            case 'selectCulture': {
                newForm.culture = valueChange;
                break;
            }
            case 'selectPersonality': {
                newForm.personality = valueChange;
                break;
            }
            case 'notified': {
                newForm.notified = valueSelected as string;
                if (valueSelected === 'email') {
                    setActiveStep(activeStep + 1);
                }
                break;
            }
            case 'phone': {
                const valueCleanned = removeFormatPhone(value);
                if (valueCleanned.length <= 11) {
                    newForm.phone = valueCleanned;
                    setFormData(newForm);
                }
                break;
            }
            case 'resume': {
                const formFile: FormData = valueSelected as FormData;
                newForm.resume = formFile.get('File');
                break;
            }
            case 'deleteResume': {
                newForm.resume = undefined;
                break;
            }
            case 'localizationAgreement': {
                getUserCoordinates(location, handleActiveLocation, handleSetError);
                break;
            }
            default:
                break;
        }
        setFormData(newForm);
    };

    const handleBack = () => {
        switch (activeStep) {
            case 0: {
                if (formData.incorporatedHelp !== undefined) {
                    setFormData({
                        ...formData,
                        incorporated: undefined,
                        incorporatedHelp: undefined,
                    });
                } else if (formData.incorporated !== undefined && !formData.incorporated) {
                    setFormData({
                        ...formData,
                        incorporated: undefined,
                        incorporatedHelp: undefined,
                    });
                } else {
                    dispatch(saveRegisterForm(formData));
                    history(REGISTER_ROUTE, { state: { back: true } });
                    break;
                }
                break;
            }
            case 1: {
                setFormData({
                    ...formData,
                    searchOpportunity: undefined,
                });
                setActiveStep(activeStep - 1);
                break;
            }
            case 8: {
                if (
                    (formData.legallyWork && formData.needSponsor === undefined) ||
                    formData.legallyWork === undefined
                ) {
                    setFormData({
                        ...formData,
                        legallyWork: undefined,
                        needSponsor: undefined,
                    });
                    setActiveStep(activeStep - 1);
                } else {
                    setFormData({
                        ...formData,
                        legallyWork: undefined,
                        needSponsor: undefined,
                    });
                }
                break;
            }
            case 11: {
                if (formData.processWithCompany === undefined && formData.companyProcess === undefined) {
                    setActiveStep(activeStep - 1);
                } else if (formData.processWithCompany) {
                    const newForm = {
                        ...formData,
                        processWithCompany: undefined,
                        companyProcess: undefined,
                    };
                    setFormData(newForm);
                }

                break;
            }
            case 12: {
                if (formData.companyProcess === undefined) {
                    const newForm = {
                        ...formData,
                        processWithCompany: undefined,
                    };
                    setFormData(newForm);
                }
                setActiveStep(activeStep - 1);
                break;
            }
            case 15: {
                if (!formData.noCompany) {
                    const newForm = {
                        ...formData,
                        noCompany: undefined,
                        noCompanyList: undefined,
                    };
                    setFormData(newForm);
                }
                setActiveStep(activeStep - 1);
                break;
            }
            case 18: {
                setFormData({
                    ...formData,
                    notified: undefined,
                    phone: undefined,
                });
                setActiveStep(activeStep - 1);
                break;
            }
            default: {
                setActiveStep(activeStep - 1);
                break;
            }
        }
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const onSubmit = () => {
        if (formData) {
            const newForm: FormDataType = {
                ...formData,
                finished: true,
            };
            setFormData(newForm);
            const skillList: any[] = [];
            if (formData.skills) {
                formData.skills.forEach((skill: any) => {
                    const skillObj: any = {
                        domain: 'IT',
                        skill: skill.value.trim(),
                    };
                    skillList.push(skillObj);
                });
            }
            const payload: SignUpForm = {
                firstName: formData.firstName || '',
                lastName: formData.lastName || '',
                userName: formData.userName || '',
                email: formData.email || '',
                password: formData.password || '',
                role: CONSULTANT_ROLE,
                company: formData.company,
                url: window.location.origin,
                ...formData,
                duration: formData.duration ? formData.duration.map((x) => x.value).join(',') : '',
                skills: skillList,
                additionalsSkills: skillList,
                industry: formData.industry ? formData.industry.map((x) => x.value).join(',') : '',
                unWantedIndustry: formData.unWantedIndustry
                    ? formData.unWantedIndustry.map((x) => x.value).join(',')
                    : '',
                experienceLevel: formData.experienceLevel ? formData.experienceLevel : '',
                salaryId: formData.salaryId || '',
                culture: formData.culture ? formData.culture.map((x) => x.value).join(',') : '',
                title: formData.title ? formData.title.map((x) => x.value).join(',') : '',
                jobFunction: formData.jobFunction ? formData.jobFunction.map((x) => x.value).join(',') : '',
                personality: formData.personality ? formData.personality.map((x) => x.value).join(',') : '',
                sizeOfWork: formData.sizeOfWork ? formData.sizeOfWork : '',
                startingRatePerHour: formData.payRange ? formData.payRange[0] : 0,
                endingRatePerHour: formData.payRange ? formData.payRange[1] : 0,
                resume: formData.resume,
            };
            dispatch(signupUser(payload));
        }
    };

    const showBtnNext =
        (activeStep >= 2 && activeStep <= 4) ||
        (activeStep === 5 && formData.experienceLevel !== undefined) ||
        activeStep === 6 ||
        (activeStep >= 9 && activeStep <= 13) ||
        (activeStep === 14 && formData.noCompany) ||
        (activeStep >= 15 && activeStep <= 17);

    const isNextDisabled = useCallback(() => {
        switch (activeStep) {
            case 2:
                return formData.title === undefined || formData.title.length === 0;
            case 3:
                return formData.jobFunction === undefined || formData.jobFunction.length === 0;
            case 4:
                return formData.skills === undefined || formData.skills.length === 0;
            case 5:
                return formData.experienceLevel === undefined || formData.experienceLevel === null;
            case 6:
                return formData.industry === undefined || formData.industry.length === 0;
            case 9:
                return formData.duration === undefined || formData.duration.length === 0;
            case 10:
                return (
                    (formData.selectLanguageEng === undefined || formData.selectLanguageEng === null) &&
                    (formData.selectLanguageFr === undefined || formData.selectLanguageFr === null)
                );
            case 11:
                return (
                    formData.processWithCompany === undefined ||
                    (formData.processWithCompany &&
                        (formData.companyProcess === undefined || formData.companyProcess === ''))
                );
            case 12:
                return formData.salaryId === undefined;
            case 13:
                return (
                    (formData.typeOfWork?.includes(JOB_HYBRID) || formData.typeOfWork?.includes(JOB_OFFICE)) &&
                    formData.localisation === undefined
                );
            case 14:
                return (
                    formData.noCompany === undefined ||
                    (formData.noCompany &&
                        (formData.unWantedIndustry === undefined || formData.unWantedIndustry.length === 0))
                );
            case 15:
                return formData.culture === undefined || formData.culture.length === 0;
            case 16:
                return formData.personality === undefined || formData.personality.length === 0;
            case 17:
                return (
                    formData.notified === undefined ||
                    (formData.notified === 'text' && (formData.phone === undefined || formData.phone === ''))
                );

            default:
                return false;
        }
    }, [activeStep, formData]);

    const showConfirm =
        activeStep === maxStepsContract - 1 ? (
            <StyledBtnComponent
                title={t('complete')}
                gridWidth={145}
                endIcon={!loading ? <KeyboardArrowRight /> : null}
                handleOnClick={onSubmit}
                disabled={isNextDisabled()}
                loading={loading}
                startIcon={loading ? <KeyboardArrowRight /> : null}
            />
        ) : null;

    const showNext = showBtnNext ? (
        <IconButton
            color="primary"
            aria-label="upload picture"
            onClick={handleNext}
            disabled={isNextDisabled()}
            component="label">
            <RedoIcon />
        </IconButton>
    ) : (
        showConfirm
    );

    const getHelpText = (): string => {
        switch (activeStep) {
            case 0:
                if (!formData.incorporated && formData.incorporated !== undefined) return t('helpincorporedAssistance');
                return t('helpIncorpored');
            case 1:
                return t('helpTypeSearch');
            case 2:
                return t('helpDoAtWork');
            case 3:
                return t('helpJobFunction');
            case 4:
                return t('helpSkills');
            case 5:
                return t('helpExperience');
            case 6:
                return t('helpIndustry');
            case 7:
                return t('helpSizeWork');
            case 8:
                if (!formData.legallyWork && formData.legallyWork !== undefined) return t('helpLegallyNo');
                return t('helpLegallyEntitled');
            case 9:
                return t('helpContract');
            case 10:
                return t('helpLanguage');
            case 11:
                return t('helpSelectionProcess');
            case 12:
                return t('helpRate');
            case 13:
                return t('helpTypeWork');
            case 14:
                return t('helpIndustryNotMatch');
            case 15:
                return t('helpCulture');
            case 16:
                return t('helpPersonality');
            case 17:
                return t('helNotification');
            case 18:
                return t('helpResume');
            default:
                return '';
        }
    };

    return (
        <Grid container>
            <Grid item xs={12} className="login-top-menu" sx={{ textAlign: 'end' }}>
                <LanguageTopApp />
            </Grid>
            <Grid
                item
                xs={12}
                className={`${classes.appTransition} ${classes.background}`}
                sx={{ backgroundImage: `url(${backgroundImg(activeStep)})` }}
                component="main">
                <Grid container>
                    <Grid item xs={12} margin="auto">
                        <Card elevation={16} className={classes.cardClass}>
                            {!finishSignUp && (
                                <Grid item xs={12} textAlign="right">
                                    <Tooltip title={getHelpText()} placement="bottom-start">
                                        <IconButton>
                                            <HelpIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            )}
                            <CardContent className={classes.cardContentClass}>
                                {!finishSignUp && (
                                    <ContentStepsContract
                                        step={activeStep}
                                        formData={formData}
                                        handleChange={handleChange}
                                        loading={loading}
                                        profilParameters={profilParameters}
                                        msgErr={msgErr}
                                    />
                                )}
                                {finishSignUp && (
                                    <Grid container sx={{ minHeight: '100px' }} textAlign="center">
                                        <Grid item xs={12}>
                                            <Typography className={cssGlobal.title}>{`${t('congratulations')}, ${
                                                formData?.firstName
                                            }`}</Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={8}
                                            className={cssGlobal.descriptionTxt}
                                            paddingTop={5}
                                            textAlign="center"
                                            margin="auto">
                                            <Typography sx={{ fontSize: 14 }}>{t('confirmRegistration')}</Typography>
                                        </Grid>
                                        <Grid item xs={12} marginTop="30px">
                                            <Typography className={cssGlobal.titlePink} sx={{ fontSize: 18 }}>
                                                {t('startMatchingConfirm')}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )}
                            </CardContent>
                            <CardActions>
                                <Grid container>
                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        {!finishSignUp && (
                                            <MobileStepper
                                                sx={{
                                                    fontSize: 12,
                                                    fontFamily: 'Roboto',
                                                }}
                                                variant="text"
                                                steps={maxStepsContract}
                                                position="static"
                                                activeStep={activeStep}
                                                nextButton={finishSignUp ? null : showNext}
                                                backButton={
                                                    !finishSignUp && (
                                                        <IconButton
                                                            aria-label="upload picture"
                                                            onClick={handleBack}
                                                            component="label">
                                                            <UndoIcon />
                                                        </IconButton>
                                                    )
                                                }
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default RegisterContract;
