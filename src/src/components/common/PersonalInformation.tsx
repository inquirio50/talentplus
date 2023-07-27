import { Box, Grid, Typography, Modal } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { Profile } from '../../models/profile';
import AddressComponent from './AddressComponent';
import { fetchCandidatetInfo } from '../../store/reducers/candidate/candidateActions';
import { RootState } from '../../store/store';
import StyledBtnComponent from './StyledBtnComponent';
import TextFieldComponent from './TextFieldComponent';
import globalStyles from '../../config/globalCss';
import i18n from '../../config/i18next';
import {
    checkErrorMsg,
    convertStringToAddress,
    formatPhoneNumberDisplay,
    getAddressString,
    removeFormatPhone,
} from '../helpers/utilityFunctions';
import { CloseIcon } from '../icons/Icons';

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
        maxHeight: 600,
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
        fontSize: '24px',
        lineHeight: '29px',
        color: theme.palette.common.black,
    },
    close: {
        cursor: 'pointer',
    },
}));

interface PersonalInformationProps {
    profile: Profile;
    handleUpdateProfile: any;
    isOpen: any;
    onClose: any;
}

const PersonalInformation = ({ profile, handleUpdateProfile, isOpen, onClose }: PersonalInformationProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const globalClasses = globalStyles();
    const css = styles();
    const [newProfile, setNewProfile] = useState<Profile>({ ...profile });
    const [isSaving, setIsSaving] = useState(false);
    const [enableSave, setEnableSave] = useState(false);
    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());

    const { loading }: { loading: boolean } = useSelector((state: RootState) => ({
        loading: state.generic.loading,
    }));

    const handleChange = (type: string) => (event: any) => {
        const { value } = event.target;
        const updateProfile = { ...newProfile };
        switch (type) {
            case 'firstName': {
                updateProfile.firstName = value;
                checkErrorMsg(updateProfile.firstName, 'firstName', t('enterFirstName'), msgErr, setMsgErr);
                break;
            }
            case 'lastName': {
                updateProfile.lastName = value;
                checkErrorMsg(updateProfile.lastName, 'lastName', t('enterLastName'), msgErr, setMsgErr);
                break;
            }
            case 'email': {
                updateProfile.email = value;
                checkErrorMsg(updateProfile.email, 'email', t('enterEmailAddress'), msgErr, setMsgErr);
                break;
            }
            case 'phone': {
                const valueCleanned = removeFormatPhone(value);
                if (valueCleanned.length <= 11) {
                    updateProfile.phoneNumber = valueCleanned;
                    checkErrorMsg(updateProfile.phoneNumber, 'phone', t('enterPhone'), msgErr, setMsgErr);
                }
                break;
            }
            case 'summary': {
                updateProfile.projectDescription = value;
                checkErrorMsg(updateProfile.projectDescription, 'summary', t('tellAboutYourself'), msgErr, setMsgErr);
                break;
            }
            default:
                break;
        }
        setNewProfile(updateProfile);
    };

    const handleChangeAddress = (address: string) => {
        setNewProfile({ ...newProfile, address: convertStringToAddress(address) });
        checkErrorMsg(address, 'addressProfile', t('address'), msgErr, setMsgErr);
    };

    const isValidForm = useCallback((): boolean => {
        if (loading) return false;
        let foundError = false;
        checkErrorMsg(newProfile.firstName, 'firstName', t('enterFirstName'), msgErr, setMsgErr);
        checkErrorMsg(newProfile.lastName, 'lastName', t('enterLastName'), msgErr, setMsgErr);
        checkErrorMsg(newProfile.email, 'email', t('enterEmailAddress'), msgErr, setMsgErr);
        checkErrorMsg(getAddressString(newProfile.address), 'addressProfile', t('address'), msgErr, setMsgErr);
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
                firstName: newProfile.firstName,
                lastName: newProfile.lastName,
                email: newProfile.email,
                phoneNumber: newProfile.phoneNumber,
                projectDescription: newProfile.projectDescription,
                address: newProfile.address,
            });
        }
    };

    useEffect(() => {
        if (isSaving && !loading) {
            setIsSaving(false);
        }
    }, [isSaving, loading]);

    useEffect(() => {
        dispatch(fetchCandidatetInfo());
    }, [i18n.resolvedLanguage.toLocaleUpperCase()]);

    const isProfileUpdated = (): boolean =>
        profile.firstName !== newProfile.firstName ||
        profile.lastName !== newProfile.lastName ||
        profile.email !== newProfile.email ||
        profile.phoneNumber !== newProfile.phoneNumber ||
        profile.projectDescription !== newProfile.projectDescription ||
        profile.address?.id !== newProfile.address?.id;

    useEffect(() => {
        setEnableSave(isProfileUpdated());
    }, [newProfile]);

    return (
        <Modal open={isOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Grid container direction="row" className={css.container}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={11}>
                            <Typography id="modal-modal-title" className={css.title}>
                                {t('personalInformation')}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} textAlign="right" className={css.close}>
                            <CloseIcon onClick={onClose} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ paddingTop: '31px' }}>
                    <Grid container>
                        {(!newProfile.firstName || !newProfile.lastName) && (
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
                            <Grid item xs={12} marginTop="-10px">
                                <TextFieldComponent
                                    id="firstName"
                                    label={t('firstName')}
                                    name="firstName"
                                    placeholder={t('enterFirstName')}
                                    handleChange={handleChange('firstName')}
                                    value={newProfile.firstName}
                                    autoCompleteInput="given-name"
                                    error={msgErr}
                                />
                            </Grid>

                            <Grid item xs={12} marginTop="-10px">
                                <TextFieldComponent
                                    id="lastName"
                                    label={t('lastName')}
                                    name="lastName"
                                    placeholder={t('enterLastName')}
                                    handleChange={handleChange('lastName')}
                                    value={newProfile.lastName}
                                    autoCompleteInput="family-name"
                                    error={msgErr}
                                />
                            </Grid>

                            <Grid item xs={12} marginTop="-10px">
                                <AddressComponent
                                    id="addressProfile"
                                    name="addressProfile"
                                    label={t('address')}
                                    value={getAddressString(newProfile.address)}
                                    error={msgErr}
                                    handleChange={handleChangeAddress}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextFieldComponent
                                    id="summary"
                                    label={t('tellAboutYourself')}
                                    name="summary"
                                    placeholder={t('Iam')}
                                    handleChange={handleChange('summary')}
                                    value={newProfile.projectDescription}
                                    multiline
                                    error={msgErr}
                                />
                            </Grid>

                            <Grid item xs={12} marginTop="-10px">
                                <TextFieldComponent
                                    id="email"
                                    label={t('email')}
                                    name="email"
                                    placeholder={t('enterEmailAddress')}
                                    handleChange={handleChange('email')}
                                    value={newProfile.email}
                                    autoCompleteInput="email"
                                    error={msgErr}
                                />
                            </Grid>

                            <Grid item xs={12} marginTop="-10px">
                                <TextFieldComponent
                                    id="phone"
                                    label={t('phone')}
                                    name="phone"
                                    placeholder={t('enterPhone')}
                                    handleChange={handleChange('phone')}
                                    value={formatPhoneNumberDisplay(newProfile.phoneNumber || '')}
                                    autoCompleteInput="phone"
                                    error={msgErr}
                                />
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
                </Grid>
            </Grid>
        </Modal>
    );
};

export default PersonalInformation;
