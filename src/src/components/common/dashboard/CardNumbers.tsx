import React from 'react';
import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import globalStyles from '../../../config/globalCss';

const styles: any = makeStyles((theme: Theme) => ({
    box: {
        maxWidth: 234.5,
        width: 234.5,
        background: theme.palette.common.white,
        boxShadow: '-5px -5px 8px rgba(0, 0, 0, 0.04), 4px 5px 8px rgba(0, 0, 0, 0.08)',
        borderRadius: '20px',
        [theme.breakpoints.down('lg')]: {
            width: '100%',
            maxWidth: 'unset',
        },
    },
    boxCount: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    btnBoxCount: {
        height: '140px',
    },
    matchCount: {
        color: '#B00569',
    },
}));

const CardNumbers = ({ value, description }: { value: number; description: string }) => {
    const classes = globalStyles();
    const css = styles();
    return (
        <Card className={clsx(css.box, css.boxCount)}>
            <CardActionArea onClick={() => {}} className={css.btnBoxCount}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className={clsx(classes.titleDashboard, css.matchCount)}>{value}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.dashboardDesc}>{description}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardNumbers;
