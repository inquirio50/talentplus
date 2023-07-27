import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../../store/store';
import { RECRUITER_JOBS_VIEW_ROUTE, RECRUITER_JOBS_EDIT_ROUTE } from '../../../routes/routes';
import { recruiterDeleteJob } from '../../../store/reducers/recruiter/recruiterActions';
import { getHourFromStringToDisplay } from '../../helpers/utilityFunctions';

const JobItem = ({ jobPost }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [target, setTarget] = useState('');
    const { loading } = useSelector((state: RootState) => state.recruiter);

    const handleSingleJobView = () => {
        navigate({
            pathname: RECRUITER_JOBS_VIEW_ROUTE.replace(':id', jobPost.id),
        });
    };

    const handleSingleJobEdit = () => {
        navigate({
            pathname: RECRUITER_JOBS_EDIT_ROUTE.replace(':id', jobPost.id),
        });
    };

    const deleteJob = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.name);
        dispatch(recruiterDeleteJob(id));
    };

    return (
        <Card
            sx={{
                alinItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                mt: 2,
                px: 2,
                py: 1.5,
            }}
            variant="outlined">
            <div>
                <Typography variant="subtitle1">{`${
                    jobPost.titles ? jobPost.titles.map((x: any) => x.label).join(' , ') : ''
                } / ${jobPost.reference} `}</Typography>
                <Typography color="textSecondary" variant="caption">
                    {` ${jobPost.typeOfWork} `}
                    <Typography color="inherit" noWrap variant="caption">
                        {jobPost.role === 'employee'
                            ? `$${jobPost.salary?.min}k - $${jobPost.salary?.max}k`
                            : `$${jobPost.salary?.min}/h - $${jobPost.salary?.max}/h`}
                    </Typography>
                </Typography>
            </div>
            <div>
                <Typography color="textSecondary" sx={{ mr: 2 }} variant="caption">
                    {getHourFromStringToDisplay(jobPost.createdAt)}
                </Typography>
                <Button onClick={handleSingleJobView}>{t('View')}</Button>
                <Button onClick={handleSingleJobEdit}>{t('Edit')}</Button>
                <LoadingButton
                    name={jobPost.id}
                    loading={loading && target === jobPost.id}
                    onClick={(e) => deleteJob(e, jobPost.id)}
                    color="error">
                    {t('Delete')}
                </LoadingButton>
            </div>
        </Card>
    );
};

export default JobItem;
