import {AppConst, UrlConst} from "../constants";
import Utility from "../helpers/Utility";
import ResponseHandler from "./ResponseHandler";

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
    return fetch(link || UrlConst.LOAN_REQUEST_LIST_URL, requestOptions).then(ResponseHandler.handleResponse);
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
    return fetch(link || UrlConst.LOAN_OFFER_LIST_URL, requestOptions).then(ResponseHandler.handleResponse);
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
    return fetch(link || UrlConst.USER_LOAN_REQUEST_LIST_URL, requestOptions).then(ResponseHandler.handleResponse);
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
    return fetch(link || UrlConst.USER_LOAN_OFFER_LIST_URL, requestOptions).then(ResponseHandler.handleResponse);
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
    return fetch(UrlConst.LOAN_CONSTANTS_URL, requestOptions).then(ResponseHandler.handleResponse);
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
    return fetch(UrlConst.LOAN_OFFER_URL, requestOptions).then(ResponseHandler.handleResponse);
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
    return fetch(UrlConst.LOAN_REQUEST_URL, requestOptions).then(ResponseHandler.handleResponse);
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
    return fetch(Utility.sprintf(UrlConst.LOAN_APPLY_URL, loanID), requestOptions).then(ResponseHandler.handleResponse);
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
    return fetch(link || Utility.sprintf(UrlConst.LOAN_APPLICANTS_URL, loanID), requestOptions).then(ResponseHandler.handleResponse);
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
    return fetch(Utility.sprintf(UrlConst.LOAN_APPLICATION_GRANT_URL, loanID, applicationID), requestOptions).then(ResponseHandler.handleResponse);
};

const cancelLoanApplication = (loanID, applicationID) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        }
    };
    return fetch(Utility.sprintf(UrlConst.LOAN_APPLICATION_CANCEL_URL, loanID, applicationID), requestOptions).then(ResponseHandler.handleResponse);
};

const repayLoan = (data, applicationID) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Auth-Token': getToken()
        },
        body: JSON.stringify(data)
    };
    return fetch(Utility.sprintf(UrlConst.LOAN_REPAYMENT_URL, applicationID), requestOptions).then(ResponseHandler.handleResponse);
};

const getLoanRepaymentHistory = (applicationID, link) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PerPage': AppConst.PAGINATION_PER_PAGE,
            'Auth-Token': getToken()
        }
    };
    return fetch(link || Utility.sprintf(UrlConst.LOAN_REPAYMENT_HISTORY_URL, applicationID), requestOptions).then(ResponseHandler.handleResponse);
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
    repayLoan,
    getLoanRepaymentHistory,
};