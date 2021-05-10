import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import Utility from "../../helpers/Utility";
import {Link} from "react-router-dom";
import NoContent from "../layout/NoContent";
import TransactionShimmer from "../layout/TransactionShimmer";
import Transaction from "../../models/Transaction";
import {CardAction, WalletAction, BankAction} from "../../actions";
import TransactionLayout from "../layout/TransactionLayout";
import swal from "@sweetalert/with-react";
import ReactDOM from "react-dom";
import InputAmount from "../layout/InputAmount";
import {AppConst} from "../../constants";
import CardList from "../layout/CardList";
import BankAccountList from "../layout/BankAccountList";
import backArrow from "../../assets/images/dark-back-arrow.svg";

class Wallet extends Component {

    state = {
        topUpAmount: 0,
        showAmountModal: false,
        showSelectCardModal: false,
        cashOutAmount: 0,
        showCashOutAmountModal: false,
        showSelectBankModal: false,
    };

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.wallet?.data) this.props.wallet.data = {};
        dispatch(WalletAction.getWalletData());
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {dispatch, chargeCard, creditBank} = this.props;

        if (chargeCard.data.message) {
            swal({
                title: chargeCard.data.title,
                text: chargeCard.data.message,
                icon: (chargeCard.data.status ? `success` : `error`),
                button: "Ok",
            });
            chargeCard.data.message = null;
        }

        if (creditBank.data.message) {
            swal({
                title: creditBank.data.title,
                text: creditBank.data.message,
                icon: (creditBank.data.status ? `success` : `error`),
                button: "Ok",
            });
            creditBank.data.message = null;
        }

        if (this.state.showAmountModal) {

            let wrapper = document.createElement('div');
            ReactDOM.render(<InputAmount />, wrapper);

            swal(`Amount not be less than ${Utility.format(AppConst.MIN_TOP_UP_AMOUNT, 0)}.`, {
                content: wrapper,
                button: "Top Up"
            }).then((value) => {

                if (!value) {
                    this.setShowAmountModal(false);
                    return;
                }

                if (!Utility.isNumeric(value)) {
                    swal("Please enter a valid amount").then(() => this.setShowAmountModal(true));
                    return;
                }

                let amount = parseFloat(value);

                if (!amount || amount < AppConst.MIN_TOP_UP_AMOUNT) {
                    swal(`Top up amount must be at least ${Utility.format(AppConst.MIN_TOP_UP_AMOUNT, 0)}.`).then(() => this.setShowAmountModal(true));
                    return;
                }

                this.setState({showAmountModal: false, showSelectCardModal: true, topUpAmount: amount});

            });
        }

        if (this.state.showSelectCardModal) {

            let wrapper = document.createElement('div');
            wrapper.classList.add("row");
            ReactDOM.render(<CardList />, wrapper);

            let cards = localStorage.getItem("cards");
            if (!Utility.isEmpty(cards)) cards = JSON.parse(cards);

            swal({
                title: "Select Card",
                content: wrapper,
                buttons: {
                    cancel: "Cancel",
                    confirm: Utility.isEmpty(cards) ? "Add Card" : "Proceed"
                }
            }).then((cardID) => {

                if (!cardID) {
                    this.setState({showAmountModal: false, showSelectCardModal: false});
                    return;
                }

                if (Utility.isEmpty(cards)) {
                    window.location.assign('/cards');
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

        if (this.state.showCashOutAmountModal) {

            let wrapper = document.createElement('div');
            ReactDOM.render(<InputAmount />, wrapper);

            swal(`Amount not be less than ${Utility.format(AppConst.MIN_TOP_UP_AMOUNT, 0)}.`, {
                content: wrapper,
                button: "Cash-out"
            }).then((value) => {

                if (!value) {
                    this.setShowCashOutModal(false);
                    return;
                }

                if (!Utility.isNumeric(value)) {
                    swal("Please enter a valid amount").then(() => this.setShowCashOutModal(true));
                    return;
                }

                let amount = parseFloat(value);

                if (!amount || amount < AppConst.MIN_TOP_UP_AMOUNT) {
                    swal(`Cash-out amount must be at least ${Utility.format(AppConst.MIN_TOP_UP_AMOUNT, 0)}.`).then(() => this.setShowCashOutModal(true));
                    return;
                }

                this.setState({showCashOutAmountModal: false, showSelectBankModal: true, cashOutAmount: amount});

            });
        }

        if (this.state.showSelectBankModal) {

            let wrapper = document.createElement('div');
            wrapper.classList.add("row");
            ReactDOM.render(<BankAccountList />, wrapper);

            let accounts = localStorage.getItem("bank-accounts");
            if (!Utility.isEmpty(accounts)) accounts = JSON.parse(accounts);

            swal({
                title: "Select Bank Account",
                content: wrapper,
                buttons: {
                    cancel: "Cancel",
                    confirm: Utility.isEmpty(accounts) ? "Add Bank" : "Proceed"
                }
            }).then((bankID) => {

                if (!bankID) {
                    this.setState({showCashOutAmountModal: false, showSelectBankModal: false});
                    return;
                }

                if (Utility.isEmpty(accounts)) {
                    window.location.assign('/bank-accounts');
                    return;
                }

                if (!Utility.isString(bankID)) {
                    swal("Please select a bank account").then((val) => {

                        if (!val) {
                            this.setState({showCashOutAmountModal: false, showSelectBankModal: false});
                            return;
                        }

                        this.setState({showCashOutAmountModal: false, showSelectBankModal: true})
                    });
                    return;
                }

                this.setState({showCashOutAmountModal: false, showSelectBankModal: false}, () => {
                    dispatch(BankAction.creditBank({amount: this.state.cashOutAmount}, bankID));
                });

            });
        }
    }

    setShowAmountModal = (status) => {
        this.setState({showAmountModal: status, showSelectCardModal: false});
    }

    setShowCashOutModal = (status) => {
        this.setState({showCashOutAmountModal: status, showSelectBankModal: false});
    }

    render() {

        const {wallet, chargeCard, creditBank} = this.props;

        let {balance, available_balance, transactions} = {...{balance: 0, available_balance: 0, transactions: [1, 2, 3, 4, 5, 6]}, ...wallet.data};

        if (chargeCard.data.status) {
            balance = chargeCard.data.response.balance;
            available_balance = chargeCard.data.response.available_balance;
            if (!Utility.isEmpty(transactions) && !Utility.isNumeric(transactions[0])) {
                transactions.pop()
            }
            transactions = [chargeCard.data.response.transaction, ...transactions];
        }

        if (creditBank.data.status) {
            balance = creditBank.data.response.balance;
            available_balance = creditBank.data.response.available_balance;
            if (!Utility.isEmpty(transactions) && !Utility.isNumeric(transactions[0])) {
                transactions.pop()
            }
            transactions = [creditBank.data.response.transaction, ...transactions];
        }

        return <>
            <Row>
                <Col>
                    <h4 className={`font-weight-bold text-muted rounded`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        Wallet
                    </h4>
                    <p>Available wallet credit</p>
                </Col>
            </Row>
            <Row>
                <Col md={8} className={`mb-3`}>
                    <Card border="light" className={`p-2 border-radius-10`}>
                        <Card.Body>
                            <Row>
                                <Col className={`mb-2`}>
                                    <p className={`m-0`}>Current balance</p>
                                    <h3 className={`color-accent mt-2`}>{Utility.format(balance)}</h3>
                                </Col>
                                <Col className={`mb-2`}>
                                    <p className={`m-0`}>Available balance</p>
                                    <h3 className={`color-accent mt-2`}>{Utility.format(available_balance)}</h3>
                                </Col>
                            </Row>
                            <Button className={`pl-4 pr-4 m-1`} onClick={() => this.setShowAmountModal(true)}>
                                {chargeCard.requesting ? <Spinner animation="border" variant="light"/> : 'Fund wallet'}
                            </Button>
                            <Button variant={`warning`} className={`pl-4 pr-4 m-1 my-rounded`} onClick={() => this.setShowCashOutModal(true)}>
                                {creditBank.requesting ? <Spinner animation="border" variant="light"/> : 'Cash out'}
                            </Button>
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
        wallet: state.wallet,
        chargeCard: state.chargeCard,
        creditBank: state.creditBank,
    }
}

export default connect(mapStateToProps)(Wallet)