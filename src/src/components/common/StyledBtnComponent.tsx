import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Badge } from '@mui/icons-material';
import clsx from 'clsx';
import React from 'react';
import globalStyles from '../../config/globalCss';

const useStyles = makeStyles({
    btnWidth: ({ btWidth, btHeight }: { btWidth: string | undefined; btHeight: string | undefined }) => ({
        height: `${btHeight} !important` || '50px !important',
        width: `${btWidth} !important` || '162px !important',
    }),
});

interface StyledBtnComponentProps {
    handleOnClick?: any;
    title: string;
    isSubmit?: boolean;
    loading?: boolean;
    startIcon?: any;
    endIcon?: any;
    classesName?: any;
    disabled?: boolean;
    gridWidth?: number | string;
    red?: boolean;
    btWidth?: string;
    btHeight?: string;
}

const StyledBtnComponent = ({
    handleOnClick,
    title,
    isSubmit,
    loading,
    startIcon,
    endIcon,
    classesName,
    disabled,
    gridWidth,
    red,
    btWidth,
    btHeight,
}: StyledBtnComponentProps) => {
    const css = useStyles({ btWidth, btHeight });
    const classes = globalStyles();

    const classBtn = clsx(css.btnWidth, red ? classes.btnContained : classes.btnOutlined);

    const IconStartLoading = loading && !startIcon ? <Badge /> : startIcon;

    return (
        <Grid container direction="row" justifyContent="flex-end" alignItems="center" width={gridWidth}>
            <Grid item xs={12}>
                <LoadingButton
                    disabled={disabled}
                    loading={loading}
                    type={isSubmit ? 'submit' : 'button'}
                    onClick={handleOnClick}
                    startIcon={IconStartLoading}
                    endIcon={endIcon}
                    className={classesName || classBtn}
                    loadingPosition={startIcon ? 'start' : undefined}
                    disableFocusRipple={false}
                    disableRipple={false}
                    autoFocus={false}
                    focusRipple={false}
                    variant="contained">
                    {title}
                </LoadingButton>
            </Grid>
        </Grid>
    );
};

StyledBtnComponent.defaultProps = {
    handleOnClick: null,
    isSubmit: false,
    startIcon: null,
    endIcon: null,
    loading: false,
    classesName: undefined,
    disabled: false,
    gridWidth: undefined,
    red: true,
    btWidth: null,
    btHeight: null,
};

export default StyledBtnComponent;
