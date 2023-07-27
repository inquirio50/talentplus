import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { CONFIRM_PASSWORD, PASSWORD } from '../../config/constants';
import { SignUpForm } from '../../config/interfaces';
import { RootState } from '../../store/store';
import DialogMsg from '../common/DialogMsg';
import SelectComponent from '../common/SelectComponent';
import StyledBtnComponent from '../common/StyledBtnComponent';
import TextFieldComponent from '../common/TextFieldComponent';
import { getOptionsLabeled, ROLE_OPTIONS } from '../helpers/typeOptions';
import { passwordValidation } from '../helpers/utilityFunctions';
import { addNewUser } from '../../store/reducers/admin/adminActions';

const AdminNewUserBtn = ({
    handleClickSave,
    handleCancel,
    t,
    loading,
}: {
    handleClickSave: any;
    handleCancel: any;
    t: any;
    loading: boolean;
}) => (
    <Grid container justifyContent="center" alignItems="center" margin="auto" spacing={1}>
        <Grid item xs={7} />
        <Grid item xs={3} textAlign="right">
            <StyledBtnComponent title={t('cancel')} handleOnClick={handleCancel} />
        </Grid>
        <Grid item xs={2}>
            <StyledBtnComponent title={t('save')} handleOnClick={handleClickSave} loading={loading} />
        </Grid>
    </Grid>
);

const AdminNewUser = ({ open, handleClose }: { open: boolean; handleClose: any }) => {
    const { t } = useTranslation();

    const { loading } = useSelector((state: RootState) => ({
        loading: state.admin.loading,
    }));

    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [isAdding, setIsAdding] = useState<boolean>(false);

    const dispatch = useDispatch();

    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());

    const handleChange = (type: string) => async (event: any) => {
        const { value } = event.target;
        const newMap: Map<string, string> = msgErr;
        switch (type) {
            case 'userName':
                setUserName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case PASSWORD: {
                const errPass = passwordValidation(value || '', confirmPassword || '', t);
                const errTxtConfirm = errPass.get(CONFIRM_PASSWORD) || '';
                const errTxtPassword = errPass.get(PASSWORD) || '';

                if (errTxtPassword) {
                    newMap.set(PASSWORD, errTxtPassword);
                } else {
                    newMap.delete(PASSWORD);
                }

                if (errTxtConfirm) {
                    newMap.set(CONFIRM_PASSWORD, errTxtConfirm);
                } else {
                    newMap.delete(CONFIRM_PASSWORD);
                }
                await setMsgErr(newMap);
                await setPassword(value);
                break;
            }
            case CONFIRM_PASSWORD: {
                const errPass = passwordValidation(password || '', value || '', t);
                const errTxtConfirm = errPass.get(CONFIRM_PASSWORD) || '';
                if (errTxtConfirm) {
                    newMap.set(CONFIRM_PASSWORD, errTxtConfirm);
                } else {
                    newMap.delete(CONFIRM_PASSWORD);
                }
                await setMsgErr(newMap);
                await setConfirmPassword(value);
                break;
            }
            case 'role':
                setRole(value);
                break;
            default:
                break;
        }
    };

    const handleSave = () => {
        if (role === '') {
            const newMsgErr = msgErr;
            newMsgErr.set('role', t('roleSelect'));
            setMsgErr(newMsgErr);
            setRole('a');
        }
        if (msgErr.size === 0) {
            const payload: SignUpForm = {
                userName,
                firstName,
                lastName,
                email,
                password,
                role,
            };
            dispatch(addNewUser(payload));
            setIsAdding(true);
        }
    };

    useEffect(() => {
        if (!loading && isAdding) {
            setIsAdding(false);
            handleClose();
        }
    }, [loading]);

    const ActionComponent = (
        <AdminNewUserBtn handleClickSave={handleSave} handleCancel={handleClose} t={t} loading={loading} />
    );
    return (
        <DialogMsg
            title={t('newAdminUser')}
            open={open}
            isAction
            handleClose={handleClose}
            ActionComponent={ActionComponent}>
            <form style={{ width: '100%' }}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextFieldComponent
                            id="userName"
                            label={t('userName')}
                            name="userName"
                            placeholder={t('userName')}
                            handleChange={handleChange('userName')}
                            value={userName}
                            autoCompleteInput="email"
                        />
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <TextFieldComponent
                            id={PASSWORD}
                            label={t('Password')}
                            name="password"
                            placeholder={t('Enter your password')}
                            type="password"
                            value={password}
                            handleChange={handleChange('password')}
                            required
                            autoCompleteInput="new-password"
                            error={msgErr}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextFieldComponent
                            id={CONFIRM_PASSWORD}
                            label={t('ConfirmPassword')}
                            name="confirmPassword"
                            placeholder={t('ConfirmPassword')}
                            type="password"
                            value={confirmPassword}
                            handleChange={handleChange('confirmPassword')}
                            error={msgErr}
                            autoCompleteInput="new-password"
                        />
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <SelectComponent
                            label={t('role')}
                            id="role"
                            currentValue={role}
                            options={getOptionsLabeled(ROLE_OPTIONS, t)}
                            placeHolder={t('role')}
                            multiple={false}
                            handleChange={handleChange('role')}
                            errorMsg={msgErr}
                        />
                    </Grid>
                </Grid>
            </form>
        </DialogMsg>
    );
};

export default AdminNewUser;
