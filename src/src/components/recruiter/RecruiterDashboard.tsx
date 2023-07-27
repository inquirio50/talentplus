import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

// components
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Statistics from './dashboard/Statistics';
import InterviewChart from './dashboard/InterviewChart';
import Activity from './dashboard/Activity';
import Calendar from './dashboard/Calendar';
import { RootState } from '../../store/store';
import ConsultantsChart from './dashboard/ConsultantsChart';
import { recruiterFetchMatches } from '../../store/reducers/recruiter/recruiterActions';

const RecruiterDashboard = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { matches } = useSelector((state: RootState) => state.recruiter);

    useEffect(() => {
        dispatch(recruiterFetchMatches());
    }, [dispatch]);

    return (
        <>
            <Statistics matchLen={matches?.length} />
            <Row>
                <Col sm={12} className="streched_btn_link">
                    <Card>
                        <p>{t('Create a job')}</p>
                        <Link to="/recruiter/jobs/add" className="btn btn-outline-primary">
                            <i className="mdi mdi-plus-circle me-2" /> {t('Add Job')}
                        </Link>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col lg={6}>
                    <InterviewChart />
                </Col>
                <Col lg={6}>
                    <ConsultantsChart matches={matches?.length} />
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <Activity />
                </Col>
                <Col xl={6}>
                    <Calendar />
                </Col>
            </Row>
        </>
    );
};

export default RecruiterDashboard;
