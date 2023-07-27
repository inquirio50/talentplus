import { Checkbox, CircularProgress, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CONSULTANT_ROLE, CONTRACTUAL, PERMANENT, PERMANENT_ROLE } from '../../../config/constants';
import globalStyles from '../../../config/globalCss';
import { FormDataType } from '../../../config/interfaces';
import { fetchParametersAdmin, saveRegisterForm } from '../../../store/reducers/genericActions';
import { RootState } from '../../../store/store';
import AutoCompleteComponent from '../../common/AutoCompleteComponent';
import SelectComponent from '../../common/SelectComponent';
import StyledBtnComponent from '../../common/StyledBtnComponent';
import {
    getOptionsLabeled,
    LEVEL_LANGUAGE_OPTIONS,
    TYPE_OF_WORK_OPTIONS,
    TYPE_SKILLS_OPTIONS,
} from '../../helpers/typeOptions';
import { checkErrorMsg, getUserCoordinates, handleChangeQuestionnaire } from '../../helpers/utilityFunctions';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex',
    },
    title: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 24,
        lineHeight: '29px',
        color: theme.palette.common.black,
    },
    gridBtn: {
        paddingTop: '36px',
    },
    gridMaxBtn: {
        maxWidth: '125px',
    },
    btnSize: {
        width: '120px',
        height: '50px',
    },
    padding16: {
        paddingTop: '16px',
    },
    padding25: {
        paddingTop: '25px',
    },
    gridRadio: {
        maxWidth: '120px',
    },
    gridRadioLeft: {
        paddingLeft: '47px',
    },
    gridFirstQuestion: {
        paddingTop: '19px',
    },
    gridPaddingQuestion: {
        paddingTop: '28px',
    },
    gridBtnLeft: {
        paddingLeft: '16px',
    },
    gridPaddingLocation: {
        paddingTop: '36px',
    },
    txt: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 12,
        lineHeight: '18px',
        color: theme.palette.common.black,
    },
}));

const RegisterCandidatesSteps = ({
    activeStep,
    handleStep,
    formData,
}: {
    activeStep: number;
    handleStep: any;
    formData: FormDataType;
}) => {
    const classes = globalStyles();
    const css = styles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const BACK = 'back';
    const NEXT = 'next';
    const skillsOptions = getOptionsLabeled(TYPE_SKILLS_OPTIONS, t);
    const { loading, formRegister, profilParameters } = useSelector((state: RootState) => ({
        loading: state.authentication.loading,
        formRegister: state.generic.formRegister,
        finishSignUp: state.authentication.finishSignUp,
        profilParameters: state.generic.profilParameters,
    }));

    const [formDataStep, setFormDataStep] = useState<FormDataType>({
        ...formData,
        typeSearch: PERMANENT,
        role: PERMANENT_ROLE,
    });
    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());
    const [isNextOrBack, setIsNextOrBack] = useState<null | string>();
    const [localLoading, setLocalLoading] = useState(false);

    const populateForm = () => {
        if (formRegister) {
            setFormDataStep({
                ...formRegister,
                typeSearch: formRegister?.typeSearch || PERMANENT,
                role: formRegister?.role || PERMANENT_ROLE,
            });
        }
    };

    useEffect(() => {
        populateForm();
    }, [formRegister]);

    useEffect(() => {
        dispatch(fetchParametersAdmin());
    }, [t]);

    const handleBack = () => {
        dispatch(saveRegisterForm(formDataStep));
        setMsgErr(new Map());
        setIsNextOrBack(BACK);
    };

    const isConsultant = () => formRegister?.typeSearch !== PERMANENT;

    const isValidForm = useCallback((): boolean => {
        if (loading) return false;

        // Check Errors
        checkErrorMsg(formDataStep.title, 'selectTitle', t('selectTitle'), msgErr, setMsgErr);
        checkErrorMsg(formDataStep.experienceLevel, 'selectExperience', t('selectExperience'), msgErr, setMsgErr);
        checkErrorMsg(formDataStep.jobFunction, 'selectJobFunction', t('selectJobFunction'), msgErr, setMsgErr);
        checkErrorMsg(formDataStep.skills, 'selectSkill', t('selectSkill'), msgErr, setMsgErr);
        checkErrorMsg(formDataStep.additionalsSkills, 'additionalsSkills', t('additionalsSkills'), msgErr, setMsgErr);

        if (formDataStep.skills && formDataStep.skills.length !== 3) {
            msgErr.set('selectSkill', `${t('lenghtError')}3`);
            setMsgErr(msgErr);
        }

        if (activeStep === 2) {
            checkErrorMsg(formDataStep.industry, 'selectIndustry', t('selectIndustry'), msgErr, setMsgErr);
            checkErrorMsg(
                formDataStep.unWantedIndustry,
                'selectUnWantedIndustry',
                t('selectIndustryNotMatched'),
                msgErr,
                setMsgErr
            );
            checkErrorMsg(formDataStep.sizeOfWork, 'selectedSizeWork', t('selectSizeWork'), msgErr, setMsgErr);
            checkErrorMsg(
                formDataStep.selectLanguageEng,
                'selectLanguageEng',
                t('selectLanguageEng'),
                msgErr,
                setMsgErr
            );
            checkErrorMsg(formDataStep.selectLanguageFr, 'selectLanguageFr', t('selectLanguageFr'), msgErr, setMsgErr);
        }
        if (activeStep === 3) {
            checkErrorMsg(formDataStep.salaryId, 'selectSalary', t('selectSalary'), msgErr, setMsgErr);
            checkErrorMsg(formDataStep.salaryId, 'selectedTypeWork', t('selectedTypeWork'), msgErr, setMsgErr);
            checkErrorMsg(formDataStep.localisation, 'selectWorkDistance', t('selectWorkDistance'), msgErr, setMsgErr);
            checkErrorMsg(formDataStep.culture, 'selectCulture', t('selectCulture'), msgErr, setMsgErr);
            checkErrorMsg(formDataStep.personality, 'selectPersonality', t('selectPersonality'), msgErr, setMsgErr);
        }

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
            case 1:
                return (
                    formDataStep.typeSearch !== undefined &&
                    formDataStep.typeSearch !== '' &&
                    formDataStep.title !== undefined &&
                    formDataStep.title.length !== 0 &&
                    formDataStep.experienceLevel !== undefined &&
                    formDataStep.experienceLevel !== '' &&
                    formDataStep.jobFunction !== undefined &&
                    formDataStep.jobFunction.length !== 0 &&
                    formDataStep.skills !== undefined &&
                    formDataStep.skills.length !== 0 &&
                    formDataStep.additionalsSkills !== undefined &&
                    formDataStep.additionalsSkills.length !== 0
                );
            case 2:
                return (
                    formDataStep.industry !== undefined &&
                    formDataStep.industry.length !== 0 &&
                    formDataStep.unWantedIndustry !== undefined &&
                    formDataStep.unWantedIndustry.length !== 0 &&
                    formDataStep.sizeOfWork !== undefined &&
                    formDataStep.sizeOfWork !== '' &&
                    formDataStep.selectLanguageEng !== undefined &&
                    formDataStep.selectLanguageEng !== '' &&
                    formDataStep.selectLanguageFr !== undefined &&
                    formDataStep.selectLanguageFr !== ''
                );
            case 3: {
                return (
                    formDataStep.salaryId !== undefined &&
                    formDataStep.salaryId !== '' &&
                    formDataStep.typeOfWork !== undefined &&
                    formDataStep.typeOfWork !== '' &&
                    formDataStep.localisation !== undefined &&
                    formDataStep.localisation !== '' &&
                    formDataStep.culture !== undefined &&
                    formDataStep.culture.length !== 0 &&
                    formDataStep.personality !== undefined &&
                    formDataStep.personality.length !== 0
                );
            }
            default:
                break;
        }
        return isValid;
    }, [msgErr, formDataStep, loading]);

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
            ...formDataStep,
            agreementLocalization:
                formDataStep.agreementLocalization === undefined ? true : !formDataStep.agreementLocalization,
        };
        setFormDataStep(newForm);
        setLocalLoading(false);
    };

    const manageForm = (type: string, newValue?: any) => {
        const newForm: FormDataType = {
            ...formDataStep,
        };
        switch (type) {
            case 'typeSearch': {
                newForm.typeSearch = newValue;
                newForm.role = newValue === PERMANENT ? PERMANENT_ROLE : CONSULTANT_ROLE;
                break;
            }
            case 'selectTitle': {
                if (newValue.length <= 3) {
                    newForm.title = newValue;
                    checkErrorMsg(newForm.title, 'selectTitle', t('selectTitle'), msgErr, setMsgErr);
                }
                break;
            }
            case 'selectExperience': {
                newForm.experienceLevel = getValue(newValue);
                checkErrorMsg(newForm.experienceLevel, 'selectExperience', t('selectExperience'), msgErr, setMsgErr);
                break;
            }
            case 'selectJobFunction': {
                if (newValue.length <= 3) {
                    newForm.jobFunction = newValue;
                    checkErrorMsg(newForm.jobFunction, 'selectJobFunction', t('selectJobFunction'), msgErr, setMsgErr);
                }
                break;
            }
            case 'selectSkill': {
                if (newValue.length <= 3) {
                    newForm.skills = newValue;
                    checkErrorMsg(newForm.skills, 'selectSkill', t('selectSkill'), msgErr, setMsgErr);
                }
                if (newValue.length !== 3) {
                    msgErr.set('selectSkill', `${t('lenghtError')}3`);
                    setMsgErr(msgErr);
                }

                break;
            }
            case 'additionalsSkills': {
                newForm.additionalsSkills = newValue;
                checkErrorMsg(
                    newForm.additionalsSkills,
                    'additionalsSkills',
                    t('additionalsSkills'),
                    msgErr,
                    setMsgErr
                );
                break;
            }
            case 'selectIndustry': {
                if (newValue.length <= 5) {
                    newForm.industry = newValue;
                    checkErrorMsg(newForm.industry, 'selectIndustry', t('selectIndustry'), msgErr, setMsgErr);
                }
                break;
            }
            case 'selectUnWantedIndustry': {
                newForm.unWantedIndustry = newValue;
                checkErrorMsg(
                    newForm.industry,
                    'selectUnWantedIndustry',
                    t('selectIndustryNotMatched'),
                    msgErr,
                    setMsgErr
                );
                break;
            }
            case 'selectedSizeWork': {
                newForm.sizeOfWork = newValue;
                checkErrorMsg(newForm.sizeOfWork, 'selectedSizeWork', t('selectSizeWork'), msgErr, setMsgErr);
                break;
            }
            case 'selectLanguageEng': {
                newForm.selectLanguageEng = newValue;
                checkErrorMsg(
                    newForm.selectLanguageEng,
                    'selectLanguageEng',
                    t('selectLanguageEng'),
                    msgErr,
                    setMsgErr
                );
                break;
            }
            case 'selectLanguageFr': {
                newForm.selectLanguageFr = newValue;
                checkErrorMsg(newForm.selectLanguageFr, 'selectLanguageFr', t('selectLanguageFr'), msgErr, setMsgErr);
                break;
            }
            case 'selectSalary': {
                newForm.salaryId = getValue(newValue);
                checkErrorMsg(newForm.salaryId, 'selectSalary', t('selectSalary'), msgErr, setMsgErr);
                break;
            }
            case 'selectedTypeWork': {
                newForm.typeOfWork = getValue(newValue);
                checkErrorMsg(newForm.typeOfWork, 'selectedTypeWork', t('selectedTypeWork'), msgErr, setMsgErr);
                break;
            }
            case 'selectWorkDistance': {
                newForm.localisation = getValue(newValue);
                checkErrorMsg(newForm.localisation, 'selectWorkDistance', t('selectWorkDistance'), msgErr, setMsgErr);
                break;
            }
            case 'selectCulture': {
                newForm.culture = newValue;
                checkErrorMsg(newForm.culture, 'selectCulture', t('selectCulture'), msgErr, setMsgErr);
                break;
            }
            case 'selectPersonality': {
                if (newValue.length <= 3) {
                    newForm.personality = newValue;
                    checkErrorMsg(newForm.personality, 'selectPersonality', t('selectPersonality'), msgErr, setMsgErr);
                }
                break;
            }
            case 'localizationAgreement': {
                setLocalLoading(true);
                getUserCoordinates(location, handleActiveLocation, handleSetError);
                break;
            }
            default:
                break;
        }
        setFormDataStep(newForm);
    };

    const handleNext = () => {
        if (!loading && !localLoading) {
            dispatch(saveRegisterForm(formDataStep));
            if (isValidForm()) {
                setIsNextOrBack(NEXT);
            }
        }
    };

    useEffect(() => {
        if (!loading && isNextOrBack) {
            if (isNextOrBack === BACK) {
                handleStep(BACK);
            } else if (isNextOrBack === NEXT) {
                handleStep(null, formDataStep);
            }
            setIsNextOrBack(null);
        }
    }, [loading, isNextOrBack]);

    const getOptions = (type: string) => getOptionsLabeled(type, t);

    const getTitle = () => {
        if (activeStep === 2) {
            return t('almostDone');
        }
        if (activeStep === 3) {
            return t('theLastBit');
        }
        return t('letsDoThis');
    };

    if (!profilParameters) {
        return <CircularProgress size={25} />;
    }
    
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={css.title}>{getTitle()}</Typography>
                    </Grid>
                    <Grid item xs={12} className={css.padding16}>
                        <Typography className={css.txt}>{t('theBestMatchesBegins')}</Typography>
                    </Grid>
                    <Grid item xs={12} className={css.padding25}>
                        <RadioGroup aria-labelledby="role" defaultValue={PERMANENT} name="radio-buttons-group">
                            <Grid container>
                                <Grid item xs={6} className={css.gridRadio}>
                                    <FormControlLabel
                                        className={classes.radioBoxLabel}
                                        value={PERMANENT}
                                        control={<Radio disabled={activeStep !== 1} className={classes.radioBox} />}
                                        label={
                                            <Typography
                                                className={clsx(
                                                    classes.radioBoxLabel,
                                                    formDataStep?.typeSearch === PERMANENT
                                                        ? classes.radioBoxLabelActiveTxt
                                                        : ''
                                                )}>
                                                {t(PERMANENT)}
                                            </Typography>
                                        }
                                        onClick={handleChangeQuestionnaire(manageForm, 'typeSearch', PERMANENT)}
                                    />
                                </Grid>
                                <Grid item xs={6} textAlign="left" className={css.gridRadioLeft}>
                                    <FormControlLabel
                                        className={classes.radioBox}
                                        value={CONTRACTUAL}
                                        control={<Radio disabled={activeStep !== 1} className={classes.radioBox} />}
                                        label={
                                            <Typography
                                                className={clsx(
                                                    classes.radioBoxLabel,
                                                    formDataStep?.typeSearch === CONTRACTUAL
                                                        ? classes.radioBoxLabelActiveTxt
                                                        : ''
                                                )}>
                                                {t(CONTRACTUAL)}
                                            </Typography>
                                        }
                                        onClick={handleChangeQuestionnaire(manageForm, 'typeSearch', CONTRACTUAL)}
                                    />
                                </Grid>
                            </Grid>
                        </RadioGroup>
                    </Grid>
                    {activeStep === 1 && (
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12} className={css.gridFirstQuestion}>
                                    <AutoCompleteComponent
                                        id="selectTitle"
                                        label={t('latestJobTitles')}
                                        placeholder={t('selectTitle')}
                                        multiple
                                        handleChange={handleChangeQuestionnaire(manageForm, 'selectTitle')}
                                        defaultValue={[]}
                                        options={(profilParameters && profilParameters.titles) || []}
                                        currValue={formDataStep.title || []}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                                <Grid item xs={12} className={css.gridPaddingQuestion}>
                                    <SelectComponent
                                        id="selectExperience"
                                        label={t('selectYearsOfExperienceForMainTitle')}
                                        placeHolder={t('selectExperience')}
                                        currentValue={formDataStep.experienceLevel || ''}
                                        options={profilParameters.experienceLevels}
                                        handleChange={handleChangeQuestionnaire(manageForm, 'selectExperience')}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                                <Grid item xs={12} className={css.gridPaddingQuestion}>
                                    <AutoCompleteComponent
                                        id="selectJobFunction"
                                        label={t('selectJobFunctionPlaceholder')}
                                        placeholder={t('selectJobFunction')}
                                        multiple
                                        handleChange={handleChangeQuestionnaire(manageForm, 'selectJobFunction')}
                                        defaultValue={[]}
                                        options={profilParameters.functions}
                                        currValue={formDataStep.jobFunction || []}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                                <Grid item xs={12} className={css.gridPaddingQuestion}>
                                    <AutoCompleteComponent
                                        id="selectSkill"
                                        label={t('selectMainProfessionalCore')}
                                        placeholder={t('selectSkill')}
                                        multiple
                                        handleChange={handleChangeQuestionnaire(manageForm, 'selectSkill')}
                                        defaultValue={[]}
                                        options={skillsOptions.filter(
                                            (x) =>
                                                !(formDataStep.additionalsSkills || []).some(
                                                    (item: any) => x.value === item.value
                                                )
                                        )}
                                        currValue={formDataStep.skills || []}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                                <Grid item xs={12} className={css.gridPaddingQuestion}>
                                    <AutoCompleteComponent
                                        id="additionalsSkills"
                                        label={t('additionalsSkills')}
                                        placeholder={t('selectSkill')}
                                        multiple
                                        handleChange={handleChangeQuestionnaire(manageForm, 'additionalsSkills')}
                                        defaultValue={[]}
                                        options={skillsOptions.filter(
                                            (x) =>
                                                !(formDataStep.skills || []).some((item: any) => x.value === item.value)
                                        )}
                                        currValue={formDataStep.additionalsSkills || []}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {activeStep === 2 && (
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12} className={css.gridFirstQuestion}>
                                    <AutoCompleteComponent
                                        id="selectIndustry"
                                        label={t('selectIndustry')}
                                        placeholder={t('selectIndustryPlaceholder')}
                                        multiple
                                        handleChange={handleChangeQuestionnaire(manageForm, 'selectIndustry')}
                                        defaultValue={[]}
                                        options={
                                            profilParameters
                                                ? profilParameters.industries.filter((x: any) =>
                                                      formDataStep.unWantedIndustry
                                                          ? !(formDataStep.unWantedIndustry || []).some(
                                                                (item: any) => x.value === item.value
                                                            )
                                                          : true
                                                  )
                                                : []
                                        }
                                        currValue={formDataStep.industry || []}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                                <Grid item xs={12} className={css.gridPaddingQuestion}>
                                    <AutoCompleteComponent
                                        id="selectUnWantedIndustry"
                                        label={t('selectIndustryNotMatched')}
                                        placeholder={t('selectIndustry')}
                                        multiple
                                        handleChange={handleChangeQuestionnaire(manageForm, 'selectUnWantedIndustry')}
                                        defaultValue={[]}
                                        options={
                                            profilParameters
                                                ? profilParameters.industries.filter(
                                                      (x: any) =>
                                                          !(formDataStep.industry || []).some(
                                                              (item: any) => x.value === item.value
                                                          )
                                                  )
                                                : []
                                        }
                                        currValue={formDataStep.unWantedIndustry || []}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                                <Grid item xs={12} className={css.gridPaddingQuestion}>
                                    <SelectComponent
                                        id="selectedSizeWork"
                                        label={t('selectSizeWork')}
                                        placeHolder={t('selectSizeWorkPlaceholder')}
                                        currentValue={formDataStep.sizeOfWork || ''}
                                        options={profilParameters.sizeOfWorks}
                                        handleChange={handleChangeQuestionnaire(manageForm, 'selectedSizeWork')}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                                <Grid item xs={12} className={css.gridPaddingQuestion}>
                                    <SelectComponent
                                        id="selectLanguageEng"
                                        label={t('selectLanguageEng')}
                                        placeHolder={t('selectLanguageEngPlaceholder')}
                                        currentValue={formDataStep.selectLanguageEng || ''}
                                        options={getOptions(LEVEL_LANGUAGE_OPTIONS)}
                                        handleChange={handleChangeQuestionnaire(manageForm, 'selectLanguageEng')}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                                <Grid item xs={12} className={css.gridPaddingQuestion}>
                                    <SelectComponent
                                        id="selectLanguageFr"
                                        label={t('selectLanguageFr')}
                                        placeHolder={t('selectLanguageFrPlaceholder')}
                                        currentValue={formDataStep.selectLanguageFr || ''}
                                        options={getOptions(LEVEL_LANGUAGE_OPTIONS)}
                                        handleChange={handleChangeQuestionnaire(manageForm, 'selectLanguageFr')}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {activeStep === 3 && (
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12} className={css.gridFirstQuestion}>
                                    <SelectComponent
                                        id="selectSalary"
                                        label={t(isConsultant() ? 'selectSalary' : 'selectSalaryPermanent')}
                                        placeHolder={t(
                                            isConsultant()
                                                ? 'selectSalaryPermanentPlaceholder'
                                                : 'selectSalaryPlaceholder'
                                        )}
                                        currentValue={formDataStep.salaryId || ''}
                                        options={
                                            profilParameters
                                                ? profilParameters.salaries.filter(
                                                      (x: any) => x.periode === (isConsultant() ? 'Hour' : 'Year')
                                                  )
                                                : []
                                        }
                                        handleChange={handleChangeQuestionnaire(manageForm, 'selectSalary')}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                                <Grid item xs={12} className={css.gridPaddingQuestion}>
                                    <SelectComponent
                                        id="selectedTypeWork"
                                        label={t('selectedTypeWork')}
                                        placeHolder={t('selectedTypeWorkPlaceholder')}
                                        currentValue={formDataStep.typeOfWork || ''}
                                        options={getOptions(TYPE_OF_WORK_OPTIONS)}
                                        multiple
                                        handleChange={handleChangeQuestionnaire(manageForm, 'selectedTypeWork')}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                                <Grid item xs={12} className={css.gridPaddingQuestion}>
                                    <SelectComponent
                                        id="selectWorkDistance"
                                        label={t('selectWorkDistance')}
                                        placeHolder={t('selectWorkDistancePlaceholder')}
                                        currentValue={formDataStep.localisation || ''}
                                        options={profilParameters.localisations}
                                        handleChange={handleChangeQuestionnaire(manageForm, 'selectWorkDistance')}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                                <Grid item xs={12} className={css.gridPaddingQuestion}>
                                    <AutoCompleteComponent
                                        id="selectCulture"
                                        label={t('selectCulture')}
                                        placeholder={t('selectCulturePlaceholder')}
                                        multiple
                                        handleChange={handleChangeQuestionnaire(manageForm, 'selectCulture')}
                                        defaultValue={[]}
                                        options={profilParameters.cultures}
                                        currValue={formDataStep.culture || []}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                                <Grid item xs={12} className={css.gridPaddingQuestion}>
                                    <AutoCompleteComponent
                                        id="selectPersonality"
                                        label={t('selectPersonality')}
                                        placeholder={t('selectPersonalityPlaceholder')}
                                        multiple
                                        handleChange={handleChangeQuestionnaire(manageForm, 'selectPersonality')}
                                        defaultValue={[]}
                                        options={profilParameters.personalities}
                                        currValue={formDataStep.personality || []}
                                        errorMsg={msgErr}
                                    />
                                </Grid>
                                <Grid item xs={12} className={css.gridPaddingLocation}>
                                    <FormControlLabel
                                        className={classes.radioBoxLabel}
                                        value={formDataStep.agreementLocalization}
                                        control={<Checkbox checked= {formDataStep.agreementLocalization} className={classes.radioBox} />}
                                        label={
                                            <Typography className={classes.radioBoxLabel}>
                                                {t('localizationAgreement')}
                                            </Typography>
                                        }
                                        onClick={handleChangeQuestionnaire(manageForm, 'localizationAgreement')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={css.txt}>{t('localizationMsg')}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    <Grid item xs={12} className={css.gridBtn}>
                        <Grid container>
                            <Grid item xs={4} className={css.gridMaxBtn}>
                                <StyledBtnComponent
                                    title={t('back')}
                                    handleOnClick={handleBack}
                                    loading={loading}
                                    classesName={clsx(classes.btnOutlined, css.btnSize)}
                                />
                            </Grid>
                            <Grid item xs={4} className={css.gridBtnLeft}>
                                <StyledBtnComponent
                                    title={t(activeStep === 3 ? 'done' : 'next')}
                                    handleOnClick={handleNext}
                                    loading={loading || localLoading}
                                    red
                                    btWidth="120px"
                                    btHeight="50px"
                                    disabled={activeStep === 3 ? formDataStep.agreementLocalization === false : false}
                                />
                            </Grid>
                            <Grid item xs={4} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default RegisterCandidatesSteps;
