import { Grid, IconButton, Modal, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { Profile } from '../../models/profile';
import { fetchCandidatetInfo } from '../../store/reducers/candidate/candidateActions';
import { RootState } from '../../store/store';
import StyledBtnComponent from './StyledBtnComponent';
import { CloseIcon } from '../icons/Icons';
import { Skills } from '../../models/skills';
import globalStyles from '../../config/globalCss';
import i18n from '../../config/i18next';
import SelectComponent from './SelectComponent';
import AutoCompleteComponent from './AutoCompleteComponent';
import {
    getOptionsLabeled,
    TYPE_SKILLS_OPTIONS,
    LEVEL_LANGUAGE_OPTIONS,
    CommonTypeOptions,
} from '../helpers/typeOptions';
import {
    checkErrorMsg,
    convertArrayCommonTypeOptionsToStringValue,
    convertListToCommonType,
    convertSkillsForProfileDto,
    convertSkillsOptions,
    handleChangeQuestionnaire,
} from '../helpers/utilityFunctions';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '30px 50px',
        gap: '10px',
        maxWidth: 560,
        width: '90%',
        height: '90vh',
        maxHeight: 800,
        overflowY: 'auto',
        background: theme.palette.common.white,
        border: '1px solid #DBDBDB',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
        [theme.breakpoints.down('lg')]: {
            padding: '2rem',
        },
        [theme.breakpoints.down('md')]: {},
        [theme.breakpoints.down('sm')]: {
            padding: '1.5rem',
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
    content: {
        marginTop: '20px',
        paddingTop: '10px',
    },
}));

interface ProfessionalInformationProps {
    profile: Profile;
    handleUpdateProfile: any;
    isOpen: any;
    onClose: any;
}

const ProfessionalInformation = ({ profile, handleUpdateProfile, isOpen, onClose }: ProfessionalInformationProps) => {
    const dispatch = useDispatch();

    const globalClasses = globalStyles();
    const css = styles();
    const [newProfile, setNewProfile] = useState<Profile>({ ...profile });
    const [isSaving, setIsSaving] = useState(false);
    const [enableSave, setEnableSave] = useState(false);

    const { loading }: { loading: boolean } = useSelector((state: RootState) => ({
        loading: state.generic.loading,
    }));

    const { t } = useTranslation();
    const skillsOptions = getOptionsLabeled(TYPE_SKILLS_OPTIONS, t);
    const languesOptions = getOptionsLabeled(LEVEL_LANGUAGE_OPTIONS, t);
    const [selectedSkills, setSelectedSkills] = useState(convertSkillsOptions(profile.skills));
    const [selectedAdditionalsSkills, setSelectedAdditionalsSkills] = useState(
        convertSkillsOptions(profile.additionalsSkills)
    );

    const { profileParameters }: { profileParameters: any } = useSelector((state: RootState) => ({
        profileParameters: state.generic.profilParameters,
    }));

    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());

    const manageForm = (type: string, newValue?: any) => {
        const updateProfile = { ...newProfile };
        switch (type) {
            case 'selectTitle': {
                // updateProfile.title = newValue || [];
                if (newValue.length <= 3) {
                    updateProfile.titles = newValue || [];
                    checkErrorMsg(updateProfile.title, 'title', t('selectTitle'), msgErr, setMsgErr);
                }
                break;
            }
            case 'jobFuntion': {
                if (newValue.length <= 3) {
                    updateProfile.jobFunction = convertArrayCommonTypeOptionsToStringValue(
                        newValue.map((x: any) => x.value)
                    );
                    checkErrorMsg(updateProfile.jobFunction, 'jobFuntion', t('selectJobFunction'), msgErr, setMsgErr);
                }
                break;
            }
            case 'skillsArray': {
                if (newValue.length <= 3) {
                    setSelectedSkills(newValue);
                    checkErrorMsg(newValue, 'skillsArray', t('selectSkill'), msgErr, setMsgErr);
                }
                if (newValue.length !== 3) {
                    msgErr.set('skillsArray', `${t('lenghtError')}3`);
                    setMsgErr(msgErr);
                }
                break;
            }
            case 'additionalsSkills': {
                setSelectedAdditionalsSkills(newValue);
                checkErrorMsg(
                    selectedAdditionalsSkills,
                    'additionalsSkillsArray',
                    t('additionalsSkills'),
                    msgErr,
                    setMsgErr
                );
                break;
            }
            case 'experienceLevel': {
                updateProfile.experienceLevel = newValue;
                checkErrorMsg(
                    updateProfile.experienceLevel,
                    'experienceLevel',
                    t('selectExperience'),
                    msgErr,
                    setMsgErr
                );
                break;
            }
            case 'selectedCulture': {
                updateProfile.culture = convertArrayCommonTypeOptionsToStringValue(newValue.map((x: any) => x.value));
                checkErrorMsg(updateProfile.culture, 'selectedCulture', t('selectedCulture'), msgErr, setMsgErr);
                break;
            }
            case 'selectPersonality': {
                if (newValue.length <= 3) {
                    updateProfile.personality = convertArrayCommonTypeOptionsToStringValue(
                        newValue.map((x: any) => x.value)
                    );
                    checkErrorMsg(
                        updateProfile.personality,
                        'selectPersonality',
                        t('selectPersonality'),
                        msgErr,
                        setMsgErr
                    );
                }
                break;
            }
            case 'selectLanguageEng': {
                updateProfile.selectLanguageEng = newValue;
                checkErrorMsg(
                    updateProfile.selectLanguageEng,
                    'selectLanguageEng',
                    t('selectLanguageEng'),
                    msgErr,
                    setMsgErr
                );
                break;
            }
            case 'selectLanguageFr': {
                updateProfile.selectLanguageFr = newValue;
                checkErrorMsg(
                    updateProfile.selectLanguageFr,
                    'selectLanguageFr',
                    t('selectLanguageFr'),
                    msgErr,
                    setMsgErr
                );
                break;
            }
            default:
                break;
        }
        setNewProfile(updateProfile);
    };

    const isProfileUpdated = (): boolean => {
        let updated = false;

        if (
            // newProfile.typeOfWork !== profile?.typeOfWork ||
            // newProfile.startingRatePerHour !== profile?.startingRatePerHour ||
            // newProfile.endingRatePerHour !== profile?.endingRatePerHour ||
            // newProfile.projectDescription !== profile?.projectDescription ||
            newProfile.experienceLevel !== profile?.experienceLevel ||
            // newProfile.industry !== profile?.industry ||
            newProfile.jobFunction !== profile?.jobFunction ||
            newProfile.selectLanguageEng !== profile?.selectLanguageEng ||
            newProfile.selectLanguageFr !== profile?.selectLanguageFr ||
            // newProfile.localisation !== profile?.localisation ||
            newProfile.personality !== profile?.personality ||
            // newProfile.sizeOfWork !== profile?.sizeOfWork ||
            JSON.stringify(newProfile.titles) !== JSON.stringify(profile?.titles) ||
            // JSON.stringify(newProfile.questionaire) !== JSON.stringify(profile?.questionaire) ||
            // newProfile.notified !== profile?.notified ||
            // newProfile.processWithCompany !== profile?.processWithCompany ||
            // newProfile.legallyWork !== profile?.legallyWork ||
            // newProfile.needSponsor !== profile?.needSponsor ||
            // newProfile.relocate !== profile?.relocate ||
            // newProfile.unWantedIndustry !== profile?.unWantedIndustry ||
            // newProfile.salaryId !== profile?.salaryId ||
            newProfile.culture !== profile?.culture
        ) {
            updated = true;
        }

        if (!updated && (profile?.skills || selectedSkills)) {
            if (!profile?.skills && selectedSkills) {
                updated = true;
            } else if (profile?.skills && selectedSkills) {
                if (profile?.skills.length !== selectedSkills.length) {
                    updated = true;
                } else {
                    profile?.skills.forEach((sk: Skills) => {
                        const foundInd = selectedSkills.find((s: CommonTypeOptions) => s.value === sk.skill);
                        if (!foundInd) updated = true;
                    });
                }
            }
        }
        if (!updated && (profile?.additionalsSkills || selectedAdditionalsSkills)) {
            if (!profile?.additionalsSkills && selectedAdditionalsSkills) {
                updated = true;
            } else if (profile?.additionalsSkills && selectedAdditionalsSkills) {
                if (profile?.additionalsSkills.length !== selectedAdditionalsSkills.length) {
                    updated = true;
                } else {
                    profile?.additionalsSkills.forEach((sk: Skills) => {
                        const foundInd = selectedAdditionalsSkills.find((s: CommonTypeOptions) => s.value === sk.skill);
                        if (!foundInd) updated = true;
                    });
                }
            }
        }

        return updated;
    };

    useEffect(() => {
        setEnableSave(isProfileUpdated());
    }, [newProfile, profile]);

    useEffect(() => {
        if (isSaving && !loading) {
            setIsSaving(false);
        }
    }, [isSaving, loading]);

    useEffect(() => {
        dispatch(fetchCandidatetInfo());
    }, [i18n.resolvedLanguage.toLocaleUpperCase()]);

    const isValidForm = useCallback((): boolean => {
        if (loading) return false;
        let foundError = false;
        msgErr.clear();
        checkErrorMsg(newProfile.experienceLevel, 'experienceLevel', t('selectExperience'), msgErr, setMsgErr);
        checkErrorMsg(newProfile.titles, 'title', t('selectTitle'), msgErr, setMsgErr);
        checkErrorMsg(newProfile.jobFunction, 'jobFuntion', t('selectJobFunction'), msgErr, setMsgErr);
        checkErrorMsg(selectedSkills, 'skillsArray', t('selectSkill'), msgErr, setMsgErr);
        checkErrorMsg(selectedAdditionalsSkills, 'additionalsSkillsArray', t('additionalsSkills'), msgErr, setMsgErr);
        checkErrorMsg(newProfile.personality, 'selectPersonality', t('selectPersonality'), msgErr, setMsgErr);
        checkErrorMsg(newProfile.selectLanguageEng, 'selectLanguageEng', t('selectLanguageEng'), msgErr, setMsgErr);
        checkErrorMsg(newProfile.selectLanguageFr, 'selectLanguageFr', t('selectLanguageFr'), msgErr, setMsgErr);
        if (selectedSkills.length !== 3) {
            msgErr.set('skillsArray', `${t('lenghtError')}3`);
            setMsgErr(msgErr);
        }

        msgErr.forEach((key, value) => {
            if (value !== '') {
                foundError = true;
            }
        });
        return !foundError;
    }, [msgErr, newProfile, loading]);

    const handleSave = () => {
        if (isValidForm()) {
            setIsSaving(true);
            onClose();
            const updatedProfile = {
                ...newProfile,
                skills: convertSkillsForProfileDto(selectedSkills),
                additionalsSkills: convertSkillsForProfileDto(selectedAdditionalsSkills),
            };
            if (Array.isArray(updatedProfile.jobFunction)) {
                updatedProfile.jobFunction = updatedProfile.jobFunction.map((x) => x.value).join(',');
            }
            handleUpdateProfile({
                titles: updatedProfile.titles,
                jobFunction: updatedProfile.jobFunction,
                skills: updatedProfile.skills,
                additionalsSkills: updatedProfile.additionalsSkills,
                experienceLevel: updatedProfile.experienceLevel,

                culture: updatedProfile.culture,
                personality: updatedProfile.personality,
                selectLanguageEng: updatedProfile.selectLanguageEng,
                selectLanguageFr: updatedProfile.selectLanguageFr,
            });
        }
    };

    return (
        <Modal open={isOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Grid container direction="row" className={css.container}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={11}>
                            <Typography id="modal-modal-title" className={css.title}>
                                {t('professionalInformation')}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} textAlign="right">
                            <IconButton onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={css.content}>
                    <Grid container>
                        <Grid item xs={12} sx={{ marginBottom: '16px' }}>
                            <AutoCompleteComponent
                                id="selectTitle"
                                label={t('jobTitle')}
                                multiple
                                handleChange={handleChangeQuestionnaire(manageForm, 'selectTitle')}
                                defaultValue={[]}
                                currValue={newProfile.titles}
                                options={profileParameters ? profileParameters.titles : []}
                                errorMsg={msgErr}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: '16px' }}>
                            <AutoCompleteComponent
                                id="jobFuntion"
                                label={t('jobFuntion')}
                                placeholder={t('selectJobFunction')}
                                multiple
                                handleChange={handleChangeQuestionnaire(manageForm, 'jobFuntion')}
                                defaultValue={[]}
                                options={profileParameters ? profileParameters.functions : []}
                                currValue={
                                    profileParameters
                                        ? convertListToCommonType(
                                              profileParameters.functions,
                                              newProfile.jobFunction
                                          ) || []
                                        : []
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: '16px' }}>
                            <AutoCompleteComponent
                                id="skillsArray"
                                label={t('skills')}
                                multiple
                                handleChange={handleChangeQuestionnaire(manageForm, 'skillsArray')}
                                defaultValue={[]}
                                currValue={selectedSkills}
                                options={skillsOptions.filter(
                                    (x) => !selectedAdditionalsSkills.some((item: any) => x.value === item.value)
                                )}
                                errorMsg={msgErr}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: '16px' }}>
                            <AutoCompleteComponent
                                id="additionalsSkillsArray"
                                label={t('additionalsSkills')}
                                multiple
                                handleChange={handleChangeQuestionnaire(manageForm, 'additionalsSkills')}
                                defaultValue={[]}
                                currValue={selectedAdditionalsSkills}
                                options={skillsOptions.filter(
                                    (x) => !selectedSkills.some((item: any) => x.value === item.value)
                                )}
                                errorMsg={msgErr}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: '16px' }}>
                            <SelectComponent
                                id="experienceLevel"
                                label={t('experienceLevel')}
                                placeHolder={t('selectExperience')}
                                currentValue={newProfile.experienceLevel}
                                options={profileParameters ? profileParameters.experienceLevels : []}
                                errorMsg={msgErr}
                                handleChange={handleChangeQuestionnaire(manageForm, 'experienceLevel')}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: '16px' }}>
                            <AutoCompleteComponent
                                id="selectedCulture"
                                label={t('selectCulture')}
                                placeholder={t('selectCulture')}
                                defaultValue={[]}
                                currValue={
                                    profileParameters
                                        ? convertListToCommonType(profileParameters.cultures, newProfile.culture) || []
                                        : []
                                }
                                options={profileParameters ? profileParameters.cultures : []}
                                errorMsg={msgErr}
                                multiple
                                handleChange={handleChangeQuestionnaire(manageForm, 'selectedCulture')}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: '16px', paddingBottom: '16px' }}>
                            <AutoCompleteComponent
                                id="selectPersonality"
                                label={t('selectPersonality')}
                                placeholder={t('selectPersonality')}
                                defaultValue={[]}
                                currValue={
                                    profileParameters
                                        ? convertListToCommonType(
                                              profileParameters.personalities,
                                              newProfile.personality
                                          ) || []
                                        : []
                                }
                                options={profileParameters ? profileParameters.personalities : []}
                                errorMsg={msgErr}
                                multiple
                                handleChange={handleChangeQuestionnaire(manageForm, 'selectPersonality')}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: '16px', paddingBottom: '16px' }}>
                            <SelectComponent
                                id="selectLanguageEng"
                                label={t('selectLanguageEng')}
                                placeHolder={t('selectLanguageEng')}
                                currentValue={newProfile.selectLanguageEng}
                                options={languesOptions}
                                errorMsg={msgErr}
                                handleChange={handleChangeQuestionnaire(manageForm, 'selectLanguageEng')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectComponent
                                id="selectLanguageFr"
                                label={t('selectLanguageFr')}
                                placeHolder={t('selectLanguageFr')}
                                currentValue={newProfile.selectLanguageFr}
                                options={languesOptions}
                                errorMsg={msgErr}
                                handleChange={handleChangeQuestionnaire(manageForm, 'selectLanguageFr')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ paddingTop: '12px' }}>
                    <Grid container>
                        <Grid item xs={4} className={globalClasses.gridBtnLogin}>
                            <StyledBtnComponent
                                title={t('cancel')}
                                handleOnClick={onClose}
                                red={false}
                                btWidth="auto"
                                btHeight="50px"
                            />
                        </Grid>
                        <Grid item xs={4} className={globalClasses.gridBtnRegister}>
                            <StyledBtnComponent
                                title={t('save')}
                                handleOnClick={handleSave}
                                disabled={!enableSave}
                                loading={isSaving && loading}
                                btWidth="auto"
                                btHeight="50px"
                                red
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default ProfessionalInformation;
