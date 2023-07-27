/* eslint-disable no-console */
import { useSelector } from 'react-redux';
import {
    REGISTERED_USERS,
    RECRUITER_ROLE,
    EMPLOYER_ROLE,
    ADMIN_ROLE,
    CONSULTANT_ROLE,
    PERMANENT_ROLE,
    DASHBOARD,
    MATCHES,
    JOBS,
    CHAT,
    SETTINGS,
} from '../../config/constants';
import { RootState } from '../../store/store';
import generateConsultantMenu from './consultantMenu';

import generateRecruiterMenu from './recruiterMenu';
import menuMap from './allMenuItems';
import {
    ADMIN_CHAT_ROUTE,
    ADMIN_DASHBOARD_ROUTE,
    ADMIN_MATCHES_ROUTE,
    ADMIN_REGISTERED_USERS_ROUTE,
    ADMIN_CATEGORY_ROUTE,
    ADMIN_LEGEND_ROUTE,
} from '../../routes/routes';

const getMenuItems = () => {
    const { user } = useSelector((state: RootState) => ({
        user: state.authentication.user,
    }));
    let menuItems: any[] = [];

    // Getting User Info
    if (user?.role === RECRUITER_ROLE || user?.role === EMPLOYER_ROLE) {
        menuItems = generateRecruiterMenu();
    } else if (user?.role === CONSULTANT_ROLE || user?.role === PERMANENT_ROLE) {
        menuItems = generateConsultantMenu();
    } else if (user?.role === ADMIN_ROLE) {
        // Adding Routes to Jobs children
        const menuSettings: any = { ...menuMap.get(SETTINGS) };
        menuSettings.children[0].url = ADMIN_CATEGORY_ROUTE;
        menuSettings.children[1].url = ADMIN_LEGEND_ROUTE;

        menuItems = [
            {
                ...menuMap.get(DASHBOARD),
                url: ADMIN_DASHBOARD_ROUTE,
            },
            {
                ...menuMap.get(MATCHES),
                url: ADMIN_MATCHES_ROUTE,
            },
            {
                ...menuMap.get(REGISTERED_USERS),
                url: ADMIN_REGISTERED_USERS_ROUTE,
            },
            {
                ...menuMap.get(JOBS),
                url: '/recruiter/jobs',
            },
            {
                ...menuMap.get(CHAT),
                url: ADMIN_CHAT_ROUTE,
            }
        ];
    }
    return menuItems;
};

export default getMenuItems;
