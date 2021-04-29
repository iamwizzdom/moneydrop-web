import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import plus from '../../assets/images/plus.svg';
import minus from '../../assets/images/minus.svg';
import CurrencyInput from "react-currency-input-field";
import Utility from "../../helpers/Utility";
import {LoanAction} from "../../actions";
import swal from '@sweetalert/with-react'
import backArrow from "../../assets/images/dark-back-arrow.svg";
import {Link} from "react-router-dom";

class OfferLoan extends Component {

    state = {
        amount: 0,
        interest: 8,
        interest_type: '',
        tenure: '',
        loanTenures: {},
        interestTypes: {},
        error: {},
        submitted: false
    };

    componentDidMount() {
        const {dispatch} = this.props;
        let loanConsts = localStorage.getItem('loan_consts');
        if (Utility.isEmpty(loanConsts)) {
            dispatch(LoanAction.getLoanConst());
        } else {
            loanConsts = JSON.parse(loanConsts);
            this.setState({loanTenures: loanConsts['tenure'], interestTypes: loanConsts['interest_type']})
        }
    }

    submit = () => {

        if (!this.state.submitted) this.setState({submitted: true});

        if (this.state.amount <= 0) return;

        if (Utility.isEmpty(this.state.tenure)) return;

        if (Utility.isEmpty(this.state.interest_type)) return;

        const {dispatch} = this.props;

        dispatch(LoanAction.offerLoan({
            amount: this.state.amount,
            interest: this.state.interest,
            interest_type: this.state.interest_type,
            tenure: this.state.tenure
        }));
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {loanConst, loanOffer} = this.props;

        const {tenure, interest_type} = {...{tenure: {}, interest_type: {},}, ...loanConst.data};

        if (Object.keys(loanConst.data).length > 0) {
            localStorage.setItem('loan_consts', JSON.stringify(loanConst.data));
            this.setState({loanTenures: tenure, interestTypes: interest_type});
            loanConst.data = {};
        }

        const {status, title, message} = {...{errors: {}, status: false, title: null, message: null}, ...loanOffer.data};

        if (message) {
            swal({
                title: title,
                text: message,
                icon: (status ? `success` : `error`),
                button: "Ok",
            });
            loanOffer.data.message = null;
        }
    }

    setAmount = (amount) => {
        this.setState({amount});
    }

    increaseAmount = () => {
        this.setState({amount: (parseFloat(this.state.amount) + 500)});
    }

    decreaseAmount = () => {
        let amount = parseFloat(this.state.amount);
        this.setState({amount: amount > 500 ? (amount - 500) : 0});
    }

    setInterestRate = (e) => {
        this.setState({interest: e.target.value})
    }

    setTenure = (e) => {
        this.setState({tenure: e.target.value})
    }

    setInterestType = (e) => {
        this.setState({interest_type: e.target.value})
    }

    render() {

        const amountList = [10000, 25000, 50000, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000];

        const {loanOffer} = this.props;
        const {requesting} = loanOffer;
        const {errors} = {...{errors: {}}, ...loanOffer.data};

        return <>
            <Row>
                <Col md={6}>
                    <h4 className={`font-weight-bold text-muted rounded`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        Offer Loan
                    </h4>
                    <p>How much do you want to offer?</p>
                </Col>
                <Col md={6} className={`mt-3 mb-3 loan-type-btn-aligner`}>
                    <Link to={`/loan/request`} className={`btn btn-warning text-dark text-decoration-none pl-4 pr-4 m-1 my-rounded`}>
                        Request Loan
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Card border="light" className={`p-2 border-radius-10`}>
                        <Card.Body>
                            <div className={`text-left`}>
                                <small className={`h5 color-accent font-weight-bold`} style={{lineHeight: 2.3}}>Offer amount</small>
                                <div className={`badge loan-return my-rounded font-size-16 float-right p-3`}>
                                    {this.state.interest}% return
                                </div>
                            </div>
                            <div className={`pl-4 pr-4`}>

                                <Row className={`mt-5`}>
                                    <Col lg={3} md={3} sm={3} xl={3} xs={3}>
                                        <img src={minus} width={50} alt={`minus`}
                                             className={`img-fluid float-right cursor-pointer`}
                                             onClick={() => this.decreaseAmount()}/>
                                    </Col>
                                    <Col lg={6} md={6} sm={6} xl={6} xs={6} className={`text-center`}>
                                        <CurrencyInput
                                            intlConfig={{locale: 'en-NG', currency: 'NGN'}}
                                            style={{marginTop: '-5px'}}
                                            className={`input-transparent form-control text-center loam-amount-font-size color-accent`}
                                            value={this.state.amount}
                                            decimalsLimit={2}
                                            onValueChange={(value, name) => this.setAmount(value)}
                                        />
                                        <small className={`text-danger`}>{this.state.submitted && (errors.amount || (this.state.amount <= 0 && "Please enter a valid amount"))}</small>
                                    </Col>
                                    <Col lg={3} md={3} sm={3} xl={3} xs={3}>
                                        <img src={plus} width={50} alt={`minus`}
                                             className={`img-fluid float-left cursor-pointer`}
                                             onClick={() => this.increaseAmount()}/>
                                    </Col>
                                </Row>
                                <Row className={`mt-4`}>
                                    <div className={`w-100 scroll-horizontal scrollbar-invisible`}>
                                        <div className={`h-100`} style={{width: (120 * amountList.length)}}>
                                            {amountList.map((v, k) => {
                                                return <div key={k} onClick={() => this.setAmount(v)}
                                                            className={`badge loan-amounts color-accent cursor-pointer my-rounded font-size-16 p-3 m-1`}>
                                                    {Utility.format(v, 0)}
                                                </div>;
                                            })}
                                        </div>
                                    </div>
                                </Row>
                                <Row className={`pl-lg-5 pr-lg-5`}>
                                    <Col className={`mt-3`}>
                                        <Form.Group className={`mt-2 text-left`} controlId="interest">
                                            <Form.Label>Interest Rate</Form.Label>
                                            <Form.Control className={`mt-1 slider`} type="range"
                                                          name={`interest`}
                                                          value={this.state.interest}
                                                          min={0}
                                                          max={20}
                                                          onChange={this.setInterestRate}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className={`pl-lg-5 pr-lg-5`}>
                                    <Col className={`mt-3`}>
                                        <select className="custom-select" onChange={this.setTenure} defaultValue={``}>
                                            <option value="" disabled>Loan Tenure</option>
                                            {Object.entries(this.state.loanTenures).map((item, key) => {
                                                return <option key={key} value={item[0]}>{item[1]}</option>;
                                            })}
                                        </select>
                                        <small className={`text-danger`}>{this.state.submitted && (errors.tenure || (Utility.isEmpty(this.state.tenure) && "Please select a tenure"))}</small>
                                    </Col>
                                </Row>
                                <Row className={`pl-lg-5 pr-lg-5`}>
                                    <Col className={`mt-4`}>
                                        <select className="custom-select" onChange={this.setInterestType} defaultValue={``}>
                                            <option value="" disabled>Interest Type</option>
                                            {Object.entries(this.state.interestTypes).map((item, key) => {
                                                return <option key={key} value={item[0]}>{item[1]}</option>;
                                            })}
                                        </select>
                                        <small className={`text-danger`}>{this.state.submitted && (errors.interest_type || (Utility.isEmpty(this.state.interest_type) && "Please select an interest type"))}</small>
                                    </Col>
                                </Row>
                                <Row className={`justify-content-center`}>
                                    <Button variant="primary" type="submit" onClick={this.submit} className={`font-size-16 min-height-48 mt-5 text-capitalize`}>
                                        {requesting ? <Spinner animation="border" variant="light"/> : 'Make offer'}
                                    </Button>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>;
    }
}

function mapStateToProps(state) {
    return {
        loanConst: state.loanConst,
        loanOffer: state.loanOffer,
    }
}

export default connect(mapStateToProps)(OfferLoan)