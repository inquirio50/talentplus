import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FormControl, Grid, Input, MenuItem, Select, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import i18next from '../../config/i18next';
import { fetchProfilParameters } from '../../store/reducers/genericActions';
import Globe from '../../assets/images/header/globe.png';

// get the languages
export const Languages = [
    {
        name: 'EN',
        tag: 'en',
    },
    {
        name: 'FR',
        tag: 'fr',
    },
];

const styles: any = makeStyles((theme: Theme) => ({
    formControl: {
        margin: theme.spacing(1),
    },
    input: {
        color: theme.palette.baseColorTxt,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        padding: '0.45rem 0.9rem',
        borderRadius: 4,
        border: 0,
        '&:focus': {
            borderColor: theme.palette.baseColor,
        },
        '&:hover': {
            borderColor: theme.palette.baseColor,
        },
    },
    globeIcon: {
        height: 20,
        position: 'absolute',
        display: 'inline-block',
        right: '60px',
        top: -12,
    },
    selectedTxt: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '19px',
        textTransform: 'uppercase',
        color: theme.palette.common.black,
    },
}));

const GlobeIcon: React.FunctionComponent = () => {
    const css = styles();
    return (
        <div style={{ position: 'relative' }}>
            <img src={Globe} alt="globe" className={css.globeIcon} />
        </div>
    );
};

const LanguageTopApp = () => {
    const classes = styles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const getCurrentLanguage = () => {
        const initLang = Languages.find((l) => l.tag === i18next.language);
        return initLang || Languages[0];
    };
    const [currLang, setCurrLang] = useState(getCurrentLanguage());

    const handleChange = (event: any) => {
        const newLang = event.target.value;

        if (newLang) {
            i18next.changeLanguage(newLang);
            const languageSelected: any = Languages.find((l) => l.tag === newLang);
            setCurrLang(languageSelected);
        }
        dispatch(fetchProfilParameters());
    };

    useEffect(() => {
        if (i18next.language === 'fr-CA') {
            const languageSelected: any = Languages.find((l) => l.tag === 'fr');
            setCurrLang(languageSelected);
        }
    }, [i18next]);

    return (
        <FormControl className={classes.formControl}>
            <Select
                MenuProps={{
                    sx: {
                        '& .MuiMenu-paper': {
                            border: '1px solid rgba(189, 189, 189, 0.5)',
                            borderRadius: '4px',
                        },
                        '& .MuiMenuItem-root:hover': {
                            backgroundColor: 'dark.secondary',
                            color: 'text.white',
                        },
                        '& .Mui-selected': {
                            backgroundColor: '#eb078c4a !important',
                        },
                    },
                }}
                label={currLang.name}
                disableUnderline
                id="select-language"
                color="secondary"
                value={currLang.tag}
                onChange={handleChange}
                IconComponent={GlobeIcon}
                sx={{ width: 'unset' }}
                input={<Input id="select-languagebtn" color="secondary" fullWidth classes={{ input: classes.input }} />}
                renderValue={(selected) => (
                    <Grid item className={classes.selectedTxt}>
                        {selected}
                    </Grid>
                )}>
                {Languages.map((lang: any) => (
                    <MenuItem value={lang.tag} key={lang.tag}>
                        {t(lang.name)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default LanguageTopApp;
