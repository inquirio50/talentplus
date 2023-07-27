import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Theme, Box } from '@mui/material';
import {
    ADMIN_ROLE,
    CONSULTANT_ROLE,
    PERMANENT_ROLE,
    LEFT_SIDEBAR_THEME_DARK,
    RECRUITER_ROLE,
} from '../config/constants';
import {
    ADMIN_DASHBOARD_ROUTE,
    CANDIDATE_DASHBOARD_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    RECRUITER_DASHBOARD_ROUTE,
} from '../routes/routes';
import { RootState } from '../store/store';
import AppBarMenu from './AppBarMenu';
import MainMenu from './menu/MainMenu';
import { changeSidebarTheme } from '../store/reducers/layout/layoutActions';
import Footer from './Footer';
import MainPageRoutes from './MainPageRoutes';
import MessageModal from './common/MessageModal';
import { updateServiceWorker } from '../serviceWorker';
import { refreshApp } from '../store/reducers/genericActions';
import AppRefreshSnackBar from './common/SnackBarTopMsg';

const useStyles: any = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    dashboardRoot: {
        display: 'flex',
        flex: '1 1 auto',
        maxWidth: '100%',
        paddingTop: 80,
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 256,
        },
    },
}));

const Main = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { accessToken, user, isAuthenticated, leftSideBarTheme } = useSelector((state: RootState) => ({
        accessToken: state.authentication.accessToken,
        user: state.authentication.user,
        isAuthenticated: state.authentication.isAuthenticated,
        leftSideBarTheme: state.layout.leftSideBarTheme,
    }));
    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') {
            // Check server every 30s for service worker update
            setInterval(() => updateServiceWorker(), 30000);
        }
        if (!accessToken || !isAuthenticated) {
            history(LOGIN_ROUTE);
        } else if (isAuthenticated && accessToken && location.pathname === MAIN_ROUTE) {
            if (user?.role === ADMIN_ROLE) {
                history(ADMIN_DASHBOARD_ROUTE);
            } else if (user?.role === CONSULTANT_ROLE || user?.role === PERMANENT_ROLE) {
                history(CANDIDATE_DASHBOARD_ROUTE);
            } else if (user?.role === RECRUITER_ROLE) {
                history(RECRUITER_DASHBOARD_ROUTE);
            } else {
                history(MAIN_ROUTE);
            }
        }

        // Open Refresh Message Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.oncontrollerchange = () => {
                dispatch(refreshApp(true));
            };
        }
    }, [isAuthenticated, accessToken]);

    useEffect(() => {
        dispatch(changeSidebarTheme(LEFT_SIDEBAR_THEME_DARK));
    }, [dispatch]);

    if (isAuthenticated) {
        return (
            <div className={classes.root}>
                <div className={classes.dashboardRoot}>
                    <Box
                        sx={{
                            display: 'flex',
                            flex: '1 1 auto',
                            flexDirection: 'column',
                            width: '100%',
                        }}>
                        <MainPageRoutes user={user} />
                    </Box>
                </div>
                <AppBarMenu user={user} onOpenSidebar={() => setIsSidebarOpen(true)} />
                <MainMenu
                    mobileOpen={isSidebarOpen}
                    onCloseMobile={() => setIsSidebarOpen(false)}
                    leftSideBarTheme={leftSideBarTheme}
                />
                <MessageModal />
                <AppRefreshSnackBar />
                <Footer />
            </div>
        );
    }
    return <Navigate to={LOGIN_ROUTE} />;
};

export default Main;
