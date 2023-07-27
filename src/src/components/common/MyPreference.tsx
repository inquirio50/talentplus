import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Grid,
    Typography,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    Modal,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { fetchCandidatetInfo } from '../../store/reducers/candidate/candidateActions';
import { CloseIcon } from '../icons/Icons';
import { Profile } from '../../models/profile';
import { RootState } from '../../store/store';
import SelectComponent from '../common/SelectComponent';
import { getOptionsLabeled, TYPE_OF_WORK_OPTIONS, TYPE_BENEFITS, TYPE_NOTIFICATION } from '../helpers/typeOptions';
import StyledBtnComponent from './StyledBtnComponent';
import globalStyles from '../../config/globalCss';
import i18n from '../../config/i18next';
import { CONSULTANT_ROLE } from '../../config/constants';
import {
    checkErrorMsg,
    convertArrayCommonTypeOptionsToStringValue,
    convertListToCommonType,
    handleChangeQuestionnaire,
} from '../helpers/utilityFunctions';
import AutoCompleteComponent from './AutoCompleteComponent';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '30px',
        gap: '10px',
        width: '90%',
        maxWidth: 560,
        maxHeight: 800,
        height: '90vh',
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

    close: {
        cursor: 'pointer',
    },
}));

const MyPreference = ({
    handleUpdateProfile,
    profile,
    isOpen,
    onClose,
}: {
    handleUpdateProfile: any;
    profile: Profile;
    isOpen: any;
    onClose: any;
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [newProfile, setNewProfile] = useState<Profile>({ ...profile });
    const { profileParameters }: { profileParameters: any } = useSelector((state: RootState) => ({
        profileParameters: state.generic.profilParameters,
    }));
    const [benefits, setBenefits] = useState(
        convertListToCommonType(getOptionsLabeled(TYPE_BENEFITS, t), profile?.questionaire?.benefits)
    );

    const [isSaving, setIsSaving] = useState(false);
    const [enableSave, setEnableSave] = useState(false);
    const globalClasses = globalStyles();
    const css = styles();

    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());

    const { loading }: { loading: boolean } = useSelector((state: RootState) => ({
        loading: state.generic.loading,
    }));

    const isProfileUpdated = (): boolean => {
        let updated = false;

        if (
            newProfile.typeOfWork !== profile?.typeOfWork ||
            newProfile.industry !== profile?.industry ||
            // newProfile.projectDescription !== profile?.projectDescription ||
            // newProfile.experienceLevel !== profile?.experienceLevel ||
            // newProfile.jobFunction !== profile?.jobFunction ||
            newProfile.localisation !== profile?.localisation ||
            // newProfile.incorporated !== profile?.incorporated ||
            newProfile.sizeOfWork !== profile?.sizeOfWork ||
            // JSON.stringify(newProfile.titles) !== JSON.stringify(profile?.titles) ||
            JSON.stringify(newProfile.questionaire) !== JSON.stringify(profile?.questionaire) ||
            newProfile.notified !== profile?.notified ||
            newProfile.processWithCompany !== profile?.processWithCompany ||
            newProfile.legallyWork !== profile?.legallyWork ||
            newProfile.needSponsor !== profile?.needSponsor ||
            newProfile.relocate !== profile?.relocate ||
            newProfile.unWantedIndustry !== profile?.unWantedIndustry ||
            newProfile.salaryId !== profile?.salaryId // ||
            // newProfile.culture !== profile?.culture
        ) {
            updated = true;
        }

        return updated;
    };

    const isConsultant = () => profile && profile?.role && profile?.role.includes(CONSULTANT_ROLE);

    const manageForm = (type: string, newValue?: any) => {
        const updateProfile = { ...newProfile };
        switch (type) {
            case 'selectedPayment': {
                updateProfile.salaryId = newValue;
                checkErrorMsg(
                    updateProfile.salaryId,
                    'selectedPayment',
                    t(isConsultant() ? 'selectRate' : 'selectSalary'),
                    msgErr,
                    setMsgErr
                );
                break;
            }
            case 'selectedTypeWork': {
                updateProfile.typeOfWork = convertArrayCommonTypeOptionsToStringValue(newValue);
                checkErrorMsg(updateProfile.typeOfWork, 'selectedTypeWork', t('selectTypeWork'), msgErr, setMsgErr);
                break;
            }
            case 'selectedIndustry': {
                if (newValue.length <= 5) {
                    updateProfile.industry = convertArrayCommonTypeOptionsToStringValue(newValue);
                    checkErrorMsg(updateProfile.industry, 'selectedIndustry', t('selectIndustry'), msgErr, setMsgErr);
                }
                break;
            }
            case 'selectUnwantedIndustry': {
                updateProfile.unWantedIndustry = convertArrayCommonTypeOptionsToStringValue(newValue);
                checkErrorMsg(
                    updateProfile.unWantedIndustry,
                    'selectUnwantedIndustry',
                    t('selectUnwantedIndustry'),
                    msgErr,
                    setMsgErr
                );
                break;
            }
            case 'selectSizeWork': {
                updateProfile.sizeOfWork = convertArrayCommonTypeOptionsToStringValue(newValue);
                checkErrorMsg(updateProfile.sizeOfWork, 'selectSizeWork', t('selectSizeWork'), msgErr, setMsgErr);
                break;
            }
            case 'selectLocalization': {
                updateProfile.localisation = convertArrayCommonTypeOptionsToStringValue(newValue);
                checkErrorMsg(
                    updateProfile.localisation,
                    'selectLocalization',
                    t('selectLocalization'),
                    msgErr,
                    setMsgErr
                );
                break;
            }
            case 'selectBenefits': {
                setBenefits(newValue);
                const convertedValue = convertArrayCommonTypeOptionsToStringValue(newValue.map((x: any) => x.value));
                updateProfile.questionaire = { ...updateProfile.questionaire, benefits: convertedValue };
                checkErrorMsg(
                    updateProfile.questionaire?.benefits,
                    'selectBenefits',
                    t('selectBenefits'),
                    msgErr,
                    setMsgErr
                );
                break;
            }
            case 'selectNotified': {
                updateProfile.notified = newValue;
                checkErrorMsg(updateProfile.notified, 'selectNotified', t('selectNotified'), msgErr, setMsgErr);
                break;
            }
            case 'questionSponsor': {
                updateProfile.needSponsor = newValue === 'true';
                break;
            }
            case 'questionLeggaly': {
                updateProfile.legallyWork = newValue === 'true';
                break;
            }
            case 'notifyMeWhenMatchIsDeclined': {
                updateProfile.questionaire = { ...updateProfile.questionaire, notifyIfMatchDeclined: newValue };
                break;
            }
            case 'relocate': {
                updateProfile.relocate = newValue === 'true';
                break;
            }
            case 'selectionProcess': {
                updateProfile.processWithCompany = newValue === 'true';
                break;
            }

            default:
                break;
        }
        setNewProfile(updateProfile);
    };

    const optionsTypeWork = getOptionsLabeled(TYPE_OF_WORK_OPTIONS, t);
    const optionsTypeBenefits = getOptionsLabeled(TYPE_BENEFITS, t);
    const optionsTypeNotifications = getOptionsLabeled(TYPE_NOTIFICATION, t);

    useEffect(() => {
        setEnableSave(isProfileUpdated());
    }, [newProfile, profile]);

    useEffect(() => {
        dispatch(fetchCandidatetInfo());
    }, [i18n.resolvedLanguage.toLocaleUpperCase()]);

    const isValidForm = useCallback((): boolean => {
        if (loading) return false;
        let foundError = false;
        checkErrorMsg(
            newProfile.salaryId,
            'selectedPayment',
            t(isConsultant() ? 'selectRate' : 'selectSalary'),
            msgErr,
            setMsgErr
        );
        checkErrorMsg(newProfile.typeOfWork, 'selectedTypeWork', t('selectTypeWork'), msgErr, setMsgErr);
        checkErrorMsg(newProfile.industry, 'selectedIndustry', t('selectIndustry'), msgErr, setMsgErr);
        checkErrorMsg(
            newProfile.unWantedIndustry,
            'selectUnwantedIndustry',
            t('selectUnwantedIndustry'),
            msgErr,
            setMsgErr
        );
        checkErrorMsg(newProfile.sizeOfWork, 'selectSizeWork', t('selectSizeWork'), msgErr, setMsgErr);
        checkErrorMsg(newProfile.localisation, 'selectLocalization', t('selectLocalization'), msgErr, setMsgErr);
        checkErrorMsg(newProfile.questionaire?.benefits, 'selectBenefits', t('selectBenefits'), msgErr, setMsgErr);
        checkErrorMsg(newProfile.notified, 'selectNotified', t('selectNotified'), msgErr, setMsgErr);

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
            handleUpdateProfile({
                salaryId: newProfile.salaryId,
                typeOfWork: newProfile.typeOfWork,
                industry: newProfile.industry,
                unWantedIndustry: newProfile.unWantedIndustry,
                sizeOfWork: newProfile.sizeOfWork,

                localisation: newProfile.localisation,
                questionaire: newProfile.questionaire,
                notified: newProfile.notified,
                needSponsor: newProfile.needSponsor,

                legallyWork: newProfile.legallyWork,
                relocate: newProfile.relocate,
                processWithCompany: newProfile.processWithCompany,
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
                                {t('myPreferences')}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} textAlign="right" className={css.close}>
                            <CloseIcon onClick={onClose} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={css.content}>
                    <Grid container>
                        <Grid container spacing={2}>
                            <Grid item xs={12} marginBottom={1}>
                                <SelectComponent
                                    id="selectedPayment"
                                    label={t(isConsultant() ? 'selectRate' : 'selectSalary')}
                                    placeHolder={t(isConsultant() ? 'selectRate' : 'selectSalary')}
                                    currentValue={newProfile.salaryId}
                                    options={
                                        profileParameters
                                            ? profileParameters.salaries.filter(
                                                  (x: any) => x.periode === (isConsultant() ? 'Hour' : 'Year')
                                              )
                                            : []
                                    }
                                    errorMsg={msgErr}
                                    handleChange={handleChangeQuestionnaire(manageForm, 'selectedPayment')}
                                />
                            </Grid>
                            <Grid item xs={12} marginBottom={1}>
                                <SelectComponent
                                    id="selectedTypeWork"
                                    label={t('selectedTypeWork')}
                                    placeHolder={t('selectTypeWork')}
                                    currentValue={newProfile.typeOfWork}
                                    options={optionsTypeWork}
                                    errorMsg={msgErr}
                                    multiple
                                    handleChange={handleChangeQuestionnaire(manageForm, 'selectedTypeWork')}
                                />
                            </Grid>
                            <Grid item xs={12} marginBottom={1}>
                                <SelectComponent
                                    id="selectIndustry"
                                    label={t('selectIndustry')}
                                    placeHolder={t('selectIndustry')}
                                    multiple
                                    handleChange={handleChangeQuestionnaire(manageForm, 'selectedIndustry')}
                                    options={
                                        profileParameters
                                            ? profileParameters.industries.filter((x: any) =>
                                                  newProfile.unWantedIndustry
                                                      ? !newProfile.unWantedIndustry
                                                            .split(',')
                                                            .some((item: any) => x.value === item)
                                                      : true
                                              )
                                            : []
                                    }
                                    currentValue={newProfile.industry}
                                    errorMsg={msgErr}
                                />
                            </Grid>
                            <Grid item xs={12} marginBottom={1}>
                                <SelectComponent
                                    id="selectUnwantedIndustry"
                                    label={t('selectUnwantedIndustry')}
                                    placeHolder={t('selectUnwantedIndustry')}
                                    currentValue={newProfile.unWantedIndustry}
                                    options={
                                        profileParameters
                                            ? profileParameters.industries.filter((x: any) =>
                                                  newProfile.industry
                                                      ? !newProfile.industry
                                                            .split(',')
                                                            .some((item: any) => x.value === item)
                                                      : true
                                              )
                                            : []
                                    }
                                    errorMsg={msgErr}
                                    multiple
                                    handleChange={handleChangeQuestionnaire(manageForm, 'selectUnwantedIndustry')}
                                />
                            </Grid>
                            <Grid item xs={12} marginBottom={1}>
                                <SelectComponent
                                    id="selectSizeWork"
                                    label={t('selectSizeWork')}
                                    placeHolder={t('selectSizeWork')}
                                    currentValue={newProfile.sizeOfWork}
                                    options={profileParameters ? profileParameters.sizeOfWorks : []}
                                    errorMsg={msgErr}
                                    multiple
                                    handleChange={handleChangeQuestionnaire(manageForm, 'selectSizeWork')}
                                />
                            </Grid>
                            <Grid item xs={12} marginBottom={1}>
                                <SelectComponent
                                    id="selectLocalization"
                                    label={t('selectLocalization')}
                                    placeHolder={t('selectLocalization')}
                                    currentValue={newProfile.localisation}
                                    options={profileParameters ? profileParameters.localisations : []}
                                    errorMsg={msgErr}
                                    multiple
                                    handleChange={handleChangeQuestionnaire(manageForm, 'selectLocalization')}
                                />
                            </Grid>
                            <Grid item xs={12} marginBottom={1}>
                                <AutoCompleteComponent
                                    id="selectBenefits"
                                    label={t('selectBenefits')}
                                    multiple
                                    handleChange={handleChangeQuestionnaire(manageForm, 'selectBenefits')}
                                    defaultValue={[]}
                                    options={optionsTypeBenefits}
                                    currValue={benefits || []}
                                    errorMsg={msgErr}
                                />
                            </Grid>
                            <Grid item xs={12} marginBottom={1}>
                                <SelectComponent
                                    id="selectNotified"
                                    label={t('notificationType')}
                                    placeHolder={t('selectNotified')}
                                    currentValue={newProfile.notified || ''}
                                    options={optionsTypeNotifications}
                                    errorMsg={msgErr}
                                    handleChange={handleChangeQuestionnaire(manageForm, 'selectNotified')}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel id="sponsor-radio-buttons-group-label" className={styles.gridTitle}>
                                        {t('questionSponsor')}
                                    </FormLabel>
                                    <RadioGroup
                                        value={newProfile.needSponsor}
                                        onChange={handleChangeQuestionnaire(manageForm, 'questionSponsor')}
                                        row
                                        aria-labelledby="sponsor-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group">
                                        <FormControlLabel value control={<Radio />} label={t('yes')} />
                                        <FormControlLabel value={false} control={<Radio />} label={t('no')} />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel
                                        id="questionLeggaly-radio-buttons-group-label"
                                        className={styles.gridTitle}>
                                        {t('questionLeggaly')}
                                    </FormLabel>
                                    <RadioGroup
                                        value={newProfile.legallyWork}
                                        onChange={handleChangeQuestionnaire(manageForm, 'questionLeggaly')}
                                        row
                                        aria-labelledby="questionLeggaly-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group">
                                        <FormControlLabel value control={<Radio />} label={t('yes')} />
                                        <FormControlLabel value={false} control={<Radio />} label={t('no')} />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel
                                        id="notifyMeWhenMatchIsDeclined-radio-buttons-group-label"
                                        className={styles.gridTitle}>
                                        {t('notifyMeWhenMatchIsDeclined')}{' '}
                                    </FormLabel>
                                    <RadioGroup
                                        value={newProfile.questionaire?.notifyIfMatchDeclined}
                                        onChange={handleChangeQuestionnaire(manageForm, 'notifyMeWhenMatchIsDeclined')}
                                        row
                                        aria-labelledby="notifyMeWhenMatchIsDeclined-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group">
                                        <FormControlLabel value control={<Radio />} label={t('yes')} />
                                        <FormControlLabel value={false} control={<Radio />} label={t('no')} />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel
                                        id="questionRelocate-radio-buttons-group-label"
                                        className={styles.gridTitle}>
                                        {t('questionRelocate')}
                                    </FormLabel>
                                    <RadioGroup
                                        value={newProfile.relocate}
                                        onChange={handleChangeQuestionnaire(manageForm, 'relocate')}
                                        row
                                        aria-labelledby="questionRelocate-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group">
                                        <FormControlLabel value control={<Radio />} label={t('yes')} />
                                        <FormControlLabel value={false} control={<Radio />} label={t('no')} />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel
                                        id="selectionProcess-radio-buttons-group-label"
                                        className={styles.gridTitle}>
                                        {t('selectionProcess')}
                                    </FormLabel>
                                    <RadioGroup
                                        value={newProfile.processWithCompany}
                                        onChange={handleChangeQuestionnaire(manageForm, 'selectionProcess')}
                                        row
                                        aria-labelledby="selectionProcess-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group">
                                        <FormControlLabel value control={<Radio />} label={t('yes')} />
                                        <FormControlLabel value={false} control={<Radio />} label={t('no')} />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    mt: 3,
                                    marginBottom: 1,
                                }}>
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
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default MyPreference;
