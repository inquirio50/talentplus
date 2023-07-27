import React from 'react';
import { FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import clsx from 'clsx';

const RadioGroupComponent = ({
    defaultValue,
    currValue,
    id,
    handleChange,
    classes,
    css,
    t,
}: {
    defaultValue: any;
    currValue: boolean;
    id: string;
    handleChange: any;
    classes: any;
    css: any;
    t: any;
}) => (
    <RadioGroup
        aria-labelledby="role"
        defaultValue={defaultValue}
        value={currValue}
        name="radio-buttons-group"
        onChange={handleChange(id)}>
        <Grid container>
            <Grid item xs={4}>
                <FormControlLabel
                    className={classes.radioBoxLabel}
                    value
                    control={<Radio className={classes.radioBox} />}
                    label={
                        <Typography
                            className={clsx(
                                classes.radioBoxLabel,
                                currValue === true ? css.activeAnswer : css.normalAnswer
                            )}>
                            {t('yes')}
                        </Typography>
                    }
                />
            </Grid>
            <Grid item xs={8} justifyContent="flex-start">
                <FormControlLabel
                    className={classes.radioBoxLabel}
                    value={false}
                    control={<Radio className={classes.radioBox} />}
                    label={
                        <Typography
                            className={clsx(
                                classes.radioBoxLabel,
                                currValue === false ? css.activeAnswer : css.normalAnswer
                            )}>
                            {t('no')}
                        </Typography>
                    }
                />
            </Grid>
        </Grid>
    </RadioGroup>
);

export default RadioGroupComponent;
