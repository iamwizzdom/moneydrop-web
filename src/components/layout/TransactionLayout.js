import React, {Component} from "react";
import {Badge, Col, Row} from "react-bootstrap";
import Utility from "../../helpers/Utility";
import Transaction from "../../models/Transaction";
import {Link} from "react-router-dom";
import TransactionShimmer from "./TransactionShimmer";

class TransactionLayout extends Component {

    render() {
        const {transaction, location, noLink} = this.props;

        if (!(transaction instanceof Transaction)) return <TransactionShimmer/>;

        let theme = Utility.getTheme(transaction.getStatus(), transaction.getType()?.toLowerCase() === 'top-up');

        let layout = <Row>
            <Col lg={2} md={2} sm={2} xl={2} xs={2}>
                <img src={theme.icon} width={25} alt={`transaction-direction`} className={`img-fluid rounded`}/>
            </Col>
            <Col lg={6} md={6} sm={6} xl={6} xs={6} className={`text-left`} style={{marginTop: '-5px'}}>
                <Row>
                    <Col md={12}><small className={`font-size-16 text-dark`}>{transaction.getType()}</small></Col>
                    <Col md={12}><small className={`text-muted`}>{transaction.getDate()}</small></Col>
                </Row>
            </Col>
            <Col lg={4} md={4} sm={4} xl={4} xs={4} className={`text-right`}>
                <Row>
                    <Col lg={12} md={12} sm={12} xl={12} xs={12}><small
                        style={{color: theme.color}}>{Utility.format(parseFloat(transaction.getAmount()))}</small></Col>
                    <Col lg={12} md={12} sm={12} xl={12} xs={12}><Badge
                        variant={theme.badge}>{transaction.getStatus() || "Unknown"}</Badge></Col>
                </Row>
            </Col>
        </Row>;

        return <Col md={6} className={`pt-3 pb-3`}>
            {!noLink ? <Link to={{pathname: `/transaction/receipt`, state: {transaction, from: location}}}
                   className={`text-decoration-none`}>
                {layout}
            </Link> : layout}
        </Col>;
    }
}

export default TransactionLayout;