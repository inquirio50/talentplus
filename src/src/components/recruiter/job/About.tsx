import React from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
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
import {
    convertSkillsToString,
    getDateHourDisplay,
    getExperienceDisplay,
    getTypeOfWorkDisplay,
} from '../../helpers/utilityFunctions';

const AboutJob = ({ job }: any) => {
    const { t } = useTranslation();

    return (
        <div>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardHeader title={job.reference} />
                    <Divider />
                    <CardContent>
                        <List>
                            <ListItem disableGutters divider>
                                <ListItemAvatar sx={{ color: 'action.active' }}>
                                    <TitleIcon fontSize="small" />
                                </ListItemAvatar>
                                <ListItemText
                                    disableTypography
                                    primary={<Typography variant="subtitle2">{t('Employment Type')}:</Typography>}
                                    secondary={
                                        <Typography color="textSecondary" variant="body2">
                                            {job.role}
                                        </Typography>
                                    }
                                />
                            </ListItem>

                            <ListItem disableGutters divider>
                                <ListItemAvatar sx={{ color: 'action.active' }}>
                                    <WorkIcon fontSize="small" />
                                </ListItemAvatar>
                                <ListItemText
                                    disableTypography
                                    primary={<Typography variant="subtitle2">{t('Skills')}</Typography>}
                                    secondary={
                                        <Typography color="textSecondary" variant="body2">
                                            {convertSkillsToString(job.skills)}
                                        </Typography>
                                    }
                                />
                            </ListItem>

                            {job.role === 'contractor' && (
                                <>
                                    <ListItem disableGutters divider>
                                        <ListItemAvatar sx={{ color: 'action.active' }}>
                                            <AccessTimeIcon fontSize="small" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            disableTypography
                                            primary={
                                                <Typography variant="subtitle2">{t('Contract duration')}:</Typography>
                                            }
                                            secondary={
                                                <Typography color="textSecondary" variant="body2">
                                                    {job.duration}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    <ListItem disableGutters divider>
                                        <ListItemAvatar sx={{ color: 'action.active' }}>
                                            <PaymentIcon fontSize="small" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            disableTypography
                                            primary={<Typography variant="subtitle1">{t('Rate per hour')}</Typography>}
                                            secondary={
                                                <Typography color="textSecondary" variant="body2">
                                                    {`$ ${job.startingRatePerHour} - ${job.endingRatePerHour}`}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                </>
                            )}

                            {job.role === 'employee' && (
                                <>
                                    <ListItem disableGutters divider>
                                        <ListItemAvatar sx={{ color: 'action.active' }}>
                                            <CalendarMonthIcon fontSize="small" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            disableTypography
                                            primary={<Typography variant="subtitle2">{t('Start Date:')}</Typography>}
                                            secondary={
                                                <Typography color="textSecondary" variant="body2">
                                                    {getDateHourDisplay(job.startDate)}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    <ListItem disableGutters divider>
                                        <ListItemAvatar sx={{ color: 'action.active' }}>
                                            <PaymentIcon fontSize="small" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            disableTypography
                                            primary={<Typography variant="subtitle2">{t('Salary')}</Typography>}
                                            secondary={
                                                <Typography color="textSecondary" variant="body2">
                                                    {`$ ${job.minSalaryRange} - ${job.maxSalaryRange}`}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                </>
                            )}

                            <ListItem disableGutters divider>
                                <ListItemAvatar sx={{ color: 'action.active' }}>
                                    <MapsHomeWorkIcon fontSize="small" />
                                </ListItemAvatar>
                                <ListItemText
                                    disableTypography
                                    primary={<Typography variant="subtitle2">Type of work</Typography>}
                                    secondary={
                                        <Typography color="textSecondary" variant="body2">
                                            {getTypeOfWorkDisplay(job.typeOfWork, t)}
                                        </Typography>
                                    }
                                />
                            </ListItem>

                            <ListItem disableGutters divider>
                                <ListItemAvatar sx={{ color: 'action.active' }}>
                                    <BuildIcon fontSize="small" />
                                </ListItemAvatar>
                                <ListItemText
                                    disableTypography
                                    primary={<Typography variant="subtitle2">{t('experience')}</Typography>}
                                    secondary={
                                        <Typography color="textSecondary" variant="body2">
                                            {getExperienceDisplay(job.experience, t)}
                                        </Typography>
                                    }
                                />
                            </ListItem>

                            <ListItem disableGutters divider>
                                <ListItemAvatar sx={{ color: 'action.active' }}>
                                    <WorkIcon fontSize="small" />
                                </ListItemAvatar>
                                <ListItemText
                                    disableTypography
                                    primary={<Typography variant="subtitle2">Job Created</Typography>}
                                    secondary={
                                        <Typography color="textSecondary" variant="body2">
                                            {getDateHourDisplay(job.createdAt)}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

export default AboutJob;
