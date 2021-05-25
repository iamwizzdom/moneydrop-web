import React, {Component} from "react";
import Loan from "../../models/Loan";
import {Redirect} from "react-router-dom";
import Utility from "../../helpers/Utility";
import {Card, Col, Row, Spinner} from "react-bootstrap";
import LoanLayout from "../layout/LoanLayout";
import {LoanAction} from "../../actions";
import NoContent from "../layout/NoContent";
import LoanApplicantShimmer from "../layout/LoanApplicantShimmer";
import LoanApplicantLayout from "../layout/LoanApplicantLayout";
import LoanApplication from "../../models/LoanApplication";
import {connect} from "react-redux";
import backArrow from "../../assets/images/dark-back-arrow.svg";

class LoanApplicants extends Component {

    state = {
        loan: null,
        applications: [],
        nextPage: null,
        hasMoreData: true,
        isLoading: false,
        mounted: false
    }

    componentDidMount() {
        const {dispatch, location} = this.props;
        const {state} = location;
        if (state && !(state.loan instanceof Loan) && Utility.isObject(state.loan)) {
            state.loan = new Loan(state.loan.loanObject);
        }
        this.setState({
            ...this.state,
            ...state,
            mounted: true
        }, () => {
            if (this.state.loan instanceof Loan) dispatch(LoanAction.getLoanApplications(this.state.loan.getUuid()));
            window.onscroll = () => {

                if (window.scrollY >= (document.body.clientHeight - window.innerHeight) &&
                    this.state.hasMoreData && !this.state.isLoading) {
                    this.loadMoreData(this.state.nextPage);
                }
            }
        });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {applicants, applicantGrant} = this.props;
        const {requesting} = applicants;

        const {applications, pagination} = {...{applications: [], pagination: {nextPage: null}}, ...applicants.data};

        if (applications.length > 0) {
            this.setApplications(applications);
            applicants.data.applications = [];
        }

        if (requesting !== this.state.isLoading) this.setIsLoading(requesting === true);

        let hasMoreData = (pagination.nextPage !== null && pagination.nextPage !== '#');

        if (hasMoreData !== this.state.hasMoreData) this.setHasMoreData(hasMoreData);

        if (hasMoreData && (pagination.nextPage !== this.state.nextPage)) {
            this.setNextPage(pagination.nextPage);
        }

        if (applicantGrant.data.response?.application) {
            const {application} = applicantGrant.data.response;
            applicantGrant.data.response.application = null;
            applications.map(app => {
                if (app.uuid === application.uuid) {
                    this.setState({loan: new Loan(application.loan)});
                    return application;
                }
                return app;
            });
        }
    }

    setApplications = (data) => {
        this.setState({applications: [...this.state.applications, ...data]});
    };

    setIsLoading = (status) => {
        this.setState({isLoading: status});
    };

    setNextPage = (url) => {
        this.setState({nextPage: url});
    };

    setHasMoreData = (status) => {
        this.setState({hasMoreData: status});
    };

    loadMoreData = (url) => {
        const {dispatch} = this.props;
        dispatch(LoanAction.getLoanApplications(this.state.loan.getUuid(), url));
    };

    render() {

        const {applicants} = this.props;
        const {requesting} = applicants;

        let loanApplications = (this.state.applications.length > 0 || !requesting ? this.state.applications : [1, 2, 3, 4]);

        let {mounted, loan, from} = this.state;

        if (!mounted) return null;

        if (mounted && !(loan instanceof Loan)) {
            return <Redirect to={{ pathname: from?.pathname || '/', header: {status: 'warning', message: 'Invalid loan data'}}} />;
        }

        return <>
            <Row>
                <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                    <h4 className={`font-weight-bold text-muted`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        Loan Applicants
                    </h4>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                   <h5 className={`color-accent font-weight-bold`}>Loan</h5>
                   <LoanLayout loan={loan} bg/>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                   <h5 className={`color-accent font-weight-bold mt-2 mb-3`}>Loan Applicants</h5>
                    <Card border={`light`} className={`my-rounded p-2`}>
                        <Card.Body>
                            {!Utility.isEmpty(loanApplications) ? <Row className={`underline-children`}>
                                {loanApplications.map((v, k) => {

                                    if (Utility.isNumeric(v)) return <LoanApplicantShimmer key={k}/>;

                                    let application = new LoanApplication(v);

                                    return <LoanApplicantLayout key={k} application={application} {...this.props}/>;
                                })}
                            </Row> : <NoContent title={`No Applicant`}/>}
                            {(!requesting && !this.state.hasMoreData && this.state.applications.length > 0) && <p className="col-md-12 text-center text-muted mt-5">No more data</p>}
                            {
                                requesting && this.state.applications.length > 0 ?
                                    <div className="col-md-12 justify-content-center d-flex mt-5">
                                        <Spinner animation="border" variant="warning"/>
                                    </div> : null
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>;
    }
}

function mapStateToProps(state) {
    return {
        applicantGrant: state.loanApplicationGrant,
        applicants: state.loanApplications
    }
}

export default connect(mapStateToProps)(LoanApplicants)