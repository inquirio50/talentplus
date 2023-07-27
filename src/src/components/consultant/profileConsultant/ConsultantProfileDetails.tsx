import React, { useEffect } from 'react';
import { Grid, Typography, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from '../../../models/profile';
import { RootState } from '../../../store/store';
import { getAddressDisplay, getTypeOfWorkDisplay, formatPhoneNumberDisplay } from '../../helpers/utilityFunctions';
import { getResume } from '../../../store/reducers/candidate/candidateActions';

const useStyles: any = makeStyles((theme: Theme) => ({
    titleForm: {
        color: theme.palette.baseColorTxt,
        fontWeight: 700,
    },
    gridValue: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: '18px',

        color: 'rgba(0, 0, 0, 0.8)',
    },
}));

const ConsultantProfileDetails = ({ user }: { user?: any }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const classes = useStyles();

    const { profile }: { profile: Profile } = useSelector((state: RootState) => ({
        profile: state.candidate.profile,
    }));

    const getResumeUrl = () => {
        const fileType = profile.resume.name.split('.')[1];
        const data = new Blob([profile.resume], { type: `application/${fileType}` });
        return window.URL.createObjectURL(data);
    };

    useEffect(() => {
        if (user) {
            // fetch Profile from user
        }
    }, []);

    useEffect(() => {
        if (user) dispatch(getResume(user.id));
    }, []);

    return (
        <Grid item xs={12}>
            <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('fullName')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>
                                        {user?.firstName} {user.lastName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('phone')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>{user && formatPhoneNumberDisplay(user.phoneNumber)}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('email')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>{user?.email}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={1}>
                                    <Typography variant="subtitle1">{t('address')}:</Typography>
                                </Grid>
                                <Grid item xs={11} className={classes.gridValue}>
                                    <Typography>{getAddressDisplay(user?.address)}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <Typography variant="subtitle1">{t('resume')}:</Typography>
                                </Grid>
                                <Grid item xs={10} className={classes.gridValue}>
                                    {profile && profile.resume && (
                                        <Typography
                                            color="textSecondary"
                                            sx={{
                                                flexGrow: 1,
                                                mr: 2,
                                            }}
                                            id="modal-modal-title">
                                            {profile.resume && profile.resume.name && (
                                                <Link
                                                    href={getResumeUrl()}
                                                    underline="none"
                                                    color="inherit"
                                                    download={profile.resume.name}>
                                                    {profile.resume.name}
                                                </Link>
                                            )}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h6" component="div">
                        {t('professionalInformation')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('title')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>
                                        {user?.titles
                                            ?.filter((title: any) => title.label.trim() !== '')
                                            .map((title: any) => title.label.trim())
                                            .join(', ')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('skills')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>
                                        {user?.skills
                                            ?.filter((skill: any) => skill.skill.trim() !== '')
                                            .map((skill: { skill: any }) => skill.skill.trim())
                                            .join(', ')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('culture')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>{user?.culture}</Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('language')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>{user?.language}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('function')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>{user?.jobFunction}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('experience')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>{user?.experienceLevel}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('personality')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>{user?.personality}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ marginBottom: 2 }}>
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h6" component="div">
                        {t('myPreferences')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('rate')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>{`${user?.startingRatePerHour}k - ${user?.endingRatePerHour}k`}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('localization')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>{user?.localization}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('sizeOfWork')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>{user?.sizeOfWork}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('selectedTypeWork')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>
                                        {user?.typeOfWork != null && getTypeOfWorkDisplay(user?.typeOfWork, t)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('industry')}:</Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.gridValue}>
                                    <Typography>{user?.industry}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">{t('summary')}:</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{ textAlign: 'justify' }} className={classes.gridValue}>
                                    <Typography>{user?.projectDescription}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

ConsultantProfileDetails.defaultProps = {
    user: null,
};

export default ConsultantProfileDetails;
