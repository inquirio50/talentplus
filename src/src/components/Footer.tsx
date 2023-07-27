import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import React from 'react';

const styles: any = makeStyles((theme: Theme) => ({
    footer: {
        padding: '19px 24px 20px',
        paddingLeft: '280px',
        backgroundColor: theme.palette.common.white,
        [theme.breakpoints.down('lg')]: {
            paddingLeft: '3rem',
            padding: '3rem',
        },
        [theme.breakpoints.down('md')]: {
            paddingLeft: '2rem',
            padding: '2rem',
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '1rem',
            padding: '1rem',
        },
    },
}));

const Footer = () => {
    const css = styles();
    const currentYear = new Date().getFullYear();
    return (
        <Grid component="footer" container className={css.footer}>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography>{`${currentYear} © Reelcruit - Reelcruit.com`}</Typography>
            </Grid>
        </Grid>
    );
};

export default Footer;
