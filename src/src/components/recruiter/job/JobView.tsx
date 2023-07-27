import React, { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Grid } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { useDispatch, useSelector } from 'react-redux';
import AboutJob from './About';
import JobDescription from './JobDescription';
import { RECRUITER_JOBS_LIST_ROUTE } from '../../../routes/routes';
import { RootState } from '../../../store/store';
import { recruiterFetchJob } from '../../../store/reducers/recruiter/recruiterActions';
import { Jobs } from '../../../models/jobs';

const JobView = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(recruiterFetchJob(id || ''));
    }, [dispatch]);

    const { job }: { job: Jobs } = useSelector((state: RootState) => ({
        job: state.recruiter.job,
    }));

    const navigate = useNavigate();

    const handleSingleJobView = () => {
        navigate(RECRUITER_JOBS_LIST_ROUTE);
    };
    return (
        <Box>
            {job && (
                <>
                    <Button onClick={handleSingleJobView}>
                        <KeyboardBackspaceIcon fontSize="large" color="secondary" />
                    </Button>

                    <Grid container spacing={4}>
                        <Grid item lg={4} xs={12}>
                            <AboutJob job={job} />
                        </Grid>
                        <Grid item lg={8} xs={12}>
                            <JobDescription description={job?.description} />
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default JobView;
