import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RECRUITER_MATCHES_ROUTE } from '../../../routes/routes';

interface StatProps {
    matchLen: number | undefined;
}

const Statistics = ({ matchLen }: StatProps) => {
    const { t } = useTranslation();

    return (
        <Row>
            <Col sm={3} xl={3}>
                <Link to={RECRUITER_MATCHES_ROUTE}>
                    <Card>
                        <Card.Body className="text-center">
                            <i className="dripicons-user-group text-muted font-24" />
                            <h3>
                                <span>{matchLen || 0}</span>
                            </h3>
                            <p className="text-muted font-15 mb-0">{t('matches')}</p>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
            <Col sm={3} xl={3}>
                <Link to="/recruiter/interviews">
                    <Card>
                        <Card.Body className="text-center">
                            <i className="dripicons-checklist text-muted font-24" />
                            <h3>
                                <span>0</span>
                            </h3>
                            <p className="text-muted font-15 mb-0">{t('Interviews')}</p>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
            <Col sm={3} xl={3}>
                <Link to={RECRUITER_MATCHES_ROUTE}>
                    <Card>
                        <Card.Body className="text-center">
                            <i className="dripicons-briefcase text-muted font-24" />
                            <h3>
                                <span>0</span>
                            </h3>
                            <p className="text-muted font-15 mb-0">{t('Offers')}</p>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
            <Col sm={3} xl={3}>
                <Link to="/recruiter/contracts">
                    <Card>
                        <Card.Body className="text-center">
                            <i className="dripicons-blog text-muted font-24" />
                            <h3>
                                <span>0</span>
                            </h3>
                            <p className="text-muted font-15 mb-0">{t('Contracts')}</p>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        </Row>
    );
};

export default Statistics;
