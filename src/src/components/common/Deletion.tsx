import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import StyledBtnComponent from './StyledBtnComponent';
import { RootState } from '../../store/store';
import globalStyles from '../../config/globalCss';

const useStyles: any = makeStyles(() => ({
    gridValue: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: '18px',

        color: 'rgba(0, 0, 0, 0.8)',
    },
    gridTitle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '17px',

        color: '#000000',
    },
}));

const Deletion = ({ user }: { user?: any }) => {
    const { t } = useTranslation();
    const globalClasses = globalStyles();
    const classes = useStyles();
    const [isSaving, setIsSaving] = useState(false);
    const { loading }: { loading: boolean } = useSelector((state: RootState) => ({
        loading: state.generic.loading,
    }));

    useEffect(() => {
        if (user) {
            // fetch Profile from user
        }
    }, []);

    const handleSave = () => {
        setIsSaving(true);
    };

    return (
        <Grid item xs={12}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography className={classes.gridValue}>{t('deletionDescription')}:</Typography>
                </Grid>

                <Grid item xs={12} className={globalClasses.gridBtnLogin}>
                    <StyledBtnComponent
                        title={t('Delete')}
                        handleOnClick={handleSave}
                        loading={isSaving && loading}
                        btWidth="134px"
                        btHeight="50px"
                        classesName={globalClasses.btnOutlined}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

Deletion.defaultProps = {
    user: null,
};

export default Deletion;
