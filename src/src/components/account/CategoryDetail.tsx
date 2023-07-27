import React, { useState } from 'react';
import { Card, CardContent, Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Category from '../../models/category';
import TextFieldComponent from '../common/TextFieldComponent';
import StyledBtnComponent from '../common/StyledBtnComponent';
import { editCategory } from '../../store/reducers/admin/adminActions';

interface CategoryDetailProps {
    category: Category | null;
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

const CategoryDetail = ({ category }: CategoryDetailProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const classes = useStyles();
    const [currentCategory, setCurrentCategory] = useState<Category | null>(category);
    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());

    const handleChange = (type: string) => (event: any) => {
        event.stopPropagation();

        const { value } = event.target;
        const isValid = value !== '' && !Number.isNaN(Number(value));
        switch (type) {
            case 'number': {
                setCurrentCategory({ ...currentCategory, number: value });
                if (!isValid) {
                    msgErr.set('number', t('numberValidation'));
                } else {
                    msgErr.delete('number');
                }
                break;
            }
            case 'value': {
                setCurrentCategory({ ...currentCategory, value });
                if (!isValid) {
                    msgErr.set('value', t('numberValidation'));
                } else {
                    msgErr.delete('value');
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
        dispatch(editCategory(currentCategory));
    };

    const isAbled = () =>
        (msgErr === null || msgErr.size === 0) && Number(category?.value) !== Number(currentCategory?.value);

    return (
        <Card>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={6} className={classes.gridValue}>
                        <TextFieldComponent
                            disabled
                            id="number"
                            label={t('number')}
                            name="number"
                            placeholder={t('enterNumber')}
                            handleChange={handleChange('number')}
                            value={currentCategory?.number?.toString()}
                            autoCompleteInput="number"
                            error={msgErr || null}
                        />
                    </Grid>

                    <Grid item xs={6} className={classes.gridValue}>
                        <TextFieldComponent
                            id="value"
                            label="value"
                            name="value"
                            placeholder={t('enterValue')}
                            handleChange={handleChange('value')}
                            value={currentCategory?.value?.toString()}
                            autoCompleteInput="value"
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

export default CategoryDetail;
