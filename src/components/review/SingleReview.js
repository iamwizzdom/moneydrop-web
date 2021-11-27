import React, {Component} from "react";
import {Card, Col, Dropdown, Row, Spinner} from "react-bootstrap";
import backArrow from "../../assets/images/dark-back-arrow.svg";
import LoanLayout from "../layout/LoanLayout";
import {Redirect} from "react-router-dom";
import Utility from "../../helpers/Utility";
import Review from "../../models/Review";
import {connect} from "react-redux";
import option from "../../assets/images/three-small-dots.svg";
import ReactDOM from "react-dom";
import swal from "@sweetalert/with-react";
import {ReviewAction} from "../../actions";
import EditReviewLayout from "../layout/EditReviewLayout";
import remove from "../../assets/images/remove.svg";

class SingleReview extends Component {

    state = {
        review: null,
        showEditReviewModal: false,
        showDeleteReviewModal: false
    }

    editorRef = null;

    componentDidMount() {
        const {state} = this.props.location;
        if (state && !(state.review instanceof Review) && Utility.isObject(state.review)) {
            state.review = new Review(state.review.reviewObject);
        }
        this.setState({
            ...this.state,
            ...state,
            mounted: true
        });
        this.editorRef = React.createRef();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

        const {dispatch, editReview, deleteReview} = this.props;

        if (editReview.data.message) {
            if (editReview.data.hasOwnProperty("errors") && Object.keys(editReview.data.errors).length > 0) {
                editReview.data.message = Utility.serializeObject(editReview.data.errors);
            }
            swal({
                title: editReview.data.title,
                text: editReview.data.message,
                icon: (editReview.data.status ? `success` : `error`),
                button: "Ok",
            });
            if (!Utility.isEmpty(editReview.data.response?.review)) {
                this.setState({review: new Review(editReview.data.response.review)}, () => {
                    this.props.history.replace({
                        ...this.props.location,
                        state: {
                            ...this.props.location.state,
                            review: this.state.review
                        }
                    });
                });
            }
            editReview.data.message = null;
        }

        if (deleteReview.data.message) {
            if (deleteReview.data.hasOwnProperty("errors") && Object.keys(deleteReview.data.errors).length > 0) {
                deleteReview.data.message = Utility.serializeObject(deleteReview.data.errors);
            }
            swal({
                title: deleteReview.data.title,
                text: deleteReview.data.message,
                icon: (deleteReview.data.status ? `success` : `error`),
                button: "Ok",
            }).then(() => this.props.history.goBack());
            deleteReview.data.message = null;
        }

        if (this.state.showEditReviewModal) {

            let wrapper = document.createElement('div');
            const {editorRef} = this;
            ReactDOM.render(<EditReviewLayout review={this.state.review.getReview()} ref={editorRef} />, wrapper);

            swal({
                content: wrapper,
                buttons: {
                    cancel: "Cancel",
                    confirm: "Update"
                },
            }).then((data) => {

                if (!data) {
                    this.setState({showEditReviewModal: false}, () => {
                        editorRef.current.stop();
                    });
                    return;
                }

                if (Utility.isEmpty(data)) {
                    editorRef.current.stop();
                    swal("Please enter a valid review").then(() => this.setState({showEditReviewModal: true}));
                    return;
                }

                this.setState({showEditReviewModal: false}, () => {
                    editorRef.current.stop();
                    dispatch(ReviewAction.editReview({review: data}, this.state.review.getUuid()));
                });

            });
        }

        if (this.state.showDeleteReviewModal) {

            swal(<span className={`color-accent`}>Are you sure you want to delete this review?</span>, {
                icon: remove,
                buttons: {
                    cancel: "No, cancel",
                    confirm: "Yes, proceed"
                },
                dangerMode: true,
            }).then((willDelete) => {
                this.setState({showDeleteReviewModal: false}, () => {
                    if (willDelete) {
                        dispatch(ReviewAction.deleteReview(this.state.review.getUuid()));
                    }
                });
            });
        }
    }

    render() {

        let {mounted, review, from} = this.state;
        let {editReview, deleteReview} = this.props;

        if (!mounted) return null;

        if (mounted && !(review instanceof Review)) {
            return <Redirect to={{ pathname: from?.pathname || '/', header: {status: 'warning', message: 'Invalid review data'}}} />;
        }

        let loan = review.getLoan(), user = loan.getUser();
        let reviewer = review.getReviewer();

        return <>
            <Row>
                <Col lg={12} md={12} sm={12} xl={12} xs={12}>
                    <h4 className={`font-weight-bold text-muted`}>
                        <img src={backArrow} onClick={() => this.props.history.goBack()} alt={`back`} className={`mr-3 cursor-pointer`} title={`Go Back`}/>
                        Review
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col md={6} className={`mt-3`}>
                    <Row className={`m-1`}>
                        <h5 className={`color-accent font-weight-bold`}>Recipient</h5>
                        <Col md={12} className={`pt-4 pb-4 bg-white my-rounded`}>
                            <Row>
                                <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                                    <img
                                        src={user.getPicture() || user.getDefaultPicture()}
                                        onError={(e) => {e.target.onerror = null; e.target.src = user.getDefaultPicture()}}
                                        style={{width: 45, height: 45, objectFit: 'cover'}} alt={`review-user`}
                                        className={`rounded-circle border-accent background-accent-light my-p-0-9 m-auto d-block`}/>
                                </Col>
                                <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                                    <h5 className={`mt-1`}>{user.getFirstname()} {user.getLastname()}</h5>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} className={`mt-3`}>
                    <Row className={`m-1`}>
                        <h5 className={`color-accent font-weight-bold`}>Loan</h5>
                        <LoanLayout size={12} loan={loan} location={from} bg/>
                    </Row>
                </Col>
            </Row>
            <Row className={`mt-3`}>
                <Col md={12}>
                    <h5 className={`color-accent font-weight-bold`}>Review</h5>
                    <Card border="light" className={`border-radius-10 position-relative overflow-hidden`}>
                        {(editReview.requesting || deleteReview.requesting) && <div className={`position-absolute w-100 h-100 bg-secondary`}
                              style={{opacity: .6, zIndex: 10}}>
                            <Spinner animation="border" variant="warning" className={`item-center`}/>
                        </div>}
                        <Card.Body>
                            <Row className={`pt-3 pb-3`}>
                                <Col xl={2} lg={2} md={3} sm={3} xs={4}>
                                    <img
                                        src={reviewer.getPicture() || reviewer.getDefaultPicture()}
                                        onError={(e) => {e.target.onerror = null; e.target.src = reviewer.getDefaultPicture()}}
                                        style={{width: 45, height: 45, objectFit: 'cover'}} alt={`review-reviewer`}
                                        className={`rounded-circle border-accent background-accent-light my-p-0-9 m-auto d-block`}/>
                                </Col>
                                <Col xl={8} lg={8} md={7} sm={7} xs={6} className={`text-left p-0`} style={{marginTop: '-5px'}}>
                                    <Row>
                                        <Col md={12} className={`p-0 font-size-18`}><small>{reviewer.getFirstname()} {reviewer.getLastname()}</small></Col>
                                        <Col md={12} className={`p-0`}><small>{review.getDateFormatted()}</small></Col>
                                    </Row>
                                </Col>
                                <Col lg={2} md={2} sm={2} xl={2} xs={2} className={`text-right`}>
                                    {reviewer.isMe() && <Dropdown>
                                        <Dropdown.Toggle variant="link" id="dropdown-basic" className={`no-shadow`}>
                                            <img src={option} width={10} height={20} alt={`option`}/>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => {
                                                this.setState({showEditReviewModal: true})
                                            }}>Edit Review</Dropdown.Item>
                                            <Dropdown.Item onClick={() => {
                                                this.setState({showDeleteReviewModal: true})
                                            }}>Delete Review</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>}
                                </Col>
                            </Row>
                            <p className={`mt-3`}>{review.getReview()}</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>;
    }
}

function mapStateToProps(state) {
    return {
        editReview: state.editReview,
        deleteReview: state.deleteReview
    }
}

export default connect(mapStateToProps)(SingleReview)
