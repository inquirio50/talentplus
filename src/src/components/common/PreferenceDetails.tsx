import React from 'react';
import {
    Grid,
    Typography,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    Divider,
    useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Profile } from '../../models/profile';
import { CONSULTANT_ROLE, PERMANENT_ROLE } from '../../config/constants';
import { CommonTypeOptions, getOptionsLabeled, TYPE_BENEFITS, TYPE_NOTIFICATION } from '../helpers/typeOptions';
import { formatSalary, getBenefits, getTypeOfWorkDisplay } from '../helpers/utilityFunctions';
import { RootState } from '../../store/store';

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
    gridSubTitle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '17px',
        color: 'rgba(0, 0, 0, 0.54);',
    },
    gridLine: {
        marginTop: 10,
        marginBottom: 10,

        borderBottom: '0.5px solid #E8E8E8',
    },
    radio: {
        color: '#202020',
        '&.Mui-checked': {
            color: theme.palette.baseColor,
        },
    },
    label: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 16,
        color: '#202020',
    },
    activeLabel: {
        color: '#EC008B',
    },
    summary: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 15,
        color: 'rgba(0, 0, 0, 0.8)',
    },
}));

const PreferenceDetails = () => {
    const { t } = useTranslation();

    const { profileParameters, profile }: { profileParameters: any; profile: Profile } = useSelector(
        (state: RootState) => ({
            profileParameters: state.generic.profilParameters,
            profile: state.candidate.profile,
        })
    );

    const classes = useStyles();
    const isConsultant = () => profile && profile.role && profile.role.includes(CONSULTANT_ROLE);
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

    const getBenefitsLabel = () => {
        const listBenefits = getOptionsLabeled(TYPE_BENEFITS, t);
        const benefits = profile.questionaire ? getBenefits(profile.questionaire.benefits) : '';
        const returnBenefits: CommonTypeOptions[] = [];
        if (benefits) {
            const benefitSplit = benefits.split(',');
            benefitSplit.forEach((b: string) => {
                const found = listBenefits.find((be: CommonTypeOptions) => be.value === b);
                if (found) returnBenefits.push(found);
            });
        }
        return returnBenefits.map((v: CommonTypeOptions) => v.label).join(',');
    };

    return (
        <Grid container spacing={1} sx={{ marginBottom: 2, background: 'transparent' }}>
            <Grid item xs={12}>
                <Divider
                    sx={{
                        color: '#EFE7EC',
                        marginTop: '24px',
                        marginBottom: '16px',
                    }}
                />
                <Grid container spacing={isMobile ? 5 : 0}>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.gridTitle}>{t('workMode')}</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.gridValue}>
                                <Typography>
                                    {profile?.typeOfWork != null && getTypeOfWorkDisplay(profile?.typeOfWork, t)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.gridTitle}>{t('distanceFromWork')}</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.gridValue}>
                                <Typography>
                                    {getLibelle(profile.localisation, profileParameters.localisations)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.gridLine} />
            <Grid item xs={12}>
                <Grid container spacing={isMobile ? 5 : 0}>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.gridTitle}>{t('industry')}</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.gridValue}>
                                <Typography>{getLibelle(profile.industry, profileParameters.industries)}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.gridTitle}>{t('unwantedIndustry')}</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.gridValue}>
                                <Typography>
                                    {getLibelle(profile.unWantedIndustry, profileParameters.industries)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.gridLine} />
            <Grid item xs={12}>
                <Grid container spacing={isMobile ? 5 : 0}>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.gridTitle}>{t('howYouWantToBeNotified')}</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.gridValue}>
                                <Typography>
                                    {
                                        getOptionsLabeled(TYPE_NOTIFICATION, t)
                                            .filter((x: any) => x.value === profile.notified)
                                            .map((x: any) => x.label)?.[0]
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.gridTitle}>{t('workSizeEnvironment')}</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.gridValue}>
                                <Typography>{getLibelle(profile.sizeOfWork, profileParameters.sizeOfWorks)}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} className={classes.gridLine} />
            <Grid item xs={12}>
                <Grid container spacing={isMobile ? 5 : 0}>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.gridTitle}>{t('benefits')}</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.gridValue}>
                                <Typography>{getBenefitsLabel()}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.gridTitle}>
                                    {t(isConsultant() ? 'rate' : 'annualSalary')}:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.gridValue}>
                                <Typography>
                                    {formatSalary(
                                        getLibelle(profile.salaryId, profileParameters.salaries),
                                        profile.role || PERMANENT_ROLE
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} className={classes.gridLine} />
            <Grid item xs={12}>
                <Grid container spacing={isMobile ? 5 : 0}>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel id="leggalyLabel" className={classes.gridSubTitle}>
                                        {t('questionLeggaly')}
                                    </FormLabel>
                                    <RadioGroup
                                        value={profile.legallyWork}
                                        row
                                        aria-labelledby="leggalyLabel"
                                        defaultValue="female"
                                        name="radio-buttons-group">
                                        <FormControlLabel
                                            value
                                            control={<Radio disabled className={classes.radio} />}
                                            label={
                                                <Typography
                                                    className={clsx(
                                                        classes.label,
                                                        profile.legallyWork ? classes.activeLabel : ''
                                                    )}>
                                                    {t('yes')}
                                                </Typography>
                                            }
                                        />
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio disabled className={classes.radio} />}
                                            label={
                                                <Typography
                                                    className={clsx(
                                                        classes.label,
                                                        profile.legallyWork ? '' : classes.activeLabel
                                                    )}>
                                                    {t('no')}
                                                </Typography>
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel id="notifiedMatchLabel" className={classes.gridSubTitle}>
                                        {t('notifyMeWhenMatchIsDeclined')}
                                    </FormLabel>
                                    <RadioGroup
                                        value={profile.questionaire?.notifyIfMatchDeclined === 'true' || false}
                                        row
                                        aria-labelledby="NotifiedMatchLabel"
                                        defaultValue="female"
                                        name="radio-buttons-group">
                                        <FormControlLabel
                                            value
                                            control={<Radio disabled className={classes.radio} />}
                                            label={
                                                <Typography
                                                    className={clsx(
                                                        classes.label,
                                                        profile.questionaire?.notifyIfMatchDeclined === 'true'
                                                            ? classes.activeLabel
                                                            : ''
                                                    )}>
                                                    {t('yes')}
                                                </Typography>
                                            }
                                        />
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio disabled className={classes.radio} />}
                                            label={
                                                <Typography
                                                    className={clsx(
                                                        classes.label,
                                                        profile.questionaire?.notifyIfMatchDeclined === 'true'
                                                            ? ''
                                                            : classes.activeLabel
                                                    )}>
                                                    {t('no')}
                                                </Typography>
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} className={classes.gridLine} />
            <Grid item xs={12}>
                <Grid container spacing={isMobile ? 5 : 0}>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel id="relocateLabel" className={classes.gridSubTitle}>
                                        {t('questionRelocate')}{' '}
                                    </FormLabel>
                                    <RadioGroup
                                        value={profile.relocate}
                                        row
                                        aria-labelledby="relocateLabel"
                                        defaultValue="female"
                                        name="radio-buttons-group">
                                        <FormControlLabel
                                            value
                                            control={<Radio disabled className={classes.radio} />}
                                            label={
                                                <Typography
                                                    className={clsx(
                                                        classes.label,
                                                        profile.relocate ? classes.activeLabel : ''
                                                    )}>
                                                    {t('yes')}
                                                </Typography>
                                            }
                                        />
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio disabled className={classes.radio} />}
                                            label={
                                                <Typography
                                                    className={clsx(
                                                        classes.label,
                                                        profile.relocate ? '' : classes.activeLabel
                                                    )}>
                                                    {t('no')}
                                                </Typography>
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel id="inProcessLabel" className={classes.gridSubTitle}>
                                        {t('selectionProcess')}{' '}
                                    </FormLabel>
                                    <RadioGroup
                                        value={profile.processWithCompany}
                                        row
                                        aria-labelledby="inProcessLabel"
                                        defaultValue="female"
                                        name="radio-buttons-group">
                                        <FormControlLabel
                                            value
                                            control={<Radio disabled className={classes.radio} />}
                                            label={
                                                <Typography
                                                    className={clsx(
                                                        classes.label,
                                                        profile.processWithCompany ? classes.activeLabel : ''
                                                    )}>
                                                    {t('yes')}
                                                </Typography>
                                            }
                                        />
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio disabled className={classes.radio} />}
                                            label={
                                                <Typography
                                                    className={clsx(
                                                        classes.label,
                                                        profile.processWithCompany ? '' : classes.activeLabel
                                                    )}>
                                                    {t('no')}
                                                </Typography>
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} className={classes.gridLine} />
            <Grid item xs={12}>
                <Grid container spacing={isMobile ? 5 : 0}>
                    <Grid item lg={6} md={6} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel id="sponsor-radio-buttons-group-label" className={classes.gridSubTitle}>
                                        {t('questionSponsor')}
                                    </FormLabel>
                                    <RadioGroup
                                        value={profile.needSponsor}
                                        row
                                        aria-labelledby="sponsor-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group">
                                        <FormControlLabel
                                            value
                                            control={<Radio disabled className={classes.radio} />}
                                            label={t('yes')}
                                        />
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio disabled className={classes.radio} />}
                                            label={t('no')}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} />
                </Grid>
            </Grid>
        </Grid>
    );
};

PreferenceDetails.defaultProps = {
    user: null,
};

export default PreferenceDetails;
