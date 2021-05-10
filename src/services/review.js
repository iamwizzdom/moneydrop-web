import {AppConst, UrlConst} from "../constants";
import Utility from "../helpers/Utility";
import ResponseHandler from "./ResponseHandler";

const getToken = () => {
    return sessionStorage.getItem("token");
}

const reviewUser = (data, applicationID) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        },
        body: JSON.stringify(data)
    };
    return fetch(Utility.sprintf(UrlConst.LOAN_APPLICANT_REVIEW_URL, applicationID), requestOptions).then(ResponseHandler.handleResponse);
};

const editReview = (data, reviewID) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        },
        body: JSON.stringify(data)
    };
    return fetch(Utility.sprintf(UrlConst.EDIT_REVIEW_URL, reviewID), requestOptions).then(ResponseHandler.handleResponse);
};

const deleteReview = (reviewID) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        }
    };
    return fetch(Utility.sprintf(UrlConst.DELETE_REVIEW_URL, reviewID), requestOptions).then(ResponseHandler.handleResponse);
};

const fetchReviews = (userID, url) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PerPage': AppConst.PAGINATION_PER_PAGE,
            'Auth-Token': getToken()
        }
    };
    return fetch(url || Utility.sprintf(UrlConst.USER_REVIEWS_URL, userID), requestOptions).then(ResponseHandler.handleResponse);
};

export const ReviewService = {
    reviewUser,
    editReview,
    deleteReview,
    fetchReviews
};