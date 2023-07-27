import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CircularProgress,
    Grid,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import JobCategoryStep from './JobCategoryStep';
import JobDescriptionStep from './JobDescriptionStep';
import { RootState } from '../../../store/store';
import { createJob, recruiterDeleteJob } from '../../../store/reducers/recruiter/recruiterActions';
import { Check, XCircle } from '../../icons/Icons';
import { CONTRACTOR, EMPLOYEE } from '../../../config/constants';
import { RECRUITER_JOBS_VIEW_ROUTE } from '../../../routes/routes';

const StepIcon = (props: any) => {
    const { active, completed, icon } = props;

    const highlight = active || completed;

    return (
        <Avatar
            sx={{
                height: 40,
                width: 40,
                ...(highlight && {
                    backgroundColor: 'secondary.main',
                    color: 'secondary.contrastText',
                }),
            }}
            variant="rounded">
            {completed ? <Check fontSize="small" /> : icon}
        </Avatar>
    );
};

const JobCreate = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [complete, setComplete] = useState(false);
    const { loading, isSuccess, info } = useSelector((state: RootState) => state.recruiter);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formType, setFormType] = useState('');
    const [jobPost, setJobPost] = useState<any>({});
    const { t } = useTranslation();

    const handleNext = (data: any) => {
        switch (activeStep) {
            case 0:
                setFormType(data);
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                break;
            case 1:
                setComplete(true);
                setJobPost(data);
                dispatch(createJob(data));
                break;

            default:
                break;
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSingleJobView = (id: string) => {
        navigate({
            pathname: RECRUITER_JOBS_VIEW_ROUTE.replace(':id', id),
        });
    };

    const deleteJob = (id: string) => {
        dispatch(recruiterDeleteJob(id));
    };

    const steps = [
        {
            label: formType === EMPLOYEE ? t('permanent') : t('contract'),
            content: <JobCategoryStep onBack={handleBack} onNext={handleNext} />,
        },
        {
            label: t('Description'),
            content: <JobDescriptionStep onBack={handleBack} onNext={handleNext} type={formType} />,
        },
    ];

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flexGrow: 1,
            }}>
            <Grid sx={{ flexGrow: 1 }}>
                <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{
                        p: {
                            xs: 4,
                            sm: 6,
                            md: 8,
                        },
                    }}>
                    <Box>
                        {!complete ? (
                            <Stepper
                                activeStep={activeStep}
                                orientation="vertical"
                                sx={{
                                    '& .MuiStepConnector-line': {
                                        ml: 1,
                                        borderLeftColor: 'divider',
                                        borderLeftWidth: 2,
                                    },
                                }}>
                                {steps.map((step, index) => (
                                    <Step key={step.label}>
                                        <StepLabel StepIconComponent={StepIcon}>
                                            <Typography sx={{ ml: 2 }} variant="overline">
                                                {step.label}
                                            </Typography>
                                        </StepLabel>
                                        <StepContent
                                            sx={{
                                                ml: '20px',
                                                borderLeftColor: 'divider',
                                                borderLeftWidth: 2,
                                                ...(activeStep === index && {
                                                    py: 4,
                                                }),
                                            }}>
                                            {step.content}
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                        ) : (
                            <div>
                                {loading && <CircularProgress />}
                                {!loading && isSuccess && (
                                    <>
                                        <Avatar
                                            sx={{
                                                backgroundColor: 'success.main',
                                                color: 'success.contrastText',
                                                height: 40,
                                                width: 40,
                                            }}>
                                            <Check />
                                        </Avatar>
                                        <Typography variant="h6" sx={{ mt: 2 }}>
                                            {t('All done!')}
                                        </Typography>
                                        <Typography color="textSecondary" variant="body2">
                                            {t('Here’s a preview of your newly created job')}
                                        </Typography>
                                        <Card
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                justifyContent: 'space-between',
                                                mt: 2,
                                                px: 2,
                                                py: 1.5,
                                            }}
                                            variant="outlined">
                                            <div>
                                                <Typography variant="subtitle1">
                                                    {jobPost.titles
                                                        ? jobPost.titles.map((x: any) => x.label).join(' , ')
                                                        : ''}
                                                </Typography>
                                                <Typography color="textSecondary" variant="caption">
                                                    {jobPost.typeOfWork}
                                                    <Typography color="inherit" noWrap variant="caption">
                                                        {formType === EMPLOYEE &&
                                                            ` • $${jobPost.minSalaryRange} - $${jobPost.maxSalaryRange}`}
                                                        {formType === CONTRACTOR &&
                                                            ` • $${jobPost.startingRatePerHour} - $${jobPost.endingRatePerHour}`}
                                                    </Typography>
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography color="textSecondary" sx={{ mr: 2 }} variant="caption">
                                                    {t('1 second ago')}
                                                </Typography>

                                                {info.deletedJob && <Typography>{t('deleted')}</Typography>}
                                                {!info.deletedJob && (
                                                    <>
                                                        <Button onClick={() => handleSingleJobView(info.createdJob.id)}>
                                                            {t('View')}
                                                        </Button>
                                                        <Button
                                                            onClick={() => deleteJob(info.createdJob.id)}
                                                            color="error">
                                                            {t('Delete')}
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </Card>
                                    </>
                                )}
                                {!loading && !isSuccess && (
                                    <>
                                        <Avatar
                                            sx={{
                                                backgroundColor: 'red',
                                                color: 'success.contrastText',
                                                height: 40,
                                                width: 40,
                                            }}>
                                            <XCircle />
                                        </Avatar>
                                        <Typography variant="h6" sx={{ mt: 2 }}>
                                            {t('Unable to create a job.')}
                                        </Typography>
                                    </>
                                )}
                            </div>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default JobCreate;
