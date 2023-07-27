/* eslint-disable no-param-reassign */
import React from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { ApexOptions } from 'apexcharts';
import { Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import ProfileMatchChart from './ProfileMatchChart';
import { Education } from '../../../models/education';
import { Experience } from '../../../models/experience';
import { recruiterAcceptOrDeclineMatch } from '../../../store/reducers/recruiter/recruiterActions';
import UserMatch from '../../../models/userMatch';

type MatchProp = {
    match: UserMatch;
    setMessage: any;
};

const MatchAlt = ({ match, setMessage }: MatchProp) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const accceptMatch = () => {
        match.isApprovedByCompany = true;
        setMessage('Thank you! You will be contacted by that person shortly');
        dispatch(recruiterAcceptOrDeclineMatch(match));
    };

    const declineMatch = () => {
        match.isDeclinedByCompany = true;

        setMessage('Thank you for your input!');
        dispatch(recruiterAcceptOrDeclineMatch(match));
    };

    const points: number =
        // match.enterprisePoints + match.experiencePoints + match.locationPoints + match.salaryPoints + match.skillPoints;
        match.score;
    const apexOpts: ApexOptions = {
        grid: {
            padding: {
                left: 0,
                right: 0,
            },
        },
        chart: {
            height: 278,
            type: 'radialBar',
            parentHeightOffset: 0,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        fontSize: '16px',
                    },
                    total: {
                        show: true,
                        color: '#ec008b',
                        fontSize: '22px',
                        label: 'Match',
                        formatter(): any {
                            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                            return `${points} %`;
                        },
                    },
                },
            },
        },

        colors: ['#ec008b'],
        labels: ['Percentage'],
    };

    return (
        <Card
            sx={{
                marginBottom: '15px',
            }}
            variant="outlined">
            <CardContent>
                <Grid item container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2,
                        }}>
                        <Typography variant="h6">{`Match for ${match.job.title}. Type: ${match.job.role}`} </Typography>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <Chart
                            options={apexOpts}
                            series={[points]}
                            type="radialBar"
                            height={278}
                            className="apex-charts mt-3"
                        />
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <ProfileMatchChart match={match} />
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <Typography variant="h6">{t('experience')}</Typography>
                        {match.profile.experience &&
                            match.profile.experience.map((e: Experience) => (
                                <Typography key={e.id} color="textSecondary" variant="body2">
                                    {`${e.companyName}, ${e.title}, ${
                                        e.startingDate ? e.startingDate?.toString()?.substring(0, 7) : ''
                                    } - ${e.endingDate ? e.endingDate?.toString()?.substring(0, 7) : ''}`}
                                </Typography>
                            ))}
                        {match.profile.experience.length === 0 && (
                            <Typography color="textSecondary" variant="body2">
                                {t('No experience added')}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <Typography variant="h6">{t('Education')}</Typography>
                        {match.profile.education &&
                            match.profile.education.map((e: Education) => (
                                <Typography key={e.id} color="textSecondary" variant="body2">
                                    {`${e.degree}, ${e.institutionName}`}
                                </Typography>
                            ))}
                        {match.profile.education.length === 0 && (
                            <Typography color="textSecondary" variant="body2">
                                {t('No education added')}
                            </Typography>
                        )}
                    </Grid>

                    <Grid item md={6} xs={6}>
                        <Typography variant="h6">{t('skills')}</Typography>
                        {match.profile.skills && (
                            <Typography color="textSecondary" variant="body2">
                                {match.profile.skills.map((e) => `${e.skill} `)}
                            </Typography>
                        )}
                        {match.profile.skills.length === 0 && (
                            <Typography color="textSecondary" variant="body2">
                                {t('No skills added')}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <Typography variant="h6">{t('ratePerHour')}</Typography>
                        <Typography color="textSecondary" variant="body2">
                            {match.profile.startingRatePerHour} - {match.profile.endingRatePerHour}
                        </Typography>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <Typography variant="h6">{t('Location')}</Typography>
                        <Typography color="textSecondary" variant="body2">
                            {match.profile?.address?.city}
                        </Typography>
                    </Grid>
                    {match.profile.summary && (
                        <Grid item md={12} xs={12}>
                            <Typography variant="h6">{t('summary')}</Typography>
                            <Typography color="textSecondary" variant="body2">
                                {match.profile.summary}
                            </Typography>
                        </Grid>
                    )}
                    <Grid
                        item
                        md={12}
                        xs={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                        <Button
                            onClick={accceptMatch}
                            color="secondary"
                            variant="outlined"
                            sx={{ marginRight: '15px' }}>
                            {t('Accept')}
                        </Button>
                        <Button onClick={declineMatch} color="warning" variant="outlined">
                            {t('Decline')}
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default MatchAlt;
