import React, { useState } from 'react';
import { Card, Dropdown, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// components
import HyperDatepicker from '../../common/Datepicker';

const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const { t } = useTranslation();

    return (
        <Card className="streched_card">
            <Card.Body>
                <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                        <i className="mdi mdi-dots-vertical" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>{t('Weekly Report')}</Dropdown.Item>
                        <Dropdown.Item>{t('Monthly Report')}</Dropdown.Item>
                        <Dropdown.Item>{t('Action')}</Dropdown.Item>
                        <Dropdown.Item>{t('Settings')}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <h4 className="header-title mb-3">{t('Calendar')}</h4>

                <Row>
                    <Col md={12} className="calendar-widget">
                        <HyperDatepicker value={date} onChange={(d) => setDate(d)} inline />
                    </Col>
                    {/* <Col md={5}>
                        <ul className="list-unstyled">
                            <li className="mb-4">
                                <p className="text-muted mb-1 font-13">
                                    <i className="mdi mdi-calendar"></i> 7:30 AM - 10:00 AM
                                </p>
                                <h5>JavaScript Job Interview - Jose Fernandez</h5>
                            </li>
                            <li className="mb-4">
                                <p className="text-muted mb-1 font-13">
                                    <i className="mdi mdi-calendar"></i> 10:30 AM - 11:45 AM
                                </p>
                                <h5>JavaScript Job Interview - Jane Doe</h5>
                            </li>
                            <li className="mb-4">
                                <p className="text-muted mb-1 font-13">
                                    <i className="mdi mdi-calendar"></i> 12:15 PM - 02:00 PM
                                </p>
                                <h5>Setup Github Repository</h5>
                            </li>
                            <li>
                                <p className="text-muted mb-1 font-13">
                                    <i className="mdi mdi-calendar"></i> 5:30 PM - 07:00 PM
                                </p>
                                <h5>Meeting with Design Studio</h5>
                            </li>
                        </ul>
                    </Col> */}
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Calendar;
