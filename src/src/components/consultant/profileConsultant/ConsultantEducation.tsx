import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import globalStyles from '../../../config/globalCss';
import StyledBtnComponent from '../../common/StyledBtnComponent';
import { Profile } from '../../../models/profile';
import { RootState } from '../../../store/store';
import TextFieldComponent from '../../common/TextFieldComponent';
import { Education } from '../../../models/education';
import EducationDisplay from '../../common/EducationDisplay';
import SelectComponent from '../../common/SelectComponent';
import { getOptionsLabeled, TYPE_YEAR_OPTIONS } from '../../helpers/typeOptions';
import { fetchCandidatetInfo } from '../../../store/reducers/candidate/candidateActions';
import {
    prodileAddEducation,
    prodileDeleteEducation,
    prodileEditEducation,
} from '../../../store/reducers/genericActions';

const ConsultantEducation = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [, updateState] = useState<any | undefined>();
    const forceUpdate: any = useCallback(() => updateState({}), []);
    const gloBalClasses = globalStyles();
    const { profile, loading }: { profile: Profile; loading: boolean } = useSelector((state: RootState) => ({
        profile: state.candidate.profile,
        loading: state.generic.loading,
    }));

    const [errorMsgForm, setErrorMsgForm] = useState<Map<String, String>>(new Map<String, String>());
    const yearOptions = getOptionsLabeled(TYPE_YEAR_OPTIONS, t);

    const [isEditing, setIsEditing] = useState(false);
    const [editEducation, setEditEducation] = useState<Education | null>(null);
    const [country, setCountry] = useState('');
    const [institutionName, setInstitutionName] = useState('');
    const [degree, setDegree] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = (id: string) => (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const educationToEdit = profile.education.find((ed: Education) => ed.id === id);
        if (educationToEdit) {
            setCountry(educationToEdit.country);
            setInstitutionName(educationToEdit.institutionName);
            setDegree(educationToEdit.degree);
            setStartYear(educationToEdit.startYear);
            setEndYear(educationToEdit.endYear || '');
            setEditEducation(educationToEdit);
            setIsEditing(true);
        }
    };
    const newEducation = () => {
        setEditEducation(null);
        setCountry('');
        setInstitutionName('');
        setDegree('');
        setStartYear('');
        setEndYear('');
        setIsEditing(!isEditing);
    };

    const handleDelete = (id: string) => (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        newEducation();
        dispatch(prodileDeleteEducation(id));
    };

    const handleChange = (type: string) => (event: any) => {
        const { value } = event.target;
        switch (type) {
            case 'country': {
                if (value === '') {
                    errorMsgForm.set('country', t('errorInputCountry'));
                    setErrorMsgForm(errorMsgForm);
                } else {
                    errorMsgForm.delete('country');
                }
                setCountry(value);
                break;
            }
            case 'degree': {
                if (value === '') {
                    errorMsgForm.set('degree', t('errorInputDegree'));
                    setErrorMsgForm(errorMsgForm);
                } else {
                    errorMsgForm.delete('degree');
                }
                setDegree(value);
                break;
            }
            case 'institutionName': {
                if (value === '') {
                    errorMsgForm.set('institutionName', t('errorInputInstitution'));
                    setErrorMsgForm(errorMsgForm);
                } else {
                    errorMsgForm.delete('institutionName');
                }
                setInstitutionName(value);
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

    const checkFormValid = (): boolean => {
        if (country === '') {
            errorMsgForm.set('country', t('errorInputCountry'));
            setErrorMsgForm(errorMsgForm);
        }
        if (degree === '') {
            errorMsgForm.set('degree', t('errorInputDegree'));
            setErrorMsgForm(errorMsgForm);
        }
        if (institutionName === '') {
            errorMsgForm.set('institutionName', t('errorInputInstitution'));
            setErrorMsgForm(errorMsgForm);
        }
        if (
            country === '' ||
            errorMsgForm.get('country') === '' ||
            errorMsgForm.get('country') === null ||
            degree === '' ||
            errorMsgForm.get('degree') === '' ||
            errorMsgForm.get('degree') === null ||
            institutionName === '' ||
            errorMsgForm.get('institutionName') === '' ||
            errorMsgForm.get('institutionName') === null
        ) {
            return false;
        }
        return true;
    };

    const handleSaveEducation = () => {
        if (checkFormValid()) {
            const educationPayload: Education = {
                country,
                degree,
                institutionName,
                startYear,
                endYear,
            };
            setIsSaving(true);
            if (editEducation) {
                educationPayload.id = editEducation.id;
                educationPayload.appUserId = editEducation.appUserId;
                dispatch(prodileEditEducation(educationPayload));
            } else {
                dispatch(prodileAddEducation(educationPayload));
            }
        } else {
            forceUpdate();
        }
    };

    const isEducationUpdated = () =>
        editEducation?.country !== country ||
        editEducation?.institutionName !== institutionName ||
        editEducation?.degree !== degree ||
        editEducation?.startYear !== startYear ||
        editEducation?.endYear !== endYear;

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
                            {t('education')}
                        </Typography>
                    </Grid>
                    <Divider />
                    <Grid item xs={12} className="experience_form">
                        {isEditing && (
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <TextFieldComponent
                                        id="country"
                                        label={t('country')}
                                        name="country"
                                        placeholder={t('inputCountry')}
                                        handleChange={handleChange('country')}
                                        value={country}
                                        autoCompleteInput="country"
                                        error={errorMsgForm || null}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextFieldComponent
                                        id="degree"
                                        label={t('degree')}
                                        name="degree"
                                        placeholder={t('inputDegree')}
                                        handleChange={handleChange('degree')}
                                        value={degree}
                                        error={errorMsgForm || null}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldComponent
                                        id="institutionName"
                                        label={t('institutionName')}
                                        name="institutionName"
                                        placeholder={t('inputInstitutionName')}
                                        handleChange={handleChange('institutionName')}
                                        value={institutionName}
                                        error={errorMsgForm || null}
                                    />
                                </Grid>
                                <Grid item xs={6} marginTop={2}>
                                    <Grid container>
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
                            <EducationDisplay
                                educations={profile.education}
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
                            title={isEditing ? t('saveEducation') : t('addEducation')}
                            handleOnClick={isEditing ? handleSaveEducation : newEducation}
                            loading={loading}
                            disabled={isEditing ? !isEducationUpdated() : false}
                        />
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default ConsultantEducation;
