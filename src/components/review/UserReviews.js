import React, {Component} from "react";
import {Card, Col, Row, Spinner} from "react-bootstrap";
import backArrow from "../../assets/images/dark-back-arrow.svg";
import {Redirect} from "react-router-dom";
import User from "../../models/User";
import Utility from "../../helpers/Utility";
import {connect} from "react-redux";
import NoContent from "../layout/NoContent";
import {ReviewAction} from "../../actions";
import ReviewLayout from "../layout/ReviewLayout";
import Review from "../../models/Review";
import ReviewShimmer from "../layout/ReviewShimmer";

class UserReviews extends Component {

    state = {
        user: null,
        mounted: false,
        reviews: [],
        nextPage: null,
        hasMoreData: true,
        isLoading: false
    }

    componentDidMount() {
        const {dispatch, location} = this.props;
        const {state} = location;
        if (state && !(state.user instanceof User) && Utility.isObject(state.user)) {
            state.user = new User(state.user.userObject);
        }
        this.setState({
            ...this.state,
            ...state,
            mounted: true
        }, () => {
            dispatch(ReviewAction.fetchReviews(this.state.user.getUuid()));
        });

        window.onscroll = () => {

            if ((window.scrollY >= (document.body.clientHeight - window.innerHeight)) &&
                this.state.hasMoreData && !this.state.isLoading) {
                this.loadMoreData(this.state.nextPage);
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {fetchReviews} = this.props;
        const {requesting} = fetchReviews;

        const {reviews, pagination} = {...{reviews: [], pagination: {nextPage: null}}, ...fetchReviews.data};

        if (reviews.length > 0) {
            this.setReviews(reviews);
            fetchReviews.data.reviews = [];
        }

        if (requesting !== this.state.isLoading) this.setIsLoading(requesting === true);

        let hasMoreData = (pagination.nextPage !== null && pagination.nextPage !== '#');

        if (hasMoreData !== this.state.hasMoreData) this.setHasMoreData(hasMoreData);

        if (hasMoreData && (pagination.nextPage !== this.state.nextPage)) {
            this.setNextPage(pagination.nextPage);
        }
    }

    setReviews = (data) => {
        this.setState({reviews: [...this.state.reviews, ...data]});
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
        dispatch(ReviewAction.fetchReviews(this.state.user.getUuid(), url));
    };

    render() {

        let {mounted, user, from} = this.state;

        if (!mounted) return null;

        if (mounted && !(user instanceof User)) {
            return <Redirect to={{ pathname: from?.pathname || '/', header: {status: 'warning', message: 'Invalid user data'}}} />;
        }

        const {fetchReviews} = this.props;
        const {requesting} = fetchReviews;

        let reviews = (this.state.reviews.length > 0  || !requesting ? this.state.reviews : [1, 2, 3, 4, 5, 6]);

        return <>
            <Row>
                <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                    <h4 className={`font-weight-bold text-muted`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        Review
                    </h4>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col>
                    <Card border="light" className={`border-radius-10`}>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Row>
                                        <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                                            <img
                                                src={(user.getPicture() ? user.getPictureUrl() : null) || user.getDefaultPicture()}
                                                onError={(e) => {e.target.onerror = null; e.target.src = user.getDefaultPicture()}}
                                                style={{width: 40, height: 40, objectFit: 'cover'}} alt={`review-user`}
                                                className={`rounded-circle border-accent background-accent-light my-p-0-9 m-auto d-block`}/>
                                        </Col>
                                        <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                                            <h5 className={`mt-1`}>{user.getFirstname()} {user.getLastname()}</h5>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                    <Card border={`light`} className={`border-radius-10 p-3`}>
                        <Card.Title className={`color-accent font-weight-bold`}>Reviews</Card.Title>
                        <Card.Body>
                            {!Utility.isEmpty(reviews) ? <Row className={`underline-children`}>
                                {reviews.map((v, k) => {

                                    if (Utility.isNumeric(v)) return <ReviewShimmer key={k}/>;

                                    return <ReviewLayout key={k} review={new Review(v)} from={from}/>;
                                })}
                            </Row> : <NoContent title={`No Review`}/>}
                            {(!requesting && !this.state.hasMoreData && this.state.reviews.length > 0) && <p className="col-md-12 text-center text-muted mt-5">No more data</p>}
                            {
                                requesting && this.state.reviews.length > 0 ?
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
        fetchReviews: state.fetchReviews
    }
}

export default connect(mapStateToProps)(UserReviews)