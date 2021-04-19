import React, {Component} from "react";
import {connect} from "react-redux";
import {Badge, Button, Card, Col, Row, Table} from "react-bootstrap";
import Utility from "../../helpers/Utility";
import {Link} from "react-router-dom";
import NoContent from "../layout/NoContent";
import TransactionShimmer from "../layout/TransactionShimmer";
import Transaction from "../../models/Transaction";
import {WalletAction} from "../../actions";

class Wallet extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.wallet?.data) this.props.wallet.data = {};
        dispatch(WalletAction.getWalletData());
    }

    render() {

        const {wallet} = this.props;

        let {available_balance, transactions} = {...{available_balance: 0, transactions: [1, 2, 3]}, ...wallet.data};

        return <>
            <Row>
                <Col>
                    <h4 className={`font-weight-bold text-muted rounded`}>Wallet</h4>
                    <p>Available wallet credit</p>
                </Col>
            </Row>
            <Row>
                <Col md={6} className={`mb-3`}>
                    <Card border="light" className={`p-2 border-radius-10`}>
                        <Card.Body>
                            <p className={`m-0`}>Available balance</p>
                            <h3 className={`color-accent mt-2`}>{Utility.format(available_balance)}</h3>
                            <Button className={`pl-4 pr-4 m-1`}>Fund wallet</Button>
                            <Button variant={`warning`} className={`pl-4 pr-4 m-1 my-rounded`}>Cash out</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Card border="light" className={`p-2 border-radius-10`}>
                        <Card.Body>
                            <Card.Title as="small" className={`h5 font-weight-bold color-accent`}>Transactions</Card.Title>
                            <Link to={`/transactions`} className={`float-right color-accent`}>View all</Link>
                            {!Utility.isEmpty(transactions) ? <Table className={`mt-3`} responsive borderless>
                                <thead className={`border-bottom`}>
                                <tr>
                                    <th>#</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {transactions.map((v, k) => {

                                    if (Utility.isNumeric(v)) return <TransactionShimmer key={k}/>;

                                    let trans = new Transaction(v);
                                    let theme = Utility.getTheme(trans.getStatus(), trans.getType()?.toLowerCase() === 'top-up');
                                    return <tr className={`border-bottom`} key={k}>
                                        <td>
                                            <img src={theme.icon} width={25} alt={`transaction-direction`} className={`img-fluid rounded`}/></td>
                                        <td>{trans.getType()}</td>
                                        <td>{Utility.format(parseFloat(trans.getAmount()))}</td>
                                        <td><Badge variant={theme.badge}>{trans.getStatus()}</Badge></td>
                                        <td>{trans.getDate()}</td>
                                        <td>...</td>
                                    </tr>
                                })}
                                </tbody>
                            </Table> : <NoContent/>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>;
    }
}

function mapStateToProps(state) {
    return {
        wallet: state.wallet
    }
}

export default connect(mapStateToProps)(Wallet)