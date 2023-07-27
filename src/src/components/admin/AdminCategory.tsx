import { Box, Container, Tabs, Tab, Grid, LinearProgress, Fade } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { RootState } from '../../store/store';
import Category from '../../models/category';
import globalStyles from '../../config/globalCss';
import { listCategories } from '../../store/reducers/admin/adminActions';
import TabPanel from '../common/TabPanel';
import StyledBtnComponent from '../common/StyledBtnComponent';
import CategoryDetail from '../account/CategoryDetail';
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

const CategoryDetailWrapper = ({ btnAction, currentCategory }: { btnAction: any; currentCategory: any }) => (
    <Fade in={btnAction !== 0}>
        <Box>
            <CategoryDetail category={currentCategory || null} />
        </Box>
    </Fade>
);

interface TabWrapperProps {
    columns: GridColDef[];
    pageSize: number;
    onPageChange: any;
    onPageSizeChange: any;
    totalRows: number;
    categories: Category[];
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

const AdminCategory = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = globalStyles();
    const [currentTab] = useState(0);
    const [currentCategory, setCurrentCategory] = useState<Category | null>();
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(0);
    const [btnAction, setBtnAction] = useState(0);

    const { categories, loading }: { categories: Category[]; loading: boolean } = useSelector((state: RootState) => ({
        categories: state.admin.categories,
        loading: state.admin.loading,
    }));

    const totalRows = categories.length;

    const handleChangeTab = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const handleEdit = (rowId: string) => (event: React.SyntheticEvent) => {
        event.stopPropagation();
        const category: Category = categories.filter((u) => u.id === rowId)[0];
        if (category) {
            setCurrentCategory(category);
            setBtnAction(1);
        }
    };

    const onPageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: t('id'), width: 100, hide: true },
        { field: 'categoryId', headerName: t('categoryId'), width: 100, hide: true },
        { field: 'libelle', headerName: t('Libelle'), width: 150, headerAlign: 'center' },
        { field: 'number', headerName: t('Number'), width: 100, headerAlign: 'center' },
        { field: 'value', headerName: t('Value'), width: 100, headerAlign: 'center' },
        {
            field: 'actions',
            headerName: t('actions'),
            width: 88,
            headerAlign: 'center',
            renderCell: (params) => <ActionBtnsRender handleEdit={handleEdit} id={params.id} t={t} isAdmin={false} />,
        },
    ];

    useEffect(() => {
        dispatch(listCategories());
    }, [dispatch, page, currentTab]);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
                paddingTop: '0px !important',
                width: '848px',
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
                                        label={t('Category').toUpperCase()}
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
                            categories={categories}
                        />
                    </TabPanel>
                </Box>
            </Container>
            <DialogMsg
                title={currentCategory && currentCategory.libelle ? currentCategory.libelle.toString() : ''}
                open={btnAction !== 0}
                isAction={false}
                handleClose={() => setBtnAction(0)}>
                <CategoryDetailWrapper btnAction={btnAction} currentCategory={currentCategory} />
            </DialogMsg>
        </Box>
    );
};

export default AdminCategory;
