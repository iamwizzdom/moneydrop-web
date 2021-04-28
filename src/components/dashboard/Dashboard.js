import React, {Component} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import offer from '../../assets/images/offer-loan.svg';
import request from '../../assets/images/request-loan.svg';
import {DashboardAction, CardAction} from "../../actions";
import {connect} from "react-redux";
import User from "../../models/User";
import {Link} from "react-router-dom";
import Utility from "../../helpers/Utility";
import Loan from "../../models/Loan";
import Transaction from "../../models/Transaction";
import NoContent from "../layout/NoContent";
import LoanShimmer from "../layout/LoanShimmer";
import TransactionShimmer from "../layout/TransactionShimmer";
import LoanLayout from "../layout/LoanLayout";
import TransactionLayout from "../layout/TransactionLayout";
import swal from "@sweetalert/with-react";
import {AppConst} from "../../constants";
import ReactDOM from 'react-dom';
import InputAmount from "../layout/InputAmount";
import CardList from "../layout/CardList";

class Dashboard extends Component {

    state = {
        error: {},
        navigate: false,
        mounted: false,
        topUpAmount: 0,
        showAmountModal: false,
        showSelectCardModal: false,
        gender: 0
    };

    componentDidMount() {
        const {dispatch, location} = this.props;
        const {state} = location;
        if (this.props.dashboard?.data) this.props.dashboard.data = {};
        dispatch(DashboardAction.getDashboardData());
        this.setState({
            ...this.state,
            ...state,
            mounted: true
        });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {dispatch, chargeCard} = this.props;

        if (chargeCard.data.message) {
            swal({
                title: chargeCard.data.title,
                text: chargeCard.data.message,
                icon: (chargeCard.data.status ? `success` : `error`),
                button: "Ok",
            });
            chargeCard.data.message = null;
        }

        if (this.state.showAmountModal) {

            let wrapper = document.createElement('div');
            ReactDOM.render(<InputAmount />, wrapper);

            swal(`Amount not less than ${AppConst.MIN_TOP_UP_AMOUNT}.`, {
                content: wrapper,
                button: "Top Up"
            }).then((value) => {

                if (!value) {
                    this.setShowAmountModal(false);
                    return;
                }

                if (isNaN(value)) {
                    swal("Please enter a valid amount").then(() => this.setShowAmountModal(true));
                    return;
                }

                let amount = parseFloat(value);

                if (!amount || amount < AppConst.MIN_TOP_UP_AMOUNT) {
                    swal(`Top up amount must be greater than ${AppConst.MIN_TOP_UP_AMOUNT}.`).then(() => this.setShowAmountModal(true));
                    return;
                }

                this.setState({showAmountModal: false, showSelectCardModal: true, topUpAmount: amount});

            });
        }

        if (this.state.showSelectCardModal) {

            let wrapper = document.createElement('div');
            wrapper.classList.add("row");
            ReactDOM.render(<CardList />, wrapper);

            swal({
                title: "Select Card",
                content: wrapper,
                buttons: {
                    cancel: "Cancel",
                    confirm: {
                        text: "Proceed",
                        closeModal: false
                    }
                }
            }).then((cardID) => {

                if (!cardID) {
                    this.setState({showAmountModal: false, showSelectCardModal: false});
                    return;
                }

                if (!Utility.isString(cardID)) {
                    swal("Please select a card").then((val) => {

                        if (!val) {
                            this.setState({showAmountModal: false, showSelectCardModal: false});
                            return;
                        }

                        this.setState({showAmountModal: false, showSelectCardModal: true})
                    });
                    return;
                }

                this.setState({showAmountModal: false, showSelectCardModal: false}, () => {
                    dispatch(CardAction.chargeCard({amount: this.state.topUpAmount}, cardID));
                });

            });
        }
    }

    setShowAmountModal = (status) => {
        this.setState({showAmountModal: status, showSelectCardModal: false});
    }

    render() {

        const {dashboard, chargeCard} = this.props;
        const user = new User(localStorage.getItem("user"));

        let {available_balance, loans, transactions} = {
            ...{
                available_balance: 0,
                loans: [1, 2, 3, 4, 5, 6],
                transactions: [1, 2, 3, 4, 5, 6]
            }, ...dashboard.data
        };

        if (chargeCard.data.status) {
            available_balance = chargeCard.data.response.available_balance;
            if (!Utility.isEmpty(transactions) && !Utility.isNumeric(transactions[0])) {
                transactions.pop()
            }
            transactions = [chargeCard.data.response.transaction, ...transactions];
        }

        return <>
            <Row>
                <Col>
                    <h4 className={`font-weight-bold text-muted rounded`}>Home</h4>
                    <p>Welcome back, {user.getFirstname()}.</p>
                </Col>
            </Row>
            <Row>
                <Col md={6} className={`mb-3`}>
                    <Card border="light" className={`p-2 border-radius-10`}>
                        <Card.Body>
                            <p className={`m-0`}>Available balance</p>
                            <h3 className={`color-accent mt-2`}>{Utility.format(available_balance)}</h3>
                            <Button className={`min-width-160 mt-1`} onClick={() => this.setShowAmountModal(true)}>Fund wallet</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className={`mb-3`}>
                    <Link to={`/loan/offer`} className={`text-decoration-none text-dark`}>
                        <Card border="light" className={`p-2 border-radius-10`}>
                            <Card.Body className={`m-auto`}>
                                <img src={offer} width={40} className={`img-fluid mx-auto d-block`} alt={`offer`}/>
                                <p className={`mt-3 font-size-13`}>Offer Loan</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col className={`mb-3`}>
                    <Link to={`/loan/request`} className={`text-decoration-none text-dark`}>
                        <Card border="light" className={`p-2 border-radius-10`}>
                            <Card.Body className={`m-auto`}>
                                <img src={request} width={37} className={`img-fluid mx-auto d-block m-3`}
                                     alt={`request`}/>
                                <p className={`mt-4 font-size-13`}>Request Loan</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col md={12} className={`mb-3`}>
                    <Card border="light" className={`p-2 border-radius-10`}>
                        <Card.Body>
                            <Card.Title as="small" className={`h5 font-weight-bold color-accent`}>My Loans</Card.Title>
                            <Link to={`/loans/mine`} className={`float-right color-accent`}>View all</Link>
                            {!Utility.isEmpty(loans) ? <Row className={`underline-children`}>
                                {loans.map((v, k) => {

                                    if (Utility.isNumeric(v)) return <LoanShimmer key={k}/>;

                                    return <LoanLayout key={k} loan={new Loan(v)} {...this.props}/>;
                                })}
                            </Row> : <NoContent title={`No Loan`}/>}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12}>
                    <Card border="light" className={`p-2 border-radius-10`}>
                        <Card.Body>
                            <Card.Title as="small"
                                        className={`h5 font-weight-bold color-accent`}>Transactions</Card.Title>
                            <Link to={`/transactions`} className={`float-right color-accent`}>View all</Link>
                            {!Utility.isEmpty(transactions) ? <Row className={`underline-children`}>
                                {transactions.map((v, k) => {

                                    if (Utility.isNumeric(v)) return <TransactionShimmer key={k}/>;

                                    return <TransactionLayout key={k} transaction={new Transaction(v)}/>;
                                })}
                            </Row> : <NoContent title={`No Transaction`}/>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>;
    }
}

function mapStateToProps(state) {
    return {
        dashboard: state.dashboard,
        chargeCard: state.chargeCard
    }
}

export default connect(mapStateToProps)(Dashboard)