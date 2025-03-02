import React, {Component} from "react";
import {Badge, Col, Row} from "react-bootstrap";
import Utility from "../../helpers/Utility";
import LoanApplication from "../../models/LoanApplication";
import HistoryShimmer from "./HistoryShimmer";
import {Link} from "react-router-dom";

class HistoryLayout extends Component {

    render() {
        const {application, location} = this.props;

        if (!(application instanceof LoanApplication)) return <HistoryShimmer/>;

        let loan = application.getLoan();
        let loanUser = loan.getUser();

        let theme = Utility.getTheme(application.getStatus(), (loan.isLoanRequest() && application.getApplicant().isMe()) || (loan.isLoanOffer() && loan.isMine()));

        return <Col md={6} className={`pt-3 pb-3`}>
            <Link to={{pathname: `/loan/application/details`, state: {application, from: location}}} className={`text-decoration-none`}>
                <Row>
                    <Col lg={2} md={2} sm={2} xl={2} xs={2}>
                        <img src={theme.icon} width={25} alt={`transaction-direction`} className={`img-fluid rounded`}/>
                    </Col>
                    <Col lg={6} md={6} sm={6} xl={6} xs={6} className={`text-left`} style={{marginTop: '-5px'}}>
                        <Row>
                            <Col md={12}><small
                                className={`font-size-16 text-dark`}>Loan {loan.getLoanType()} {loanUser.isMe() && '(Me)'}</small></Col>
                            <Col md={12}><small className={`text-muted`}>{application.getDate()}</small></Col>
                        </Row>
                    </Col>
                    <Col lg={4} md={4} sm={4} xl={4} xs={4} className={`text-right`}>
                        <Row>
                            <Col lg={12} md={12} sm={12} xl={12} xs={12}><small
                                style={{color: theme.color}}>{Utility.format(parseFloat(application.getLoan().getAmount()))}</small></Col>
                            <Col lg={12} md={12} sm={12} xl={12} xs={12}><Badge
                                variant={theme.badge}>{application.getStatus() || "Unknown"}</Badge></Col>
                        </Row>
                    </Col>
                </Row>
            </Link>
        </Col>;
    }
}

export default HistoryLayout;