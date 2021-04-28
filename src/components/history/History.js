import React, {Component} from "react";
import {Card, Col, Row, Spinner} from "react-bootstrap";
import {AppConst} from "../../constants";
import {HistoryAction} from "../../actions";
import {connect} from "react-redux";
import Utility from "../../helpers/Utility";
import NoContent from "../layout/NoContent";
import HistoryLayout from "../layout/HistoryLayout";
import LoanApplication from "../../models/LoanApplication";
import HistoryShimmer from "../layout/HistoryShimmer";
import backArrow from "../../assets/images/dark-back-arrow.svg";

class History extends Component {

    state = {
        applications: [],
        nextPage: null,
        hasMoreData: true,
        isLoading: false
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(HistoryAction.getHistory());
        window.onscroll = () => {

            if ((window.scrollY >= (document.body.clientHeight - window.innerHeight)) &&
                this.state.hasMoreData && !this.state.isLoading) {
                this.loadMoreData(this.state.nextPage);
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {historyData} = this.props;
        const {requesting} = historyData;

        const {applications, pagination} = {...{applications: [], pagination: {nextPage: null}}, ...historyData.data};

        if (applications.length > 0) {
            this.setHistory(applications);
            historyData.data.applications = [];
        }

        if (requesting !== this.state.isLoading) this.setIsLoading(requesting === true);

        let hasMoreData = (pagination.nextPage !== null && pagination.nextPage !== '#');

        if (hasMoreData !== this.state.hasMoreData) this.setHasMoreData(hasMoreData);

        if (hasMoreData && (pagination.nextPage !== this.state.nextPage)) {
            this.setNextPage(pagination.nextPage);
        }
    }

    setHistory = (data) => {
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
        dispatch(HistoryAction.getHistory(url));
    };

    render() {
        const {historyData} = this.props;
        const {requesting} = historyData;

        let applications = (this.state.applications.length > 0 || !requesting ? this.state.applications : [1, 2, 3, 4, 5, 6]);

        return <>
            <Row>
                <Col>
                    <h4 className={`font-weight-bold text-muted rounded`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        History
                    </h4>
                    <p>Your loan history on {AppConst.APP_NAME}</p>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                    <Card border={`light`} className={`border-radius-10 p-2`}>
                        <Card.Body>
                            {!Utility.isEmpty(applications) ? <Row className={`underline-children`}>
                                {applications.map((v, k) => {

                                    if (Utility.isNumeric(v)) return <HistoryShimmer key={k}/>;

                                    return <HistoryLayout key={k} application={new LoanApplication(v)}/>;
                                })}
                            </Row> : <NoContent title={`No History`}/>}
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
        historyData: state.history
    }
}

export default connect(mapStateToProps)(History)