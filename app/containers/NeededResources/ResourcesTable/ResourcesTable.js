import React from 'react';
import {Link} from 'react-router-dom';
import { Table, Panel } from 'react-bootstrap';

import { styles } from '../../../assets/styles/variables';

const ResourcesTable = (props) => {

    const renderHeader = () => {
        if (props.windowWidth < 600) {
            return null;
        } else {
            return (
                <thead>
                    <tr>
                        <th style={{ width: '150px' }}>Item</th>
                        <th style={{ width: '100px' }}>Quantity </th>
                        <th style={{ width: '150px' }}>Project</th>
                        <th style={{ width: '150px' }}>Location Needed</th>
                        <th>Date/Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
            )
        }
    }

    const renderTable = () => {
        if (props.neededResources) {
            if (props.windowWidth < 600) {
                return (
                    props.neededResources.map((resource, i) => {
                        return (
                            <Panel bsStyle="primary" key={i}>
                                <Panel.Heading style={styles.primary}>
                                    <Panel.Title componentClass="h3">{resource.name}</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body style={{ textAlign: 'center' }}>
                                    Project: {resource.project}<br />
                                    Location: {resource.locationNeeded}
                                    Date: {resource.date}<br />
                                    Time: {`${resource.startTime} - ${resource.endTime}`}<br />
                                    <Link
                                        to="/roleView"
                                        type="button"
                                        className="btn btn-primary btn-block btn-sm"
                                        color="default"
                                        style={styles.primaryLight}>Details
                                    </Link>
                                </Panel.Body>
                            </Panel>
                        )
                    })
                )
            } else {
                return props.neededResources.map((resource, i) => {
                    return (
                        <tr key={i}>
                            <td>
                                {resource.name}
                            </td>

                            <td>
                                {resource.quantity}
                            </td>
                            <td>
                                {resource.project}
                            </td>
                            <td>
                                {resource.locationNeeded}
                            </td>
                            <td>
                                {`${resource.startTime} - ${resource.endTime}`}<br />
                                {resource.date}
                            </td>
                            <td>
                                <Link
                                    to="/projectView"
                                    type="button"
                                    className="btn btn-success btn-block btn-sm"
                                    style={styles.primary}>Details/Claim
                                </Link>
                            </td>
                        </tr>

                    );
                });
            }
        }
    }

    return (
        <Table id="table-ext-2" responsive striped bordered hover>
            {renderHeader()}
            {renderTable()}
        </Table>
    )
}

export default ResourcesTable;