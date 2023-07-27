/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from '@mui/material';
import React from 'react';
import globalStyles from '../../../config/globalCss';

const RegisterEmployers = () => {
    const classes = globalStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                Register Candidate
            </Grid>
        </Grid>
    );
};

export default RegisterEmployers;
