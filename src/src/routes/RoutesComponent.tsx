import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { APP_URL } from '../config/constants';
import { MultiRoutes } from '../config/interfaces';
import LandingPage from '../screens/public';
import publicRoutes from './publicRoutes';
import { LANDING_PAGE_ROUTE } from './routes';

const Main = React.lazy(() => import('../components/Main'));
const MainLandingPage = React.lazy(() => import('../components/landingPage/MainLandingPage'));
const Login = React.lazy(() => import('../components/account/Login'));
const RoutesComponent = () => {
    const { location } = window;
    const isLogin = location.href.includes(APP_URL);
    const ComponentLanding = isLogin ? Login : MainLandingPage;
    return (
        <Router>
            <Routes>
                <Route path={LANDING_PAGE_ROUTE} element={<ComponentLanding />} />
                {publicRoutes.map((route: MultiRoutes) => (
                    <Route key={route.key} path={route.path} element={route.element} />
                ))}
                <Route path="*" element={<Main />} />
                <Route path="/new/" element={<LandingPage />} />
            </Routes>
        </Router>
    );
};
export default RoutesComponent;
