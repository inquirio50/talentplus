import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Profile } from '../../../models/profile';
import AutoCompleteComponent from '../../common/AutoCompleteComponent';
import { RootState } from '../../../store/store';
import SelectComponent from '../../common/SelectComponent';
import { getOptionsLabeled, TYPE_SKILLS_OPTIONS, LEVEL_LANGUAGE_OPTIONS } from '../../helpers/typeOptions';
import { convertSkillsForProfileDto, convertSkillsOptions } from '../../helpers/utilityFunctions';

const ConsultantPersonnalInformation = ({
    handleUpdateProfile,
    profile,
}: {
    handleUpdateProfile: any;
    profile: Profile;
}) => {
    const { t } = useTranslation();
    const skillsOptions = getOptionsLabeled(TYPE_SKILLS_OPTIONS, t);
    const languesOptions = getOptionsLabeled(LEVEL_LANGUAGE_OPTIONS, t);
    const [selectedJobFunction, setSelectedJobFunction] = useState(profile.jobFunction || '');
    const [selectedSkills, setSelectedSkills] = useState(convertSkillsOptions(profile.skills));
    const [selectedAdditionalsSkills, setSelectedAdditionalsSkills] = useState(
        convertSkillsOptions(profile.additionalsSkills)
    );
    const [selectedExperience, setSelectedExperience] = useState(profile.experienceLevel || '');
    const [selectedCulture, setSelectedCulture] = useState(profile.culture || '');
    const [selectedPersonality, setSelectedPersonality] = useState(profile.personality || '');
    const [selectedLanguageEng, setSelectedLanguageEng] = useState(profile.selectLanguageEng || '');
    const [selectedLanguageFr, setSelectedLanguageFr] = useState(profile.selectLanguageFr || '');
    const [selectedTitles, setSelectedTitles] = useState(profile.titles ? profile.titles : []);

    const { currentProfile }: { currentProfile: Profile } = useSelector((state: RootState) => ({
        currentProfile: state.candidate.profile,
    }));
    const { profileParameters }: { profileParameters: any } = useSelector((state: RootState) => ({
        profileParameters: state.generic.profilParameters,
    }));

    const errorMsgForm = new Map<String, String>();

    const getValue = (event: any): string => {
        const { value } = event.target;
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

    const handleChangeSkills = (event: Event, value: any) => {
        setSelectedSkills(value);
    };

    const handleChangeAdditionalsSkills = (event: Event, value: any) => {
        setSelectedAdditionalsSkills(value);
    };

    const handleChangeTitles = (event: Event, value: any) => {
        setSelectedTitles(value);
    };

    const handleChangeJobFunction = (event: Event) => {
        event.stopPropagation();

        setSelectedJobFunction(getValue(event));
    };

    const handleChangeExperience = (event: Event) => {
        event.stopPropagation();
        setSelectedExperience(getValue(event));
    };

    const handleChangeCulture = (event: Event) => {
        event.stopPropagation();
        setSelectedCulture(getValue(event));
    };

    const handleChangePersonality = (event: Event) => {
        event.stopPropagation();
        setSelectedPersonality(getValue(event));
    };

    const handleChangeLanguageEng = (event: Event) => {
        event.stopPropagation();
        setSelectedLanguageEng(getValue(event));
    };

    const handleChangeLanguageFr = (event: Event) => {
        event.stopPropagation();
        setSelectedLanguageFr(getValue(event));
    };

    useEffect(() => {
        const newProfile: Profile = {
            ...profile,
            skills: convertSkillsForProfileDto(selectedSkills),
            additionalsSkills: convertSkillsForProfileDto(selectedAdditionalsSkills),
            titles: selectedTitles,
            culture: selectedCulture,
            experienceLevel: selectedExperience,
            personality: selectedPersonality,
            jobFunction: selectedJobFunction,
            selectLanguageEng: selectedLanguageEng,
            selectLanguageFr: selectedLanguageFr,
        };
        handleUpdateProfile(newProfile);
    }, [
        selectedSkills,
        selectedAdditionalsSkills,
        selectedTitles,
        selectedCulture,
        selectedLanguageEng,
        selectedExperience,
        selectedPersonality,
        selectedJobFunction,
        selectedLanguageFr,
    ]);

    useEffect(() => {
        setSelectedTitles(currentProfile.titles ? currentProfile.titles : []);
    }, [currentProfile]);
    return (
        <Grid container>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <AutoCompleteComponent
                    id="selectTitle"
                    label={t('selectTitle')}
                    multiple
                    handleChange={handleChangeTitles}
                    defaultValue={[]}
                    currValue={selectedTitles}
                    options={profileParameters ? profileParameters.titles : []}
                />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <SelectComponent
                    id="selectJobFunction"
                    label={t('selectJobFunction')}
                    placeHolder={t('selectJobFunction')}
                    currentValue={selectedJobFunction}
                    options={profileParameters ? profileParameters.functions : []}
                    errorMsg={errorMsgForm}
                    multiple
                    handleChange={handleChangeJobFunction}
                />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <AutoCompleteComponent
                    id="skillsArray"
                    label={t('skills')}
                    multiple
                    handleChange={handleChangeSkills}
                    defaultValue={[]}
                    currValue={selectedSkills}
                    options={skillsOptions.filter(
                        (x) => !selectedAdditionalsSkills.some((item: any) => x.value === item.value)
                    )}
                />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <AutoCompleteComponent
                    id="additionalsSkillsArray"
                    label={t('additionalsSkills')}
                    multiple
                    handleChange={handleChangeAdditionalsSkills}
                    defaultValue={[]}
                    currValue={selectedAdditionalsSkills}
                    options={skillsOptions.filter((x) => !selectedSkills.some((item: any) => x.value === item.value))}
                />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <SelectComponent
                    id="selectedExperience"
                    label={t('selectExperience')}
                    placeHolder={t('selectExperience')}
                    currentValue={selectedExperience}
                    options={profileParameters ? profileParameters.experienceLevels : []}
                    errorMsg={errorMsgForm}
                    multiple
                    handleChange={handleChangeExperience}
                />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <SelectComponent
                    id="selectedCulture"
                    label={t('selectCulture')}
                    placeHolder={t('selectCulture')}
                    currentValue={selectedCulture}
                    options={profileParameters ? profileParameters.cultures : []}
                    errorMsg={errorMsgForm}
                    multiple
                    handleChange={handleChangeCulture}
                />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <SelectComponent
                    id="selectedPersonality"
                    label={t('selectPersonality')}
                    placeHolder={t('selectPersonality')}
                    currentValue={selectedPersonality}
                    options={profileParameters ? profileParameters.personalities : []}
                    errorMsg={errorMsgForm}
                    multiple
                    handleChange={handleChangePersonality}
                />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <SelectComponent
                    id="selectLanguageEng"
                    label={t('selectLanguageEng')}
                    placeHolder={t('selectLanguageEng')}
                    currentValue={selectedLanguageEng}
                    options={languesOptions}
                    errorMsg={errorMsgForm}
                    handleChange={handleChangeLanguageEng}
                />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <SelectComponent
                    id="selectLanguageFr"
                    label={t('selectLanguageFr')}
                    placeHolder={t('selectLanguageFr')}
                    currentValue={selectedLanguageFr}
                    options={languesOptions}
                    errorMsg={errorMsgForm}
                    handleChange={handleChangeLanguageFr}
                />
            </Grid>
        </Grid>
    );
};

export default ConsultantPersonnalInformation;
