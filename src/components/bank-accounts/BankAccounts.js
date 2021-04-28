import React, {Component} from "react";
import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import {AppConst} from "../../constants";
import {BankAction} from "../../actions";
import {connect} from "react-redux";
import Utility from "../../helpers/Utility";
import NoContent from "../layout/NoContent";
import CardModel from "../../models/Card";
import swal from "@sweetalert/with-react";
import BankAccountLayout from "../layout/BankAccountLayout";
import BankAccount from "../../models/BankAccount";
import BankAccountShimmer from "../layout/BankAccountShimmer";
import MonoConnect from '@mono.co/connect.js';
import backArrow from "../../assets/images/dark-back-arrow.svg";

class BankAccounts extends Component {

    state = {
        bankAccount: null,
        bankAccounts: [],
        onSuccess: false,
        showRemoveBank: false
    };

    componentDidMount() {
        let bankAccounts = localStorage.getItem('bank-accounts');
        if (Utility.isEmpty(bankAccounts) || Utility.isEmpty(JSON.parse(bankAccounts))) {
            const {dispatch} = this.props;
            dispatch(BankAction.fetchBanks());
        } else {
            this.setState({bankAccounts: JSON.parse(bankAccounts)});
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {dispatch, verifyBank, fetchBanks, removeBank} = this.props;

        const {response} = {...{response: {account: null}}, ...verifyBank.data};

        const {response: bankAccounts} = {...{response: []}, ...fetchBanks.data};
        const {accounts} = {...{accounts: []}, ...bankAccounts};


        if (accounts.length > 0) {
            this.setState({bankAccounts: accounts});
            fetchBanks.data = {};
            localStorage.setItem('bank-accounts', JSON.stringify(accounts));
        }

        if (response.account) {
            let bankAccounts = [response.account, ...this.state.bankAccounts];
            this.setState({bankAccounts});
            verifyBank.data.response = {};
            localStorage.setItem('bank-accounts', JSON.stringify(bankAccounts));
        }

        if (verifyBank.data.message) {
            swal({
                title: verifyBank.data.title,
                text: verifyBank.data.message,
                icon: (verifyBank.data.status ? `success` : `error`),
                button: "Ok",
            });
            verifyBank.data.message = null;
        }


        const {status, message} = {status: null, message: null, ...removeBank.data};

        if (status !== null && message) {
            if (status) this.detachBank(this.state.bankAccount);
            swal(message, {icon: status ? "success" : "error"});
            removeBank.data = {};
        }

        if (this.state.showRemoveBank) {
            swal({
                title: "Remove Bank Account?",
                text: "Are you sure you want to remove this bank account?",
                icon: "warning",
                buttons: {
                    cancel: "No, cancel",
                    confirm: {
                        text: "Yes, proceed",
                        closeModal: false,
                    }
                },
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    this.setState({showRemoveBank: false}, () => {
                        dispatch(BankAction.removeBank(this.state.bankAccount.getUuid()));
                    });
                }
            });
        }
    }

    detachBank = (bankAccount: CardModel) => {
        if (!bankAccount) return;
        let bankAccounts = this.state.bankAccounts.filter(bankAccount1 => bankAccount?.getId() !== (new CardModel(bankAccount1))?.getId());
        this.setState({bankAccounts}, () => {
            localStorage.setItem('bank-accounts', JSON.stringify(bankAccounts));
        });
    }

    setBankToRemove = (bankAccount) => {
        this.setState({bankAccount, showRemoveBank: true});
    }

    render() {

        const {fetchBanks, verifyBank, dispatch} = this.props;
        let {bankAccounts} = this.state;

        if (fetchBanks.requesting && Utility.isEmpty(bankAccounts)) {
            bankAccounts = [1, 2, 3, 4, 5];
        }

        const monoInstance = new MonoConnect({
            onClose: () => {
                if (this.state.onSuccess) {
                    this.setState({onSuccess: false});
                    dispatch(BankAction.verifyBank({bank_code: this.state.bank_code}));
                }
            },
            onLoad: () => console.log('Widget loaded successfully'),
            onSuccess: ({ code }) => this.setState({onSuccess: true, bank_code: code}),
            key: AppConst.MONO_KEY
        })

        monoInstance.setup()

        return <>
            <Row>
                <Col md={6}>
                    <h4 className={`font-weight-bold text-muted`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        Bank Accounts
                    </h4>
                    <p>Your reusable bank accounts on {AppConst.APP_NAME}</p>
                </Col>
                <Col md={6} className={`mt-3 mb-3 loan-type-btn-aligner`}>
                    <Button variant="primary" onClick={() => monoInstance.open()}>{verifyBank.requesting ? <Spinner animation="border" variant="light"/> : 'Add new'}</Button>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                    <Card border={`light`} className={`border-radius-10 p-2`}>
                        <Card.Body>
                            {!Utility.isEmpty(bankAccounts) ? <Row className={`underline-grandchildren`}>
                                {bankAccounts.map((v, k) => {

                                    if (Utility.isNumeric(v)) return <BankAccountShimmer key={k}/>;

                                    return <BankAccountLayout key={k} setBankToRemove={this.setBankToRemove} bankAccount={new BankAccount(v)}/>;
                                })}
                            </Row> : <NoContent title={`No Bank Account`}/>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>;
    }
}

function mapStateToProps(state) {
    return {
        fetchBanks: state.fetchBanks,
        verifyBank: state.verifyBank,
        removeBank: state.removeBank
    }
}

export default connect(mapStateToProps)(BankAccounts)