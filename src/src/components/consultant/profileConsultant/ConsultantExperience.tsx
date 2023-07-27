import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, Checkbox, Divider, FormControlLabel, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import globalStyles from '../../../config/globalCss';
import { Profile } from '../../../models/profile';
import StyledBtnComponent from '../../common/StyledBtnComponent';
import ExperienceDisplay from '../../common/ExperienceDisplay';
import TextFieldComponent from '../../common/TextFieldComponent';
import SelectComponent from '../../common/SelectComponent';
import { getOptionsLabeled, TYPE_MONTH_OPTIONS, TYPE_SIZE_OPTIONS, TYPE_YEAR_OPTIONS } from '../../helpers/typeOptions';
import { Experience } from '../../../models/experience';
import {
    prodileAddExperience,
    prodileDeleteExperience,
    prodileEditExperience,
} from '../../../store/reducers/genericActions';
import { getSizeCompanySelectValue } from '../../helpers/utilityFunctions';
import { fetchCandidatetInfo } from '../../../store/reducers/candidate/candidateActions';

const ConsultantExperience = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const gloBalClasses = globalStyles();
    const { profile, loading }: { profile: Profile; loading: boolean } = useSelector((state: RootState) => ({
        profile: state.candidate.profile,
        loading: state.generic.loading,
    }));

    const errorMsgForm = new Map<String, String>();
    const sizeOptions = getOptionsLabeled(TYPE_SIZE_OPTIONS, t);
    const monthOptions = getOptionsLabeled(TYPE_MONTH_OPTIONS, t);
    const yearOptions = getOptionsLabeled(TYPE_YEAR_OPTIONS, t);

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [profileEdit, setProfileEdit] = useState<Experience | null>(null);
    const [title, setTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [sizeCompany, setSizeCompany] = useState('');
    const [startMonth, setStartMonth] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [isCurrent, setIsCurrent] = useState(false);

    const handleEdit = (id: string) => (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const experienceToEdit = profile.experience.find((e: Experience) => e.id === id);
        if (experienceToEdit) {
            setIsEditing(true);
            setTitle(experienceToEdit.title || '');
            setCompanyName(experienceToEdit.companyName || '');
            setSizeCompany(getSizeCompanySelectValue(experienceToEdit.sizeCompany));
            setStartMonth(
                experienceToEdit?.startingDate ? new Date(experienceToEdit?.startingDate).getMonth().toString() : ''
            );
            setStartYear(
                experienceToEdit?.startingDate ? new Date(experienceToEdit?.startingDate).getFullYear().toString() : ''
            );
            setEndMonth(
                experienceToEdit?.endingDate ? new Date(experienceToEdit?.endingDate).getMonth().toString() : ''
            );
            setEndYear(
                experienceToEdit?.endingDate ? new Date(experienceToEdit?.endingDate).getFullYear().toString() : ''
            );
            setIsCurrent(experienceToEdit.isCurrent);
            setProfileEdit(experienceToEdit);
        }
    };

    const newExperience = () => {
        setTitle('');
        setCompanyName('');
        setSizeCompany('');
        setStartMonth('');
        setStartYear('');
        setEndMonth('');
        setEndYear('');
        setIsCurrent(false);
        setProfileEdit(null);
        setIsEditing(!isEditing);
    };

    const handleDelete = (id: string) => (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        newExperience();
        dispatch(prodileDeleteExperience(id));
    };

    const checkFormValid = (): boolean => {
        if (
            errorMsgForm.get('title') === '' ||
            errorMsgForm.get('title') === null ||
            errorMsgForm.get('companyName') === '' ||
            errorMsgForm.get('companyName') === null ||
            errorMsgForm.get('startMonth') === '' ||
            errorMsgForm.get('startMonth') === null ||
            errorMsgForm.get('startYear') === '' ||
            errorMsgForm.get('startYear') === null
        ) {
            return false;
        }
        return true;
    };

    const handleSaveExperience = () => {
        if (checkFormValid()) {
            const capTxt = `${sizeCompany.charAt(0).toUpperCase()}${sizeCompany.slice(1)}`;
            // const endDateSubmit = new Date(parseInt(endYear, 10), parseInt(endMonth, 10), 1);
            const experiencePayload: Experience = {
                title,
                companyName,
                sizeCompany: `${capTxt} ${sizeCompany}`,
                // startingDate: new Date(parseInt(startYear, 10), parseInt(startMonth, 10), 1),
                // endingDate: isCurrent ? null : endDateSubmit,
                isCurrent,
                startMonth: '',
                startYear: '',
                endMonth: '',
                endYear: '',
            };

            if (profileEdit) {
                experiencePayload.id = profileEdit.id;
                experiencePayload.appUserId = profileEdit.appUserId;
                experiencePayload.description = profileEdit.description;
                dispatch(prodileEditExperience(experiencePayload));
            } else {
                dispatch(prodileAddExperience(experiencePayload));
            }
            setIsSaving(true);
        }
    };

    const handleChange = (type: string) => (event: any) => {
        const { value } = event.target;
        switch (type) {
            case 'title': {
                setTitle(value);
                break;
            }
            case 'companyName': {
                setCompanyName(value);
                break;
            }
            case 'sizeCompany': {
                setSizeCompany(value);
                break;
            }
            case 'startMonth': {
                setStartMonth(value);
                break;
            }
            case 'endMonth': {
                setEndMonth(value);
                break;
            }
            case 'startYear': {
                setStartYear(value);
                break;
            }
            case 'endYear': {
                setEndYear(value);
                break;
            }
            default: {
                break;
            }
        }
    };

    const handleIsCurrent = () => {
        if (!isCurrent) {
            setEndYear('');
            setEndMonth('');
        }
        setIsCurrent(!isCurrent);
    };

    const isExperienceUpdated = () =>
        profileEdit?.title !== title ||
        profileEdit?.companyName !== companyName ||
        profileEdit?.isCurrent !== isCurrent ||
        getSizeCompanySelectValue(profileEdit?.sizeCompany) !== sizeCompany ||
        (profileEdit?.startingDate ? new Date(profileEdit?.startingDate).getMonth().toString() : '') !== startMonth ||
        (profileEdit?.startingDate ? new Date(profileEdit?.startingDate).getFullYear().toString() : '') !== startYear ||
        (profileEdit?.endingDate ? new Date(profileEdit?.endingDate).getMonth().toString() : '') !== endMonth ||
        (profileEdit?.endingDate ? new Date(profileEdit?.endingDate).getFullYear().toString() : '') !== endYear;

    useEffect(() => {
        if (isSaving && !loading) {
            dispatch(fetchCandidatetInfo());
            setIsEditing(!isEditing);
        }
    }, [isSaving, loading]);

    return (
        <Card>
            <CardContent>
                <Grid container spacing={1} className="profile_card">
                    <Grid item xs={12} sx={{ paddingBottom: 5 }}>
                        <Typography gutterBottom variant="h5" component="div" className={gloBalClasses.titleDashboard}>
                            {t('experience')}
                        </Typography>
                    </Grid>
                    <Divider />
                    <Grid item xs={12} className="experience_form">
                        {isEditing && (
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextFieldComponent
                                        id="title"
                                        label={t('title')}
                                        name="title"
                                        placeholder={t('inputTitle')}
                                        handleChange={handleChange('title')}
                                        value={title}
                                        autoCompleteInput="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldComponent
                                        id="companyName"
                                        label={t('companyName')}
                                        name="companyName"
                                        placeholder={t('inputCompany')}
                                        handleChange={handleChange('companyName')}
                                        value={companyName}
                                        autoCompleteInput="given-name"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <SelectComponent
                                        label={t('sizeCompany')}
                                        id="sizeCompany"
                                        currentValue={sizeCompany}
                                        options={sizeOptions}
                                        errorMsg={errorMsgForm}
                                        placeHolder={t('inputSize')}
                                        multiple={false}
                                        handleChange={handleChange('sizeCompany')}
                                    />
                                </Grid>
                                <Grid item xs={6} />
                                <Grid item xs={6} marginTop={2}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <SelectComponent
                                                label={t('startMonth')}
                                                id="startMonth"
                                                currentValue={startMonth}
                                                options={monthOptions}
                                                errorMsg={errorMsgForm}
                                                placeHolder={t('inputMonth')}
                                                multiple={false}
                                                handleChange={handleChange('startMonth')}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <SelectComponent
                                                label={t('startYear')}
                                                id="startYear"
                                                currentValue={startYear}
                                                options={yearOptions}
                                                errorMsg={errorMsgForm}
                                                placeHolder={t('inputYear')}
                                                multiple={false}
                                                handleChange={handleChange('startYear')}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} marginTop={2}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <SelectComponent
                                                        label={t('endMonth')}
                                                        id="endMonth"
                                                        currentValue={endMonth}
                                                        options={monthOptions}
                                                        errorMsg={errorMsgForm}
                                                        placeHolder={t('inputMonth')}
                                                        multiple={false}
                                                        handleChange={handleChange('endMonth')}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={isCurrent}
                                                                sx={{
                                                                    color: '#c2185b',
                                                                    '&.Mui-checked': {
                                                                        color: '#d81b60',
                                                                    },
                                                                }}
                                                                onChange={handleIsCurrent}
                                                            />
                                                        }
                                                        label={t('currentJob')}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <SelectComponent
                                                label={t('endYear')}
                                                id="endYear"
                                                currentValue={endYear}
                                                options={yearOptions}
                                                errorMsg={errorMsgForm}
                                                placeHolder={t('inputYear')}
                                                multiple={false}
                                                handleChange={handleChange('endYear')}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                        {!isEditing && (
                            <ExperienceDisplay
                                experiences={profile.experience}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container justifyContent="flex-end" textAlign="right" className="add_btn">
                    <Grid item xs={8} />
                    <Grid item xs={2}>
                        {isEditing && (
                            <StyledBtnComponent title={t('cancel')} handleOnClick={() => setIsEditing(!isEditing)} />
                        )}
                    </Grid>
                    <Grid item xs={2}>
                        <StyledBtnComponent
                            title={isEditing ? t('saveExperience') : t('addExperience')}
                            handleOnClick={isEditing ? handleSaveExperience : newExperience}
                            loading={loading}
                            disabled={isEditing ? !isExperienceUpdated() : false}
                        />
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default ConsultantExperience;
