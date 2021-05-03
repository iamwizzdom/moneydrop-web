import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import Utility from "../../helpers/Utility";
import {Link} from "react-router-dom";
import lightBulb from '../../assets/images/light-bulb.svg';
import unisex from '../../assets/images/unisex.svg';
import Notification from "../../models/Notification";
import Transaction from "../../models/Transaction";
import NotificationShimmer from "./NotificationShimmer";
import Loan from "../../models/Loan";
import LoanApplication from "../../models/LoanApplication";

class NotificationLayout extends Component {

    getDirection = (activityName, payload, from) => {
        let direction = {pathname: '/', state: {from}};
        switch (activityName) {
            case "loanApplicant":
                direction.pathname = '/loan/applicants';
                direction.state.loan = new Loan(payload);
                break;
            case "wallet":
            case "history":
                direction.pathname = `/${activityName}`;
                break;
            case "transactionReceipt":
                direction.pathname = '/transaction/receipt';
                direction.state.transaction = new Transaction(payload);
                break;
            case "loanDetails":
                direction.pathname = '/loan/details';
                direction.state.loan = new Loan(payload);
                break;
            case "loanApplicationDetails":
                direction.pathname = '/loan/application/details';
                direction.state.application = new LoanApplication(payload);
                break;
            case "loanRepaymentTransaction":
                direction.pathname = '/loan/application/repayments';
                direction.state.applicationReference = payload.uuid;
                break;
            default:
                break;
        }
        return direction;
    }

    render() {
        const {notification, location} = this.props;

        if (!(notification instanceof Notification)) return <NotificationShimmer/>;

        let icon = lightBulb, hasImage = !Utility.isEmpty(notification.getImage());

        if (notification.getActivity() === 'transactionReceipt') {
            if (!Utility.isEmpty(notification.getPayload())) {
                let transaction = new Transaction(notification.getPayload());
                if (transaction.getStatus() !== undefined) {
                    let theme = Utility.getTheme(transaction.getStatus(), transaction.getType()?.toLowerCase() === 'top-up');
                    icon = theme.icon;
                }
            }
        }

        return <Col md={6} className={`pt-3 pb-3`}>
            <Link to={this.getDirection(notification.getActivity(), notification.getPayload(), location)}
                  className={`text-decoration-none`}>
                <Row>
                    <Col lg={2} md={2} sm={2} xl={2} xs={2}>
                        <img src={icon} width={25} alt={`notification-direction`} className={`img-fluid rounded`}/>
                    </Col>
                    <Col lg={hasImage ? 8 : 10} md={hasImage ? 8 : 10} sm={hasImage ? 8 : 10} xl={hasImage ? 8 : 10}
                         xs={hasImage ? 8 : 10} className={`text-left`} style={{marginTop: '-5px'}}>
                        <Row>
                            <Col md={12}><small className={`font-size-14 text-dark`}>{notification.getMessage()}</small></Col>
                            <Col md={12}><small className={`text-muted`}>{notification.getDateTime()}</small></Col>
                        </Row>
                    </Col>
                    {hasImage && <Col lg={2} md={2} sm={2} xl={2} xs={2} className={`text-right`}>
                        <img
                            src={notification.getImage()}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = unisex
                            }}
                            style={{width: 40, height: 40, objectFit: 'cover'}} alt={`loan-user`}
                            className={`rounded-circle border-accent background-accent-light my-p-0-9`}/>
                    </Col>}
                </Row>
            </Link>
        </Col>;
    }
}

export default NotificationLayout;