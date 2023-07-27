import { Grid, LinearProgress, Typography } from '@mui/material';
import React from 'react';

/**
 *
 * @param css css in the pattern { titlePercentage: { holds the css for the title}, gridBarSpace: { holds the space between the bar}, greenLinearProgress: { holds the color of the bar},
 *  percentagemString: { holds the css for percentagem on right side}  }
 * @param title title going on left side
 * @param percentage the number of the percentage
 * @param percentageString the string of the percentagem to go on right side. If null, it will take percentage as string
 * @returns JSX
 */
const PercentageBarBox = ({
    css,
    title,
    percentage,
    percentageString,
    sizeBar,
}: {
    css: any;
    title: string;
    percentage: number;
    sizeBar?: number;
    percentageString?: string;
}) => (
    <Grid container alignItems="center">
        <Grid item xs={10 - (sizeBar || 8)}>
            <Typography className={css.titlePercentage}>{title}</Typography>
        </Grid>
        <Grid item xs={sizeBar} className={css.gridBarSpace}>
            <LinearProgress variant="determinate" value={percentage} className={css.greenLinearProgress} />
        </Grid>
        <Grid item xs={2} textAlign="center">
            <Typography className={css.percentagemString}>{percentageString || percentage}</Typography>
        </Grid>
    </Grid>
);

PercentageBarBox.defaultProps = {
    percentageString: null,
    sizeBar: 8,
};

export default PercentageBarBox;
