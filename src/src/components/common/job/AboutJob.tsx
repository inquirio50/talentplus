import React from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import WorkIcon from '@mui/icons-material/Work';
import BuildIcon from '@mui/icons-material/Build';
import PaymentIcon from '@mui/icons-material/Payment';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useTranslation } from 'react-i18next';
import { Skills } from '../../../models/skills';
import { Jobs } from '../../../models/jobs';
import { CONTRACTOR, EMPLOYEE } from '../../../config/constants';
import { getDateHourDisplay, getExperienceDisplay } from '../../helpers/utilityFunctions';

const AboutJob = ({ job }: { job: Jobs }) => {
    const { t } = useTranslation();
    return (
        <Box>
            <Card>
                <CardHeader title={job.title} />
                <Divider />
                <CardContent>
                    <List>
                        <ListItem disableGutters divider>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={2} margin="auto" alignContent="center">
                                            <ListItemAvatar sx={{ color: 'action.active' }}>
                                                <TitleIcon fontSize="small" />
                                            </ListItemAvatar>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                    <Typography variant="subtitle2">{t('employmentType')}:</Typography>
                                                }
                                                secondary={
                                                    <Typography color="textSecondary" variant="body2">
                                                        {job.role}
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={2} margin="auto" alignContent="center">
                                            <ListItemAvatar sx={{ color: 'action.active' }}>
                                                <WorkIcon fontSize="small" />
                                            </ListItemAvatar>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <ListItemText
                                                disableTypography
                                                primary={<Typography variant="subtitle2">{t('skills')}</Typography>}
                                                secondary={
                                                    <Typography color="textSecondary" variant="body2">
                                                        {job.skills.map((skill: Skills) => `${skill.skill} `)}
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ListItem>
                        {job.role === CONTRACTOR && (
                            <ListItem disableGutters divider>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid item xs={2} margin="auto" alignContent="center">
                                                <ListItemAvatar sx={{ color: 'action.active' }}>
                                                    <AccessTimeIcon fontSize="small" />
                                                </ListItemAvatar>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <ListItemText
                                                    disableTypography
                                                    primary={
                                                        <Typography variant="subtitle2">{`${t(
                                                            'contractDuration'
                                                        )}:`}</Typography>
                                                    }
                                                    secondary={
                                                        <Typography color="textSecondary" variant="body2">
                                                            {job.duration}
                                                        </Typography>
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid item xs={2} margin="auto" alignContent="center">
                                                <ListItemAvatar sx={{ color: 'action.active' }}>
                                                    <PaymentIcon fontSize="small" />
                                                </ListItemAvatar>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <ListItemText
                                                    disableTypography
                                                    primary={
                                                        <Typography variant="subtitle2">{t('ratePerHour')}</Typography>
                                                    }
                                                    secondary={
                                                        <Typography color="textSecondary" variant="body2">
                                                            {`$ ${job.startingRatePerHour} - ${job.endingRatePerHour}`}
                                                        </Typography>
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        )}

                        {job.role === EMPLOYEE && (
                            <ListItem disableGutters divider>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid item xs={2} margin="auto" alignContent="center">
                                                <ListItemAvatar sx={{ color: 'action.active' }}>
                                                    <CalendarMonthIcon fontSize="small" />
                                                </ListItemAvatar>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <ListItemText
                                                    disableTypography
                                                    primary={
                                                        <Typography variant="subtitle2">{`${t(
                                                            'startDate'
                                                        )}:`}</Typography>
                                                    }
                                                    secondary={
                                                        <Typography color="textSecondary" variant="body2">
                                                            {job.startDate}
                                                        </Typography>
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid item xs={2} margin="auto" alignContent="center">
                                                <ListItemAvatar sx={{ color: 'action.active' }}>
                                                    <PaymentIcon fontSize="small" />
                                                </ListItemAvatar>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <ListItemText
                                                    disableTypography
                                                    primary={<Typography variant="subtitle2">{t('salary')}</Typography>}
                                                    secondary={
                                                        <Typography color="textSecondary" variant="body2">
                                                            {`$ ${job.minSalaryRange}k - ${job.maxSalaryRange}k`}
                                                        </Typography>
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        )}

                        <ListItem disableGutters divider>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={2} margin="auto" alignContent="center">
                                            <ListItemAvatar sx={{ color: 'action.active' }}>
                                                <MapsHomeWorkIcon fontSize="small" />
                                            </ListItemAvatar>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <ListItemText
                                                disableTypography
                                                primary={
                                                    <Typography variant="subtitle2">{t('selectedTypeWork')}</Typography>
                                                }
                                                secondary={
                                                    <Typography color="textSecondary" variant="body2">
                                                        {job.typeOfWork}
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={2} margin="auto" alignContent="center">
                                            <ListItemAvatar sx={{ color: 'action.active' }}>
                                                <BuildIcon fontSize="small" />
                                            </ListItemAvatar>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <ListItemText
                                                disableTypography
                                                primary={<Typography variant="subtitle2">{t('experience')}</Typography>}
                                                secondary={
                                                    <Typography color="textSecondary" variant="body2">
                                                        {getExperienceDisplay(job.experience, t)}
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem disableGutters divider>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
                                        {t('jobCreated')}
                                    </Typography>
                                }
                                secondary={
                                    <Typography color="textSecondary" variant="body2" sx={{ fontSize: 12 }}>
                                        {getDateHourDisplay(job.createdAt)}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AboutJob;
