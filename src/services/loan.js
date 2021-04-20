import {AppConst, UrlConst} from "../constants";

function handleResponse(response) {
    if (response.status === 419) {
        sessionStorage.clear();
        localStorage.clear();
        alert("Session expired");
        window.location.assign('/login');
        return;
    }
    if (!response.ok) {
        return Promise.reject(response.json());
    }
    return response.json();
}

const getToken = () => {
    return sessionStorage.getItem("token");
}

const getLoanRequests = (page) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PerPage': AppConst.PAGINATION_PER_PAGE,
            'Auth-Token': getToken()
        }
    };
    return fetch(page || UrlConst.LOAN_REQUEST_LIST_URL, requestOptions).then(handleResponse);
};

const getLoanOffers = (page) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PerPage': AppConst.PAGINATION_PER_PAGE,
            'Auth-Token': getToken()
        }
    };
    return fetch(page || UrlConst.LOAN_OFFER_LIST_URL, requestOptions).then(handleResponse);
};

const getMyLoanRequests = (page) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PerPage': AppConst.PAGINATION_PER_PAGE,
            'Auth-Token': getToken()
        }
    };
    return fetch(page || UrlConst.USER_LOAN_REQUEST_LIST_URL, requestOptions).then(handleResponse);
};

const getMyLoanOffers = (page) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PerPage': AppConst.PAGINATION_PER_PAGE,
            'Auth-Token': getToken()
        }
    };
    return fetch(page || UrlConst.USER_LOAN_OFFER_LIST_URL, requestOptions).then(handleResponse);
};

export const LoanService = {
    getLoanRequests,
    getLoanOffers,
    getMyLoanRequests,
    getMyLoanOffers
};