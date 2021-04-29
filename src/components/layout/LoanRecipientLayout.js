import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import LoanApplication from "../../models/LoanApplication";

class LoanRecipientLayout extends Component {

    render() {

        const {application, size, location} = this.props;

        if (!(application instanceof LoanApplication)) return null;

        let user = application.getApplicant();

        return <Col md={size || 6} className={`pt-4 pb-4 bg-white my-rounded`}>
            <Row style={{padding: 3}}>
                <Col lg={2} md={2} sm={2} xl={2} xs={2}>
                    <Link to={{pathname: `/user/review`, state: {user, from: location}}} className={`text-decoration-none`}>
                        <img
                            src={(user.getPicture() ? user.getPictureUrl() : null) || user.getDefaultPicture()}
                            onError={(e) => {e.target.onerror = null; e.target.src = user.getDefaultPicture()}}
                            style={{width: 40, maxHeight: 40, objectFit: 'cover'}} alt={`application-user`}
                            className={`rounded-circle my-p-0-9`}/>
                    </Link>
                </Col>
                <Col lg={10} md={10} sm={10} xl={10} xs={10} className={`text-left`} style={{marginTop: '-5px'}}>
                    <Row>
                        <Col md={12}>
                            <Link to={{pathname: `/user/review`, state: {user, from: location}}} className={`text-dark`}>
                                <small className={`font-size-13`}>{user.getFirstname()} {user.getLastname()}</small>
                            </Link>
                        </Col>
                        <Col md={12}><small className={`text-muted font-size-11`}>Date Applied: <span className={`color-accent font-weight-bold`}>{application.getDateShort()}</span></small></Col>
                    </Row>
                </Col>
            </Row>
        </Col>;
    }
}

export default LoanRecipientLayout;