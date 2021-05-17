import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReviewShimmer from "./ReviewShimmer";
import Review from "../../models/Review";

class ReviewLayout extends Component {

    render() {
        const {review, from} = this.props;

        if (!(review instanceof Review)) return <ReviewShimmer/>;

        let reviewer = review.getReviewer();

        return <Col md={6} className={`pt-4 pb-4`}>
            <Link to={{pathname: `/user/review/${review.getUuid()}`, state: {review, from}}} className={`text-decoration-none`}>
                <Row>
                    <Col lg={2} md={2} sm={2} xl={2} xs={2}>
                        <img
                            src={reviewer.getPicture() || reviewer.getDefaultPicture()}
                            onError={(e) => {e.target.onerror = null; e.target.src = reviewer.getDefaultPicture()}}
                            style={{width: 40, height: 40, objectFit: 'cover'}} alt={`review-user`}
                            className={`rounded-circle border-accent background-accent-light my-p-0-9`}/>
                    </Col>
                    <Col lg={6} md={6} sm={6} xl={6} xs={6} className={`text-left`}>
                        <Row>
                            <Col md={12}><small className={`text-dark single-line-text`}>{review.getReview()}</small></Col>
                            <Col md={12}><small className={`text-muted`}>{review.getDate()}</small></Col>
                        </Row>
                    </Col>
                </Row>
            </Link>
        </Col>;
    }
}

export default ReviewLayout;