import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';

// components
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Alert, Snackbar } from '@mui/material';

import ProfileDisplay from './matches/ProfileDisplay';
import MatchAlt from './matches/MatchAlt';
import { RootState } from '../../store/store';
import { recruiterFetchMatches } from '../../store/reducers/recruiter/recruiterActions';

// TaskDetails
const RecruiterMatches = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(recruiterFetchMatches());
    }, [dispatch]);

    const { matches } = useSelector((state: RootState) => state.recruiter);
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
    const [message, setMessage] = useState('');

    const closeSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSnackBarOpen(false);
        setMessage('');
    };

    useEffect(() => {
        if (message !== '') {
            setIsSnackBarOpen(true);
        }
    }, [message]);

    // const matchRows = matches?.data?.reduce(
    //     (rows: any[][], key: any, index: number) =>
    //         (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows,
    //     []
    // );
    const [profile, setProfile] = useState();

    const displayProfile = (params: any) => {
        setProfile(params);
    };
    const returnFunction = () => {
        setProfile(undefined);
    };
    // console.log("matchRows", matchRows);

    return (
        <>
            <Snackbar open={isSnackBarOpen} autoHideDuration={6000} onClose={closeSnackBar}>
                <Alert onClose={closeSnackBar} severity="success">
                    {t(`Message: ${message}`)}
                </Alert>
            </Snackbar>
            {profile && (
                <>
                    <ProfileDisplay />
                    <Button className="btn btn-primary" onClick={() => returnFunction()}>
                        {t('Back to matches')}
                    </Button>
                </>
            )}
            {!profile && (
                <Container className="match_container">
                    {matches &&
                        Array.isArray(matches) &&
                        matches.map((match: any) => {
                            // eslint-disable-next-line no-param-reassign
                            match.displayProfile = displayProfile;
                            return (
                                <Row key={`row_${match.id}`}>
                                    <Col key={`col_${match.id}`}>
                                        <MatchAlt key={match.id} match={match} setMessage={setMessage} />
                                    </Col>
                                </Row>
                            );
                        })}
                </Container>
            )}
        </>
    );
};

export default RecruiterMatches;
