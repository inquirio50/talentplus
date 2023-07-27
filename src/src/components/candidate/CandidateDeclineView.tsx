/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Checkbox, Grid, Typography } from '@mui/material';
import globalStyles from '../../config/globalCss';
import UserMatch from '../../models/userMatch';
import TextFieldComponent from '../common/TextFieldComponent';

const styles: any = makeStyles((theme: Theme) => ({
    title: {
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 20,
        lineHeight: '24px',
        color: theme.palette.common.black,
    },
    gridSpace: {
        paddingTop: '27px',
    },
}));

const CandidateDeclineView = ({ currentMatch }: { currentMatch: UserMatch | undefined }) => {
    const css = styles();
    const classes = globalStyles();
    const { t } = useTranslation();
    const [reasons, setReasons] = useState<number[]>([]);
    const [otherDecline, setOtherDecline] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        const newReasons = reasons;
        if (event.target.checked) {
            if (!reasons.includes(value)) {
                newReasons.push(value);
                setReasons(newReasons);
            }
        } else {
            const newReasonsFiltered = newReasons.filter((r) => r !== value);
            setReasons(newReasonsFiltered);
        }
    };

    const checkIfMarcked = (currValue: number) => reasons.includes(currValue);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography className={css.title}>{t('reasonForDeclining')}</Typography>
            </Grid>
            <Grid item xs={12} className={css.gridSpace}>
                <Grid container>
                    <Grid item xs={12} display="flex" alignItems="center">
                        <Checkbox inputProps={{ 'aria-label': 'controlled' }} onChange={handleChange} value={1} />
                        <Typography sx={{ ml: 1 }} className={classes.subTitleDashboard}>
                            {t('lowSalary')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} display="flex" alignItems="center">
                        <Checkbox inputProps={{ 'aria-label': 'controlled' }} onChange={handleChange} value={2} />
                        <Typography sx={{ ml: 1 }} className={classes.subTitleDashboard}>
                            {t('industryType')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} display="flex" alignItems="center">
                        <Checkbox inputProps={{ 'aria-label': 'controlled' }} onChange={handleChange} value={3} />
                        <Typography sx={{ ml: 1 }} className={classes.subTitleDashboard}>
                            {t('workCulture')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} display="flex" alignItems="center">
                        <Checkbox inputProps={{ 'aria-label': 'controlled' }} onChange={handleChange} value={4} />
                        <Typography sx={{ ml: 1 }} className={classes.subTitleDashboard}>
                            {t('organizationalStructure')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} display="flex" alignItems="center">
                        <Checkbox inputProps={{ 'aria-label': 'controlled' }} onChange={handleChange} value={5} />
                        <Typography sx={{ ml: 1 }} className={classes.subTitleDashboard}>
                            {t('workSizeEnvironment')}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} display="flex" alignItems="center">
                        <Checkbox inputProps={{ 'aria-label': 'controlled' }} onChange={handleChange} value={6} />
                        <Typography sx={{ ml: 1 }} className={classes.subTitleDashboard}>
                            {t('workMode')}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} display="flex" alignItems="center">
                        <Checkbox inputProps={{ 'aria-label': 'controlled' }} onChange={handleChange} value={7} />
                        <Typography sx={{ ml: 1 }} className={classes.subTitleDashboard}>
                            {t('distance')}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} display="flex" alignItems="center">
                        <Checkbox inputProps={{ 'aria-label': 'controlled' }} onChange={handleChange} value={8} />
                        <Typography sx={{ ml: 1 }} className={classes.subTitleDashboard}>
                            {t('benefits')}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} display="flex" alignItems="center">
                        <Checkbox inputProps={{ 'aria-label': 'controlled' }} onChange={handleChange} value={9} />
                        <Typography sx={{ ml: 1 }} className={classes.subTitleDashboard}>
                            {t('others')}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextFieldComponent
                            id="otherDecline"
                            name="otherDecline"
                            placeholder={t('pleaseSpecify')}
                            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtherDecline(e.target.value)}
                            value={otherDecline}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CandidateDeclineView;
