import { Card, CardContent, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CONSULTANT_ROLE, PERMANENT_ROLE, EMPLOYER_ROLE, RECRUITER_ROLE } from '../../config/constants';
import User from '../../models/user';
import ConsultantProfileDetails from '../consultant/profileConsultant/ConsultantProfileDetails';
import { getAddressDisplay } from '../helpers/utilityFunctions';

interface PersonalInfoProps {
    user: User | null;
}

const useStyles: any = makeStyles((theme: Theme) => ({
    titleForm: {
        color: theme.palette.baseColorTxt,
        fontWeight: 700,
    },
    gridValue: {
        fontSize: 12,
        color: theme.palette.baseColorTxt,
    },
}));

const PersonalInfo = ({ user }: PersonalInfoProps) => {
    const { t } = useTranslation();
    const classes = useStyles();
    return (
        <Card>
            <CardContent>
                <Grid container spacing={1}>
                    {user?.role === CONSULTANT_ROLE ||
                        (user?.role === PERMANENT_ROLE && <ConsultantProfileDetails user={user} />)}
                    {(user?.role === EMPLOYER_ROLE || user?.role === RECRUITER_ROLE) && (
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <Typography className={classes.titleForm}>{t('Full Name')}:</Typography>
                                        </Grid>
                                        <Grid item xs={6} className={classes.gridValue}>
                                            <Typography>
                                                {user?.firstName} {user?.lastName}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <Typography className={classes.titleForm}>{t('Email')}:</Typography>
                                        </Grid>
                                        <Grid item xs={6} className={classes.gridValue}>
                                            <Typography>{user?.email}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <Typography className={classes.titleForm}>{t('phone')}:</Typography>
                                        </Grid>
                                        <Grid item xs={6} className={classes.gridValue}>
                                            <Typography>{user?.phone}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <Typography className={classes.titleForm}>{t('address')}:</Typography>
                                        </Grid>
                                        <Grid item xs={6} className={classes.gridValue}>
                                            <Typography>{getAddressDisplay(user?.address)}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PersonalInfo;
