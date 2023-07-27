import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { IconButton, Snackbar, SnackbarContent } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import { useDispatch, useSelector } from 'react-redux';
import { refreshApp } from '../../store/reducers/genericActions';
import { RootState } from '../../store/store';

const useStyles: any = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: '#43A047',
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: '#FFA000',
    },
    icon: {
        fontSize: '1.25rem',
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const AppRefreshSnackBar = () => {
    const { t } = useTranslation();
    const classes: any = useStyles();
    const dispatch = useDispatch();
    const { serviceWorkerUpdate } = useSelector((state: RootState) => ({
        serviceWorkerUpdate: state.generic.serviceWorkerUpdate,
    }));
    const handleClick = () => {
        dispatch(refreshApp(false));
        window.location.reload();
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={serviceWorkerUpdate}>
                <SnackbarContent
                    className={classes.info}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="sw-snackbar" className={classes.message}>
                            {t('updateToNewAppVersion')}
                        </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={handleClick}>
                            <UpdateIcon className={classes.icon} />
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        </div>
    );
};

export default AppRefreshSnackBar;
