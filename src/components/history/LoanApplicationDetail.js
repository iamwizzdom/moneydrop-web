import React, {Component} from "react";
import {Badge, Button, Card, Col, Row, Spinner} from "react-bootstrap";
import backArrow from "../../assets/images/dark-back-arrow.svg";
import LoanLayout from "../layout/LoanLayout";
import Loan from "../../models/Loan";
import {Link, Redirect} from "react-router-dom";
import LoanApplication from "../../models/LoanApplication";
import Utility from "../../helpers/Utility";
import LoanRecipientLayout from "../layout/LoanRecipientLayout";
import swal from "@sweetalert/with-react";
import remove from "../../assets/images/remove.svg";
import {LoanAction} from "../../actions";
import {connect} from "react-redux";
import ReactDOM from "react-dom";
import InputAmount from "../layout/InputAmount";

class LoanApplicationDetail extends Component {

    state = {
        application: null,
        applicationCancelled: false,
        showCancelModal: false,
        showPaymentModal: false,
        mounted: false,
    }

    componentDidMount() {

        const {location} = this.props;

        const {state} = location;
        if (!(state.application instanceof Loan) && Utility.isObject(state.application)) {
            state.application = new LoanApplication(state.application.applicationObject);
        }
        this.setState({
            ...this.state,
            ...state,
            mounted: true
        });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {dispatch, cancelApplication, loanRepayment} = this.props;

        if (cancelApplication.data.message) {
            if (cancelApplication.data.hasOwnProperty("errors") && Object.keys(cancelApplication.data.errors).length > 0) {
                cancelApplication.data.message = Utility.serializeObject(cancelApplication.data.errors);
            }
            swal({
                title: cancelApplication.data.title,
                text: cancelApplication.data.message,
                icon: (cancelApplication.data.status ? `success` : `error`),
                button: "Ok",
            });
            cancelApplication.data.message = null;
            if (cancelApplication.data.status) {
                this.setState({applicationCancelled: true, application: new LoanApplication(cancelApplication.data.response.application)}, () => {
                    this.props.history.replace({
                        ...this.props.location,
                        state: {
                            ...this.props.location.state,
                            application: this.state.application
                        }
                    });
                });
            }
        }

        if (loanRepayment.data.message) {
            if (loanRepayment.data.hasOwnProperty("errors") && Object.keys(loanRepayment.data.errors).length > 0) {
                loanRepayment.data.message = Utility.serializeObject(loanRepayment.data.errors);
            }
            swal({
                title: loanRepayment.data.title,
                text: loanRepayment.data.message,
                icon: (loanRepayment.data.status ? `success` : `error`),
                button: "Ok",
            });
            loanRepayment.data.message = null;
            if (loanRepayment.data.status) {
                this.setState({application: new LoanApplication(loanRepayment.data.response.application)}, () => {
                    this.props.history.replace({
                        ...this.props.location,
                        state: {
                            ...this.props.location.state,
                            application: this.state.application
                        }
                    });
                })
            }
        }

        if (this.state.showCancelModal) {

            swal(<span className={`color-accent`}>Are you sure you want to cancel your application?</span>, {
                icon: remove,
                buttons: {
                    cancel: "No, cancel",
                    confirm: "Yes, proceed"
                },
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    this.setState({showCancelModal: false}, () => {
                        dispatch(LoanAction.cancelLoanApplication(this.state.application.getLoan().getUuid(), this.state.application.getReference()));
                    });
                }
            });
        }

        if (this.state.showPaymentModal) {

            let wrapper = document.createElement('div');
            ReactDOM.render(<InputAmount />, wrapper);

            swal(`Amount not greater than ${Utility.format(parseFloat(this.state.application.getUnpaidAmount()))}.`, {
                content: wrapper,
                button: "Pay"
            }).then((value) => {

                if (!value) {
                    this.setState({showPaymentModal: false});
                    return;
                }

                if (!Utility.isNumeric(value)) {
                    swal("Please enter a valid amount").then(() => this.setState({showPaymentModal: true}));
                    return;
                }

                let amount = parseFloat(value);

                this.setState({showPaymentModal: false}, () => {
                    dispatch(LoanAction.repayLoan({amount}, this.state.application.getReference()))
                });

            });
        }
    }

    render() {

        const {cancelApplication, loanRepayment, location} = this.props;

        let {mounted, application, from} = this.state;

        if (!mounted) return null;

        if (mounted && !(application instanceof LoanApplication)) {
            return <Redirect to={{ pathname: from?.pathname || '/', header: {status: 'warning', message: 'Invalid loan application data'}}} />;
        }

        let theme = Utility.getTheme(application.getStatus());

        let showCancelBtn = (application.getApplicant().isMe() && !(application.isGranted() || application.isRepaid()));
        let disableCancelBtn = (application.getApplicant().isMe() && application.isRejected());
        let showPayBtnHolder = (application.isGranted() || application.isRepaid());
        let showPayBtn = true, disablePayBtn = false;

        let loan = application.getLoan();

        if (application.isGranted() || application.isRepaid()) {
            if (loan.isLoanOffer() && loan.getUser().isMe()) showPayBtn = false;
            else if (loan.isLoanRequest() && application.getApplicant().isMe()) showPayBtn = false;
            else if (application.isRepaid()) disablePayBtn = true;
        }

        return <>
            <Row>
                <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                    <h4 className={`font-weight-bold text-muted`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        Application Details
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col md={6} className={`mt-3`}>
                    <h5 className={`color-accent font-weight-bold`}>Loan</h5>
                    <LoanLayout size={12} loan={application.getLoan()} location={location} bg/>
                </Col>
                <Col md={6} className={`mt-3`}>
                    <h5 className={`color-accent font-weight-bold`}>Recipient</h5>
                    <LoanRecipientLayout size={12} application={application} />
                </Col>
            </Row>
            <Row className={`mt-4`}>
                <Col md={12}>
                    <h5 className={`color-accent font-weight-bold`}>Application Details</h5>
                    <Card border="light" className={`p-3 border-radius-10`}>
                        <Card.Body>
                            <Row className={`mt-3`}>
                                <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                    <small className={`p text-muted`}>Application Reference</small>
                                    <p className={`font-size-13 mt-1`}>{application.getReference()}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6} md={6} sm={6} xl={6} xs={6}>
                                    <Row>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Paid Amount</small>
                                            <p className={`mt-1`}>{Utility.format(parseFloat(application.getRepaidAmount()))}</p>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Date Granted</small>
                                            <p className={`mt-1`}>{application.getDateGranted()}</p>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Status</small>
                                            <p className={`mt-1`}><Badge variant={theme.badge}>{application.getStatus() || "Unknown"}</Badge></p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xl={6} xs={6} className={`text-right`}>
                                    <Row>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Unpaid Amount</small>
                                            <p className={`mt-1`}>{Utility.format(parseFloat(application.getUnpaidAmount()))}</p>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Due Date</small>
                                            <p className={`mt-1`}>{application.getDueDateShort() || "Unavailable"}</p>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Date & Time</small>
                                            <p className={`mt-1`}>{application.getDate()}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {showCancelBtn && <Button disabled={this.state.applicationCancelled || disableCancelBtn} variant={`primary`} className={`mt-4 min-height-48`}
                                      onClick={() => this.setState({showCancelModal: true})} block>
                {cancelApplication.requesting ? <Spinner animation="border" variant="light"/> : 'Cancel Application'}</Button>}
            {showPayBtnHolder && <div className={`text-center`}>
                {showPayBtn && <Button variant={`primary`} className={`mt-4 min-height-48`} onClick={() => this.setState({showPaymentModal: true})}
                                       disabled={disablePayBtn} block>
                    {loanRepayment.requesting ? <Spinner animation="border" variant="light"/> : 'Make Payment'}
                </Button>}
                <Link to={{pathname: `/loan/application/repayments`, state: {applicationReference: application.getReference()}}} className={`color-accent text-decoration-none mt-3 d-inline-block`}>View Payment History</Link>
            </div>}
        </>;
    }
}

function mapStateToProps(state) {
    return {
        cancelApplication: state.loanApplicationCancel,
        loanRepayment: state.loanRepayment,
    }
}

export default connect(mapStateToProps)(LoanApplicationDetail);