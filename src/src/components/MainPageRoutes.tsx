import { LinearProgress } from '@mui/material';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ADMIN_ROLE, CONSULTANT_ROLE, PERMANENT_ROLE, EMPLOYER_ROLE, RECRUITER_ROLE } from '../config/constants';
import { MultiRoutes } from '../config/interfaces';
import User from '../models/user';
import adminRoutes from '../routes/adminRoutes';
import candidateRoutes from '../routes/candidateRoutes';
import recruiterRoutes from '../routes/recruiterRoutes';

const MainPageRoutes = ({ user }: { user: User }) => {
    const routes: MultiRoutes[] = [];
    if (user.role === ADMIN_ROLE) {
        routes.push(...adminRoutes);
    } else if (user.role === CONSULTANT_ROLE || user?.role === PERMANENT_ROLE) {
        routes.push(...candidateRoutes);
    } else if (user.role === EMPLOYER_ROLE || user.role === RECRUITER_ROLE) {
        routes.push(...recruiterRoutes);
    }

    return (
        <Suspense fallback={<LinearProgress />}>
            <Routes>
                {routes.map((route: MultiRoutes) => (
                    <Route key={route.key} path={route.path} element={route.element} />
                ))}
            </Routes>
        </Suspense>
    );
};

export default MainPageRoutes;
