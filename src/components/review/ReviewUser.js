import React, {Component} from "react";
import {Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import backArrow from "../../assets/images/dark-back-arrow.svg";
import arrow from "../../assets/images/arrow-accent.svg";
import Utility from "../../helpers/Utility";
import LoanApplication from "../../models/LoanApplication";
import {Link, Redirect} from "react-router-dom";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import {connect} from "react-redux";
import swal from "@sweetalert/with-react";
import {ReviewAction} from "../../actions";

class ReviewUser extends Component {

    state = {
        application: null,
        mounted: false,
        review: ''
    }

    componentDidMount() {
        const {state} = this.props.location;
        if (state && !(state.application instanceof LoanApplication) && Utility.isObject(state.application)) {
            state.application = new LoanApplication(state.application.applicationObject);
        }
        this.setState({
            ...this.state,
            ...state,
            mounted: true
        });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {reviewUser} = this.props;
        const {data} = reviewUser;

        if (data.message && Utility.isEmpty(data.errors)) {
            swal({
                title: data.title,
                text: data.message,
                icon: data.status ? 'success' : 'error',
                button: "Ok"
            });
            data.message = null
            if (data.status) this.setReview('');
        }
    }

    setReview = (review) => {
        this.setState({review});
    }

    submit = () => {
        const {dispatch} = this.props;
        dispatch(ReviewAction.reviewUser({review: this.state.review}, this.state.application.getReference()))
    }

    render() {

        const {reviewUser, location} = this.props;
        let {mounted, application, from} = this.state;

        let {errors} = {errors: {}, ...reviewUser.data};

        if (!mounted) return null;

        if (mounted && !(application instanceof LoanApplication)) {
            return <Redirect to={{ pathname: from?.pathname || '/', state: {application}, header: {status: 'warning', message: 'Invalid review data'}}} />;
        }

        let loan = application.getLoan();

        if ((loan.isLoanRequest() && loan.isMine()) || (loan.isLoanOffer() && !loan.isMine())) {
            return <Redirect to={{ pathname: from?.pathname || '/', state: {application}, header: {status: 'warning', message: "You can't review yourself"}}} />;
        }

        let loanRecipient = loan.isLoanOffer() ? application.getApplicant() : loan.getUser();

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
                    <Card border="light" className={`p-3 border-radius-10`}>
                        <Card.Body>
                            <Row>
                                <Col xl={2} lg={2} md={3} sm={4} xs={5}>
                                    <img
                                        src={(loanRecipient.getPicture() ? loanRecipient.getPictureUrl() : null) || loanRecipient.getDefaultPicture()}
                                        onError={(e) => {e.target.onerror = null; e.target.src = loanRecipient.getDefaultPicture()}}
                                        style={{width: 100, height: 100, objectFit: 'cover'}} alt={`loan-user`}
                                        className={`rounded-circle border-accent background-accent-light p-2 m-auto d-block`}/>
                                </Col>
                                <Col xl={10} lg={10} md={9} sm={8} xs={7}>
                                    <h5 className={`mt-1`}>{loanRecipient.getFirstname()} {loanRecipient.getLastname()}</h5>
                                    <p className={`small m-0 mb-1`}>{loanRecipient.getEmail()}</p>
                                    <Link to={{pathname: `/user/reviews`, state: {user: loanRecipient, from: location}}} className={`color-accent`}>View reviews <img src={arrow} className={`ml-1 mb-1`} alt={`icon`}/> </Link>
                                    <ReactStars
                                        count={5}
                                        size={30}
                                        isHalf={true}
                                        edit={false}
                                        value={loanRecipient.getRating()}
                                        color="#d1d1d1"
                                        activeColor="#e04805"
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                    <Card border="light" className={`p-3 border-radius-10`}>
                        <Card.Title className={`color-accent font-weight-bold`}>Review</Card.Title>
                        <Card.Body>
                            <Form.Group className={`mt-2 text-left`} controlId="review">
                                <Form.Control as={`textarea`} rows={5} className={`mt-1`} placeholder={`Enter Note`}
                                              name={`review`} value={this.state.review} onChange={(e) => this.setReview(e.target.value)}/>
                                <p className={`text-danger`}>{errors.review}</p>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.submit} className={`font-size-16 min-height-48 mt-3 text-capitalize`} block>
                                {reviewUser.requesting ? <Spinner animation="border" variant="light"/> : 'Submit'}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>;
    }
}

function mapStateToProps(state) {
    return {
        reviewUser: state.reviewUser
    }
}

export default connect(mapStateToProps)(ReviewUser)