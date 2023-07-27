import React from 'react';
import { MultiRoutes } from '../config/interfaces';
import {
    ADMIN_CHAT_ROUTE,
    ADMIN_DASHBOARD_ROUTE,
    ADMIN_MATCHES_ROUTE,
    ADMIN_REGISTERED_USERS_ROUTE,
    ADMIN_CATEGORY_ROUTE,
    ADMIN_LEGEND_ROUTE,
} from './routes';

const AdminDashboard = React.lazy(() => import('../components/admin/AdminDashboard'));
const AdminMatches = React.lazy(() => import('../components/admin/AdminMatches'));
const AdminUsers = React.lazy(() => import('../components/admin/AdminUsers'));
const AdminCategory = React.lazy(() => import('../components/admin/AdminCategory'));
const ChatLobby = React.lazy(() => import('../components/chat/ChatLobby'));
const AdminLegend = React.lazy(() => import('../components/admin/AdminLegend'));

const adminRoutes: MultiRoutes[] = [
    {
        path: ADMIN_DASHBOARD_ROUTE,
        key: 'AdminDashboard',
        element: <AdminDashboard />,
    },
    {
        path: ADMIN_MATCHES_ROUTE,
        key: 'Matches',
        element: <AdminMatches />,
    },
    {
        path: ADMIN_REGISTERED_USERS_ROUTE,
        key: 'Users',
        element: <AdminUsers />,
    },
    {
        path: ADMIN_CHAT_ROUTE,
        key: 'Chat',
        element: <ChatLobby />,
    },
    {
        path: ADMIN_CATEGORY_ROUTE,
        key: 'Category',
        element: <AdminCategory />,
    },
    {
        path: ADMIN_LEGEND_ROUTE,
        key: 'Legend',
        element: <AdminLegend />,
    },

    /* 
    {
        path: '/admin/users',
        name: 'User List',
        component: UserManagement,
        route: PrivateRoute,
        roles: ['Admin'],
    },
    {
        path: '/recruiter/interviews',
        name: 'Interviews',
        component: RecruiterInterview,
        route: PrivateRoute,
        // roles: ['Consultant']
    },
    {
        path: '/recruiter/contacts',
        name: 'Contact',
        component: RecruiterContact,
        route: PrivateRoute,
        // roles: ['Consultant']
    },
    {
        path: RECRUITER_MATCHES_ROUTE,
        name: 'Matches',
        component: RecruiterMatches,
        route: PrivateRoute,
        // roles: ['Consultant']
    },
    {
        path: '/recruiter/matches/profile',
        name: 'MatchProfile',
        component: ProfileDisplay,
        route: PrivateRoute,
        // roles: ['Consultant']
    },
    {
        path: '/recruiter/contracts',
        name: 'Contracts',
        component: RecruiterContracts,
        route: PrivateRoute,
        // roles: ['Consultant']
    },
    {
        path: '/recruiter/jobs',
        name: 'Jobs',
        component: RecruiterJobs,
        route: PrivateRoute,
        // roles: ['Consultant']
    },
    {
        path: '/admin/profile',
        name: 'Admin Profile',
        component: AdminProfile,
        route: PrivateRoute,
        // roles: ['Consultant']
    }, */
];

export default adminRoutes;
