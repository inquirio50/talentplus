import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import UserMatch from '../../../models/userMatch';
import { RootState } from '../../../store/store';
import PageTitle from '../../common/PageTitle';
import { CANDIDATE_MATCHES_ROUTE } from '../../../routes/routes';
import ConsultantJobMatch from './ConsultantJobMatch';
import { getUserJobsMatch } from '../../../store/reducers/candidate/candidateActions';
import { MATCH_STATUS_ALL } from '../../../config/constants';

/**
 * @deprecated
 * @returns
 */
const ConsultantMatches = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { userMatches }: { userMatches: UserMatch[] } = useSelector((state: RootState) => ({
        userMatches: state.candidate.userMatches,
    }));

    const updateMatch = () => {
        dispatch(getUserJobsMatch(MATCH_STATUS_ALL));
    };

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
                paddingTop: '0px !important',
            }}>
            <Container maxWidth="xl">
                <PageTitle
                    breadCrumbItems={[{ label: t('matches'), path: CANDIDATE_MATCHES_ROUTE, active: true }]}
                    title={t('matches')}
                    icon={<FolderSharedOutlinedIcon fontSize="small" />}
                />
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ConsultantJobMatch
                                    userMatches={userMatches}
                                    isDashBoard={false}
                                    updateMatch={updateMatch}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default ConsultantMatches;
