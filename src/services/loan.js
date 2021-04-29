import {AppConst, UrlConst} from "../constants";
import Utility from "../helpers/Utility";

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

const getLoanRequests = (link) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PerPage': AppConst.PAGINATION_PER_PAGE,
            'Auth-Token': getToken()
        }
    };
    return fetch(link || UrlConst.LOAN_REQUEST_LIST_URL, requestOptions).then(handleResponse);
};

const getLoanOffers = (link) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PerPage': AppConst.PAGINATION_PER_PAGE,
            'Auth-Token': getToken()
        }
    };
    return fetch(link || UrlConst.LOAN_OFFER_LIST_URL, requestOptions).then(handleResponse);
};

const getMyLoanRequests = (link) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PerPage': AppConst.PAGINATION_PER_PAGE,
            'Auth-Token': getToken()
        }
    };
    return fetch(link || UrlConst.USER_LOAN_REQUEST_LIST_URL, requestOptions).then(handleResponse);
};

const getMyLoanOffers = (link) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PerPage': AppConst.PAGINATION_PER_PAGE,
            'Auth-Token': getToken()
        }
    };
    return fetch(link || UrlConst.USER_LOAN_OFFER_LIST_URL, requestOptions).then(handleResponse);
};

const getLoanConst = () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        }
    };
    return fetch(UrlConst.LOAN_CONSTANTS_URL, requestOptions).then(handleResponse);
};

const offerLoan = (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        },
        body: JSON.stringify(data)
    };
    return fetch(UrlConst.LOAN_OFFER_URL, requestOptions).then(handleResponse);
};

const requestLoan = (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        },
        body: JSON.stringify(data)
    };
    return fetch(UrlConst.LOAN_REQUEST_URL, requestOptions).then(handleResponse);
};

const loanApply = (data, loanID) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        },
        body: JSON.stringify(data)
    };
    return fetch(Utility.sprintf(UrlConst.LOAN_APPLY_URL, loanID), requestOptions).then(handleResponse);
};

const getLoanApplications = (loanID, link) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PerPage': AppConst.PAGINATION_PER_PAGE,
            'Auth-Token': getToken()
        }
    };
    return fetch(link || Utility.sprintf(UrlConst.LOAN_APPLICANTS_URL, loanID), requestOptions).then(handleResponse);
};

const grantLoanApplication = (loanID, applicationID) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        }
    };
    return fetch(Utility.sprintf(UrlConst.LOAN_APPLICATION_GRANT_URL, loanID, applicationID), requestOptions).then(handleResponse);
};

const cancelLoanApplication = (loanID, applicationID) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        }
    };
    return fetch(Utility.sprintf(UrlConst.LOAN_APPLICATION_CANCEL_URL, loanID, applicationID), requestOptions).then(handleResponse);
};

export const LoanService = {
    getLoanRequests,
    getLoanOffers,
    getMyLoanRequests,
    getMyLoanOffers,
    getLoanConst,
    offerLoan,
    requestLoan,
    loanApply,
    getLoanApplications,
    grantLoanApplication,
    cancelLoanApplication,
};