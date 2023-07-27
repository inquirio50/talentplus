import { Login } from '@mui/icons-material';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MainLandingPage from '../components/landingPage/MainLandingPage';
import Main from '../components/Main';
import { MultiRoutes } from '../config/interfaces';
import publicRoutes from './publicRoutes';
import { LANDING_PAGE_ROUTE } from './routes';

const PagesComponent = () => {
    const location = useLocation();
    const isLogin = location.pathname.includes('app.');
    return (
        <Routes>
            <Route path={LANDING_PAGE_ROUTE} element={isLogin ? <Login /> : <MainLandingPage />} />
            {publicRoutes.map((route: MultiRoutes) => (
                <Route key={route.key} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<Main />} />
        </Routes>
    );
};

export default PagesComponent;
