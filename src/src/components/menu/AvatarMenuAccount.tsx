import React, { useState } from 'react';
import { Avatar, Box, Divider, Grid, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CogIcon, UserCircle } from '../icons/Icons';
import User from '../../models/user';
import { ProfileMenuItem } from '../../config/interfaces';
import { ADMIN_ROLE, CONSULTANT_ROLE, PERMANENT_ROLE, EMPLOYER_ROLE, RECRUITER_ROLE } from '../../config/constants';
import { CANDIDATE_PROFILE_ROUTE, RECRUITER_PROFILE_ROUTE, SETTINGS_ROUTE } from '../../routes/routes';
import { logoutUser } from '../../store/reducers/auth/authActions';
import DialogMsg from '../common/DialogMsg';
import ConsultantProfile from '../consultant/profileConsultant/ConsultantProfile';
import StyledBtnComponent from '../common/StyledBtnComponent';
import globalStyles from '../../config/globalCss';

const menuItems = (user: User, profileOpen: any) => {
    const menu: ProfileMenuItem[] = [];
    const { t } = useTranslation();
    if (user.role !== ADMIN_ROLE) {
        if (user.role === RECRUITER_ROLE || user.role === EMPLOYER_ROLE) {
            menu.push({
                label: t('Profile'),
                icon: <UserCircle fontSize="small" />,
                redirectTo: RECRUITER_PROFILE_ROUTE,
            });
        } else if (user.role === CONSULTANT_ROLE || user.role === PERMANENT_ROLE) {
            menu.push({
                label: t('Profile'),
                icon: <UserCircle fontSize="small" />,
                redirectTo: CANDIDATE_PROFILE_ROUTE,
                onClick: () => profileOpen(),
            });
        }
    }
    menu.push({
        label: t('Settings'),
        icon: <CogIcon fontSize="small" />,
        redirectTo: SETTINGS_ROUTE,
    });
    return menu;
};

const ProfileBtn = ({ handleClickEdit, handleCancel, t }: { handleClickEdit: any; handleCancel: any; t: any }) => {
    const globalClasses = globalStyles();
    return (
        <Grid container justifyContent="center" alignItems="center" margin="auto" spacing={1}>
            <Grid item xs={7} />
            <Grid item xs={3} textAlign="right">
                <StyledBtnComponent
                    title={t('cancel')}
                    handleOnClick={handleCancel}
                    classesName={globalClasses.baseBtnDashboard}
                />
            </Grid>
            <Grid item xs={2}>
                <StyledBtnComponent
                    title={t('edit')}
                    handleOnClick={handleClickEdit}
                    classesName={globalClasses.baseBtnDashboard}
                />
            </Grid>
        </Grid>
    );
};

interface AccountPopoverProps {
    anchorRef: any;
    onClose: any;
    open: boolean;
    user: User;
}

const AvatarMenuAccount = ({ onClose, open, user, anchorRef }: AccountPopoverProps) => {
    const { t } = useTranslation();
    const history = useNavigate();
    const dispatch = useDispatch();
    const [openProfile, setOpenProfile] = useState(false);
    const menuItemsAccount: ProfileMenuItem[] = menuItems(user, () => setOpenProfile(true));

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const handleRedirectProfile = () => {
        setOpenProfile(false);
        history(CANDIDATE_PROFILE_ROUTE);
    };

    const getName = (name: string | undefined) => {
        if (!name) return `${user.role}`;
        const nameSplit = name.split(' ');
        if (nameSplit) return `${nameSplit[0]} - (${user.role})`;
        return '';
    };

    return (
        <>
            <Popover
                anchorEl={anchorRef}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom',
                }}
                keepMounted
                onClose={onClose}
                open={!!open}
                PaperProps={{ sx: { width: 300 } }}
                transitionDuration={0}>
                <Box
                    sx={{
                        alignItems: 'center',
                        p: 2,
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
                    <Box
                        sx={{
                            ml: 1,
                        }}>
                        <Typography variant="body1">{user.firstName}</Typography>
                        <Typography color="textSecondary" variant="body2">
                            {getName(user.firstName || user.fullName)}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ my: 1 }}>
                    {menuItemsAccount.map((menu, i) => {
                        const newKey = `profile-menu-${i}`;
                        if (menu.redirectTo === '' && menu.onClick) {
                            return (
                                <MenuItem key={newKey} onClick={menu.onClick}>
                                    <ListItemIcon>{menu.icon}</ListItemIcon>
                                    <ListItemText primary={<Typography variant="body1">{menu.label}</Typography>} />
                                </MenuItem>
                            );
                        }
                        return (
                            <Link to={menu.redirectTo} key={newKey}>
                                <MenuItem>
                                    <ListItemIcon>{menu.icon}</ListItemIcon>
                                    <ListItemText primary={<Typography variant="body1">{menu.label}</Typography>} />
                                </MenuItem>
                            </Link>
                        );
                    })}
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body1">{t('Logout')}</Typography>} />
                    </MenuItem>
                </Box>
            </Popover>
            <DialogMsg
                open={openProfile}
                title={t('profileDetails')}
                handleClose={() => setOpenProfile(false)}
                isAction
                ActionComponent={
                    <ProfileBtn
                        handleClickEdit={handleRedirectProfile}
                        handleCancel={() => setOpenProfile(false)}
                        t={t}
                    />
                }>
                <ConsultantProfile />
            </DialogMsg>
        </>
    );
};

export default AvatarMenuAccount;
