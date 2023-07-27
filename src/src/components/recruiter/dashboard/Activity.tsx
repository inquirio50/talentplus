import React from 'react';
import { Card, Dropdown, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Activity = () => {
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

                <h4 className="header-title mb-3">{t('Recent Activities')}</h4>

                <Table hover responsive className="table-centered table-nowrap table-hover mb-0">
                    <tbody>
                        <tr>
                            {/* <td>
                                <div className="d-flex align-items-start">
                                    <img className="me-2 rounded-circle" src={avatar2} width="40" alt="" />
                                    <div>
                                        <h5 className="mt-0 mb-1">
                                            Soren Drouin
                                            <small className="fw-normal ms-3">18 Jan 2019 11:28 pm</small>
                                        </h5>
                                        <span className="font-13">Completed "Design new idea"...</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="text-muted font-13">Project</span> <br />
                                <p className="mb-0">Hyper Mockup</p>
                            </td>
                            <td className="table-action" style={{ width: '50px' }}>
                                <Dropdown className="float-end" align="end">
                                    <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                                        <i className="mdi mdi-dots-horizontal"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Settings</Dropdown.Item>
                                        <Dropdown.Item>Action</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="d-flex align-items-start">
                                    <img className="me-2 rounded-circle" src={avatar6} width="40" alt="" />
                                    <div>
                                        <h5 className="mt-0 mb-1">
                                            Anne Simard
                                            <small className="fw-normal ms-3">18 Jan 2019 11:09 pm</small>
                                        </h5>
                                        <span className="font-13">Assigned task "Poster illustation design"...</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="text-muted font-13">Project</span> <br />
                                <p className="mb-0">Hyper Mockup</p>
                            </td>
                            <td className="table-action" style={{ width: '50px' }}>
                                <Dropdown className="float-end" align="end">
                                    <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                                        <i className="mdi mdi-dots-horizontal"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Settings</Dropdown.Item>
                                        <Dropdown.Item>Action</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="d-flex align-items-start">
                                    <img className="me-2 rounded-circle" src={avatar3} width="40" alt="" />
                                    <div>
                                        <h5 className="mt-0 mb-1">
                                            Nicolas Chartier
                                            <small className="fw-normal ms-3">15 Jan 2019 09:29 pm</small>
                                        </h5>
                                        <span className="font-13">Completed "Drinking bottle graphics"...</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="text-muted font-13">Project</span> <br />
                                <p className="mb-0">Web UI Design</p>
                            </td>
                            <td className="table-action" style={{ width: '50px' }}>
                                <Dropdown className="float-end" align="end">
                                    <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                                        <i className="mdi mdi-dots-horizontal"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Settings</Dropdown.Item>
                                        <Dropdown.Item>Action</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="d-flex align-items-start">
                                    <img className="me-2 rounded-circle" src={avatar4} width="40" alt="" />
                                    <div>
                                        <h5 className="mt-0 mb-1">
                                            Gano Cloutier
                                            <small className="fw-normal ms-3">10 Jan 2019 08:36 pm</small>
                                        </h5>
                                        <span className="font-13">Completed "Design new idea"...</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="text-muted font-13">Project</span> <br />
                                <p className="mb-0">UBold Admin</p>
                            </td>
                            <td className="table-action" style={{ width: '50px' }}>
                                <Dropdown className="float-end" align="end">
                                    <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                                        <i className="mdi mdi-dots-horizontal"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Settings</Dropdown.Item>
                                        <Dropdown.Item>Action</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="d-flex align-items-start">
                                    <img className="me-2 rounded-circle" src={avatar5} width="40" alt="" />
                                    <div>
                                        <h5 className="mt-0 mb-1">
                                            Francis Achin
                                            <small className="fw-normal ms-3">08 Jan 2019 12:28 pm</small>
                                        </h5>
                                        <span className="font-13">Assigned task "Hyper app design"...</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="text-muted font-13">Project</span> <br />
                                <p className="mb-0">Website Mockup</p>
                            </td>
                            <td className="table-action" style={{ width: '50px' }}>
                                <Dropdown className="float-end" align="end">
                                    <Dropdown.Toggle variant="link" className="arrow-none card-drop p-0 shadow-none">
                                        <i className="mdi mdi-dots-horizontal"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Settings</Dropdown.Item>
                                        <Dropdown.Item>Action</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td> */}
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default Activity;
