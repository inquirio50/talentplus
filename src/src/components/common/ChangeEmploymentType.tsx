import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import StyledBtnComponent from './StyledBtnComponent';
import { RootState } from '../../store/store';
import globalStyles from '../../config/globalCss';
import { PERMANENT_ROLE } from '../../config/constants';

const useStyles: any = makeStyles((theme: Theme) => ({
    titleForm: {
        color: theme.palette.baseColorTxt,
        fontWeight: 700,
    },
    gridValue: {
        fontSize: 12,
        color: theme.palette.baseColorTxt,

        paddingBottom: 10,
    },
    gridTitle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '17px',
        /* identical to box height */

        color: '#000000',
    },
}));

const ChangeEmploymentType = ({ user }: { user?: any }) => {
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
            <Grid container>
                <Grid item xs={12}>
                    <Typography className={classes.gridValue}>
                        {`${t(
                            user.role === PERMANENT_ROLE ? 'changeEmploymentPermanent' : 'changeEmploymentContractual'
                        )}`}
                        :
                    </Typography>
                </Grid>

                <Grid item xs={12} className={globalClasses.gridBtnRegister}>
                    <StyledBtnComponent
                        title={t('Change')}
                        handleOnClick={handleSave}
                        loading={isSaving && loading}
                        btWidth="134px"
                        btHeight="50px"
                        classesName={globalClasses.btnContained}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

ChangeEmploymentType.defaultProps = {
    user: null,
};

export default ChangeEmploymentType;
