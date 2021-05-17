import React, {Component} from "react";
import {Badge, Button, Card, Col, Row, Spinner} from "react-bootstrap";
import Loan from "../../models/Loan";
import {Link, Redirect} from "react-router-dom";
import Utility from "../../helpers/Utility";
import backArrow from '../../assets/images/dark-back-arrow.svg';
import remove from '../../assets/images/remove.svg';
import ReactDOM from "react-dom";
import swal from "@sweetalert/with-react";
import LoanApplyLayout from "../layout/LoanApplyLayout";
import {LoanAction} from "../../actions";
import {connect} from "react-redux";

class LoanDetails extends Component {

    state = {
        loan: null,
        mounted: false,
        showLoanApplyModal: false,
        showLoanRevokeModal: false,
    }

    loanApplyRef = null;

    componentDidMount() {
        const {state} = this.props.location;
        this.loanApplyRef = React.createRef();
        if (state && !(state.loan instanceof Loan) && Utility.isObject(state.loan)) {
            state.loan = new Loan(state.loan.loanObject);
        }
        this.setState({
            ...this.state,
            ...state,
            mounted: true
        });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {dispatch, loanApply, loanRevoke} = this.props;

        if (loanApply.data.message) {
            if (loanApply.data.hasOwnProperty("errors") && Object.keys(loanApply.data.errors).length > 0) {
                loanApply.data.message = Utility.serializeObject(loanApply.data.errors);
            }
            swal({
                title: loanApply.data.title,
                text: loanApply.data.message,
                icon: (loanApply.data.status ? `success` : `error`),
                button: "Ok",
            });
            loanApply.data.message = null;
        }

        if (loanRevoke.data.message) {
            if (loanRevoke.data.hasOwnProperty("errors") && Object.keys(loanRevoke.data.errors).length > 0) {
                loanRevoke.data.message = Utility.serializeObject(loanRevoke.data.errors);
            }
            swal({
                title: loanRevoke.data.title,
                text: loanRevoke.data.message,
                icon: (loanRevoke.data.status ? `success` : `error`),
                button: "Ok",
            });
            loanRevoke.data.message = null;
            if (loanRevoke.data.status && loanRevoke.data.response?.loan) {
                this.setState({loan: new Loan(loanRevoke.data.response.loan)}, () => {
                    this.props.history.replace({
                        ...this.props.location,
                        state: {
                            ...this.props.location.state,
                            loan: this.state.loan
                        }
                    });
                });
            }
        }

        if (this.state.showLoanApplyModal) {

            const {loanApplyRef} = this;
            let wrapper = document.createElement('div');
            ReactDOM.render(<LoanApplyLayout amount={this.state.loan.getAmount()} ref={loanApplyRef} />, wrapper);

            swal({
                content: wrapper,
                buttons: {
                    cancel: "No, cancel",
                    confirm: "Yes, apply"
                }
            }).then((data) => {

                if (!data) {
                    this.setState({showLoanApplyModal: false}, () => {
                        loanApplyRef.current.stop();
                    });
                    return;
                }

                if (!Utility.isString(data) || !Utility.isObject(data = JSON.parse(data))) {
                    loanApplyRef.current.stop();
                    swal("Please enter a valid data").then(() => this.setState({showLoanApplyModal: true}));
                    return;
                }

                this.setState({showLoanApplyModal: false}, () => {
                    loanApplyRef.current.stop();
                    dispatch(LoanAction.loanApply(data, this.state.loan.getUuid()));
                });

            });
        }

        if (this.state.showLoanRevokeModal) {

            swal(<span className={`color-accent`}>Are you sure you want to revoke this loan?</span>, {
                icon: remove,
                buttons: {
                    cancel: "No, cancel",
                    confirm: "Yes, revoke"
                }
            }).then((data) => {

                if (!data) {
                    this.setState({showLoanRevokeModal: false});
                    return;
                }

                this.setState({showLoanRevokeModal: false}, () => {
                    dispatch(LoanAction.revokeLoan(this.state.loan.getUuid()));
                });

            });
        }
    }

    render() {

        let {mounted, loan, from} = this.state;
        const {loanApply, loanRevoke, location} = this.props;

        if (!mounted) return null;

        if (mounted && !(loan instanceof Loan)) {
            return <Redirect to={{ pathname: from?.pathname || '/', header: {status: 'warning', message: 'Invalid loan data'}}} />;
        }

        let loanUser = loan.getUser();
        let theme = Utility.getTheme(loan.getStatus(), false);

        let showBtn = true, btnTitle = "Apply", btnProps = {onClick: null, href: null};


        if (!loan.isMine() && loan.isGranted()) showBtn = false;
        else btnTitle = (loan.isMine() ? "View Applicants" : (loan.isHasApplied() || loanApply.data?.status ? "Applied" : "Apply"));

        if (!(!loan.isMine() && loan.isHasApplied())) {
            if (loan.isMine()) {
                btnProps.href = {pathname: '/loan/applicants', state: {loan}};
            } else {
                btnProps.onClick = () => this.setState({showLoanApplyModal: true});
            }
        }

        const userImg = <img
            src={loanUser.getPicture() || loanUser.getDefaultPicture()}
            onError={(e) => {e.target.onerror = null; e.target.src = loanUser.getDefaultPicture()}}
            style={{width: 40, height: 40, objectFit: 'cover'}} alt={`loan-user`}
            className={`rounded-circle border-accent background-accent-light my-p-0-9 mb-3`}/>;

        return <>
            <Row>
                <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                    <h4 className={`font-weight-bold text-muted`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        Loan Details
                        {((loan.isPending() || loan.isAwaiting()) && loan.isMine()) && <Button variant={`light`} className={`float-right color-accent`}
                                 onClick={() => this.setState({showLoanRevokeModal: true})}>
                            {loanRevoke.requesting ? <Spinner animation="border" variant="warning"/> : 'Revoke'}
                        </Button>}
                    </h4>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                    <Card border="light" className={`p-3 border-radius-10`}>
                        <Card.Body>
                            <Row className={`underline-dotted pb-1`}>
                                <Col lg={6} md={6} sm={6} xl={6} xs={6}>
                                    <Row>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Loan Type</small>
                                            <p className={`mt-1`}>Loan {loan.getLoanType()} {loanUser.isMe() && '(Me)'}</p>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Fund Raiser</small>
                                            <p className={`mt-1`}>No</p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xl={6} xs={6}>
                                    <Row className={`text-right`}>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            {!loanUser.isMe() ? <Link to={{
                                                pathname: `/user/${loanUser.getUuid()}/profile`,
                                                state: {user: loanUser, from: location}
                                            }} className={`text-decoration-none`}>
                                                {userImg}
                                            </Link> : userImg}
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Amount</small>
                                            <p className={`font-weight-bold mt-1`}>{Utility.format(parseFloat(loan.getAmount()))}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={`mt-3`}>
                                <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                    <small className={`p text-muted`}>Loan Reference</small>
                                    <p className={`font-size-13 mt-1`}>{loan.getUuid()}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6} md={6} sm={6} xl={6} xs={6}>
                                    <Row>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Loan Tenure</small>
                                            <p className={`mt-1`}>{loan.getTenure()}</p>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Loan Purpose</small>
                                            <p className={`mt-1`}>{loan.isLoanRequest() ? (loan.getPurpose() || "Not specified") : "Not applicable"}</p>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Status</small>
                                            <p className={`mt-1`}><Badge variant={theme.badge}>{loan.getStatus() || "Unknown"}</Badge></p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={6} md={6} sm={6} xl={6} xs={6} className={`text-right`}>
                                    <Row>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Interest</small>
                                            <p className={`mt-1`}>{loan.getInterest()} percent</p>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Interest Type</small>
                                            <p className={`mt-1`}>{loan.getInterestType()}</p>
                                        </Col>
                                        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                            <small className={`p text-muted`}>Date & Time</small>
                                            <p className={`mt-1`}>{loan.getDateTime()}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                                    <small className={`p text-muted`}>Loan Reference</small>
                                    <p className={`mt-1`}>{loan.getNote() || 'No note'}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {showBtn && ((btnProps.href && <Link to={btnProps.href} className={`btn btn-primary btn-block btn-lg font-size-16 mt-4`} style={{padding: '.7rem 1rem'}}>{btnTitle}</Link>) ||
               (<Button variant={`primary`} className={`mt-4 font-size-16`} disabled={(!loan.isMine() && (loan.isHasApplied() || loanApply.data?.status))}
                        size={`lg`} style={{padding: '.7rem 1rem'}} block onClick={btnProps.onClick}>{loanApply.requesting ? <Spinner animation="border" variant="light"/> : btnTitle}</Button>)
            )}
        </>;
    }
}

function mapStateToProps(state) {
    return {
        loanApply: state.loanApply,
        loanRevoke: state.loanRevoke,
    }
}

export default connect(mapStateToProps)(LoanDetails)