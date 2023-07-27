import React from 'react';
import { Button, Checkbox, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { pink } from '@mui/material/colors';
import { Work, Badge } from '@mui/icons-material';
import { Theme } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { EMPLOYER_ROLE } from '../../config/constants';
import globalStyles from '../../config/globalCss';
import { FormDataType } from '../../config/interfaces';
import StyledBtnComponent from '../common/StyledBtnComponent';
import TextFieldComponent from '../common/TextFieldComponent';
import { Check } from '../icons/Icons';

const useStyles = makeStyles((theme: Theme) => ({
    text: {
        fontSize: 14,
        color: theme.palette.baseColorTxt,
    },
    textBold: {
        fontSize: 14,
        color: theme.palette.baseColorTxt,
        fontWeight: 'bold',
    },
    textBigBold: {
        fontSize: 24,
        color: theme.palette.baseColorTxt,
        fontWeight: 'bold',
    },
    textColor: {
        fontSize: 14,
        color: theme.palette.baseColor,
    },
    btnWork: {
        color: theme.palette.baseColor,
        backgroundColor: theme.palette.common.white,
        border: '1px solid transparent',
        borderColor: theme.palette.baseColor,
        fontWeight: 400,
        '&:focus': {
            [theme.breakpoints.up('xs')]: {
                backgroundColor: theme.palette.baseColor,
                color: theme.palette.common.white,
            },
        },
        '&:hover': {
            backgroundColor: theme.palette.baseColor,
            color: theme.palette.common.white,
            [theme.breakpoints.down('md')]: {
                height: 135,
            },
            [theme.breakpoints.up('xs')]: {
                height: 67,
            },
        },
        [theme.breakpoints.down('md')]: {
            display: 'block',
        },
    },
    alternativeBtnGrow: {
        color: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.common.white,
        border: '1px solid transparent',
        '&:focus': {
            [theme.breakpoints.up('xs')]: {
                backgroundColor: theme.palette.baseColor,
                color: theme.palette.common.white,
            },
        },
        '&:hover': {
            backgroundColor: theme.palette.baseColor,
            color: theme.palette.common.white,
            [theme.breakpoints.down('md')]: {
                height: 135,
            },
            [theme.breakpoints.up('xs')]: {
                height: 67,
            },
        },
        [theme.breakpoints.down('md')]: {
            display: 'block',
        },
    },
    btlBlue: {
        color: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.common.white,
        border: '1px solid transparent',
        '&:focus': {
            backgroundColor: theme.palette.baseColor,
            color: theme.palette.common.white,
        },
        '&:hover': {
            backgroundColor: theme.palette.baseColor,
            color: theme.palette.common.white,
        },
    },
    btnRed: {
        color: theme.palette.baseColor,
        backgroundColor: theme.palette.common.white,
        border: '1px solid transparent',
        borderColor: theme.palette.baseColor,
        fontWeight: 400,
        '&:focus': {
            backgroundColor: theme.palette.baseColor,
            color: theme.palette.common.white,
        },
        '&:hover': {
            backgroundColor: theme.palette.baseColor,
            color: theme.palette.common.white,
        },
    },
}));

const RegisterSteps = ({
    step,
    handleChange,
    msgErr,
    formData,
    toggle,
    loading,
}: {
    step: number;
    handleChange: any;
    msgErr: Map<string, string> | undefined;
    formData: FormDataType | undefined;
    toggle: any;
    loading: boolean;
}) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const globalClasses: any = globalStyles();
    switch (step) {
        case 0: {
            if (formData?.role === EMPLOYER_ROLE) {
                return (
                    <Grid container>
                        <Grid item xs={12}>
                            <TextFieldComponent
                                id="company"
                                label={t('Company Name')}
                                name="company"
                                placeholder={t('company')}
                                handleChange={handleChange('company')}
                                value={formData?.company}
                                error={msgErr || null}
                            />
                        </Grid>
                    </Grid>
                );
            }
            return (
                <Grid container spacing={2} sx={{ minHeight: '150px' }}>
                    <Grid item xs={6} sx={{ textAlign: '-webkit-center', minHeight: '65px' }} margin="auto">
                        <StyledBtnComponent
                            title={t('Iwantwork')}
                            handleOnClick={handleChange('IWork')}
                            loading={loading}
                            startIcon={!loading ? <Work /> : null}
                            classesName={classes.btnWork}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        paddingTop={2}
                        sx={{ textAlign: '-webkit-center', minHeight: '65px' }}
                        margin="auto">
                        <StyledBtnComponent
                            title={t('Iwantemploy')}
                            handleOnClick={handleChange('IEmploy')}
                            loading={loading}
                            startIcon={!loading ? <Badge /> : null}
                            classesName={classes.alternativeBtnGrow}
                        />
                    </Grid>
                </Grid>
            );
        }
        case 1: {
            return (
                <form>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextFieldComponent
                                id="email"
                                label={t('email')}
                                name="email"
                                placeholder={t('Enter your email')}
                                handleChange={handleChange('email')}
                                value={formData?.email}
                                error={msgErr}
                                autoCompleteInput="username"
                            />
                        </Grid>
                        <Grid item xs={12} paddingTop={2}>
                            <TextFieldComponent
                                id="password"
                                label={t('Password')}
                                name="password"
                                placeholder={t('enterPassword')}
                                type="password"
                                value={formData?.password}
                                handleChange={handleChange('password')}
                                required
                                error={msgErr}
                                autoCompleteInput="new-password"
                            />
                        </Grid>
                        <Grid item xs={12} paddingTop={2}>
                            <TextFieldComponent
                                id="confirmPassword"
                                label={t('ConfirmPassword')}
                                name="confirmPassword"
                                placeholder={t('ConfirmPassword')}
                                type="password"
                                value={formData?.confirmPassword}
                                handleChange={handleChange('confirmPassword')}
                                error={msgErr}
                                autoCompleteInput="new-password"
                            />
                        </Grid>
                        <Grid item xs={12} paddingTop={2}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <Checkbox
                                        id="agreement"
                                        checked={formData?.agreementRead}
                                        aria-label="agreement"
                                        sx={{
                                            color: pink[800],
                                            '&.Mui-checked': {
                                                color: pink[600],
                                            },
                                        }}
                                        onClick={handleChange('agreement')}
                                    />
                                </Grid>
                                <Grid item xs={10} textAlign="initial" paddingTop="5px">
                                    <Typography component="span" className={classes.text}>
                                        {t('Iagree')}
                                    </Typography>
                                    <Button onClick={toggle} className={globalClasses.linkBtn}>
                                        {t('termsAndConditions')}
                                    </Button>
                                </Grid>
                                {msgErr?.get('agreement') && (
                                    <Grid item xs={12}>
                                        <Typography
                                            sx={{
                                                color: 'red',
                                                textAlign: 'start',
                                                paddingLeft: '24px',
                                                paddingTop: '4px',
                                            }}>
                                            {msgErr?.get('agreement')}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            );
        }
        case 2: {
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <TextFieldComponent
                            id="userName"
                            label={t('userName')}
                            name="userName"
                            placeholder={t('enterUsername')}
                            handleChange={handleChange('userName')}
                            value={formData?.userName}
                            autoCompleteInput="username"
                            error={msgErr}
                        />
                    </Grid>
                    <Grid item xs={12} paddingTop={2}>
                        <TextFieldComponent
                            id="firstName"
                            label={t('firstName')}
                            name="firstName"
                            placeholder={t('firstName')}
                            handleChange={handleChange('firstName')}
                            value={formData?.firstName}
                            error={msgErr}
                        />
                    </Grid>
                    <Grid item xs={12} paddingTop={2}>
                        <TextFieldComponent
                            id="lastName"
                            label={t('lastName')}
                            name="lastName"
                            placeholder={t('lastName')}
                            handleChange={handleChange('lastName')}
                            value={formData?.lastName}
                            error={msgErr}
                        />
                    </Grid>
                </Grid>
            );
        }
        case 3: {
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography className={classes.textBold}>{`Hey ${formData?.firstName}`}</Typography>
                            </Grid>
                            <Grid item xs={12} marginTop="10px">
                                <Typography component="span" className={classes.text}>{` ${t('step3Txt')}`}</Typography>
                            </Grid>
                            <Grid item xs={12} marginTop="10px">
                                <Typography className={classes.text}>{t('step3Txt1')}</Typography>
                            </Grid>
                            <Grid item xs={12} marginTop="20px">
                                <Typography className={classes.textBigBold}>{t('step3Complement')}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
        case 4: {
            return (
                <Grid container sx={{ minHeight: '100px' }} spacing={2}>
                    <Grid item xs={12} margin="auto" marginBottom="20px" textAlign="center">
                        <Typography className={globalClasses.title}>{t('question1').toLocaleUpperCase()}</Typography>
                    </Grid>
                    <Grid item xs={6} margin="auto" minHeight="45px" textAlign="center">
                        <StyledBtnComponent
                            title={t('permanent')}
                            handleOnClick={handleChange('typeSearch', 'permanent')}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={classes.btlBlue}
                        />
                    </Grid>
                    <Grid item xs={6} margin="auto" minHeight="45px" textAlign="center">
                        <StyledBtnComponent
                            title={t('contractual')}
                            handleOnClick={handleChange('typeSearch', 'contractual')}
                            loading={loading}
                            startIcon={!loading ? <Check /> : null}
                            classesName={classes.btnRed}
                        />
                    </Grid>
                </Grid>
            );
        }
        default: {
            return <div />;
        }
    }
};

export default RegisterSteps;
