import React, {Component} from "react";
import Loan from "../../models/Loan";
import {Badge, Col, Row} from "react-bootstrap";
import Utility from "../../helpers/Utility";
import {Link} from "react-router-dom";
import LoanShimmer from "./LoanShimmer";

class LoanLayout extends Component {

    render() {
        const {loan, location} = this.props;

        if (!(loan instanceof Loan)) return <LoanShimmer/>;

        let loanUser = loan.getUser();
        let theme = Utility.getTheme(loan.getStatus(), false);

        const layout = <Row>
            <Col lg={2} md={2} sm={2} xl={2} xs={2}>
                <img
                    src={(loanUser.getPicture() ? loanUser.getPictureUrl() : null) || loanUser.getDefaultPicture()}
                    onError={(e) => {e.target.onerror = null; e.target.src = loanUser.getDefaultPicture()}}
                    style={{width: 40, maxHeight: 40, objectFit: 'cover'}} alt={`loan-user`}
                    className={`rounded-circle border-accent background-accent-light my-p-0-9`}/>
            </Col>
            <Col lg={6} md={6} sm={6} xl={6} xs={6} className={`text-left`} style={{marginTop: '-5px'}}>
                <Row>
                    <Col md={12}><small className={`font-size-16 text-dark`}>Loan {loan.getLoanType()} {loanUser.isMe() && '(Me)'}</small></Col>
                    <Col md={12}><small className={`text-muted`}>{loan.getDate()}</small></Col>
                </Row>
            </Col>
            <Col lg={4} md={4} sm={4} xl={4} xs={4} className={`text-right`}>
                <Row>
                    <Col lg={12} md={12} sm={12} xl={12} xs={12}><small style={{color: theme.color}}>{Utility.format(parseFloat(loan.getAmount()))}</small></Col>
                    <Col lg={12} md={12} sm={12} xl={12} xs={12}><Badge variant={theme.badge}>{loan.getStatus() || "Unknown"}</Badge></Col>
                </Row>
            </Col>
        </Row>;

        return <Col md={6} className={`pt-4 pb-4 ${!location && 'bg-white my-rounded'}`}>
            {location ? <Link to={{pathname: `/loan/details`, state: {loan, from: location}}} className={`text-decoration-none`}>
                {layout}
            </Link> : layout}
        </Col>;
    }
}

export default LoanLayout;