/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import clsx from 'clsx';
import {
    digitsRegExp,
    lowercaseRegExp,
    minLengthRegExp,
    specialCharRegExp,
    uppercaseRegExp,
} from '../helpers/utilityFunctions';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex',
    },
    passwordCheck: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: 14,
        lineHeight: '15px',
        display: 'contents',
    },
    grayColor: {
        color: '#D0D3D9',
    },
    greenFontColor: {
        color: '#15C077',
    },
    passwordTitle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 14,
        lineHeight: '17px',
        color: theme.palette.common.black,
    },
    padding8: {
        paddingTop: '8px',
    },
}));

const PasswordCheck = ({
    current,
    password,
    confirmPassword,
}: {
    current?: string;
    password: string;
    confirmPassword: string;
}) => {
    const css = styles();
    const { t } = useTranslation();

    const isUpperLowerCase =
        uppercaseRegExp.test(password) && lowercaseRegExp.test(password) && specialCharRegExp.test(password);

    const digitsPassword = digitsRegExp.test(password);
    const minLengthPassword = minLengthRegExp.test(password);
    const isMatched = password === confirmPassword && password !== '';

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography className={css.passwordTitle}>{t('passwordMust')}</Typography>
            </Grid>
            <Grid item xs={1} className={css.padding8}>
                {digitsPassword && <CheckIcon fontSize="small" className={css.greenFontColor} />}
                {!digitsPassword && <RemoveCircleOutlineIcon fontSize="small" className={css.grayColor} />}
            </Grid>
            <Grid item xs={11} className={css.padding8}>
                <Typography className={clsx(css.passwordCheck, digitsPassword ? css.greenFontColor : css.grayColor)}>
                    {t('passwordDigit')}
                </Typography>
            </Grid>
            <Grid item xs={1} className={css.padding8}>
                {isUpperLowerCase && <CheckIcon fontSize="small" className={css.greenFontColor} />}
                {!isUpperLowerCase && <RemoveCircleOutlineIcon fontSize="small" className={css.grayColor} />}
            </Grid>
            <Grid item xs={11} className={css.padding8}>
                <Typography className={clsx(css.passwordCheck, isUpperLowerCase ? css.greenFontColor : css.grayColor)}>
                    {t('passwordTestUpperLower')}
                </Typography>
            </Grid>
            <Grid item xs={1} className={css.padding8}>
                {minLengthPassword && <CheckIcon fontSize="small" className={css.greenFontColor} />}
                {!minLengthPassword && <RemoveCircleOutlineIcon fontSize="small" className={css.grayColor} />}
            </Grid>
            <Grid item xs={11} className={css.padding8}>
                <Typography className={clsx(css.passwordCheck, minLengthPassword ? css.greenFontColor : css.grayColor)}>
                    {t('contain8Caracters')}
                </Typography>
            </Grid>
            <Grid item xs={1} className={css.padding8}>
                {isMatched && <CheckIcon fontSize="small" className={css.greenFontColor} />}
                {!isMatched && <RemoveCircleOutlineIcon fontSize="small" className={css.grayColor} />}
            </Grid>
            <Grid item xs={11} className={css.padding8}>
                <Typography className={clsx(css.passwordCheck, isMatched ? css.greenFontColor : css.grayColor)}>
                    {t('passwordMatch')}
                </Typography>
            </Grid>
        </Grid>
    );
};

PasswordCheck.defaultProps = {
    current: null,
};

export default PasswordCheck;
