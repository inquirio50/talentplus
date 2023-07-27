/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AppBar,
    IconButton,
    Theme,
    Toolbar,
    Typography,
    FormControlLabel,
    FormGroup,
    Grid,
    useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, withStyles } from '@mui/styles';
import User from '../models/user';
import { MenuIcon } from './icons/Icons';
import LanguageTopApp from './common/LanguageTopApp';
import PinkSwitch from './common/PinkSwitch';
import NotificationTopComponent from './menu/NotificationTopComponent';
import ProfileDropdown from './menu/ProfileDropdown';
import ChatNotificationTop from './chat/ChatNotificationTop';
import globalStyles from '../config/globalCss';
import { toggleIsAvailableToHire } from '../store/reducers/candidate/candidateActions';
import { RootState } from '../store/store';
import UserMatch from '../models/userMatch';
import { Profile } from '../models/profile';

const styles: any = makeStyles((theme: Theme) => ({
    navBar: {
        height: '76px',
        marginLeft: 280,
        [theme.breakpoints.down('lg')]: {
            marginLeft: 0,
        },
    },
    appBar: {
        width: '100%',
        padding: '38px 86px 38px 86px',
        [theme.breakpoints.down('lg')]: {
            padding: '3rem',
        },
        [theme.breakpoints.down('md')]: {
            padding: '2rem',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '1rem',
        },
    },
    greeting: {
        marginLeft: '0.5rem',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    profileDropdown: {
        [theme.breakpoints.down('lg')]: {
            minWidth: '0',
            paddingLeft: '0',
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: '2rem',
        },
    },
}));

const TopNavbarRoot = withStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
            borderBottomStyle: 'solid',
            boxShadow: 'none',
        },
    })
)(AppBar);

const AppBarMenu = ({ user, onOpenSidebar }: { user: User; onOpenSidebar: any }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const classes = globalStyles();
    const css = styles();
    const getName = (name: string | undefined) => {
        if (!name) return `${user.role}`;
        const nameSplit = name.split(' ');
        if (nameSplit) return `${nameSplit[0]}`;
        return '';
    };

    const { profile }: { profile: Profile } = useSelector((state: RootState) => ({
        profile: state.candidate.profile,
    }));

    const [isAvailableToHire, setIsAvailableToHire] = useState<boolean>(true);

    const handleChangePublic = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setIsAvailableToHire(event.target.checked);
        dispatch(toggleIsAvailableToHire(event.target.checked));
    };

    useEffect(() => {
        if (profile) {
            setIsAvailableToHire(profile.isAvailableToHire);
        }
    }, [user, profile]);

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    return (
        <div>
            <TopNavbarRoot>
                <Toolbar disableGutters className={css.navBar}>
                    <Grid item xs={12} className={css.appBar}>
                        <Grid container margin="auto" alignItems="center" justifyContent="space-between">
                            <Grid item lg={7} md={4} xs={2} display="flex" alignItems="center">
                                <IconButton
                                    onClick={onOpenSidebar}
                                    sx={{
                                        display: {
                                            xs: 'inline-flex',
                                            lg: 'none',
                                        },
                                    }}>
                                    <MenuIcon fontSize="small" />
                                </IconButton>

                                <FormGroup
                                    sx={{
                                        display: {
                                            xs: 'none',
                                            md: 'flex',
                                        },
                                    }}>
                                    <FormControlLabel
                                        control={
                                            <PinkSwitch
                                                color="primary"
                                                checked={isAvailableToHire}
                                                onChange={handleChangePublic}
                                            />
                                        }
                                        label={
                                            <Typography className={classes.subTitleDashboard}>
                                                {isAvailableToHire ? t('availableToHire') : t('notAvailableToHire')}
                                            </Typography>
                                        }
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item lg={5} md={6} xs={10} sx={{ color: 'black' }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    wrap="nowrap"
                                    spacing={isMobile ? 1 : 3}>
                                    <Grid item lg={1} md={1} xs={2} display="flex" alignItems="center">
                                        <LanguageTopApp />
                                    </Grid>
                                    <Grid item lg={1} md={1} xs={2} display="flex" alignItems="center">
                                        <ChatNotificationTop />
                                    </Grid>
                                    <Grid item lg={1} md={1} xs={2} display="flex" alignItems="center">
                                        <NotificationTopComponent />
                                    </Grid>
                                    <Grid item lg={8} md={6} xs={2}>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item lg={2} md={2} xs={12} className={css.profileDropdown}>
                                                <ProfileDropdown user={user} />
                                            </Grid>
                                            <Grid item lg={9} md={9} xs={12} className={css.greeting}>
                                                <Typography sx={{ ml: 2 }} className={classes.subTitleDashboard}>
                                                    {`${t('goodMorning')}, ${getName(user.firstName || user.fullName)}`}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </TopNavbarRoot>
        </div>
    );
};

export default AppBarMenu;
