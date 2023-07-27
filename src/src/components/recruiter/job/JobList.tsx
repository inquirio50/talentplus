import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recruiterFetchAllJobs } from '../../../store/reducers/recruiter/recruiterActions';
import { RootState } from '../../../store/store';
import JobItem from './JobItem';

const JobList = () => {
    const dispatch = useDispatch();
    const { jobs } = useSelector((state: RootState) => state.recruiter);

    useEffect(() => {
        dispatch(recruiterFetchAllJobs());
    }, [dispatch]);

    return (
        <>
            {!jobs && <CircularProgress size={25} />}
            {jobs && jobs.length !== 0 && jobs.map((job: any) => <JobItem key={job.id} jobPost={job} />)}
        </>
    );
};

export default JobList;
