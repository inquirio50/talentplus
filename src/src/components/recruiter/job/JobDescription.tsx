/* eslint-disable react/no-danger */
import React from 'react';
import { Box } from '@mui/material';

const JobDescription = ({ description }: any) => (
    <Box className="job_description">
        <div dangerouslySetInnerHTML={{ __html: description }} />
    </Box>
);

export default JobDescription;
