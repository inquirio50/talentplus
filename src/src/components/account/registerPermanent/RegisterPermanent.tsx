import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardActions, CardContent, Grid, IconButton, MobileStepper, Tooltip, Typography } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import HelpIcon from '@mui/icons-material/Help';
import { useLocation, useNavigate } from 'react-router-dom';
import { Theme } from '@mui/system';
import { RootState } from '../../../store/store';
import LanguageTopApp from '../../common/LanguageTopApp';
import { FormDataType, SignUpForm } from '../../../config/interfaces';
import ContentStepsPermanent from './ContentStepsPermanent';
import StyledBtnComponent from '../../common/StyledBtnComponent';
import { fetchParametersAdmin, saveRegisterForm } from '../../../store/reducers/genericActions';
import { REGISTER_ROUTE } from '../../../routes/routes';
import {
    backgroundImg,
    // convertCommonTypeToJson,
    convertSkillsForProfileDto,
    getUserCoordinates,
    removeFormatPhone,
} from '../../helpers/utilityFunctions';
import { signupUser } from '../../../store/reducers/auth/authActions';
import globalStyles from '../../../config/globalCss';
import { PERMANENT_ROLE } from '../../../config/constants';

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

const RegisterPermanent = () => {
    const maxSteps = 19;
    const classes = useStyles();
    const cssGlobal: any = globalStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useNavigate();
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

    const populateForm = () => {
        if (formRegister) {
            setFormData({
                ...formRegister,
            });
        }
    };

    useEffect(() => {
        populateForm();
    }, [formRegister]);

    useEffect(() => {
        dispatch(fetchParametersAdmin());
    }, [t]);

    const handleNext = (newForm?: FormDataType) => {
        if (newForm) {
            setFormData(newForm);
        }
        setActiveStep(activeStep + 1);
    };

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
            case 'searchOpportunity': {
                newForm.searchOpportunity = valueSelected as string;
                handleNext(newForm);
                break;
            }
            case 'selectTitle': {
                newForm.title = valueChange;
                setFormData(newForm);
                break;
            }
            case 'selectJobFunction': {
                newForm.jobFunction = valueChange;
                setFormData(newForm);
                break;
            }
            case 'skills': {
                newForm.skills = valueChange;
                setFormData(newForm);
                break;
            }
            case 'additionalsSkills': {
                newForm.additionalsSkills = valueChange;
                setFormData(newForm);
                break;
            }
            case 'selectExperience': {
                newForm.experienceLevel = getValue(value);
                handleNext(newForm);
                break;
            }
            case 'selectIndustry': {
                newForm.industry = valueChange;
                setFormData(newForm);
                break;
            }
            case 'selectUnWantedIndustry': {
                newForm.unWantedIndustry = valueChange;
                setFormData(newForm);
                break;
            }
            case 'selectSalary': {
                newForm.salaryId = getValue(value);
                setFormData(newForm);
                break;
            }
            case 'noCompany': {
                newForm.noCompany = valueSelected as boolean;
                if (!valueSelected) {
                    handleNext(newForm);
                } else {
                    setFormData(newForm);
                }
                break;
            }
            case 'noCompanyList': {
                newForm.noCompanyList = value;
                setFormData(newForm);
                break;
            }
            case 'selectedSizeWork': {
                newForm.sizeOfWork = value;
                handleNext(newForm);
                break;
            }
            case 'legallyWork': {
                newForm.legallyWork = valueSelected as boolean;
                if (valueSelected) {
                    handleNext(newForm);
                } else {
                    setFormData(newForm);
                }
                break;
            }
            case 'needSponsor': {
                newForm.needSponsor = valueSelected as boolean;
                handleNext(newForm);
                break;
            }
            case 'relocate': {
                newForm.relocate = valueSelected as boolean;
                handleNext(newForm);
                break;
            }
            case 'selectLanguageEng': {
                newForm.selectLanguageEng = value;
                setFormData(newForm);
                break;
            }
            case 'selectLanguageFr': {
                newForm.selectLanguageFr = value;
                setFormData(newForm);
                break;
            }
            case 'processWithCompany': {
                newForm.processWithCompany = valueSelected as boolean;
                if (!valueSelected) {
                    handleNext(newForm);
                } else {
                    setFormData(newForm);
                }
                break;
            }
            case 'companyProcess': {
                newForm.companyProcess = value;
                setFormData(newForm);
                break;
            }
            case 'payRange': {
                newForm.payRange = valueChange;
                setFormData(newForm);
                break;
            }
            case 'selectedTypeWork': {
                newForm.typeOfWork = getValue(value);
                setFormData(newForm);
                break;
            }
            case 'workDistance': {
                newForm.localisation = getValue(value);
                setFormData(newForm);
                break;
            }
            case 'selectCulture': {
                newForm.culture = valueChange;
                setFormData(newForm);
                break;
            }
            case 'selectPersonality': {
                newForm.personality = valueChange;
                setFormData(newForm);
                break;
            }
            case 'selectBenefits': {
                newForm.benefits = valueChange;
                setFormData(newForm);
                break;
            }
            case 'notified': {
                newForm.notified = valueSelected as string;
                if (valueSelected === 'email') {
                    handleNext(newForm);
                } else {
                    setFormData(newForm);
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
                setFormData(newForm);
                break;
            }
            case 'deleteResume': {
                newForm.resume = undefined;
                setFormData(newForm);
                break;
            }
            case 'localizationAgreement': {
                getUserCoordinates(location, handleActiveLocation, handleSetError);
                break;
            }
            default:
                break;
        }
    };

    const handleBack = () => {
        switch (activeStep) {
            case 0: {
                setFormData({
                    ...formData,
                    searchOpportunity: undefined,
                });
                dispatch(saveRegisterForm(formData));
                history(REGISTER_ROUTE, { state: { back: true } });
                break;
            }
            case 6: {
                const newForm = {
                    ...formData,
                    noCompany: undefined,
                    noCompanyList: undefined,
                };
                if (formData.noCompanyList === undefined) {
                    setActiveStep(activeStep - 1);
                }
                setFormData(newForm);
                break;
            }
            case 8: {
                const newForm = {
                    ...formData,
                    legallyWork: undefined,
                    needSponsor: undefined,
                };
                if (formData.needSponsor === undefined) {
                    setActiveStep(activeStep - 1);
                }
                setFormData(newForm);
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
            case 13: {
                const newForm = {
                    ...formData,
                    typeWork: undefined,
                    workDistance: undefined,
                };
                if (formData.localisation === undefined) {
                    setActiveStep(activeStep - 1);
                }
                setFormData(newForm);
                break;
            }
            case 16: {
                const newForm = {
                    ...formData,
                    notified: undefined,
                    phone: undefined,
                };
                if (formData.phone === undefined) {
                    setActiveStep(activeStep - 1);
                }
                setFormData(newForm);
                break;
            }
            default:
                setActiveStep(activeStep - 1);
                break;
        }
    };

    const onSubmit = () => {
        if (formData) {
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
                role: PERMANENT_ROLE,
                company: formData.company,
                url: window.location.origin,
                ...formData,
                skills: convertSkillsForProfileDto(formData.skills || []),
                additionalsSkills: convertSkillsForProfileDto(formData.additionalsSkills || []),
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
                resume: formData.resume,
                startingSalary: formData.payRange ? formData.payRange[0] : 0,
                endingSalary: formData.payRange ? formData.payRange[1] : 0,
            };
            // New questionaire field benefits: formData.benefits ? convertCommonTypeToJson(formData.benefits) : {},
            payload.questionaire = {
                // ...payload,
                benefits: formData.benefits ? formData.benefits.map((x) => x.value).join(',') : '',
            };
            dispatch(signupUser(payload));
        }
    };

    const isNextDisabled = useCallback(() => {
        switch (activeStep) {
            case 1:
                return formData.title === undefined || formData.title?.length === 0;
            case 2:
                return formData.jobFunction === undefined || formData.jobFunction.length === 0;
            case 3:
                return formData.skills === undefined || formData.skills.length === 0;
            case 5:
                return formData.industry === undefined || formData.industry.length === 0;
            case 10:
                return formData.selectLanguageEng === undefined || formData.selectLanguageFr === undefined;
            case 11:
                return (
                    formData.processWithCompany &&
                    (formData.companyProcess === undefined || formData.companyProcess === '')
                );
            case 13:
                return (
                    formData.typeOfWork === undefined ||
                    formData.typeOfWork.length === 0 ||
                    ((formData.typeOfWork.includes('office') || formData.typeOfWork.includes('hybrid')) &&
                        formData.localisation === undefined)
                );
            case 14:
                return formData.culture === undefined || formData.culture === undefined;
            case 15:
                return formData.personality === undefined || formData.personality === undefined;
            case 16:
                return formData.notified === 'text' && (formData.phone === undefined || formData.phone === '');
            default:
                return false;
        }
    }, [activeStep, formData]);

    const showBtnNext =
        (activeStep >= 1 && activeStep <= 3) ||
        (activeStep === 4 && formData.experienceLevel !== undefined) ||
        activeStep === 5 ||
        (activeStep === 6 && formData.noCompany) ||
        (activeStep === 7 && formData.sizeOfWork !== undefined) ||
        activeStep === 10 ||
        (activeStep === 11 && formData.processWithCompany) ||
        activeStep === 12 ||
        activeStep === 13 ||
        activeStep === 14 ||
        activeStep === 15 ||
        activeStep === 16 ||
        (activeStep === 17 && formData.notified === 'text');

    const showConfirm =
        activeStep === maxSteps - 1 ? (
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
            onClick={() => handleNext()}
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
                return t('helpTypeSearch');
            case 1:
                return t('helpDoAtWork');
            case 2:
                return t('helpJobFunction');
            case 3:
                return t('helpSkills');
            case 4:
                return t('helpExperience');
            case 5:
                return t('helpIndustry');
            case 6:
                return t('helpIndustryNotMatch');
            case 7:
                return t('helpSizeWork');
            case 8:
                if (!formData.legallyWork && formData.legallyWork !== undefined) return t('helpLegallyNo');
                return t('helpLegallyEntitled');
            case 9:
                return t('helpRelocate');
            case 10:
                return t('helpLanguage');
            case 11:
                return t('helpSelectionProcess');
            case 12:
                return t('helpAnnualSalary');
            case 13:
                return t('helpTypeWork');
            case 14:
                return t('helpCulture');
            case 15:
                return t('helpPersonality');
            case 16:
                return t('helNotification');
            case 17:
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
                            <Grid item xs={12} textAlign="right">
                                <Tooltip title={getHelpText()} placement="bottom-start">
                                    <IconButton>
                                        <HelpIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <CardContent className={classes.cardContentClass}>
                                {!finishSignUp && (
                                    <ContentStepsPermanent
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
                                            <Typography className={cssGlobal.title} sx={{ fontSize: 18 }}>
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
                                                steps={maxSteps}
                                                position="static"
                                                activeStep={activeStep}
                                                nextButton={showNext}
                                                backButton={
                                                    <IconButton
                                                        aria-label="upload picture"
                                                        onClick={handleBack}
                                                        component="label">
                                                        <UndoIcon />
                                                    </IconButton>
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

export default RegisterPermanent;
