/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
    Theme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { makeStyles, styled } from '@mui/styles';
import StyledBtnComponent from './StyledBtnComponent';
import globalStyles from '../../config/globalCss';

const styles: any = makeStyles((theme: Theme) => ({
    container: {
        padding: '30px 50px 16px 50px',
        [theme.breakpoints.down('md')]: {
            padding: '2rem',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '1rem',
        },
    },
}));

const BootstrapDialog = styled(Dialog)(() => ({
    '& .MuiDialog-paper': {
        boxShadow: '0px 4px 10px 10px rgba(0, 0, 0, 0.05)',
        borderRadius: 20,
    },
}));

export interface BootstrapDialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: BootstrapDialogTitleProps) => {
    const { children, onClose, ...other } = props;
    const css = styles();
    return (
        <DialogTitle
            className={css.container}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    className="page-title"
                    sx={{
                        color: (theme) => theme.palette.common.black,
                    }}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.defaultProps = {
    children: null,
};

const DialogMsg = ({
    open,
    title,
    children,
    handleClose,
    callBackFn,
    isAction,
    ActionComponent,
}: {
    open: boolean;
    title: string;
    children: JSX.Element;
    handleClose: any;
    callBackFn?: any;
    isAction: boolean;
    ActionComponent?: JSX.Element;
}) => {
    const { t } = useTranslation();
    const classes = globalStyles();
    const css = styles();
    const handleOkCallBack = () => {
        if (callBackFn) {
            callBackFn();
        }
    };

    return (
        <BootstrapDialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <BootstrapDialogTitle id="alert-dialog-title" onClose={handleClose}>
                <Typography gutterBottom variant="h6" component="div" className={classes.titleDialog}>
                    {t(title)}
                </Typography>
            </BootstrapDialogTitle>
            <Divider sx={{ color: '#EFE7EC', marginLeft: '50px', marginRight: '50px' }} />
            <DialogContent dividers={false} className={css.container}>
                {children}
            </DialogContent>
            {isAction && (
                <>
                    <Divider
                        sx={{
                            color: '#EFE7EC',
                            mx: {
                                lg: '50px',
                                md: '2rem',
                                xs: '1rem',
                            },
                            marginTop: '40px',
                            marginBottom: '24px',
                        }}
                    />
                    <DialogActions
                        sx={{
                            mx: {
                                lg: '50px',
                                md: '2rem',
                                xs: '1rem',
                            },
                            my: {
                                lg: '30px',
                                md: '2rem',
                                xs: '1rem',
                            },
                        }}>
                        {ActionComponent}
                        {!ActionComponent && (
                            <StyledBtnComponent
                                title={t('Ok')}
                                gridWidth={145}
                                handleOnClick={handleOkCallBack || handleClose}
                                btWidth="120px"
                            />
                        )}
                    </DialogActions>
                </>
            )}
        </BootstrapDialog>
    );
};

DialogMsg.defaultProps = {
    ActionComponent: null,
    callBackFn: null,
};

export default DialogMsg;
