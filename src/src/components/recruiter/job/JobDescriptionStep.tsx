/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box, Button, TextField, Typography, Switch, FormControlLabel, FormGroup, TextFieldProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AutoCompleteComponent from '../../common/AutoCompleteComponent';
import MaterialSelect from '../../common/MaterialSelect';
import MaterialSearchInput from '../../common/MaterialSearchInput';
import { RootState } from '../../../store/store';
import { updateJob } from '../../../store/reducers/recruiter/recruiterActions';
import { getAddressDisplay, convertStringToAddress } from '../../helpers/utilityFunctions';

import {
    DURATION_INTERVAL_OPTIONS,
    DURATION_TIME_OPTIONS,
    getOptionsLabeled,
    TYPE_OF_WORK_OPTIONS,
    TYPE_SKILLS_OPTIONS,
    LEVEL_LANGUAGE_OPTIONS,
} from '../../helpers/typeOptions';
import ControlledEditor from './ControlledEditor';
import { ArrowRight } from '../../icons/Icons';
import { CONTRACTOR, EMPLOYEE, JOB_OFFICE, JOB_HYBRID } from '../../../config/constants';
import { Jobs } from '../../../models/jobs';
import { fetchProfilParameters } from '../../../store/reducers/genericActions';
import SelectComponent from '../../common/SelectComponent';

interface JobDescriptionProps {
    onBack?: any;
    onNext?: any;
    type?: string;
}

interface Values {
    title: any;
    durationNumber: number;
    durationInterval: string;
    experience: string;
    selectedTypeWork: string[];
    skillsArray: Array<any>;
    address: string;
}

const JobDescriptionStep = ({ onBack, onNext, type }: JobDescriptionProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const { jobs } = useSelector((state: RootState) => state.recruiter);

    const jobDetails = id && jobs.find((el: Jobs) => el.id === id);

    const skillsOptions = getOptionsLabeled(TYPE_SKILLS_OPTIONS, t);
    const durationNumberOptions = getOptionsLabeled(DURATION_TIME_OPTIONS, t);
    const durationIntervalOptions = getOptionsLabeled(DURATION_INTERVAL_OPTIONS, t);
    const typeOfWorkOptions = getOptionsLabeled(TYPE_OF_WORK_OPTIONS, t);

    const [titles, setTitles] = useState(jobDetails ? jobDetails.titles : []);
    const [languageFr, setLanguageFr] = useState(jobDetails ? jobDetails.selectLanguageFr : '');
    const [languageEn, setLanguageEn] = useState(jobDetails ? jobDetails.selectLanguageEng : '');
    const [salaryId, setSalaryId] = useState(jobDetails ? jobDetails.salaryId : '');
    const [personality, setPersonality] = useState(jobDetails ? jobDetails.personalities : []);
    const [functions, setFunction] = useState(jobDetails ? jobDetails.jobFunctions : []);
    const [localisation, setLocalisation] = useState(jobDetails ? jobDetails.localisations : []);
    const [experienceLevel, setExperienceLevel] = useState(jobDetails ? jobDetails.experienceLevels : []);
    const [reference, setReference] = useState(jobDetails ? jobDetails.reference : '');

    const [published, setPublished] = useState(jobDetails ? jobDetails.published : true);
    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());

    const [description, setDescription] = useState(jobDetails ? jobDetails.description : '');

    const [skills, setSkills] = useState(
        jobDetails ? jobDetails.skills.map((item: any) => ({ value: item.skill, label: item.skill })) : []
    );

    const [additionalsSkills, setAdditionalsSkills] = useState(
        jobDetails ? jobDetails.additionalsSkills.map((item: any) => ({ value: item.skill, label: item.skill })) : []
    );

    const [startDate, setStartDate] = useState<Date | null>(new Date(Date.now()));
    const handleChange = (newValue: Date | null) => {
        setStartDate(newValue);
    };

    const isEmployeeJob = () => (jobDetails ? jobDetails.role === EMPLOYEE : type === EMPLOYEE);

    const isContractorJob = () => (jobDetails ? jobDetails.role === CONTRACTOR : type === CONTRACTOR);

    const validationSchema = yup.object({
        title: yup.string().required(),
        address: yup.string().required(),
        experience: yup.string().required(),
        selectedTypeWork: yup.array().required(),
    });

    const handleUpdate = (data: any) => {
        dispatch(updateJob(data));
    };

    const { profileParameters }: { profileParameters: any } = useSelector((state: RootState) => ({
        profileParameters: state.generic.profilParameters,
    }));

    const formik = useFormik({
        initialValues: {
            title: jobDetails ? jobDetails.titles : '',
            durationNumber: jobDetails ? jobDetails.durationNumber : 1,
            durationInterval: jobDetails ? jobDetails.durationType : 'year',
            experience: jobDetails ? jobDetails.experience : '',
            selectedTypeWork: jobDetails ? jobDetails.typeOfWork.split(',') : '',
            skillsArray: jobDetails
                ? jobDetails.skills.map((item: any) => ({ value: item.skill, label: item.skill }))
                : [],
            address: jobDetails ? getAddressDisplay(jobDetails.address) : '',
        },
        enableReinitialize: true,
        onSubmit: (value: Values) => {
            const skillList: any[] = [];
            skills.forEach((skill: any) => {
                const skillObj: any = {
                    domain: 'IT',
                    skill: skill.value.trim(),
                };
                skillList.push(skillObj);
            });
            const jobPost = {
                id: jobDetails && jobDetails.id,
                title: titles,
                durationNumber: value.durationNumber,
                durationType: value.durationInterval,
                reference: jobDetails ? jobDetails.reference : '',
                skills: skillList,
                description,
                experience: value.experience,
                address: '',
                typeOfWork: value.selectedTypeWork.toString(),
                startDate,
                role: jobDetails ? jobDetails.role : type,
                createdAt: new Date(),
                published,
                localisation,
                personality,
                languageFr,
                languageEn,
                experienceLevel,
                jobFunction: functions,
                salaryId,
            };
            if (jobDetails !== undefined) handleUpdate(jobPost);
            else onNext(jobPost);
        },
        validationSchema,
    });

    const isLocalizationAvailable = () =>
        formik.values.selectedTypeWork.includes(JOB_OFFICE) || formik.values.selectedTypeWork.includes(JOB_HYBRID);

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

    const checkValidation = (): any => {
        const errorMsg = new Map<string, string>();

        if (titles.length === 0) errorMsg.set('selectTitle', t('valueIsRequired'));

        if (skills.length === 0) errorMsg.set('skillsArray', t('valueIsRequired'));

        if (additionalsSkills.length === 0) errorMsg.set('additionalsSkillsArray', t('valueIsRequired'));

        if (experienceLevel.length === 0) errorMsg.set('experienceLevel', t('valueIsRequired'));

        if (languageEn === '') errorMsg.set('selectLanguageEng', t('valueIsRequired'));

        if (languageFr === '') errorMsg.set('selectLanguageFr', t('valueIsRequired'));

        if (personality.length === 0) errorMsg.set('personality', t('valueIsRequired'));

        if (personality.length === 0) errorMsg.set('personality', t('valueIsRequired'));

        if (formik.values.address === '') errorMsg.set('address', t('valueIsRequired'));

        if (isLocalizationAvailable())
            if (localisation.length === 0) errorMsg.set('localisation', t('valueIsRequired'));

        if (formik.values.selectedTypeWork.length === 0) errorMsg.set('selectedTypeWork', t('valueIsRequired'));

        setMsgErr(errorMsg);
        return errorMsg;
    };

    const onClick = () => {
        const errorMsg = checkValidation();
        if (errorMsg.size !== 0) return;
        const skillList: any[] = [];
        skills.forEach((skill: any) => {
            const skillObj: any = {
                domain: 'IT',
                skill: skill.value.trim(),
                IsCoreSkill: true,
            };
            skillList.push(skillObj);
        });
        const additionalsSkillList: any[] = [];
        additionalsSkills.forEach((skill: any) => {
            const skillObj: any = {
                domain: 'IT',
                skill: skill.value.trim(),
                IsCoreSkill: false,
            };
            additionalsSkillList.push(skillObj);
        });
        const isString = typeof formik.values.address === 'string';
        const jobPost = {
            id: jobDetails && jobDetails.id,
            durationNumber: formik.values.durationNumber,
            durationType: formik.values.durationInterval,
            reference,
            skills: skillList,
            additionalsSkills: additionalsSkillList,
            description,
            experience: formik.values.experience,
            address: isString ? convertStringToAddress(formik.values.address) : formik.values.address,
            typeOfWork: formik.values.selectedTypeWork.toString(),
            startDate,
            role: jobDetails ? jobDetails.role : type,
            createdAt: new Date(),
            published,
            title: getValue(titles.map((x: any) => x.value)),
            localisation: getValue(localisation.map((x: any) => x.value)),
            personality: getValue(personality.map((x: any) => x.value)),
            SelectLanguageEng: languageFr,
            SelectLanguageFr: languageEn,
            jobFunction: getValue(functions.map((x: any) => x.value)),
            experienceLevel: getValue(experienceLevel.map((x: any) => x.value)),
            salaryId,
        };
        if (jobDetails !== undefined) handleUpdate(jobPost);
        else onNext(jobPost);
    };

    const onEditorValueChange = (data: any) => {
        setDescription(data);
    };

    const handleChangeSkills = (event: Event, value: any) => {
        if (value.length === 0) {
            msgErr.set('skillsArray', t('valueIsRequired'));
        } else {
            msgErr.delete('skillsArray');
        }
        setMsgErr(msgErr);
        setSkills(value);
    };

    const handleChangeAdditionalsSkills = (event: Event, value: any) => {
        if (value.length === 0) {
            msgErr.set('additionalsSkillsArray', t('valueIsRequired'));
        } else {
            msgErr.delete('additionalsSkillsArray');
        }
        setMsgErr(msgErr);
        setAdditionalsSkills(value);
    };

    const handleChangeTitles = (event: Event, value: any) => {
        if (value.length === 0) {
            msgErr.set('selectTitle', t('valueIsRequired'));
        } else {
            msgErr.delete('selectTitle');
        }
        setMsgErr(msgErr);
        setTitles(value);
    };

    const handleChangeLocalisation = (event: Event, value: any) => {
        if (isLocalizationAvailable())
            if (value.length === 0) {
                msgErr.set('localisation', t('valueIsRequired'));
            } else {
                msgErr.delete('localisation');
            }
        setMsgErr(msgErr);
        setLocalisation(value);
    };

    const handleChangeLanguageFr = (event: any) => {
        const { value } = event.target;

        if (value?.length === 0) {
            msgErr.set('selectLanguageFr', t('valueIsRequired'));
        } else {
            msgErr.delete('selectLanguageFr');
        }
        setMsgErr(msgErr);
        setLanguageFr(value);
    };

    const handleChangeLanguageEn = (event: any) => {
        const { value } = event.target;

        if (value?.length === 0) {
            msgErr.set('selectLanguageEng', t('valueIsRequired'));
        } else {
            msgErr.delete('selectLanguageEng');
        }
        setMsgErr(msgErr);
        setLanguageEn(value);
    };

    const handleSalaryId = (event: any) => {
        const { value } = event.target;

        if (value?.length === 0) {
            msgErr.set('selectedPayment', t('valueIsRequired'));
        } else {
            msgErr.delete('selectedPayment');
        }
        setMsgErr(msgErr);
        setSalaryId(value);
    };

    const handleChangePersonality = (event: Event, value: any) => {
        if (value.length === 0) {
            msgErr.set('personality', t('valueIsRequired'));
        } else {
            msgErr.delete('personality');
        }
        setMsgErr(msgErr);
        setPersonality(value);
    };

    const handleChangeExperienceLevel = (event: Event, value: any) => {
        if (value.length === 0) {
            msgErr.set('experienceLevel', t('valueIsRequired'));
        } else {
            msgErr.delete('experienceLevel');
        }
        setMsgErr(msgErr);
        setExperienceLevel(value);
    };

    const handleChangeFunctions = (event: Event, value: any) => {
        if (value.length === 0) {
            msgErr.set('functions', t('valueIsRequired'));
        } else {
            msgErr.delete('functions');
        }
        setMsgErr(msgErr);
        setFunction(value);
    };

    useEffect(() => {
        dispatch(fetchProfilParameters());
    }, []);

    const handleChangePublished = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setPublished(!published);
    };

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 3,
                        gridTemplateColumns: {
                            lg: 'repeat(2, 1fr)',
                            md: 'repeat(2, 1fr)',
                            sm: '1fr',
                            xs: '1fr',
                        },
                    }}>
                    <div>
                        <AutoCompleteComponent
                            id="selectTitle"
                            label={t('selectTitle')}
                            multiple
                            handleChange={handleChangeTitles}
                            defaultValue={titles || []}
                            currValue={titles || []}
                            options={profileParameters ? profileParameters.titles : []}
                        />
                        {msgErr !== null && msgErr.get('selectTitle') && (
                            <div className="error">{t('valueIsRequired')}</div>
                        )}
                    </div>
                    <div>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={published} onChange={handleChangePublished} />}
                                label={t('published')}
                            />
                        </FormGroup>
                    </div>
                    <div>
                        <TextField
                            id="jobReference"
                            fullWidth
                            label={`${t('jobReference')}`}
                            name="jobReference"
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                        />
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label={t('Start date')}
                            inputFormat="MM/dd/yyyy"
                            value={startDate}
                            onChange={handleChange}
                            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                <TextField {...params} />
                            )}
                        />
                    </LocalizationProvider>
                    {isEmployeeJob() && (
                        <>
                            <Box
                                sx={{
                                    display: 'grid',
                                    alignContent: 'end',
                                }}>
                                <AutoCompleteComponent
                                    id="skillsArray"
                                    label={t('skills')}
                                    multiple
                                    handleChange={handleChangeSkills}
                                    defaultValue={skills}
                                    currValue={skills || []}
                                    options={skillsOptions.filter(
                                        (x) => !additionalsSkills.some((item: any) => x.value === item.value)
                                    )}
                                />
                                {msgErr !== null && msgErr.get('skillsArray') && (
                                    <div className="error">{t('valueIsRequired')}</div>
                                )}
                            </Box>
                            <Box
                                sx={{
                                    display: 'grid',
                                    alignContent: 'end',
                                }}>
                                <AutoCompleteComponent
                                    id="additionalsSkillsArray"
                                    label={t('additionalsSkills')}
                                    multiple
                                    handleChange={handleChangeAdditionalsSkills}
                                    defaultValue={additionalsSkills}
                                    currValue={additionalsSkills || []}
                                    options={skillsOptions.filter(
                                        (x) => !skills.some((item: any) => x.value === item.value)
                                    )}
                                />
                                {msgErr !== null && msgErr.get('skillsArray') && (
                                    <div className="error">{t('valueIsRequired')}</div>
                                )}
                            </Box>
                        </>
                    )}

                    <Box
                        sx={{
                            display: 'grid',
                            gap: 3,
                            gridTemplateColumns: {
                                lg: 'repeat(2, 1fr)',
                                md: 'repeat(2, 1fr)',
                                sm: '1fr',
                                xs: '1fr',
                            },
                        }}>
                        <SelectComponent
                            id="selectedPayment"
                            label={t(isEmployeeJob() ? 'selectedPayment' : 'selectRate')}
                            placeHolder={t(isEmployeeJob() ? 'selectedPayment' : 'selectRate')}
                            currentValue={salaryId || ''}
                            options={
                                profileParameters
                                    ? profileParameters.salaries.filter(
                                          (x: any) => x.periode === (isEmployeeJob() ? 'Year' : 'Hour')
                                      )
                                    : []
                            }
                            handleChange={handleSalaryId}
                        />
                        {msgErr !== null && msgErr.get('selectedPayment') && (
                            <div className="error">{t('valueIsRequired')}</div>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            alignContent: 'end',
                            marginBottom: 2,
                        }}>
                        <AutoCompleteComponent
                            id="functions"
                            label={t('selectJobFunction')}
                            multiple
                            handleChange={handleChangeFunctions}
                            defaultValue={functions || []}
                            currValue={functions || []}
                            options={profileParameters ? profileParameters.functions : []}
                        />
                        {msgErr !== null && msgErr.get('functions') && (
                            <div className="error">{t('valueIsRequired')}</div>
                        )}
                    </Box>
                    {isContractorJob() && (
                        <Box
                            sx={{
                                display: 'grid',
                                alignContent: 'end',
                                marginBottom: 2,
                            }}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gap: 3,
                                    gridTemplateColumns: {
                                        lg: 'repeat(2, 1fr)',
                                        md: 'repeat(2, 1fr)',
                                        sm: '1fr',
                                        xs: '1fr',
                                    },
                                }}>
                                <MaterialSelect
                                    id="durationNumber"
                                    name="durationNumber"
                                    isMulti={false}
                                    options={durationNumberOptions}
                                    initValues={[formik.values.durationNumber.toString()]}
                                    form={formik}
                                    placeholder={t('Select number')}
                                />
                                <MaterialSelect
                                    id="durationInterval"
                                    name="durationInterval"
                                    isMulti={false}
                                    options={durationIntervalOptions}
                                    initValues={[formik.values.durationInterval]}
                                    form={formik}
                                    placeholder={t('Year/Month')}
                                />
                            </Box>
                        </Box>
                    )}
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gap: 3,
                        gridTemplateColumns: {
                            lg: 'repeat(2, 1fr)',
                            md: 'repeat(2, 1fr)',
                            sm: '1fr',
                            xs: '1fr',
                        },
                    }}>
                    {isContractorJob() && (
                        <>
                            <Box
                                sx={{
                                    display: 'grid',
                                    alignContent: 'end',
                                    marginTop: 2,
                                    marginBottom: 3,
                                }}>
                                <AutoCompleteComponent
                                    id="skillsArray"
                                    label={t('skills')}
                                    multiple
                                    handleChange={handleChangeSkills}
                                    defaultValue={skills}
                                    currValue={skills}
                                    options={skillsOptions}
                                />
                                {msgErr !== null && msgErr.get('skillsArray') && (
                                    <div className="error">{t('valueIsRequired')}</div>
                                )}
                            </Box>
                            <Box
                                sx={{
                                    display: 'grid',
                                    alignContent: 'end',
                                    marginBottom: 3,
                                }}>
                                <AutoCompleteComponent
                                    id="additionalsSkillsArray"
                                    label={t('additionalsSkills')}
                                    multiple
                                    handleChange={handleChangeAdditionalsSkills}
                                    defaultValue={additionalsSkills}
                                    currValue={additionalsSkills}
                                    options={skillsOptions}
                                />
                                {msgErr !== null && msgErr.get('skillsArray') && (
                                    <div className="error">{t('valueIsRequired')}</div>
                                )}
                            </Box>
                        </>
                    )}

                    <Box
                        sx={{
                            display: 'grid',
                            alignContent: 'end',
                        }}>
                        <AutoCompleteComponent
                            id="experienceLevel"
                            label={t('experienceLevel')}
                            multiple
                            handleChange={handleChangeExperienceLevel}
                            defaultValue={experienceLevel}
                            currValue={experienceLevel || []}
                            options={profileParameters ? profileParameters.experienceLevels : []}
                        />
                        {msgErr !== null && msgErr.get('experienceLevel') && (
                            <div className="error">{t('valueIsRequired')}</div>
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            alignContent: 'end',
                        }}>
                        <SelectComponent
                            id="selectLanguageEng"
                            label={t('selectLanguageEng')}
                            placeHolder={t('selectLanguageEng')}
                            currentValue={languageEn || ''}
                            options={getOptionsLabeled(LEVEL_LANGUAGE_OPTIONS, t) || []}
                            handleChange={handleChangeLanguageEn}
                        />
                        {msgErr !== null && msgErr.get('selectLanguageEng') && (
                            <div className="error">{t('valueIsRequired')}</div>
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            alignContent: 'end',
                        }}>
                        <SelectComponent
                            id="selectLanguageFr"
                            label={t('selectLanguageFr')}
                            placeHolder={t('selectLanguageFr')}
                            currentValue={languageFr || ''}
                            options={getOptionsLabeled(LEVEL_LANGUAGE_OPTIONS, t) || []}
                            handleChange={handleChangeLanguageFr}
                        />

                        {msgErr !== null && msgErr.get('selectLanguageFr') && (
                            <div className="error">{t('valueIsRequired')}</div>
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            alignContent: 'end',
                        }}>
                        <AutoCompleteComponent
                            id="personality"
                            label={t('personality')}
                            multiple
                            handleChange={handleChangePersonality}
                            defaultValue={personality}
                            currValue={personality || []}
                            options={profileParameters ? profileParameters.personalities : []}
                        />
                        {msgErr !== null && msgErr.get('personality') && (
                            <div className="error">{t('valueIsRequired')}</div>
                        )}
                    </Box>

                    <Box>
                        <MaterialSelect
                            id="selectedTypeWork"
                            name="selectedTypeWork"
                            isMulti
                            options={typeOfWorkOptions}
                            initValues={formik.values.selectedTypeWork}
                            form={formik}
                            placeholder={t('selectedTypeWork')}
                        />
                        {msgErr !== null && msgErr.get('selectedTypeWork') && (
                            <div className="error">{t('valueIsRequired')}</div>
                        )}
                    </Box>

                    {isLocalizationAvailable() && (
                        <Box>
                            <AutoCompleteComponent
                                id="localisation"
                                label={t('localization')}
                                multiple
                                handleChange={handleChangeLocalisation}
                                defaultValue={localisation}
                                currValue={localisation || []}
                                options={profileParameters ? profileParameters.localisations : []}
                            />
                            {msgErr !== null && msgErr.get('localisation') && (
                                <div className="error">{t('valueIsRequired')}</div>
                            )}
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        mt: 2,
                    }}>
                    <MaterialSearchInput
                        id="address"
                        name="address"
                        label={t('address')}
                        value={formik.values.address}
                        form={formik}
                        error={formik.errors.address}
                    />
                    {msgErr !== null && msgErr.get('address') && <div className="error">{t('valueIsRequired')}</div>}
                </Box>
                <Box
                    sx={{
                        mt: 2,
                    }}>
                    <Typography sx={{ marginBottom: '10px' }} variant="h6">
                        {t('Howwouldyoudescribethejobpost?')}
                    </Typography>
                    <ControlledEditor
                        onEditorValueChange={onEditorValueChange}
                        editorData={jobDetails ? jobDetails.description : ''}
                    />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Button
                        endIcon={!jobDetails && <ArrowRight fontSize="small" />}
                        onClick={() => {
                            onClick();
                        }}
                        variant="contained">
                        {jobDetails ? t('Save') : t('Create Job')}
                    </Button>
                    {!jobDetails && (
                        <Button onClick={onBack} sx={{ ml: 2 }}>
                            {t('Back')}
                        </Button>
                    )}
                </Box>
            </form>
        </div>
    );
};

JobDescriptionStep.defaultProps = {
    onBack: null,
    onNext: null,
    type: null,
};

export default JobDescriptionStep;
