import { Avatar, Box, Button, Card, CardContent, Grid, LinearProgress, Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import { Profile } from '../../models/profile';
import AddressComponent from './AddressComponent';
import User from '../../models/user';
import { deleteResume, getResume, fetchCandidatetInfo } from '../../store/reducers/candidate/candidateActions';
import { profileUpdateInfo } from '../../store/reducers/genericActions';
import { RootState } from '../../store/store';
import { UserCircle } from '../icons/Icons';
import DialogMsg from './DialogMsg';
import FileUpLoad from './FileUpLoad';
import StyledBtnComponent from './StyledBtnComponent';
import TextFieldComponent from './TextFieldComponent';
import { CONSULTANT_ROLE, PERMANENT_ROLE } from '../../config/constants';
import ConsultantProfileDetailsEdit from '../consultant/profileConsultant/ConsultantProfileDetailsEdit';
import ConsultantPersonnalInformation from '../consultant/profileConsultant/ConsultantPersonnalInformation';
import { Skills } from '../../models/skills';
import globalStyles from '../../config/globalCss';
import i18n from '../../config/i18next';
import {
    convertStringToAddress,
    formatPhoneNumberDisplay,
    getAddressString,
    getResumeUrl,
} from '../helpers/utilityFunctions';

interface GeneralSettingsProps {
    user: User;
    profile: Profile;
    handleUpdateProfile: any;
}

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

const GeneralSettings = ({ user, profile, handleUpdateProfile }: GeneralSettingsProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const classes = useStyles();
    const globalClasses = globalStyles();
    const [firstName, setFirstName] = useState<string>(profile.firstName || '');
    const [lastName, setLastName] = useState<string>(profile.lastName || '');
    const [email, setEmail] = useState<string>(profile.email);
    const [phone, setPhone] = useState(formatPhoneNumberDisplay(profile.phoneNumber));
    const [addressProfile, setAddressProfile] = useState(getAddressString(profile.address));
    const [newProfile, setNewProfile] = useState<Profile>(profile);
    const [isFileUpLoadOpen, setIsFileUpLoadOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleteAccount, setIsDeleteAccount] = useState(false);
    const [enableSave, setEnableSave] = useState(false);
    const errorMsgForm = new Map<String, String>();

    const { loading }: { loading: boolean } = useSelector((state: RootState) => ({
        loading: state.generic.loading,
    }));

    const handleChange = (type: string) => (event: any) => {
        const { value } = event.target;
        const updateProfile = newProfile;
        if (type === 'firstName') {
            setFirstName(value);
            updateProfile.firstName = value;
        }
        if (type === 'lastName') {
            setLastName(value);
            updateProfile.lastName = value;
        }
        if (type === 'email') {
            setEmail(value);
            updateProfile.email = value;
        }
        if (type === 'phone') {
            setPhone(value);
            updateProfile.phoneNumber = value;
        }
        setNewProfile(updateProfile);
    };

    const handleSave = () => {
        setIsSaving(true);
        dispatch(profileUpdateInfo(newProfile));
    };

    const handleChangeAddress = (address: string) => {
        setAddressProfile(address);
        setNewProfile({ ...newProfile, address: convertStringToAddress(address) });
    };

    const handleDeleteAccount = () => {};

    const isProfileUpdated = (): boolean => {
        let updated = false;
        if (
            newProfile.firstName !== profile.firstName ||
            newProfile.lastName !== profile.lastName ||
            newProfile.email !== profile.email ||
            newProfile.phoneNumber !== profile.phoneNumber
        ) {
            updated = true;
        }
        if (!updated) {
            if (!profile.address && newProfile.address) {
                updated = true;
            } else if (profile.address && newProfile.address) {
                if (
                    profile.address.city !== newProfile.address.city ||
                    profile.address.country !== newProfile.address.country ||
                    profile.address.province !== newProfile.address.province ||
                    profile.address.street !== newProfile.address.street
                ) {
                    updated = true;
                }
            }
        }
        // Test for Consultant
        if (!updated && (user.role === CONSULTANT_ROLE || user.role === PERMANENT_ROLE)) {
            if (
                newProfile.typeOfWork !== profile.typeOfWork ||
                newProfile.startingRatePerHour !== profile.startingRatePerHour ||
                newProfile.endingRatePerHour !== profile.endingRatePerHour ||
                // newProfile.summary !== profile.summary ||
                newProfile.projectDescription !== profile.projectDescription ||
                newProfile.experienceLevel !== profile.experienceLevel ||
                newProfile.industry !== profile.industry ||
                newProfile.jobFunction !== profile.jobFunction ||
                newProfile.selectLanguageEng !== profile.selectLanguageEng ||
                newProfile.selectLanguageFr !== profile.selectLanguageFr ||
                newProfile.localisation !== profile.localisation ||
                newProfile.personality !== profile.personality ||
                newProfile.sizeOfWork !== profile.sizeOfWork ||
                JSON.stringify(newProfile.titles) !== JSON.stringify(profile.titles) ||
                JSON.stringify(newProfile.questionaire) !== JSON.stringify(profile.questionaire) ||
                newProfile.notified !== profile.notified ||
                newProfile.processWithCompany !== profile.processWithCompany ||
                newProfile.legallyWork !== profile.legallyWork ||
                newProfile.needSponsor !== profile.needSponsor ||
                newProfile.relocate !== profile.relocate ||
                newProfile.unWantedIndustry !== profile.unWantedIndustry ||
                newProfile.salaryId !== profile.salaryId ||
                newProfile.culture !== profile.culture
            ) {
                updated = true;
            }
            if (!updated && (profile.skills || newProfile.skills)) {
                if (!profile.skills && newProfile.skills) {
                    updated = true;
                } else if (profile.skills && newProfile.skills) {
                    if (profile.skills.length !== newProfile.skills.length) {
                        updated = true;
                    } else {
                        profile.skills.forEach((sk: Skills) => {
                            const foundInd = newProfile.skills.find((s: Skills) => s.skill === sk.skill);
                            if (!foundInd) updated = true;
                        });
                    }
                }
            }
            if (!updated && (profile.additionalsSkills || newProfile.additionalsSkills)) {
                if (!profile.additionalsSkills && newProfile.additionalsSkills) {
                    updated = true;
                } else if (profile.additionalsSkills && newProfile.additionalsSkills) {
                    if (profile.additionalsSkills.length !== newProfile.additionalsSkills.length) {
                        updated = true;
                    } else {
                        profile.additionalsSkills.forEach((sk: Skills) => {
                            const foundInd = newProfile.additionalsSkills.find((s: Skills) => s.skill === sk.skill);
                            if (!foundInd) updated = true;
                        });
                    }
                }
            }
        }
        return updated;
    };

    useEffect(() => {
        setEnableSave(isProfileUpdated());
    }, [newProfile, profile, firstName, lastName, email, phone]);

    const onDeleteResume = () => {
        dispatch(deleteResume());
    };

    useEffect(() => {
        if (isSaving && !loading) {
            handleUpdateProfile();
            setIsSaving(false);
        }
    }, [isSaving, loading]);

    useEffect(() => {
        dispatch(getResume());
    }, []);

    useEffect(() => {
        dispatch(fetchCandidatetInfo());
    }, [i18n.resolvedLanguage.toLocaleUpperCase()]);

    const ActionDeleteComponent = (
        <ActionDelete handleClose={() => setIsDeleteAccount(false)} handleDeleteAccount={handleDeleteAccount} t={t} />
    );

    const updateEditConsultantDetail = (updateProfile: Profile) => {
        setNewProfile({ ...newProfile, ...updateProfile });
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Card>
                <CardContent>
                    {!isSaving && loading && <LinearProgress />}
                    <Grid container>
                        <Grid item xs={12} marginBottom="10px">
                            <Typography variant="h6">{t('accountDetails')}</Typography>
                        </Grid>
                        <Grid item xs={12} marginBottom="15px" paddingBottom="20px">
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                }}>
                                <Avatar
                                    src={user.image || undefined}
                                    sx={{
                                        height: 40,
                                        width: 40,
                                    }}>
                                    <UserCircle fontSize="small" />
                                </Avatar>
                                <Button>{t('change')}</Button>
                            </Box>
                        </Grid>
                        {(!firstName || !lastName) && (
                            <Grid item xs={12} textAlign="left" marginBottom="10px">
                                <AnnouncementOutlinedIcon color="error" />
                                <Typography
                                    sx={{ fontSize: 13, color: 'rgb(108, 117, 125)', marginLeft: '10px' }}
                                    component="span">
                                    {`${t('profileNotCompleted')} `}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'red',
                                        textTransform: 'uppercase',
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                    }}
                                    component="span">
                                    {`${t('jobMatch')}.`}
                                </Typography>
                            </Grid>
                        )}
                        <Grid container spacing={2} marginBottom={2}>
                            <Grid item md={6} xs={12} marginTop="-10px">
                                <TextFieldComponent
                                    id="firstName"
                                    label={t('firstName')}
                                    name="firstName"
                                    placeholder={t('enterFirstName')}
                                    handleChange={handleChange('firstName')}
                                    value={firstName}
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
                                    value={lastName}
                                    autoCompleteInput="family-name"
                                />
                            </Grid>

                            <Grid item md={6} xs={12} marginTop="-10px">
                                <TextFieldComponent
                                    id="email"
                                    label={t('email')}
                                    name="email"
                                    placeholder={t('enterEmailAddress')}
                                    handleChange={handleChange('email')}
                                    value={email}
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
                                    value={phone}
                                    autoCompleteInput="phone"
                                />
                            </Grid>

                            <Grid item xs={12} marginTop="-10px">
                                <AddressComponent
                                    id="addressProfile"
                                    name="addressProfile"
                                    label={t('address')}
                                    value={addressProfile}
                                    error={errorMsgForm}
                                    handleChange={handleChangeAddress}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1">{t('resume')}</Typography>
                            </Grid>
                            {profile.resume && (
                                <Grid item xs={3}>
                                    <Typography
                                        color="textSecondary"
                                        sx={{
                                            flexGrow: 1,
                                            mr: 2,
                                        }}
                                        id="modal-modal-title">
                                        {profile.resume && profile.resume.name && (
                                            <Link
                                                href={getResumeUrl(profile.resume)}
                                                underline="none"
                                                color="inherit"
                                                download={profile.resume.name}>
                                                {profile.resume.name}
                                            </Link>
                                        )}
                                    </Typography>
                                </Grid>
                            )}
                            <Grid item xs={profile.resume ? 8 : 12}>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <StyledBtnComponent
                                            title={t('dropCVTitle')}
                                            handleOnClick={() => setIsFileUpLoadOpen(true)}
                                            classesName={globalClasses.baseBtnDashboard}
                                        />
                                        <FileUpLoad
                                            isOpen={isFileUpLoadOpen}
                                            onClose={() => setIsFileUpLoadOpen(false)}
                                            title={t('dropCVTitle')}
                                            text={t('dropCVDescription')}
                                            maxSize={1048576}
                                            maxSizeText="1MB"
                                            extensions=".pdf,.doc,.docx"
                                        />
                                    </Grid>
                                    {profile.resume && (
                                        <Grid item xs={2}>
                                            <StyledBtnComponent
                                                title={t('delete')}
                                                handleOnClick={onDeleteResume}
                                                classesName={globalClasses.baseBtnDashboard}
                                            />
                                        </Grid>
                                    )}
                                    <Grid item />
                                </Grid>
                            </Grid>
                        </Grid>
                        {(user.role === CONSULTANT_ROLE || user.role === PERMANENT_ROLE) && (
                            <Grid item xs={12}>
                                <ConsultantPersonnalInformation
                                    handleUpdateProfile={updateEditConsultantDetail}
                                    profile={newProfile}
                                />
                            </Grid>
                        )}
                        {(user.role === CONSULTANT_ROLE || user.role === PERMANENT_ROLE) && (
                            <Grid item xs={12} marginTop={3}>
                                <ConsultantProfileDetailsEdit
                                    handleUpdateProfile={updateEditConsultantDetail}
                                    profile={newProfile}
                                />
                            </Grid>
                        )}
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
                <CardContent sx={{ maxHeight: 72 }}>
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
                        <Grid item xs={2} textAlign="end" margin="auto">
                            <StyledBtnComponent
                                title={t('deleteAccount')}
                                handleOnClick={() => setIsDeleteAccount(true)}
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

export default GeneralSettings;
