import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Box, LinearProgress, Fade } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Legend from '../../models/legend';
import { RootState } from '../../store/store';
import LegendCategoryDetail from '../account/LegendCategoryDetail';
import TextFieldComponent from '../common/TextFieldComponent';
import StyledBtnComponent from '../common/StyledBtnComponent';
import { editLegend } from '../../store/reducers/admin/adminActions';
import DialogMsg from '../common/DialogMsg';
import LegendCategory from '../../models/legendCategory';

const ActionBtnsRender = ({ handleEdit, id, t, isAdmin }: { handleEdit: any; id: any; t: any; isAdmin: boolean }) => {
    const cssCell = {
        minWidth: 300,
        marginRight: 16,
        overflow: 'auto',
        height: 'auto',
    };
    return (
        <Grid container className="MuiDataGrid-cell" style={cssCell}>
            <Grid item xs={isAdmin ? 2 : 4} paddingRight={2}>
                <StyledBtnComponent title={t('Edit')} gridWidth={50} handleOnClick={handleEdit(id)} />
            </Grid>
        </Grid>
    );
};

const LegendCategoryDetailWrapper = ({
    btnAction,
    currentLegendCategoty,
}: {
    btnAction: any;
    currentLegendCategoty: any;
}) => (
    <Fade in={btnAction !== 0}>
        <Box>
            <LegendCategoryDetail legendCategories={currentLegendCategoty || null} />
        </Box>
    </Fade>
);

interface LegendDetailProps {
    legend: Legend | null;
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

interface TabWrapperProps {
    columns: GridColDef[];
    pageSize: number;
    onPageChange: any;
    onPageSizeChange: any;
    totalRows: number;
    categories: Legend[];
    loading: boolean;
}

const TabPanelWrapper = ({
    columns,
    pageSize,
    onPageChange,
    onPageSizeChange,
    totalRows,
    categories,
    loading,
}: TabWrapperProps) => (
    <DataGrid
        style={{ height: 700 }}
        columns={columns}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        rowsPerPageOptions={[10, 20, 25]}
        pagination
        autoPageSize
        rowCount={totalRows}
        rows={categories}
        components={{
            LoadingOverlay: LinearProgress,
        }}
        loading={loading}
    />
);

const LegendDetail = ({ legend }: LegendDetailProps) => {
    const { loading }: { loading: boolean } = useSelector((state: RootState) => ({
        loading: state.admin.loading,
    }));
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const classes = useStyles();
    const [currentLegend, setCurrentLegend] = useState<Legend | null>(legend);
    const [currentLegendCategoty, setCurrentLegendCategory] = useState<LegendCategory | null>();
    const [msgErr, setMsgErr] = useState<Map<string, string>>(new Map());
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(0);
    const [btnAction, setBtnAction] = useState(0);

    const handleChange = (type: string) => (event: any) => {
        event.stopPropagation();

        const { value } = event.target;
        const isValid = value !== '' && !Number.isNaN(Number(value));

        switch (type) {
            case 'priorization': {
                setCurrentLegend({ ...currentLegend, priorization: value });
                if (!isValid) {
                    msgErr.set('priorization', t('numberValidation'));
                } else {
                    msgErr.delete('priorization');
                }
                break;
            }
            case 'minIdeal': {
                setCurrentLegend({ ...currentLegend, minIdeal: value });
                if (!isValid) {
                    msgErr.set('minIdeal', t('numberValidation'));
                } else {
                    msgErr.delete('minIdeal');
                }
                break;
            }
            case 'maxIdeal': {
                setCurrentLegend({ ...currentLegend, maxIdeal: value });
                if (!isValid) {
                    msgErr.set('maxIdeal', t('numberValidation'));
                } else {
                    msgErr.delete('maxIdeal');
                }

                break;
            }

            case 'miIdeal': {
                setCurrentLegend({ ...currentLegend, miIdeal: value });
                if (!isValid) {
                    msgErr.set('miIdeal', t('numberValidation'));
                } else {
                    msgErr.delete('miIdeal');
                }
                break;
            }
            case 'poidsMaxIdeal': {
                setCurrentLegend({ ...currentLegend, poidsMaxIdeal: value });
                if (!isValid) {
                    msgErr.set('poidsMaxIdeal', t('numberValidation'));
                } else {
                    msgErr.delete('poidsMaxIdeal');
                }

                break;
            }
            case 'minValue': {
                setCurrentLegend({ ...currentLegend, minValue: value });
                if (!isValid) {
                    msgErr.set('minValue', t('numberValidation'));
                } else {
                    msgErr.delete('minValue');
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
        dispatch(editLegend(currentLegend));
    };

    const handleEdit = (rowId: string) => (event: React.SyntheticEvent) => {
        event.stopPropagation();

        const legendCategory: LegendCategory | undefined = legend?.categories?.filter((u) => u.id === rowId)[0];
        if (legendCategory) {
            setCurrentLegendCategory(legendCategory);
            setBtnAction(1);
        }
    };
    const onPageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    useEffect(() => {
        /* dispatch(listLegends()); */
    }, [dispatch, page]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: t('id'), width: 100, hide: true },
        { field: 'libelle', headerName: t('Libelle'), width: 250, headerAlign: 'center' },
        { field: 'nombre', headerName: t('Minimum'), width: 100, headerAlign: 'center' },
        {
            field: 'actions',
            headerName: t('actions'),
            width: 88,
            headerAlign: 'center',
            renderCell: (params) => <ActionBtnsRender handleEdit={handleEdit} id={params.id} t={t} isAdmin={false} />,
        },
    ];

    const totalRows = legend && legend.categories ? legend.categories.length : 0;

    const isAbled = () =>
        (msgErr === null || msgErr.size === 0) &&
        (Number(legend?.minIdeal) !== Number(currentLegend?.minIdeal) ||
            Number(legend?.priorization) !== Number(currentLegend?.priorization) ||
            Number(legend?.maxIdeal) !== Number(currentLegend?.maxIdeal) ||
            Number(legend?.minValue) !== Number(currentLegend?.minValue) ||
            Number(legend?.poidsMaxIdeal) !== Number(currentLegend?.poidsMaxIdeal) ||
            Number(legend?.miIdeal) !== Number(currentLegend?.miIdeal));

    return (
        <Card>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={6} className={classes.gridValue}>
                        <TextFieldComponent
                            id="priorization"
                            label={t('priorization')}
                            name="priorization"
                            placeholder={t('enterPriorization')}
                            handleChange={handleChange('priorization')}
                            value={currentLegend?.priorization?.toString()}
                            autoCompleteInput="priorization"
                            error={msgErr || null}
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.gridValue}>
                        <TextFieldComponent
                            id="minIdeal"
                            label={t('minIdeal')}
                            name="minIdeal"
                            placeholder={t('enterMinIdeal')}
                            handleChange={handleChange('minIdeal')}
                            value={currentLegend?.minIdeal?.toString()}
                            autoCompleteInput="minIdeal"
                            error={msgErr || null}
                        />
                    </Grid>

                    <Grid item xs={6} className={classes.gridValue}>
                        <TextFieldComponent
                            id="maxIdeal"
                            label={t('maxIdeal')}
                            name="maxIdeal"
                            placeholder={t('enterMaxIdeal')}
                            handleChange={handleChange('maxIdeal')}
                            value={currentLegend?.maxIdeal?.toString()}
                            autoCompleteInput="maxIdeal"
                            error={msgErr || null}
                        />
                    </Grid>

                    <Grid item xs={6} className={classes.gridValue}>
                        <TextFieldComponent
                            id="miIdeal"
                            label={t('miIdeal')}
                            name="miIdeal"
                            placeholder={t('enterMiIdeal')}
                            handleChange={handleChange('miIdeal')}
                            value={currentLegend?.miIdeal?.toString()}
                            autoCompleteInput="miIdeal"
                            error={msgErr || null}
                        />
                    </Grid>

                    <Grid item xs={6} className={classes.gridValue}>
                        <TextFieldComponent
                            id="poidsMaxIdeal"
                            label={t('poidsMaxIdeal')}
                            name="poidsMaxIdeal"
                            placeholder={t('enterPoidsMaxIdeal')}
                            handleChange={handleChange('poidsMaxIdeal')}
                            value={currentLegend?.poidsMaxIdeal?.toString()}
                            autoCompleteInput="poidsMaxIdeal"
                            error={msgErr || null}
                        />
                    </Grid>

                    <Grid item xs={6} className={classes.gridValue}>
                        <TextFieldComponent
                            id="minValue"
                            label={t('minValue')}
                            name="minValue"
                            placeholder={t('enterMinValue')}
                            handleChange={handleChange('minValue')}
                            value={currentLegend?.minValue?.toString()}
                            autoCompleteInput="minValue"
                            error={msgErr || null}
                        />
                    </Grid>

                    <Grid item xs={6} className={classes.gridValue}>
                        <TabPanelWrapper
                            columns={columns}
                            pageSize={pageSize}
                            onPageChange={onPageChange}
                            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                            totalRows={totalRows}
                            loading={loading}
                            categories={legend && legend.categories ? legend.categories : []}
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
            <DialogMsg
                title={
                    currentLegendCategoty && currentLegendCategoty.libelle
                        ? currentLegendCategoty.libelle.toString()
                        : ''
                }
                open={btnAction !== 0}
                isAction={false}
                handleClose={() => setBtnAction(0)}>
                <LegendCategoryDetailWrapper btnAction={btnAction} currentLegendCategoty={currentLegendCategoty} />
            </DialogMsg>
        </Card>
    );
};

export default LegendDetail;
