import React from 'react';

import { Box, Grid } from '@mui/material';
import AboutJob from './AboutJob';
import JobDescription from './JobDescription';

const JobView = ({ jobView }: any) => (
    <Box>
        <Grid container spacing={4}>
            <Grid item lg={4} xs={12}>
                <AboutJob job={jobView} />
            </Grid>
            <Grid item lg={8} xs={12}>
                <JobDescription description={jobView.description} />
            </Grid>
        </Grid>
    </Box>
);

export default JobView;
