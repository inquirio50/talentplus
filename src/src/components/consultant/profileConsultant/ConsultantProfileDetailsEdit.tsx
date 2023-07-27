import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Profile } from '../../../models/profile';
import { RootState } from '../../../store/store';
import SelectComponent from '../../common/SelectComponent';
import { getOptionsLabeled, TYPE_OF_WORK_OPTIONS, TYPE_BENEFITS, TYPE_NOTIFICATION } from '../../helpers/typeOptions';
import TextFieldComponent from '../../common/TextFieldComponent';
import { CONSULTANT_ROLE } from '../../../config/constants';

const ConsultantProfileDetailsEdit = ({
    handleUpdateProfile,
    profile,
}: {
    handleUpdateProfile: any;
    profile: Profile;
}) => {
    const { t } = useTranslation();
    const [selectedTypeWork, setSelectedTypeWork] = useState(profile.typeOfWork || '');
    const [selectedLocalization, setSelectedLocalization] = useState(profile.localisation || '');
    const [selectedNotified, setSelectedNotified] = useState(profile.notified || '');
    const [processWithCompany, setProcessWithCompany] = useState(profile.processWithCompany);
    const [selectedBenefits, setSelectedBenefits] = useState(
        (profile.questionaire && profile.questionaire.benefits) || ''
    );

    const [notifyIfMatchDeclined, setNotifyIfMatchDeclined] = useState(
        (profile.questionaire && profile.questionaire.notifyIfMatchDeclined === 'true') || false
    );
    const [selectedSizeWork, setSelectedSizeWork] = useState(profile.sizeOfWork || '');
    const [selectedIndustry, setSelectedIndustry] = useState(profile.industry || '');
    const [selectedUnwantedIndustry, setSelectedUnwantedIndustry] = useState(profile.unWantedIndustry || '');
    const { profileParameters }: { profileParameters: any } = useSelector((state: RootState) => ({
        profileParameters: state.generic.profilParameters,
    }));
    const [summary, setSummary] = useState(profile.projectDescription);
    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);

    const [legallyWork, setLegalStatus] = useState(profile.legallyWork);
    const [needSponsor, setNeedSponsor] = useState(profile.needSponsor);
    const [relocate, setRelocate] = useState(profile.relocate);
    const [selectedPayment, setSelectedPayment] = useState(profile.salaryId || '');

    const errorMsgForm = new Map<String, String>();

    const handleChange = (type: string) => (event: any) => {
        const { value } = event.target;
        if (type === 'firstName') {
            setFirstName(value);
        }
        if (type === 'lastName') {
            setLastName(value);
        }
        if (type === 'summary') {
            setSummary(value);
        }
    };

    const handleChangeTypeWork = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
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
        setSelectedTypeWork(result);
    };

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

    const handleChangeLocalization = (event: Event) => {
        event.stopPropagation();
        setSelectedLocalization(getValue(event));
    };

    const handleChangeSizeWork = (event: Event) => {
        event.stopPropagation();
        setSelectedSizeWork(getValue(event));
    };

    const handleChangeIndustry = (event: Event) => {
        event.stopPropagation();
        setSelectedIndustry(getValue(event));
    };
    const handleChangeUnwantedIndustry = (event: Event) => {
        event.stopPropagation();
        setSelectedUnwantedIndustry(getValue(event));
    };

    const handleChangePayment = (event: Event) => {
        event.stopPropagation();
        setSelectedPayment(getValue(event));
    };

    const handleChangeLegalStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setLegalStatus(!legallyWork);
    };

    const handleChangeNeedSponsor = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setNeedSponsor(!needSponsor);
    };

    const handleChangeRelocate = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setRelocate(!relocate);
    };

    const handleChangeBenefits = (event: Event) => {
        event.stopPropagation();
        setSelectedBenefits(getValue(event));
    };

    const handleChangeNotified = (event: Event) => {
        event.stopPropagation();
        setSelectedNotified(getValue(event));
    };

    const handleChangeNotifyIfMatchIsDeclined = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setNotifyIfMatchDeclined(!notifyIfMatchDeclined);
    };

    const handleChangeProcessWithCompany = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setProcessWithCompany(!processWithCompany);
    };

    const isConsultant = () => profile && profile.role && profile.role.includes(CONSULTANT_ROLE);

    const optionsTypeWork = getOptionsLabeled(TYPE_OF_WORK_OPTIONS, t);
    const optionsTypeBenefits = getOptionsLabeled(TYPE_BENEFITS, t);
    const optionsTypeNotifications = getOptionsLabeled(TYPE_NOTIFICATION, t);

    useEffect(() => {
        const newProfile: Profile = {
            ...profile,
            typeOfWork: selectedTypeWork,
            salaryId: selectedPayment,
            summary,
            projectDescription: summary,
            firstName,
            lastName,
            industry: selectedIndustry,
            localisation: selectedLocalization,
            sizeOfWork: selectedSizeWork,
            unWantedIndustry: selectedUnwantedIndustry,
            legallyWork,
            relocate,
            notified: selectedNotified,
            processWithCompany,
            needSponsor,
            questionaire: {
                ...profile.questionaire,
                notifyIfMatchDeclined: notifyIfMatchDeclined.toString(),
                benefits: selectedBenefits,
            },
        };
        handleUpdateProfile(newProfile);
    }, [
        summary,
        selectedTypeWork,
        selectedPayment,
        selectedIndustry,
        selectedLocalization,
        selectedSizeWork,
        selectedUnwantedIndustry,
        legallyWork,
        relocate,
        selectedNotified,
        processWithCompany,
        notifyIfMatchDeclined,
        selectedBenefits,
        needSponsor,
    ]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sx={{ paddingBottom: 5 }}>
                <Typography variant="h6">{t('myPreferences')}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12} marginBottom={1}>
                        <SelectComponent
                            id="selectedPayment"
                            label={t(isConsultant() ? 'selectRate' : 'selectSalary')}
                            placeHolder={t(isConsultant() ? 'selectRate' : 'selectSalary')}
                            currentValue={selectedPayment}
                            options={
                                profileParameters
                                    ? profileParameters.salaries.filter(
                                          (x: any) => x.periode === (isConsultant() ? 'Hour' : 'Year')
                                      )
                                    : []
                            }
                            errorMsg={errorMsgForm}
                            handleChange={handleChangePayment}
                        />
                    </Grid>
                    <Grid item md={6} xs={12} marginBottom={1}>
                        <SelectComponent
                            id="selectedTypeWork"
                            label={t('selectedTypeWork')}
                            placeHolder={t('selectTypeWork')}
                            currentValue={selectedTypeWork}
                            options={optionsTypeWork}
                            errorMsg={errorMsgForm}
                            multiple
                            handleChange={handleChangeTypeWork}
                        />
                    </Grid>

                    <Grid item md={6} xs={12} marginBottom={1}>
                        <SelectComponent
                            id="selectedIndustry"
                            label={t('selectIndustry')}
                            placeHolder={t('selectIndustry')}
                            currentValue={selectedIndustry}
                            options={
                                profileParameters
                                    ? profileParameters.industries.filter(
                                          (x: any) =>
                                              !selectedUnwantedIndustry.split(',').some((item: any) => x.value === item)
                                      )
                                    : []
                            }
                            errorMsg={errorMsgForm}
                            multiple
                            handleChange={handleChangeIndustry}
                        />
                    </Grid>

                    <Grid item md={6} xs={12} marginBottom={1}>
                        <SelectComponent
                            id="selectedUnwantedIndustry"
                            label={t('selectUnwantedIndustry')}
                            placeHolder={t('selectUnwantedIndustry')}
                            currentValue={selectedUnwantedIndustry}
                            options={
                                profileParameters
                                    ? profileParameters.industries.filter(
                                          (x: any) => !selectedIndustry.split(',').some((item: any) => x.value === item)
                                      )
                                    : []
                            }
                            errorMsg={errorMsgForm}
                            multiple
                            handleChange={handleChangeUnwantedIndustry}
                        />
                    </Grid>

                    <Grid item md={6} xs={12} marginBottom={1}>
                        <SelectComponent
                            id="selectedSizeWork"
                            label={t('selectSizeWork')}
                            placeHolder={t('selectSizeWork')}
                            currentValue={selectedSizeWork}
                            options={profileParameters ? profileParameters.sizeOfWorks : []}
                            errorMsg={errorMsgForm}
                            multiple
                            handleChange={handleChangeSizeWork}
                        />
                    </Grid>

                    <Grid item md={6} xs={12} marginBottom={1}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={legallyWork} onChange={handleChangeLegalStatus} />}
                                label={t('question10')}
                            />
                        </FormGroup>
                    </Grid>

                    {!legallyWork && (
                        <Grid item md={6} xs={12} marginBottom={1}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Switch checked={needSponsor} onChange={handleChangeNeedSponsor} />}
                                    label={t('question10-1')}
                                />
                            </FormGroup>
                        </Grid>
                    )}

                    <Grid item md={6} xs={12} marginBottom={1}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={relocate} onChange={handleChangeRelocate} />}
                                label={t('question9-p')}
                            />
                        </FormGroup>
                    </Grid>

                    <Grid item md={6} xs={12} marginBottom={1}>
                        <SelectComponent
                            id="selectedLocalization"
                            label={t('selectLocalization')}
                            placeHolder={t('selectLocalization')}
                            currentValue={selectedLocalization}
                            options={profileParameters ? profileParameters.localisations : []}
                            errorMsg={errorMsgForm}
                            multiple
                            handleChange={handleChangeLocalization}
                        />
                    </Grid>

                    <Grid item md={6} xs={12} marginBottom={1}>
                        <SelectComponent
                            id="selectBenefits"
                            label={t('selectBenefits')}
                            placeHolder={t('selectBenefits')}
                            currentValue={selectedBenefits}
                            options={optionsTypeBenefits}
                            errorMsg={errorMsgForm}
                            multiple
                            handleChange={handleChangeBenefits}
                        />
                    </Grid>

                    <Grid item md={6} xs={12} marginBottom={1}>
                        <SelectComponent
                            id="selectNotified"
                            label={t('notificationType')}
                            placeHolder={t('selectNotified')}
                            currentValue={selectedNotified}
                            options={optionsTypeNotifications}
                            errorMsg={errorMsgForm}
                            handleChange={handleChangeNotified}
                        />
                    </Grid>

                    <Grid item md={6} xs={12} marginBottom={1}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={notifyIfMatchDeclined}
                                        onChange={handleChangeNotifyIfMatchIsDeclined}
                                    />
                                }
                                label={t('NotificationIfMatchDeclined')}
                            />
                        </FormGroup>
                    </Grid>

                    <Grid item md={6} xs={12} marginBottom={1}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch checked={processWithCompany} onChange={handleChangeProcessWithCompany} />
                                }
                                label={t('question21')}
                            />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <TextFieldComponent
                            id="summary"
                            label={t('summary')}
                            name="summary"
                            placeholder={t('enterSummary')}
                            handleChange={handleChange('summary')}
                            value={summary}
                            multiline
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ConsultantProfileDetailsEdit;
