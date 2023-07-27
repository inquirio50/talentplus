import React, { useEffect } from 'react';
import { Box, Button, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    acceptOrDeclineAgreementAction,
    dispatchFetchUseMatch,
} from '../../../store/reducers/candidate/candidateActions';
import { CANDIDATE_MATCHES_ROUTE } from '../../../routes/routes';
import { AcceptOrDeclineMatchAgreement } from '../../../config/interfaces';
import UserMatch from '../../../models/userMatch';
import useQuery from '../../../hooks/useQuery';
import { RootState } from '../../../store/store';

const MatchViewAgreement = ({ currentMatch }: { currentMatch?: UserMatch | undefined }) => {
    const { currentStateMatch } = useSelector((state: RootState) => ({
        currentStateMatch: currentMatch === undefined ? state.candidate.currentMatch : currentMatch,
        user: state.authentication.user,
    }));

    const matchId = currentMatch === undefined ? useQuery().get('match') : currentMatch.id;

    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAccept = () => {
        if (matchId) {
            const data: AcceptOrDeclineMatchAgreement = {
                matchId,
                isAccepted: true,
            };
            dispatch(acceptOrDeclineAgreementAction(data));
            navigate(CANDIDATE_MATCHES_ROUTE);
        }
    };

    const handleDecline = () => {
        if (matchId) {
            const data: AcceptOrDeclineMatchAgreement = {
                matchId,
                isAccepted: false,
            };
            dispatch(acceptOrDeclineAgreementAction(data));
            navigate(CANDIDATE_MATCHES_ROUTE);
        }
    };

    useEffect(() => {
        if (!currentMatch && matchId) dispatch(dispatchFetchUseMatch(matchId));
    }, [matchId]);

    if (!currentMatch) {
        return <LinearProgress />;
    }

    return (
        <Box>
            {currentStateMatch?.job.role === 'contractor' ? (
                <>
                    <Typography>
                        {t('hello')} {currentStateMatch?.profile.firstName},
                    </Typography>
                    <Typography>{t('asAgreed')}</Typography>
                    <Typography>{t('mandate')}</Typography>
                    <Typography>{t('thisClient')}</Typography>
                    <br />
                    <Typography>
                        {t('CLIENT')}: {currentStateMatch?.owner?.id}{' '}
                    </Typography>
                    <Typography>
                        {t('clientIdRequest')}: {currentStateMatch?.job.id}{' '}
                    </Typography>
                    <Typography>
                        {t('rate')}: {currentStateMatch?.job.startingRatePerHour}$ -{' '}
                        {currentStateMatch?.job.endingRatePerHour}$
                    </Typography>
                    <Typography>
                        {' '}
                        {t('TITLE')}: {currentStateMatch?.job.title}{' '}
                    </Typography>
                    <Typography>
                        {t('duration')}: {currentStateMatch?.job.durationNumber} {currentStateMatch?.job.durationType}{' '}
                        {t('RenewalMsg')}
                    </Typography>
                    <Typography>{t('ifAgree')}</Typography>
                    <br />
                    <Typography>{t('byGiving')}</Typography>
                    <Typography>
                        {currentStateMatch?.job.title} {t('asWellMsg')}
                    </Typography>
                </>
            ) : (
                <>
                    <Typography>
                        {t('hello')} {currentStateMatch?.profile.firstName},
                    </Typography>
                    <Typography>{t('asAgreed')}</Typography>
                    <Typography>{t('mandate')}</Typography>
                    <Typography>{t('thisClient')}</Typography>
                    <br />
                    <Typography>
                        {t('CLIENT')}: {currentStateMatch?.owner?.id}{' '}
                    </Typography>
                    <Typography>
                        {t('SALARY')}: {currentStateMatch?.job.startingRatePerHour}$ -{' '}
                        {currentStateMatch?.job.endingRatePerHour}$
                    </Typography>
                    <Typography>
                        {' '}
                        {t('TITLE')}: {currentStateMatch?.job.title}{' '}
                    </Typography>

                    <Typography> {t('ifAgree')}</Typography>
                    <br />
                    <Typography>{t('byGiving')}</Typography>
                    <Typography>
                        {currentStateMatch?.job.title} {t('asWellMsg')}
                    </Typography>
                </>
            )}
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

MatchViewAgreement.defaultProps = {
    currentMatch: undefined,
};

export default MatchViewAgreement;
