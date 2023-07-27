import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { RootState } from '../../../store/store';
import {
    dispatchChangeEmail,
    dispatchChangeTitle,
    dispatchChangeDepartment,
    dispatchChangePhoneNumber,
    dispatchChangeFirstName,
    dispatchChangeLastName,
} from '../../../store/reducers/recruiter/recruiterActions';
import { UserCircle } from '../../icons/Icons';

const AccountGeneralSettings = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { profile } = useSelector((state: RootState) => state.recruiter);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const user = {
        avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
        name: 'Anika Visser',
    };

    const [firstName, setFirstName] = useState<string>(profile.firstName);
    const [lastName, setLastName] = useState<string>(profile.lastName);
    const [email, setEmail] = useState<string>(profile.email);
    const [isEmailEditable, setIsEmailEditable] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(profile.title);
    const [department, setDepartment] = useState<string>(profile.department);
    const [phone, setPhone] = useState<string>(profile.phoneNumber);
    const hide = false;

    const changeFirstName = () => {
        dispatch(dispatchChangeFirstName(firstName));
    };

    const changeLastName = () => {
        dispatch(dispatchChangeLastName(lastName));
    };

    const changeEmail = () => {
        dispatch(dispatchChangeEmail(email));
        setIsEmailEditable(false);
    };

    const changeTitle = () => {
        dispatch(dispatchChangeTitle(title));
    };

    const changeDepartment = () => {
        dispatch(dispatchChangeDepartment(department));
    };

    const changePhone = () => {
        dispatch(dispatchChangePhoneNumber(phone));
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{t('deleteAccountQuestion')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{t('deleteAccountTxt')}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('cancel')}</Button>
                    <Button color="error" onClick={handleClose} autoFocus>
                        {t('delete')}
                    </Button>
                </DialogActions>
            </Dialog>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={4} xs={12}>
                            <Typography variant="h6">{t('accountDetails')}</Typography>
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                }}>
                                <Avatar
                                    src={user.avatar}
                                    sx={{
                                        height: 64,
                                        mr: 2,
                                        width: 64,
                                    }}>
                                    <UserCircle fontSize="small" />
                                </Avatar>
                                <Button>{t('change')}</Button>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    mt: 3,
                                    alignItems: 'center',
                                }}>
                                <TextField
                                    label="First Name"
                                    size="small"
                                    sx={{
                                        flexGrow: 1,
                                        mr: 3,
                                    }}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <Button onClick={changeFirstName}>{t('save')}</Button>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    mt: 3,
                                    alignItems: 'center',
                                }}>
                                <TextField
                                    label="Last Name"
                                    size="small"
                                    sx={{
                                        flexGrow: 1,
                                        mr: 3,
                                    }}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <Button onClick={changeLastName}>{t('save')}</Button>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    mt: 3,
                                    alignItems: 'center',
                                }}>
                                <TextField
                                    // defaultValue="dummy.account@gmail.com"
                                    disabled={!isEmailEditable}
                                    label="Email Address"
                                    required
                                    size="small"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{
                                        flexGrow: 0.67,
                                        mr: 3,
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderStyle: 'dashed',
                                        },
                                    }}
                                />
                                {hide && !isEmailEditable && (
                                    <Button onClick={() => setIsEmailEditable(true)}>{t('eave')}</Button>
                                )}
                                {hide && isEmailEditable && <Button onClick={changeEmail}>{t('save')}</Button>}
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={4} xs={12}>
                            <Typography variant="h6">{t('publicProfile')}</Typography>
                        </Grid>
                        <Grid item md={8} sm={12} xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    mt: 3,
                                    alignItems: 'center',
                                }}>
                                <TextField
                                    label="Title"
                                    size="small"
                                    sx={{
                                        flexGrow: 1,
                                        mr: 3,
                                    }}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Button onClick={changeTitle}>{t('save')}</Button>
                            </Box>
                            <Divider />
                            <Box
                                sx={{
                                    display: 'flex',
                                    mt: 3,
                                    alignItems: 'center',
                                }}>
                                <TextField
                                    label="Department"
                                    size="small"
                                    sx={{
                                        flexGrow: 1,
                                        mr: 3,
                                    }}
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                                <Button onClick={changeDepartment}>{t('save')}</Button>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    mt: 3,
                                    alignItems: 'center',
                                }}>
                                <TextField
                                    label="Phone"
                                    size="small"
                                    sx={{
                                        flexGrow: 1,
                                        mr: 3,
                                    }}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <Button onClick={changePhone}>{t('save')}</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={4} xs={12}>
                            <Typography variant="h6">{t('deleteAccount')}</Typography>
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <Typography sx={{ mb: 3 }} variant="subtitle1">
                                {t('deleteAccountTxt')}
                            </Typography>
                            <Button color="error" variant="outlined" onClick={handleClickOpen}>
                                {t('deleteAccount')}
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};
export default AccountGeneralSettings;
