import React from 'react';
import { Grid } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { ABOUT_US_ROUTE, FOR_EMPLOYER_ROUTE, PRICING_ROUTE } from '../../routes/routes';
import Content from './content/Content';
import ForEmployer from './forEmployer/ForEmployer';
import NewPricing from './pricing/NewPricing';
import AboutUs from './aboutUs/AboutUs';

const MainLandingPage = () => {
    const { location } = window;

    const getComponent = () => {
        if (location.href.includes(FOR_EMPLOYER_ROUTE)) {
            return ForEmployer;
        }
        if (location.href.includes(PRICING_ROUTE)) {
            return NewPricing;
        }
        if (location.href.includes(ABOUT_US_ROUTE)) {
            return AboutUs;
        }
        return Content;
    };
    const ComponentContent: any = getComponent();

    return (
        <Grid container style={{ position: 'relative' }}>
            <Grid item xs={12} style={{ position: 'sticky', top: 0, left: 0, zIndex: 50000 }}>
                <Header />
            </Grid>
            <Grid item xs={12}>
                <ComponentContent />
            </Grid>
            <Grid item xs={12}>
                <Footer />
            </Grid>
        </Grid>
    );
};

export default MainLandingPage;
