import React, {Component} from "react";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import LoanApplicantShimmer from "./LoanApplicantShimmer";
import LoanApplication from "../../models/LoanApplication";
import Utility from "../../helpers/Utility";
import swal from "@sweetalert/with-react";
import ReactDOM from "react-dom";
import {Player} from "@lottiefiles/react-lottie-player";
import giveMoneyAnim from "../../assets/raw/lottie-give-money.json";
import receiveMoneyAnim from "../../assets/raw/lottie-receive-money.json";
import {LoanAction} from "../../actions";
import {connect} from "react-redux";

class LoanApplicantLayout extends Component {

    state = {
        showGrantModal: false
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {dispatch, application, applicantGrant} = this.props;

        if (applicantGrant.data.message) {
            if (applicantGrant.data.hasOwnProperty("errors") && Object.keys(applicantGrant.data.errors).length > 0) {
                applicantGrant.data.message = Utility.serializeObject(applicantGrant.data.errors);
            }
            swal({
                title: applicantGrant.data.title,
                text: applicantGrant.data.message,
                icon: (applicantGrant.data.status ? `success` : `error`),
                button: "Ok",
            });
            applicantGrant.data.message = null;
        }

        if (this.state.showGrantModal) {

            let loan = application.getLoan();

            let confirmation = "Are you sure you want to give %s this loan?";
            if (loan.isLoanRequest()) {
                confirmation = "Are you sure you want to collect this loan from %s?";
            }

            swal(<div><Player
                ref={this.player} // set the ref to your class instance
                autoplay={true}
                loop={true}
                src={loan.isLoanOffer() ? giveMoneyAnim : receiveMoneyAnim}
                style={{ height: '200px', width: '200px' }}
            />
                <span className={`mt-2 mb-4 color-accent`}>{Utility.sprintf(confirmation, application.getApplicant().getFirstname())}</span>
            </div>, {
                buttons: {
                    cancel: "No, cancel",
                    confirm: "Yes, proceed"
                }
            }).then((data) => {

                if (!data) {
                    this.setState({showGrantModal: false});
                    return;
                }

                this.setState({showGrantModal: false}, () => {
                    dispatch(LoanAction.grantLoanApplication(loan.getUuid(), application.getReference()));
                });

            });
        }
    }

    render() {

        const {application, location, applicantGrant} = this.props;

        if (!(application instanceof LoanApplication)) return <LoanApplicantShimmer/>;

        let user = application.getApplicant();

        return <Col md={6} className={`pt-2 pb-2`}>
            <Row>
                <Col lg={2} md={2} sm={2} xl={2} xs={2}>
                    <Link to={{pathname: `/user/profile`, state: {user, from: location}}} className={`text-decoration-none`}>
                        <img
                            src={(user.getPicture() ? user.getPictureUrl() : null) || user.getDefaultPicture()}
                            onError={(e) => {e.target.onerror = null; e.target.src = user.getDefaultPicture()}}
                            style={{width: 40, maxHeight: 40, objectFit: 'cover'}} alt={`application-user`}
                            className={`rounded-circle my-p-0-9`}/>
                    </Link>
                </Col>
                <Col lg={6} md={6} sm={6} xl={6} xs={6} className={`text-left`} style={{marginTop: '-5px'}}>
                    <Row>
                        <Col md={12}>
                            <Link to={{pathname: `/user/profile`, state: {user, from: location}}}>
                                <small className={`font-size-13 text-dark`}>{user.getFirstname()} {user.getLastname()}</small>
                            </Link>
                        </Col>
                        <Col md={12}><small className={`text-muted font-size-11`}>Date Applied: <span className={`color-accent font-weight-bold`}>{application.getDateShort()}</span></small></Col>
                    </Row>
                </Col>
                <Col lg={4} md={4} sm={4} xl={4} xs={4} className={`text-right`}>
                    <Button disabled={application.isHasGranted()} onClick={() => this.setState({showGrantModal: true})} variant={`${application.isGranted() ? 'outline-success' : 'outline-primary'}`}
                            className={`${!application.isGranted() && 'border-accent background-accent-hover color-accent color-white-hover'} rounded-pill font-size-12`} style={{minWidth: 90, maxHeight: 30, lineHeight: 1}}>
                        {applicantGrant.requesting && applicantGrant.id === application.getReference() ? <Spinner animation="border" variant="warning" size={`sm`}/> :
                            (application.isHasGranted() ? (application.isGranted() ? "Granted" : "Rejected") : "Grant")}
                    </Button>
                </Col>
            </Row>
        </Col>;
    }
}

function mapStateToProps(state) {
    return {
        applicantGrant: state.loanApplicationGrant,
    }
}

export default connect(mapStateToProps)(LoanApplicantLayout)