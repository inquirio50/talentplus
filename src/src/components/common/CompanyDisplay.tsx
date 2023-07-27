/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Divider, Grid, Typography } from '@mui/material';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import User from '../../models/user';
import { Profile } from '../../models/profile';
import { RootState } from '../../store/store';

const useStyles: any = makeStyles((theme: Theme) => ({
    title: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
        lineHeight: '21px',
        color: theme.palette.common.black,
    },
    subTitle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '17px',
        color: 'rgba(0, 0, 0, 0.8);',
    },
    description: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 15,
        lineHeight: '150%',
        color: 'rgba(0, 0, 0, 0.8);',
    },
}));

const CompanyDisplay = () => {
    const { t } = useTranslation();
    const css = useStyles();

    const { profileParameters, user, profile }: { profileParameters: any; user: User; profile: Profile } = useSelector(
        (state: RootState) => ({
            profileParameters: state.generic.profilParameters,
            user: state.authentication.user,
            profile: state.candidate.profile,
        })
    );

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography className={css.title}>{t('Company Name')}</Typography>
            </Grid>
            <Divider
                sx={{
                    color: '#E8E8E8',
                    marginTop: '24px',
                    marginBottom: '24px',
                    width: '100%',
                    maxWidth: '732px',
                }}
            />
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={css.subTitle}>{t('address')}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ paddingTop: '8px' }}>
                                <Typography className={css.description}>
                                    {t('67 rue des renards, St jean sur richelieu J2W-1P6')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography className={css.subTitle}>{t('companyEmailAddress')}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ paddingTop: '8px' }}>
                                <Typography className={css.description}>{t('ralph@reelcruit.com')}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ paddingTop: '24px' }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={css.subTitle}>{t('phoneNumber')}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ paddingTop: '8px' }}>
                                <Typography className={css.description}>{t('(CA) +1 647-734-4866')}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ paddingTop: '24px' }}>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography className={css.subTitle}>{t('taxNumber')}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ paddingTop: '8px' }}>
                                <Typography className={css.description}>{t('02145876')}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: '24px' }}>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography className={css.subTitle}>{t('taxNumberQST')}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ paddingTop: '8px' }}>
                                <Typography className={css.description}>{t('02145876')}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CompanyDisplay;
