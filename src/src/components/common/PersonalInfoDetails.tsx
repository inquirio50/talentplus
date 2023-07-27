import React from 'react';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { getAddressDisplay, formatPhoneNumberDisplay } from '../helpers/utilityFunctions';
import { Profile } from '../../models/profile';

const useStyles: any = makeStyles(() => ({
    gridValue: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: '18px',

        color: 'rgba(0, 0, 0, 0.8)',
    },
    gridTitle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '17px',

        color: '#000000',
    },
    gridLine: {
        marginTop: 10,
        marginBottom: 10,

        borderBottom: '0.5px solid #E8E8E8',
    },
}));

const PersonalInfoDetails = ({ profile }: { profile: Profile }) => {
    const { t } = useTranslation();

    const classes = useStyles();

    return (
        <Grid container spacing={1} sx={{ marginBottom: 2, background: 'transparent' }}>
            <Grid item xs={12} className={classes.gridLine} />
            {!profile?.projectDescription && (
                <Grid item xs={12}>
                    <Typography className={classes.gridTitle}>{t('tellAboutYourself')}:</Typography>
                </Grid>
            )}
            <Grid item xs={12} className={classes.gridValue} sx={{ height: '60px' }}>
                <Typography>{profile?.projectDescription}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.gridLine} />
            <Grid item lg={6} md={6} xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={classes.gridTitle}>{t('address')}:</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.gridValue}>
                        <Typography>{getAddressDisplay(profile?.address)}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                xs={12}
                className={classes.gridLine}
                sx={{
                    display: {
                        md: 'none',
                        sm: 'block',
                    },
                }}
            />
            <Grid item lg={6} md={6} xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={classes.gridTitle}>{t('email')}:</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.gridValue}>
                        <Typography>{profile?.email}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.gridLine} />
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={classes.gridTitle}>{t('phone')}:</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.gridValue}>
                        <Typography>{formatPhoneNumberDisplay(profile?.phoneNumber)}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PersonalInfoDetails;
