import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Card, CardActions, CardContent, Grid, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import {
    getAddressDisplay as getAddressString,
    formatPhoneNumberDisplay as removeFormatPhoneNumber,
} from '../../helpers/utilityFunctions';
import { RootState } from '../../../store/store';
import { Address } from '../../../models/address';
import MaterialSearchInput from '../../common/MaterialSearchInput';
import { dispatchUpdateCompany } from '../../../store/reducers/recruiter/recruiterActions';

const AdditionalInformation = ({ company }: any) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
    const [isSuccess] = useState(false);
    const [apiRequestSent, setApiRequestSent] = useState(false);
    const { loading } = useSelector((state: RootState) => state.recruiter);

    const formik = useFormik({
        initialValues: {
            name: company?.name || '',
            mission: company?.mission || '',
            vision: company?.vision || '',
            values: company?.values || '',
            website: company?.website || '',
            phoneNumber: company?.phoneNumber || '',
            email: company?.email || '',
            suite: company?.address?.suite || '',
            street: company?.address?.street || '',
            province: company?.address?.province || '',
            city: company?.address?.city || '',
            postalCode: company?.address?.postalCode || '',
            latitude: company?.address?.latitude || '',
            longitude: company?.address?.longitude || '',
            address: getAddressString(company?.address || ''),
        },
        enableReinitialize: true,
        onSubmit: (value) => {
            const addressArray = value.address.split(',');
            const address: Address = {
                suite: value.suite || '',
                street: addressArray.length !== 0 && addressArray[0] !== '' ? addressArray[0]?.trim() : '',
                city: addressArray.length !== 0 && addressArray[1] !== '' ? addressArray[1]?.trim() : '',
                province: addressArray.length !== 0 && addressArray[2] !== '' ? addressArray[2]?.trim() : '',
                country: addressArray.length !== 0 && addressArray[3] !== '' ? addressArray[3]?.trim() : '',
                postalCode: value.postalCode || '',
            };
            const phoneNumber = removeFormatPhoneNumber(value.phoneNumber);
            const companyPost = {
                name: value.name,
                website: value.website,
                phoneNumber,
                address,
                mission: value.mission,
                vision: value.vision,
                values: value.values,
            };
            // dispatch({ type: types.UPDATE_COMPANY_PROFILE, payload: companyPost });
            dispatch(dispatchUpdateCompany(companyPost));
        },
    });

    if (!loading && apiRequestSent === true) {
        setApiRequestSent(false);
        setIsSnackBarOpen(true);
    }

    const closeSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSnackBarOpen(false);
    };

    return (
        <>
            <Snackbar open={isSnackBarOpen && isSuccess} autoHideDuration={6000} onClose={closeSnackBar}>
                <Alert onClose={closeSnackBar} severity="success" sx={{ width: '100%' }}>
                    {t('Profile successfully updated!')}
                </Alert>
            </Snackbar>
            <Snackbar open={isSnackBarOpen && !isSuccess} autoHideDuration={6000} onClose={closeSnackBar}>
                <Alert onClose={closeSnackBar} severity="error" sx={{ width: '100%' }}>
                    {t('Error')}
                </Alert>
            </Snackbar>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ mt: 4 }}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={4} xs={12}>
                                    <Typography variant="h6">Edit Company Details</Typography>
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            mt: 3,
                                            alignItems: 'center',
                                        }}>
                                        <TextField
                                            size="medium"
                                            sx={{
                                                flexGrow: 1,
                                                mr: 3,
                                            }}
                                            id="name"
                                            name="name"
                                            label={t('Name of Company')}
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                        />
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            mt: 3,
                                            alignItems: 'center',
                                        }}>
                                        <TextField
                                            size="medium"
                                            sx={{
                                                flexGrow: 1,
                                                mr: 3,
                                            }}
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            label={t('Phone Number')}
                                            value={formik.values.phoneNumber}
                                            onChange={formik.handleChange}
                                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        />
                                    </Box>

                                    <Box sx={{ mt: 3 }}>
                                        <Grid
                                            sx={{
                                                flexGrow: 1,
                                                mr: 3,
                                            }}>
                                            <MaterialSearchInput
                                                id="address"
                                                name="address"
                                                label={t('address')}
                                                value={formik.values.address}
                                                form={formik}
                                                error={formik.errors.address}
                                            />
                                        </Grid>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            mt: 3,
                                            alignItems: 'center',
                                        }}>
                                        <TextField
                                            size="medium"
                                            sx={{
                                                flexGrow: 1,
                                                mr: 3,
                                            }}
                                            id="website"
                                            name="website"
                                            label={t('Website')}
                                            value={formik.values.website}
                                            onChange={formik.handleChange}
                                            error={formik.touched.website && Boolean(formik.errors.website)}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            mt: 3,
                                            alignItems: 'center',
                                        }}>
                                        <TextField
                                            size="medium"
                                            sx={{
                                                flexGrow: 1,
                                                mr: 3,
                                            }}
                                            id="mission"
                                            name="mission"
                                            label={t('Mission')}
                                            value={formik.values.mission}
                                            onChange={formik.handleChange}
                                            error={formik.touched.mission && Boolean(formik.errors.mission)}
                                            multiline
                                            rows={3}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            mt: 3,
                                            alignItems: 'center',
                                        }}>
                                        <TextField
                                            size="medium"
                                            sx={{
                                                flexGrow: 1,
                                                mr: 3,
                                            }}
                                            id="vision"
                                            name="vision"
                                            label={t('Vision')}
                                            value={formik.values.vision}
                                            onChange={formik.handleChange}
                                            error={formik.touched.vision && Boolean(formik.errors.vision)}
                                            multiline
                                            rows={3}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            mt: 3,
                                            alignItems: 'center',
                                        }}>
                                        <TextField
                                            size="medium"
                                            sx={{
                                                flexGrow: 1,
                                                mr: 3,
                                            }}
                                            id="values"
                                            name="values"
                                            label={t('Values')}
                                            value={formik.values.values}
                                            onChange={formik.handleChange}
                                            error={formik.touched.values && Boolean(formik.errors.values)}
                                            multiline
                                            rows={3}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions
                            sx={{
                                // flexWrap: 'wrap',
                                display: 'flex',
                                justifyContent: 'end',
                            }}>
                            <LoadingButton
                                loading={loading}
                                type="submit"
                                color="primary"
                                sx={{ m: 1 }}
                                variant="contained">
                                {t('Update')}
                            </LoadingButton>
                        </CardActions>
                    </Card>
                </Box>
            </form>
        </>
    );
};

export default AdditionalInformation;

// CustomerEditForm.propTypes = {
//     customer: PropTypes.object.isRequired,
// };
