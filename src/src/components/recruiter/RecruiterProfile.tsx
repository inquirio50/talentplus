import { Avatar, Box, Button, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { UserCircle } from '../icons/Icons';
import DialogMsg from '../common/DialogMsg';
import {
    dispatchEmployerFetchProfile,
    recruiterProfileUpdateInfo,
} from '../../store/reducers/recruiter/recruiterActions';
import { RootState } from '../../store/store';
import globalStyles from '../../config/globalCss';
import StyledBtnComponent from '../common/StyledBtnComponent';
import TextFieldComponent from '../common/TextFieldComponent';
import SelectComponent from '../common/SelectComponent';
import AutoCompleteComponent from '../common/AutoCompleteComponent';
import { formatPhoneNumberDisplay } from '../helpers/utilityFunctions';
import ControlledEditor from './job/ControlledEditor';
import { Profile } from '../../models/profile';
import User from '../../models/user';
import { fetchProfilParameters } from '../../store/reducers/genericActions';

const useStyles = makeStyles((theme: Theme) => ({
    text: {
        fontSize: 10,
        color: theme.palette.baseColor,
        backgroundColor: theme.palette.common.white,
        border: '1px solid transparent',
        borderColor: theme.palette.baseColor,
        '&:focus': {
            backgroundColor: theme.palette.baseColor,
            color: theme.palette.common.white,
        },
        '&:hover': {
            backgroundColor: theme.palette.baseColor,
            color: theme.palette.common.white,
        },
    },
}));

const ActionDelete = ({
    handleDeleteAccount,
    handleClose,
    t,
}: {
    handleDeleteAccount: any;
    handleClose: any;
    t: any;
}) => (
    <Grid container justifyContent="center" alignItems="center" margin="auto">
        <Grid item xs={7} />
        <Grid item xs={3} textAlign="right">
            <StyledBtnComponent title={t('deleteAccount')} gridWidth={172} handleOnClick={handleDeleteAccount} />
        </Grid>
        <Grid item xs={2}>
            <StyledBtnComponent title={t('cancel')} gridWidth={145} handleOnClick={handleClose} />
        </Grid>
    </Grid>
);

const RecruiterProfile = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const globalClasses = globalStyles();
    const classes = useStyles();

    useEffect(() => {
        dispatch(dispatchEmployerFetchProfile());
    }, []);

    useEffect(() => {
        dispatch(fetchProfilParameters());
    }, []);

    const { profile } = useSelector((state: RootState) => state.recruiter);

    const { profileParameters }: { profileParameters: any } = useSelector((state: RootState) => ({
        profileParameters: state.generic.profilParameters,
    }));

    const [user] = useState<User>();
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleteAccount, setIsDeleteAccount] = useState(false);
    const [enableSave, setEnableSave] = useState(false);
    const [newProfile, setNewProfile] = useState<Profile>({ ...profile });

    useEffect(() => {
        setNewProfile({ ...profile });
    }, [profile]);

    const errorMsgForm = new Map<String, String>();

    const { loading }: { loading: boolean } = useSelector((state: RootState) => ({
        loading: state.generic.loading,
    }));

    const handleSave = () => {
        setIsSaving(true);
        dispatch(recruiterProfileUpdateInfo({ ...newProfile, address: undefined }));
    };

    const isProfileUpdated = (): boolean =>
        profile &&
        (newProfile.firstName !== profile.firstName ||
            newProfile.lastName !== profile.lastName ||
            newProfile.email !== profile.email ||
            newProfile.phoneNumber !== profile.phoneNumber ||
            JSON.stringify(newProfile.titles) !== JSON.stringify(profile.titles) ||
            newProfile.company.name !== profile.company.name ||
            newProfile.company.culture !== profile.company.culture ||
            newProfile.company.sizeOfWork !== profile.company.sizeOfWork ||
            newProfile.company.industry !== profile.company.industry ||
            newProfile.company.mission !== profile.company.mission ||
            newProfile.company.vision !== profile.company.vision);

    useEffect(() => {
        setEnableSave(isProfileUpdated());
    }, [profile, newProfile]);

    const handleDeleteAccount = () => {};

    const handleChange = (type: string) => (event: any) => {
        const { value } = event.target;
        const updateProfile = { ...newProfile };
        if (type === 'nameOfWork') {
            updateProfile.company = { ...newProfile.company, name: value };
        }
        if (type === 'firstName') {
            updateProfile.firstName = value;
        }
        if (type === 'lastName') {
            updateProfile.lastName = value;
        }
        if (type === 'email') {
            updateProfile.email = value;
        }
        if (type === 'phone') {
            updateProfile.phoneNumber = value;
        }
        setNewProfile(updateProfile);
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

    const handleChangeIndustry = (event: Event) => {
        event.stopPropagation();
        setNewProfile({ ...newProfile, company: { ...newProfile.company, industry: getValue(event) } });
    };

    const handleChangeSizeWork = (event: Event) => {
        event.stopPropagation();
        setNewProfile({ ...newProfile, company: { ...newProfile.company, sizeOfWork: getValue(event) } });
    };

    const handleChangeCulture = (event: Event) => {
        event.stopPropagation();
        setNewProfile({ ...newProfile, company: { ...newProfile.company, culture: getValue(event) } });
    };

    const handleChangeTitles = (event: Event, value: any) => {
        setNewProfile({ ...newProfile, titles: value });
    };

    const onEditorVisionChange = (value: any) => {
        setNewProfile({ ...newProfile, company: { ...newProfile.company, vision: value } });
    };

    const onEditorMissionChange = (value: any) => {
        setNewProfile({ ...newProfile, company: { ...newProfile.company, mission: value } });
    };

    const ActionDeleteComponent = (
        <ActionDelete handleClose={() => setIsDeleteAccount(false)} handleDeleteAccount={handleDeleteAccount} t={t} />
    );

    return (
        <Box sx={{ mt: 4, paddingLeft: 10, paddingRight: 10 }}>
            <Card>
                <CardContent>
                    {!isSaving && loading && <LinearProgress />}
                    <Grid container>
                        <Grid item md={6} xs={12} marginBottom={4}>
                            <Typography variant="h6">{t('companyInformation')}</Typography>
                        </Grid>
                        <Grid container spacing={2} marginBottom={2}>
                            <Grid item md={6} xs={12} marginTop="-10px">
                                <TextFieldComponent
                                    id="nameOfWork"
                                    label={t('nameOfWork')}
                                    name="nameOfWork"
                                    placeholder={t('nameOfWork')}
                                    handleChange={handleChange('nameOfWork')}
                                    value={newProfile?.company?.name || ''}
                                    autoCompleteInput="given-name"
                                />
                            </Grid>

                            <Grid item md={6} xs={12} marginBottom={1}>
                                <SelectComponent
                                    id="selectedIndustry"
                                    label={t('selectIndustry')}
                                    placeHolder={t('selectIndustry')}
                                    currentValue={newProfile?.company?.industry || ''}
                                    options={profileParameters ? profileParameters.industries : []}
                                    errorMsg={errorMsgForm}
                                    multiple
                                    handleChange={handleChangeIndustry}
                                />
                            </Grid>

                            <Grid item md={6} xs={12} marginBottom={1}>
                                <SelectComponent
                                    id="selectedSizeWork"
                                    label={t('selectSizeWork')}
                                    placeHolder={t('selectSizeWork')}
                                    currentValue={newProfile?.company?.sizeOfWork || ''}
                                    options={profileParameters ? profileParameters.sizeOfWorks : []}
                                    errorMsg={errorMsgForm}
                                    handleChange={handleChangeSizeWork}
                                />
                            </Grid>

                            <Grid item md={6} xs={12} sx={{ marginBottom: 1 }}>
                                <SelectComponent
                                    id="selectedCulture"
                                    label={t('selectCulture')}
                                    placeHolder={t('selectCulture')}
                                    currentValue={newProfile?.company?.culture || ''}
                                    options={profileParameters ? profileParameters.cultures : []}
                                    errorMsg={errorMsgForm}
                                    multiple
                                    handleChange={handleChangeCulture}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">{t('vision')}</Typography>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <ControlledEditor
                                    onEditorValueChange={onEditorVisionChange}
                                    editorData={newProfile ? newProfile.company?.vision : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">{t('mission')}</Typography>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <ControlledEditor
                                    onEditorValueChange={onEditorMissionChange}
                                    editorData={newProfile ? newProfile.company?.mission : ''}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent>
                    {!isSaving && loading && <LinearProgress />}
                    <Grid container>
                        <Grid item md={6} xs={12}>
                            <Typography variant="h6">{t('administratorProfil')}</Typography>
                        </Grid>
                        <Grid item md={6} xs={12} marginBottom={4}>
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                }}>
                                <Avatar
                                    src={user?.image || undefined}
                                    sx={{
                                        height: 40,
                                        width: 40,
                                    }}>
                                    <UserCircle fontSize="small" />
                                </Avatar>
                                <Button>{t('change')}</Button>
                            </Box>
                        </Grid>
                        <Grid container spacing={2} marginBottom={2}>
                            <Grid item md={6} xs={12} marginTop="-10px">
                                <TextFieldComponent
                                    id="firstName"
                                    label={t('firstName')}
                                    name="firstName"
                                    placeholder={t('enterFirstName')}
                                    handleChange={handleChange('firstName')}
                                    value={newProfile?.firstName}
                                    autoCompleteInput="given-name"
                                />
                            </Grid>

                            <Grid item md={6} xs={12} marginTop="-10px">
                                <TextFieldComponent
                                    id="lastName"
                                    label={t('lastName')}
                                    name="lastName"
                                    placeholder={t('enterLastName')}
                                    handleChange={handleChange('lastName')}
                                    value={newProfile?.lastName}
                                    autoCompleteInput="family-name"
                                />
                            </Grid>

                            <Grid item md={6} xs={12} sx={{ marginBottom: 1 }}>
                                <AutoCompleteComponent
                                    id="selectTitle"
                                    label={t('selectTitle')}
                                    multiple
                                    handleChange={handleChangeTitles}
                                    defaultValue={[]}
                                    options={profileParameters ? profileParameters.titles : []}
                                    currValue={newProfile?.titles ? newProfile.titles : []}
                                />
                            </Grid>

                            <Grid item md={6} xs={12} marginTop="-10px">
                                <TextFieldComponent
                                    id="email"
                                    label={t('email')}
                                    name="email"
                                    placeholder={t('enterEmailAddress')}
                                    handleChange={handleChange('email')}
                                    value={newProfile?.email}
                                    autoCompleteInput="email"
                                />
                            </Grid>

                            <Grid item md={6} xs={12} marginTop="-10px">
                                <TextFieldComponent
                                    id="phone"
                                    label={t('phone')}
                                    name="phone"
                                    placeholder={t('enterPhone')}
                                    handleChange={handleChange('phone')}
                                    value={formatPhoneNumberDisplay(newProfile?.phoneNumber)}
                                    autoCompleteInput="phone"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12} md={4} />
                                <Grid item xs={12} md={8}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            mt: 3,
                                        }}>
                                        <Grid container>
                                            <Grid item xs={10} />
                                            <Grid item xs={2} textAlign="end">
                                                <StyledBtnComponent
                                                    title={t('save')}
                                                    handleOnClick={handleSave}
                                                    disabled={!enableSave}
                                                    loading={isSaving && loading}
                                                    classesName={globalClasses.baseBtnDashboard}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={10}>
                            <Grid item xs={12}>
                                <Typography sx={{ fontSize: 18 }}>{t('deleteAccount')}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={{ fontSize: 14 }} variant="subtitle1">
                                    {t('deleteAccountTxt')}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} textAlign="end" display="flex" justifyContent="flex-end">
                            <StyledBtnComponent
                                title={t('deleteAccount')}
                                handleOnClick={() => setIsDeleteAccount(true)}
                                gridWidth={135}
                                classesName={classes.text}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <DialogMsg
                title={t('deleteAccount')}
                open={isDeleteAccount}
                handleClose={() => setIsDeleteAccount(false)}
                isAction
                ActionComponent={ActionDeleteComponent}>
                <Grid item xs={12}>
                    {t('deleteAccountTxt')}
                </Grid>
            </DialogMsg>
        </Box>
    );
};

export default RecruiterProfile;
