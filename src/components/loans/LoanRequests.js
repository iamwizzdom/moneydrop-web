import React, {Component} from "react";
import {connect} from "react-redux";
import {Row, Spinner} from "react-bootstrap";
import Utility from "../../helpers/Utility";
import Loan from "../../models/Loan";
import NoContent from "../layout/NoContent";
import {LoanAction} from "../../actions";
import LoanShimmer from "../layout/LoanShimmer";
import LoanLayout from "../layout/LoanLayout";

class LoanRequests extends Component {

    state = {
        loans: [],
        nextPage: null,
        hasMoreData: true,
        isLoading: false
    };

    componentDidMount() {
        const {dispatch, currentTab} = this.props;
        dispatch(LoanAction.getLoanRequests());
        if (currentTab() === 'requests') window.onscroll = () => {

            if (currentTab() === 'requests' && (window.scrollY >= (document.body.clientHeight - window.innerHeight)) &&
                this.state.hasMoreData && !this.state.isLoading) {
                this.loadMoreData(this.state.nextPage);
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {requests} = this.props;
        const {requesting} = requests;

        const {loans, pagination} = {...{loans: [], pagination: {nextPage: null}}, ...requests.data};

        if (loans.length > 0) {
            this.setLoans(loans);
            requests.data.loans = [];
        }

        if (requesting !== this.state.isLoading) this.setIsLoading(requesting === true);

        let hasMoreData = (pagination.nextPage !== null && pagination.nextPage !== '#');

        if (hasMoreData !== this.state.hasMoreData) this.setHasMoreData(hasMoreData);

        if (hasMoreData && (pagination.nextPage !== this.state.nextPage)) {
            this.setNextPage(pagination.nextPage);
        }
    }

    setLoans = (data) => {
        this.setState({loans: [...this.state.loans, ...data]});
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
        dispatch(LoanAction.getLoanRequests(url));
    };

    render() {
        const {requests} = this.props;
        const {requesting} = requests;

        let loanRequests = (this.state.loans.length > 0 || !requesting ? this.state.loans : [1, 2, 3, 4]);

        return <>
            {!Utility.isEmpty(loanRequests) ? <Row className={`underline-children`}>
                {loanRequests.map((v, k) => {

                    if (Utility.isNumeric(v)) return <LoanShimmer key={k}/>;

                    let loan = new Loan(v);

                    return <LoanLayout key={k} loan={loan}/>;
                })}
            </Row> : <NoContent title={`No Loan Request`}/>}
            {(!requesting && !this.state.hasMoreData && this.state.loans.length > 0) && <p className="col-md-12 text-center text-muted mt-5">No more data</p>}
            {
                requesting && this.state.loans.length > 0 ?
                    <div className="col-md-12 justify-content-center d-flex mt-5">
                        <Spinner animation="border" variant="warning"/>
                    </div> : null
            }
        </>;
    }
}

function mapStateToProps(state) {
    return {
        requests: state.loanRequests
    }
}

export default connect(mapStateToProps)(LoanRequests)