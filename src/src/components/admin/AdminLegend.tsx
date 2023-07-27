import { Box, Container, Tabs, Tab, Grid, LinearProgress, Fade } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { RootState } from '../../store/store';
import Legend from '../../models/legend';
import globalStyles from '../../config/globalCss';
import { listLegends } from '../../store/reducers/admin/adminActions';
import TabPanel from '../common/TabPanel';
import StyledBtnComponent from '../common/StyledBtnComponent';
import LegendDetail from '../account/LegendDetail';
import DialogMsg from '../common/DialogMsg';

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

const LegendDetailWrapper = ({ btnAction, currentLegend }: { btnAction: any; currentLegend: any }) => (
    <Fade in={btnAction !== 0}>
        <Box>
            <LegendDetail legend={currentLegend || null} />
        </Box>
    </Fade>
);

interface TabWrapperProps {
    columns: GridColDef[];
    pageSize: number;
    onPageChange: any;
    onPageSizeChange: any;
    totalRows: number;
    legends: Legend[];
    loading: boolean;
}

const TabPanelWrapper = ({
    columns,
    pageSize,
    onPageChange,
    onPageSizeChange,
    totalRows,
    legends,
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
        rows={legends}
        components={{
            LoadingOverlay: LinearProgress,
        }}
        loading={loading}
    />
);

const AdminLegend = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = globalStyles();
    const [currentTab] = useState(0);
    const [currentLegend, setCurrentLegend] = useState<Legend | null>();
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(0);
    const [btnAction, setBtnAction] = useState(0);

    const { legends, loading }: { legends: Legend[]; loading: boolean } = useSelector((state: RootState) => ({
        legends: state.admin.legends,
        loading: state.admin.loading,
    }));

    const totalRows = legends.length;

    const handleChangeTab = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const handleEdit = (rowId: string) => (event: React.SyntheticEvent) => {
        event.stopPropagation();
        const legend: Legend = legends.filter((u) => u.id === rowId)[0];
        if (legend) {
            setCurrentLegend(legend);
            setBtnAction(1);
        }
    };

    const onPageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: t('id'), width: 100, hide: true },
        { field: 'libelle', headerName: t('Libelle'), width: 150, headerAlign: 'center' },
        { field: 'priorization', headerName: t('priorization'), width: 100, headerAlign: 'center' },
        { field: 'minIdeal', headerName: t('minIdeal'), width: 100, headerAlign: 'center' },
        { field: 'maxIdeal', headerName: t('maxIdeal'), width: 100, headerAlign: 'center' },

        { field: 'miIdeal', headerName: t('miIdeal'), width: 100, headerAlign: 'center' },
        { field: 'poidsMaxIdeal', headerName: t('poidsMaxIdeal'), width: 100, headerAlign: 'center' },
        { field: 'minValue', headerName: t('minValue'), width: 100, headerAlign: 'center' },

        { field: 'category', headerName: t('category'), width: 400, headerAlign: 'center' },
        {
            field: 'actions',
            headerName: t('actions'),
            width: 88,
            headerAlign: 'center',
            renderCell: (params) => <ActionBtnsRender handleEdit={handleEdit} id={params.id} t={t} isAdmin={false} />,
        },
    ];

    useEffect(() => {
        dispatch(listLegends());
    }, [dispatch, page, currentTab]);

    useEffect(() => {
        if (btnAction !== 0) setBtnAction(0);
    }, [loading]);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
                paddingTop: '0px !important',
                width: '1340px',
            }}>
            <Container maxWidth="xl">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Tabs
                                    className={classes.tabs}
                                    centered
                                    value={currentTab}
                                    onChange={handleChangeTab}
                                    aria-label="profile options"
                                    variant="fullWidth">
                                    <Tab
                                        label={t('Legend').toUpperCase()}
                                        id="tab-0"
                                        aria-controls="tabpanel-0"
                                        className={classes.tab}
                                    />
                                </Tabs>
                            </Grid>
                        </Grid>
                    </Box>
                    <TabPanel value={currentTab} index={0}>
                        <TabPanelWrapper
                            columns={columns}
                            pageSize={pageSize}
                            onPageChange={onPageChange}
                            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                            totalRows={totalRows}
                            loading={loading}
                            legends={legends}
                        />
                    </TabPanel>
                </Box>
            </Container>
            <DialogMsg
                title={currentLegend && currentLegend.libelle ? currentLegend.libelle.toString() : ''}
                open={btnAction !== 0}
                isAction={false}
                handleClose={() => setBtnAction(0)}>
                <LegendDetailWrapper btnAction={btnAction} currentLegend={currentLegend} />
            </DialogMsg>
        </Box>
    );
};

export default AdminLegend;
