import React, {Component} from "react";
import {Badge, Button, Card, Col, Row} from "react-bootstrap";
import Loan from "../../models/Loan";
import {Redirect} from "react-router-dom";
import Utility from "../../helpers/Utility";
import backArrow from '../../assets/images/dark-back-arrow.svg';

class LoanDetails extends Component {

    state = {
        loan: null,
        mounted: false
    }

    componentDidMount() {
        const {state} = this.props.location;
        this.setState({
            ...this.state,
            ...state,
            mounted: true
        });
    }

    render() {

        let {mounted, loan} = this.state;

        if (!mounted) return null;

        if (mounted && !(loan instanceof Loan)) {
            if (Utility.isObject(loan)) {
                loan = new Loan(loan.loanObject);
            } else return <Redirect to={{ pathname: this.props.history.goBack(), errorMessage: 'You must first verify your email address'}} />;
        }

        let loanUser = loan.getUser();
        let theme = Utility.getTheme(loan.getStatus(), false);

        let showBtn = true, btnTitle = "Apply";

        if (!loan.isMine() && loan.isGranted()) showBtn = false;
        else btnTitle = (loan.isMine() ? "View Applicants" : (loan.isHasApplied() ? "Applied" : "Apply"));

        return <>
            <Row>
                <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                    <h4 className={`font-weight-bold text-muted`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        Loan Details
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
                                            <img
                                                src={(loanUser.getPicture() ? loanUser.getPictureUrl() : null) || loanUser.getDefaultPicture()}
                                                style={{width: 40, maxHeight: 40, objectFit: 'cover'}} alt={`loan-user`}
                                                className={`rounded-circle border-accent background-accent-light my-p-0-9 mb-3`}/>
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
            {showBtn && <Button variant={`primary`} className={`mt-4 min-height-48`} disabled={(!loan.isMine() && loan.isHasApplied())} block>{btnTitle}</Button>}
        </>;
    }
}

export default LoanDetails;