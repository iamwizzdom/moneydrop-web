import React, {Component} from "react";
import {connect} from "react-redux";
import {NotificationAction} from "../../actions";
import {Card, Col, Row, Spinner} from "react-bootstrap";
import backArrow from "../../assets/images/dark-back-arrow.svg";
import {AppConst} from "../../constants";
import Utility from "../../helpers/Utility";
import Notification from "../../models/Notification";
import NoContent from "../layout/NoContent";
import NotificationLayout from "../layout/NotificationLayout";
import NotificationShimmer from "../layout/NotificationShimmer";

class Notifications extends Component {

    state = {
        notifications: [],
        nextPage: null,
        hasMoreData: true,
        isLoading: false
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(NotificationAction.getNotifications());
        window.onscroll = () => {

            if ((window.scrollY >= (document.body.clientHeight - window.innerHeight)) && this.state.hasMoreData && !this.state.isLoading) {
                this.loadMoreData(this.state.nextPage);
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {fetchNotifications} = this.props;
        const {requesting} = fetchNotifications;

        const {notifications, pagination} = {...{notifications: [], pagination: {nextPage: null}}, ...fetchNotifications.data};

        if (notifications.length > 0) {
            this.setNotifications(notifications);
            fetchNotifications.data.notifications = [];
        }

        if (requesting !== this.state.isLoading) this.setIsLoading(requesting === true);

        let hasMoreData = (pagination.nextPage !== null && pagination.nextPage !== '#');

        if (hasMoreData !== this.state.hasMoreData) this.setHasMoreData(hasMoreData);

        if (hasMoreData && (pagination.nextPage !== this.state.nextPage)) {
            this.setNextPage(pagination.nextPage);
        }
    }

    setNotifications = (data) => {
        this.setState({notifications: [...this.state.notifications, ...data]});
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
        dispatch(NotificationAction.getNotifications(url));
    };


    render() {

        const {fetchNotifications} = this.props;
        const {requesting} = fetchNotifications;

        let notifications = (this.state.notifications.length > 0  || !requesting ? this.state.notifications : [1, 2, 3, 4, 5, 6]);

        return <>
            <Row>
                <Col>
                    <h4 className={`font-weight-bold text-muted rounded`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        Notifications
                    </h4>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                    <Card border={`light`} className={`border-radius-10 p-2`}>
                        <Card.Body>
                            {!Utility.isEmpty(notifications) ? <Row className={`underline-children`}>
                                {notifications.map((v, k) => {

                                    if (Utility.isNumeric(v)) return <NotificationShimmer key={k}/>;

                                    return <NotificationLayout key={k} notification={new Notification(v)}/>;
                                })}
                            </Row> : <NoContent title={`No Notification`}/>}
                            {(!requesting && !this.state.hasMoreData && this.state.notifications.length > 0) && <p className="col-md-12 text-center text-muted mt-5">No more data</p>}
                            {
                                requesting && this.state.notifications.length > 0 ?
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
        fetchNotifications: state.fetchNotifications
    }
}

export default connect(mapStateToProps)(Notifications)