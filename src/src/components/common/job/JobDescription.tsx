/* eslint-disable react/no-danger */
import React from 'react';
import { Box, Typography } from '@mui/material';

const JobDescription = ({ description }: any) => (
    <Box className="job_description">
        <Typography dangerouslySetInnerHTML={{ __html: description }} />
    </Box>
);

export default JobDescription;
