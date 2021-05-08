import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import LoanApplication from "../../models/LoanApplication";

class LoanRecipientLayout extends Component {

    render() {

        const {application, size, location} = this.props;

        if (!(application instanceof LoanApplication)) return null;

        let loan = application.getLoan(), user = loan.isLoanOffer() ? application.getApplicant() : loan.getUser();

        return <Col md={size || 6} className={`pt-4 pb-4 bg-white my-rounded`}>
            <Link className={`text-decoration-none text-dark`} to={{pathname: (application.isReviewed() ? `/user/${user.getUuid()}/profile` : '/user/review'), state: {[application.isReviewed() ? 'user' : 'application']: application.isReviewed() ? user : application, from: location}}}>
                <Row style={{padding: 3}}>
                    <Col lg={2} md={2} sm={2} xl={2} xs={2}>
                        <img
                            src={(user.getPicture() ? user.getPictureUrl() : null) || user.getDefaultPicture()}
                            onError={(e) => {e.target.onerror = null; e.target.src = user.getDefaultPicture()}}
                            style={{width: 40, height: 40, objectFit: 'cover'}} alt={`application-user`}
                            className={`rounded-circle my-p-0-9`}/>
                    </Col>
                    <Col lg={10} md={10} sm={10} xl={10} xs={10} className={`text-left`} style={{marginTop: '-5px'}}>
                        <Row>
                            <Col md={12}>
                                <small className={`font-size-13`}>{user.getFirstname()} {user.getLastname()}</small>
                            </Col>
                            <Col md={12}><small className={`text-muted font-size-11`}>Date Applied: <span className={`color-accent font-weight-bold`}>{application.getDateShort()}</span></small></Col>
                        </Row>
                    </Col>
                </Row>
            </Link>
        </Col>;
    }
}

export default LoanRecipientLayout;