import React, { useEffect, useState } from 'react';
import { Grid, Typography, Link, Divider, IconButton, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from '../../models/profile';
import { RootState } from '../../store/store';
import { getResume } from '../../store/reducers/candidate/candidateActions';
import { getOptionsLabeled, LEVEL_LANGUAGE_OPTIONS } from '../helpers/typeOptions';
import FileUpLoad from './FileUpLoad';
import StyledBtnComponent from './StyledBtnComponent';
import globalStyles from '../../config/globalCss';
import Upload from '../../assets/images/dashboard/upload.png';
import User from '../../models/user';

const useStyles: any = makeStyles((theme: Theme) => ({
    titleForm: {
        color: theme.palette.baseColorTxt,
        fontWeight: 700,
    },
    gridValue: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 15,
        lineHeight: '18px',
        color: 'rgba(0, 0, 0, 0.8)',
        paddingTop: '8px',
    },
    gridTitle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '17px',
        color: theme.palette.common.black,
    },
    gridLine: {
        marginTop: 10,
        marginBottom: 10,
        borderBottom: '0.5px solid #E8E8E8',
    },
    boxResumeUpload: {
        maxWidth: 285,
        background: theme.palette.common.white,
        border: '1px dashed #DBDBDB',
        boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.05)',
        borderRadius: '10px',
        height: 122,
        padding: '2px',
    },
}));

const ProfesionalInfoDetails = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { profileParameters, user, profile }: { profileParameters: any; user: User; profile: Profile } = useSelector(
        (state: RootState) => ({
            profileParameters: state.generic.profilParameters,
            user: state.authentication.user,
            profile: state.candidate.profile,
        })
    );

    const css = useStyles();
    const classes = globalStyles();
    const [isFileUpLoadOpen, setIsFileUpLoadOpen] = useState(false);

    const getResumeUrl = () => {
        const fileType = profile.resume.name.split('.')[1];
        const data = new Blob([profile?.resume], { type: `application/${fileType}` });
        return window.URL.createObjectURL(data);
    };

    const getLibelle = (id: any, liste: any) => {
        if (id && id !== '' && liste && liste.lenght !== 0) {
            const ids = id.split(',');
            return liste
                .filter((x: any) => ids.includes(x.value))
                .map((x: any) => x.label)
                .join(' , ');
        }

        return '';
    };

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
        noSsr: true,
    });

    useEffect(() => {
        if (profile) dispatch(getResume(user.id));
    }, []);
    return (
        <Grid container spacing={1} sx={{ marginBottom: 2, background: 'transparent' }}>
            {profile.resume && (
                <Grid item xs={12} sx={{ marginTop: '8px' }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className={css.gridTitle}>{t('resume')}:</Typography>
                        </Grid>
                        <Grid item xs={12} className={css.gridValue}>
                            {profile.resume && profile.resume.name && (
                                <Typography
                                    color="textSecondary"
                                    sx={{
                                        flexGrow: 1,
                                        mr: 2,
                                    }}
                                    id="modal-modal-title">
                                    <Link
                                        href={getResumeUrl()}
                                        underline="none"
                                        color="inherit"
                                        download={profile.resume}>
                                        {profile.resume.name}
                                    </Link>
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            )}
            {!profile.resume && (
                <Grid item xs={12} margin="auto" textAlign="justify" minHeight="45px">
                    <Grid container className={css.boxResumeUpload}>
                        <Grid item xs={12} justifyContent="center" textAlign="center">
                            <Grid container>
                                <Grid item xs={12}>
                                    <IconButton color="primary" onClick={() => setIsFileUpLoadOpen(true)}>
                                        <img src={Upload} alt="Upload" width="40px" height="40px" />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={6} textAlign="right">
                                            <StyledBtnComponent
                                                title={t('clickToUpload')}
                                                handleOnClick={() => setIsFileUpLoadOpen(true)}
                                                classesName={classes.btnLinksInter}
                                            />
                                        </Grid>
                                        <Grid item xs={6} textAlign="left" paddingTop="3px">
                                            <Typography component="span" className={classes.txtDrag}>{` ${t(
                                                'clickDrag'
                                            )}`}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.txtDrag} sx={{ fontSize: '12px !important' }}>
                                        {t('maxUpload')}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <FileUpLoad
                                isOpen={isFileUpLoadOpen}
                                onClose={() => setIsFileUpLoadOpen(false)}
                                title={t('resume')}
                                text={t('dropCVDescription')}
                                maxSize={1048576}
                                maxSizeText="1MB"
                                extensions=".pdf,.doc,.docx"
                                resume={profile.resume}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            )}
            <Grid item xs={12}>
                <Divider
                    sx={{
                        color: '#EFE7EC',
                        marginTop: '24px',
                        marginBottom: '24px',
                    }}
                />
                <Grid container spacing={isMobile ? 5 : 0}>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={css.gridTitle}>{t('jobTitle')}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={css.gridValue}>
                                    {profile?.titles
                                        ?.filter((title: any) => title.label.trim() !== '')
                                        .map((title: any) => title.label.trim())
                                        .join(', ')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={css.gridTitle}>{t('jobFuntion')}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={css.gridValue}>
                                    {getLibelle(profile?.jobFunction, profileParameters.functions)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={css.gridLine} />
            <Grid item xs={12}>
                <Grid container spacing={isMobile ? 5 : 0}>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={css.gridTitle}>{t('skills')}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={css.gridValue}>
                                    {profile?.skills
                                        ?.filter((skill: any) => skill.skill.trim() !== '')
                                        .map((skill: { skill: any }) => skill.skill.trim())
                                        .join(', ')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={css.gridTitle}>{t('experience')}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={css.gridValue}>
                                    {getLibelle(profile?.experienceLevel, profileParameters.experienceLevels)}{' '}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={css.gridLine} />
            <Grid item xs={12}>
                <Grid container spacing={isMobile ? 5 : 0}>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={css.gridTitle}>{t('culture')}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={css.gridValue}>
                                    {' '}
                                    {getLibelle(profile?.culture, profileParameters.cultures)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={css.gridTitle}>{t('selectLanguageEngPlaceholder')}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={css.gridValue}>
                                    {
                                        getOptionsLabeled(LEVEL_LANGUAGE_OPTIONS, t)
                                            .filter((x: any) => x.value === profile?.selectLanguageEng)
                                            .map((x: any) => x.label)?.[0]
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={css.gridLine} />
            <Grid item xs={12}>
                <Grid container spacing={isMobile ? 5 : 0}>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={css.gridTitle}>{t('personality')}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={css.gridValue}>
                                    {getLibelle(profile?.personality, profileParameters.personalities)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={css.gridTitle}>{t('selectLanguageFrPlaceholder')}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={css.gridValue}>
                                    {
                                        getOptionsLabeled(LEVEL_LANGUAGE_OPTIONS, t)
                                            .filter((x) => x.value === profile?.selectLanguageFr)
                                            .map((x) => x.label)?.[0]
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProfesionalInfoDetails;
