import React from 'react';
import { Box, Button, Divider, Grid, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AboutJob from '../../common/job/AboutJob';
import JobDescription from '../../common/job/JobDescription';
import { acceptOrDeclineMatchAction } from '../../../store/reducers/candidate/candidateActions';
import { CANDIDATE_MATCHES_ROUTE } from '../../../routes/routes';
import { AcceptOrDeclineMatch } from '../../../config/interfaces';
import UserMatch from '../../../models/userMatch';

const MatchView = ({ currentMatch }: { currentMatch: UserMatch | undefined }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAccept = () => {
        if (currentMatch) {
            const data: AcceptOrDeclineMatch = {
                matchId: currentMatch.id,
                isAccepted: true,
            };
            dispatch(acceptOrDeclineMatchAction(data));
            navigate(CANDIDATE_MATCHES_ROUTE);
        }
    };

    const handleDecline = () => {
        if (currentMatch) {
            const data: AcceptOrDeclineMatch = {
                matchId: currentMatch.id,
                isAccepted: false,
            };
            dispatch(acceptOrDeclineMatchAction(data));
            navigate(CANDIDATE_MATCHES_ROUTE);
        }
    };

    if (!currentMatch) {
        return <LinearProgress />;
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item lg={7} xs={12} paddingTop={0}>
                    <AboutJob job={currentMatch?.job} />
                </Grid>
                <Grid item lg={5} xs={12}>
                    <JobDescription description={currentMatch?.job?.description} />
                </Grid>
            </Grid>
            <Divider />
            <Grid container direction="row" justifyContent="center" marginTop="20px">
                <Button onClick={handleAccept} color="success" sx={{ marginRight: '15px' }} variant="outlined">
                    {t('Accept')}
                </Button>
                <Button onClick={handleDecline} color="error" variant="outlined">
                    {t('Decline')}
                </Button>
            </Grid>
        </Box>
    );
};
export default MatchView;
