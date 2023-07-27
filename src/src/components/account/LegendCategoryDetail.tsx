import React, { useState } from 'react';
import { Card, CardContent, Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import legendCategory from '../../models/legendCategory';
import TextFieldComponent from '../common/TextFieldComponent';
import StyledBtnComponent from '../common/StyledBtnComponent';
import { editLegendCategory } from '../../store/reducers/admin/adminActions';

interface LegendCategoryDetailProps {
    legendCategories: legendCategory | null;
}

const useStyles: any = makeStyles((theme: Theme) => ({
    titleForm: {
        color: theme.palette.baseColorTxt,
        fontWeight: 700,
    },
    gridValue: {
        fontSize: 12,
        color: theme.palette.baseColorTxt,
        paddingLeft: 10,
    },
}));

const LegendCategoryDetail = ({ legendCategories }: LegendCategoryDetailProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const classes = useStyles();
    const [currentCategory, setCurrentCategory] = useState<legendCategory | null>(legendCategories);
    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());

    const handleChange = (type: string) => (event: any) => {
        event.stopPropagation();

        const { value } = event.target;
        const isValid = value !== '' && !Number.isNaN(Number(value));
        switch (type) {
            case 'nombre': {
                setCurrentCategory({ ...currentCategory, nombre: value });
                if (!isValid) {
                    msgErr.set('nombre', t('numberValidation'));
                } else {
                    msgErr.delete('nombre');
                }
                break;
            }
            default: {
                break;
            }
        }
        setMsgErr(msgErr);
    };

    const handleOnClick = () => {
        dispatch(editLegendCategory(currentCategory));
    };

    const isAbled = () =>
        (msgErr === null || msgErr.size === 0) && Number(legendCategories?.nombre) !== Number(currentCategory?.nombre);

    return (
        <Card>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={6} className={classes.gridValue}>
                        <TextFieldComponent
                            id="nombre"
                            label={t('nombre')}
                            name="nombre"
                            placeholder={t('enterNombre')}
                            handleChange={handleChange('nombre')}
                            value={currentCategory?.nombre?.toString()}
                            autoCompleteInput="nombre"
                            error={msgErr || null}
                        />
                    </Grid>
                    <Box sx={{ width: '100%' }}>
                        <Grid container>
                            <Grid item xs={12} textAlign="right" sx={{ marginRight: '22px' }}>
                                <StyledBtnComponent
                                    disabled={!isAbled()}
                                    title={t('save')}
                                    handleOnClick={handleOnClick}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default LegendCategoryDetail;
