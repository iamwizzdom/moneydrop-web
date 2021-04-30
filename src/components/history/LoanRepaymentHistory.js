import React, {Component} from "react";
import {Card, Col, Row, Spinner} from "react-bootstrap";
import backArrow from "../../assets/images/dark-back-arrow.svg";
import {connect} from "react-redux";
import {LoanAction} from "../../actions";
import Utility from "../../helpers/Utility";
import TransactionShimmer from "../layout/TransactionShimmer";
import TransactionLayout from "../layout/TransactionLayout";
import NoContent from "../layout/NoContent";
import LoanRepayment from "../../models/LoanRepayment";
import {Redirect} from "react-router-dom";

class LoanRepaymentHistory extends Component {

    state = {
        applicationReference: '',
        repayments: [],
        nextPage: null,
        hasMoreData: true,
        isLoading: false,
        mounted: false
    };

    componentDidMount() {

        const {dispatch, location} = this.props;
        const {state} = location;

        this.setState({
            ...this.state,
            ...state,
            mounted: true
        }, () => {
            if (!Utility.isEmpty(this.state.applicationReference)) dispatch(LoanAction.getLoanRepaymentHistory(this.state.applicationReference));
        });

        window.onscroll = () => {

            if (window.scrollY >= (document.body.clientHeight - window.innerHeight) && this.state.hasMoreData && !this.state.isLoading) {
                this.loadMoreData(this.state.nextPage);
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {loanRepaymentHistory} = this.props;
        const {requesting} = loanRepaymentHistory;

        const {repayments, pagination} = {...{repayments: [], pagination: {nextPage: null}}, ...loanRepaymentHistory.data};

        if (repayments.length > 0) {
            this.setRepayments(repayments);
            loanRepaymentHistory.data.repayments = [];
        }

        if (requesting !== this.state.isLoading) this.setIsLoading(requesting === true);

        let hasMoreData = (pagination.nextPage !== null && pagination.nextPage !== '#');

        if (hasMoreData !== this.state.hasMoreData) this.setHasMoreData(hasMoreData);

        if (hasMoreData && (pagination.nextPage !== this.state.nextPage)) {
            this.setNextPage(pagination.nextPage);
        }
    }

    setRepayments = (data) => {
        this.setState({repayments: [...this.state.repayments, ...data]});
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
        dispatch(LoanAction.getLoanRepaymentHistory(this.state.applicationReference, url));
    };

    render() {

        const {loanRepaymentHistory} = this.props;
        const {requesting} = loanRepaymentHistory;

        let repayments = (this.state.repayments.length > 0  || !requesting ? this.state.repayments : [1, 2, 3, 4, 5, 6]);

        let {mounted, applicationReference, from} = this.state;

        if (mounted && Utility.isEmpty(applicationReference)) {
            return <Redirect to={{ pathname: from?.pathname || '/', header: {status: 'warning', message: 'Invalid loan application data'}}} />;
        }

        return <>
            <Row>
                <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                    <h4 className={`font-weight-bold text-muted`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        Repayment History
                    </h4>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                    <Card border={`light`} className={`border-radius-10 p-2`}>
                        <Card.Body>
                            {!Utility.isEmpty(repayments) ? <Row className={`underline-children`}>
                                {repayments.map((v, k) => {

                                    if (Utility.isNumeric(v)) return <TransactionShimmer key={k}/>;

                                    let repayment = new LoanRepayment(v);

                                    return <TransactionLayout key={k} transaction={repayment.getTransaction()}/>;
                                })}
                            </Row> : <NoContent title={`No Transaction`}/>}
                            {(!requesting && !this.state.hasMoreData && this.state.repayments.length > 0) && <p className="col-md-12 text-center text-muted mt-5">No more data</p>}
                            {
                                requesting && this.state.repayments.length > 0 ?
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
        loanRepaymentHistory: state.loanRepaymentHistory,
    }
}

export default connect(mapStateToProps)(LoanRepaymentHistory);