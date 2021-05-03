import {ReviewConst} from '../constants';
import {ReviewService} from '../services';

export const ReviewAction = {
    reviewUser,
    editReview,
    deleteReview,
    fetchReviews
};

function reviewUser(data, applicationID) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: ReviewConst.REVIEW_USER_REQUEST}
    }

    function success(payload) {
        return {type: ReviewConst.REVIEW_USER_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: ReviewConst.REVIEW_USER_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await ReviewService.reviewUser(data, applicationID);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function editReview(data, reviewID) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: ReviewConst.EDIT_REVIEW_REQUEST}
    }

    function success(payload) {
        return {type: ReviewConst.EDIT_REVIEW_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: ReviewConst.EDIT_REVIEW_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await ReviewService.editReview(data, reviewID);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function deleteReview(reviewID) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: ReviewConst.DELETE_REVIEW_REQUEST}
    }

    function success(payload) {
        return {type: ReviewConst.DELETE_REVIEW_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: ReviewConst.DELETE_REVIEW_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await ReviewService.deleteReview(reviewID);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}

function fetchReviews(userID, url) {
    // return the promise using fetch which adds to localstorage on resolve

    function request() {
        return {type: ReviewConst.FETCH_REVIEWS_REQUEST}
    }

    function success(payload) {
        return {type: ReviewConst.FETCH_REVIEWS_SUCCESS, payload}
    }

    function failure(payload) {
        return {type: ReviewConst.FETCH_REVIEWS_FAILURE, payload}
    }

    return async function dispatch(dispatch) {

        dispatch(request());

        try {
            const res = await ReviewService.fetchReviews(userID, url);

            if (res.status) dispatch(success(res));
            else dispatch(failure(res));

        } catch (err) {
            const error = await err;
            dispatch(failure(error));
        }
    }
}